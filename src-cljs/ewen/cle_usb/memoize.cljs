(ns ewen.cle-usb.memoize
  (:refer-clojure :exclude [memoize]))

;; and to be sure that you only compute each entry once,
;; we first change memoize5 so that the returned value *is*
;; the cached value and not another equal value.
(defn memoize-helper1
  ([f] (memoize-helper1 f [{} identity (fn [mem args] mem) assoc]))
  ([f [init cached hit assoc]]
   (let [mem (atom init)
         hit-or-assoc (fn [mem args ret]
                        (if (find (cached mem) args)
                          (hit mem args)
                          (assoc mem args ret)))]
     (fn [& args]
       (let [ret (if-let [e (find (cached @mem) args)] (val e) (apply f args))
             m (swap! mem hit-or-assoc args ret)]
         (get (cached m) args))))))

;; then we can build memoize7 on memoize6:
(defn memoize-helper2
  ([f] (memoize-helper2 f [{} identity (fn [mem args] mem) assoc]))
  ([f strategy]
   (comp deref (memoize-helper1 #(delay (apply f %&)) strategy))))


;; integrating memoize6 and memoize7 (inspired by Eugen Dück memoize7-variant
;; see http://groups.google.com/group/clojure/browse_thread/thread/36a13d150d830683 )
(defn memoize
  ([f] (memoize f [{} identity (fn [mem args] mem) assoc]))
  ([f [init cached hit assoc]]
   (let [mem (atom init)
         hit-or-assoc (fn [mem args]
                        (if (contains? (cached mem) args)
                          (hit mem args)
                          (assoc mem args (delay (apply f args)))))]
     (fn [& args]
       (let [m (swap! mem hit-or-assoc args)]
         (-> (cached m) (get args) deref))))))