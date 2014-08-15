(ns ewen.cle-usb.render-raw
  (:require [ewen.cle-usb.data :as data]
            [domina :refer [single-node]]
            [domina.css :refer [sel]]
            [domina.events :refer [listen! unlisten!
                                   prevent-default raw-event
                                   listen-once! current-target]]
            [cljs.core.async :as async]
            [ewen.async-plus :as async+]
            [sablono.core :refer-macros [html html-expand]]
            [datascript :as ds]
            [clojure.string]
            [cljs.core.match]
            [goog.style :as gstyle]
            [ewen.cle-usb.sortable :as sortable])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [ewen.cle-usb.render-raw :refer [with-this]]
                   [cljs.core.match.macros :refer [match]]
                   [ewen.async-plus.macros :as async+m]))



(extend-type cljs.core.async.impl.channels/ManyToManyChannel
  ds/IPublish
  (publish [this report]
    (async/put! this report)))



(def ^:dynamic *component*)

(defn render
      "Given a ReactJS component, immediately render it, rooted to the
    specified DOM node."
      [component node]
      (.renderComponent js/React component node))

(defn keyword->string [arg]
      (let [namespace (namespace arg)]
           (if namespace (str namespace "/" (name arg))
                         (name arg))))

(defn get-state [comp]
      (when-let [react-state (.-state comp)]
                (aget react-state (keyword->string ::state))))

(defn replace-state! [comp next-state]
  (.replaceState comp (js-obj (keyword->string ::state) next-state)))

(defn get-props [comp]
  (-> comp .-props (aget (keyword->string ::props))))

(defn get-statics [comp]
  (-> comp .-props (aget (keyword->string ::statics))))



(defn bind-lifecycle-method-args [[method-key method]]
  (cond (= :getInitialState method-key)
        {:getInitialState (fn [] (with-this
                                   (let [init-state (method
                                                      (get-props *component*)
                                                      (get-statics *component*))]
                                     (js-obj (keyword->string ::state) init-state))))}
        (= :getDefaultProps method-key)
        {:getDefaultProps (fn [] (with-this (method)))}
        (= :componentWillMount method-key)
        {:componentWillMount (fn []
                               (with-this
                                 (method
                                   (get-props *component*)
                                   (get-state *component*)
                                   (get-statics *component*))))}
        (= :componentDidMount method-key)
        {:componentDidMount (fn []
                              (with-this
                                (method
                                  (get-props *component*)
                                  (get-state *component*)
                                  (get-statics *component*))))}
        (= :componentWillUpdate method-key)
        {:componentWillUpdate (fn [next-props next-state]
                                (with-this
                                  (method
                                    (get-props *component*)
                                    (aget next-props (keyword->string ::props))
                                    (get-state *component*)
                                    (aget next-state (keyword->string ::state))
                                    (get-statics *component*))))}
        (= :componentDidUpdate method-key)
        {:componentDidUpdate (fn [prev-props prev-state]
                               (with-this
                                 (method
                                   (aget prev-props (keyword->string ::props))
                                   (get-props *component*)
                                   (aget prev-state (keyword->string ::state))
                                   (get-state *component*)
                                   (get-statics *component*))))}
        (= :componentWillUnmount method-key)
        {:componentWillUnmount (fn []
                                 (with-this (method
                                              (get-props *component*)
                                              (get-state *component*)
                                              (get-statics *component*))))}
        (= :componentWillReceiveProps method-key)
        {:componentWillReceiveProps (fn [next-props]
                                      (with-this (method
                                                   next-props
                                                   (get-props *component*)
                                                   (get-state *component*)
                                                   (get-statics *component*))))}
        :else {method-key method}))

(defn bind-other-method-args [[method-key method]]
  (cond (= :shouldComponentUpdate method-key)
        {:shouldComponentUpdate method}
        (= :render method-key)
        {:render (fn []
                   (with-this
                     (method
                       (get-props *component*)
                       (get-state *component*)
                       (get-statics *component*))))}
        :else {method-key method}))

(defn bind-methods-args-comp [methods-args]
      (->> (map bind-lifecycle-method-args methods-args)
           (apply merge)
           (map bind-other-method-args)
           (apply merge)))

(defn bind-methods-args-mixin [methods-args]
  (->> (map bind-lifecycle-method-args methods-args)
       (apply merge)))

(defn map->js-obj [in-map]
      (apply js-obj (mapcat (fn [[k v]] [(keyword->string k) v]) in-map)))


(defn component-raw [name methods-map]
  (let [default-methods {:shouldComponentUpdate
                                      (fn [next-props next-state]
                                        (this-as this
                                                 (or (not= (get-state this) next-state)
                                                     (not= (get-props this) next-props))))
                         :displayName name}
        methods-map (merge default-methods methods-map)
        methods-map (bind-methods-args-comp methods-map)
        react-component (.createClass js/React (clj->js methods-map))]
    (fn [props statics react-keys]
      (react-component (->> (merge {::props props ::statics statics} react-keys)
                            map->js-obj)))))

(defn mixin [methods-map]
  (let [methods-map (bind-methods-args-mixin methods-map)]
    (map->js-obj methods-map)))










