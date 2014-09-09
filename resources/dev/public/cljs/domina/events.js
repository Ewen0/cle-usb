// Compiled by ClojureScript 0.0-2311
goog.provide('domina.events');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.events');
goog.require('goog.object');
goog.require('goog.object');
goog.require('domina');
domina.events.Event = (function (){var obj161206 = {};return obj161206;
})();
domina.events.prevent_default = (function prevent_default(evt){if((function (){var and__3636__auto__ = evt;if(and__3636__auto__)
{return evt.domina$events$Event$prevent_default$arity$1;
} else
{return and__3636__auto__;
}
})())
{return evt.domina$events$Event$prevent_default$arity$1(evt);
} else
{var x__4275__auto__ = (((evt == null))?null:evt);return (function (){var or__3648__auto__ = (domina.events.prevent_default[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (domina.events.prevent_default["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.prevent-default",evt);
}
}
})().call(null,evt);
}
});
domina.events.stop_propagation = (function stop_propagation(evt){if((function (){var and__3636__auto__ = evt;if(and__3636__auto__)
{return evt.domina$events$Event$stop_propagation$arity$1;
} else
{return and__3636__auto__;
}
})())
{return evt.domina$events$Event$stop_propagation$arity$1(evt);
} else
{var x__4275__auto__ = (((evt == null))?null:evt);return (function (){var or__3648__auto__ = (domina.events.stop_propagation[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (domina.events.stop_propagation["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.stop-propagation",evt);
}
}
})().call(null,evt);
}
});
domina.events.target = (function target(evt){if((function (){var and__3636__auto__ = evt;if(and__3636__auto__)
{return evt.domina$events$Event$target$arity$1;
} else
{return and__3636__auto__;
}
})())
{return evt.domina$events$Event$target$arity$1(evt);
} else
{var x__4275__auto__ = (((evt == null))?null:evt);return (function (){var or__3648__auto__ = (domina.events.target[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (domina.events.target["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.target",evt);
}
}
})().call(null,evt);
}
});
domina.events.current_target = (function current_target(evt){if((function (){var and__3636__auto__ = evt;if(and__3636__auto__)
{return evt.domina$events$Event$current_target$arity$1;
} else
{return and__3636__auto__;
}
})())
{return evt.domina$events$Event$current_target$arity$1(evt);
} else
{var x__4275__auto__ = (((evt == null))?null:evt);return (function (){var or__3648__auto__ = (domina.events.current_target[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (domina.events.current_target["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.current-target",evt);
}
}
})().call(null,evt);
}
});
domina.events.event_type = (function event_type(evt){if((function (){var and__3636__auto__ = evt;if(and__3636__auto__)
{return evt.domina$events$Event$event_type$arity$1;
} else
{return and__3636__auto__;
}
})())
{return evt.domina$events$Event$event_type$arity$1(evt);
} else
{var x__4275__auto__ = (((evt == null))?null:evt);return (function (){var or__3648__auto__ = (domina.events.event_type[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (domina.events.event_type["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.event-type",evt);
}
}
})().call(null,evt);
}
});
domina.events.raw_event = (function raw_event(evt){if((function (){var and__3636__auto__ = evt;if(and__3636__auto__)
{return evt.domina$events$Event$raw_event$arity$1;
} else
{return and__3636__auto__;
}
})())
{return evt.domina$events$Event$raw_event$arity$1(evt);
} else
{var x__4275__auto__ = (((evt == null))?null:evt);return (function (){var or__3648__auto__ = (domina.events.raw_event[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (domina.events.raw_event["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Event.raw-event",evt);
}
}
})().call(null,evt);
}
});
domina.events.root_element = window.document.documentElement;
domina.events.create_listener_function = (function create_listener_function(f){return (function (evt){f.call(null,(function (){if(typeof domina.events.t161210 !== 'undefined')
{} else
{
/**
* @constructor
*/
domina.events.t161210 = (function (evt,f,create_listener_function,meta161211){
this.evt = evt;
this.f = f;
this.create_listener_function = create_listener_function;
this.meta161211 = meta161211;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393472;
})
domina.events.t161210.cljs$lang$type = true;
domina.events.t161210.cljs$lang$ctorStr = "domina.events/t161210";
domina.events.t161210.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"domina.events/t161210");
});
domina.events.t161210.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (o,k){var self__ = this;
var o__$1 = this;var temp__4124__auto__ = (self__.evt[k]);if(cljs.core.truth_(temp__4124__auto__))
{var val = temp__4124__auto__;return val;
} else
{return (self__.evt[cljs.core.name.call(null,k)]);
}
});
domina.events.t161210.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (o,k,not_found){var self__ = this;
var o__$1 = this;var or__3648__auto__ = cljs.core._lookup.call(null,o__$1,k);if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return not_found;
}
});
domina.events.t161210.prototype.domina$events$Event$ = true;
domina.events.t161210.prototype.domina$events$Event$prevent_default$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.evt.preventDefault();
});
domina.events.t161210.prototype.domina$events$Event$stop_propagation$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.evt.stopPropagation();
});
domina.events.t161210.prototype.domina$events$Event$target$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.evt.target;
});
domina.events.t161210.prototype.domina$events$Event$current_target$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.evt.currentTarget;
});
domina.events.t161210.prototype.domina$events$Event$event_type$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.evt.type;
});
domina.events.t161210.prototype.domina$events$Event$raw_event$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.evt;
});
domina.events.t161210.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_161212){var self__ = this;
var _161212__$1 = this;return self__.meta161211;
});
domina.events.t161210.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_161212,meta161211__$1){var self__ = this;
var _161212__$1 = this;return (new domina.events.t161210(self__.evt,self__.f,self__.create_listener_function,meta161211__$1));
});
domina.events.__GT_t161210 = (function __GT_t161210(evt__$1,f__$1,create_listener_function__$1,meta161211){return (new domina.events.t161210(evt__$1,f__$1,create_listener_function__$1,meta161211));
});
}
return (new domina.events.t161210(evt,f,create_listener_function,null));
})());
return true;
});
});
domina.events.listen_internal_BANG_ = (function listen_internal_BANG_(content,type,listener,capture,once){var f = domina.events.create_listener_function.call(null,listener);var t = cljs.core.name.call(null,type);return cljs.core.doall.call(null,(function (){var iter__4373__auto__ = ((function (f,t){
return (function iter__161217(s__161218){return (new cljs.core.LazySeq(null,((function (f,t){
return (function (){var s__161218__$1 = s__161218;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__161218__$1);if(temp__4126__auto__)
{var s__161218__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__161218__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__161218__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__161220 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__161219 = (0);while(true){
if((i__161219 < size__4372__auto__))
{var node = cljs.core._nth.call(null,c__4371__auto__,i__161219);cljs.core.chunk_append.call(null,b__161220,(cljs.core.truth_(once)?goog.events.listenOnce(node,t,f,capture):goog.events.listen(node,t,f,capture)));
{
var G__161221 = (i__161219 + (1));
i__161219 = G__161221;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161220),iter__161217.call(null,cljs.core.chunk_rest.call(null,s__161218__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161220),null);
}
} else
{var node = cljs.core.first.call(null,s__161218__$2);return cljs.core.cons.call(null,(cljs.core.truth_(once)?goog.events.listenOnce(node,t,f,capture):goog.events.listen(node,t,f,capture)),iter__161217.call(null,cljs.core.rest.call(null,s__161218__$2)));
}
} else
{return null;
}
break;
}
});})(f,t))
,null,null));
});})(f,t))
;return iter__4373__auto__.call(null,domina.nodes.call(null,content));
})());
});
/**
* Add an event listener to each node in a DomContent. Listens for events during the bubble phase. Returns a sequence of listener keys (one for each item in the content). If content is omitted, binds a listener to the document's root element.
*/
domina.events.listen_BANG_ = (function() {
var listen_BANG_ = null;
var listen_BANG___2 = (function (type,listener){return listen_BANG_.call(null,domina.events.root_element,type,listener);
});
var listen_BANG___3 = (function (content,type,listener){return domina.events.listen_internal_BANG_.call(null,content,type,listener,false,false);
});
listen_BANG_ = function(content,type,listener){
switch(arguments.length){
case 2:
return listen_BANG___2.call(this,content,type);
case 3:
return listen_BANG___3.call(this,content,type,listener);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
listen_BANG_.cljs$core$IFn$_invoke$arity$2 = listen_BANG___2;
listen_BANG_.cljs$core$IFn$_invoke$arity$3 = listen_BANG___3;
return listen_BANG_;
})()
;
/**
* Add an event listener to each node in a DomContent. Listens for events during the capture phase.  Returns a sequence of listener keys (one for each item in the content). If content is omitted, binds a listener to the document's root element.
*/
domina.events.capture_BANG_ = (function() {
var capture_BANG_ = null;
var capture_BANG___2 = (function (type,listener){return capture_BANG_.call(null,domina.events.root_element,type,listener);
});
var capture_BANG___3 = (function (content,type,listener){return domina.events.listen_internal_BANG_.call(null,content,type,listener,true,false);
});
capture_BANG_ = function(content,type,listener){
switch(arguments.length){
case 2:
return capture_BANG___2.call(this,content,type);
case 3:
return capture_BANG___3.call(this,content,type,listener);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
capture_BANG_.cljs$core$IFn$_invoke$arity$2 = capture_BANG___2;
capture_BANG_.cljs$core$IFn$_invoke$arity$3 = capture_BANG___3;
return capture_BANG_;
})()
;
/**
* Add an event listener to each node in a DomContent. Listens for events during the bubble phase. De-registers the listener after the first time it is invoked.  Returns a sequence of listener keys (one for each item in the content). If content is omitted, binds a listener to the document's root element.
*/
domina.events.listen_once_BANG_ = (function() {
var listen_once_BANG_ = null;
var listen_once_BANG___2 = (function (type,listener){return listen_once_BANG_.call(null,domina.events.root_element,type,listener);
});
var listen_once_BANG___3 = (function (content,type,listener){return domina.events.listen_internal_BANG_.call(null,content,type,listener,false,true);
});
listen_once_BANG_ = function(content,type,listener){
switch(arguments.length){
case 2:
return listen_once_BANG___2.call(this,content,type);
case 3:
return listen_once_BANG___3.call(this,content,type,listener);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
listen_once_BANG_.cljs$core$IFn$_invoke$arity$2 = listen_once_BANG___2;
listen_once_BANG_.cljs$core$IFn$_invoke$arity$3 = listen_once_BANG___3;
return listen_once_BANG_;
})()
;
/**
* Add an event listener to each node in a DomContent. Listens for events during the capture phase. De-registers the listener after the first time it is invoked.  Returns a sequence of listener keys (one for each item in the content). If content is omitted, binds a listener to the document's root element.
*/
domina.events.capture_once_BANG_ = (function() {
var capture_once_BANG_ = null;
var capture_once_BANG___2 = (function (type,listener){return capture_once_BANG_.call(null,domina.events.root_element,type,listener);
});
var capture_once_BANG___3 = (function (content,type,listener){return domina.events.listen_internal_BANG_.call(null,content,type,listener,true,true);
});
capture_once_BANG_ = function(content,type,listener){
switch(arguments.length){
case 2:
return capture_once_BANG___2.call(this,content,type);
case 3:
return capture_once_BANG___3.call(this,content,type,listener);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
capture_once_BANG_.cljs$core$IFn$_invoke$arity$2 = capture_once_BANG___2;
capture_once_BANG_.cljs$core$IFn$_invoke$arity$3 = capture_once_BANG___3;
return capture_once_BANG_;
})()
;
/**
* Removes event listeners from each node in the content. If a listener type is supplied, removes only listeners of that type. If content is omitted, it will remove listeners from the document's root element.
*/
domina.events.unlisten_BANG_ = (function() {
var unlisten_BANG_ = null;
var unlisten_BANG___0 = (function (){return unlisten_BANG_.call(null,domina.events.root_element);
});
var unlisten_BANG___1 = (function (content){var seq__161230 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__161231 = null;var count__161232 = (0);var i__161233 = (0);while(true){
if((i__161233 < count__161232))
{var node = cljs.core._nth.call(null,chunk__161231,i__161233);goog.events.removeAll(node);
{
var G__161238 = seq__161230;
var G__161239 = chunk__161231;
var G__161240 = count__161232;
var G__161241 = (i__161233 + (1));
seq__161230 = G__161238;
chunk__161231 = G__161239;
count__161232 = G__161240;
i__161233 = G__161241;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__161230);if(temp__4126__auto__)
{var seq__161230__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__161230__$1))
{var c__4404__auto__ = cljs.core.chunk_first.call(null,seq__161230__$1);{
var G__161242 = cljs.core.chunk_rest.call(null,seq__161230__$1);
var G__161243 = c__4404__auto__;
var G__161244 = cljs.core.count.call(null,c__4404__auto__);
var G__161245 = (0);
seq__161230 = G__161242;
chunk__161231 = G__161243;
count__161232 = G__161244;
i__161233 = G__161245;
continue;
}
} else
{var node = cljs.core.first.call(null,seq__161230__$1);goog.events.removeAll(node);
{
var G__161246 = cljs.core.next.call(null,seq__161230__$1);
var G__161247 = null;
var G__161248 = (0);
var G__161249 = (0);
seq__161230 = G__161246;
chunk__161231 = G__161247;
count__161232 = G__161248;
i__161233 = G__161249;
continue;
}
}
} else
{return null;
}
}
break;
}
});
var unlisten_BANG___2 = (function (content,type){var type__$1 = cljs.core.name.call(null,type);var seq__161234 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__161235 = null;var count__161236 = (0);var i__161237 = (0);while(true){
if((i__161237 < count__161236))
{var node = cljs.core._nth.call(null,chunk__161235,i__161237);goog.events.removeAll(node,type__$1);
{
var G__161250 = seq__161234;
var G__161251 = chunk__161235;
var G__161252 = count__161236;
var G__161253 = (i__161237 + (1));
seq__161234 = G__161250;
chunk__161235 = G__161251;
count__161236 = G__161252;
i__161237 = G__161253;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__161234);if(temp__4126__auto__)
{var seq__161234__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__161234__$1))
{var c__4404__auto__ = cljs.core.chunk_first.call(null,seq__161234__$1);{
var G__161254 = cljs.core.chunk_rest.call(null,seq__161234__$1);
var G__161255 = c__4404__auto__;
var G__161256 = cljs.core.count.call(null,c__4404__auto__);
var G__161257 = (0);
seq__161234 = G__161254;
chunk__161235 = G__161255;
count__161236 = G__161256;
i__161237 = G__161257;
continue;
}
} else
{var node = cljs.core.first.call(null,seq__161234__$1);goog.events.removeAll(node,type__$1);
{
var G__161258 = cljs.core.next.call(null,seq__161234__$1);
var G__161259 = null;
var G__161260 = (0);
var G__161261 = (0);
seq__161234 = G__161258;
chunk__161235 = G__161259;
count__161236 = G__161260;
i__161237 = G__161261;
continue;
}
}
} else
{return null;
}
}
break;
}
});
unlisten_BANG_ = function(content,type){
switch(arguments.length){
case 0:
return unlisten_BANG___0.call(this);
case 1:
return unlisten_BANG___1.call(this,content);
case 2:
return unlisten_BANG___2.call(this,content,type);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unlisten_BANG_.cljs$core$IFn$_invoke$arity$0 = unlisten_BANG___0;
unlisten_BANG_.cljs$core$IFn$_invoke$arity$1 = unlisten_BANG___1;
unlisten_BANG_.cljs$core$IFn$_invoke$arity$2 = unlisten_BANG___2;
return unlisten_BANG_;
})()
;
/**
* Returns a seq of a node and its ancestors, starting with the document root.
*/
domina.events.ancestor_nodes = (function() {
var ancestor_nodes = null;
var ancestor_nodes__1 = (function (n){return ancestor_nodes.call(null,n,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [n], null));
});
var ancestor_nodes__2 = (function (n,so_far){while(true){
var temp__4124__auto__ = n.parentNode;if(cljs.core.truth_(temp__4124__auto__))
{var parent = temp__4124__auto__;{
var G__161262 = parent;
var G__161263 = cljs.core.cons.call(null,parent,so_far);
n = G__161262;
so_far = G__161263;
continue;
}
} else
{return so_far;
}
break;
}
});
ancestor_nodes = function(n,so_far){
switch(arguments.length){
case 1:
return ancestor_nodes__1.call(this,n);
case 2:
return ancestor_nodes__2.call(this,n,so_far);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
ancestor_nodes.cljs$core$IFn$_invoke$arity$1 = ancestor_nodes__1;
ancestor_nodes.cljs$core$IFn$_invoke$arity$2 = ancestor_nodes__2;
return ancestor_nodes;
})()
;
/**
* Intended for internal/testing use only. Clients should prefer dispatch!. Dispatches an event as a simulated browser event from the given source node. Emulates capture/bubble behavior. Returns false if any handlers called prevent-default, otherwise true.
*/
domina.events.dispatch_browser_BANG_ = (function dispatch_browser_BANG_(source,evt){var ancestors = domina.events.ancestor_nodes.call(null,domina.single_node.call(null,source));var seq__161272_161280 = cljs.core.seq.call(null,ancestors);var chunk__161273_161281 = null;var count__161274_161282 = (0);var i__161275_161283 = (0);while(true){
if((i__161275_161283 < count__161274_161282))
{var n_161284 = cljs.core._nth.call(null,chunk__161273_161281,i__161275_161283);if(cljs.core.truth_(evt.propagationStopped_))
{} else
{evt.currentTarget = n_161284;
goog.events.fireListeners(n_161284,evt.type,true,evt);
}
{
var G__161285 = seq__161272_161280;
var G__161286 = chunk__161273_161281;
var G__161287 = count__161274_161282;
var G__161288 = (i__161275_161283 + (1));
seq__161272_161280 = G__161285;
chunk__161273_161281 = G__161286;
count__161274_161282 = G__161287;
i__161275_161283 = G__161288;
continue;
}
} else
{var temp__4126__auto___161289 = cljs.core.seq.call(null,seq__161272_161280);if(temp__4126__auto___161289)
{var seq__161272_161290__$1 = temp__4126__auto___161289;if(cljs.core.chunked_seq_QMARK_.call(null,seq__161272_161290__$1))
{var c__4404__auto___161291 = cljs.core.chunk_first.call(null,seq__161272_161290__$1);{
var G__161292 = cljs.core.chunk_rest.call(null,seq__161272_161290__$1);
var G__161293 = c__4404__auto___161291;
var G__161294 = cljs.core.count.call(null,c__4404__auto___161291);
var G__161295 = (0);
seq__161272_161280 = G__161292;
chunk__161273_161281 = G__161293;
count__161274_161282 = G__161294;
i__161275_161283 = G__161295;
continue;
}
} else
{var n_161296 = cljs.core.first.call(null,seq__161272_161290__$1);if(cljs.core.truth_(evt.propagationStopped_))
{} else
{evt.currentTarget = n_161296;
goog.events.fireListeners(n_161296,evt.type,true,evt);
}
{
var G__161297 = cljs.core.next.call(null,seq__161272_161290__$1);
var G__161298 = null;
var G__161299 = (0);
var G__161300 = (0);
seq__161272_161280 = G__161297;
chunk__161273_161281 = G__161298;
count__161274_161282 = G__161299;
i__161275_161283 = G__161300;
continue;
}
}
} else
{}
}
break;
}
var seq__161276_161301 = cljs.core.seq.call(null,cljs.core.reverse.call(null,ancestors));var chunk__161277_161302 = null;var count__161278_161303 = (0);var i__161279_161304 = (0);while(true){
if((i__161279_161304 < count__161278_161303))
{var n_161305 = cljs.core._nth.call(null,chunk__161277_161302,i__161279_161304);if(cljs.core.truth_(evt.propagationStopped_))
{} else
{evt.currentTarget = n_161305;
goog.events.fireListeners(n_161305,evt.type,false,evt);
}
{
var G__161306 = seq__161276_161301;
var G__161307 = chunk__161277_161302;
var G__161308 = count__161278_161303;
var G__161309 = (i__161279_161304 + (1));
seq__161276_161301 = G__161306;
chunk__161277_161302 = G__161307;
count__161278_161303 = G__161308;
i__161279_161304 = G__161309;
continue;
}
} else
{var temp__4126__auto___161310 = cljs.core.seq.call(null,seq__161276_161301);if(temp__4126__auto___161310)
{var seq__161276_161311__$1 = temp__4126__auto___161310;if(cljs.core.chunked_seq_QMARK_.call(null,seq__161276_161311__$1))
{var c__4404__auto___161312 = cljs.core.chunk_first.call(null,seq__161276_161311__$1);{
var G__161313 = cljs.core.chunk_rest.call(null,seq__161276_161311__$1);
var G__161314 = c__4404__auto___161312;
var G__161315 = cljs.core.count.call(null,c__4404__auto___161312);
var G__161316 = (0);
seq__161276_161301 = G__161313;
chunk__161277_161302 = G__161314;
count__161278_161303 = G__161315;
i__161279_161304 = G__161316;
continue;
}
} else
{var n_161317 = cljs.core.first.call(null,seq__161276_161311__$1);if(cljs.core.truth_(evt.propagationStopped_))
{} else
{evt.currentTarget = n_161317;
goog.events.fireListeners(n_161317,evt.type,false,evt);
}
{
var G__161318 = cljs.core.next.call(null,seq__161276_161311__$1);
var G__161319 = null;
var G__161320 = (0);
var G__161321 = (0);
seq__161276_161301 = G__161318;
chunk__161277_161302 = G__161319;
count__161278_161303 = G__161320;
i__161279_161304 = G__161321;
continue;
}
}
} else
{}
}
break;
}
return evt.returnValue_;
});
/**
* Intended for internal/testing use only. Clients should prefer dispatch!. Dispatches an event using GClosure's event handling. The event source must extend goog.event.EventTarget
*/
domina.events.dispatch_event_target_BANG_ = (function dispatch_event_target_BANG_(source,evt){return goog.events.dispatchEvent(source,evt);
});
/**
* Tests whether the object is a goog.event.EventTarget
*/
domina.events.is_event_target_QMARK_ = (function is_event_target_QMARK_(o){var and__3636__auto__ = o.getParentEventTarget;if(cljs.core.truth_(and__3636__auto__))
{return o.dispatchEvent;
} else
{return and__3636__auto__;
}
});
/**
* Dispatches an event of the given type, adding the values in event map to the event object. Optionally takes an event source. If none is provided, dispatches on the document's root element. Returns false if any handlers called prevent-default, otherwise true.
*/
domina.events.dispatch_BANG_ = (function() {
var dispatch_BANG_ = null;
var dispatch_BANG___2 = (function (type,evt_map){return dispatch_BANG_.call(null,domina.events.root_element,type,evt_map);
});
var dispatch_BANG___3 = (function (source,type,evt_map){var evt = (new goog.events.Event(cljs.core.name.call(null,type)));var seq__161328_161334 = cljs.core.seq.call(null,evt_map);var chunk__161329_161335 = null;var count__161330_161336 = (0);var i__161331_161337 = (0);while(true){
if((i__161331_161337 < count__161330_161336))
{var vec__161332_161338 = cljs.core._nth.call(null,chunk__161329_161335,i__161331_161337);var k_161339 = cljs.core.nth.call(null,vec__161332_161338,(0),null);var v_161340 = cljs.core.nth.call(null,vec__161332_161338,(1),null);(evt[k_161339] = v_161340);
{
var G__161341 = seq__161328_161334;
var G__161342 = chunk__161329_161335;
var G__161343 = count__161330_161336;
var G__161344 = (i__161331_161337 + (1));
seq__161328_161334 = G__161341;
chunk__161329_161335 = G__161342;
count__161330_161336 = G__161343;
i__161331_161337 = G__161344;
continue;
}
} else
{var temp__4126__auto___161345 = cljs.core.seq.call(null,seq__161328_161334);if(temp__4126__auto___161345)
{var seq__161328_161346__$1 = temp__4126__auto___161345;if(cljs.core.chunked_seq_QMARK_.call(null,seq__161328_161346__$1))
{var c__4404__auto___161347 = cljs.core.chunk_first.call(null,seq__161328_161346__$1);{
var G__161348 = cljs.core.chunk_rest.call(null,seq__161328_161346__$1);
var G__161349 = c__4404__auto___161347;
var G__161350 = cljs.core.count.call(null,c__4404__auto___161347);
var G__161351 = (0);
seq__161328_161334 = G__161348;
chunk__161329_161335 = G__161349;
count__161330_161336 = G__161350;
i__161331_161337 = G__161351;
continue;
}
} else
{var vec__161333_161352 = cljs.core.first.call(null,seq__161328_161346__$1);var k_161353 = cljs.core.nth.call(null,vec__161333_161352,(0),null);var v_161354 = cljs.core.nth.call(null,vec__161333_161352,(1),null);(evt[k_161353] = v_161354);
{
var G__161355 = cljs.core.next.call(null,seq__161328_161346__$1);
var G__161356 = null;
var G__161357 = (0);
var G__161358 = (0);
seq__161328_161334 = G__161355;
chunk__161329_161335 = G__161356;
count__161330_161336 = G__161357;
i__161331_161337 = G__161358;
continue;
}
}
} else
{}
}
break;
}
if(cljs.core.truth_(domina.events.is_event_target_QMARK_.call(null,source)))
{return domina.events.dispatch_event_target_BANG_.call(null,source,evt);
} else
{return domina.events.dispatch_browser_BANG_.call(null,source,evt);
}
});
dispatch_BANG_ = function(source,type,evt_map){
switch(arguments.length){
case 2:
return dispatch_BANG___2.call(this,source,type);
case 3:
return dispatch_BANG___3.call(this,source,type,evt_map);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
dispatch_BANG_.cljs$core$IFn$_invoke$arity$2 = dispatch_BANG___2;
dispatch_BANG_.cljs$core$IFn$_invoke$arity$3 = dispatch_BANG___3;
return dispatch_BANG_;
})()
;
/**
* Given a listener key, removes the listener.
*/
domina.events.unlisten_by_key_BANG_ = (function unlisten_by_key_BANG_(key){return goog.events.unlistenByKey(key);
});
/**
* Returns a sequence of event listeners for all the nodes in the
* content of a given type.
*/
domina.events.get_listeners = (function get_listeners(content,type){var type__$1 = cljs.core.name.call(null,type);return cljs.core.mapcat.call(null,((function (type__$1){
return (function (p1__161359_SHARP_){return goog.events.getListeners(p1__161359_SHARP_,type__$1,false);
});})(type__$1))
,domina.nodes.call(null,content));
});

//# sourceMappingURL=events.js.map