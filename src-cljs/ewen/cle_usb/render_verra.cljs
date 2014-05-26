(ns ewen.cle-usb.render-verra
  (:require [ewen.verra :as v :include-macros true]
            [domina :refer [single-node]]
            [domina.css :refer [sel]]
            [cljs.core.async :as async]
            [sablono.core :as html :refer-macros [html html-expand]]
            [datascript :as ds]
            [clojure.data]))



(defn only
  "Return the only item from a query result"
  [query-result]
  (assert (= 1 (count query-result)))
  (assert (= 1 (count (first query-result))))
  (ffirst query-result))

(defn get-current-view [app]
  (-> (ds/q '[:find ?view
              :where [_ :view/current ?view]]
            app)
      only))

(defn get-channels [app]
  (reduce  #(apply assoc %1 %2) {}
           (ds/q '[:find ?source ?mult
                   :where [?id :channel/mult ?mult]
                   [?id :channel/source ?source]]
                 app)))


(defn get-list-passwords [app]
  (vec (map (fn [[k v]] {:id (keyword (str k)) :label v})
            (ds/q '[:find ?id ?label
                    :where [?id :password/label ?label]]
                  app))))





;The header react component
(v/defcomponent header {:get-initial-state (fn [] {:channels (get-channels @v/*conn*)})
                        :render (fn [_ state]
                                  (v/replace-state! v/*component* {:a "a"})
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
                                            [:a {:href "#"
                                                 :on-touch-start #(async/put!
                                                                   (async/muxch* (-> state
                                                                                     :channels
                                                                                     :menu-events))
                                                                   {:event-name :home})}
                                             "Home"]
                                            [:a {:href "#"
                                                 :on-touch-start #(async/put!
                                                                   (async/muxch* (-> state
                                                                                     :channels
                                                                                     :menu-events))
                                                                   {:event-name :add-new-password})}
                                             "Add new password"]]]]]))})



(v/defcomponent password-button
                {:render (fn [password-map state]
                           (html [:div.pwd-button (if (:pressed state) {:class "pressed"} {})
                                  [:p (:label password-map)]]))})



(v/defcomponent password-dd
                {:render (fn [] (html [:div.pwd-drapdrop {:ref "pwd-drapdrop"}
                                       [:img {:src "img/1_navigation_collapse.png"}]
                                       [:img {:src "img/1_navigation_expand.png"}]]))})


(v/defcomponent password
                {:render (fn [password-map]
                           (html [:div.password {:ref (str (:id password-map))}
                                  (password-button password-map)
                                  (password-dd)]))})


(v/defcomponent password-list
                {:render (fn [passwords-vec]
                           (html [:div#list-pwd
                                  (map password passwords-vec)]))})


(v/defcomponent new-password
                {:render (fn [_ state]
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
                                  [:p#err-msg]]))})






;Rendering functions for each pages
(defmulti render (fn [conn] (get-current-view @conn)))

(defmethod render :home [conn]
  (v/render (header nil (get-channels @conn))
            (-> (sel "#header") single-node)
            conn)
  (v/render (password-list (get-list-passwords @conn) (get-channels @conn))
            (-> (sel "#app") single-node)
            conn))

(defmethod render :new-password [conn]
  (v/render (header nil (get-channels @conn))
            (-> (sel "#header") single-node)
            conn)
  (v/render (new-password nil (get-channels @conn))
            (-> (sel "#app") single-node)
            conn))



;; Here we use an atom to tell us if we already have a render queued
;; up; if so, requesting another render is a no-op
(let [render-pending? (atom false)]
  (defn request-render
    "Render the given application state tree."
    [conn]
    (when (compare-and-set! render-pending? false true)
      (.requestAnimationFrame js/window
                              (fn []
                                (render conn)
                                (reset! render-pending? false))))))


(comment

  (load-namespace 'com.ewen.cle-usb.core-datascript)
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


  )
