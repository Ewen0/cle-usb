(ns ewen.cle-usb.render-raw
  (:require [ewen.cle-usb.data :as data]
            [domina :refer [single-node]]
            [domina.css :refer [sel]]
            [cljs.core.async :as async]
            [ewen.async-plus :as async+]
            [sablono.core :as html :refer-macros [html html-expand]]
            [datascript :as ds]
            [quiescent :as q :include-macros true]
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
                                                 (.log js/console "r "  this)
                                                 (or (not= (get-state this) next-state)
                                                     (not= (get-props this) next-props))))
                         :displayName name}
        methods-map (merge default-methods methods-map)
        methods-map (bind-methods-args methods-map)
        react-component (.createClass js/React (clj->js methods-map))]
    (fn [props statics react-keys]
      (react-component (->> (merge {::props props ::statics statics} react-keys)
                            map->js-obj)))))


(defn encode-selector [selector]
      (-> selector
          str
          (clojure.string/replace-first ":" "")
          (clojure.string/replace "." "_DOT_")
          (clojure.string/replace "/" "_SLASH_")))

(defn decode-selector [selector]
      (-> selector
          (clojure.string/replace "_DOT_" ".")
          (clojure.string/replace "_SLASH_" "/")
          keyword))

;hook quiecent to allow to pass react.js props to components
(defn component
      "Return a function that will return a ReactJS component, using the
    provided function as the implementation for React's 'render' method
    on the component.

    The given render function should take a single immutable value as
    its first argument, and return a single ReactJS component.
    Additional arguments to the component constructor will be passed as
    additional arguments to the render function whenever it is invoked,
    but will *not* be included in any calculations regarding whether the
    component should re-render."
      [renderer]
      (let [react-component
            (.createClass js/React
                          #js {:shouldComponentUpdate
                                (fn [next-props next-state]
                                    (this-as this
                                             (or
                                               (not= (aget (.-state this) "state") (aget next-state "state"))
                                               (not= (aget (.-props this) "value")
                                                     (aget next-props "value")))))
                               :render
                                (fn []
                                    (this-as this
                                             (binding [q/*component* this]
                                                      (renderer
                                                        (.-state this)
                                                        (aget (.-props this) "value")
                                                        (aget (.-props this) "statics")))))})]
           (fn [value static-args react-props]
               (let [params (merge {:value value :statics static-args}
                                   react-props)]
                    (react-component (apply js-obj (mapcat (fn [[k v]] [(name k) v]) params)))))))


(set! q/component component)








;The header react component
(q/defcomponent header []
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





(q/defcomponent password-button
                [_ password-map]
                (html [:div.pwd-button
                       [:p (:label password-map)]]))



(q/defcomponent password-dd []
                (html [:div.pwd-dragdrop {:ref "pwd-drapdrop"}
                       [:img {:src "img/1_navigation_collapse.png"}]
                       [:img {:src "img/1_navigation_expand.png"}]]))


#_(q/defcomponent password [_ password-map]
                (html [:div.password {:ref (str (:id password-map))
                                      :id  (-> (keyword (namespace ::x) (:id password-map))
                                               encode-selector)}
                       (password-button password-map)
                       (password-dd)]))

(def password
  (component-raw "password"
                 {:render (fn []
                            (html [:div]))}))

#_(q/defcomponent placeholder [_ password-map]
                (let [pos (if (and (:placeholder password-map)
                                   (:position password-map))
                            {:position "absolute" :top (-> password-map :position :y)}
                            {:position "static" :z-index 0})
                      dim (if (:width password-map) {:width (:width password-map)} {})
                      dim (merge dim (if (:height password-map) {:height (:height password-map)} {}))
                      style (merge dim pos)]
                     (html [:div [:div {:style style}
                                  (password password-map)]
                            ;Placeholder empty div. This is to avoid the whole list of passwords
                            ;to move when a password switch to the dragging state.
                            (when (and (:placeholder password-map)
                                       (:position password-map))
                                  [:div {:style (clj->js dim)}])])))

(def placeholder
  (component-raw "placeholder"
                 {:render (fn [{:keys [id]}
                               {:keys [dragging pos width height] :as state}
                               {:keys [app]}]
                            (do (.log js/console (str state))
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
                                           [:div {:style (clj->js dim)}])]))))
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
                                                             #_(.log js/console (str "e " (persistent! state)))
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



(q/defcomponent new-password []
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
                       [:p#err-msg]]))






;Rendering functions for each pages
(defmulti render-app (fn [app render-data view] view))

(defmethod render-app :home [app render-data view]
           (q/render (header)
                     (-> (sel "#header") single-node))
           (render (passwords-list render-data {:app app})
                     (-> (sel "#app") single-node)))

(defmethod render-app :new-password [app render-data view]
           (q/render (header)
                     (-> (sel "#header") single-node))
           (q/render (new-password)
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
