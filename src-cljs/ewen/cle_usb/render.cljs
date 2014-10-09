(ns ewen.cle-usb.render
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
            [ewen.wreak :as w :refer [*component* mixin component]]
            [ewen.wreak.sortable :refer [sortable-mixin]]
            [ewen.wreak.sorted :refer [sorted-mixin]]
            [ewen.wreak.dd-target :refer [dd-target-mixin dd-target-mixin-render]]
            [ewen.wreak.dd-handle :refer [dd-handle-mixin]])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs.core.match.macros :refer [match]]))

















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







 #_(def tt (mixin {:componentWillMount (fn [] (.log js/console "tt " (aget *component* "conn")))}))




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
                  :componentWillMount (fn [] #_(.log js/console "tt " (aget *component* "conn")))
                  :componentDidMount (fn [_ _ db]
                                       (let [comp *component*
                                              view-id (data/get-current-view-id db)]
                                         (listen! (-> (.getDOMNode *component*)
                                                      (sel ".home-link"))
                                                  (:click event-types)
                                                  #(data/set-attr! (.-conn comp) view-id :view/current :home))
                                         (listen! (-> (.getDOMNode *component*)
                                                      (sel ".new-pwd-link"))
                                                  (:click event-types)
                                                  #(data/set-attr! (.-conn comp) view-id :view/current :new-password))))
                  :componentWillUnmount (fn []
                                          (unlisten! (-> (.getDOMNode *component*)
                                                         (sel ".home-link"))
                                                     (:click event-types))
                                          (unlisten! (-> (.getDOMNode *component*)
                                                         (sel ".new-pwd-link"))
                                                     (:click event-types)))
                  #_:mixins #_#js [tt]}))






(def password-button
  (component "password-button"
             {:render               (fn [_ {:keys [label]} _]
                                      (html [:div.pwd-button
                                             [:p label]]))
              :getInitialState      (fn [{:keys [id]} db]
                                      {:label (-> (ds/entity db id) :password/label)})
              :dbDidUpdate          (fn [{:keys [id]} state {:keys [db-after]}]
                                      {:label (-> (ds/entity db-after id) :password/label)})}))






(def password-handle
  (component "password-handle"
             (mixin {:render (fn []
                               (html [:div.pwd-dragdrop
                                      [:img {:src "img/1_navigation_collapse.png"}]
                                      [:img {:src "img/1_navigation_expand.png"}]]))}
                    dd-handle-mixin)))





(def password
  (component "password"
             (mixin {:render (fn [{:keys [id]}
                                  {:keys [dragging pos] :as state}]
                               #_(.log js/console (str state))
                               (->> (html [:div.password
                                           (password-button {:id id})
                                           ;The element to click on in order to start to drag the password
                                           (password-handle {:id id})])
                                    (dd-target-mixin-render {:id id}
                                                            {:dragging dragging :pos pos})))}
                    dd-target-mixin)))



;Placeholder empty div. This is to avoid the whole list of passwords
;to move when a password switch to the dragging state.
(def placeholder
  (component "placeholder"
             {:render               (fn [{:keys [id]}
                                         {:keys [dragging] :as state}]
                                      (let [width (aget *component* "width")
                                            height (aget *component* "height")
                                            dim (if width {:width width} {})
                                            dim (merge dim (if height {:height height} {}))]
                                        (html [:div (password {:id id})
                                               (when dragging
                                                 [:div {:style (clj->js dim)}])])))
              :getInitialState      (fn [{:keys [id]} db]
                                      {:dragging (-> (ds/entity db id) :state/dragging)})
              :componentDidMount    (fn [{:keys [id]} _ _]
                                      (aset *component* "with" (.-width (gstyle/getSize (.getDOMNode *component*))))
                                      (aset *component* "height" (.-height (gstyle/getSize (.getDOMNode *component*)))))
              :dbDidUpdate          (fn [{:keys [id]} state {:keys [db-after]}]
                                      (assoc state
                                             :dragging
                                             (-> (ds/entity db-after id) :state/dragging)))}))






(def passwords-list
  (component "passwords-list"
             (mixin {:render            (fn [_ state]
                                          (html [:div#list-pwd
                                                 (map (fn [id]
                                                        (placeholder {:id id :key id}))
                                                      state)]))
                     :getInitialState   (fn [_ db]
                                          (data/get-list-passwords db))}
                    sorted-mixin
                    #_sortable-mixin)))





(defn enable-button? [db id]
  (let [new-label (-> (ds/entity db id)
                      :new-password/label)
        labels (data/get-password-labels db)]
    (and
      new-label
      (not= new-label "")
      (not (some #(= new-label %) labels)))))


(defn add-password! [app label]
  (data/add-password! app label)
  (data/set-current-view! app :home))


(def new-password
  (component "new-password"
             (mixin {
                      :render               (fn [_ {:keys [label value enabled] :as state}]
                                              (let [comp *component*]
                                                (html [:div
                                                       [:div#password-label-wrapper.section
                                                        [:div.section-header [:h2 "Password label"]]
                                                        [:input#password-label {:placeholder "Password label"
                                                                                :type        "text"
                                                                                :value       label
                                                                                :onChange    #(when-let [id (aget comp :ewen.wreak/id)]
                                                                                               (data/set-attr! (.-conn comp) id :new-password/label
                                                                                                               (.. % -target -value)))}]]
                                                       [:div#password-value-wrapper.section
                                                        [:div.section-header
                                                         [:h2 "Password value"]]
                                                        [:input#password-value {:placeholder "Password value"
                                                                                :type        "password"
                                                                                :value       value
                                                                                :onChange    #(when-let [id (aget comp :ewen.wreak/id)]
                                                                                               (data/set-attr! (.-conn comp) id :new-password/value
                                                                                                               (.. % -target -value)))}]]
                                                       [:div.action-buttons [:input#new-password-button
                                                                             (cond-> {:type  "button"
                                                                                      :value "Validate"}
                                                                                     (not enabled) (assoc :disabled "disabled"))]]
                                                       [:p#err-msg]])))
                      :getInitialState      (fn [_ _]
                                              {:label   ""
                                               :value   ""
                                               :enabled false})
                      :componentDidMount    (fn [_ _])
                      :dbDidUpdate          (fn [_ _ {:keys [db-after] :as report}]
                                              (.log js/console (str (:tx-data report)))
                                              (.log js/console (str (:tx-meta report)))
                                              #_(let [id (aget *component* :ewen.wreak/id)
                                                    entity (ds/entity db-after id)]
                                                {:label   (:new-password/label entity)
                                                 :value   (:new-password/value entity)
                                                 :enabled (:new-password/button-enabled entity)}))
                      :componentWillUnmount (fn [_ _]
                                              #_(unlisten! (-> (.getDOMNode *component*)
                                                             (sel ".new-password-button"))
                                                         (:click event-types)))}
                    (w/component-id-mixin "new-password"))))



(defn render* [conn db view]
  (case view
    :home (do
            (w/render header nil
                      (-> (sel "#header") single-node)
                      db conn)
            (w/render passwords-list nil
                      (-> (sel "#app") single-node)
                      db conn))
    :new-password (do
                    (w/render header nil
                              (-> (sel "#header") single-node)
                              db conn)
                    (w/render new-password nil
                              (-> (sel "#app") single-node)
                              db conn))))

(defn render [conn]
  (let [db @conn
        current-view-id (data/get-current-view-id db)
        view (atom (-> (ds/entity db current-view-id) :view/current))]
    (ds/listen! conn (fn [{:keys [db-after]}]
                       (let [view-after (-> (ds/entity db-after current-view-id) :view/current)]
                         (when (not= view-after @view)
                           (reset! view view-after)
                           (render* conn db-after view-after)))))
    (render* conn db @view)))




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
