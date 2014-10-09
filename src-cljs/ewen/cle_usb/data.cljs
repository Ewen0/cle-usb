(ns ewen.cle-usb.data
  (:require [datascript :as ds])
  (:require-macros [datascript :refer [defquery query]]))




(defn load-app []
  (let [conn (ds/create-conn)]
    (ds/transact! conn [{:db/id -1
                         :password/label "Password1"
                         :state/dragging false
                         :state/sort-index 0}
                        #_{:db/id -2
                         :password/label "Password2"
                         :state/dragging false
                         :state/sort-index 1}
                        {:db/id -3
                         :view/current :home}])
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





(def maybe (reify
             cljs.core/IFn
             (-invoke [this db e attr if-not]
               (let [result (get (ds/entity db e) attr)]
                 (or result if-not)))
             ds/IndexKeys
             (get-index-keys [this conn e attr if-not]
               (->> (ds/pattern->index-keys [e attr nil nil])
                    (into [conn])
                    (conj #{})))))










(defn get-list-passwords [data]
  (->> (ds/q '[:find ?id
               :in $
               :where [?id :password/label ?label]]
             data)
       (map first)
       set))


(defn get-password-labels [data]
  (->> (ds/q '[:find ?label
               :where [_ :password/label ?label]]
             data)
       (map first)
       set))





(defn get-new-password-id [data]
  (-> (ds/q '[:find ?id
              :where [?id :new-password/label]]
            data)
      only))




(defn set-attr!
  ([app id attr val]
   (ds/transact! app [{:db/id id
                       attr   val}]))
  ([app id attr val tx-meta]
   (ds/transact! app [{:db/id id
                       attr   val}]
                 tx-meta)))

(defn get-by-attr [db attr]
  (ds/q '[:find ?id
          :in $ ?attr
          :where [?id ?attr]]
        db attr))



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

(defn set-current-view! [app new-view]
  (let [view-id (get-current-view-id @app)]
    (set-attr! app view-id :view/current new-view)))









(defn set-pwd-label! [app pwd-id label]
  (ds/transact! app [{:db/id        pwd-id
                      :password/label label}]))

(defn get-pwd-list-id [data]
  (-> (ds/q '[:find ?id
              :where [?id :passwords-list/chan _]]
            data)
      only))

(defn get-pwd-list-chan [data]
  (-> (ds/q '[:find ?chan
              :where [?id :passwords-list/chan ?chan]]
            data)
      only))

(defn set-pwd-list-chan! [app chan]
  (ds/transact! app [{:db/id -1
                      :passwords-list/chan chan}]))


(defn retract-pwd-list-chan! [app]
  (let [id (get-pwd-list-id @app)]
    (ds/transact! app [[:db.fn/retractAttribute id :passwords-list/chan]])))











;Add / remove passwords

(defn get-ids-from [db from]
  (ds/q '[:find ?id ?index
          :in $ ?from
          :where [?id :state/sort-index ?index]
          [(>= ?index ?from)]]
        db from))

(defn update-sort-indexes-from [db from inc-or-dec]
  (let [ids-indexes (get-ids-from db from)]
    (vec (for [[id index] ids-indexes]
           {:db/id            id
            :state/sort-index (inc-or-dec index)}))))

(defn last-index [db]
  (-> (ds/q '[:find (max ?index)
              :where [_ :state/sort-index ?index]]
            db)
      only))

(defn append-password-last-position [db label]
  (let [index (+ 1 (last-index db))]
    [{:db/id -1
      :password/label label
      :state/sort-index index}]))

(defn add-password!
  ([app label]
   (ds/transact! app [[:db.fn/call append-password-last-position label]]))
  ([app label index]
   (ds/transact! app [{:db/id            -1
                       :password/label   label
                       :state/sort-index index}
                      [:db.fn/call update-sort-indexes-from index inc]])))

(defn update-sort-indexes-rem [db id]
  (let [from (-> (ds/entity db id) :state/sort-index)]
    [[:db.fn/call update-sort-indexes-from (+ from 1) dec]]))

(defn rem-password! [app id]
  (ds/transact! app [[:db.fn/retractEntity id]
                     [:db.fn/call update-sort-indexes-rem id]]))


;New password


(def get-new-pwd-label (reify
                         cljs.core/IFn
                         (-invoke [this db id]
                           (let [label (get (ds/entity db id) :new-password/label)]
                             (or label "")))
                         ds/IndexKeys
                         (get-index-keys [this db id]
                           (->> (ds/pattern->index-keys [id :new-password/label nil nil])
                                (into [db])
                                (conj #{})))))

(def get-new-pwd-value (reify
                         cljs.core/IFn
                         (-invoke [this db id]
                           (let [label (get (ds/entity db id) :new-password/value)]
                             (or label "")))
                         ds/IndexKeys
                         (get-index-keys [this db id]
                           (->> (ds/pattern->index-keys [id :new-password/value nil nil])
                                (into [db])
                                (conj #{})))))

(def get-new-pwd-button-enabled (reify
                                  cljs.core/IFn
                                  (-invoke [this db id]
                                    (let [label (get (ds/entity db id) :new-password/button-enabled)]
                                      (or label false)))
                                  ds/IndexKeys
                                  (get-index-keys [this db id]
                                    (->> (ds/pattern->index-keys [id :new-password/button-enabled nil nil])
                                         (into [db])
                                         (conj #{})))))





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