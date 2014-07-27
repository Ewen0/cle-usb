(ns ewen.cle-usb.client-core
  (:require [clojure.browser.repl] ;Only for development mode. TODO find a way to make a conditional require
            [cljs.core.async :as async]
            [ewen.async-plus :as async+]
            [goog.style :as gstyle]
            [ewen.cle-usb.render-raw :as render]
            [ewen.cle-usb.client :as client]
            [ewen.cle-usb.data :as data]
            [datascript :as ds])
  (:require-macros [cljs.core.async.macros :refer [go go-loop]]
                   [ewen.async-plus.macros :as async+m]))


(defn init []
  (enable-console-print!)
  (js/React.initializeTouchEvents true))







(def app (data/load-app))



(init)








;client
#_(client/request-render app)



;render
(defn render-view [render-data load-chan]
  (render/request-render app
                         (:view render-data)
                         load-chan
                         (:data render-data)))








(defn maybe-update-pos [pwd-map id pos]
  (if (= id (:id pwd-map)) (assoc pwd-map :position pos) pwd-map))

;Passwords position
#_(async+m/go-loop [pos-ch (data/get-pwd-pos-chan @app)]
                 (when-let [{:keys [id pos]} (async/<! pos-ch)]
                   (let [render-data (data/get-render-data @app)
                         updated-data (-> (map #(maybe-update-pos % id pos)
                                               (:data render-data))
                                          vec)
                         render-data (assoc render-data :data updated-data)]
                     (render-view render-data (data/view-load-channel @app)))
                   (recur pos-ch)))





(defmulti get-render-data (fn [data view] view))

(defmethod get-render-data :home [data view]
  (->> (data/get-list-passwords data)
       (map (fn [[id label dragging sort-index]]
              {:id          id
               :label       label
               :placeholder dragging
               :sort-index  sort-index}))
       (sort-by :sort-index)
       vec))

(defmethod get-render-data :new-password [data view]
  {})






(let [load-ch (data/view-load-channel @app)
      change-view-callback (fn [tx-report]
                             (let [view (->> (:tx-data tx-report)
                                             (filter :added)
                                             first
                                             :v)]
                               (render-view {:view view
                                             :data (get-render-data @app view)}
                                            load-ch)))]
  (ds/listen! app :view/current
              change-view-callback
              (data/get-index-keys data/get-current-view app)))

(comment
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
                    :state/sort-index
                    ::sort-index-listener
                    #(render-view (data/get-render-data @app)
                                  (data/view-load-channel @app))))




(let [view (-> (data/get-current-view @app) data/only)
      load-ch (data/view-load-channel @app)
      data (get-render-data @app view)]
  (render-view {:view view
                :data data}
               load-ch))








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












  (ds/q2 '[:find ?view
           :where [_ :view/current ?view]]
         @app)

  (-> (ds/empty-db) (ds/with [[:db/add 1 :e "e"]]))

  (ds/q2 '[:find ?view
           :in $ %
           :where (current ?view)]
         @app '[[(current ?view) [_ :view/current ?view]]])

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











  (data/get-channels @app)

  (data/get-list-passwords @app)

  (->> (data/get-list-passwords @app)
       (map (fn [[id label dragging sort-index]]
              {:id          id
               :label       label
               :placeholder dragging
               :sort-index sort-index}))
       (sort-by :sort-index)
       vec)

  (-> (meta data/get-list-passwords) :index-keys-fn (apply [@app]))

  (data/get-current-view @app)

  )

