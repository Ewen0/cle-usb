(ns ewen.ops.cle-usb
  (:require [pallet.compute :refer [instantiate-provider]]
            [pallet.compute.node-list :refer [make-node]]
            [pallet.configure :refer [defpallet]]
            [pallet.environment :refer [get-environment]]
            [pallet.node :as node]
            [pallet.api :refer [group-spec plan-fn lift
                                make-user with-admin-user]]
            [pallet.crate.automated-admin-user :refer [automated-admin-user]]
            [pallet.repl :refer [explain-session explain-plan explain-phase]]))




(def digital-ocean
  (instantiate-provider
    "node-list"
    :node-list
    ;; A list of nodes: [name group IP operating-system]
    [["ewen-server" "cle-usb" "178.62.7.182" :ubuntu]
     #_(make-node "ewen-server" "cle-usb" "178.62.7.182" :ubuntu :os-version "14.04"
     #_:proxy #_{:host "10.24.219.17" :port 3128})]))

(def cle-usb-group
  (group-spec
    "cle-usb"
    :phases {:bootstrap (plan-fn
                          (automated-admin-user
                            "ewen"
                            (-> (clojure.java.io/resource "ops/ewen-server.ppk")
                              (.getPath))))}))

(defn execute
  [phase]
  (lift
    cle-usb-group
    #_:user #_"root"
    :compute digital-ocean
    :phase phase
    :timeout-ms 10000))

(comment
  (with-admin-user
    (make-user "root"
               :private-key-path "~/.ssh/ewen-server"
               :public-key-path "~/.ssh/ewen-server.pub")
    (def s (execute :bootstrap)))
  )

