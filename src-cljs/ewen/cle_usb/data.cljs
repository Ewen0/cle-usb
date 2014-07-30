(ns ewen.cle-usb.data
  (:require [cljs.core.async :as async]
            [datascript :as ds]
            [ewen.cle-usb.memoize :refer [memoize]]
            [clojure.set :refer [union]])
  (:require-macros [ewen.cle-usb.data :refer [defquery]]))



(defprotocol IndexKeys
  (get-index-keys
    [this]
    [this a]
    [this a b]
    [this a b c]
    [this a b c d]
    [this a b c d e]
    [this a b c d e f]
    [this a b c d e f g]
    [this a b c d e f g h]
    [this a b c d e f g h i]
    [this a b c d e f g h i j]
    [this a b c d e f g h i j k]
    [this a b c d e f g h i j k l]
    [this a b c d e f g h i j k l m]
    [this a b c d e f g h i j k l m n]
    [this a b c d e f g h i j k l m n o]
    [this a b c d e f g h i j k l m n o p]
    [this a b c d e f g h i j k l m n o p q]
    [this a b c d e f g h i j k l m n o p q s]
    [this a b c d e f g h i j k l m n o p q s t]
    [this a b c d e f g h i j k l m n o p q s t rest]))


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



(defn analyze->index-keys [{:keys [index-keys calls]}]
  (let [calls-index-keys (for [[fct & params] calls]
                           (when (implements? IndexKeys fct)
                             (apply get-index-keys fct params)))]
    (apply union (conj calls-index-keys index-keys))))


(def maybe (reify
             cljs.core/IFn
             (-invoke [this db e attr if-not]
               (let [result (get (ds/entity db e) attr)]
                 (or result if-not)))
             IndexKeys
             (get-index-keys [this conn e attr if-not]
               (->> (ds/pattern->index-keys [e attr nil nil])
                    (into [conn])
                    (conj #{})))))







(defn view-load-channel [db]
  (only (ds/q '[:find ?mult
                :where
                [?id :channel/source :page-load]
                [?id :channel/mult ?mult]]
              db)))



(defquery get-list-passwords :cache true
          [data] '[:find ?id ?label ?dragging ?sort-index
                   :in $ ?maybe
                   :where [?id :password/label ?label]
                   [?id :state/dragging ?dragging]
                   [?id :state/sort-index ?sort-index]
                   [(?maybe $ ?id :password/width nil) ?width]
                   [(?maybe $ ?id :password/height nil) ?height]] data maybe)



(defquery get-passwords-dragging-metrics
          [data id] '[:find ?dragging ?width ?height
                      :in $ ?id ?maybe
                      :where
                      [?id :state/dragging ?dragging]
                      [(?maybe $ ?id :password/width nil) ?width]
                      [(?maybe $ ?id :password/height nil) ?height]]
          data id maybe)

(def get-dragging (reify
                         cljs.core/IFn
                         (-invoke [this db pwd-id]
                           (let [dragging (get (ds/entity db pwd-id) :state/dragging)]
                             (or dragging false)))
                         IndexKeys
                         (get-index-keys [this db pwd-id]
                           (->> (ds/pattern->index-keys [pwd-id :state/dragging nil nil])
                                (into [db])
                                (conj #{})))))

(def get-password-pos (reify
             cljs.core/IFn
             (-invoke [this db pwd-id]
               (get (ds/entity db pwd-id) :password/pos))
             IndexKeys
             (get-index-keys [this db pwd-id]
               (->> (ds/pattern->index-keys [pwd-id :password/pos nil nil])
                    (into [db])
                    (conj #{})))))

(defquery get-password-ids-indexes
          [data] '[:find ?id ?sort-index
                   :where [?id :password/label _]
                   [?id :state/sort-index ?sort-index]] data)


(defquery get-password-ids-indexes-pos
          [data] '[:find ?id ?sort-index ?pos
                   :where [?id :state/sort-index ?sort-index]
                   [?id :password/pos ?pos]] data)





(defn get-channels [db]
  (->> (ds/q '[:find ?source ?mult
              :where
              [?id :channel/source ?source]
              [?id :channel/mult ?mult]
              [(!= ?source :page-load)]]
            db)
       (reduce (fn [m [k v]] (merge m {(keyword k) v})) {})))


(defquery get-current-view [data]
          '[:find ?view
            :where [_ :view/current ?view]] data)


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
  (-> (ds/entity data pwd-id) :state/init-pos))



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

(defquery get-pwd-pos [data]
          '[:find ?pwd-id ?pos
            :where [?pwd-id :password/pos ?pos]] data)

(defn set-pwd-pos! [app pwd-id pos]
  (ds/transact! app [{:db/id        pwd-id
                      :password/pos pos}]))

(defn set-sort-indexes! [app sort-indexes]
  (ds/transact! app (-> (map (fn [m]
                               {:db/id (:id m)
                                :state/sort-index (:index m)
                                :state/init-pos (:pos m)})
                             sort-indexes)
                        vec)))

(defn set-pwd-label! [app pwd-id label]
  (ds/transact! app [{:db/id        pwd-id
                      :password/label label}]))











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