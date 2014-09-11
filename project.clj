(defproject ewen/cle-usb "0.1.0-SNAPSHOT"
            :description "cle-usb"
            :license {:name "Eclipse Public License"
                      :url "http://www.eclipse.org/legal/epl-v10.html"}
            :min-lein-version "2.0.0"
            :source-paths ["src" "src-cljs"]
            :test-paths ["test" "test-server"]
            :resource-paths ["resources/main"]
            :dependencies [[org.clojure/clojure "1.6.0"]
                           [org.clojure/clojurescript "0.0-2311"]
                           [org.clojure/core.async "0.1.319.0-6b1aca-alpha"]
                           [domina "1.0.2"]
                           [sablono "0.2.6"]
                           [org.clojure/core.match "0.2.1"]
                           [io.pedestal/pedestal.service "0.3.0"]
                           [io.pedestal/pedestal.service-tools "0.3.0"]
                           [javax.servlet/javax.servlet-api "3.1.0" :scope "provided"]
                           #_[datascript "0.2.0-analyze-q"]
                           [com.cemerick/clojurescript.test "0.3.1"]
                           [org.clojure/core.match "0.2.1"]
                           [com.palletops/pallet "0.8.0-RC.9"]
                           [com.palletops/pallet-repl "0.8.0-beta.2"]
                           [com.palletops/upstart-crate "0.8.0-alpha.2"]
                           [com.palletops/java-crate "0.8.0-beta.6"]
                           [prismatic/schema "0.2.6"]
                           [org.immutant/web "2.0.0-alpha1"]
                           [enlive "1.1.5"]
                           [org.clojure/data.xml "0.0.8"]
                           [org.clojure/data.zip "0.1.1"]
                           [ewen/wreak "0.1.0"]]
            :dev-dependencies [[lein-cljsbuild "1.0.3"]]
            :plugins [[lein-immutant "2.0.0-alpha1"]
                      [com.cemerick/austin "0.1.5"]
                      [lein-pprint "1.1.1"]]
            :profiles {:dev {:plugins [[lein-cljsbuild "1.0.3"]]
                             :source-paths ["ops"]
                             :resource-paths ["resources/dev"]}
                       :uberjar {:resource-paths ["resources/prod"]
                                  :aot :all}}
            :cljsbuild {:builds [{:id "dev"
                                  :source-paths ["src-cljs" "/home/ewen/clojure/datascript/src"]
                                  :compiler {
                                              :output-to "resources/dev/public/cljs/cle-usb.js"
                                              :output-dir "resources/dev/public/cljs/"
                                              :optimizations :none
                                              :source-map true}}
                                 {:id "prod"
                                  :source-paths ["src-cljs" "/home/ewen/clojure/datascript/src"]
                                  :compiler {
                                              :output-to "resources/prod/public/cljs/cle-usb.min.js"
                                              :output-dir "resources/prod/public/cljs/"
                                              :optimizations :none
                                              :source-map true}}]}
            :jvm-opts ["-Xss1G"]                                         ;Avoid stackoverflow when compiling clojurescript (for example, large go-loop macros)
            :main ewen.cle-usb.server)
