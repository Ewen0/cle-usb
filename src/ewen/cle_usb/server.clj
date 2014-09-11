(ns ewen.cle-usb.server
  (:require [io.pedestal.http :as http]
            [io.pedestal.http.route :as route]
            [io.pedestal.http.body-params :as body-params]
            [io.pedestal.http.route.definition :refer [defroutes]]
            [ring.util.response :as ring-resp]
            [immutant.web :as web]
            [net.cgrand.enlive-html :as enlive]
            [cemerick.austin.repls :refer [browser-connected-repl-js]]
            [ewen.cle-usb.env :as env]

            [ring.middleware.resource])
  (:gen-class))

(when (:enable-browser-repl (env/env))
  (def repl-env (reset! cemerick.austin.repls/browser-repl-env
                        (cemerick.austin/repl-env))))

(defn browser-connected-repl-html []
  [:script "goog.require('clojure.browser.repl');"]
  [:script (browser-connected-repl-js)])


(enlive/deftemplate main-tml "public/cle-usb.html" []
                    [[:script (enlive/attr= :src "cljs/cle-usb.js")]]
                    (enlive/before
                      (enlive/html [:script {:src "cljs/goog/base.js" :type "text/javascript"}]
                                   [:script {:src "cljs/goog/deps.js" :type "text/javascript"}]))
                    [:body]
                    (enlive/append
                      (enlive/html [:script "goog.require('ewen.cle_usb.client');"]
                                   (when (:enable-browser-repl (env/env)) (browser-connected-repl-html)))))

(defn test-page
  [request]
  (ring-resp/response (apply str (main-tml))))

(defroutes routes
           [[["/" {:get test-page} ^:interceptors [http/html-body]]]])

(def service {::http/routes        #(deref #'routes)
              ::http/resource-path "/public/"})

(defn -main
  [& args]
  (web/run (::http/servlet (http/create-servlet service)) {:path "/"}))


(comment
  (web/run (::http/servlet (http/create-servlet service)) {:path "/"})
  (cemerick.austin.repls/cljs-repl repl-env)
  (cemerick.austin.repls/exec)
  (web/stop {:path "/"})

  (require '[ring.util.codec :as codec]
           '[ring.util.response :as response]
           '[ring.util.request :as request]
           '[ring.middleware.head :as head])


  (defn resource-request
    "If request matches a static resource, returns it in a response map.
    Otherwise returns nil."
    {:added "1.2"}
    [request root-path]
    (if (#{:head :get} (:request-method request))
      (let [path (codec/url-decode (request/path-info request))]
        (-> (response/resource-response path {:root root-path})
            (head/head-response request)))))

  (alter-var-root #'ring.middleware.resource/resource-request
                  (fn [_] (fn [request root-path]
                            (resource-request request root-path))))



  )
