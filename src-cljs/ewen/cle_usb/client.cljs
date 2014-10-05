(ns ewen.cle-usb.client
  (:require [clojure.browser.repl] ;Only for development mode. TODO find a way to make a conditional require
            [cljs.core.async :as async]
            [ewen.async-plus :as async+ :include-macros true]
            [goog.style :as gstyle]
            [ewen.cle-usb.render :as render]
            [ewen.cle-usb.data :as data]
            [datascript :as ds]
            [ewen.wreak :as w :refer [*component* mixin component]]
            [domina :refer [single-node]]
            [domina.css :refer [sel]]
            [sablono.core :refer-macros [html html-expand]])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]))


(defn init []
  (enable-console-print!)
  (js/React.initializeTouchEvents true))







(def conn (data/load-app))



(init)










(render/render conn)








(comment

  (load-app)

  (let [schema {:aka {:cardinality :many}}
        conn (ds/create-conn)
        param "rr"]
    (ds/transact! conn [{:db/id -1
                         :name  param
                         :age   45
                         :aka   ["Maks Otto von Stirlitz" "Jack Ryan"]}])
    (ds/q '[:find ?n ?a
            :where [?e :aka ["Maks Otto von Stirlitz" "Jack Ryan"]]
            [?e :name ?n]
            [?e :age ?a]]
          @conn))








  (def ddd (load-app))
  (get (:tempids (ds/transact! ddd [
                                     {:db/id          -1
                                      :password/label "Password5"}
                                     #_[:db/retract 6 :password/label "Password5"]
                                     ])) -1)

  (ds/q '[:find ?id
          :where [?id :password/label _]]
        @ddd)


  (ds/entity @ddd (only #{[7]}))




  (ds/listen! ddd :ll #(.log js/console (str (:tx-data %))))
  (ds/unlisten! ddd :ll)



  (ds/q '[:find ?id ?name
          :where [?id :react/name ?name]]
        @conn)












  (ds/q2 '[:find ?view
           :where [_ :view/current ?view]]
         @conn)

  (-> (ds/empty-db) (ds/with [[:db/add 1 :e "e"]]))

  (ds/q2 '[:find ?view
           :in $ %
           :where (current ?view)]
         @conn '[[(current ?view) [_ :view/current ?view]]])

  (do (set! datascript/built-ins (assoc datascript/built-ins 'subs subs))

      (ds/q '[:find ?prefix
              :in [?word ...]
              :where [(subs ?word 0 5) ?prefix]]
            ["hello" "antidisestablishmentarianism"]))

  (do (set! datascript/built-ins (assoc datascript/built-ins 'subs subs))

      (ds/q '[:find ?prefix
              :in [?word ?val]
              :where [(subs ?word 0 5) ?prefix]]
            ["hello" "vallllll"]))


  (ds/q '[:find ?k ?v :in [[?k ?v] ...] :where [(> ?v 1)]] {:a 1, :b 2, :c 3})

  (ds/q '[:find ?k ?v :in [[[?k ?v ?c]] ...] :where [(> ?v 1)]] [[[:a 1 1]] [[:b 2 2]] [[:c 3 3]]])

  (ds/q '[:find ?heads
          :with ?monster
          :in [[?monster ?heads]]]
        [["Medusa" 1]
         ["Cyclops" 1]
         ["Chimera" 1]])

  (ds/bind-in+source (first '{[[[?k ?v ?c]] ...] [[[:a 1 1]] [[:b 2 2]] [[:c 3 3]]]}))

  (ds/bind-in+source (first '{[?v ...] [:a :b :c]}))

  (ds/bind-in+source (first '{[?word ?val] ["hello" "vallllll"]}))

  (ds/bind-in+source (first '{[[?monster ?heads]] [["Medusa" 1] ["Cyclops" 1] ["Chimera" 1]]}))

  (ds/bind-in+source (first '{% [[(current ?view) [_ :view/current ?view]]]}))











  (data/get-channels @conn)

  (data/get-list-passwords @conn)

  (->> (data/get-list-passwords @conn)
       (map (fn [[id label dragging sort-index]]
              {:id          id
               :label       label
               :placeholder dragging
               :sort-index sort-index}))
       (sort-by :sort-index)
       vec)

  (-> (meta data/get-list-passwords) :index-keys-fn (apply [@conn]))

  (data/get-current-view @conn)

  )

