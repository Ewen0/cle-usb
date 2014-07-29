(ns ewen.cle-usb.data)

#_(defmacro defquery [name params query & sources]
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

(defmacro defquery [name params query & sources]
  (let [cache-key? (= :cache params)
        params (if cache-key? (first sources) params)
        params (into '[_] params)                           ;Add the first argument to a Protocol method call
        query (if cache-key? (second sources) query)
        sources (if cache-key? (nthrest sources 2) sources)
        cache? (if cache-key? query false)]
    (if cache?
      `(let [cached-query# (cljs.core/atom #{})]
         (def ~name
           (reify cljs.core/IFn
             (~'-invoke ~'[_] (cljs.core/deref cached-query#))
             (~'-invoke ~params (cljs.core/reset! cached-query# (datascript/q ~query ~@sources)))
             ewen.cle-usb.data/IndexKeys
             (~'get-index-keys ~params (~'-> (datascript/analyze-q ~query ~@sources)
                                        ewen.cle-usb.data/analyze->index-keys)))))
      `(def ~name
         (reify cljs.core/IFn
           (~'-invoke ~params (datascript/q ~query ~@sources))
           ewen.cle-usb.data/IndexKeys
           (~'get-index-keys ~params (~'-> (datascript/analyze-q ~query ~@sources)
                                      ewen.cle-usb.data/analyze->index-keys)))))))

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

   (def my-query (reify IFn
                   (-invoke [_ data] (ds/q '[] data))
                   ewen.cle-usb.data/IndexKeys
                   (get-index-keys [_ data] (datascript/analyze-q '[] data))))

   (let [cached-query (atom #{})]
     (defn my-query
       (reify cljs.core/IFn
         (-invoke [_] @cached-query)
         (-invoke [_ data] (reset! cached-query (ds/q '[] data)))
         ewen.cle-usb.data/IndexKeys
         (get-index-keys [_ data] (datascript/analyze-q '[] data)))))

   )

