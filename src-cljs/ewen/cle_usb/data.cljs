(ns ewen.cle-usb.data
  (:require [cljs.core.async :as async]
            [datascript :as ds]
            [ewen.cle-usb.memoize :refer [memoize]]))

(defn load-app []
  (let [conn (ds/create-conn)]
    (ds/transact! conn [{:db/id -1
                         :password/label "Password1"
                         :state/dragging false
                         :state/sort-index 0}
                        {:db/id -2
                         :password/label "Password2"
                         :state/dragging false
                         :state/sort-index 1}
                        {:db/id -3
                         :view/current :home}
                        {:db/id -4
                         :channel/source :page-load
                         :channel/mult (async/mult (async/chan))}
                        {:db/id -5
                         :channel/source :pwd-pos
                         :channel/mult (async/mult (async/chan))}])
    conn))




(defn only
  "Return the only item from a query result"
  ([query-result]
   (assert (= 1 (count query-result)))
   (assert (= 1 (count (first query-result))))
   (ffirst query-result))
  ([query-result default]
   (if (= 0 (count query-result)) default
     (only query-result))))


(defn maybe
  "Returns the value of attr for e, or if-not if e does not possess
any values for attr."
  [db e attr if-not]
  (let [result (ds/q '[:find ?v
                      :in $ ?e ?a
                      :where [?e ?a ?v]]
                    db e attr)]
    (only result if-not)))

(set! datascript/built-ins (assoc datascript/built-ins 'com.ewen.cle-usb.data/maybe maybe) )







(defn view-load-channel [db]
  (only (ds/q '[:find ?mult
                :where
                [?id :channel/source :page-load]
                [?id :channel/mult ?mult]]
              db)))

#_(defn get-list-passwords [db]
  (->> (ds/q '[:find ?id ?label ?dragging ?sort-index
               :in $
               :where [?id :password/label ?label]
               [?id :state/dragging ?dragging]
               [?id :state/sort-index ?sort-index]
               [(com.ewen.cle-usb.data/maybe $ ?id :password/width nil) ?width]
               [(com.ewen.cle-usb.data/maybe $ ?id :password/height nil) ?height]]
             db)
       (map (fn [[id label dragging sort-index]]
              {:id          id
               :label       label
               :placeholder dragging
               :sort-index sort-index}))
       (sort-by :sort-index)
       vec))

(let [list-pwd-q '[:find ?id ?label ?dragging ?sort-index
                   :in $
                   :where [?id :password/label ?label]
                   [?id :state/dragging ?dragging]
                   [?id :state/sort-index ?sort-index]
                   [(com.ewen.cle-usb.data/maybe $ ?id :password/width nil) ?width]
                   [(com.ewen.cle-usb.data/maybe $ ?id :password/height nil) ?height]]
      cached-query (atom #{})]
  (defn get-list-passwords
    ([] @cached-query)
    ([db] (swap! cached-query (ds/q list-pwd-q db))))
  (set! get-list-passwords (with-meta get-list-passwords {:index-keys-fn (fn [db] (ds/analyze-q list-pwd-q db))})))

#_(ds/analyze-q '[:find  ?e ?e2 ?n
                               :where [?e :name "Ivan"]
                                      [?e :age ?a]
                                     [?e2 :age ?a]
                                     [?e2 :name ?n]] '$)



(defn get-channels [db]
  (->> (ds/q '[:find ?source ?mult
              :where
              [?id :channel/source ?source]
              [?id :channel/mult ?mult]
              [(!= ?source :page-load)]]
            db)
       (reduce (fn [m [k v]] (merge m {(keyword k) v})) {})))

(defn get-current-view [data]
  (-> (ds/q '[:find ?view
              :where [_ :view/current ?view]]
            data)
      only))

(defn get-current-view-id [data]
  (-> (ds/q '[:find ?id
              :where [?id :view/current]]
            data)
      only))

(defn set-view! [app view]
  (let [view-id (get-current-view-id @app)]
    (ds/transact! app [{:db/id        view-id
                        :view/current view}])))

(defn set-dragging! [app pwd-id dragging]
  (ds/transact! app [{:db/id        pwd-id
                      :state/dragging dragging}]))

(defn get-dragging [data pwd-id]
  (-> (ds/q '[:find ?dragging :in $ ?pwd-id
              :where [?pwd-id :state/dragging ?dragging]]
            data pwd-id)
      (only false)))

(defn set-handle-pos! [app pwd-id pos]
  (ds/transact! app [{:db/id        pwd-id
                      :state/handle-pos pos}]))

(defn get-handle-pos [data pwd-id]
  (-> (ds/q '[:find ?pos :in $ ?pwd-id
              :where [?pwd-id :state/handle-pos ?pos]]
            data pwd-id)
      only))

(defn set-init-pos! [app pwd-id pos]
  (ds/transact! app [{:db/id        pwd-id
                      :state/init-pos pos}]))

(defn get-init-pos [data pwd-id]
  (-> (ds/q '[:find ?pos :in $ ?pwd-id
              :where [?pwd-id :state/init-pos ?pos]]
            data pwd-id)
      only))



(defn set-pwd-dims! [app pwd-id width height]
  (ds/transact! app [{:db/id        pwd-id
                      :password/width width
                      :password/height height}]))

(defn get-pwd-pos-chan [data]
  (-> (ds/q '[:find ?mult
              :where [?id :channel/source :pwd-pos]
              [?id :channel/mult ?mult]]
            data)
      only))

(defn set-sort-indexes! [app sort-indexes]
  (ds/transact! app (-> (map (fn [m]
                               {:db/id (:id m)
                                :state/sort-index (:index m)
                                :state/init-pos (:pos m)})
                             sort-indexes)
                        vec)))






;Render data
(defmulti get-render-data-mm (fn [db] (get-current-view db)))

(defmethod get-render-data :home  [db]
  {:view :home :data (get-list-passwords db)})

(defmethod get-render-data :new-password  [db]
  {:view :new-password :data {}})


(let [cached-view (atom {})]
  (defn get-render-data
    ([] @cached-view)
    ([db] (swap! cached-view (get-render-data-mm db)))))

(defn update-render-data []
  )

#_(set! get-render-data (memoize get-render-data [{}
                                                identity
                                                (fn [mem args] mem)
                                                (fn [mem args val] (reset! mem {args val}))]))









;Listeners

(defn match-id-and-attr? [datom e a]
  (and (= (:e datom) e)
       (= (:a datom) a)))

(defn match-attr? [datom a]
  (= (:a datom) a))

(defn listen-for!
  ([app attr callback-name callback]
   (ds/listen! app callback-name
               (fn [tx-report]
                 (some #(when (match-attr? % attr)
                         (callback (:e %) (:v %)))
                       (:tx-data tx-report)))))
  ([app ent-id attr callback-name callback]
   (ds/listen! app callback-name
               (fn [tx-report]
                 (some #(when (match-id-and-attr? % ent-id attr)
                         (callback (:v %)))
                       (:tx-data tx-report))))))




(comment

  (def aaa (load-app))

  (ds/listen! aaa ::ll #(.log js/console (str (map :a (reverse (:tx-data %))))))
  (ds/listen! aaa ::ll (fn [datoms] (.log js/console (some (fn [datom] (when (match-id-and-attr? datom 1 :state/init-pos)
                                                                         (:v datom)))
                                                           (reverse (:tx-data datoms))))))
  (listen-for! aaa 1 :state/init-pos ::ll #(.log js/console %))
  (ds/unlisten! aaa ::ll)

  (ds/transact! aaa [{:db/id        1
                      :state/init-pos 3}])

  )