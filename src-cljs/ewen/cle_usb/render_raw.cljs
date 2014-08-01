(ns ewen.cle-usb.render-raw
  (:require [ewen.cle-usb.data :as data]
            [domina :refer [single-node]]
            [domina.css :refer [sel]]
            [domina.events :refer [listen! unlisten!
                                   prevent-default raw-event
                                   listen-once! current-target]]
            [cljs.core.async :as async]
            [ewen.async-plus :as async+]
            [sablono.core :as html :refer-macros [html html-expand]]
            [datascript :as ds]
            [clojure.string]
            [cljs.core.match]
            [goog.style :as gstyle]
            [ewen.cle-usb.sortable :as sortable])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [ewen.cle-usb.render-raw :refer [with-this]]
                   [cljs.core.match.macros :refer [match]]
                   [ewen.async-plus.macros :as async+m]))

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



(defn bind-method-args [[method-key method]]
      (cond (= :shouldComponentUpdate method-key)
            {:shouldComponentUpdate method}
            (= :render method-key)
            {:render (fn []
                         (with-this
                           (method
                             (get-props *component*)
                             (get-state *component*)
                             (get-statics *component*))))}
            (= :getInitialState method-key)
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
                                          (get-state *component*)
                                          (aget next-props (keyword->string ::props))
                                          (aget next-state (keyword->string ::state))
                                          (get-statics *component*))))}
            (= :componentDidUpdate method-key)
            {:componentDidUpdate (fn [prev-props prev-state]
                                     (with-this
                                       (method
                                         (aget prev-props (keyword->string ::props))
                                         (aget prev-state (keyword->string ::state))
                                         (get-props *component*)
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
                                                       (get-statics *component*))))}))

(defn bind-methods-args [methods-args]
      (->> (map bind-method-args methods-args)
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
        methods-map (bind-methods-args methods-map)
        react-component (.createClass js/React (clj->js methods-map))]
    (fn [props statics react-keys]
      (react-component (->> (merge {::props props ::statics statics} react-keys)
                            map->js-obj)))))










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



(defn listen-password-label! [comp app pwd-id]
  (let [index-keys #{[@app :eavt pwd-id :password/label]}
        callback (fn [{:keys [tx-data]}]
                   (let [state (atom (get-state comp))]
                     (when @state
                       (doseq [datom tx-data]
                         (match [datom]
                                [{:e     pwd-id
                                  :a     :password/label
                                  :v     label
                                  :added true}] (reset! state label)
                                :else nil))
                       (replace-state! comp @state))))]
    (ds/listen! app (:keyword (str "password-button-" pwd-id))
                callback
                index-keys)))


(def password-button
  (component-raw "password-button"
                 {:render (fn [_ label _]
                            (html [:div.pwd-button
                                   [:p label]]))
                  :getInitialState (fn [{:keys [id]} {:keys [app]}]
                                     (:password/label (ds/entity @app id)))
                  :componentWillMount (fn [{:keys [id]} _ {:keys [app]}]
                                        (listen-password-label! *component* app id))
                  :componentWillUnmount(fn [{:keys [id]} _ {:keys [app]}]
                                         (ds/unlisten! app (:keyword (str "password-button-" id))))}))


(defn listen-password-dragging-helper! [app pwd-id callback key]
  (let [index-keys (data/get-index-keys data/get-dragging app pwd-id)]
    (ds/listen! app key callback index-keys)))

(defn listen-password-dragging! [app pwd-id start-or-stop callback]
  (let [start-or-stop-bool (= :start start-or-stop)]
    (listen-password-dragging-helper! app pwd-id
                               (fn [{:keys [tx-data]}]
                                 (doseq [datom tx-data]
                                   (match [datom]
                                          [{:e     pwd-id
                                            :a     :state/dragging
                                            :v     start-or-stop-bool
                                            :added true}] (callback)
                                          :else nil)))
                               (keyword (str "dragging-" pwd-id "-" (name start-or-stop))))))

(defn unlisten-password-dragging! [app pwd-id start-or-stop]
  (ds/unlisten! app (keyword (str "dragging-" pwd-id "-" (name start-or-stop)))))