(def event-types
  "A map from keywords to event types. Useful for multiplatform (desktop/mobile) compatibility."
  (if (js* "'ontouchstart' in window")
    {:down  :touchstart
     :up    :touchend
     :move  :touchmove
     :over  :touchstart
     :out   :touchend
     :click :tap}
    {:down  :mousedown
     :up    :mouseup
     :move  :mousemove
     :over  :mouseover
     :out   :mouseout
     :click :click}))


;Drag and drop
(defn event->pos [e]
  (let [e (-> (raw-event e)
              (.getBrowserEvent))]
    (if (.-changedTouches e)
      {:x (-> e (.-changedTouches)
              (.item 0)
              (.-pageX))
       :y (-> e (.-changedTouches)
              (.item 0)
              (.-pageY))}
      {:x (.-pageX e) :y (.-pageY e)})))

(defn g-pos->pos [g-pos]
  {:x (.-x g-pos) :y (.-y g-pos)})

(defn dd-down-callback [app id e]
  (prevent-default e)
  (data/set-dragging! app id true)
  (data/set-handle-pos! app id (let [init-pos (data/get-init-pos @app id)]
                                 (- (:y (event->pos e)) init-pos))))

(defn dd-up-callback [app id]
  (data/set-dragging! app id false))

(defn merge-pos
  [pos handle-pos]
  (- (:y pos) handle-pos))

(defn dd-move-callback [app id e]
  (when (data/get-dragging @app id)
    (let [handle-pos (-> (ds/entity @app id) :state/handle-pos)]
      (data/set-pwd-pos! app id (merge-pos (event->pos e)
                                           handle-pos)))))
















