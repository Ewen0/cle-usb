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
                                                    (get-state *component*))))}))

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
                                       "Add new password"]]]]]))}))






(def password-button
  (component-raw "password-button"
                 {:render (fn [_ label _]
                            (html [:div.pwd-button
                                   [:p label]]))
                  :getInitialState (fn [{:keys [id]} {:keys [app]}]
                                     (:password/label (ds/entity @app id)))
                  :componentWillMount (fn [{:keys [id]} _ {:keys [app]}]
                                        (let [comp *component*
                                              index-keys #{[@app :eavt id :password/label]}
                                              callback (fn [{:keys [tx-data]}]
                                                         (let [state (atom (get-state comp))]
                                                           (when @state
                                                             (doseq [datom tx-data]
                                                               (match [datom]
                                                                      [{:e     id
                                                                        :a     :password/label
                                                                        :v     label
                                                                        :added true}] (reset! state label)
                                                                      :else nil))
                                                             (replace-state! comp @state))))]
                                          (ds/listen! app (str "password-button-" id)
                                                      callback
                                                      index-keys)))
                  :componentWillUnmount (fn []              ;TODO unregister listener
                                          )}))





(def password-dd
  (component-raw "password-dd"
                 {:render (fn []
                            (html [:div.pwd-dragdrop
                                   [:img {:src "img/1_navigation_collapse.png"}]
                                   [:img {:src "img/1_navigation_expand.png"}]]))}))



(def password
  (component-raw "password"
                 {:render (fn [{:keys [id]} _ {:keys [app]}]
                            (html [:div.password
                                   (password-button {:id id} {:app app})
                                   (password-dd)]))}))


(def placeholder
  (component-raw "placeholder"
                 {:render (fn [{:keys [id]}
                               {:keys [dragging pos width height] :as state}
                               {:keys [app]}]
                            (let [pos (if (and (not dragging) pos)
                                        {:position "absolute" :top (:y pos)}
                                        {:position "static" :z-index 0})
                                  dim (if width {:width width} {})
                                  dim (merge dim (if height {:height height} {}))
                                  style (merge dim pos)]
                              (html [:div [:div {:style style}
                                           (password {:id id} {:app app})]
                                     ;Placeholder empty div. This is to avoid the whole list of passwords
                                     ;to move when a password switch to the dragging state.
                                     (when (and (not dragging) pos)
                                       [:div {:style (clj->js dim)}])])))
                  :getInitialState (fn [{:keys [id]} {:keys [app]}]
                                     (->> (data/get-passwords-dragging @app id)
                                          (map (fn [[dragging _ _ _ ]] {:dragging dragging}))
                                          first))
                  :componentWillMount (fn [{:keys [id]} _ {:keys [app]}]
                                        (let [index-keys-fn (:index-keys-fn (meta data/get-passwords-dragging))
                                              index-keys (index-keys-fn @app id)
                                              comp *component*
                                              callback (fn [{:keys [tx-data]}]
                                                         (when-let [state (get-state comp)]
                                                           (let [state (transient state)]
                                                             (doseq [datom tx-data]
                                                               (match [datom]
                                                                      [{:e     id
                                                                        :a     :state/dragging
                                                                        :v     dragging
                                                                        :added true}] (assoc! state :dragging dragging)
                                                                      [{:e     id
                                                                        :a     :password/pos
                                                                        :v     pos
                                                                        :added true}] (assoc! state :pos pos)
                                                                      [{:e     id
                                                                        :a     :password/width
                                                                        :v     width
                                                                        :added true}] (assoc! state :width width)
                                                                      [{:e     id
                                                                        :a     :password/height
                                                                        :v     height
                                                                        :added true}] (assoc! state :height height)
                                                                      :else nil))
                                                             (replace-state! comp (persistent! state)))))]
                                          (ds/listen! app (keyword (str "password-dragging-" id))
                                                      callback
                                                      index-keys)))
                  :componentDidMount (fn [{:keys [id]} _ {:keys [app]}]
                                       (let [node (.getDOMNode *component*)
                                             width (.-width (gstyle/getSize node))
                                             height (.-height (gstyle/getSize node))]
                                         (data/set-pwd-dims! app id width height)))
                  :componentWillUnmount (fn []              ;TODO unregister listener
                                          )}))


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
                                        (let [index-keys-fn (:index-keys-fn (meta data/get-password-ids-indexes))
                                              index-keys (index-keys-fn @app)
                                              comp *component*
                                              callback (fn [{:keys [tx-data]}]
                                                         (when-let [state (get-state comp)]
                                                           (let [state (transient state)]
                                                             (doseq [datom tx-data]
                                                               (match [datom]
                                                                      [{:e     id
                                                                        :a     :state/sort-index
                                                                        :v     new-sort-index
                                                                        :added true}] (assoc! state id new-sort-index)
                                                                      :else nil))
                                                             (replace-state! comp (persistent! state)))))]
                                          (ds/listen! app :passwords-ids-indexes
                                                      callback
                                                      index-keys)))
                  :componentWillUnmount (fn []              ;TODO unregister listener
                                          )}))




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
(defmulti render-app (fn [app render-data view] view))

(defmethod render-app :home [app render-data view]
           (render (header)
                     (-> (sel "#header") single-node))
           (render (passwords-list render-data {:app app})
                     (-> (sel "#app") single-node)))

(defmethod render-app :new-password [app render-data view]
           (render (header)
                     (-> (sel "#header") single-node))
           (render (new-password)
                     (-> (sel "#app") single-node)))



;; Here we use an atom to tell us if we already have a render queued
;; up; if so, requesting another render is a no-op
(let [render-pending? (atom false)
      render-queued? (atom false)]
     (defn request-render
           "Render the given application state tree."
           [app view load-mult render-data]
           (if (compare-and-set! render-pending? false true)
             (.requestAnimationFrame js/window
                                     (fn []
                                         (render-app app render-data view)
                                         (go (async/>! (async/muxch* load-mult) {:view view :data render-data}))
                                         (while @render-queued?
                                                (let [[render-data view] @render-queued?]
                                                     (render-app app render-data view)
                                                     (go (async/>! (async/muxch* load-mult) {:view view :data render-data}))
                                                     (reset! render-queued? false)))
                                         (reset! render-pending? false)))
             (reset! render-queued? [render-data view]))))



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
