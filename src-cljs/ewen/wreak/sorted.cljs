(ns ewen.wreak.sorted
  (:require [datascript :as ds]))

(def not-nil? (comp not nil?))

(defn compare*
  "Same as compare, but a nil value is 'more'
  than a non-nil value."
  [x y]
  (cond
    (and (nil? x) (not-nil? y)) 1
    (and (nil? y) (not-nil? x)) -1
    :else (compare x y)))

(defn get-sort-index [db id]
                (-> (ds/entity db id)
                    :state/sort-index))

(def sorted-mixin
  {:getInitialState (fn [_ db state]
                      ;The initial state is the ids with their sort indexes, sorted by their
                      ;sort indexes.
                      (sort-by (partial get-sort-index db) compare* state))
   :stateWillUpdate (fn [db _ state]
                      (sort-by (partial get-sort-index db) compare* state))
   :dbDidUpdate (fn [_ _ {:keys [tx-data]}])})