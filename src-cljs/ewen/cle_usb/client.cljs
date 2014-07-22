(ns ewen.cle-usb.client
  (:require [dom-delegate :as d]
            [ewen.cle-usb.data :as data]
            [ewen.cle-usb.sortable :as sortable]
            [cljs.core.async :as async]
            [ewen.async-plus :as async+]
            [domina :refer [nodes single-node attr set-style!]]
            [domina.css :refer [sel]]
            [goog.string.format]
            [clojure.string]
            [goog.style :as gstyle]
            [goog.math]
            [clojure.data :refer [diff]]
            [datascript :as ds])
  (:require-macros [ewen.async-plus.macros :as async+m]
                   [cljs.core.async.macros :refer [go go-loop]]))



(defn encode-selector [selector]
  (-> selector
      str
      (clojure.string/replace-first ":" "")
      (clojure.string/replace "." "_DOT_")
      (clojure.string/replace "/" "_SLASH_")))

(defn decode-selector [selector]
  (-> selector
      (clojure.string/replace "_DOT_" ".")
      (clojure.string/replace "_SLASH_" "/")
      keyword))





(def event-types
  "A map from keywords to event types. Useful for multiplatform (desktop/mobile) compatibility."
  (if (js* "'ontouchstart' in window")
    {:down  "touchstart"
     :up    "touchend"
     :move  "touchmove"
     :over  "touchstart"
     :out   "touchend"
     :click "tap"}
    {:down  "mousedown"
     :up    "mouseup"
     :move  "mousemove"
     :over  "mouseover"
     :out   "mouseout"
     :click "mouseclick"}))






;Event delegation
(defonce delegate (d/Delegate. js/document.body))






;Drag and drop
(defn dd-button-selector [pwd-node]
  (goog.string.format "#%s .%s" (attr pwd-node "id") "pwd-dragdrop"))

(defn node->app-id [pwd-node]
  (-> (attr pwd-node "id")
      decode-selector
      name
      js/parseInt))

