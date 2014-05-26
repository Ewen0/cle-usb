(defproject ewen/cle-usb "0.1.0-SNAPSHOT"
  :description "cle-usb"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :min-lein-version "2.0.0"
  :src-paths ["src"]
  :test-paths ["test" "test-server"]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2156"]
                 [org.clojure/core.async "0.1.278.0-76b25b-alpha"]
                 [domina "1.0.2"]
                 [sablono "0.2.6"]
                 [ewen/dragdrop "0.1.0-SNAPSHOT"]
                 [org.clojure/core.match "0.2.1"]
                 [io.pedestal/pedestal.service "0.2.2"]
                 [io.pedestal/pedestal.service-tools "0.2.2"]
                 [javax.servlet/javax.servlet-api "3.1.0" :scope "provided"]
                 [datascript "0.1.5-SNAPSHOT"]
                 [prismatic/schema "0.2.1"]
                 [quiescent "0.1.2"]
                 [automat "0.1.0"]]
  :dev-dependencies [[lein-cljsbuild "1.0.2"]]
  :plugins [[lein-cljsbuild "1.0.2"]]
  :profiles {:dev {:dependencies [[enlive "1.1.5"]]
                    :plugins [[com.cemerick/austin "0.1.4"]]}}
  :cljsbuild {:builds [{:id "dev"
                        :source-paths ["src-cljs" "/home/ewen/clojure/dragdrop/src"]
                        :compiler {
                        :output-to "resources/public/cljs/cle-usb.js"
                        :output-dir "resources/public/cljs/"
                        :optimizations :none
                        :source-map true
                        :libs ["resources/public/js/dom-delegate.js"]}}]})
