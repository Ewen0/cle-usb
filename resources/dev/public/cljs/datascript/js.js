// Compiled by ClojureScript 0.0-2311
goog.provide('datascript.js');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('cljs.reader');
goog.require('clojure.walk');
goog.require('clojure.walk');
goog.require('datascript');
goog.require('datascript');
datascript.js.keywordize = (function keywordize(s){if((typeof s === 'string') && (cljs.core._EQ_.call(null,cljs.core.subs.call(null,s,(0),(1)),":")))
{return cljs.core.keyword.call(null,cljs.core.subs.call(null,s,(1)));
} else
{return s;
}
});
datascript.js.schema__GT_clj = (function schema__GT_clj(schema__$1){return clojure.walk.postwalk.call(null,datascript.js.keywordize,cljs.core.js__GT_clj.call(null,schema__$1));
});
datascript.js.entity__GT_clj = (function entity__GT_clj(e){if(cljs.core.map_QMARK_.call(null,e))
{return cljs.core.assoc.call(null,cljs.core.dissoc.call(null,e,":db/id"),new cljs.core.Keyword("db","id","db/id",-1388397098),e.call(null,":db/id"));
} else
{if(cljs.core._EQ_.call(null,cljs.core.first.call(null,e),":db.fn/call"))
{var vec__156368 = e;var _ = cljs.core.nth.call(null,vec__156368,(0),null);var f = cljs.core.nth.call(null,vec__156368,(1),null);var args = cljs.core.nthnext.call(null,vec__156368,(2));return cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db.fn","call","db.fn/call",-151594418),((function (vec__156368,_,f,args){
return (function() { 
var G__156370__delegate = function (args__$1){return datascript.js.entities__GT_clj.call(null,cljs.core.apply.call(null,f,args__$1));
};
var G__156370 = function (var_args){
var args__$1 = null;if (arguments.length > 0) {
  args__$1 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__156370__delegate.call(this,args__$1);};
G__156370.cljs$lang$maxFixedArity = 0;
G__156370.cljs$lang$applyTo = (function (arglist__156371){
var args__$1 = cljs.core.seq(arglist__156371);
return G__156370__delegate(args__$1);
});
G__156370.cljs$core$IFn$_invoke$arity$variadic = G__156370__delegate;
return G__156370;
})()
;})(vec__156368,_,f,args))
], null),args);
} else
{if(cljs.core.sequential_QMARK_.call(null,e))
{var vec__156369 = e;var op = cljs.core.nth.call(null,vec__156369,(0),null);var entity = cljs.core.nthnext.call(null,vec__156369,(1));return cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [datascript.js.keywordize.call(null,op)], null),entity);
} else
{return null;
}
}
}
});
datascript.js.entities__GT_clj = (function entities__GT_clj(entities){return cljs.core.map.call(null,datascript.js.entity__GT_clj,cljs.core.js__GT_clj.call(null,entities));
});
datascript.js.datom__GT_js = (function datom__GT_js(d){return {"added": d.added, "tx": d.tx, "v": d.v, "a": d.a, "e": d.e};
});
datascript.js.tx_report__GT_js = (function tx_report__GT_js(report){return {"tempids": cljs.core.clj__GT_js.call(null,new cljs.core.Keyword(null,"tempids","tempids",1767509089).cljs$core$IFn$_invoke$arity$1(report)), "tx_data": cljs.core.into_array.call(null,cljs.core.map.call(null,datascript.js.datom__GT_js,new cljs.core.Keyword(null,"tx-data","tx-data",934159761).cljs$core$IFn$_invoke$arity$1(report))), "db_after": new cljs.core.Keyword(null,"db-after","db-after",-571884666).cljs$core$IFn$_invoke$arity$1(report), "db_before": new cljs.core.Keyword(null,"db-before","db-before",-553691536).cljs$core$IFn$_invoke$arity$1(report)};
});
datascript.js.entity__GT_js = (function entity__GT_js(e){return cljs.core.clj__GT_js.call(null,cljs.core.assoc.call(null,cljs.core.dissoc.call(null,e,new cljs.core.Keyword("db","id","db/id",-1388397098)),":db/id",new cljs.core.Keyword("db","id","db/id",-1388397098).cljs$core$IFn$_invoke$arity$1(e)));
});
/**
* @param {...*} var_args
*/
datascript.js.empty_db = (function() { 
var empty_db__delegate = function (p__156372){var vec__156374 = p__156372;var schema__$1 = cljs.core.nth.call(null,vec__156374,(0),null);return datascript.empty_db.call(null,datascript.js.schema__GT_clj.call(null,schema__$1));
};
var empty_db = function (var_args){
var p__156372 = null;if (arguments.length > 0) {
  p__156372 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return empty_db__delegate.call(this,p__156372);};
empty_db.cljs$lang$maxFixedArity = 0;
empty_db.cljs$lang$applyTo = (function (arglist__156375){
var p__156372 = cljs.core.seq(arglist__156375);
return empty_db__delegate(p__156372);
});
empty_db.cljs$core$IFn$_invoke$arity$variadic = empty_db__delegate;
return empty_db;
})()
;
goog.exportSymbol('datascript.js.empty_db', datascript.js.empty_db);
/**
* @param {...*} var_args
*/
datascript.js.q = (function() { 
var q__delegate = function (query,sources){var query__$1 = cljs.reader.read_string.call(null,query);var results = cljs.core.apply.call(null,datascript.q,query__$1,sources);return cljs.core.into_array.call(null,(function (){var iter__4373__auto__ = ((function (query__$1,results){
return (function iter__156380(s__156381){return (new cljs.core.LazySeq(null,((function (query__$1,results){
return (function (){var s__156381__$1 = s__156381;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__156381__$1);if(temp__4126__auto__)
{var s__156381__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__156381__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__156381__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__156383 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__156382 = (0);while(true){
if((i__156382 < size__4372__auto__))
{var tuple = cljs.core._nth.call(null,c__4371__auto__,i__156382);cljs.core.chunk_append.call(null,b__156383,cljs.core.into_array.call(null,tuple));
{
var G__156384 = (i__156382 + (1));
i__156382 = G__156384;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__156383),iter__156380.call(null,cljs.core.chunk_rest.call(null,s__156381__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__156383),null);
}
} else
{var tuple = cljs.core.first.call(null,s__156381__$2);return cljs.core.cons.call(null,cljs.core.into_array.call(null,tuple),iter__156380.call(null,cljs.core.rest.call(null,s__156381__$2)));
}
} else
{return null;
}
break;
}
});})(query__$1,results))
,null,null));
});})(query__$1,results))
;return iter__4373__auto__.call(null,results);
})());
};
var q = function (query,var_args){
var sources = null;if (arguments.length > 1) {
  sources = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return q__delegate.call(this,query,sources);};
q.cljs$lang$maxFixedArity = 1;
q.cljs$lang$applyTo = (function (arglist__156385){
var query = cljs.core.first(arglist__156385);
var sources = cljs.core.rest(arglist__156385);
return q__delegate(query,sources);
});
q.cljs$core$IFn$_invoke$arity$variadic = q__delegate;
return q;
})()
;
goog.exportSymbol('datascript.js.q', datascript.js.q);
datascript.js.with_datoms = (function with_datoms(db,entities){return datascript.with$.call(null,db,datascript.js.entities__GT_clj.call(null,entities));
});
goog.exportSymbol('datascript.js.with_datoms', datascript.js.with_datoms);
datascript.js.entity = (function entity(db,eid){return datascript.js.entity__GT_js.call(null,datascript.entity.call(null,db,eid));
});
goog.exportSymbol('datascript.js.entity', datascript.js.entity);
/**
* @param {...*} var_args
*/
datascript.js.create_conn = (function() { 
var create_conn__delegate = function (p__156386){var vec__156388 = p__156386;var schema__$1 = cljs.core.nth.call(null,vec__156388,(0),null);return datascript.create_conn.call(null,datascript.js.schema__GT_clj.call(null,schema__$1));
};
var create_conn = function (var_args){
var p__156386 = null;if (arguments.length > 0) {
  p__156386 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return create_conn__delegate.call(this,p__156386);};
create_conn.cljs$lang$maxFixedArity = 0;
create_conn.cljs$lang$applyTo = (function (arglist__156389){
var p__156386 = cljs.core.seq(arglist__156389);
return create_conn__delegate(p__156386);
});
create_conn.cljs$core$IFn$_invoke$arity$variadic = create_conn__delegate;
return create_conn;
})()
;
goog.exportSymbol('datascript.js.create_conn', datascript.js.create_conn);
datascript.js.db = (function db(conn){return cljs.core.deref.call(null,conn);
});
goog.exportSymbol('datascript.js.db', datascript.js.db);
datascript.js.transact = (function transact(conn,entities){var entities__$1 = datascript.js.entities__GT_clj.call(null,entities);var report = datascript.js.tx_report__GT_js.call(null,datascript._transact_BANG_.call(null,conn,entities__$1));var seq__156396_156402 = cljs.core.seq.call(null,cljs.core.deref.call(null,new cljs.core.Keyword(null,"listeners","listeners",394544445).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn))));var chunk__156397_156403 = null;var count__156398_156404 = (0);var i__156399_156405 = (0);while(true){
if((i__156399_156405 < count__156398_156404))
{var vec__156400_156406 = cljs.core._nth.call(null,chunk__156397_156403,i__156399_156405);var __156407 = cljs.core.nth.call(null,vec__156400_156406,(0),null);var callback_156408 = cljs.core.nth.call(null,vec__156400_156406,(1),null);callback_156408.call(null,report);
{
var G__156409 = seq__156396_156402;
var G__156410 = chunk__156397_156403;
var G__156411 = count__156398_156404;
var G__156412 = (i__156399_156405 + (1));
seq__156396_156402 = G__156409;
chunk__156397_156403 = G__156410;
count__156398_156404 = G__156411;
i__156399_156405 = G__156412;
continue;
}
} else
{var temp__4126__auto___156413 = cljs.core.seq.call(null,seq__156396_156402);if(temp__4126__auto___156413)
{var seq__156396_156414__$1 = temp__4126__auto___156413;if(cljs.core.chunked_seq_QMARK_.call(null,seq__156396_156414__$1))
{var c__4404__auto___156415 = cljs.core.chunk_first.call(null,seq__156396_156414__$1);{
var G__156416 = cljs.core.chunk_rest.call(null,seq__156396_156414__$1);
var G__156417 = c__4404__auto___156415;
var G__156418 = cljs.core.count.call(null,c__4404__auto___156415);
var G__156419 = (0);
seq__156396_156402 = G__156416;
chunk__156397_156403 = G__156417;
count__156398_156404 = G__156418;
i__156399_156405 = G__156419;
continue;
}
} else
{var vec__156401_156420 = cljs.core.first.call(null,seq__156396_156414__$1);var __156421 = cljs.core.nth.call(null,vec__156401_156420,(0),null);var callback_156422 = cljs.core.nth.call(null,vec__156401_156420,(1),null);callback_156422.call(null,report);
{
var G__156423 = cljs.core.next.call(null,seq__156396_156414__$1);
var G__156424 = null;
var G__156425 = (0);
var G__156426 = (0);
seq__156396_156402 = G__156423;
chunk__156397_156403 = G__156424;
count__156398_156404 = G__156425;
i__156399_156405 = G__156426;
continue;
}
}
} else
{}
}
break;
}
return report;
});
goog.exportSymbol('datascript.js.transact', datascript.js.transact);
datascript.js.listen = datascript.listen_BANG_;
goog.exportSymbol('datascript.js.listen', datascript.js.listen);
datascript.js.unlisten = datascript.unlisten_BANG_;
goog.exportSymbol('datascript.js.unlisten', datascript.js.unlisten);
/**
* @param {...*} var_args
*/
datascript.js.datoms = (function() { 
var datoms__delegate = function (db,index,components){return cljs.core.into_array.call(null,cljs.core.map.call(null,datascript.js.datom__GT_js,cljs.core.apply.call(null,datascript.datoms,db,datascript.js.keywordize.call(null,index),components)));
};
var datoms = function (db,index,var_args){
var components = null;if (arguments.length > 2) {
  components = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return datoms__delegate.call(this,db,index,components);};
datoms.cljs$lang$maxFixedArity = 2;
datoms.cljs$lang$applyTo = (function (arglist__156427){
var db = cljs.core.first(arglist__156427);
arglist__156427 = cljs.core.next(arglist__156427);
var index = cljs.core.first(arglist__156427);
var components = cljs.core.rest(arglist__156427);
return datoms__delegate(db,index,components);
});
datoms.cljs$core$IFn$_invoke$arity$variadic = datoms__delegate;
return datoms;
})()
;
goog.exportSymbol('datascript.js.datoms', datascript.js.datoms);
/**
* @param {...*} var_args
*/
datascript.js.seek_datoms = (function() { 
var seek_datoms__delegate = function (db,index,components){return cljs.core.into_array.call(null,cljs.core.map.call(null,datascript.js.datom__GT_js,cljs.core.apply.call(null,datascript.seek_datoms,db,datascript.js.keywordize.call(null,index),components)));
};
var seek_datoms = function (db,index,var_args){
var components = null;if (arguments.length > 2) {
  components = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return seek_datoms__delegate.call(this,db,index,components);};
seek_datoms.cljs$lang$maxFixedArity = 2;
seek_datoms.cljs$lang$applyTo = (function (arglist__156428){
var db = cljs.core.first(arglist__156428);
arglist__156428 = cljs.core.next(arglist__156428);
var index = cljs.core.first(arglist__156428);
var components = cljs.core.rest(arglist__156428);
return seek_datoms__delegate(db,index,components);
});
seek_datoms.cljs$core$IFn$_invoke$arity$variadic = seek_datoms__delegate;
return seek_datoms;
})()
;
goog.exportSymbol('datascript.js.seek_datoms', datascript.js.seek_datoms);

//# sourceMappingURL=js.js.map