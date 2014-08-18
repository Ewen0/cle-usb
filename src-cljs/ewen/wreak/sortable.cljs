(ns ewen.wreak.sortable
  (:require [cljs.core.async :as async]
            [ewen.wreak :refer [*component* mixin replace-state! get-state]]
            [datascript :as ds]
            [cljs.core.match]
            [clojure.data])
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

(defn compare* [x y]
  (cond
    (and (nil? x) (not-nil? y)) 1
    (and (nil? y) (not-nil? x)) -1
    :else (compare x y)))


(defn normalize-sort-indexes [in-map]
  (->> (sort-by (comp :sort-index second) compare* in-map)
       (map (fn [i [key {:keys [sort-index]}]] [key {:sort-index i}]) (range (count in-map)))
       (into {})))

(defn apply-pos-updates [sort-state updates]
  (let [sort-state (atom sort-state)]
    (doseq [[ks v] updates]
      (swap! sort-state assoc-in ks v))
    @sort-state))


(defn pos-callback [ids {:keys [tx-data]}]
  (let [updates (map (fn [datom]
                       (match [datom]
                              [{:e     (id :guard (fn [id] (some #(= id %) ids)))
                                :a     :password/pos
                                :v     new-pos
                                :added true}]
                              [[id :pos] new-pos]
                              :else nil))
                     tx-data)]
    (filter not-nil? updates)))


(defn apply-index-updates [sort-state updates]
  (->> (loop [[[map-keys new-sort-index] & r] updates
              sort-state sort-state]
         (if (empty? r)
           (assoc-in sort-state map-keys new-sort-index)
           (recur r (assoc-in sort-state map-keys new-sort-index))))
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
      (let [index (-> (ds/entity db id)
                      :state/sort-index)
            pos (-> (ds/entity db id)
                    :password/pos)]
        (swap! sort-state assoc-in [id :sort-index] index)
        (swap! sort-state assoc-in [id :pos] pos)))
    (into {} (sort-by (comp :sort-index val) compare* @sort-state))))

(defn sortable-rem-ids [sort-state ids]
  (let [sort-state (atom sort-state)]
    (doseq [id ids]
      (swap! sort-state dissoc id))
    (into {} (sort-by (comp :sort-index val) compare* @sort-state))))


(defn sortable-no-nil-pos-add-ids
  ""
  [sort-state items]
  (let [sort-state (atom sort-state)]
    (doseq [item items]
      (swap! sort-state merge (dissoc item :sort-index)))
    (into {} (sort-by (comp :pos val) @sort-state))))

(defn sortable-no-nil-pos-rem-ids [sort-state ids]
  (let [sort-state (atom sort-state)]
    (doseq [id ids]
      (swap! sort-state dissoc id))
    (into {} (sort-by (comp :pos val) @sort-state))))

(defn set-no-nil [coll]
  (set coll))

(defn keys-index-changed [m1 m2]
  (let [[diff1 diff2 _] (clojure.data/diff (keys m1) (keys m2))]
    (-> (clojure.set/intersection (set diff1) (set diff2))
        (disj nil))))

(defn ids->sort-state-builder [app sort-state chan-pos chan-sort-index]
  (fn ids->sort-state [_ _ old-ids new-ids]
    (ds/listen! app chan-pos (pos->index-keys app new-ids))
    (ds/listen! app chan-sort-index (sort-index->index-keys app new-ids))
    (let [rem-ids (clojure.set/difference old-ids new-ids)
          add-ids (clojure.set/difference new-ids old-ids)]
      (swap! sort-state sortable-add-ids @app add-ids)
      (swap! sort-state sortable-rem-ids rem-ids))))


(defn sort-state->sort-state-no-nil-pos-builder [sort-state-no-nil-pos]
  (fn sort-state->sort-state-no-nil-pos [_ _ old-sort-state new-sort-state]
    (let [diff (clojure.data/diff old-sort-state new-sort-state)
          ;Items to be removed from sort-state-no-nil-pos:
          ;All items that had a :pos in old-sort-state but not anymore
          ;in new-sort-state.
          rem-items (->> (first diff)
                         (filter (comp :pos val))
                         (map first)
                         (select-keys (second diff))
                         (filter (comp nil? :pos val))
                         (map first))
          ;Items to be added to sort-state-no-nil-pos:
          ;All items that have a :pos in new-sort-state.
          add-items-ids (->> (second diff)
                             (filter (comp :pos val))
                             (map (fn [[id _]] id)))
          add-items (map #(select-keys new-sort-state [%]) add-items-ids)]
      (when (not-empty add-items)
        (swap! sort-state-no-nil-pos sortable-no-nil-pos-add-ids add-items))
      (when (not-empty rem-items)
        (swap! sort-state-no-nil-pos sortable-no-nil-pos-rem-ids rem-items)))))



(defn listen-passwords-ids! [react-comp app ids chan-pos chan-sort-index]
  (let [sort-state (atom {})
        sort-state-no-nil-pos (atom {})
        ids-callback (ids->sort-state-builder app sort-state chan-pos chan-sort-index)
        sort-state-callback (sort-state->sort-state-no-nil-pos-builder sort-state-no-nil-pos)]
    ;Initialize sort-state and sort-state-no-nil-pos.
    (swap! sort-state sortable-add-ids @app @ids)
    (swap! sort-state-no-nil-pos sortable-no-nil-pos-add-ids
           (map (fn [k v] {k (dissoc v :sort-index)})
                @sort-state))
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
                   (swap! sort-state apply-index-updates updates)))
               (recur))
             (async/close! chan-sort-index))
    (add-watch sort-state-no-nil-pos :sort-state-no-nil-pos-updates
               (fn [_ _ o n]
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
                                         (mapv (fn [[id new-sort-id]]
                                                 (let [db @app]
                                                   (cond-> {:db/id            id
                                                            :state/sort-index (-> (ds/entity db new-sort-id)
                                                                                  :state/sort-index)
                                                            :state/init-pos   (-> (ds/entity db new-sort-id)
                                                                                  :state/init-pos)}
                                                           #(-> (ds/entity db id)
                                                               :state/dragging)
                                                           (assoc :password/pos (-> (ds/entity db new-sort-id)
                                                                                    :state/init-pos)))))))]
                   (when (not-empty sort-updates)
                     (ds/transact! app sort-updates)))))
    (add-watch sort-state :sort-state->sort-state-no-nil-pos sort-state-callback)
    (add-watch sort-state :sort-state-updates (fn [_ _ _ n]
                                                (sortable-replace-state! react-comp n)))
    (add-watch ids :ids-updates ids-callback)
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

