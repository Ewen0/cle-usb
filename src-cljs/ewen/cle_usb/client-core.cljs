(ns ewen.cle-usb.client-core
  (:require [clojure.browser.repl] ;Only for development mode. TODO find a way to make a conditional require
            [cljs.core.async :as async]
            [ewen.async-plus :as async+]
            [goog.style :as gstyle]
            [ewen.cle-usb.render :as render]
            [ewen.cle-usb.client :as client]
            [datascript :as ds]
            [ewen.cle-usb.data :as data]
            [ewen.cle-usb.math :refer [cartesian-product]]
            [loom.graph :as g]
            [loom.attr :as attr])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [ewen.async-plus.macros :as async+m]))











(defn init []
  (enable-console-print!)
  (js/React.initializeTouchEvents true))







(def app (data/load-app))



(init)

(comment






  ;client
  (client/request-render app)


  ;render
  (defn render-view [render-data load-chan]
    (render/request-render (:view render-data)
                           load-chan
                           (:data render-data)))




  ;Handle menu events
  (defmulti handle-menu-event identity)





  (defn maybe-update-pos [pwd-map id pos]
    (if (= id (:id pwd-map)) (assoc pwd-map :position pos) pwd-map))

  ;Passwords position
  (async+m/go-loop [pos-ch (data/get-pwd-pos-chan @app)]
                   (when-let [{:keys [id pos]} (async/<! pos-ch)]
                     (let [render-data (data/get-render-data @app)
                           updated-data (-> (map #(maybe-update-pos % id pos)
                                                 (:data render-data))
                                            vec)
                           render-data (assoc render-data :data updated-data)]
                       (render-view render-data (data/view-load-channel @app)))
                     (recur pos-ch)))



  (data/listen-for! app
                    :state/dragging
                    ::dragging-listener
                    #(render-view (data/get-render-data @app)
                                  (data/view-load-channel @app)))

  (data/listen-for! app
                    :state/position
                    ::position-listener
                    #(render-view (data/get-render-data @app)
                                  (data/view-load-channel @app)))

  (data/listen-for! app
                    :view/current
                    ::menu-events-listener
                    #(render-view (data/get-render-data @app)
                                  (data/view-load-channel @app)))

  (data/listen-for! app
                    :state/sort-index
                    ::sort-index-listener
                    #(render-view (data/get-render-data @app)
                                  (data/view-load-channel @app)))





  (render-view (data/get-render-data @app)
               (data/view-load-channel @app))








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
          @app)









    (time (data/get-render-data @app))


    (ds/q '[:find ?view
            :where [_ :view/current ?view]]
          @app)

    (-> (ds/empty-db) (ds/with [[:db/add 1 :e "e"]]))

    (time (ds/q2 '[:find ?view
                     :in $ %
                     :where (current ?view)]
                   @app '[[(current ?view) [_ :view/current ?view]]]))


    (do (set! datascript/built-ins (assoc datascript/built-ins 'subs subs))

        (ds/q '[:find ?prefix
                :in $ [?word ...]
                :where [(subs ?word 0 5) ?prefix]]
              @app ["hello" "antidisestablishmentarianism"]))

    (do (set! datascript/built-ins (assoc datascript/built-ins 'subs subs))

        (ds/q '[:find ?prefix
                :in [?word ?val]
                :where [(subs ?word 0 5) ?prefix]]
              ["hello" "vallllll"]))


    (ds/q '[:find ?k ?v :in [[?k ?v] ...] :where [(> ?v 1)]] {:a 1, :b 2, :c 3})

    (ds/q '[:find ?k ?v :in [[[?k ?v ?c]] ...] :where [(> ?v 1)]] [[[:a 1 1]] [[:b 2 2]] [[:c 3 3]]])

    (ds/q '[ :find ?heads
            :with ?monster
            :in   [[?monster ?heads]] ]
         [ ["Medusa" 1]
           ["Cyclops" 1]
           ["Chimera" 1] ])

    (ds/bind-in+source (first '{[[[?k ?v ?c]] ...] [[[:a 1 1]] [[:b 2 2]] [[:c 3 3]]]}))

    (ds/bind-in+source (first '{[?v ...] [:a :b :c]}))

    (ds/bind-in+source (first '{[?word ?val] ["hello" "vallllll"]}))

    (ds/bind-in+source (first '{[[?monster ?heads]] [["Medusa" 1] ["Cyclops" 1] ["Chimera" 1]]}))

    (ds/bind-in+source (first '{% [[(current ?view) [_ :view/current ?view]]]}))

    (ds/process-where '(current ?view) {:__rules '{current [[(current ?view) [_ :view/current ?view]]]}})

    (ds/bind-rule-branch '[(current ?view) [_ :view/current ?view]] '(?view) nil)

    (ds/parse-rules '[(current ?view)] {:__rules '{current [[(current ?view) (current ?view)]]}})

    (ds/wheres->branch '[[_ :view/current ?view] (current ?view)])

    (ds/rule->where-graph '(current ?view) '{current [[(current ?view) [_ :view/current ?view]]]} {})

    (ds/build-request-graph {'$ @app} '[(current ?view)] '(?view))

    (let [g (ds/build-request-graph {'$ @app} '[(current ?view)] '(?view))]
      (attr/attr g
                 (first (ds/find-rules g '{current [[(current ?view) [_ :view/current ?view]]]}))
                 :attrs))

    (:attrs (ds/expand-rules (ds/build-request-graph {'$ @app} '[(current ?view) [_ :first-branch ?tt]] '(?view))
                             '{current [[(current ?view) [_ :view/current ?view] [_ :view/current ?view2] [_ :view/current ?view3]]
                                        [(current ?view) [_ :view/other-branch ?view]]]}))










    (data/get-channels @app)
    (time (data/get-render-data @app))



    (def ggg (g/digraph))
    (def ggg (g/add-edges* ggg [[3 4] [4 5] [5 6]]))
    (def ggg2 (g/digraph))
    (def ggg2 (g/add-edges* ggg2 [[30 40] [40 50] [50 60]]))
    (def ggg3 (g/digraph))
    (def ggg3 (g/add-edges* ggg3 [[300 400] [400 500] [500 600]]))
    (g/predecessors ggg 4)
    (g/successors ggg 4)
    (attr/add-attr ggg 3 :a {:a "a"})
    (time (ds/node->branches ggg 4 [ggg2 ggg3]))


    (ds/analyze-q '[:find ?e ?e2 ?n
                 :where [?e :name "Ivan"]
                 [(-differ? :x :x)]
                 [?e :age ?a]
                 [?e2 :age ?a]
                 [?e2 :name ?n]] (ds/empty-db))

    ))

