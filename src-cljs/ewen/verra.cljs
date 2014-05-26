(ns ewen.verra
  (:require [datascript :as ds])
  (:require-macros [ewen.verra :refer [with-this]]))

(def ^:dynamic *conn*)
(def ^:dynamic *component*)


(defprotocol Component
  (react-component [this])
  (with-mixins [this mixins]))

(def maybe-fn (fnil identity identity))

(defn maybe-fn
  ([f] (if (nil? f) identity f))
  ([f else-f] (if (nil? f) else-f f)))

#_(defn maybe-update-in [m keys f & args]
  (if (get-in m keys)
    (apply (partial update-in m keys f) args)
    m))

(defn get-state [comp]
  (when-let [react-state (.-state comp)]
    (aget react-state (str ::state))))

(defn id->component [db id]
  (:react/component (ds/entity db id)))

(defn get-id [comp]
  (aget (.-props comp) (str ::component-id)))

;TODO Is it still used?
(defn- set-react-state! [comp next-state]
  (.replaceState comp (->> (merge (get-state comp) next-state)
                           (js-obj (str ::state)))))

;TODO is it still used?
(defn- replace-react-state! [comp next-state]
  (.replaceState comp (js-obj (str ::state) next-state)))

(defn replace-attributes [db entid user-attrs]
  (let [entity (ds/entity db entid)
        attrs (->> (keys user-attrs)
                   (cons :db/id)
                   (cons :react/component)
                   (cons :react/name))
        attrs-to-remove (vec (clojure.set/difference
                               (set (keys entity))
                               (set attrs)))
        add-datoms (map (fn [[k v]] [:db/add entid (keyword "react-state" (name k)) v]) user-attrs)
        retract-datoms (map (fn [k] [:db.fn/retractAttribute entid k]) attrs-to-remove)]
    (vec (concat retract-datoms add-datoms))))

(defn replace-state! [comp next-state]
  (ds/transact! *conn*
                [[:db.fn/call replace-attributes (get-id comp) next-state]]))

(defn add-attributes [db entid user-attrs]
  (vec (map (fn [[k v]] [:db/add entid (keyword "react-state" (name k)) v]) user-attrs)))

(defn set-state! [comp next-state]
  (ds/transact! *conn*
                [[:db.fn/call add-attributes (get-id comp) next-state]]))

(defn update-replacement-maps [[add-map rem-map] d]
  (cond (and (= "react-state" (namespace (:a d))) (:added d))
        [(assoc add-map (-> (:a d) name keyword) (:v d)) rem-map]
        (and (= "react-state" (namespace (:a d))) (not (:added d)))
        [add-map (assoc rem-map (-> (:a d) name keyword) (:v d))]
        :else [add-map rem-map]))


;TODO What if the same attribute for the same entity is added/removed in the same transaction? How datomic handles this? How datascript handles this?
;TODO At the moment, we suppose that an entity with a "react-state" attribute is a react component.
(defn replacement-maps [datoms]
  (reduce (fn [ent-rep-maps datom]
            (let [id (:e datom)
                  rep-maps (get ent-rep-maps id [{} {}])
                  updated-rep-maps (update-replacement-maps rep-maps datom)
                  empty-maps? (fn [[add-map rem-map]]
                                (and (empty? add-map)
                                     (empty? rem-map)))]
              (if (empty-maps? updated-rep-maps)
                ent-rep-maps
                (assoc ent-rep-maps id updated-rep-maps))))
          {}
          datoms))

(defn listen-state! [comp [add-map rem-map]]
  (if (empty? rem-map)
    (set-react-state! comp add-map)
    (let [comp-state (get-state comp)
          comp-state-rem (apply dissoc comp-state (keys rem-map))
          comp-state-replacement (merge comp-state-rem add-map)]
      (replace-react-state! comp comp-state-replacement))))


(defn listen-states! [new-db datoms]
  (.log js/console (str datoms))
  (doseq [[id [add-map rem-map]] (replacement-maps datoms)]
    (listen-state! (id->component new-db id) [add-map rem-map])))



