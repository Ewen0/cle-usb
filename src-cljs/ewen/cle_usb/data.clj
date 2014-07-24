(ns ewen.cle-usb.data)

(defmacro defquery [name params query & sources]
  (let [cache-key? (= :cache params)
        params (if cache-key? (first sources) params)
        query (if cache-key? (second sources) query)
        sources (if cache-key? (nthrest sources 2) sources)
        cache? (if cache-key? query false)]
    (if cache?
      `(let [cached-query# (cljs.core/atom #{})]
         (def ~name
           (cljs.core/with-meta (~'fn
                                 ([] (cljs.core/deref cached-query#))
                                 (~params (cljs.core/reset! cached-query# (datascript/q ~query ~@sources))))
                                {:index-keys-fn
                                  (~'fn ~params (datascript/analyze-q ~query ~@sources))})))
      `(def ~name
         (cljs.core/with-meta (~'fn ~params (datascript/q ~query ~@sources))
                              {:index-keys-fn
                                (~'fn ~params (datascript/analyze-q ~query ~@sources))})))))

(comment
   (macroexpand-1 '(defquery my-query :cache true
                             [data]
                             '[:find ?id ?label ?dragging ?sort-index
                                                           :in $
                                                           :where [?id :password/label ?label]
                                                           [?id :state/dragging ?dragging]
                                                           [?id :state/sort-index ?sort-index]
                                                           [(com.ewen.cle-usb.data/maybe $ ?id :password/width nil) ?width]
                                                           [(com.ewen.cle-usb.data/maybe $ ?id :password/height nil) ?height]]
                             data))

   (macroexpand-1 '(defquery get-list-passwords :cache true
                             [data] '[:find ?id ?label ?dragging ?sort-index
                                      :in $ ?maybe
                                      :where [?id :password/label ?label]
                                      [?id :state/dragging ?dragging]
                                      [?id :state/sort-index ?sort-index]
                                      [(?maybe $ ?id :password/width nil) ?width]
                                      [(?maybe $ ?id :password/height nil) ?height]] data maybe))



   (macroexpand-1 '(defquery my-query [data]
                             '[:find ?id]
                             data))

   (macroexpand-1 '(defquery get-list-passwords :cache true
                             [data] '[:find ?id ?label ?dragging ?sort-index
                                      :in $
                                      :where [?id :password/label ?label]
                                      [?id :state/dragging ?dragging]
                                      [?id :state/sort-index ?sort-index]
                                      [(com.ewen.cle-usb.data/maybe $ ?id :password/width nil) ?width]
                                      [(com.ewen.cle-usb.data/maybe $ ?id :password/height nil) ?height]]
                             data))

   (do (def my-query (with-meta (fn [data]
                                  (ds/q '[] data)))))

   (do (let [cached-query (atom #{})]
         (defn my-query
                 ([] @cached-query)
                 ([data] (reset! cached-query (ds/q '[] data)))))
       (set! my-query (with-meta my-query {:index-keys-fn (fn [data] (ds/analyze-q my-query data))})))

   )

