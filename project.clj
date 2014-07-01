(defproject ewen/cle-usb "0.1.0-SNAPSHOT"
  :description "cle-usb"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :min-lein-version "2.0.0"
  :source-paths ["src" "src-cljs" "/home/ewen/clojure/datascript/src"]
  :test-paths ["test" "test-server"]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/clojurescript "0.0-2234"]
                 [org.clojure/core.async "0.1.278.0-76b25b-alpha"]
                 [domina "1.0.2"]
                 [sablono "0.2.6"]
                 [org.clojure/core.match "0.2.1"]
                 [io.pedestal/pedestal.service "0.2.2"]
                 [io.pedestal/pedestal.service-tools "0.2.2"]
                 [javax.servlet/javax.servlet-api "3.1.0" :scope "provided"]
                 #_[datascript "0.1.5-SNAPSHOT"]
                 [quiescent "0.1.2"]
                 [automat "0.1.0"]
                 [com.cemerick/clojurescript.test "0.3.1"]
                 [aysylu/loom "0.5.1-cljx-SNAPSHOT"]]
  :dev-dependencies [[lein-cljsbuild "1.0.3"]]
  :plugins [[lein-cljsbuild "1.0.3"]]
  :profiles {:dev {:dependencies [[enlive "1.1.5"]]
                    :plugins [[com.cemerick/austin "0.1.4"]]}}
  :cljsbuild {:builds [{:id "dev"
                        :source-paths ["src-cljs" "/home/ewen/clojure/datascript/src"
                                       "/home/ewen/clojure/datascript/test"]
                        :compiler {
                        :output-to "resources/public/cljs/cle-usb.js"
                        :output-dir "resources/public/cljs/"
                        :optimizations :none
                        :source-map true
                        :libs ["resources/public/js/dom-delegate.js"]}}]})
