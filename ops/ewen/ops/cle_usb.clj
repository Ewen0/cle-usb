(ns ewen.ops.cle-usb
  (:require [pallet.compute :refer [instantiate-provider]]
            [pallet.api :refer [group-spec plan-fn lift]]
            [pallet.crate.automated-admin-user :refer [automated-admin-user]]))

(def digital-ocean
  (instantiate-provider
    "node-list"
    :node-list
    ;; A list of nodes: [name group IP operating-system]
    [["ewen-server" "cle-usb" "178.62.7.182" :ubuntu]]))

(def cle-usb-group
  (group-spec
    "cle-usb"
    :phases {:bootstrap (plan-fn
                          (automated-admin-user
                            "ewen"
                            (-> (clojure.java.io/resource "ops/ewen-server.pub")
                              (.getPath))))}))

(defn execute
  [& phases]
  (apply lift
         cle-usb-group
         #_:user #_"root"
         :compute digital-ocean
         :phase phases))

