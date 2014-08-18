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
            [ewen.wreak :as w :refer [*component* mixin component
                                      replace-state! get-state]]
            [ewen.wreak.sortable :refer [sortable-mixin]])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs.core.match.macros :refer [match]]))



(extend-type cljs.core.async.impl.channels/ManyToManyChannel
  ds/IPublish
  (publish [this report]
    (async/put! this report)))














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
  (component "header"
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
  (component "password-button"
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
  (component "password-handle"
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
  (component "password"
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
  (component "placeholder"
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





(def passwords-list
  (component "passwords-list"
                 {:render               (fn [_ state {:keys [app]}]
                                          (let [state (:ewen.wreak.sortable/sortable-state state)]
                                            (html [:div#list-pwd
                                                   (map (fn [[id _]]
                                                          (placeholder {:id id} {:app app} {:key id :ref id}))
                                                        state)])))
                  :mixins               #js [sortable-mixin]
                  :ids                  (atom #{})
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
                                            (reset! (.-ids *component*) (set ids))))
                  :componentWillUnmount (fn [_ _ {:keys [app]}]
                                          (ds/unlisten! app (data/get-pwd-list-chan @app))
                                          (data/retract-pwd-list-chan! app))}))



#_(def passwords-list
  (component "passwords-list"
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
  (component "new-password"
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
           (w/render (header nil {:app app})
                     (-> (sel "#header") single-node))
           (w/render (passwords-list nil {:app app})
                     (-> (sel "#app") single-node)))

(defmethod render-app :new-password [app view]
           (w/render (header nil {:app app})
                     (-> (sel "#header") single-node))
           (w/render (new-password)
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