;TODO Hardcoded namepsace !!
(defn app-id->node [id]
   (-> (keyword 'ewen.cle-usb.render id)
      encode-selector
      (#(str "#" %))
      sel
      single-node))

(defn event->pos [e]
  (if (.-changedTouches e)
    {:x (-> e (.-changedTouches)
            (.item 0)
            (.-pageX))
     :y (-> e (.-changedTouches)
            (.item 0)
            (.-pageY))}
    {:x (.-pageX e) :y (.-pageY e)}))

(defn g-pos->pos [g-pos]
  {:x (.-x g-pos) :y (.-y g-pos)})

(defn pos->g-pos [pos]
  (goog.math/Coordinate. (:x pos) (:y pos)))

(defn dd-down-callback [app id e]
  (.preventDefault e)
  (data/set-dragging! app id true)
  (data/set-handle-pos! app id (let [init-pos (data/get-init-pos @app id)]
                                 {:x (- (:x (event->pos e)) (:x init-pos))
                                  :y (- (:y (event->pos e)) (:y init-pos))})))

(defn dd-up-callback [app id]
  (data/set-dragging! app id false)
  (let [pwd-pos-chan (data/get-pwd-pos-chan @app)
        init-pos (:state/init-pos (ds/entity @app id))]
    (data/set-pwd-pos! app id init-pos)))

#_(defn merge-pos
  [pos handle-pos init-pos]
  {:x (+ (:x init-pos) (- (:x pos) (:x handle-pos)))
   :y (+ (:y init-pos) (- (:y pos) (:y handle-pos)))})

(defn merge-pos
  [pos handle-pos init-pos]
  {:x (- (:x pos) (:x handle-pos))
   :y (- (:y pos) (:y handle-pos))})

(defn dd-move-callback [app id e]
  (let [pwd-pos-chan (data/get-pwd-pos-chan @app)]
    (when (data/get-dragging @app id)
      (let [init-pos (-> (ds/entity @app id) :state/init-pos)
            handle-pos (-> (ds/entity @app id) :state/handle-pos)]
        (data/set-pwd-pos! app id (merge-pos (event->pos e)
                                             handle-pos
                                             init-pos))))))

(defn dd [app delegate id node node-handle]
  (let [init-pos (gstyle/getPosition node)]
    (data/set-init-pos! app id (g-pos->pos init-pos))
    (.on delegate (:down event-types)
         node-handle
         #(dd-down-callback app id %))
    (.on delegate (:up event-types)
         nil
         #(dd-up-callback app id))
    (.on delegate (:move event-types)
         nil
         #(dd-move-callback app id %))))







;Sortable

(defn changed-passwords? [old-render-data new-render-data]
  (let [[only-old only-new _] (diff old-render-data new-render-data)
        id-or-label? (fn [m] (-> (select-keys m [:id :label]) empty? not))]
    (or (some id-or-label? only-old)
        (some id-or-label? only-new))))

(defn get-sortable-mult [pwd-pos-chan]
  (let [nodes (-> (sel ".password") nodes)
        sortable-map (map (fn [node]
                            {:id              (node->app-id node)
                             :pos             (-> node gstyle/getPosition)
                             :update-pos-mult (->> pwd-pos-chan
                                                   (async+/filter< #(= (:id %) (node->app-id node)))
                                                   (async+/map< #(-> (:pos %) pos->g-pos)))})
                          nodes)]
    (sortable/sortable-mult sortable-map)))

(defn assoc-index [vec-of-maps]
  (reduce
    (fn [ret m]
      (conj ret (assoc m :index (+ 1 (or (:index (last ret)) -1)))))
          [] vec-of-maps))

(defn update-positions [vec-of-maps]
  (let [positions (->> (map (comp g-pos->pos :pos) vec-of-maps) (sort-by :y))]
    (map (fn [map pos] (assoc map :pos pos)) vec-of-maps positions)))


(defn process-sortable-mult! [app sortable-mult]
  (async+m/go-loop [sortable-ch (->> sortable-mult async+/unique)]
                   (when-let [val (async/<! sortable-ch)]
                     (let [new-positions (assoc-index val)
                           new-positions (update-positions new-positions)]
                       (data/set-sort-indexes! app new-positions))
                     (recur sortable-ch))))


#_(defn process-sortable [app]
  (let [data @app
        load-view-mult (->> (data/view-load-channel data)
                            (async+/filter< #(= :home (:view %)))
                            (async+/map< :data))
        old-render-data (atom (:data (data/get-render-data data)))
        pwd-pos-chan (data/get-pwd-pos-chan data)
        first-sortable-mult (get-sortable-mult pwd-pos-chan)]
    (process-sortable-mult! app first-sortable-mult)
    (go-loop [load-view-chan (async/tap load-view-mult (async/chan))
              sortable-mult nil]
             (when-let [render-data (async/<! load-view-chan)]
               (when (changed-passwords? @old-render-data render-data)
                 (async+/close! (if (nil? sortable-mult) first-sortable-mult sortable-mult))
                 (let [sortable-mult (get-sortable-mult pwd-pos-chan)]
                   (process-sortable-mult! app sortable-mult)
                   (reset! old-render-data render-data)
                   (recur load-view-chan sortable-mult)))
               (reset! old-render-data render-data)
               (recur load-view-chan sortable-mult))
              (async+/close! load-view-mult))))


(defn pos-datom->map [datom]
  {:id (:e datom) :pos (:v datom)})

(defn get-pwd-pos-chan [app]
  (let [pwd-pos-chan (async/chan)]
    (ds/listen! app :password/pos
                #(let [pos-seq (->> (:tx-data %)
                                    (filter :added)
                                    (map pos-datom->map))]
                  (doseq [pos pos-seq]
                    (async/put! pwd-pos-chan pos)))
                (-> (meta data/get-pwd-pos)
                    :index-keys-fn
                    (apply [@app])))))

(defn process-sortable [app]
  (let [data @app
        load-view-mult (->> (data/view-load-channel data)
                            (async+/filter< #(= :home (:view %)))
                            (async+/map< :data))
        old-render-data (atom (:data (data/get-render-data data)))]))








(defn handle-header-events [app menu-events]
  (.on delegate (:down event-types) ".home-link" #(data/set-view! app :home))
  (.on delegate (:down event-types) ".new-pwd-link" #(data/set-view! app :new-password)))









(defmulti render-view (fn [app view] view))

;Init the home view
(defmethod render-view :home [app view]
  (let [{:keys [menu-events]} (data/get-channels @app)]
    (.off delegate)
    (handle-header-events app menu-events)
    (let [pwd-nodes (-> (sel ".password") nodes)]
      ;Init passwords dimensions
      (dorun (->> pwd-nodes
                  (map (fn [node] [(node->app-id node)
                                   (.-width (gstyle/getSize node))
                                   (.-height (gstyle/getSize node))]))
                  (map #(apply (partial data/set-pwd-dims! app) %))))
      ;Set up drag and drop for each password
      (dorun (map #(dd app delegate %1 %2 %3)
                  (map node->app-id pwd-nodes)
                  pwd-nodes
                  (map dd-button-selector pwd-nodes)))
      ;Set up sortable for passwords
      #_(process-sortable app))))

;Init the new-password view
(defmethod render-view :new-password [app view]
  (let [{:keys [menu-events]} (data/get-channels @app)]
    (.off delegate)
    (handle-header-events app menu-events)))

(defn request-render [app]
  (let [load-mult (data/view-load-channel @app)
        change-view-mult (->> load-mult (async+/map< :view) async+/unique)]
    (async+m/go-loop [change-view-ch change-view-mult]
                     (when-let [view (async/<! change-view-ch)]
                       (render-view app view)
                       (recur change-view-ch)))))

(comment

  )

