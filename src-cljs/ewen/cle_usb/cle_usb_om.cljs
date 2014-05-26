(ns ewen.cle-usb.cle-usb-om
  #_(:require [cljs.core.async :as async]
            [domina.events :as events :refer [listen! unlisten! unlisten-by-key!]]
            [domina.css :refer [sel]]
            [domina :refer [single-node]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]
            [goog.style :as gstyle]
            [sablono.core :as html :refer-macros [html html-expand]]
            [clojure.string :refer [upper-case]]
            [cljs.core.match]
            [ewen.dragdrop :as dd]
            [ewen.async-plus :as async+]
            [clojure.browser.repl] ;Only for development mode. TODO find a way to make a conditional require
            [goog.math]
            [com.ewen.sortable :refer [sortable-mult sort-items]])
  #_(:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [ewen.async-plus.macros :as async+m]
                   [cljs.core.match.macros :refer [match]]))

(comment

;Init
(enable-console-print!)
(js/React.initializeTouchEvents true)








;Extend the react constructor backing om components.
;arg-map is a map which keys are additional args for the react contructor.
(defn react-ctor [arg-map]
  (fn [args]
    (doseq [[k v] arg-map]
      (aset args (name k) v))
    (om.core/pure args)))


(defprotocol IMixinRenderState
  (mixin-render-state [this virtual-dom]))

(defprotocol IMixinRender
  (mixin-render [this virtual-dom]))

(defn mixin [f mixin-obj]
  (fn [data owner opts]
    (let [clone-fn #(if (= 2 (.-length f))
                     (f data owner)
                     (f data owner opts))
          comp-specify (clone-fn)
          comp-clone (clone-fn)]
      (when
        (implements? om/IInitState mixin-obj)
        (specify! comp-specify
                  om/IInitState
                  (init-state [this]
                              (when (implements? om/IInitState comp-clone)
                                (om/init-state comp-clone))
                              (om/init-state mixin-obj))))
      (when (implements? om/IWillMount mixin-obj)
        (specify! comp-specify
                  om/IWillMount
                  (will-mount [this]
                              (when (implements? om/IWillMount comp-clone)
                                (om/will-mount comp-clone))
                              (om/will-mount mixin-obj))))
      (when (implements? om/IDidMount mixin-obj)
        (specify! comp-specify
                  om/IDidMount
                  (did-mount [this]
                             (when (implements? om/IDidMount comp-clone)
                               (om/did-mount comp-clone))
                             (om/did-mount mixin-obj))))
      (when (implements? om/IWillUpdate mixin-obj)
        (specify! comp-specify
                  om/IWillUpdate
                  (will-update [this next-props next-state]
                               (when (implements? om/IWillUpdate comp-clone)
                                 (om/will-update comp-clone next-props next-state))
                               (om/will-update mixin-obj next-props next-state))))
      (when (implements? om/IDidUpdate mixin-obj)
        (specify! comp-specify
                  om/IDidUpdate
                  (did-update [this prev-props prev-state]
                              (when (implements? om/IDidUpdate comp-clone)
                                (om/did-update comp-clone prev-props prev-state))
                              (om/did-update mixin-obj prev-props prev-state))))

      (when (implements? om/IRender comp-clone)
        (specify! comp-specify
                  om/IRender
                  (render [this]
                          (let [dom-data (om/render comp-clone)]
                            (if (implements? om/IMixinRender mixin-obj)
                              (mixin-render mixin-obj dom-data)
                              dom-data)))))
      (when (implements? om/IRenderState comp-clone)
        (specify! comp-specify
                  om/IRenderState
                  (render-state [this state]
                                (let [dom-data (om/render-state comp-clone state)]
                                  (if (implements? om/IMixinRenderState mixin-obj)
                                    (mixin-render-state mixin-obj dom-data)
                                    dom-data))))))))

(defn add-prop! [comp prop-name prop]
  (.log js/console comp))



;The header Om component
(defn header [app owner]
  (reify
    om/IRender
    (render [this]
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
                                       (async/muxch* (om/get-shared owner :menu-events))
                                       {:event-name :home})}
                 "Home"]
                [:a {:href "#"
                     :on-touch-start #(async/put!
                                       (async/muxch* (om/get-shared owner :menu-events))
                                       {:event-name :add-new-password})}
                 "Add new password"]]]]]))))