(defn specify-common-method [[method-key method] component-name]
  (cond (= :getDefaultProps method-key)
        {:getDefaultProps (fn [] (with-this (let [id (-> (ds/transact!
                                                           *conn*
                                                           [{:db/id      -1
                                                             :react/name component-name
                                                             :react/component *component*}])
                                                         :tempids
                                                         (get -1))]
                                              (clj->js (merge (method) {(str ::component-id) id})))))}
        (= :componentWillUnmount method-key)
        {:componentWillUnmount (fn [] (with-this (method)
                                                 (ds/transact!
                                                   *conn*
                                                   [[:db.fn/retractEntity (get-id *component*)]])))}
        (= :getInitialState method-key)
        {:getInitialState (fn [] (with-this
                                   (let [id (aget (.-props *component*)
                                                  (str ::component-id))
                                          initial-state (method)
                                          build-datom (fn [[k v]] {:db/id id
                                                                    (keyword "react-state" (name k)) v})
                                          transaction-datoms (vec (map build-datom initial-state))]
                                     (ds/transact! *conn* transaction-datoms)
                                     (js-obj (str ::state) initial-state))))}
        :else {method-key method}))

(defn specify-user-method [[method-key method]]
  (cond (= :should-component-update method-key)
        {:shouldComponentUpdate (with-this method)}
        (= :render method-key)
        {:render (fn []
                   (with-this
                     (method
                       (-> *component* .-props .-value)
                       (get-state *component*))))}
        (= :get-initial-state method-key)
        {:getInitialState method}                               ;Don't convert to js obj because it will be converted by specify-common-method
        (= :get-default-props method)                       ;Don't convert to js obj because it will be converted by specify-common-method
        {:getDefaultProps method-key}  ;with-this handled when adding common-methods
        (= :component-will-mount method)
        {:componentWillMount (fn []
                               (with-this
                                        (method
                                          (get-state *component*))))}
        (= :component-did-mount method-key)
        {:componentDidMount (fn []
                              (with-this
                                       (method
                                         (get-state *component*))))}
        (= :component-will-update method-key)
        {:componentWillUpdate (fn [next-props next-state]
                                (with-this
                                         (method
                                           (.-value next-props) next-state)))}
        (= :component-did-update method-key)
        {:componentDidUpdate (fn [prev-props prev-state]
                               (with-this
                                        (method
                                          (.-value prev-props) prev-state)))}
        (= :component-will-unmount method-key)
        {:componentWillUnmount (fn []                       ;with-this handled when adding common-methods
                                 (method
                                   (get-state *component*)))}))

(defn specify-common-methods [methods-map name]
  (let [methods-map (-> methods-map
                        (update-in [:getDefaultProps] #(maybe-fn % (constantly nil)))
                        (update-in [:componentWillUnmount] #(maybe-fn % (constantly nil))))]
    (apply merge (map #(specify-common-method % name) methods-map))))

(defn specify-user-methods [methods-map]
  (apply merge (map specify-user-method methods-map)))

(defn component [methods-map name]
  (let [default-methods {:shouldComponentUpdate (fn [next-props next-state]
                                                  (this-as this
                                                           (not= (aget (.-props this) "value")
                                                                 (aget next-props "value"))
                                                           (not= (get-state this) next-state)))
                         :displayName name}
        methods-map (-> (specify-user-methods methods-map)
                        (merge default-methods)
                        (specify-common-methods name))
        react-component (.createClass js/React (clj->js methods-map))]
    (reify
      IFn
      (-invoke
        [this]
        (react-component))
      (-invoke
        [this value]
        (react-component (js-obj "value" value)))
      ;TODO Forbid :value and key in props
      (-invoke [this value props]
        (let [args (clj->js props)
              _ (aset args "value" value)]
          (react-component args)))
      ICloneable
      (-clone [this] (component react-component))
      Component
      (react-component [this]
        react-component)
      (with-mixins [this mixins]
        nil))))


;TODO How should we handle the listening of tx-data comming from an init-state method call? At the moment, the callback function overrides the initial state.
(defn render [component node conn]
  (binding [*conn* conn]
    (ds/listen! conn ::update-callback
                #(listen-states! (:db-after %) (:tx-data %)))
    (.renderComponent js/React component node)))


(comment

  (component {:render (fn [value] "e")})

  )




