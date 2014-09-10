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
            [pallet.actions :refer [remote-file remote-directory packages] :as actions]
            [pallet.core.session :refer [*session*]]
            [pallet.config-file.format :refer [name-values]]
            [pallet.crate.upstart :as upstart]
            [pallet.crate.service :as service]
            [pallet.crate.java :as java]

            [clojure.zip :as zip]
            [clojure.data.xml :as xml]
            [clojure.data.zip.xml :as zx]

            [pallet.configure]
            [pallet.template]))


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

xml/parse



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
                                          :content (-> (clojure.java.io/resource "ops/sshd_config")
                                                       clojure.java.io/input-stream
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
                                      :content (-> (clojure.java.io/resource "ops/ufw")
                                                   clojure.java.io/input-stream
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

(defn set-public-inet-addr [zipper]
  (-> zipper
      (zx/xml1-> :interfaces :interface (zx/attr= :name "public") :inet-address)
      (zip/edit (fn [node] (assoc-in node [:attrs :value] "${jboss.bind.address:178.62.7.182}")))))

(defn set-http-port [zipper]
  (-> zipper
      (zx/xml1-> :socket-binding-group :socket-binding (zx/attr= :name "http"))
      (zip/edit (fn [node] (assoc-in node [:attrs :port] "${jboss.http.port:80}")))))

(defn set-https-port [zipper]
  (-> zipper
      (zx/xml1-> :socket-binding-group :socket-binding (zx/attr= :name "https"))
      (zip/edit (fn [node] (assoc-in node [:attrs :port] "${jboss.http.port:443}")))))

(def with-wildfly
  (server-spec
    :phases {:init4 (plan-fn
                      (remote-directory "/home/ewen/wildfly-8.1.0.Final"
                                   :url "http://download.jboss.org/wildfly/8.1.0.Final/wildfly-8.1.0.Final.tar.gz")
                      (actions/file "/home/ewen/wildfly-8.1.0.Final/standalone/tmp/auth"
                                        :owner "ewen")
                      (remote-file "/home/ewen/wildfly-8.1.0.Final/standalone/configuration/standalone.xml"
                                   :literal true
                                   :overwrite-changes true
                                   :content (-> (clojure.java.io/resource "ops/standalone.xml")
                                                clojure.java.io/input-stream
                                                (xml/parse :namespace-aware false)
                                                zip/xml-zip
                                                set-public-inet-addr
                                                zip/root
                                                zip/xml-zip
                                                set-http-port
                                                zip/root
                                                zip/xml-zip
                                                set-https-port
                                                zip/root
                                                xml/indent-str))
                      (remote-file "/etc/init/wildfly.conf"
                                   :literal true
                                   :overwrite-changes true
                                   :content (-> (clojure.java.io/resource "ops/wildfly.conf")
                                                slurp)))}))

(comment
  (-> (clojure.java.io/resource "ops/standalone.xml")
      clojure.java.io/input-stream
      (xml/parse :namespace-aware false)
      #_zip/xml-zip
      #_(zx/xml1-> :socket-binding-group :socket-binding (zx/attr= :name "https")))

  "<?xml version=\"1.0\" encoding=\"UTF-8\"?><server>\n  <extensions>\n    <extension module=\"org.jboss.as.clustering.infinispan\"/>\n    <extension module=\"org.jboss.as.connector\"/>\n    <extension module=\"org.jboss.as.deployment-scanner\"/>\n    <extension module=\"org.jboss.as.ee\"/>\n    <extension module=\"org.jboss.as.ejb3\"/>\n    <extension module=\"org.jboss.as.jaxrs\"/>\n    <extension module=\"org.jboss.as.jdr\"/>\n    <extension module=\"org.jboss.as.jmx\"/>\n    <extension module=\"org.jboss.as.jpa\"/>\n    <extension module=\"org.jboss.as.jsf\"/>\n    <extension module=\"org.jboss.as.logging\"/>\n    <extension module=\"org.jboss.as.mail\"/>\n    <extension module=\"org.jboss.as.naming\"/>\n    <extension module=\"org.jboss.as.pojo\"/>\n    <extension module=\"org.jboss.as.remoting\"/>\n    <extension module=\"org.jboss.as.sar\"/>\n    <extension module=\"org.jboss.as.security\"/>\n    <extension module=\"org.jboss.as.transactions\"/>\n    <extension module=\"org.jboss.as.webservices\"/>\n    <extension module=\"org.jboss.as.weld\"/>\n    <extension module=\"org.wildfly.extension.batch\"/>\n    <extension module=\"org.wildfly.extension.io\"/>\n    <extension module=\"org.wildfly.extension.undertow\"/>\n  </extensions>\n  <management>\n    <security-realms>\n      <security-realm name=\"ManagementRealm\">\n        <authentication>\n          <local default-user=\"$local\" skip-group-loading=\"true\"/>\n          <properties path=\"mgmt-users.properties\" relative-to=\"jboss.server.config.dir\"/>\n        </authentication>\n        <authorization map-groups-to-roles=\"false\">\n          <properties path=\"mgmt-groups.properties\" relative-to=\"jboss.server.config.dir\"/>\n        </authorization>\n      </security-realm>\n      <security-realm name=\"ApplicationRealm\">\n        <authentication>\n          <local default-user=\"$local\" allowed-users=\"*\" skip-group-loading=\"true\"/>\n          <properties path=\"application-users.properties\" relative-to=\"jboss.server.config.dir\"/>\n        </authentication>\n        <authorization>\n          <properties path=\"application-roles.properties\" relative-to=\"jboss.server.config.dir\"/>\n        </authorization>\n      </security-realm>\n    </security-realms>\n    <audit-log>\n      <formatters>\n        <json-formatter name=\"json-formatter\"/>\n      </formatters>\n      <handlers>\n        <file-handler name=\"file\" formatter=\"json-formatter\" relative-to=\"jboss.server.data.dir\" path=\"audit-log.log\"/>\n      </handlers>\n      <logger log-boot=\"true\" log-read-only=\"false\" enabled=\"false\">\n        <handlers>\n          <handler name=\"file\"/>\n        </handlers>\n      </logger>\n    </audit-log>\n    <management-interfaces>\n      <http-interface security-realm=\"ManagementRealm\" http-upgrade-enabled=\"true\">\n        <socket-binding http=\"management-http\"/>\n      </http-interface>\n    </management-interfaces>\n    <access-control provider=\"simple\">\n      <role-mapping>\n        <role name=\"SuperUser\">\n          <include>\n            <user name=\"$local\"/>\n          </include>\n        </role>\n      </role-mapping>\n    </access-control>\n  </management>\n  <profile>\n    <subsystem>\n      <console-handler name=\"CONSOLE\">\n        <level name=\"INFO\"/>\n        <formatter>\n          <named-formatter name=\"COLOR-PATTERN\"/>\n        </formatter>\n      </console-handler>\n      <periodic-rotating-file-handler name=\"FILE\" autoflush=\"true\">\n        <formatter>\n          <named-formatter name=\"PATTERN\"/>\n        </formatter>\n        <file relative-to=\"jboss.server.log.dir\" path=\"server.log\"/>\n        <suffix value=\".yyyy-MM-dd\"/>\n        <append value=\"true\"/>\n      </periodic-rotating-file-handler>\n      <logger category=\"com.arjuna\">\n        <level name=\"WARN\"/>\n      </logger>\n      <logger category=\"org.apache.tomcat.util.modeler\">\n        <level name=\"WARN\"/>\n      </logger>\n      <logger category=\"org.jboss.as.config\">\n        <level name=\"DEBUG\"/>\n      </logger>\n      <logger category=\"sun.rmi\">\n        <level name=\"WARN\"/>\n      </logger>\n      <logger category=\"jacorb\">\n        <level name=\"WARN\"/>\n      </logger>\n      <logger category=\"jacorb.config\">\n        <level name=\"ERROR\"/>\n      </logger>\n      <root-logger>\n        <level name=\"INFO\"/>\n        <handlers>\n          <handler name=\"CONSOLE\"/>\n          <handler name=\"FILE\"/>\n        </handlers>\n      </root-logger>\n      <formatter name=\"PATTERN\">\n        <pattern-formatter pattern=\"%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p [%c] (%t) %s%E%n\"/>\n      </formatter>\n      <formatter name=\"COLOR-PATTERN\">\n        <pattern-formatter pattern=\"%K{level}%d{HH:mm:ss,SSS} %-5p [%c] (%t) %s%E%n\"/>\n      </formatter>\n    </subsystem>\n    <subsystem>\n      <job-repository>\n        <in-memory/>\n      </job-repository>\n      <thread-pool>\n        <max-threads count=\"10\"/>\n        <keepalive-time time=\"30\" unit=\"seconds\"/>\n      </thread-pool>\n    </subsystem>\n    <subsystem>\n      <datasources>\n        <datasource jndi-name=\"java:jboss/datasources/ExampleDS\" pool-name=\"ExampleDS\" enabled=\"true\" use-java-context=\"true\">\n          <connection-url>jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE</connection-url>\n          <driver>h2</driver>\n          <security>\n            <user-name>sa</user-name>\n            <password>sa</password>\n          </security>\n        </datasource>\n        <drivers>\n          <driver name=\"h2\" module=\"com.h2database.h2\">\n            <xa-datasource-class>org.h2.jdbcx.JdbcDataSource</xa-datasource-class>\n          </driver>\n        </drivers>\n      </datasources>\n    </subsystem>\n    <subsystem>\n      <deployment-scanner path=\"deployments\" relative-to=\"jboss.server.base.dir\" scan-interval=\"5000\" runtime-failure-causes-rollback=\"${jboss.deployment.scanner.rollback.on.failure:false}\"/>\n    </subsystem>\n    <subsystem>\n      <spec-descriptor-property-replacement>false</spec-descriptor-property-replacement>\n      <concurrent>\n        <context-services>\n          <context-service name=\"default\" jndi-name=\"java:jboss/ee/concurrency/context/default\" use-transaction-setup-provider=\"true\"/>\n        </context-services>\n        <managed-executor-services>\n          <managed-executor-service name=\"default\" jndi-name=\"java:jboss/ee/concurrency/executor/default\" context-service=\"default\" hung-task-threshold=\"60000\" core-threads=\"5\" max-threads=\"25\" keepalive-time=\"5000\"/>\n        </managed-executor-services>\n        <managed-scheduled-executor-services>\n          <managed-scheduled-executor-service name=\"default\" jndi-name=\"java:jboss/ee/concurrency/scheduler/default\" context-service=\"default\" hung-task-threshold=\"60000\" core-threads=\"2\" keepalive-time=\"3000\"/>\n        </managed-scheduled-executor-services>\n        <managed-thread-factories>\n          <managed-thread-factory name=\"default\" jndi-name=\"java:jboss/ee/concurrency/factory/default\" context-service=\"default\"/>\n        </managed-thread-factories>\n      </concurrent>\n      <default-bindings context-service=\"java:jboss/ee/concurrency/context/default\" datasource=\"java:jboss/datasources/ExampleDS\" jms-connection-factory=\"java:jboss/DefaultJMSConnectionFactory\" managed-executor-service=\"java:jboss/ee/concurrency/executor/default\" managed-scheduled-executor-service=\"java:jboss/ee/concurrency/scheduler/default\" managed-thread-factory=\"java:jboss/ee/concurrency/factory/default\"/>\n    </subsystem>\n    <subsystem>\n      <session-bean>\n        <stateful default-access-timeout=\"5000\" cache-ref=\"simple\" passivation-disabled-cache-ref=\"simple\"/>\n        <singleton default-access-timeout=\"5000\"/>\n      </session-bean>\n      <pools>\n        <bean-instance-pools>\n          <strict-max-pool name=\"slsb-strict-max-pool\" max-pool-size=\"20\" instance-acquisition-timeout=\"5\" instance-acquisition-timeout-unit=\"MINUTES\"/>\n          <strict-max-pool name=\"mdb-strict-max-pool\" max-pool-size=\"20\" instance-acquisition-timeout=\"5\" instance-acquisition-timeout-unit=\"MINUTES\"/>\n        </bean-instance-pools>\n      </pools>\n      <caches>\n        <cache name=\"simple\"/>\n        <cache name=\"distributable\" aliases=\"passivating clustered\" passivation-store-ref=\"infinispan\"/>\n      </caches>\n      <passivation-stores>\n        <passivation-store name=\"infinispan\" cache-container=\"ejb\" max-size=\"10000\"/>\n      </passivation-stores>\n      <async thread-pool-name=\"default\"/>\n      <timer-service thread-pool-name=\"default\" default-data-store=\"default-file-store\">\n        <data-stores>\n          <file-data-store name=\"default-file-store\" path=\"timer-service-data\" relative-to=\"jboss.server.data.dir\"/>\n        </data-stores>\n      </timer-service>\n      <remote connector-ref=\"http-remoting-connector\" thread-pool-name=\"default\"/>\n      <thread-pools>\n        <thread-pool name=\"default\">\n          <max-threads count=\"10\"/>\n          <keepalive-time time=\"100\" unit=\"milliseconds\"/>\n        </thread-pool>\n      </thread-pools>\n      <default-security-domain value=\"other\"/>\n      <default-missing-method-permissions-deny-access value=\"true\"/>\n    </subsystem>\n    <subsystem>\n      <worker name=\"default\"/>\n      <buffer-pool name=\"default\"/>\n    </subsystem>\n    <subsystem>\n      <cache-container name=\"web\" default-cache=\"passivation\" module=\"org.wildfly.clustering.web.infinispan\">\n        <local-cache name=\"passivation\" batching=\"true\">\n          <file-store passivation=\"true\" purge=\"false\"/>\n        </local-cache>\n        <local-cache name=\"persistent\" batching=\"true\">\n          <file-store passivation=\"false\" purge=\"false\"/>\n        </local-cache>\n      </cache-container>\n      <cache-container name=\"ejb\" aliases=\"sfsb\" default-cache=\"passivation\" module=\"org.wildfly.clustering.ejb.infinispan\">\n        <local-cache name=\"passivation\" batching=\"true\">\n          <file-store passivation=\"true\" purge=\"false\"/>\n        </local-cache>\n        <local-cache name=\"persistent\" batching=\"true\">\n          <file-store passivation=\"false\" purge=\"false\"/>\n        </local-cache>\n      </cache-container>\n      <cache-container name=\"hibernate\" default-cache=\"local-query\" module=\"org.hibernate\">\n        <local-cache name=\"entity\">\n          <transaction mode=\"NON_XA\"/>\n          <eviction strategy=\"LRU\" max-entries=\"10000\"/>\n          <expiration max-idle=\"100000\"/>\n        </local-cache>\n        <local-cache name=\"local-query\">\n          <transaction mode=\"NONE\"/>\n          <eviction strategy=\"LRU\" max-entries=\"10000\"/>\n          <expiration max-idle=\"100000\"/>\n        </local-cache>\n        <local-cache name=\"timestamps\">\n          <transaction mode=\"NONE\"/>\n          <eviction strategy=\"NONE\"/>\n        </local-cache>\n      </cache-container>\n    </subsystem>\n    <subsystem/>\n    <subsystem>\n      <archive-validation enabled=\"true\" fail-on-error=\"true\" fail-on-warn=\"false\"/>\n      <bean-validation enabled=\"true\"/>\n      <default-workmanager>\n        <short-running-threads>\n          <core-threads count=\"50\"/>\n          <queue-length count=\"50\"/>\n          <max-threads count=\"50\"/>\n          <keepalive-time time=\"10\" unit=\"seconds\"/>\n        </short-running-threads>\n        <long-running-threads>\n          <core-threads count=\"50\"/>\n          <queue-length count=\"50\"/>\n          <max-threads count=\"50\"/>\n          <keepalive-time time=\"10\" unit=\"seconds\"/>\n        </long-running-threads>\n      </default-workmanager>\n      <cached-connection-manager/>\n    </subsystem>\n    <subsystem/>\n    <subsystem>\n      <expose-resolved-model/>\n      <expose-expression-model/>\n      <remoting-connector/>\n    </subsystem>\n    <subsystem>\n      <jpa default-datasource=\"\" default-extended-persistence-inheritance=\"DEEP\"/>\n    </subsystem>\n    <subsystem/>\n    <subsystem>\n      <mail-session name=\"default\" jndi-name=\"java:jboss/mail/Default\">\n        <smtp-server outbound-socket-binding-ref=\"mail-smtp\"/>\n      </mail-session>\n    </subsystem>\n    <subsystem>\n      <remote-naming/>\n    </subsystem>\n    <subsystem/>\n    <subsystem>\n      <endpoint worker=\"default\"/>\n      <http-connector name=\"http-remoting-connector\" connector-ref=\"default\" security-realm=\"ApplicationRealm\"/>\n    </subsystem>\n    <subsystem/>\n    <subsystem/>\n    <subsystem>\n      <security-domains>\n        <security-domain name=\"other\" cache-type=\"default\">\n          <authentication>\n            <login-module code=\"Remoting\" flag=\"optional\">\n              <module-option name=\"password-stacking\" value=\"useFirstPass\"/>\n            </login-module>\n            <login-module code=\"RealmDirect\" flag=\"required\">\n              <module-option name=\"password-stacking\" value=\"useFirstPass\"/>\n            </login-module>\n          </authentication>\n        </security-domain>\n        <security-domain name=\"jboss-web-policy\" cache-type=\"default\">\n          <authorization>\n            <policy-module code=\"Delegating\" flag=\"required\"/>\n          </authorization>\n        </security-domain>\n        <security-domain name=\"jboss-ejb-policy\" cache-type=\"default\">\n          <authorization>\n            <policy-module code=\"Delegating\" flag=\"required\"/>\n          </authorization>\n        </security-domain>\n      </security-domains>\n    </subsystem>\n    <subsystem>\n      <core-environment>\n        <process-id>\n          <uuid/>\n        </process-id>\n      </core-environment>\n      <recovery-environment socket-binding=\"txn-recovery-environment\" status-socket-binding=\"txn-status-manager\"/>\n    </subsystem>\n    <subsystem>\n      <buffer-cache name=\"default\"/>\n      <server name=\"default-server\">\n        <http-listener name=\"default\" socket-binding=\"http\"/>\n        <host name=\"default-host\" alias=\"localhost\">\n          <location name=\"/\" handler=\"welcome-content\"/>\n          <filter-ref name=\"server-header\"/>\n          <filter-ref name=\"x-powered-by-header\"/>\n        </host>\n      </server>\n      <servlet-container name=\"default\">\n        <jsp-config/>\n      </servlet-container>\n      <handlers>\n        <file name=\"welcome-content\" path=\"${jboss.home.dir}/welcome-content\"/>\n      </handlers>\n      <filters>\n        <response-header name=\"server-header\" header-name=\"Server\" header-value=\"WildFly/8\"/>\n        <response-header name=\"x-powered-by-header\" header-name=\"X-Powered-By\" header-value=\"Undertow/1\"/>\n      </filters>\n    </subsystem>\n    <subsystem>\n      <wsdl-host>${jboss.bind.address:127.0.0.1}</wsdl-host>\n      <endpoint-config name=\"Standard-Endpoint-Config\"/>\n      <endpoint-config name=\"Recording-Endpoint-Config\">\n        <pre-handler-chain name=\"recording-handlers\" protocol-bindings=\"##SOAP11_HTTP ##SOAP11_HTTP_MTOM ##SOAP12_HTTP ##SOAP12_HTTP_MTOM\">\n          <handler name=\"RecordingHandler\" class=\"org.jboss.ws.common.invocation.RecordingServerHandler\"/>\n        </pre-handler-chain>\n      </endpoint-config>\n      <client-config name=\"Standard-Client-Config\"/>\n    </subsystem>\n    <subsystem/>\n  </profile>\n  <interfaces>\n    <interface name=\"management\">\n      <inet-address value=\"${jboss.bind.address.management:127.0.0.1}\"/>\n    </interface>\n    <interface name=\"public\">\n      <inet-address value=\"${jboss.bind.address:127.0.0.1}\"/>\n    </interface>\n    <interface name=\"unsecure\">\n      <inet-address value=\"${jboss.bind.address.unsecure:127.0.0.1}\"/>\n    </interface>\n  </interfaces>\n  <socket-binding-group name=\"standard-sockets\" default-interface=\"public\" port-offset=\"${jboss.socket.binding.port-offset:0}\">\n    <socket-binding name=\"management-http\" interface=\"management\" port=\"${jboss.management.http.port:9990}\"/>\n    <socket-binding name=\"management-https\" interface=\"management\" port=\"${jboss.management.https.port:9993}\"/>\n    <socket-binding name=\"ajp\" port=\"${jboss.ajp.port:8009}\"/>\n    <socket-binding name=\"http\" port=\"${jboss.http.port:8080}\"/>\n    <socket-binding name=\"https\" port=\"${jboss.https.port:8443}\"/>\n    <socket-binding name=\"txn-recovery-environment\" port=\"4712\"/>\n    <socket-binding name=\"txn-status-manager\" port=\"4713\"/>\n    <outbound-socket-binding name=\"mail-smtp\">\n      <remote-destination host=\"localhost\" port=\"25\"/>\n    </outbound-socket-binding>\n  </socket-binding-group>\n</server>\n"




  )


(def cle-usb-group
  (group-spec
    "cle-usb"
    :extends [(upstart/server-spec {}) with-ewen with-config-ssh with-ufw
              (java/server-spec {:vendor :oracle
                                 :components :jre
                                 :version [7]})
              with-wildfly]))

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

  (with-admin-user
    (make-user "ewen"
               :private-key-path "~/.ssh/ewen-server"
               :public-key-path "~/.ssh/ewen-server.pub")
    (def s (execute :init4)))




  "This is not a bug, edit modules/sun/jdk/main/module.xml and add a path to paths."

"<path name=\"com/sun/net/httpserver\"/>"




"<host name=\"default-host\" alias=\"localhost\" default-web-module=\"name-of-your.war\" />"


)

