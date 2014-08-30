(ns ewen.ops.cle-usb
  (:require [pallet.compute :refer [instantiate-provider]]
            [pallet.compute.node-list :refer [make-node]]
            [pallet.configure :refer [defpallet]]
            [pallet.environment :refer [get-environment]]
            [pallet.node :as node]
            [pallet.api :refer [group-spec plan-fn lift
                                make-user with-admin-user
                                server-spec]]
            [pallet.crate.automated-admin-user :refer [automated-admin-user]]
            [pallet.repl :refer [explain-session explain-plan explain-phase]]
            [pallet.actions :refer [remote-file packages] :as actions]
            [pallet.core.session :refer [*session*]]
            [pallet.config-file.format :refer [name-values]]
            [pallet.crate.upstart :as upstart]
            [pallet.crate.service :as service]
            [pallet.crate.java :as java]

            [pallet.configure]
            [pallet.template]))


(defn get-resource-as-stream [path]
  (.getResourceAsStream (clojure.lang.RT/baseLoader) (str path)))

(defn read-ssh-config [in]
  (with-open [rdr (clojure.java.io/reader in)]
    (let [m-conf (transient [])]
      (doseq [line (line-seq rdr)]
        (let [[k v] (-> line
                        clojure.string/trim
                        (.replaceAll "[^\\S\\r\\n]+" " ")   ;replace tabs or spaces by a single space
                        (clojure.string/split #"#" 2)
                        first
                        (clojure.string/split #" " 2))]
          (when (and k (not (= ""  k)))
            (conj! m-conf [(keyword k) v]))))
      (persistent! m-conf))))

(defn read-ufw-config [in]
  (with-open [rdr (clojure.java.io/reader in)]
    (let [m-conf (transient [])]
      (doseq [line (line-seq rdr)]
        (let [[k v] (-> line
                        clojure.string/trim
                        (.replaceAll "[^\\S\\r\\n]+" " ")   ;replace tabs or spaces by a single space
                        (clojure.string/split #"#" 2)
                        first
                        (clojure.string/split #"=" 2))]
          (when (and k (not (= ""  k)))
            (conj! m-conf [(keyword k) v]))))
      (persistent! m-conf))))



(defn dissoc-config [conf in-k]
  (let [updated-conf (transient [])]
    (doseq [[k v] conf]
      (when (not= k in-k)
        (conj! updated-conf [k v])))
    (persistent! updated-conf)))


(def digital-ocean
  (instantiate-provider
    "node-list"
    :node-list
    ;; A list of nodes: [name group IP operating-system]
    [(make-node "ewen-server" "cle-usb" "178.62.7.182" :ubuntu :ssh-port 54072)]))

(def with-ewen
  (server-spec
    :phases {:init (plan-fn (automated-admin-user
                              "ewen"
                              (-> (clojure.java.io/resource "ops/ewen-server.pub")
                                  (.getPath))))}))



(defn customize-ssh [ssh-conf]
  (-> ssh-conf
      (dissoc-config :Port)
      (conj [:Port 54072])
      (dissoc-config :PermitRootLogin)
      (conj [:PermitRootLogin "no"])
      (dissoc-config :AllowUsers)
      (conj [:AllowUsers "ewen"])))

(def with-config-ssh
  (server-spec
    :phases {:init2 (plan-fn (remote-file "/etc/ssh/sshd_config"
                                          :literal true
                                          :overwrite-changes true
                                          :content (-> (get-resource-as-stream "ops/sshd_config")
                                                      read-ssh-config
                                                      customize-ssh
                                                      name-values))
                             (service/service {:service-name "ssh" :supervisor :upstart}
                                              {:action :restart}))}))

(defn customize-ufw [ufw-conf]
  (-> ufw-conf
      (dissoc-config :IPV6)
      (conj [:IPV6 "yes"])))

(def with-ufw
  (server-spec
    :phases {:init3 (plan-fn
                         (packages :aptitude ["ufw"])
                         (remote-file "/etc/default/ufw"
                                      :literal true
                                      :overwrite-changes true
                                      :content (-> (get-resource-as-stream "ops/ufw")
                                                   read-ufw-config
                                                   customize-ufw
                                                   (name-values :separator "=")))
                         (actions/exec-script "ufw default deny incoming")
                         (actions/exec-script "ufw default allow outgoing")
                         (actions/exec-script "ufw allow ssh")
                         (actions/exec-script "ufw allow 54072/tcp")
                         (actions/exec-script "ufw delete allow 22")
                         (actions/exec-script "ufw allow www")
                         (actions/exec-script "ufw allow 80/tcp")
                         (actions/exec-script "ufw disable")
                         (actions/exec-script "ufw -f enable"))}))


(def cle-usb-group
  (group-spec
    "cle-usb"
    :extends [(upstart/server-spec {}) with-ewen with-config-ssh with-ufw
              (java/server-spec {:vendor :oracle
                                 :components :jre
                                 :version [7]})]))

(defn execute
  [phase]
  (lift
    cle-usb-group
    :compute digital-ocean
    :phase phase
    :timeout-ms 50000))

(comment
  (with-admin-user
    (make-user "root"
               :private-key-path "~/.ssh/ewen-server"
               :public-key-path "~/.ssh/ewen-server.pub")
    (def s (execute)))

  (with-admin-user
    (make-user "root"
               :private-key-path "~/.ssh/ewen-server"
               :public-key-path "~/.ssh/ewen-server.pub")
    (def s (execute :init)))

  (with-admin-user
    (make-user "ewen"
               :private-key-path "~/.ssh/ewen-server"
               :public-key-path "~/.ssh/ewen-server.pub")
    (def s (execute :init2)))

  (with-admin-user
    (make-user "ewen"
               :private-key-path "~/.ssh/ewen-server"
               :public-key-path "~/.ssh/ewen-server.pub")
    (def s (execute :init3)))

  (with-admin-user
    (make-user "ewen"
               :private-key-path "~/.ssh/ewen-server"
               :public-key-path "~/.ssh/ewen-server.pub")
    (def s (execute :install)))
  )

