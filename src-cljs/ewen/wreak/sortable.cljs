(ns ewen.wreak.sortable
  (:require [cljs.core.async :as async]
            [ewen.wreak :refer [*component* mixin replace-state! get-state]]
            [datascript :as ds]
            [cljs.core.match]
            [clojure.data]
            [schema.core :as s])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [cljs.core.match.macros :refer [match]]))

(defn only
  "Return the only item from a query result"
  ([query-result]
   (assert (= 1 (count query-result)))
   (assert (= 1 (count (first query-result))))
   (ffirst query-result))
  ([query-result default]
   (if (= 0 (count query-result)) default
                                  (only query-result))))


(def not-nil? (comp not nil?))

(defn sortable-replace-state! [comp new-state]
  (replace-state! comp (-> (get-state comp)
                           (merge {::sortable-state new-state}))))

(defn sortable-get-state [comp]
  (-> (get-state comp) ::sortable-state))

(defn compare*
  "Same as compare, but a nil value is 'more'
  than a non-nil value."
  [x y]
  (cond
    (and (nil? x) (not-nil? y)) 1
    (and (nil? y) (not-nil? x)) -1
    :else (compare x y)))



(defn apply-pos-updates [sort-state updates]
  (let [sort-state (atom sort-state)]
    (doseq [[k v] updates]
      (if (nil? v)
        (swap! sort-state dissoc k)
        (swap! sort-state assoc-in k v)))
    (into {} (sort-by (comp :pos val) compare* @sort-state))))


