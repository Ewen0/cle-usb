(ns ewen.async-plus)

(defmacro <! [mult]
  `(let [ch# (cljs.core.async/tap ~mult (cljs.core.async/chan))
         val# (cljs.core.async/<! ch#)]
     (cljs.core.async/untap ~mult ch#)
     val#))

(defmacro go-loop [mult-bindings & body]
  (let [bindings (for [[symb mult] (->> mult-bindings
                                        (partition 2))]
                   [symb (list 'cljs.core.async/tap mult
                               '(cljs.core.async/chan))])
        bindings (->> bindings (reduce concat) vec)
        untaps (for [[symb mult] (->> mult-bindings
                                      (partition 2))]
                 (list 'cljs.core.async/untap mult symb))
        untaps (cons 'do untaps)]
    `(cljs.core.async.macros/go-loop ~bindings ~@body ~untaps)))
