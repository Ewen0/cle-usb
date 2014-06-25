(ns ewen.cle-usb.core
  (:require [cljs.core.async :as async]
            [clojure.browser.repl] ;Only for development mode. TODO find a way to make a conditional require
            [sablono.core :as html :refer-macros [html html-expand]]
            [ewen.dragdrop :as dd]
            [ewen.async-plus :as async+]
            [goog.style :as gstyle]
            [ewen.cle-usb.render :as render]
            [datascript :as ds])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [ewen.async-plus.macros :as async+m]))


(defn init []
  (enable-console-print!)
  (js/React.initializeTouchEvents true))



(defn load-app []
  {:state (atom [{:id 0 :label "Password1"}
                 {:id 1 :label "Password2"}])
   :current-view (atom :home)
   :channels {:menu-events (async/mult (async/chan))}
   :consumers {:menu-events nil}})


;Application entry point
#_(let [app (load-app)]
  (init)
  (render/request-render app))







(comment

  (let [schema {:aka {:cardinality :many}}
        conn   (ds/create-conn)]
    (ds/transact! conn [ { :db/id -1
                          :name  "Maksim"
                          :age   45
                          :aka   ["Maks Otto von Stirlitz" "Jack Ryan"] } ])
    (ds/q '[ :find  ?n ?a
            :where [?e :aka ["Maks Otto von Stirlitz" "Jack Ryan"]]
            [?e :name ?n]
            [?e :age  ?a] ]
         @conn))

  )