(def password-dd
  (component-raw "password-dd"
                 {:render (fn []
                            (html [:div.pwd-dragdrop
                                   [:img {:src "img/1_navigation_collapse.png"}]
                                   [:img {:src "img/1_navigation_expand.png"}]]))
                  :componentDidMount (fn [{:keys [id]} _ {:keys [app]}]
                                       (listen! (.getDOMNode *component*)
                                                (:down event-types)
                                                #(dd-down-callback app id %))
                                       (listen-password-dragging! app id :start
                                                                  (fn []
                                                                    (listen! (:move event-types)
                                                                             #(dd-move-callback app id %))
                                                                    (listen! (:up event-types)
                                                                             #(dd-up-callback app id))))
                                       (listen-password-dragging! app id :stop
                                                                  (fn []
                                                                    (unlisten! domina/root-element (:move event-types))
                                                                    (unlisten! domina/root-element (:up event-types)))))
                  :componentWillUnmount (fn [{:keys [id]} _ {:keys [app]}]
                                          (unlisten! (.getDOMNode *component*)
                                                     (:down event-types))
                                          (unlisten-password-dragging! app id :start)
                                          (unlisten-password-dragging! app id :stop))}))



(def password
  (component-raw "password"
                 {:render (fn [{:keys [id]} _ {:keys [app]}]
                            (html [:div.password
                                   (password-button {:id id} {:app app})
                                   (password-dd {:id id} {:app app})]))}))


(defn listen-password-dragging-metrics! [comp app pwd-id]
  (let [index-keys (data/get-index-keys data/get-passwords-dragging-metrics app pwd-id)
        callback (fn [{:keys [tx-data]}]
                   (when-let [state (get-state comp)]
                     (let [state (transient state)]
                       (doseq [datom tx-data]
                         (match [datom]
                                [{:e     pwd-id
                                  :a     :state/dragging
                                  :v     dragging
                                  :added true}] (assoc! state :dragging dragging)
                                [{:e     pwd-id
                                  :a     :password/pos
                                  :v     pos
                                  :added true}] (assoc! state :pos pos)
                                [{:e     pwd-id
                                  :a     :password/width
                                  :v     width
                                  :added true}] (assoc! state :width width)
                                [{:e     pwd-id
                                  :a     :password/height
                                  :v     height
                                  :added true}] (assoc! state :height height)
                                :else nil))
                       (replace-state! comp (persistent! state)))))]
    (ds/listen! app (keyword (str "password-dragging-" pwd-id))
                callback
                index-keys)))

(defn listen-password-pos! [comp app pwd-id]
  (let [index-keys (data/get-index-keys data/get-password-pos app pwd-id)
        callback (fn [{:keys [tx-data]}]
                   (when-let [state (get-state comp)]
                     (let [state (transient state)]
                       (doseq [datom tx-data]
                         (match [datom]
                                [{:e     pwd-id
                                  :a     :password/pos
                                  :v     pos
                                  :added true}] (assoc! state :pos pos)
                                :else nil))
                       (replace-state! comp (persistent! state)))))]
    (ds/listen! app (keyword (str "password-pos-" pwd-id))
                callback
                index-keys)))

(def placeholder
  (component-raw "placeholder"
                 {:render (fn [{:keys [id]}
                               {:keys [dragging width height pos] :as state}
                               {:keys [app]}]
                            (let [style-pos (if (and dragging pos)
                                        {:position "absolute" :top pos}
                                        {:position "static" :z-index 0})
                                  dim (if width {:width width} {})
                                  dim (merge dim (if height {:height height} {}))
                                  style (merge dim style-pos)]
                              (html [:div [:div {:style style}
                                           (password {:id id} {:app app})]
                                     ;Placeholder empty div. This is to avoid the whole list of passwords
                                     ;to move when a password switch to the dragging state.
                                     (when (and dragging pos)
                                       [:div {:style (clj->js dim)}])])))
                  :getInitialState (fn [{:keys [id]} {:keys [app]}]
                                     (let [not-nil? (complement nil?)
                                           result->map (fn [[dragging width height]] {:dragging dragging
                                                                                      :width    width
                                                                                      :height   height})]
                                       (->> (data/get-passwords-dragging-metrics @app id)
                                            first
                                            result->map
                                            (filter #(-> % val not-nil?))
                                            (into {}))))
                  :componentWillMount (fn [{:keys [id]} _ {:keys [app]}]
                                        (listen-password-dragging-metrics! *component* app id)
                                        (listen-password-pos! *component* app id))
                  :componentDidMount (fn [{:keys [id]} _ {:keys [app]}]
                                       (let [node (.getDOMNode *component*)
                                             width (.-width (gstyle/getSize node))
                                             height (.-height (gstyle/getSize node))
                                             init-pos (gstyle/getPosition node)]
                                         (data/set-pwd-dims! app id width height)
                                         (data/set-init-pos! app id (-> (g-pos->pos init-pos) :y))
                                         (data/set-pwd-pos! app id (-> (g-pos->pos init-pos) :y))))
                  :componentWillUnmount (fn [{:keys [id]} _ {:keys [app]}]
                                          (ds/unlisten! app (keyword (str "password-dragging-" id)))
                                          (ds/unlisten! app (keyword (str "password-pos-" id))))
                  :componentDidUpdate (fn [_ old-state {:keys [id]} new-state {:keys [app]}]
                                        (when (and (:dragging old-state)
                                                   (not (:dragging new-state)))
                                          (let [node (.getDOMNode *component*)
                                                init-pos (gstyle/getPosition node)]
                                            (data/set-init-pos! app id (-> (g-pos->pos init-pos) :y))
                                            (data/set-pwd-pos! app id (-> (g-pos->pos init-pos) :y)))))}))







;Sortable
(defn build-password-pos-mult [app pwd-id]
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

(defn process-sortables [app]
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

(defn listen-passwords-ids-indexes! [comp app]
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

(def passwords-list
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
                  :componentDidUpdate (fn [_ old-state _ new-state {:keys [app]}]
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


  )
