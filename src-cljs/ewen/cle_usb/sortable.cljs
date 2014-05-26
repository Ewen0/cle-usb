(ns ewen.cle-usb.sortable
  (:require [cljs.core.async :as async]
            [goog.math])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [ewen.async-plus.macros :as async+m]))




(defn index-in
  ([item seq]
   (index-in item seq =))
  ([item seq comparator]
   (let [helper-seq (take-while #(not (comparator item %)) seq)]
     (if (= (.-length (clj->js helper-seq))
            (.-length (clj->js seq)))
       -1
       (.-length (clj->js helper-seq))))))

(defn pos-in [item seq]
  (->> (conj seq item)
      (sort-by #(.-y %))
      (#(index-in item %))))

(defn rotate
  [n coll]
  (let [c (count coll)]
    (take c (drop (mod n c) (cycle coll)))))

(defn sort-items [{:keys [pos id] :as new-pos-map} coll]
  (let [ previous-pos  (index-in new-pos-map coll #(= (:id %1) (:id %2)))
         rotate-direction (if (> pos previous-pos) 1 -1)
         subvec-rotate (subvec coll (min pos previous-pos) (+ 1 (max pos previous-pos)))
         subvec-before (subvec coll 0 (min pos previous-pos))
         subvec-after (subvec coll (+ 1 (max pos previous-pos)) (.-length (clj->js coll)))]
    (concat subvec-before
            (rotate rotate-direction subvec-rotate)
            subvec-after)))


#_(defn sortable-mult [in-map]

  (extend-type goog.math/Coordinate
    IEquiv
    (-equiv [o other]
      (and (instance? goog.math/Coordinate other)
           (and (= (.-x o) (.-x other))
                (= (.-y o) (.-y other))))))

  (let [out-chan (async/chan)
        out-mult (async/mult out-chan)
        positions (map :pos in-map)]
    (doseq [{:keys [id pos update-pos-mult]} in-map]
      (async+m/go-loop [update-pos-chan update-pos-mult]
                       (when-let [new-pos (async/<! update-pos-chan)]
                         (when (async/put! out-chan {:id  id
                                                   :pos (->> positions
                                                             (remove #(= pos %))
                                                             (pos-in new-pos))})
                           (recur update-pos-chan)))))
    out-mult))

(defn sortable-mult [in-map]

  (extend-type goog.math/Coordinate
    IEquiv
    (-equiv [o other]
      (and (instance? goog.math/Coordinate other)
           (and (= (.-x o) (.-x other))
                (= (.-y o) (.-y other))))))

  (let [out-chan (async/chan)
        out-mult (async/mult out-chan)
        positions (map :pos in-map)]
    (doseq [{:keys [id pos update-pos-mult]} in-map]
      (async+m/go-loop [update-pos-chan update-pos-mult]
                       (when-let [new-pos (async/<! update-pos-chan)]
                         (let [new-pos-map {:id  id
                                            :pos (->> positions
                                                      (remove #(= pos %))
                                                      (pos-in new-pos))}
                               new-id-positions (sort-items new-pos-map (vec in-map))]
                           (when (async/put! out-chan new-id-positions)
                             (recur update-pos-chan))))))
    out-mult))


(comment

  (rotate 1 [1 2 3 4 5])
  (subvec [1 2 3] 0 3)

  (defn coord [x y]
    (goog.math/Coordinate. x y))

  (sort-items {:id 0 :pos 0} [{:id 0, :label "Password1"} {:id 1, :label "Password2"}])

  )