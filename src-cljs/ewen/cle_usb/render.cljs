(ns ewen.cle-usb.render
  (:require [domina :refer [single-node]]
            [domina.css :refer [sel]]
            [cljs.core.async :as async]
            [ewen.async-plus :as async+]
            [sablono.core :as html :refer-macros [html html-expand]]
            [datascript :as ds]
            [quiescent :as q :include-macros true]
            [clojure.string])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]))




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
                            (fn [next-props _]
                              (this-as this
                                       (not= (aget (.-props this) "value")
                                             (aget next-props "value"))))
                           :render
                            (fn []
                              (this-as this
                                       (binding [q/*component* this]
                                         (apply renderer
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
                [password-map]
                (html [:div.pwd-button
                       [:p (:label password-map)]]))



(q/defcomponent password-dd []
                (html [:div.pwd-dragdrop {:ref "pwd-drapdrop"}
                       [:img {:src "img/1_navigation_collapse.png"}]
                       [:img {:src "img/1_navigation_expand.png"}]]))


(q/defcomponent password [password-map]
                (html [:div.password {:ref (str (:id password-map))
                                      :id  (-> (keyword (namespace ::x) (:id password-map))
                                               encode-selector)}
                       (password-button password-map)
                       (password-dd)]))

(q/defcomponent placeholder [password-map]
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


(q/defcomponent passwords-list [passwords-vec]
                (html [:div#list-pwd
                       (map #(placeholder %1 nil {:key %2})
                            passwords-vec
                            (map :id passwords-vec))]))


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
(defmulti render (fn [data view] view))

(defmethod render :home [data view]
  (q/render (header)
            (-> (sel "#header") single-node))
  (q/render (passwords-list data)
            (-> (sel "#app") single-node)))

(defmethod render :new-password [data view]
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
    [view load-mult data]
    (if (compare-and-set! render-pending? false true)
      (.requestAnimationFrame js/window
                              (fn []
                                (render data view)
                                (go (async/>! (async/muxch* load-mult) {:view view :data data}))
                                (while @render-queued?
                                  (let [[data view] @render-queued?]
                                    (render data view)
                                    (go (async/>! (async/muxch* load-mult) {:view view :data data}))
                                    (reset! render-queued? false)))
                                (reset! render-pending? false)))
      (reset! render-queued? [data view]))))



(comment

  (load-namespace 'ewen.cle-usb.client-core)
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








  (load-namespace 'com.ewen.cle-usb.core-datascript)
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



  (load-namespace 'com.ewen.cle-usb.core-datascript)
  (def aa com.ewen.cle-usb.core-datascript/app)

  (get-list-passwords @aa)


  )
