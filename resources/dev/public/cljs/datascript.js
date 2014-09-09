// Compiled by ClojureScript 0.0-2311
goog.provide('datascript');
goog.require('cljs.core');
goog.require('datascript.analyze');
goog.require('clojure.set');
goog.require('datascript.query');
goog.require('datascript.btset');
goog.require('datascript.analyze');
goog.require('datascript.core');
goog.require('datascript.core');
goog.require('clojure.set');
goog.require('datascript.btset');
goog.require('datascript.query');
goog.require('clojure.data');
datascript.q = datascript.query.q;
datascript.analyze_q = datascript.analyze.analyze_q;
datascript.entity = (function entity(db,eid){var temp__4126__auto__ = cljs.core.not_empty.call(null,datascript.core._search.call(null,db,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [eid], null)));if(cljs.core.truth_(temp__4126__auto__))
{var datoms = temp__4126__auto__;return cljs.core.reduce.call(null,((function (datoms,temp__4126__auto__){
return (function (entity__$1,datom){var a = datom.a;var v = datom.v;if(datascript.core.multival_QMARK_.call(null,db,datom.a))
{return cljs.core.update_in.call(null,entity__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [a], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),v);
} else
{return cljs.core.assoc.call(null,entity__$1,a,v);
}
});})(datoms,temp__4126__auto__))
,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("db","id","db/id",-1388397098),eid], null),datoms);
} else
{return null;
}
});
datascript.tx0 = (536870912);
/**
* @param {...*} var_args
*/
datascript.empty_db = (function() { 
var empty_db__delegate = function (p__155959){var vec__155961 = p__155959;var schema__$1 = cljs.core.nth.call(null,vec__155961,(0),null);return (new datascript.core.DB(schema__$1,datascript.btset.btset_by.call(null,datascript.core.cmp_datoms_eavt),datascript.btset.btset_by.call(null,datascript.core.cmp_datoms_aevt),datascript.btset.btset_by.call(null,datascript.core.cmp_datoms_avet),(0),datascript.tx0));
};
var empty_db = function (var_args){
var p__155959 = null;if (arguments.length > 0) {
  p__155959 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return empty_db__delegate.call(this,p__155959);};
empty_db.cljs$lang$maxFixedArity = 0;
empty_db.cljs$lang$applyTo = (function (arglist__155962){
var p__155959 = cljs.core.seq(arglist__155962);
return empty_db__delegate(p__155959);
});
empty_db.cljs$core$IFn$_invoke$arity$variadic = empty_db__delegate;
return empty_db;
})()
;
/**
* @param {...*} var_args
*/
datascript.create_conn = (function() { 
var create_conn__delegate = function (p__155963){var vec__155965 = p__155963;var schema__$1 = cljs.core.nth.call(null,vec__155965,(0),null);return cljs.core.atom.call(null,datascript.empty_db.call(null,schema__$1),new cljs.core.Keyword(null,"meta","meta",1499536964),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"listeners","listeners",394544445),cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY)], null));
};
var create_conn = function (var_args){
var p__155963 = null;if (arguments.length > 0) {
  p__155963 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return create_conn__delegate.call(this,p__155963);};
create_conn.cljs$lang$maxFixedArity = 0;
create_conn.cljs$lang$applyTo = (function (arglist__155966){
var p__155963 = cljs.core.seq(arglist__155966);
return create_conn__delegate(p__155963);
});
create_conn.cljs$core$IFn$_invoke$arity$variadic = create_conn__delegate;
return create_conn;
})()
;
datascript.transact = (function transact(db,entities){return datascript.core.transact_entities.call(null,(new datascript.core.TxReport(db,db,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY)),entities);
});
datascript.with$ = (function with$(db,entities){return new cljs.core.Keyword(null,"db-after","db-after",-571884666).cljs$core$IFn$_invoke$arity$1(datascript.transact.call(null,db,entities));
});
datascript._transact_BANG_ = (function _transact_BANG_(conn,entities){var report = cljs.core.atom.call(null,null);cljs.core.swap_BANG_.call(null,conn,((function (report){
return (function (db){var r = datascript.transact.call(null,db,entities);cljs.core.reset_BANG_.call(null,report,r);
return new cljs.core.Keyword(null,"db-after","db-after",-571884666).cljs$core$IFn$_invoke$arity$1(r);
});})(report))
);
return cljs.core.deref.call(null,report);
});
datascript.IPublish = (function (){var obj155968 = {};return obj155968;
})();
datascript.publish = (function publish(this$,report){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IPublish$publish$arity$2;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IPublish$publish$arity$2(this$,report);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.publish[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.publish["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IPublish.publish",this$);
}
}
})().call(null,this$,report);
}
});
(datascript.IPublish["function"] = true);
(datascript.publish["function"] = (function (this$,report){return this$.call(null,report);
}));
datascript.pattern__GT_index_keys = (function pattern__GT_index_keys(p__155969){var vec__155971 = p__155969;var e = cljs.core.nth.call(null,vec__155971,(0),null);var a = cljs.core.nth.call(null,vec__155971,(1),null);var v = cljs.core.nth.call(null,vec__155971,(2),null);var tx = cljs.core.nth.call(null,vec__155971,(3),null);var added = cljs.core.nth.call(null,vec__155971,(4),null);var pattern = vec__155971;if(cljs.core.truth_(e))
{if(cljs.core.truth_(a))
{if(cljs.core.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e,a,v], null);
} else
{return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e,a,v], null);
}
} else
{if(cljs.core.truth_(tx))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e,a], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e,a], null);
}
}
} else
{if(cljs.core.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e], null);
}
} else
{if(cljs.core.truth_(tx))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e], null);
}
}
}
} else
{if(cljs.core.truth_(a))
{if(cljs.core.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"avet","avet",1383857032),a,v], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"avet","avet",1383857032),a,v], null);
}
} else
{if(cljs.core.truth_(tx))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"avet","avet",1383857032),a], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"avet","avet",1383857032),a], null);
}
}
} else
{if(cljs.core.some_QMARK_.call(null,v))
{if(cljs.core.truth_(tx))
{return cljs.core.PersistentVector.EMPTY;
} else
{return cljs.core.PersistentVector.EMPTY;
}
} else
{if(cljs.core.truth_(tx))
{return cljs.core.PersistentVector.EMPTY;
} else
{return cljs.core.PersistentVector.EMPTY;
}
}
}
}
});
datascript.datom__GT_index_keys = (function datom__GT_index_keys(p__155972){var map__155974 = p__155972;var map__155974__$1 = ((cljs.core.seq_QMARK_.call(null,map__155974))?cljs.core.apply.call(null,cljs.core.hash_map,map__155974):map__155974);var added = cljs.core.get.call(null,map__155974__$1,new cljs.core.Keyword(null,"added","added",2057651688));var t = cljs.core.get.call(null,map__155974__$1,new cljs.core.Keyword(null,"t","t",-1397832519));var v = cljs.core.get.call(null,map__155974__$1,new cljs.core.Keyword(null,"v","v",21465059));var a = cljs.core.get.call(null,map__155974__$1,new cljs.core.Keyword(null,"a","a",-2123407586));var e = cljs.core.get.call(null,map__155974__$1,new cljs.core.Keyword(null,"e","e",1381269198));return cljs.core.PersistentHashSet.fromArray([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"avet","avet",1383857032),a], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e,a,v], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"avet","avet",1383857032),a,v], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"eavt","eavt",-666437073),e,a], null)], true);
});
datascript.IndexKeys = (function (){var obj155976 = {};return obj155976;
})();
datascript.get_index_keys = (function() {
var get_index_keys = null;
var get_index_keys__1 = (function (this$){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$1;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$1(this$);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$);
}
});
var get_index_keys__2 = (function (this$,a){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$2;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$2(this$,a);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a);
}
});
var get_index_keys__3 = (function (this$,a,b){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$3;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$3(this$,a,b);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b);
}
});
var get_index_keys__4 = (function (this$,a,b,c){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$4;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$4(this$,a,b,c);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c);
}
});
var get_index_keys__5 = (function (this$,a,b,c,d){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$5;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$5(this$,a,b,c,d);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d);
}
});
var get_index_keys__6 = (function (this$,a,b,c,d,e){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$6;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$6(this$,a,b,c,d,e);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e);
}
});
var get_index_keys__7 = (function (this$,a,b,c,d,e,f){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$7;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$7(this$,a,b,c,d,e,f);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f);
}
});
var get_index_keys__8 = (function (this$,a,b,c,d,e,f,g){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$8;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$8(this$,a,b,c,d,e,f,g);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g);
}
});
var get_index_keys__9 = (function (this$,a,b,c,d,e,f,g,h){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$9;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$9(this$,a,b,c,d,e,f,g,h);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h);
}
});
var get_index_keys__10 = (function (this$,a,b,c,d,e,f,g,h,i){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$10;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$10(this$,a,b,c,d,e,f,g,h,i);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i);
}
});
var get_index_keys__11 = (function (this$,a,b,c,d,e,f,g,h,i,j){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$11;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$11(this$,a,b,c,d,e,f,g,h,i,j);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j);
}
});
var get_index_keys__12 = (function (this$,a,b,c,d,e,f,g,h,i,j,k){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$12;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$12(this$,a,b,c,d,e,f,g,h,i,j,k);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k);
}
});
var get_index_keys__13 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$13;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$13(this$,a,b,c,d,e,f,g,h,i,j,k,l);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l);
}
});
var get_index_keys__14 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$14;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$14(this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
}
});
var get_index_keys__15 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$15;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$15(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
}
});
var get_index_keys__16 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$16;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$16(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
}
});
var get_index_keys__17 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$17;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$17(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
}
});
var get_index_keys__18 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$18;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$18(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
}
});
var get_index_keys__19 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$19;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$19(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
}
});
var get_index_keys__20 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$20;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$20(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
}
});
var get_index_keys__21 = (function (this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){if((function (){var and__3636__auto__ = this$;if(and__3636__auto__)
{return this$.datascript$IndexKeys$get_index_keys$arity$21;
} else
{return and__3636__auto__;
}
})())
{return this$.datascript$IndexKeys$get_index_keys$arity$21(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
} else
{var x__4275__auto__ = (((this$ == null))?null:this$);return (function (){var or__3648__auto__ = (datascript.get_index_keys[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (datascript.get_index_keys["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IndexKeys.get-index-keys",this$);
}
}
})().call(null,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
});
get_index_keys = function(this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest){
switch(arguments.length){
case 1:
return get_index_keys__1.call(this,this$);
case 2:
return get_index_keys__2.call(this,this$,a);
case 3:
return get_index_keys__3.call(this,this$,a,b);
case 4:
return get_index_keys__4.call(this,this$,a,b,c);
case 5:
return get_index_keys__5.call(this,this$,a,b,c,d);
case 6:
return get_index_keys__6.call(this,this$,a,b,c,d,e);
case 7:
return get_index_keys__7.call(this,this$,a,b,c,d,e,f);
case 8:
return get_index_keys__8.call(this,this$,a,b,c,d,e,f,g);
case 9:
return get_index_keys__9.call(this,this$,a,b,c,d,e,f,g,h);
case 10:
return get_index_keys__10.call(this,this$,a,b,c,d,e,f,g,h,i);
case 11:
return get_index_keys__11.call(this,this$,a,b,c,d,e,f,g,h,i,j);
case 12:
return get_index_keys__12.call(this,this$,a,b,c,d,e,f,g,h,i,j,k);
case 13:
return get_index_keys__13.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l);
case 14:
return get_index_keys__14.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m);
case 15:
return get_index_keys__15.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n);
case 16:
return get_index_keys__16.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o);
case 17:
return get_index_keys__17.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p);
case 18:
return get_index_keys__18.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q);
case 19:
return get_index_keys__19.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s);
case 20:
return get_index_keys__20.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t);
case 21:
return get_index_keys__21.call(this,this$,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s,t,rest);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_index_keys.cljs$core$IFn$_invoke$arity$1 = get_index_keys__1;
get_index_keys.cljs$core$IFn$_invoke$arity$2 = get_index_keys__2;
get_index_keys.cljs$core$IFn$_invoke$arity$3 = get_index_keys__3;
get_index_keys.cljs$core$IFn$_invoke$arity$4 = get_index_keys__4;
get_index_keys.cljs$core$IFn$_invoke$arity$5 = get_index_keys__5;
get_index_keys.cljs$core$IFn$_invoke$arity$6 = get_index_keys__6;
get_index_keys.cljs$core$IFn$_invoke$arity$7 = get_index_keys__7;
get_index_keys.cljs$core$IFn$_invoke$arity$8 = get_index_keys__8;
get_index_keys.cljs$core$IFn$_invoke$arity$9 = get_index_keys__9;
get_index_keys.cljs$core$IFn$_invoke$arity$10 = get_index_keys__10;
get_index_keys.cljs$core$IFn$_invoke$arity$11 = get_index_keys__11;
get_index_keys.cljs$core$IFn$_invoke$arity$12 = get_index_keys__12;
get_index_keys.cljs$core$IFn$_invoke$arity$13 = get_index_keys__13;
get_index_keys.cljs$core$IFn$_invoke$arity$14 = get_index_keys__14;
get_index_keys.cljs$core$IFn$_invoke$arity$15 = get_index_keys__15;
get_index_keys.cljs$core$IFn$_invoke$arity$16 = get_index_keys__16;
get_index_keys.cljs$core$IFn$_invoke$arity$17 = get_index_keys__17;
get_index_keys.cljs$core$IFn$_invoke$arity$18 = get_index_keys__18;
get_index_keys.cljs$core$IFn$_invoke$arity$19 = get_index_keys__19;
get_index_keys.cljs$core$IFn$_invoke$arity$20 = get_index_keys__20;
get_index_keys.cljs$core$IFn$_invoke$arity$21 = get_index_keys__21;
return get_index_keys;
})()
;
datascript.analyze_calls__GT_index_keys = (function analyze_calls__GT_index_keys(p__155977){var map__155991 = p__155977;var map__155991__$1 = ((cljs.core.seq_QMARK_.call(null,map__155991))?cljs.core.apply.call(null,cljs.core.hash_map,map__155991):map__155991);var calls = cljs.core.get.call(null,map__155991__$1,new cljs.core.Keyword(null,"calls","calls",-433802344));var index_keys = cljs.core.get.call(null,map__155991__$1,new cljs.core.Keyword(null,"index-keys","index-keys",-43183086));var calls_index_keys = (function (){var iter__4373__auto__ = ((function (map__155991,map__155991__$1,calls,index_keys){
return (function iter__155992(s__155993){return (new cljs.core.LazySeq(null,((function (map__155991,map__155991__$1,calls,index_keys){
return (function (){var s__155993__$1 = s__155993;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__155993__$1);if(temp__4126__auto__)
{var s__155993__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__155993__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__155993__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__155995 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__155994 = (0);while(true){
if((i__155994 < size__4372__auto__))
{var vec__156000 = cljs.core._nth.call(null,c__4371__auto__,i__155994);var fct = cljs.core.nth.call(null,vec__156000,(0),null);var params = cljs.core.nthnext.call(null,vec__156000,(1));cljs.core.chunk_append.call(null,b__155995,(((function (){var G__156001 = fct;if(G__156001)
{var bit__4291__auto__ = null;if(cljs.core.truth_((function (){var or__3648__auto__ = bit__4291__auto__;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return G__156001.datascript$IndexKeys$;
}
})()))
{return true;
} else
{return false;
}
} else
{return false;
}
})())?cljs.core.apply.call(null,datascript.get_index_keys,fct,params):null));
{
var G__156004 = (i__155994 + (1));
i__155994 = G__156004;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__155995),iter__155992.call(null,cljs.core.chunk_rest.call(null,s__155993__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__155995),null);
}
} else
{var vec__156002 = cljs.core.first.call(null,s__155993__$2);var fct = cljs.core.nth.call(null,vec__156002,(0),null);var params = cljs.core.nthnext.call(null,vec__156002,(1));return cljs.core.cons.call(null,(((function (){var G__156003 = fct;if(G__156003)
{var bit__4291__auto__ = null;if(cljs.core.truth_((function (){var or__3648__auto__ = bit__4291__auto__;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return G__156003.datascript$IndexKeys$;
}
})()))
{return true;
} else
{return false;
}
} else
{return false;
}
})())?cljs.core.apply.call(null,datascript.get_index_keys,fct,params):null),iter__155992.call(null,cljs.core.rest.call(null,s__155993__$2)));
}
} else
{return null;
}
break;
}
});})(map__155991,map__155991__$1,calls,index_keys))
,null,null));
});})(map__155991,map__155991__$1,calls,index_keys))
;return iter__4373__auto__.call(null,calls);
})();return cljs.core.apply.call(null,clojure.set.union,cljs.core.conj.call(null,calls_index_keys,index_keys));
});
datascript.transact_BANG_ = (function transact_BANG_(conn,entities){var report = datascript._transact_BANG_.call(null,conn,entities);var listeners_156021 = new cljs.core.Keyword(null,"listeners","listeners",394544445).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn));if(cljs.core.truth_(cljs.core.not_empty.call(null,new cljs.core.Keyword(null,"callbacks->index-keys","callbacks->index-keys",1094686370).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,listeners_156021)))))
{var tx_index_keys_156022 = cljs.core.reduce.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,datascript.datom__GT_index_keys,new cljs.core.Keyword(null,"tx-data","tx-data",934159761).cljs$core$IFn$_invoke$arity$1(report)));var all_index_keys_callbacks_156023 = new cljs.core.Keyword(null,"all-index-keys","all-index-keys",-533899923).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"index-keys->callbacks","index-keys->callbacks",-287996452).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,listeners_156021)));var all_callbacks_156024 = cljs.core.atom.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,all_index_keys_callbacks_156023));var seq__156013_156025 = cljs.core.seq.call(null,tx_index_keys_156022);var chunk__156014_156026 = null;var count__156015_156027 = (0);var i__156016_156028 = (0);while(true){
if((i__156016_156028 < count__156015_156027))
{var single_index_keys_156029 = cljs.core._nth.call(null,chunk__156014_156026,i__156016_156028);var temp__4126__auto___156030 = cljs.core.get.call(null,new cljs.core.Keyword(null,"index-keys->callbacks","index-keys->callbacks",-287996452).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,listeners_156021)),single_index_keys_156029);if(cljs.core.truth_(temp__4126__auto___156030))
{var callbacks_156031 = temp__4126__auto___156030;cljs.core.swap_BANG_.call(null,all_callbacks_156024,cljs.core.into,callbacks_156031);
} else
{}
{
var G__156032 = seq__156013_156025;
var G__156033 = chunk__156014_156026;
var G__156034 = count__156015_156027;
var G__156035 = (i__156016_156028 + (1));
seq__156013_156025 = G__156032;
chunk__156014_156026 = G__156033;
count__156015_156027 = G__156034;
i__156016_156028 = G__156035;
continue;
}
} else
{var temp__4126__auto___156036 = cljs.core.seq.call(null,seq__156013_156025);if(temp__4126__auto___156036)
{var seq__156013_156037__$1 = temp__4126__auto___156036;if(cljs.core.chunked_seq_QMARK_.call(null,seq__156013_156037__$1))
{var c__4404__auto___156038 = cljs.core.chunk_first.call(null,seq__156013_156037__$1);{
var G__156039 = cljs.core.chunk_rest.call(null,seq__156013_156037__$1);
var G__156040 = c__4404__auto___156038;
var G__156041 = cljs.core.count.call(null,c__4404__auto___156038);
var G__156042 = (0);
seq__156013_156025 = G__156039;
chunk__156014_156026 = G__156040;
count__156015_156027 = G__156041;
i__156016_156028 = G__156042;
continue;
}
} else
{var single_index_keys_156043 = cljs.core.first.call(null,seq__156013_156037__$1);var temp__4126__auto___156044__$1 = cljs.core.get.call(null,new cljs.core.Keyword(null,"index-keys->callbacks","index-keys->callbacks",-287996452).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,listeners_156021)),single_index_keys_156043);if(cljs.core.truth_(temp__4126__auto___156044__$1))
{var callbacks_156045 = temp__4126__auto___156044__$1;cljs.core.swap_BANG_.call(null,all_callbacks_156024,cljs.core.into,callbacks_156045);
} else
{}
{
var G__156046 = cljs.core.next.call(null,seq__156013_156037__$1);
var G__156047 = null;
var G__156048 = (0);
var G__156049 = (0);
seq__156013_156025 = G__156046;
chunk__156014_156026 = G__156047;
count__156015_156027 = G__156048;
i__156016_156028 = G__156049;
continue;
}
}
} else
{}
}
break;
}
var seq__156017_156050 = cljs.core.seq.call(null,cljs.core.deref.call(null,all_callbacks_156024));var chunk__156018_156051 = null;var count__156019_156052 = (0);var i__156020_156053 = (0);while(true){
if((i__156020_156053 < count__156019_156052))
{var callback_156054 = cljs.core._nth.call(null,chunk__156018_156051,i__156020_156053);datascript.publish.call(null,callback_156054,report);
{
var G__156055 = seq__156017_156050;
var G__156056 = chunk__156018_156051;
var G__156057 = count__156019_156052;
var G__156058 = (i__156020_156053 + (1));
seq__156017_156050 = G__156055;
chunk__156018_156051 = G__156056;
count__156019_156052 = G__156057;
i__156020_156053 = G__156058;
continue;
}
} else
{var temp__4126__auto___156059 = cljs.core.seq.call(null,seq__156017_156050);if(temp__4126__auto___156059)
{var seq__156017_156060__$1 = temp__4126__auto___156059;if(cljs.core.chunked_seq_QMARK_.call(null,seq__156017_156060__$1))
{var c__4404__auto___156061 = cljs.core.chunk_first.call(null,seq__156017_156060__$1);{
var G__156062 = cljs.core.chunk_rest.call(null,seq__156017_156060__$1);
var G__156063 = c__4404__auto___156061;
var G__156064 = cljs.core.count.call(null,c__4404__auto___156061);
var G__156065 = (0);
seq__156017_156050 = G__156062;
chunk__156018_156051 = G__156063;
count__156019_156052 = G__156064;
i__156020_156053 = G__156065;
continue;
}
} else
{var callback_156066 = cljs.core.first.call(null,seq__156017_156060__$1);datascript.publish.call(null,callback_156066,report);
{
var G__156067 = cljs.core.next.call(null,seq__156017_156060__$1);
var G__156068 = null;
var G__156069 = (0);
var G__156070 = (0);
seq__156017_156050 = G__156067;
chunk__156018_156051 = G__156068;
count__156019_156052 = G__156069;
i__156020_156053 = G__156070;
continue;
}
}
} else
{}
}
break;
}
} else
{}
return report;
});
datascript.clean_index_key__GT_callback = (function clean_index_key__GT_callback(listeners,index_key){if(cljs.core.empty_QMARK_.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"index-keys->callbacks","index-keys->callbacks",-287996452).cljs$core$IFn$_invoke$arity$1(listeners),index_key)))
{return cljs.core.update_in.call(null,listeners,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"index-keys->callbacks","index-keys->callbacks",-287996452)], null),cljs.core.dissoc,index_key);
} else
{return listeners;
}
});
datascript.rem_index_key__GT_callback = (function rem_index_key__GT_callback(listeners,index_key,callback){return datascript.clean_index_key__GT_callback.call(null,cljs.core.update_in.call(null,listeners,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"index-keys->callbacks","index-keys->callbacks",-287996452),index_key], null),cljs.core.disj,callback),index_key);
});
datascript.add_index_key__GT_callback = (function add_index_key__GT_callback(listeners,index_key,callback){return cljs.core.update_in.call(null,listeners,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"index-keys->callbacks","index-keys->callbacks",-287996452),index_key], null),cljs.core.comp.call(null,cljs.core.set,cljs.core.conj),callback);
});
datascript.rem_index_keys__GT_callback = (function rem_index_keys__GT_callback(listeners,index_keys,callback){return cljs.core.reduce.call(null,(function (p1__156071_SHARP_,p2__156072_SHARP_){return datascript.rem_index_key__GT_callback.call(null,p1__156071_SHARP_,p2__156072_SHARP_,callback);
}),listeners,index_keys);
});
datascript.add_index_keys__GT_callback = (function add_index_keys__GT_callback(listeners,index_keys,callback){return cljs.core.reduce.call(null,(function (p1__156073_SHARP_,p2__156074_SHARP_){return datascript.add_index_key__GT_callback.call(null,p1__156073_SHARP_,p2__156074_SHARP_,callback);
}),listeners,index_keys);
});
datascript.add_callback__GT_index_keys = (function add_callback__GT_index_keys(listeners,index_keys,callback){return cljs.core.assoc_in.call(null,listeners,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"callbacks->index-keys","callbacks->index-keys",1094686370),callback], null),index_keys);
});
datascript.rem_callback__GT_index_keys = (function rem_callback__GT_index_keys(listeners,callback){return cljs.core.update_in.call(null,listeners,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"callbacks->index-keys","callbacks->index-keys",1094686370)], null),cljs.core.dissoc,callback);
});
datascript.listen_BANG_ = (function() {
var listen_BANG_ = null;
var listen_BANG___2 = (function (conn,callback){var listeners = new cljs.core.Keyword(null,"listeners","listeners",394544445).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn));var index_keys = cljs.core.get.call(null,new cljs.core.Keyword(null,"callbacks->index-keys","callbacks->index-keys",1094686370).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,listeners)),callback);var rem_index_keys__GT_callback_fn = (cljs.core.truth_((function (){var and__3636__auto__ = index_keys;if(cljs.core.truth_(and__3636__auto__))
{return cljs.core.not_EQ_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"all-index-keys","all-index-keys",-533899923),null], null), null),index_keys);
} else
{return and__3636__auto__;
}
})())?((function (listeners,index_keys){
return (function (p1__156075_SHARP_){return datascript.rem_index_keys__GT_callback.call(null,p1__156075_SHARP_,index_keys,callback);
});})(listeners,index_keys))
:cljs.core.identity);var add_index_keys__GT_callback_fn = ((function (listeners,index_keys,rem_index_keys__GT_callback_fn){
return (function (p1__156076_SHARP_){return datascript.add_index_keys__GT_callback.call(null,p1__156076_SHARP_,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"all-index-keys","all-index-keys",-533899923),null], null), null),callback);
});})(listeners,index_keys,rem_index_keys__GT_callback_fn))
;var add_callback__GT_index_keys = ((function (listeners,index_keys,rem_index_keys__GT_callback_fn,add_index_keys__GT_callback_fn){
return (function (p1__156077_SHARP_){return datascript.add_callback__GT_index_keys.call(null,p1__156077_SHARP_,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"all-index-keys","all-index-keys",-533899923),null], null), null),callback);
});})(listeners,index_keys,rem_index_keys__GT_callback_fn,add_index_keys__GT_callback_fn))
;return cljs.core.swap_BANG_.call(null,listeners,cljs.core.comp.call(null,add_callback__GT_index_keys,add_index_keys__GT_callback_fn,rem_index_keys__GT_callback_fn));
});
var listen_BANG___3 = (function (conn,callback,index_keys){var listeners = new cljs.core.Keyword(null,"listeners","listeners",394544445).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn));var index_keys__$1 = cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.vec,cljs.core.rest),cljs.core.filter.call(null,((function (listeners){
return (function (p1__156078_SHARP_){return cljs.core._EQ_.call(null,conn,cljs.core.first.call(null,p1__156078_SHARP_));
});})(listeners))
,index_keys)));var old_index_keys = cljs.core.get.call(null,new cljs.core.Keyword(null,"callbacks->index-keys","callbacks->index-keys",1094686370).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,listeners)),callback);var diff_index_keys = clojure.data.diff.call(null,old_index_keys,index_keys__$1);var rem_index_keys = cljs.core.first.call(null,diff_index_keys);var add_index_keys = cljs.core.second.call(null,diff_index_keys);var rem_index_keys__GT_callback_fn = ((function (listeners,index_keys__$1,old_index_keys,diff_index_keys,rem_index_keys,add_index_keys){
return (function (p1__156079_SHARP_){return datascript.rem_index_keys__GT_callback.call(null,p1__156079_SHARP_,rem_index_keys,callback);
});})(listeners,index_keys__$1,old_index_keys,diff_index_keys,rem_index_keys,add_index_keys))
;var add_index_keys__GT_callback_fn = ((function (listeners,index_keys__$1,old_index_keys,diff_index_keys,rem_index_keys,add_index_keys,rem_index_keys__GT_callback_fn){
return (function (p1__156080_SHARP_){return datascript.add_index_keys__GT_callback.call(null,p1__156080_SHARP_,add_index_keys,callback);
});})(listeners,index_keys__$1,old_index_keys,diff_index_keys,rem_index_keys,add_index_keys,rem_index_keys__GT_callback_fn))
;var add_callback__GT_index_keys = ((function (listeners,index_keys__$1,old_index_keys,diff_index_keys,rem_index_keys,add_index_keys,rem_index_keys__GT_callback_fn,add_index_keys__GT_callback_fn){
return (function (p1__156081_SHARP_){return datascript.add_callback__GT_index_keys.call(null,p1__156081_SHARP_,index_keys__$1,callback);
});})(listeners,index_keys__$1,old_index_keys,diff_index_keys,rem_index_keys,add_index_keys,rem_index_keys__GT_callback_fn,add_index_keys__GT_callback_fn))
;return cljs.core.swap_BANG_.call(null,listeners,cljs.core.comp.call(null,add_callback__GT_index_keys,add_index_keys__GT_callback_fn,rem_index_keys__GT_callback_fn));
});
listen_BANG_ = function(conn,callback,index_keys){
switch(arguments.length){
case 2:
return listen_BANG___2.call(this,conn,callback);
case 3:
return listen_BANG___3.call(this,conn,callback,index_keys);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
listen_BANG_.cljs$core$IFn$_invoke$arity$2 = listen_BANG___2;
listen_BANG_.cljs$core$IFn$_invoke$arity$3 = listen_BANG___3;
return listen_BANG_;
})()
;
datascript.unlisten_BANG_ = (function unlisten_BANG_(conn,callback){var listeners = new cljs.core.Keyword(null,"listeners","listeners",394544445).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,conn));var old_index_keys = cljs.core.get.call(null,new cljs.core.Keyword(null,"callbacks->index-keys","callbacks->index-keys",1094686370).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,listeners)),callback);var rem_index_keys__GT_callback_fn = ((function (listeners,old_index_keys){
return (function (p1__156082_SHARP_){return datascript.rem_index_keys__GT_callback.call(null,p1__156082_SHARP_,old_index_keys,callback);
});})(listeners,old_index_keys))
;var rem_callback__GT_index_keys = ((function (listeners,old_index_keys,rem_index_keys__GT_callback_fn){
return (function (p1__156083_SHARP_){return datascript.rem_callback__GT_index_keys.call(null,p1__156083_SHARP_,callback);
});})(listeners,old_index_keys,rem_index_keys__GT_callback_fn))
;return cljs.core.swap_BANG_.call(null,listeners,cljs.core.comp.call(null,rem_callback__GT_index_keys,rem_index_keys__GT_callback_fn));
});
datascript.components__GT_pattern = (function components__GT_pattern(index,p__156084){var vec__156087 = p__156084;var c0 = cljs.core.nth.call(null,vec__156087,(0),null);var c1 = cljs.core.nth.call(null,vec__156087,(1),null);var c2 = cljs.core.nth.call(null,vec__156087,(2),null);var c3 = cljs.core.nth.call(null,vec__156087,(3),null);var G__156088 = (((index instanceof cljs.core.Keyword))?index.fqn:null);switch (G__156088) {
case "avet":
return (new datascript.core.Datom(c2,c0,c1,c3,null));

break;
case "aevt":
return (new datascript.core.Datom(c1,c0,c2,c3,null));

break;
case "eavt":
return (new datascript.core.Datom(c0,c1,c2,c3,null));

break;
default:
throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(index))));

}
});
/**
* @param {...*} var_args
*/
datascript.datoms = (function() { 
var datoms__delegate = function (db,index,cs){return datascript.btset.slice.call(null,cljs.core.get.call(null,db,index),datascript.components__GT_pattern.call(null,index,cs));
};
var datoms = function (db,index,var_args){
var cs = null;if (arguments.length > 2) {
  cs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return datoms__delegate.call(this,db,index,cs);};
datoms.cljs$lang$maxFixedArity = 2;
datoms.cljs$lang$applyTo = (function (arglist__156090){
var db = cljs.core.first(arglist__156090);
arglist__156090 = cljs.core.next(arglist__156090);
var index = cljs.core.first(arglist__156090);
var cs = cljs.core.rest(arglist__156090);
return datoms__delegate(db,index,cs);
});
datoms.cljs$core$IFn$_invoke$arity$variadic = datoms__delegate;
return datoms;
})()
;
/**
* @param {...*} var_args
*/
datascript.seek_datoms = (function() { 
var seek_datoms__delegate = function (db,index,cs){return datascript.btset.slice.call(null,cljs.core.get.call(null,db,index),datascript.components__GT_pattern.call(null,index,cs),(new datascript.core.Datom(null,null,null,null,null)));
};
var seek_datoms = function (db,index,var_args){
var cs = null;if (arguments.length > 2) {
  cs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return seek_datoms__delegate.call(this,db,index,cs);};
seek_datoms.cljs$lang$maxFixedArity = 2;
seek_datoms.cljs$lang$applyTo = (function (arglist__156091){
var db = cljs.core.first(arglist__156091);
arglist__156091 = cljs.core.next(arglist__156091);
var index = cljs.core.first(arglist__156091);
var cs = cljs.core.rest(arglist__156091);
return seek_datoms__delegate(db,index,cs);
});
seek_datoms.cljs$core$IFn$_invoke$arity$variadic = seek_datoms__delegate;
return seek_datoms;
})()
;
datascript.core.Datom.prototype.cljs$core$IPrintWithWriter$ = true;
datascript.core.Datom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (d,w,opts){var d__$1 = this;return cljs.core.pr_sequential_writer.call(null,w,cljs.core.pr_writer,"#datascript/Datom ["," ","]",opts,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [d__$1.e,d__$1.a,d__$1.v,d__$1.tx,d__$1.added], null));
});
datascript.datom_from_reader = (function datom_from_reader(p__156092){var vec__156094 = p__156092;var e = cljs.core.nth.call(null,vec__156094,(0),null);var a = cljs.core.nth.call(null,vec__156094,(1),null);var v = cljs.core.nth.call(null,vec__156094,(2),null);var tx = cljs.core.nth.call(null,vec__156094,(3),null);var added = cljs.core.nth.call(null,vec__156094,(4),null);return (new datascript.core.Datom(e,a,v,tx,added));
});
datascript.core.DB.prototype.cljs$core$IPrintWithWriter$ = true;
datascript.core.DB.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (db,w,opts){var db__$1 = this;cljs.core._write.call(null,w,"#datascript/DB {");
cljs.core._write.call(null,w,":schema ");
cljs.core.pr_writer.call(null,db__$1.schema,w,opts);
cljs.core._write.call(null,w,", :datoms ");
cljs.core.pr_sequential_writer.call(null,w,((function (db__$1){
return (function (d,w__$1,opts__$1){return cljs.core.pr_sequential_writer.call(null,w__$1,cljs.core.pr_writer,"["," ","]",opts__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [d.e,d.a,d.v,d.tx], null));
});})(db__$1))
,"["," ","]",opts,db__$1.eavt);
return cljs.core._write.call(null,w,"}");
});
datascript.db_from_reader = (function db_from_reader(p__156095){var map__156099 = p__156095;var map__156099__$1 = ((cljs.core.seq_QMARK_.call(null,map__156099))?cljs.core.apply.call(null,cljs.core.hash_map,map__156099):map__156099);var datoms = cljs.core.get.call(null,map__156099__$1,new cljs.core.Keyword(null,"datoms","datoms",-290874434));var schema__$1 = cljs.core.get.call(null,map__156099__$1,new cljs.core.Keyword(null,"schema","schema",-1582001791));var datoms__$1 = cljs.core.map.call(null,((function (map__156099,map__156099__$1,datoms,schema__$1){
return (function (p__156100){var vec__156101 = p__156100;var e = cljs.core.nth.call(null,vec__156101,(0),null);var a = cljs.core.nth.call(null,vec__156101,(1),null);var v = cljs.core.nth.call(null,vec__156101,(2),null);var tx = cljs.core.nth.call(null,vec__156101,(3),null);return (new datascript.core.Datom(e,a,v,tx,true));
});})(map__156099,map__156099__$1,datoms,schema__$1))
,datoms);return (new datascript.core.DB(schema__$1,cljs.core.apply.call(null,datascript.btset.btset_by,datascript.core.cmp_datoms_eavt,datoms__$1),cljs.core.apply.call(null,datascript.btset.btset_by,datascript.core.cmp_datoms_aevt,datoms__$1),cljs.core.apply.call(null,datascript.btset.btset_by,datascript.core.cmp_datoms_avet,datoms__$1),cljs.core.reduce.call(null,cljs.core.max,(0),cljs.core.map.call(null,new cljs.core.Keyword(null,"e","e",1381269198),datoms__$1)),cljs.core.reduce.call(null,cljs.core.max,datascript.tx0,cljs.core.map.call(null,new cljs.core.Keyword(null,"tx","tx",466630418),datoms__$1))));
});

//# sourceMappingURL=datascript.js.map