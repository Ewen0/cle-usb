(ns ewen.wreak.dd-target
  (:require [cljs.core.async :as async]
            [ewen.wreak :refer [*component* mixin]]
            [datascript :as ds]
            [cljs.core.match]
            [goog.style :as gstyle])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs.core.match.macros :refer [match]]))


(defn set-attr! [app id attr val]
  (ds/transact! app [{:db/id id
                      attr val}]))

(defn set-init-pos! [app pwd-id pos]
  (ds/transact! app [{:db/id        pwd-id
                      :state/init-pos pos}]))

(defn set-pwd-pos! [app pwd-id pos]
  (ds/transact! app [{:db/id        pwd-id
                      :password/pos pos}]))

(defn g-pos->pos [g-pos]
  {:x (.-x g-pos) :y (.-y g-pos)})




(def dd-target-mixin
  {:getInitialState      (fn [{:keys [id]} db state]
                           (merge state
                                  {:dragging (-> (ds/entity db id) :state/dragging)
                                   :pos      (-> (ds/entity db id) :password/pos)}))
   :dbDidUpdate          (fn [{:keys [id]} state {:keys [db-after tx-data]}]
                           (-> state
                               (assoc :dragging
                                 (-> (ds/entity db-after id) :state/dragging))
                               (assoc :pos
                                 (-> (ds/entity db-after id) :password/pos))))
   :componentDidMount    (fn [{:keys [id]} _ db]
                           (let [node (.getDOMNode *component*)
                                 init-pos (gstyle/getPosition node)]
                             (set-init-pos! (.-conn *component*) id (-> (g-pos->pos init-pos) :y))
                             (set-pwd-pos! (.-conn *component*) id (-> (g-pos->pos init-pos) :y))))
   :componentDidUpdate   (fn [_ {:keys [id]} old-state new-state]
                           (when (and (:dragging old-state)
                                      (not (:dragging new-state)))
                             (let [node (.getDOMNode *component*)
                                   init-pos (gstyle/getPosition node)]
                               (set-init-pos! (.-conn *component*) id (-> (g-pos->pos init-pos) :y))
                               (set-pwd-pos! (.-conn *component*) id (-> (g-pos->pos init-pos) :y)))))})


(def dd-target-mixin-render
  (fn [_
       {:keys [dragging pos] :as state}
       render-comp]
    (let [node (when (.isMounted *component*) (.getDOMNode *component*))
          width (if node (.-width (gstyle/getSize node)) nil)
          height (if node (.-height (gstyle/getSize node)) nil)
          style-pos (if (and dragging pos)
                      {:position "absolute" :top pos}
                      {:position "static" :z-index 0})
          dim (if width {:width width} {})
          dim (merge dim (if height {:height height} {}))
          style (merge dim style-pos)]
      (.cloneWithProps js/React.addons render-comp (clj->js {:style style})))))