(ns ewen.cle-usb.test-server.test-server
  (:require [io.pedestal.service.http :as bootstrap]
            [io.pedestal.service.http.route :as route]
            [io.pedestal.service.http.body-params :as body-params]
            [io.pedestal.service.http.route.definition :refer [defroutes]]
            [ring.util.response :as ring-resp]
            [immutant.web :as web]
            [immutant.dev :as immutant]
            [immutant.util]
            [io.pedestal.service.http :as http]
            [cemerick.austin.repls :refer [browser-connected-repl-js]]
            [net.cgrand.enlive-html :as enlive]))




(def repl-env (reset! cemerick.austin.repls/browser-repl-env
                      (cemerick.austin/repl-env)))


(enlive/deftemplate main-tml "public/cle-usb.html" []
                    [[:script (enlive/attr= :src "cljs/cle-usb.js")]]
                    (enlive/before
                      (enlive/html [:script {:src "cljs/goog/base.js" :type "text/javascript"}]
                                   [:script {:src "cljs/goog/deps.js" :type "text/javascript"}]))
                    [:body]
                    (enlive/append
                      (enlive/html [:script "goog.require('ewen.cle_usb.client_core');"]
                                   [:script "goog.require('clojure.browser.repl');"]
                                   [:script (browser-connected-repl-js)])))

(defn test-page
  [request]
  (ring-resp/response (apply str (main-tml))))

(defroutes routes
           [[["/" {:get test-page} ^:interceptors [bootstrap/html-body]]]])

(def service {::bootstrap/routes        #(deref #'routes)
              ::bootstrap/resource-path "/public/"})

#_(web/start-servlet "/" (::http/servlet (http/create-servlet service)))
#_(web/stop)
#_(cemerick.austin.repls/cljs-repl repl-env)
#_(cemerick.austin.repls/exec)