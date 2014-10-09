(ns ewen.wreak.dd-handle
  (:require [cljs.core.async :as async]
            [ewen.wreak :refer [*component* mixin]]
            [datascript :as ds]
            [cljs.core.match]
            [goog.style :as gstyle]
            [domina.events :refer [listen! unlisten!
                                   prevent-default raw-event
                                   listen-once! current-target]])
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



(defn set-dragging! [app pwd-id dragging]
  (ds/transact! app [{:db/id        pwd-id
                      :state/dragging dragging}]))


(defn set-handle-pos! [app pwd-id pos]
  (ds/transact! app [{:db/id        pwd-id
                      :state/handle-pos pos}]))

(defn set-pwd-pos! [app pwd-id pos]
  (ds/transact! app [{:db/id        pwd-id
                      :password/pos pos}]))

(defn dd-down-callback [app id e]
  (prevent-default e)
  (set-dragging! app id true)
  (set-handle-pos! app id (let [init-pos (-> (ds/entity @app id) :state/init-pos)]
                                 (- (:y (event->pos e)) init-pos))))

(defn dd-up-callback [app id]
  (set-dragging! app id false))

(defn merge-pos
  [pos handle-pos]
  (- (:y pos) handle-pos))

(defn dd-move-callback [app id e]
  (when (-> (ds/entity @app id) :state/dragging)
    (let [handle-pos (-> (ds/entity @app id) :state/handle-pos)]
      (set-pwd-pos! app id (merge-pos (event->pos e)
                                           handle-pos)))))

(defn set-attr! [app id attr val]
  (ds/transact! app [{:db/id id
                      attr val}]))



(def dd-handle-mixin
  {:componentDidMount    (fn [{:keys [id]} _ _]
                           (let [conn (.-conn *component*)]
                               (listen! (.getDOMNode *component*)
                                        (:down event-types)
                                        #(dd-down-callback conn id %))))
   :dbDidUpdate          (fn [{:keys [id]} state {:keys [tx-data]}]
                           (let [conn (.-conn *component*)]
                             (doseq [datom tx-data]
                               (match [datom]
                                      [{:e     id
                                        :a     :state/dragging
                                        :v     true
                                        :added true}] (do (listen! (:move event-types)
                                                                   #(dd-move-callback conn id %))
                                                          (listen! (:up event-types)
                                                                   #(dd-up-callback conn id)))
                                      [{:e     id
                                        :a     :state/dragging
                                        :v     false
                                        :added true}] (do (unlisten! domina/root-element (:move event-types))
                                                          (unlisten! domina/root-element (:up event-types)))
                                      :else nil)))
                           state)
   :componentWillUnmount (fn [{:keys [id]} _]
                           (unlisten! (.getDOMNode *component*)
                                      (:down event-types)))})
