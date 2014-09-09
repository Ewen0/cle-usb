(ns ewen.async-plus
  "core.async utilities to ease the use and the composition of core.async mults."
  (:refer-clojure :exclude [merge] :as core)
  (:require [cljs.core.async :as async])
  (:require-macros [cljs.core.async.macros :as asyncm]
                   [ewen.async-plus :as async+m]))



(defn map< [f mult]
  (let [ch (async/tap mult (async/chan))
        out-ch (async/map< f ch)]
    (async/mult out-ch)))

(defn filter< [pred-ch mult]
  (if (= "function" (js* "typeof ~{}" pred-ch))
    (let [ch (async/chan)]
      (asyncm/go (async/>! ch pred-ch))
      (filter< ch mult))
    (let [out-ch (async/chan)]
      (asyncm/go-loop [in-ch (async/tap mult (async/chan))
                filtered-ch (async/filter<
                              #(constantly true)
                              in-ch)]
               (async/pipe filtered-ch out-ch false)
               (when-let [pred (async/<! pred-ch)]
                 (async/untap mult in-ch)
                 (let [new-ch (async/tap mult (async/chan))]
                   (recur new-ch
                          (async/filter<
                            pred new-ch))))
               (async/untap mult in-ch)
               (async/pipe (async/tap mult (async/chan))
                           out-ch))
      (async/mult out-ch))))

(defn delay< [delay mult]
  (let [out-mult (async/mult (async/chan))]
    (async+m/go-loop [ch mult]
                     (when-let [val (async/<! ch)]
                       (js/setTimeout
                         #(async/put! (async/muxch* out-mult) val)
                         delay)
                       #_(recur ch)))
    out-mult))


(defn merge
  ([mults] (merge mults nil))
  ([mults buf-or-n]
   (let [out-chs (map #(async/tap % (async/chan)) mults)
         out-ch (async/merge out-chs buf-or-n)]
     (async/mult out-ch))))

(defn close! [mult]
  (async/close! (async/muxch* mult)))

(defn put! [mult val]
  (async/put! (async/muxch* mult) val))

(defn unique
  ([mult] (unique mult nil))
  ([mult buf-or-n]
   (let [out-ch (async/tap mult (async/chan))
         out-ch (async/unique out-ch buf-or-n)]
     (async/mult out-ch))))