(defn pos-callback [ids {:keys [tx-data]}]
  (let [updates (map (fn [datom]
                       (match [datom]
                              [{:e     (id :guard (fn [id] (some #(= id %) ids)))
                                :a     :password/pos
                                :v     new-pos
                                :added true}]
                              [[id :pos] new-pos]
                              [{:e     (id :guard (fn [id] (some #(= id %) ids)))
                                :a     :password/pos
                                :v     _
                                :added false}]
                              [[id :pos] nil]
                              :else nil))
                     tx-data)]
    (filter not-nil? updates)))


(defn apply-index-updates [sort-state updates]
  (->> (loop [[[id new-sort-index] & r] updates
              sort-state sort-state]
         (if (empty? r)
           (assoc-in sort-state id new-sort-index)
           (recur r (assoc-in sort-state id new-sort-index))))
       (sort-by (comp :sort-index val) compare*)
       (into {})))

(defn index-callback [ids {:keys [tx-data]}]
  (let [updates (map (fn [datom]
                       (match [datom]
                              [{:e     (id :guard (fn [id] (some #(= id %) ids)))
                                :a     :state/sort-index
                                :v     new-sort-index
                                :added true}]
                              [[id :sort-index] new-sort-index]
                              [{:e     (id :guard (fn [id] (some #(= id %) ids)))
                                :a     :state/sort-index
                                :v     _
                                :added false}]
                              [[id :sort-index] nil]
                              :else nil))
                     tx-data)]
    (filter not-nil? updates)))


(defn pos->index-keys* [app id]
  (->> (ds/pattern->index-keys [id :password/pos nil nil])
       (into [app])))

(defn sort-index->index-keys* [app id]
  (->> (ds/pattern->index-keys [id :state/sort-index nil nil])
       (into [app])))

(defn pos->index-keys [app ids]
  (->> (map (partial pos->index-keys* app) ids)
       (into #{})))

(defn sort-index->index-keys [app ids]
  (->> (map (partial sort-index->index-keys* app) ids)
       (into #{})))


(defn sortable-add-ids
  "Add all the ids to sort-state. The DB is used to retrieve the sort indexes
  and positions associated with each entity."
  [sort-state db ids]
  (let [sort-state (atom sort-state)]
    (doseq [id ids]
      (let [pos (-> (ds/entity db id)
                    :password/pos)]
        (when (not-nil? pos)
          (swap! sort-state assoc-in [id :pos] pos))))
    (into {} (sort-by (comp :pos val) compare* @sort-state))))

(defn comp-state-add-ids
  [state db ids]
  (let [sort-state (atom state)]
    (doseq [id ids]
      (let [index (-> (ds/entity db id)
                      :state/sort-index)]
        (swap! sort-state assoc-in [id :sort-index] index)))
    (into {} (sort-by (comp :sort-index val) compare* @sort-state))))

(defn remove-ids [state ids]
  (let [sort-state (atom state)]
    (doseq [id ids]
      (swap! sort-state dissoc id))
    @sort-state))




(defn keys-index-changed
  "Given 2 maps, return a set of the keys that are in both maps
   but not at the same position"
  [m1 m2]
  (let [[diff1 diff2 _] (clojure.data/diff (keys m1) (keys m2))]
    (-> (clojure.set/intersection (set diff1) (set diff2))
        (disj nil))))

(defn update-listen-ids-builder [app chan-pos chan-sort-index]
  (fn update-listen-ids [_ _ old-ids new-ids]
    (ds/listen! app chan-pos (pos->index-keys app new-ids))
    (ds/listen! app chan-sort-index (sort-index->index-keys app new-ids))))

(defn ids->sort-state-builder [app sort-state]
  (fn ids->sort-state [_ _ old-ids new-ids]
    (let [rem-ids (clojure.set/difference old-ids new-ids)
          add-ids (clojure.set/difference new-ids old-ids)]
      (swap! sort-state (comp #(sortable-add-ids % @app add-ids)
                              #(remove-ids % rem-ids))))))

(defn ids->comp-state-builder [app comp]
  (fn ids->comp-state [_ _ old-ids new-ids]
    (let [rem-ids (clojure.set/difference old-ids new-ids)
          add-ids (clojure.set/difference new-ids old-ids)
          state (sortable-get-state comp)
          state (comp-state-add-ids state @app add-ids)
          state (remove-ids state rem-ids)]
      (sortable-replace-state! comp state))))



(defn handle-item-new-sort-index
  [db [id new-sort-id]]
  (cond-> {:db/id            id
           :state/sort-index (-> (ds/entity db new-sort-id)
                                 :state/sort-index)
           :state/init-pos   (-> (ds/entity db new-sort-id)
                                 :state/init-pos)}
          #(-> (ds/entity db id)
               :state/dragging)
          (assoc :password/pos (-> (ds/entity db new-sort-id)
                                   :state/init-pos))))

(defn build-process-sortable [app]
  (fn ^{:doc "Sort the entities by :pos. When the sort order changed,
    update the entities attributes accordingly."}
    process-sortable
    [_ _ o n]
    (let [keys-changed (keys-index-changed o n)
          o-filtered (->> (select-keys o keys-changed)
                          (sort-by (comp :pos val)))
          n-filtered (->> (select-keys n keys-changed)
                          (sort-by (comp :pos val)))
          sort-updates (->> (map (fn [[id _] [id-sorted _]]
                                   (if (= id id-sorted)
                                     nil
                                     [id id-sorted]))
                                 o-filtered n-filtered)
                            (filter not-nil?)
                            (mapv (partial handle-item-new-sort-index @app)))]
      (when (not-empty sort-updates)
        (ds/transact! app sort-updates)))))



(defn listen-passwords-ids! [react-comp app ids chan-pos chan-sort-index]
  (let [ ;The map keys are the entities to be sorted ids.
         sort-state-schema {s/Int {:sort-index (s/maybe s/Int)
                                   :pos (s/maybe s/Int)}}
         ;sort-state-no-nil-pos is a "local view" of the sorted entities and is used to recompute
         ;the sorting order of every entities when they are dragged over. Only the entities with a
         ;position are considered since the position is used to recompute the sort order.
         sort-state (atom {})
         ;The map keys are the entities to be sorted ids.
         sort-state-schema {s/Int {:pos s/Int}}]
    ;Initialize sort-state and sort-state-no-nil-pos.
    (swap! sort-state sortable-add-ids @app @ids)
    ;For every position update of any entities, report the position update
    ;back into sort-state and sort-state-no-nil-pos
    (go-loop []
             (when-let [report (async/<! chan-pos)]
               (let [updates (pos-callback @ids report)]
                 (when (not-empty updates)
                   (swap! sort-state apply-pos-updates updates)))
               (recur))
             (async/close! chan-pos))
    ;For every sort-index update of any entities, report the sort-index update
    ;back into sort-state and sort-state-no-nil-pos
    (go-loop []
             (when-let [report (async/<! chan-sort-index)]
               (let [updates (index-callback @ids report)]
                 (when (not-empty updates)
                   (let [state (sortable-get-state react-comp)]
                     (sortable-replace-state! react-comp (apply-index-updates state updates)))))
               (recur))
             (async/close! chan-sort-index))
    (add-watch sort-state :sort-state-updates (build-process-sortable app))
    (add-watch ids :ids-updates (juxt  (update-listen-ids-builder app chan-pos chan-sort-index)
                                       (ids->comp-state-builder app react-comp)
                                       (ids->sort-state-builder app sort-state)))
    (ds/listen! app chan-pos (pos->index-keys app @ids))
    (ds/listen! app chan-sort-index (sort-index->index-keys app @ids))))







(defn set-sortable-pos-chan! [app chan]
  (-> (ds/transact! app [{:db/id             -1
                          :sortable/chan-pos chan}])
      :tempids
      (get -1)))

(defn set-sortable-sort-index-chan! [app chan]
  (-> (ds/transact! app [{:db/id                    -1
                          :sortable/chan-sort-index chan}])
      :tempids
      (get -1)))


(def sortable-mixin
  (mixin
    {:getInitialState      (fn [_ {:keys [app]}]
                             ;The initial state is the ids with their sort indexes, sorted by their
                             ;sort indexes. The state is assoc with the key ::sortable-state within the
                             ;state of the react component.
                             (->> (map (fn [id] {id {:sort-index (-> (ds/entity @app id)
                                                                     :state/sort-index)}})
                                       @(.-ids *component*))
                                  (apply merge)
                                  (sort-by (comp :sort-index val) compare*)
                                  (into {})
                                  (assoc {} ::sortable-state)))
     :componentDidMount    (fn [_ _ {:keys [app]}]
                             (let [chan-pos (async/chan)
                                   chan-sort-index (async/chan)]
                               (->> (set-sortable-pos-chan! app chan-pos)
                                    (aset *component* ::pos-chan-id))
                               (->> (set-sortable-sort-index-chan! app chan-sort-index)
                                    (aset *component* ::sort-index-chan-id))
                               (listen-passwords-ids! *component* app (.-ids *component*) chan-pos chan-sort-index)))
     :componentWillUnmount (fn [_ _ {:keys [app]}]
                             (remove-watch (.-ids *component*) :ids-updates)
                             (ds/unlisten! app (->> (aget *component* ::pos-chan-id)
                                                    (ds/entity @app) :sortable/chan-pos))
                             (ds/unlisten! app (->> (aget *component* ::sort-index-chan-id)
                                                    (ds/entity @app) :sortable/chan-sort-index))
                             (ds/transact! app [[:db.fn/retractAttribute
                                                 (aget *component* ::pos-chan-id)
                                                 :sortable/chan-pos]])
                             (ds/transact! app [[:db.fn/retractAttribute
                                                 (aget *component* ::sort-index-chan-id)
                                                 :sortable/chan-pos]]))}))

