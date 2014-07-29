(ns ewen.cle-usb.render-raw
  (:require [ewen.cle-usb.data :as data]
            [domina :refer [single-node]]
            [domina.css :refer [sel]]
            [cljs.core.async :as async]
            [ewen.async-plus :as async+]
            [sablono.core :as html :refer-macros [html html-expand]]
            [datascript :as ds]
            [clojure.string]
            [cljs.core.match]
            [goog.style :as gstyle])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [ewen.cle-usb.render-raw :refer [with-this]]
                   [cljs.core.match.macros :refer [match]]))

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
                                          (aget next-props (keyword->string ::props))
                                          (aget next-state (keyword->string ::state)))))}
            (= :componentDidUpdate method-key)
            {:componentDidUpdate (fn [prev-props prev-state]
                                     (with-this
                                       (method
                                         (aget prev-props (keyword->string ::props))
                                         (aget prev-state (keyword->string ::state)))))}
            (= :componentWillUnmount method-key)
            {:componentWillUnmount (fn []
                                       (with-this (method
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
    {:down  "touchstart"
     :up    "touchend"
     :move  "touchmove"
     :over  "touchstart"
     :out   "touchend"
     :click "tap"}
    {:down  "mousedown"
     :up    "mouseup"
     :move  "mousemove"
     :over  "mouseover"
     :out   "mouseout"
     :click "mouseclick"}))


;Drag and drop
(defn event->pos [e]
  (if (.-changedTouches e)
    {:x (-> e (.-changedTouches)
            (.item 0)
            (.-pageX))
     :y (-> e (.-changedTouches)
            (.item 0)
            (.-pageY))}
    {:x (.-pageX e) :y (.-pageY e)}))

(defn g-pos->pos [g-pos]
  {:x (.-x g-pos) :y (.-y g-pos)})

(defn dd-down-callback [app id e]
  (.preventDefault e)
  (data/set-dragging! app id true)
  (data/set-handle-pos! app id (let [init-pos (data/get-init-pos @app id)]
                                 {:x (- (:x (event->pos e)) (:x init-pos))
                                  :y (- (:y (event->pos e)) (:y init-pos))})))

(defn dd-up-callback [app id]
  (data/set-dragging! app id false)
  (let [init-pos (:state/init-pos (ds/entity @app id))]
    (data/set-pwd-pos! app id init-pos)))

#_(defn merge-pos
  [pos handle-pos init-pos]
  {:x (+ (:x init-pos) (- (:x pos) (:x handle-pos)))
   :y (+ (:y init-pos) (- (:y pos) (:y handle-pos)))})

(defn merge-pos
  [pos handle-pos]
  {:x (- (:x pos) (:x handle-pos))
   :y (- (:y pos) (:y handle-pos))})

(defn dd-move-callback [app id e]
  (.log js/console (str "move"))
  (when (data/get-dragging @app id)
    (let [handle-pos (-> (ds/entity @app id) :state/handle-pos)
          _ (.log js/console (str (merge-pos (event->pos e)
                                             handle-pos)))]
      (data/set-pwd-pos! app id (merge-pos (event->pos e)
                                           handle-pos)))))
















;The header react component
(def header
  (component-raw "header"
                 {:render (fn [_ _ {:keys [app]}]
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
                                      [:a.home-link {:href "#"
                                                     :onClick #(data/set-view! app :home)}
                                       "Home"]
                                      [:a.new-pwd-link {:href "#"
                                                        :onClick #(data/set-view! app :new-password)}
                                       "Add new password"]]]]]))}))



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




(def password-dd
  (component-raw "password-dd"
                 {:render (fn [{:keys [id]} _ {:keys [app]}]
                            (html [:div.pwd-dragdrop
                                   {:onMouseDown #(dd-down-callback app id %)
                                    :onMouseUp   #(dd-up-callback app id)
                                    :onMouseMove #(dd-move-callback app id %)}
                                   [:img {:src "img/1_navigation_collapse.png"}]
                                   [:img {:src "img/1_navigation_expand.png"}]]))}))



(def password
  (component-raw "password"
                 {:render (fn [{:keys [id]} _ {:keys [app]}]
                            (html [:div.password
                                   (password-button {:id id} {:app app})
                                   (password-dd {:id id} {:app app})]))}))


(defn listen-password-dragging! [comp app pwd-id]
  (let [index-keys (data/get-index-keys data/get-passwords-dragging app pwd-id)
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

#_(defn listen-password-pos! [comp app pwd-id]
  (let [index-keys (data/get-index-keys data/get-passwords-dragging app pwd-id)
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

(def placeholder
  (component-raw "placeholder"
                 {:render (fn [{:keys [id]}
                               {:keys [dragging pos width height] :as state}
                               {:keys [app]}]
                            (let [pos (if (and dragging pos)
                                        {:position "absolute" :top (:y pos)}
                                        {:position "static" :z-index 0})
                                  dim (if width {:width width} {})
                                  dim (merge dim (if height {:height height} {}))
                                  style (merge dim pos)
                                  _ (.log js/console (str style))]
                              (html [:div [:div {:style style}
                                           (password {:id id} {:app app})]
                                     ;Placeholder empty div. This is to avoid the whole list of passwords
                                     ;to move when a password switch to the dragging state.
                                     (when (and dragging pos)
                                       [:div {:style (clj->js style)}])])))
                  :getInitialState (fn [{:keys [id]} {:keys [app]}]
                                     (->> (data/get-passwords-dragging @app id)
                                          (map (fn [[dragging _ _ _ ]] {:dragging dragging}))
                                          first))
                  :componentWillMount (fn [{:keys [id]} _ {:keys [app]}]
                                        (listen-password-dragging! *component* app id))
                  :componentDidMount (fn [{:keys [id]} _ {:keys [app]}]
                                       (let [node (.getDOMNode *component*)
                                             width (.-width (gstyle/getSize node))
                                             height (.-height (gstyle/getSize node))
                                             init-pos (gstyle/getPosition node)]
                                         (data/set-pwd-dims! app id width height)
                                         (data/set-init-pos! app id (g-pos->pos init-pos))))
                  :componentWillUnmount (fn [{:keys [id]} _ {:keys [app]}]
                                          (ds/unlisten! app (keyword (str "password-dragging-" id))))}))


(defn handle-new-sort-index! [id-indexes-map id new-sort-index]
  (assoc! id-indexes-map id new-sort-index))

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

(def passwords-list
  (component-raw "passwords-list"
                 {:render (fn [_ state {:keys [app]}]
                            (html [:div#list-pwd
                                   (map (fn [[id _]]
                                          (placeholder {:id id} {:app app} {:key id}))
                                        (sort-by (comp :sort-index second) state))]))
                  :getInitialState (fn [_ {:keys [app]}]
                                     (->> (data/get-password-ids-indexes @app)
                                          (map (fn [[id sort-index]] {id {:sort-index sort-index}}))
                                          (apply merge)))
                  :componentWillMount (fn [_ _ {:keys [app]}]
                                        (listen-passwords-ids-indexes! *component* app))
                  :componentWillUnmount (fn [_ _ {:keys [app]}]
                                          (ds/unlisten! app :passwords-ids-indexes))}))




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

  (->> (data/get-passwords-dragging @app 2)
       (map (fn [[dragging pos width height label]] {:dragging dragging
                                                  :pos pos
                                                  :width width
                                                  :height height
                                                  :label label}))
       first)


  )
