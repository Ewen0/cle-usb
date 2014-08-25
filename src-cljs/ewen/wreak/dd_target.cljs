(ns ewen.wreak.dd-target
  (:require [cljs.core.async :as async]
            [ewen.wreak :refer [*component* mixin replace-state! get-state]]
            [datascript :as ds]
            [cljs.core.match]
            [goog.style :as gstyle])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs.core.match.macros :refer [match]]))

(def get-dragging (reify
                    cljs.core/IFn
                    (-invoke [this db pwd-id]
                      (let [dragging (get (ds/entity db pwd-id) :state/dragging)]
                        (or dragging false)))
                    ds/IndexKeys
                    (get-index-keys [this db pwd-id]
                      (->> (ds/pattern->index-keys [pwd-id :state/dragging nil nil])
                           (into [db])
                           (conj #{})))))

(def get-password-pos (reify
                        cljs.core/IFn
                        (-invoke [this db pwd-id]
                          (get (ds/entity db pwd-id) :password/pos))
                        ds/IndexKeys
                        (get-index-keys [this db pwd-id]
                          (->> (ds/pattern->index-keys [pwd-id :password/pos nil nil])
                               (into [db])
                               (conj #{})))))

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


(defn listen-password-dragging! [app pwd-id callback]
  (let [index-keys (ds/get-index-keys get-dragging app pwd-id)]
    (ds/listen! app callback
                index-keys)))

(defn listen-password-pos! [app pwd-id callback]
  (let [index-keys (ds/get-index-keys get-password-pos app pwd-id)]
    (ds/listen! app callback index-keys)))

(def dd-target-mixin
  (mixin
    {:getInitialState (fn [{:keys [id]} {:keys [app]}]
                        {:dragging (get-dragging @app id)
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
                            (set-attr! app id :dd-target-dragging-chan chan)
                            (listen-password-dragging! app id chan))

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
                            (set-attr! app id :dd-target-pos-chan chan)
                            (listen-password-pos! app id chan))

                          (let [node (.getDOMNode *component*)
                                init-pos (gstyle/getPosition node)]
                            (set-init-pos! app id (-> (g-pos->pos init-pos) :y))
                            (set-pwd-pos! app id (-> (g-pos->pos init-pos) :y))))
     :componentDidUpdate (fn [_ {:keys [id]} old-state new-state {:keys [app]}]
                           (when (and (:dragging old-state)
                                      (not (:dragging new-state)))
                             (let [node (.getDOMNode *component*)
                                   init-pos (gstyle/getPosition node)]
                               (set-init-pos! app id (-> (g-pos->pos init-pos) :y))
                               (set-pwd-pos! app id (-> (g-pos->pos init-pos) :y)))))}))


(def dd-target-mixin-render
  (fn [_
       {:keys [dragging pos] :as state}
       _
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