;The header react component
(def header
  (component-raw "header"
                 {:render (fn []
                            (html [:div#action-bar
                                   [:img#logo-action-bar
                                    {:src "img/logo_action_bar.png"}]
                                   [:img#action-bar-divider
                                    {:src "img/action_bar_divider.png"}]
                                   [:img#action-bar-title
                                    {:src "img/action_bar_title.png"}]
                                   [:div.dropdown.menu
                                    [:button.navbar-toggle
                                     {:data-toggle "dropdown"
                                      :type "button"}
                                     [:span.icon-bar]
                                     [:span.icon-bar]
                                     [:span.icon-bar]]
                                    [:ul.dropdown-menu
                                     {:role "menu"
                                      :aria-labelledby "dLabel"}
                                     [:li
                                      [:a.home-link {:href "#"}
                                       "Home"]
                                      [:a.new-pwd-link {:href "#"}
                                       "Add new password"]]]]]))
                  :componentDidMount (fn [_ _ {:keys [app]}]
                                       (listen! (-> (.getDOMNode *component*)
                                                    (sel ".home-link"))
                                                (:click event-types)
                                                #(data/set-view! app :home))
                                       (listen! (-> (.getDOMNode *component*)
                                                    (sel ".new-pwd-link"))
                                                (:click event-types)
                                                #(data/set-view! app :new-password)))
                  :componentWillUnmount (fn []
                                          (unlisten! (-> (.getDOMNode *component*)
                                                         (sel ".home-link"))
                                                     (:click event-types))
                                          (unlisten! (-> (.getDOMNode *component*)
                                                         (sel ".new-pwd-link"))
                                                     (:click event-types)))}))



(defn listen-password-label! [comp app pwd-id callback]
  (let [index-keys #{[@app :eavt pwd-id :password/label]}]
    (ds/listen! app callback
                index-keys)))



(def password-button
  (component-raw "password-button"
                 {:render (fn [_ label _]
                            (html [:div.pwd-button
                                   [:p label]]))
                  :getInitialState (fn [{:keys [id]} {:keys [app]}]
                                     (:password/label (ds/entity @app id)))
                  :componentWillMount (fn [{:keys [id]} _ {:keys [app]}]
                                        (let [comp *component*
                                              chan (async/chan)]
                                          (go-loop []
                                                   (when-let [{:keys [tx-data]} (async/<! chan)]
                                                     (let [state (atom (get-state comp))]
                                                       (when @state
                                                         (doseq [datom tx-data]
                                                           (match [datom]
                                                                  [{:e     pwd-id
                                                                    :a     :password/label
                                                                    :v     label
                                                                    :added true}] (reset! state label)
                                                                  :else nil))
                                                         (replace-state! comp @state)))
                                                     (recur))
                                                   (async/close! chan))
                                          (data/set-attr! app id :password-button-callback chan)
                                          (listen-password-label! comp app id chan)))
                  :componentWillUnmount(fn [{:keys [id]} _ {:keys [app]}]
                                         (ds/unlisten! app (-> (ds/entity @app id) :password-button-callback)))}))


(defn listen-dragging-helper! [app pwd-id callback]
  (let [index-keys (data/get-index-keys data/get-dragging app pwd-id)]
    (ds/listen! app callback index-keys)))

(defn listen-dragging! [app id callback]
  (listen-dragging-helper! app id callback))



(def dd-handle-mixin
  (mixin
    {:componentDidMount (fn [{:keys [id]} _ {:keys [app]}]
                          (listen! (.getDOMNode *component*)
                                   (:down event-types)
                                   #(dd-down-callback app id %))
                          (let [chan (async/chan)]
                            (go-loop []
                                     (when-let [{:keys [tx-data]} (async/<! chan)]
                                       (doseq [datom tx-data]
                                         (match [datom]
                                                [{:e     id
                                                  :a     :state/dragging
                                                  :v     true
                                                  :added true}] (do (listen! (:move event-types)
                                                                             #(dd-move-callback app id %))
                                                                    (listen! (:up event-types)
                                                                             #(dd-up-callback app id)))
                                                :else nil))
                                       (recur))
                                     (async/close! chan))
                            (data/set-attr! app id :handle-start-dragging-chan chan)
                            (listen-dragging! app id chan))
                          (let [chan (async/chan)]
                            (go-loop []
                                     (when-let [{:keys [tx-data]} (async/<! chan)]
                                       (doseq [datom tx-data]
                                         (match [datom]
                                                [{:e     id
                                                  :a     :state/dragging
                                                  :v     false
                                                  :added true}] (do (unlisten! domina/root-element (:move event-types))
                                                                    (unlisten! domina/root-element (:up event-types)))
                                                :else nil))
                                       (recur))
                                     (async/close! chan))
                            (data/set-attr! app id :handle-stop-dragging-chan chan)
                            (listen-dragging! app id chan)))
     :componentWillUnmount (fn [{:keys [id]} _ {:keys [app]}]
                             (unlisten! (.getDOMNode *component*)
                                        (:down event-types))
                             (ds/unlisten! app (-> (ds/entity @app id) :handle-start-dragging-chan))
                             (ds/unlisten! app (-> (ds/entity @app id) :handle-stop-dragging-callback)))}))

(def password-handle
  (component-raw "password-handle"
                 {:render (fn []
                            (html [:div.pwd-dragdrop
                                   [:img {:src "img/1_navigation_collapse.png"}]
                                   [:img {:src "img/1_navigation_expand.png"}]]))
                  :mixins #js [dd-handle-mixin]}))






(defn listen-password-dragging! [comp app pwd-id callback]
  (let [index-keys (data/get-index-keys data/get-dragging app pwd-id)]
    (ds/listen! app callback
                index-keys)))

(defn listen-password-pos! [comp app pwd-id callback]
  (let [index-keys (data/get-index-keys data/get-password-pos app pwd-id)]
    (ds/listen! app
                callback
                index-keys)))

(def dd-target-mixin-render
  (fn [{:keys [id]}
       {:keys [dragging pos] :as state}
       {:keys [app]}
       render-comp]
    (let [node (when (.isMounted *component*) (.getDOMNode *component*))
          width (if node (.-width (gstyle/getSize node)) nil)
          height (if node (.-height (gstyle/getSize node)) nil)
          #__ #_(.log js/console (str id " " dragging " " pos))
          style-pos (if (and dragging pos)
                      {:position "absolute" :top pos}
                      {:position "static" :z-index 0})
          dim (if width {:width width} {})
          dim (merge dim (if height {:height height} {}))
          style (merge dim style-pos)]
      (.cloneWithProps js/React.addons render-comp (clj->js {:style style})))))

(def dd-target-mixin
  (mixin
    {:getInitialState (fn [{:keys [id]} {:keys [app]}]
                        {:dragging (data/get-dragging @app id)
                         :pos      (-> (ds/entity @app id) :password/pos)})
     :componentWillUnmount (fn [{:keys [id]} _ {:keys [app]}]
                             (ds/unlisten! app (-> (ds/entity @app id) :dd-target-dragging-chan))
                             (ds/unlisten! app (-> (ds/entity @app id) :dd-target-pos-chan)))
     :componentDidMount (fn [{:keys [id]} _ {:keys [app]}]
                          (let [comp *component*
                                chan (async/chan)]
                            (go-loop []
                                     (when-let [{:keys [tx-data]} (async/<! chan)]
                                       (when-let [state (get-state comp)]
                                         (let [state (transient state)]
                                           (doseq [datom tx-data]
                                             (match [datom]
                                                    [{:e     id
                                                      :a     :state/dragging
                                                      :v     dragging
                                                      :added true}] (assoc! state :dragging dragging)
                                                    :else nil))
                                           (when (.isMounted comp)
                                             (replace-state! comp (persistent! state)))))
                                       (recur))
                                     (async/close! chan))
                            (data/set-attr! app id :dd-target-dragging-chan chan)
                            (listen-password-dragging! *component* app id chan))

                          (let [comp *component*
                                chan (async/chan)]
                            (go-loop []
                                     (when-let [{:keys [tx-data]} (async/<! chan)]
                                       (when-let [state (get-state comp)]
                                         (let [state (transient state)]
                                           (doseq [datom tx-data]
                                             (match [datom]
                                                    [{:e     id
                                                      :a     :password/pos
                                                      :v     pos
                                                      :added true}] (assoc! state :pos pos)
                                                    :else nil))
                                           (when (.isMounted comp)
                                             (replace-state! comp (persistent! state)))))
                                       (recur))
                                     (async/close! chan))
                            (data/set-attr! app id :dd-target-pos-chan chan)
                            (listen-password-pos! *component* app id chan))

                          (let [node (.getDOMNode *component*)
                                init-pos (gstyle/getPosition node)]
                            (data/set-init-pos! app id (-> (g-pos->pos init-pos) :y))
                            (data/set-pwd-pos! app id (-> (g-pos->pos init-pos) :y))))
     :componentDidUpdate (fn [_ {:keys [id]} old-state new-state {:keys [app]}]
                           (when (and (:dragging old-state)
                                      (not (:dragging new-state)))
                             (let [node (.getDOMNode *component*)
                                   init-pos (gstyle/getPosition node)]
                               (data/set-init-pos! app id (-> (g-pos->pos init-pos) :y))
                               (data/set-pwd-pos! app id (-> (g-pos->pos init-pos) :y)))))}))

(def password
  (component-raw "password"
                 {:render (fn [{:keys [id]}
                               {:keys [dragging pos] :as state}
                               {:keys [app]}]
                            (->> (html [:div.password
                                        (password-button {:id id} {:app app})
                                        (password-handle {:id id} {:app app})])
                                 (dd-target-mixin-render {:id id}
                                                  {:dragging dragging :pos pos}
                                                  {:app app})))
                  :mixins #js [dd-target-mixin]}))




(def placeholder
  (component-raw "placeholder"
                 {:render (fn [{:keys [id]}
                               {:keys [dragging width height] :as state}
                               {:keys [app]}]
                            (let [width (aget *component* "width")
                                  height (aget *component* "height")
                                  dim (if width {:width width} {})
                                  dim (merge dim (if height {:height height} {}))]
                              (html [:div (password {:id id} {:app app})
                                     ;Placeholder empty div. This is to avoid the whole list of passwords
                                     ;to move when a password switch to the dragging state.
                                     (when dragging
                                       [:div {:style (clj->js dim)}])])))
                  :getInitialState (fn [{:keys [id]} {:keys [app]}]
                                     {:dragging (data/get-dragging @app id)})
                  :componentDidMount (fn [{:keys [id]} _ {:keys [app]}]
                                       (let [comp *component*
                                             chan (async/chan)]
                                         (data/set-attr! app id :state/placeholder-dragging chan)
                                         (go-loop []
                                                  (when-let [{:keys [tx-data]} (async/<! chan)]
                                                    (when-let [state (get-state comp)]
                                                      (let [state (transient state)]
                                                        (doseq [datom tx-data]
                                                          (match [datom]
                                                                 [{:e     pwd-id
                                                                   :a     :state/dragging
                                                                   :v     dragging
                                                                   :added true}] (assoc! state :dragging dragging)
                                                                 :else nil))
                                                        (when (.isMounted comp)
                                                          (replace-state! comp (persistent! state)))))
                                                    (recur))
                                                  (async/close! chan))
                                         (listen-password-dragging! comp app id chan))
                                       (aset *component* "with" (.-width (gstyle/getSize (.getDOMNode *component*))))
                                       (aset *component* "height" (.-height (gstyle/getSize (.getDOMNode *component*)))))
                  :componentWillUnmount (fn [{:keys [id]} _ {:keys [app]}]
                                          (ds/unlisten! app (-> (ds/entity @app id) :state/placeholder-dragging)))}))







;Sortable
#_(defn build-password-pos-mult [app pwd-id]
  (let [index-keys (data/get-index-keys data/get-password-pos app pwd-id)
        pwd-mult (async/mult (async/chan))
        callback (fn [{:keys [tx-data]}]
                   (doseq [datom tx-data]
                     (match [datom]
                            [{:e     pwd-id
                              :a     :password/pos
                              :v     pos
                              :added true}] (async+/put! pwd-mult pos)
                            :else nil)))]
    (ds/listen! app (keyword (str "password-pos-mult-" pwd-id))
                callback
                index-keys)
    pwd-mult))

(defn assoc-index [vec-of-maps]
  (reduce
    (fn [ret m]
      (conj ret (assoc m :sort-index (+ 1 (or (:sort-index (last ret)) -1)))))
    [] vec-of-maps))

(defn update-positions [vec-of-maps]
  (let [positions (->> (map :pos vec-of-maps) sort)]
    (map (fn [map pos] (assoc map :pos pos)) vec-of-maps positions)))


(defn sort-pwds [pwd-sort]
  (let [sorted (sort-by (comp :pos val) pwd-sort)
        sorted (map (fn [[id {:keys [sort-index pos]}] new-index]
               {id {:sort-index new-index :pos pos}})
             sorted
             (range (count sorted)))]
    (into {} sorted)))

(defn process-updated-index [new-sort-pwd diff]
  (when (and (first diff) (second diff))
      (let [old (->> (first diff)
                     (filter (comp :sort-index val))
                     (into {}))
            new (->> (first diff)
                     (filter (comp :sort-index val))
                     (into {}))
            updated-keys (clojure.set/intersection (-> old keys set)
                                                   (-> new keys set))]
        (when (not-empty updated-keys)
          (select-keys new-sort-pwd updated-keys)))))

#_(defn process-sortables [app]
  (let [pwd-sort-state (atom {})
        ids-pos (data/get-password-ids-indexes-pos @app)
        index-keys (data/get-index-keys data/get-password-ids-indexes-pos app)
        callback (fn [{:keys [tx-data]}]
                   (doseq [datom tx-data]
                     (match [datom]
                            [{:e     pwd-id
                              :a     :password/pos
                              :v     pos
                              :added true}] (swap! pwd-sort-state update-in [pwd-id]
                                                   assoc :pos pos)
                            :else nil))
                   (swap! pwd-sort-state sort-pwds))]
    (doseq [[id pos] ids-pos]
      (swap! pwd-sort-state assoc id {:pos pos}))
    (swap! pwd-sort-state sort-pwds)
    (ds/listen! app :passwords-sortable
                callback
                index-keys)
    (add-watch pwd-sort-state :watch-sortable
               (fn [key ref old new]
                 (->> (process-updated-index new (clojure.data/diff old new))
                      (data/set-sort-indexes! app))))))

#_({1 {:index 0}, 2 {:index 1}} {1 {:index 1}, 2 {:index 0}} {1 {:pos 123}, 2 {:pos 122}})










(defn handle-new-sort-index! [id-indexes-map id new-sort-index]
  (assoc! id-indexes-map id {:sort-index new-sort-index}))

#_(defn listen-passwords-ids-indexes! [comp app]
  (let [index-keys (data/get-index-keys data/get-password-ids-indexes app)
        callback (fn [{:keys [tx-data]}]
                   (when-let [state (get-state comp)]
                     (let [state (transient state)]
                       (doseq [datom tx-data]
                         (match [datom]
                                [{:e     id
                                  :a     :state/sort-index
                                  :v     new-sort-index
                                  :added true}] (handle-new-sort-index! state id new-sort-index)
                                :else nil))
                       (replace-state! comp (persistent! state)))))]
    (ds/listen! app :passwords-ids-indexes
                callback
                index-keys)))



(def not-nil? (comp not nil?))

(defn compare* [x y]
  (cond
    (and (nil? x) (not-nil? y)) 1
    (and (nil? y) (not-nil? x)) -1
    :else (compare x y)))


(defn normalize-sort-indexes [in-map]
  (->> (sort-by (comp :sort-index second) compare* in-map)
       (map (fn [i [key {:keys [sort-index]}]] [key {:sort-index i}]) (range (count in-map)))
       (into {})))

(defn apply-pos-updates [sort-state updates]
  (let [sort-state (atom sort-state)]
    (doseq [[ks v] updates]
      (swap! sort-state assoc-in ks v))
    @sort-state))


(defn pos-callback [ids sort-state {:keys [tx-data]}]
  (let [updates (->> (map (fn [datom]
                            (match [datom]
                                   [{:e     (id :guard (fn [id] (some #(= id %) @ids)))
                                     :a     :password/pos
                                     :v     new-pos
                                     :added true}]
                                   [[id :pos] new-pos]
                                   :else nil))
                          tx-data)
                     (filter not-nil?))]
    (when (not-empty updates)
      (swap! sort-state apply-pos-updates updates))))


(defn apply-index-updates [sort-state updates]
  (->> (loop [[[map-keys new-sort-index] & r] updates
             sort-state sort-state]
        (if (empty? r)
          (assoc-in sort-state map-keys new-sort-index)
          (recur r (assoc-in sort-state map-keys new-sort-index))))
       (sort-by (comp :sort-index val) compare*)
       (into {})))

(defn index-callback [ids sort-state {:keys [tx-data]}]
  (let [updates (map (fn [datom]
                          (match [datom]
                                 [{:e     (id :guard (fn [id] (some #(= id %) @ids)))
                                   :a     :state/sort-index
                                   :v     new-sort-index
                                   :added true}]
                                 [[id :sort-index] new-sort-index]
                                 :else nil))
                        tx-data)
        updates (filter not-nil? updates)]
    (when (not-empty updates)
      (swap! sort-state apply-index-updates updates))))

#_(defn listen-pos! [app pos-callback id]
  (let [index-keys (->> (ds/pattern->index-keys [id :password/pos nil nil])
                        (into [app])
                        (conj #{}))]
    (ds/listen! app (keyword (str "sortable-pos-" id)) pos-callback index-keys)))

#_(defn listen-index! [app index-callback id]
  (let [index-keys (->> (ds/pattern->index-keys [id :state/sort-index nil nil])
                        (into [app])
                        (conj #{}))]
    (ds/listen! app (keyword (str "sortable-index-" id)) index-callback index-keys)))

(defn pos->index-keys* [app id]
  (->> (ds/pattern->index-keys [id :password/pos nil nil])
       (into [app])))

(defn sort-index->index-keys* [app id]
  (->> (ds/pattern->index-keys [id :state/sort-index nil nil])
       (into [app])))

(defn pos->index-keys [app ids]
  (->> (map (partial pos->index-keys* app) ids)
       (into #{})))

(defn sort-index->index-keys [app ids]
  (->> (map (partial sort-index->index-keys* app) ids)
       (into #{})))


(defn sortable-add-ids [sort-state db ids]
  (let [sort-state (atom sort-state)]
    (doseq [id ids]
      (let [index (-> (ds/entity db id)
                      :state/sort-index)
            pos (-> (ds/entity db id)
                    :password/pos)]
        (swap! sort-state assoc-in [id :sort-index] index)
        (swap! sort-state assoc-in [id :pos] pos)))
    (into {} (sort-by (comp :sort-index val) compare* @sort-state))))

(defn sortable-rem-ids [sort-state ids]
  (let [sort-state (atom sort-state)]
    (doseq [id ids]
      (swap! sort-state dissoc id))
    (into {} (sort-by (comp :sort-index val) compare* @sort-state))))


(defn sortable-no-nil-pos-add-ids [sort-state items n]
  (let [sort-state (atom sort-state)]
    (doseq [[id _] items]
      (swap! sort-state assoc id (-> (get n id) (dissoc :sort-index))))
    (into {} (sort-by (comp :pos val) @sort-state))))

(defn sortable-no-nil-pos-rem-ids [sort-state ids]
  (let [sort-state (atom sort-state)]
    (doseq [id ids]
      (swap! sort-state dissoc id))
    (into {} (sort-by (comp :pos val) @sort-state))))

(defn set-no-nil [coll]
  (set coll))

(defn keys-index-changed [m1 m2]
  (let [[diff1 diff2 _] (clojure.data/diff (keys m1) (keys m2))]
    (-> (clojure.set/intersection (set diff1) (set diff2))
         (disj nil))))



(defn listen-passwords-ids! [react-comp app ids chan-pos chan-sort-index]
  (let [db @app
        sort-state (atom {})
        sort-state-no-nil-pos (atom {})
        ids-callback (fn [_ _ o n]
                       (ds/listen! app chan-pos (pos->index-keys app n))
                       (ds/listen! app chan-sort-index (sort-index->index-keys app n))
                       (let [rem-ids (clojure.set/difference o n)
                             add-ids (clojure.set/difference n o)]
                         (swap! sort-state sortable-add-ids @app add-ids)
                         (swap! sort-state sortable-rem-ids rem-ids)))
        sort-state-callback (fn [_ _ o n]
                              (let [diff (clojure.data/diff o n)
                                    #_rem-items #_(first (clojure.data/diff (keys (first diff))
                                                                         (keys (second diff))))
                                    rem-items (->> (first diff)
                                                   (filter (comp :pos val))
                                                   (map first)
                                                   (select-keys (second diff))
                                                   (filter (comp nil? :pos val))
                                                   (map first))
                                    add-items (->> (second diff)
                                                   (filter (comp :pos val)))]

                                #_(reset! sort-state-no-nil-pos (->> (filter (comp :pos val) n)
                                                                   (sort-by (comp :pos val))
                                                                   (into {})))

                                (when (not-empty add-items)
                                  (swap! sort-state-no-nil-pos sortable-no-nil-pos-add-ids add-items n))
                                (when (not-empty rem-items)
                                  (swap! sort-state-no-nil-pos sortable-no-nil-pos-rem-ids rem-items))))]
    (swap! sort-state sortable-add-ids @app @ids)
    (swap! sort-state-no-nil-pos sortable-no-nil-pos-add-ids (vec @sort-state) @sort-state)
    (go-loop []
             (when-let [report (async/<! chan-pos)]
               (pos-callback ids sort-state report)
               (recur))
             (async/close! chan-pos))
    (go-loop []
             (when-let [report (async/<! chan-sort-index)]
               (index-callback ids sort-state report)
               (recur))
             (async/close! chan-sort-index))
    (add-watch sort-state-no-nil-pos :sort-state-no-nil-pos-updates
               (fn [_ _ o n]
                 (let [keys-changed (keys-index-changed o n)
                       o-filtered (->> (select-keys o keys-changed)
                                       (sort-by (comp :pos val)))
                       n-filtered (->> (select-keys n keys-changed)
                                       (sort-by (comp :pos val)))
                       sort-updates (->> (map (fn [[id _] [id-sorted _]]
                                                (if (= id id-sorted)
                                                  nil
                                                  [id id-sorted]))
                                              o-filtered n-filtered)
                                         (filter not-nil?)
                                         (mapv (fn [[id new-sort-id]]
                                                 (let [db @app]
                                                   {:db/id            id
                                                    :state/sort-index (-> (ds/entity db new-sort-id)
                                                                          :state/sort-index)
                                                    :state/init-pos (-> (ds/entity db new-sort-id)
                                                                        :state/init-pos)
                                                    :password/pos (-> (ds/entity db new-sort-id)
                                                                      :state/init-pos)}))))]
                   (when (not-empty sort-updates)
                     (ds/transact! app sort-updates)))))
    (add-watch sort-state :sort-state->sort-state-no-nil-pos sort-state-callback)
    (add-watch sort-state :sort-state-updates (fn [_ _ _ n]
                                                (replace-state! react-comp n)))
    (add-watch ids :ids-updates ids-callback)
    (ds/listen! app chan-pos (pos->index-keys app @ids))
    (ds/listen! app chan-sort-index (sort-index->index-keys app @ids))))


(defn process-updated-index2 [diff]
  (when (and (first diff) (second diff))
    (let [old (->> (first diff)
                   (filter (comp :sort-index val))
                   (into {}))
          new (->> (first diff)
                   (filter (comp :sort-index val))
                   (into {}))]
      (clojure.set/intersection (-> old keys set)
                                (-> new keys set)))))


;Cannot use the javascript .indexOf method since it does an identity comparison
;instead of a value comparison
(defn index-of [coll item]
  (loop [[first-item & r] (seq coll)
         i 0]
    (if (nil? first-item)
      -1
      (if (= first-item item)
        i
        (recur r (+ 1 i))))))


(defn permute [m permutations]
  (let [m (vec m)]
    (loop [sorted-m m
           [p prest] [(first permutations) (rest permutations)]]
      (println sorted-m " \n")
      (if (nil? p)
        sorted-m
        (recur (assoc sorted-m (first p) (m (second p))
                               (second p) (m (first p)))
               prest)))))

(comment
  (let [mm
        {0 {:pos nil}
         1 {:pos 3}
         2 {:pos nil}
         3 {:pos 2}
         4 {:pos 4}
         5 {:pos 5}
         6 {:pos 6}
         7 {:pos 7}
         8 {:pos 8}}
        mm-pos (map (fn [item pos] [item pos]) mm (range (count mm)))
        filtered (filter (comp not-nil? :pos val first) mm-pos)
        sorted-pos (sort-by (comp :pos val first) filtered)
        permutations (->> (map (fn [[_ index1] [_ index2]]
                                 (when (not (= index1 index2))
                                   #{index1 index2}))
                               filtered sorted-pos)
                          (filter not-nil?)
                          set)
        sorted-mm (permute mm permutations)]
    (index-of mm [1 {:pos 3}])
    mm-pos
    filtered
    sorted-pos
    permutations
    sorted-mm)

  )

(defn set-sortable-pos-chan! [app chan]
  (ds/transact! app [{:db/id -1
                      :sortable/chan-pos chan}]))

(defn set-sortable-sort-index-chan! [app chan]
  (ds/transact! app [{:db/id -1
                      :sortable/chan-sort-index chan}]))

(defn get-sortable-pos-chan-id [db]
  (-> (ds/q '[:find ?id
              :where [?id :sortable/chan-pos _]]
            db)
      data/only))

(defn get-sortable-sort-index-chan-id [db]
  (-> (ds/q '[:find ?id
              :where [?id :sortable/chan-sort-index _]]
            db)
      data/only))

(defn retract-sortable-pos-chan! [app]
  (let [id (get-sortable-pos-chan-id @app)]
    (ds/transact! app [[:db.fn/retractAttribute id :sortable/chan-pos]])))

(defn retract-sortable-sort-index-chan! [app]
  (let [id (get-sortable-sort-index-chan-id @app)]
    (ds/transact! app [[:db.fn/retractAttribute id :sortable/chan-sort-index]])))

;TODO Store sortable-mixin id locally since there can be multiple sortable-mixin
(def sortable-mixin
  (mixin
    {:getInitialState      (fn [_ {:keys [app]}]
                             (->> (map (fn [id] {id {:sort-index (-> (ds/entity @app id)
                                                                     :state/sort-index)}})
                                       @(.-ids *component*))
                                  (apply merge)
                                  (sort-by (comp :sort-index val) compare*)
                                  (into {})))
     :componentDidMount    (fn [_ _ {:keys [app]}]
                             (let [chan-pos (async/chan)
                                   chan-sort-index (async/chan)]
                               (set-sortable-pos-chan! app chan-pos)
                               (set-sortable-sort-index-chan! app chan-sort-index)
                               (listen-passwords-ids! *component* app (.-ids *component*) chan-pos chan-sort-index)))
     :componentWillUnmount (fn [_ state {:keys [app]}]
                             (remove-watch (.-ids *component*) :ids-updates)
                             (ds/unlisten! app (->> (get-sortable-pos-chan-id @app) (ds/entity @app) :sortable/chan-pos))
                             (ds/unlisten! app (->> (get-sortable-sort-index-chan-id @app) (ds/entity @app) :sortable/chan-sort-index))
                             (retract-sortable-pos-chan! app)
                             (retract-sortable-sort-index-chan! app))}))





(def passwords-list
  (component-raw "passwords-list"
                 {:render               (fn [_ state {:keys [app]}]
                                          (html [:div#list-pwd
                                                 (map (fn [[id _]]
                                                        (placeholder {:id id} {:app app} {:key id :ref id}))
                                                      state)]))
                  :mixins               #js [sortable-mixin]
                  :ids                  (atom #{})
                  #_:getInitialState #_(fn [_ {:keys [app]}]
                                     (->> (data/get-list-passwords @app)
                                          (map (fn [[id]] {id {:sort-index nil}}))
                                          (apply merge)))
                  :componentDidMount   (fn [_ _ {:keys [app]}]
                                          (let [react-comp *component*
                                                index-keys (data/get-index-keys data/get-list-passwords app)
                                                ids (data/get-list-passwords @app)
                                                chan (async/chan)]
                                            (go-loop []
                                                     (when-let [{:keys [tx-data]} (async/<! chan)]
                                                       (doseq [datom tx-data]
                                                         (match [datom]
                                                                [{:e     pwd-id
                                                                  :a     :password/label
                                                                  :v     _
                                                                  :added true}]
                                                                (swap! (.-ids react-comp) conj pwd-id)
                                                                [{:e     pwd-id
                                                                  :a     :password/label
                                                                  :v     _
                                                                  :added false}]
                                                                (swap! (.-ids react-comp) disj pwd-id)
                                                                :else nil)))
                                                     (async/close! chan))
                                            (data/set-pwd-list-chan! app chan)
                                            (ds/listen! app chan index-keys)
                                            (doseq [[id] ids]
                                              (swap! (.-ids *component*) conj id))))
                  :componentWillUnmount (fn [_ _ {:keys [app]}]
                                          (ds/unlisten! app (data/get-pwd-list-chan @app))
                                          (data/retract-pwd-list-chan! app))}))



#_(def passwords-list
  (component-raw "passwords-list"
                 {:render (fn [_ state {:keys [app]}]
                            (html [:div#list-pwd
                                   (map (fn [[id _]]
                                          (placeholder {:id id} {:app app} {:key id :ref id}))
                                        (sort-by (comp :sort-index second) state))]))
                  :getInitialState (fn [_ {:keys [app]}]
                                     (->> (data/get-password-ids-indexes @app)
                                          (map (fn [[id sort-index]] {id {:sort-index sort-index}}))
                                          (apply merge)))
                  :componentDidMount (fn [_ _ {:keys [app]}]
                                       (listen-passwords-ids-indexes! *component* app)
                                       (process-sortables app))
                  :componentWillUnmount (fn [_ state {:keys [app]}]
                                          (ds/unlisten! app :passwords-ids-indexes)
                                          (doseq [[id _] state]
                                            (ds/unlisten! app :passwords-sortable)))
                  :componentDidUpdate (fn [_ _ old-state new-state {:keys [app]}]
                                        (let [updated-keys (process-updated-index2
                                                             (clojure.data/diff old-state new-state))]
                                          (doseq [key updated-keys]
                                            (when-not (-> (ds/entity @app key) :state/dragging)
                                              (let [init-pos (-> (aget (.-refs *component*) key)
                                                                 (.getDOMNode)
                                                                 gstyle/getPosition)]
                                                (data/set-init-pos! app key (-> (g-pos->pos init-pos) :y))
                                                (data/set-pwd-pos! app key (-> (g-pos->pos init-pos) :y)))))))}))




(def new-password
  (component-raw "new-password"
             {:render (fn []
                        (html [:div
                               [:div#password-label-wrapper.section
                                [:div.section-header [:h2 "Password label"]]
                                [:input#password-label {:placeholder "Password label"
                                                        :type        "text"
                                                        :value       ""}]]
                               [:div#password-value-wrapper.section
                                [:div.section-header
                                 [:h2 "Password value"]]
                                [:input#password-value {:placeholder "Password value"
                                                        :type        "password"
                                                        :value       ""}]]
                               [:div.action-buttons [:input#new-password-button
                                                       #_(assoc-if false
                                                               {:type    "button"
                                                                :value   "Validate"}
                                                               :disabled "disabled")]]
                               [:p#err-msg]]))}))






;Rendering functions for each pages
(defmulti render-app (fn [app view] view))

(defmethod render-app :home [app view]
           (render (header nil {:app app})
                     (-> (sel "#header") single-node))
           (render (passwords-list nil {:app app})
                     (-> (sel "#app") single-node)))

(defmethod render-app :new-password [app view]
           (render (header nil {:app app})
                     (-> (sel "#header") single-node))
           (render (new-password)
                     (-> (sel "#app") single-node)))



;; Here we use an atom to tell us if we already have a render queued
;; up; if so, requesting another render is a no-op
(let [render-pending? (atom false)
      render-queued? (atom false)]
     (defn request-render
           "Render the given application state tree."
           [app view]
           (if (compare-and-set! render-pending? false true)
             (.requestAnimationFrame js/window
                                     (fn []
                                         (render-app app view)
                                         (while @render-queued?
                                                (let [view @render-queued?]
                                                     (render-app app view)
                                                     (reset! render-queued? false)))
                                         (reset! render-pending? false)))
             (reset! render-queued? view))))



(comment

  (load-namespace 'cle-usb.client-core)
  (def aa com.ewen.cle-usb.core-datascript/app)


  (get-channels @aa)
  (ds/q '[:find ?id ?name ?comp
          :where [?id :react/name ?name]
          [?id :react/component ?comp]]
        @aa)

  (ds/q '[:find ?id ?comp
          :where [?id :react/name "header"]
          [?id :react/component ?comp]]
        @aa)

  (ds/transact! aa [
                     [:db.fn/retractAttribute 6 :react-state/channels]

                     ])


  (ds/entity @aa 6)
  (= (:react-state/channels (ds/entity @aa 6)) (:react-state/channels (ds/entity @aa 6)))








  (load-namespace 'ewen.cle-usb.core-datascript)
  (def aa com.ewen.cle-usb.core-datascript/app)
  (def aa (ds/create-conn))


  (ds/listen! aa :ll #(.log js/console (str (:tx-data %))))
  (ds/listen! aa :ll #(.log js/console %))
  (ds/unlisten! aa :ll)

  (ds/transact! aa [
                     {:db/id -1
                      :rr "rr"
                      :tt "e"}

                     ])





  (v/replacement-maps (list (ds/Datom. 18 :rr "rr" 34524 true)
                            (ds/Datom. 19 :rr "rr" 34525 false)
                            (ds/Datom. 20 :react-state/rr2 "rr2" 34526 true)
                            (ds/Datom. 20 :react-state/rr2 "rr3" 34526 true)
                            (ds/Datom. 20 :react-state/rr2 "rr4" 34526 false)
                            (ds/Datom. 21 :react-state/rr3 "rr3" 34527 false)))



  (load-namespace 'ewen.cle-usb.core-datascript)
  (def aa com.ewen.cle-usb.core-datascript/app)

  (get-list-passwords @aa)


  (def app (data/load-app))

  (->> (data/get-passwords-dragging-metrics @app 2)
       (map (fn [[dragging pos width height label]] {:dragging dragging
                                                  :pos pos
                                                  :width width
                                                  :height height
                                                  :label label}))
       first)

  (load-namespace 'ewen.cle-usb.client-core)


  )
