(ns ewen.cle-usb.render-raw)

(defmacro with-this [& body]
          `(cljs.core/this-as ~'this (cljs.core/binding [*component* ~'this] ~@body)))
