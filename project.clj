(defproject ewen/cle-usb "0.1.0-SNAPSHOT"
            :description "cle-usb"
            :license {:name "Eclipse Public License"
                      :url "http://www.eclipse.org/legal/epl-v10.html"}
            :min-lein-version "2.0.0"
            :source-paths ["src" "src-cljs" "ops" "/home/ewen/clojure/datascript/src"]
            :test-paths ["test" "test-server"]
            :dependencies [[org.clojure/clojure "1.6.0"]
                           [org.clojure/clojurescript "0.0-2311"]
                           [org.clojure/core.async "0.1.319.0-6b1aca-alpha"]
                           [domina "1.0.2"]
                           [sablono "0.2.6"]
                           [org.clojure/core.match "0.2.1"]
                           [io.pedestal/pedestal.service "0.2.2"]
                           [io.pedestal/pedestal.service-tools "0.2.2"]
                           [javax.servlet/javax.servlet-api "3.1.0" :scope "provided"]
                           #_[datascript "0.2.0-analyze-q"]
                           [com.cemerick/clojurescript.test "0.3.1"]
                           [org.clojure/core.match "0.2.1"]
                           [com.palletops/pallet "0.8.0-RC.9"]
                           [prismatic/schema "0.2.6"]]
            :dev-dependencies [[lein-cljsbuild "1.0.3"]]
            :plugins [[lein-cljsbuild "1.0.3"]]
            :profiles {:dev {:dependencies [[enlive "1.1.5"]]
                             :plugins [[com.cemerick/austin "0.1.4"]]}}
            :cljsbuild {:builds [{:id "dev"
                                  :source-paths ["src-cljs" "/home/ewen/clojure/datascript/src"]
                                  :compiler {
                                              :output-to "resources/public/cljs/cle-usb.js"
                                              :output-dir "resources/public/cljs/"
                                              :optimizations :none
                                              :source-map true
                                              :libs ["resources/public/js/dom-delegate.js"]}}]}
            :jvm-opts ["-Xss1G"]                                         ;Avoid stackoverflow when compiling clojurescript (for example, large go-loop macros)
            )
