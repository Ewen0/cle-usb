(ns ewen.verra)

(comment

  '(init-state [] {:a "e"})

  #_(clj->js {:init-state (fn [] {:a "e"})})

  #_(clojure.template/apply-template '[name args body] '{name (fn args body)} '[:init-state [] {:a "e"}])

  (defn method->map [[name args body]] {(keyword name) (list 'fn args body)})

  (method->map '(init-state [a] {:a "e"}))

  (apply merge (map method->map '((init-state [] {:a "e"})
                                  (oo [] "e"))))

  (defmacro defcomponent [name & methods]
    (let [method-maps (map method->map methods)
          method-map (apply merge method-maps)]
      `(def ~name (js/React.createClass
                    (cljs.core/clj->js ~method-map)))))

  (macroexpand '(defcomponent e (init-state [a] {:a "e"})
                              (yy [] 'e)))
  )

(defmacro defcomponent
  [name & forms]
  (let [name-str (str name)
        has-docstr? (string? (first forms))
        docstr (if has-docstr? (first forms) "")
        methods-map (if has-docstr? (second forms) (first forms))]
    `(def ~name ~docstr (component ~methods-map ~name-str))))

(defmacro with-this [& body]
  `(cljs.core/this-as ~'this (cljs.core/binding [*component* ~'this] ~@body)))

(comment
  (macroexpand-1 '(defcomponent header {:render (fn [this] (html [:div]))}))

  (macroexpand-1 '(with-this (prn "e")))
  )