(defn as-merge
  ([mults] (as-merge mults nil))
  ([mults buf-or-n]
   (let [out-chs (map #(async/tap % (async/chan)) mults)
         out-ch (async/merge out-chs buf-or-n)]
     (async/mult out-ch))))

(defn password-button [password-map owner]
  (reify
    om/IDidMount
    (did-mount [this]
      (let [up-events (dd/extract-events :up)
            move-events (dd/extract-events :move)
            up-or-move-events (as-merge [up-events move-events])
            down-events (dd/extract-events (om/get-node owner) :down true)]
        (om/set-state! owner :unlisten (comp #(async+/close! up-events)
                                             #(async+/close! down-events)
                                             #(async+/close! move-events)))
        (async+m/go-loop [down-ch down-events]
                         (when-let [_ (async/<! down-ch)]
                           (om/set-state! owner :pressed true)
                           (recur down-ch)))
        (async+m/go-loop [up-or-move-ch up-or-move-events]
                         (when-let [_ (async/<! up-or-move-ch)]
                           (om/set-state! owner :pressed false)
                           (recur up-or-move-ch)))))
    om/IWillUnmount
    (will-unmount [this]
      ((om/get-state owner :unlisten)))
    om/IInitState
    (init-state [_]
      {:pressed false})
    om/IRenderState
    (render-state [this state]
      (html [:div.pwd-button (if (:pressed state) {:class "pressed"} {})
             [:p (:label password-map)]]))))


(defn gsize->dims [size]
  {:width (.-width size)
   :height (.-height size)})

(defn gloc->pos [loc]
  {:left (.-x loc) :top (.-y loc)})

(defn publish-updated-pos [{:keys [update-pos-mult location]}]
  (when (and update-pos-mult location)
    (async/put! (async/muxch* update-pos-mult)
                (goog.math/Coordinate. (:left location) (:top location)))))

(defn process-drag-drop [owner id comp]
  (when (om/get-state owner :unlisten)
    ((om/get-state owner :unlisten)))
  (let [up-events (dd/extract-events :up)
        move-events (dd/extract-events :move)
        _ (.log js/console comp)
        down-events (dd/extract-events (om/get-node comp #_(get (js->clj (.-refs owner)) id) "pwd-drapdrop") :down true)]
    (om/set-state! owner :unlisten (comp #(async+/close! up-events)
                                         #(async+/close! down-events)
                                         #(async+/close! move-events)))
    (async+m/go-loop [down-ch down-events]
                     (when-let [down-event (async/<! down-ch)]
                       (om/set-state! owner :dragging true)
                       (om/set-state! owner :handle-loc (dd/event->loc down-event))
                       (recur down-ch)))
    (async+m/go-loop [move-ch move-events]
                     (when-let [move-event (async/<! move-ch)]
                       (when (om/get-state owner :dragging)
                         (om/set-state! owner :location {:left (:left (om/get-state owner :init-loc))
                                                         :top  (:top (dd/merge-locs
                                                                       (dd/event->loc move-event)
                                                                       (om/get-state owner :handle-loc)
                                                                       (om/get-state owner :init-loc)))})
                         (om/set-state! owner :move-loc {:left (:left (om/get-state owner :init-loc))
                                                         :top  (:top (dd/event->loc move-event))}))
                       (recur move-ch)))
    (async+m/go-loop [up-ch up-events]
                     (when-let [_ (async/<! up-ch)]
                       (om/set-state! owner :dragging false)
                       (om/set-state! owner :location (om/get-state owner :init-loc))
                       (recur up-ch)))))



(defn password [password-map _]
  (reify
    om/IRender
    (render [this]
      (html [:div.password {:ref (str (:id password-map))}
             (om/build password-button password-map)
             [:div.pwd-drapdrop {:ref "pwd-drapdrop"}
              [:img {:src "img/1_navigation_collapse.png"}]
              [:img {:src "img/1_navigation_expand.png"}]]]))))




;password and password-list Om components
(defn dragdrop [data owner opts]
  (reify
    om/IInitState
    (init-state [this]
      {:update-pos-mult (async/mult (async/chan))})
    om/IDidMount
    (did-mount [this]
      (let [init-loc (-> (om/get-node owner)
                         gstyle/getPosition gloc->pos)
            dims (-> (om/get-node owner)
                     gstyle/getSize gsize->dims)]
        (om/set-state! owner :init-loc init-loc)
        (om/set-state! owner :dimensions dims)))
    om/IWillUpdate
    (will-update [this next-props next-state]
      (when (not= (:init-loc next-state)
                  (om/get-state owner :init-loc))
        (om/set-state! owner :handle-loc (dd/op-loc + (om/get-state owner :handle-loc)
                                                    (dd/op-loc - (om/get-state owner :init-loc)
                                                               (:init-loc next-state))))))
    om/IDidUpdate
    (did-update [this prev-props prev-state]
      (when (not= (:init-loc prev-state)
                  (om/get-state owner :init-loc))
        (om/set-state! owner :handle-loc (dd/op-loc + (om/get-state owner :handle-loc)
                                                    (dd/op-loc - (om/get-state owner :init-loc)
                                                               (:init-loc prev-state))))
        (process-drag-drop owner "dragdrop-child-id" (:sub-comp opts))))
    om/IWillUnmount
    (will-unmount [this]
      ((om/get-state owner :unlisten))
      (async+/close! (om/get-state owner :update-pos-mult)))
    om/IRenderState
    (render-state [this state]
      (let [style (cond
                    (:dragging state)
                    (let [{:keys [left top]} (:location state)
                          {:keys [width height]} (:dimensions state)]
                      (publish-updated-pos state)
                      (js-obj "position" "absolute"
                              "left" left "top" top
                              "z-index" 1
                              "width" width "height" height))
                    :else
                    (js-obj "position" "static" "z-index" 0))]
        (html [:div [:div {:style style} (:sub-comp opts) #_(apply om/build (:sub-comp opts)) #_(om/build password data {:ctor (react-ctor {:ref "dragdrop-child-id"})})]
               ;Placeholder empty div. This is to avoid the whole list of passwords
               ;to move when a password switch to the dragging state.
               (when (:dragging state)
                 [:div {:style (js-obj "width" (:width (:dimensions state))
                                       "height" (:height (:dimensions state)))}])])))))


(defn password-vect->react-ids [pwd-vect]
  (map (fn [m] {:react-key (:id m)}) pwd-vect))


(defn password-vect->ctor-refs [pwd-vect]
  (map (fn [m] {:ctor (react-ctor {:ref (:id m)})}) pwd-vect))


(defn modify-keys [f m] (zipmap (map f (keys m)) (vals m)))

(defn process-sortable [owner cursor]
  (let [;A map from ref-id to each password om component
         component-refs (-> (.-refs owner)
                            js->clj
                            (#(modify-keys js/parseInt %)))
        ;A map that contains, for each om child component (passwords), a id, the component itsef, the dom node
        ;position and a channel wich outputs every updates of the position.
         sortable-map (map (fn [[k v]]
                             {:id              k
                              :child           v
                              :pos             (-> v om/get-node gstyle/getPosition js->clj)
                              :update-pos-mult (om/get-state v :update-pos-mult)})
                           component-refs)]
    (when (om/get-state owner :sortable-mult)
      (async+/close! (om/get-state owner :sortable-mult)))
    (doseq [{:keys [child]} sortable-map]
      (om/set-state! child :init-loc (-> (om/get-node child)
                                         gstyle/getPosition gloc->pos)))
    (om/set-state! owner :sortable-mult (sortable-mult sortable-map))
    (async+m/go-loop [sortable-chan (om/get-state owner :sortable-mult)]
                     (when-let [val (async/<! sortable-chan)]
                       (om/transact! cursor #(sort-items val %))
                       (recur sortable-chan)))))


(defn password-list [password-vect owner]
  (reify
    om/IDidMount
    (did-mount [this]
      (process-sortable owner password-vect))
    om/IDidUpdate
    (did-update [this prev-props prev-state]
      (when (not= prev-props password-vect)
        (process-sortable owner password-vect)))
    om/IRenderState
    (render-state [this state]
      (let [react-ids (password-vect->react-ids password-vect)
            refs (password-vect->ctor-refs password-vect)
            sub-comps (map (fn [p] {:opts {:sub-comp (om/build password p #_{:ctor (react-ctor {:ref "dragdrop-child-id"})})
            #_[password p {:ctor (react-ctor {:ref "dragdrop-child-id"})}]}})
                           password-vect)
            opts (map #(merge %1 %2 %3) react-ids refs sub-comps)]
        (html [:div#list-pwd
               (map #(om/build dragdrop %1 %2) password-vect opts)])))))

#_(om/build password data {:ctor (react-ctor {:ref "dragdrop-child-id"})})
#_(reset! app-state [{:id 0 :label "Password1"} {:id 1 :label "Password2"} {:id 2 :label "Password3"}])





;new-password view helpers
(defn enable-button? [passwords {:keys [pwd-label pwd-value]}]
  (let [passwords (map #(-> % :label str upper-case) passwords)]
    (if (or (empty? pwd-label)
            (empty? pwd-value)
            (some #(= % (-> pwd-label str upper-case))
                  passwords))
      false true)))

(defn handle-label-change [e owner passwords {:keys [pwd-label] :as state}]
  (om/set-state! owner :pwd-label (.. e -target -value))
  (if (enable-button? passwords (om/get-state owner))
    (om/set-state! owner :enable-button true)
    (om/set-state! owner :enable-button false)))

(defn handle-value-change [e owner passwords {:keys [pwd-value] :as state}]
  (om/set-state! owner :pwd-value (.. e -target -value))
  (if (enable-button? passwords (om/get-state owner))
    (om/set-state! owner :enable-button true)
    (om/set-state! owner :enable-button false)))

(defn assoc-if [pred map key val]
  (if pred (assoc map key val)
           map))

;Called when their is a new password request coming from the new-password view
(defn handle-new-pwd [owner]
  (when (:enable-button (om/get-state owner))
    (async/put! (async/muxch* (om/get-shared owner :new-pwd-events))
                {:password-label (:pwd-label (om/get-state owner))
                 :password-value (:pwd-value (om/get-state owner))})
    (om/set-state! owner :enable-button false)
    (om/set-state! owner :pwd-label "")
    (om/set-state! owner :pwd-value "")))


;The new-password view
(defn new-password [_ owner]
  (reify
    om/IInitState
    (init-state [_]
      {:pwd-label ""
       :pwd-value ""
       :enable-button false})
    om/IRenderState
    (render-state [this state]
      (html [:div
             [:div#password-label-wrapper.section
              [:div.section-header [:h2 "Password label"]]
              [:input#password-label {:placeholder "Password label"
                                      :type "text"
                                      :value (:pwd-label state)
                                      :onChange #(handle-label-change % owner (om/get-shared owner :passwords) state)}]]
             [:div#password-value-wrapper.section
              [:div.section-header
               [:h2 "Password value"]]
              [:input#password-value {:placeholder "Password value"
                                      :type "password"
                                      :value (:pwd-value state)
                                      :onChange #(handle-value-change % owner (om/get-shared owner :passwords) state)}]]
             [:div.action-buttons [:input#new-password-button
                                   (assoc-if (not (:enable-button state))
                                             {:type "button"
                                              :value "Validate"
                                              :onClick #(handle-new-pwd owner)}
                                             :disabled "disabled")]]
             [:p#err-msg]]))))














;App state and shared values
(def app-state
  (atom [{:id 0 :label "Password1"}
         {:id 1 :label "Password2"}]))





(def menu-events (async/mult (async/chan)))
(def new-pwd-events (async/mult (async/chan)))









;App state helpers
(defn next-id-helper [current next rest]
  (match [(- next current) rest]
         [1 [f & r]] (recur next f r)
         [1 []] (+ 1 next)
         :else (+ 1 current)))

(defn next-id [app-state]
  (let [ids (->> app-state
                 (map :id)
                 sort
                 vec)]
    (match ids
           [] 0
           [0] 1
           [(f :guard #(> % 0)) & r] 0
           [f s & r] (next-id-helper f s r))))

(defn add-password! [app-state {:keys [password-label]}]
  (swap! app-state conj {:id (next-id @app-state)
                         :label password-label}))

(defn sort-passwords-using-indexes! [app-state indexes]
  (swap! app-state (fn [app-state]
                     (-> (sort-by #(.indexOf indexes (:id %)) app-state)
                         vec))))












;Create Om roots
(defn home-view []
  (om/root header {}
           {:target (-> (sel "#header") single-node)
            :shared {:menu-events menu-events}})

  (om/root password-list app-state
           {:target (-> (sel "#app") single-node)}))

(defn new-password-view []
  (om/root header {}
           {:target (-> (sel "#header") single-node)
            :shared {:menu-events menu-events}})

  (om/root new-password
           {}
           {:target (-> (sel "#app") single-node)
            :shared {:new-pwd-events new-pwd-events
                     :passwords @app-state}}))














;Handle menu events
(defmulti handle-menu-event #(:event-name %))

(defmethod handle-menu-event :home []
  (home-view))

(defmethod handle-menu-event :add-new-password []
  (new-password-view))

(async+m/go-loop [menu-ch menu-events]
                 (when-let [menu-event (async/<! menu-ch)]
                   (handle-menu-event menu-event)
                   (recur menu-ch)))















;Handle new-password events
(async+m/go-loop [new-pwd-ch new-pwd-events]
                 (let [menu-ch (async/muxch* menu-events)]
                   (when-let [new-pwd (async/<! new-pwd-ch)]
                     (add-password! app-state new-pwd)
                     (async/put! menu-ch {:event-name :home})
                     (recur new-pwd-ch))))







;Start app
(home-view)


)