(ns ewen.wreak)

(defmacro with-this [& body]
  `(cljs.core/this-as ~'this (cljs.core/binding [*component* ~'this] ~@body)))
