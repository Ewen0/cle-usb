(ns ewen.wreak
  (:require-macros [ewen.wreak :refer [with-this]]))

(def ^:dynamic *component*)

(defn render
  [component node]
  (.renderComponent js/React component node))

(defn keyword->string [arg]
  (let [namespace (namespace arg)]
    (if namespace (str namespace "/" (name arg))
                  (name arg))))

(defn get-state [comp]
  (when-let [react-state (.-state comp)]
    (aget react-state (keyword->string ::state))))

(defn replace-state! [comp next-state]
  (.replaceState comp (js-obj (keyword->string ::state) next-state)))

(defn get-props [comp]
  (-> comp .-props (aget (keyword->string ::props))))

(defn get-statics [comp]
  (-> comp .-props (aget (keyword->string ::statics))))



(defn bind-lifecycle-method-args [[method-key method]]
  (cond (= :getInitialState method-key)
        {:getInitialState (fn [] (with-this
                                   (let [init-state (method
                                                      (get-props *component*)
                                                      (get-statics *component*))]
                                     (js-obj (keyword->string ::state) init-state))))}
        (= :getDefaultProps method-key)
        {:getDefaultProps (fn [] (with-this (method)))}
        (= :componentWillMount method-key)
        {:componentWillMount (fn []
                               (with-this
                                 (method
                                   (get-props *component*)
                                   (get-state *component*)
                                   (get-statics *component*))))}
        (= :componentDidMount method-key)
        {:componentDidMount (fn []
                              (with-this
                                (method
                                  (get-props *component*)
                                  (get-state *component*)
                                  (get-statics *component*))))}
        (= :componentWillUpdate method-key)
        {:componentWillUpdate (fn [next-props next-state]
                                (with-this
                                  (method
                                    (get-props *component*)
                                    (aget next-props (keyword->string ::props))
                                    (get-state *component*)
                                    (aget next-state (keyword->string ::state))
                                    (get-statics *component*))))}
        (= :componentDidUpdate method-key)
        {:componentDidUpdate (fn [prev-props prev-state]
                               (with-this
                                 (method
                                   (aget prev-props (keyword->string ::props))
                                   (get-props *component*)
                                   (aget prev-state (keyword->string ::state))
                                   (get-state *component*)
                                   (get-statics *component*))))}
        (= :componentWillUnmount method-key)
        {:componentWillUnmount (fn []
                                 (with-this (method
                                              (get-props *component*)
                                              (get-state *component*)
                                              (get-statics *component*))))}
        (= :componentWillReceiveProps method-key)
        {:componentWillReceiveProps (fn [next-props]
                                      (with-this (method
                                                   next-props
                                                   (get-props *component*)
                                                   (get-state *component*)
                                                   (get-statics *component*))))}
        :else {method-key method}))

(defn bind-other-method-args [[method-key method]]
  (cond (= :shouldComponentUpdate method-key)
        {:shouldComponentUpdate method}
        (= :render method-key)
        {:render (fn []
                   (with-this
                     (method
                       (get-props *component*)
                       (get-state *component*)
                       (get-statics *component*))))}
        :else {method-key method}))

(defn bind-methods-args-comp [methods-args]
  (->> (map bind-lifecycle-method-args methods-args)
       (apply merge)
       (map bind-other-method-args)
       (apply merge)))

(defn bind-methods-args-mixin [methods-args]
  (->> (map bind-lifecycle-method-args methods-args)
       (apply merge)))

(defn map->js-obj [in-map]
  (apply js-obj (mapcat (fn [[k v]] [(keyword->string k) v]) in-map)))


(defn component [name methods-map]
  (let [default-methods {:shouldComponentUpdate
                                      (fn [next-props next-state]
                                        (this-as this
                                                 (or (not= (get-state this) next-state)
                                                     (not= (get-props this) next-props))))
                         :displayName name}
        methods-map (merge default-methods methods-map)
        methods-map (bind-methods-args-comp methods-map)
        react-component (.createClass js/React (clj->js methods-map))]
    (fn [props statics react-keys]
      (react-component (->> (merge {::props props ::statics statics} react-keys)
                            map->js-obj)))))

(defn mixin [methods-map]
  (let [methods-map (bind-methods-args-mixin methods-map)]
    (map->js-obj methods-map)))
