// Compiled by ClojureScript 0.0-2311
goog.provide('ewen.cle_usb.data');
goog.require('cljs.core');
goog.require('datascript');
goog.require('datascript');
ewen.cle_usb.data.load_app = (function load_app(){var conn = datascript.create_conn.call(null);datascript.transact_BANG_.call(null,conn,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("db","id","db/id",-1388397098),(-1),new cljs.core.Keyword("password","label","password/label",-806083889),"Password1",new cljs.core.Keyword("state","dragging","state/dragging",1965974580),false,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881),(0)], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword("db","id","db/id",-1388397098),(-2),new cljs.core.Keyword("password","label","password/label",-806083889),"Password2",new cljs.core.Keyword("state","dragging","state/dragging",1965974580),false,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881),(1)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),(-3),new cljs.core.Keyword("view","current","view/current",-1089414702),new cljs.core.Keyword(null,"home","home",-74557309)], null)], null));
return conn;
});
/**
* Return the only item from a query result
*/
ewen.cle_usb.data.only = (function() {
var only = null;
var only__1 = (function (query_result){if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,query_result)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"query-result","query-result",806887385,null))))))));
}
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,cljs.core.first.call(null,query_result))))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),(1),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),cljs.core.list(new cljs.core.Symbol(null,"first","first",996428481,null),new cljs.core.Symbol(null,"query-result","query-result",806887385,null)))))))));
}
return cljs.core.ffirst.call(null,query_result);
});
var only__2 = (function (query_result,default$){if(cljs.core._EQ_.call(null,(0),cljs.core.count.call(null,query_result)))
{return default$;
} else
{return only.call(null,query_result);
}
});
only = function(query_result,default$){
switch(arguments.length){
case 1:
return only__1.call(this,query_result);
case 2:
return only__2.call(this,query_result,default$);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
only.cljs$core$IFn$_invoke$arity$1 = only__1;
only.cljs$core$IFn$_invoke$arity$2 = only__2;
return only;
})()
;
ewen.cle_usb.data.maybe = (function (){if(typeof ewen.cle_usb.data.t149029 !== 'undefined')
{} else
{
/**
* @constructor
*/
ewen.cle_usb.data.t149029 = (function (meta149030){
this.meta149030 = meta149030;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393217;
})
ewen.cle_usb.data.t149029.cljs$lang$type = true;
ewen.cle_usb.data.t149029.cljs$lang$ctorStr = "ewen.cle-usb.data/t149029";
ewen.cle_usb.data.t149029.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"ewen.cle-usb.data/t149029");
});
ewen.cle_usb.data.t149029.prototype.datascript$IndexKeys$ = true;
ewen.cle_usb.data.t149029.prototype.datascript$IndexKeys$get_index_keys$arity$5 = (function (this$,conn,e,attr,if_not){var self__ = this;
var this$__$1 = this;return cljs.core.conj.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn], null),datascript.pattern__GT_index_keys.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,attr,null,null], null))));
});
ewen.cle_usb.data.t149029.prototype.call = (function (self__,db,e,attr,if_not){var self__ = this;
var self____$1 = this;var this$ = self____$1;var result = cljs.core.get.call(null,datascript.entity.call(null,db,e),attr);var or__3648__auto__ = result;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return if_not;
}
});
ewen.cle_usb.data.t149029.prototype.apply = (function (self__,args149032){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args149032)));
});
ewen.cle_usb.data.t149029.prototype.cljs$core$IFn$_invoke$arity$4 = (function (db,e,attr,if_not){var self__ = this;
var this$ = this;var result = cljs.core.get.call(null,datascript.entity.call(null,db,e),attr);var or__3648__auto__ = result;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return if_not;
}
});
ewen.cle_usb.data.t149029.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_149031){var self__ = this;
var _149031__$1 = this;return self__.meta149030;
});
ewen.cle_usb.data.t149029.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_149031,meta149030__$1){var self__ = this;
var _149031__$1 = this;return (new ewen.cle_usb.data.t149029(meta149030__$1));
});
ewen.cle_usb.data.__GT_t149029 = (function __GT_t149029(meta149030){return (new ewen.cle_usb.data.t149029(meta149030));
});
}
return (new ewen.cle_usb.data.t149029(null));
})();
ewen.cle_usb.data.get_list_passwords_STAR_ = (function (){if(typeof ewen.cle_usb.data.t149033 !== 'undefined')
{} else
{
/**
* @constructor
*/
ewen.cle_usb.data.t149033 = (function (meta149034){
this.meta149034 = meta149034;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393217;
})
ewen.cle_usb.data.t149033.cljs$lang$type = true;
ewen.cle_usb.data.t149033.cljs$lang$ctorStr = "ewen.cle-usb.data/t149033";
ewen.cle_usb.data.t149033.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"ewen.cle-usb.data/t149033");
});
ewen.cle_usb.data.t149033.prototype.datascript$IndexKeys$ = true;
ewen.cle_usb.data.t149033.prototype.datascript$IndexKeys$get_index_keys$arity$2 = (function (_,data){var self__ = this;
var ___$1 = this;return datascript.analyze_calls__GT_index_keys.call(null,datascript.analyze_q.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword(null,"in","in",-1531184865),new cljs.core.Symbol(null,"$","$",-1580747756,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword("password","label","password/label",-806083889),new cljs.core.Symbol(null,"?label","?label",-288705390,null)], null)], null),data));
});
ewen.cle_usb.data.t149033.prototype.call = (function (self__,data){var self__ = this;
var self____$1 = this;var _ = self____$1;return datascript.q.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword(null,"in","in",-1531184865),new cljs.core.Symbol(null,"$","$",-1580747756,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword("password","label","password/label",-806083889),new cljs.core.Symbol(null,"?label","?label",-288705390,null)], null)], null),data);
});
ewen.cle_usb.data.t149033.prototype.apply = (function (self__,args149036){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args149036)));
});
ewen.cle_usb.data.t149033.prototype.cljs$core$IFn$_invoke$arity$1 = (function (data){var self__ = this;
var _ = this;return datascript.q.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword(null,"in","in",-1531184865),new cljs.core.Symbol(null,"$","$",-1580747756,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword("password","label","password/label",-806083889),new cljs.core.Symbol(null,"?label","?label",-288705390,null)], null)], null),data);
});
ewen.cle_usb.data.t149033.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_149035){var self__ = this;
var _149035__$1 = this;return self__.meta149034;
});
ewen.cle_usb.data.t149033.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_149035,meta149034__$1){var self__ = this;
var _149035__$1 = this;return (new ewen.cle_usb.data.t149033(meta149034__$1));
});
ewen.cle_usb.data.__GT_t149033 = (function __GT_t149033(meta149034){return (new ewen.cle_usb.data.t149033(meta149034));
});
}
return (new ewen.cle_usb.data.t149033(null));
})();
ewen.cle_usb.data.get_list_passwords = (function (){if(typeof ewen.cle_usb.data.t149037 !== 'undefined')
{} else
{
/**
* @constructor
*/
ewen.cle_usb.data.t149037 = (function (meta149038){
this.meta149038 = meta149038;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393217;
})
ewen.cle_usb.data.t149037.cljs$lang$type = true;
ewen.cle_usb.data.t149037.cljs$lang$ctorStr = "ewen.cle-usb.data/t149037";
ewen.cle_usb.data.t149037.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"ewen.cle-usb.data/t149037");
});
ewen.cle_usb.data.t149037.prototype.datascript$IndexKeys$ = true;
ewen.cle_usb.data.t149037.prototype.datascript$IndexKeys$get_index_keys$arity$2 = (function (this$,conn){var self__ = this;
var this$__$1 = this;return datascript.get_index_keys.call(null,ewen.cle_usb.data.get_list_passwords_STAR_,conn);
});
ewen.cle_usb.data.t149037.prototype.call = (function (self__,data){var self__ = this;
var self____$1 = this;var this$ = self____$1;return cljs.core.set.call(null,cljs.core.apply.call(null,cljs.core.concat,ewen.cle_usb.data.get_list_passwords_STAR_.call(null,data)));
});
ewen.cle_usb.data.t149037.prototype.apply = (function (self__,args149040){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args149040)));
});
ewen.cle_usb.data.t149037.prototype.cljs$core$IFn$_invoke$arity$1 = (function (data){var self__ = this;
var this$ = this;return cljs.core.set.call(null,cljs.core.apply.call(null,cljs.core.concat,ewen.cle_usb.data.get_list_passwords_STAR_.call(null,data)));
});
ewen.cle_usb.data.t149037.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_149039){var self__ = this;
var _149039__$1 = this;return self__.meta149038;
});
ewen.cle_usb.data.t149037.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_149039,meta149038__$1){var self__ = this;
var _149039__$1 = this;return (new ewen.cle_usb.data.t149037(meta149038__$1));
});
ewen.cle_usb.data.__GT_t149037 = (function __GT_t149037(meta149038){return (new ewen.cle_usb.data.t149037(meta149038));
});
}
return (new ewen.cle_usb.data.t149037(null));
})();
ewen.cle_usb.data.get_password_labels = (function get_password_labels(data){return cljs.core.set.call(null,cljs.core.map.call(null,cljs.core.first,datascript.q.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?label","?label",-288705390,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Keyword("password","label","password/label",-806083889),new cljs.core.Symbol(null,"?label","?label",-288705390,null)], null)], null),data)));
});
ewen.cle_usb.data.get_current_view = (function (){if(typeof ewen.cle_usb.data.t149041 !== 'undefined')
{} else
{
/**
* @constructor
*/
ewen.cle_usb.data.t149041 = (function (meta149042){
this.meta149042 = meta149042;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393217;
})
ewen.cle_usb.data.t149041.cljs$lang$type = true;
ewen.cle_usb.data.t149041.cljs$lang$ctorStr = "ewen.cle-usb.data/t149041";
ewen.cle_usb.data.t149041.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"ewen.cle-usb.data/t149041");
});
ewen.cle_usb.data.t149041.prototype.datascript$IndexKeys$ = true;
ewen.cle_usb.data.t149041.prototype.datascript$IndexKeys$get_index_keys$arity$2 = (function (_,data){var self__ = this;
var ___$1 = this;return datascript.analyze_calls__GT_index_keys.call(null,datascript.analyze_q.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?view","?view",-1050183581,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Keyword("view","current","view/current",-1089414702),new cljs.core.Symbol(null,"?view","?view",-1050183581,null)], null)], null),data));
});
ewen.cle_usb.data.t149041.prototype.call = (function (self__,data){var self__ = this;
var self____$1 = this;var _ = self____$1;return datascript.q.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?view","?view",-1050183581,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Keyword("view","current","view/current",-1089414702),new cljs.core.Symbol(null,"?view","?view",-1050183581,null)], null)], null),data);
});
ewen.cle_usb.data.t149041.prototype.apply = (function (self__,args149044){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args149044)));
});
ewen.cle_usb.data.t149041.prototype.cljs$core$IFn$_invoke$arity$1 = (function (data){var self__ = this;
var _ = this;return datascript.q.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?view","?view",-1050183581,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.Keyword("view","current","view/current",-1089414702),new cljs.core.Symbol(null,"?view","?view",-1050183581,null)], null)], null),data);
});
ewen.cle_usb.data.t149041.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_149043){var self__ = this;
var _149043__$1 = this;return self__.meta149042;
});
ewen.cle_usb.data.t149041.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_149043,meta149042__$1){var self__ = this;
var _149043__$1 = this;return (new ewen.cle_usb.data.t149041(meta149042__$1));
});
ewen.cle_usb.data.__GT_t149041 = (function __GT_t149041(meta149042){return (new ewen.cle_usb.data.t149041(meta149042));
});
}
return (new ewen.cle_usb.data.t149041(null));
})();
ewen.cle_usb.data.get_current_view_id = (function get_current_view_id(data){return ewen.cle_usb.data.only.call(null,datascript.q.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword("view","current","view/current",-1089414702)], null)], null),data));
});
ewen.cle_usb.data.set_pwd_label_BANG_ = (function set_pwd_label_BANG_(app,pwd_id,label){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),pwd_id,new cljs.core.Keyword("password","label","password/label",-806083889),label], null)], null));
});
ewen.cle_usb.data.get_pwd_list_id = (function get_pwd_list_id(data){return ewen.cle_usb.data.only.call(null,datascript.q.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword("passwords-list","chan","passwords-list/chan",-1485329504),new cljs.core.Symbol(null,"_","_",-1201019570,null)], null)], null),data));
});
ewen.cle_usb.data.get_pwd_list_chan = (function get_pwd_list_chan(data){return ewen.cle_usb.data.only.call(null,datascript.q.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?chan","?chan",-1361225172,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword("passwords-list","chan","passwords-list/chan",-1485329504),new cljs.core.Symbol(null,"?chan","?chan",-1361225172,null)], null)], null),data));
});
ewen.cle_usb.data.set_pwd_list_chan_BANG_ = (function set_pwd_list_chan_BANG_(app,chan){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),(-1),new cljs.core.Keyword("passwords-list","chan","passwords-list/chan",-1485329504),chan], null)], null));
});
ewen.cle_usb.data.set_attr_BANG_ = (function set_attr_BANG_(app,id,attr,val){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword("db","id","db/id",-1388397098),id,attr,val], true, false)], null));
});
ewen.cle_usb.data.retract_pwd_list_chan_BANG_ = (function retract_pwd_list_chan_BANG_(app){var id = ewen.cle_usb.data.get_pwd_list_id.call(null,cljs.core.deref.call(null,app));return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db.fn","retractAttribute","db.fn/retractAttribute",937402164),id,new cljs.core.Keyword("passwords-list","chan","passwords-list/chan",-1485329504)], null)], null));
});
ewen.cle_usb.data.get_ids_from = (function get_ids_from(db,from){return datascript.q.call(null,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"find","find",496279456),new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Symbol(null,"?index","?index",1513748092,null),new cljs.core.Keyword(null,"in","in",-1531184865),new cljs.core.Symbol(null,"$","$",-1580747756,null),new cljs.core.Symbol(null,"?from","?from",-1000809456,null),new cljs.core.Keyword(null,"where","where",-2044795965),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?id","?id",928433279,null),new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881),new cljs.core.Symbol(null,"?index","?index",1513748092,null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,">=",">=",1016916022,null),new cljs.core.Symbol(null,"?index","?index",1513748092,null),new cljs.core.Symbol(null,"?from","?from",-1000809456,null))], null)], null),db,from);
});
ewen.cle_usb.data.update_sort_indexes_from = (function update_sort_indexes_from(db,from,inc_or_dec){var ids_indexes = ewen.cle_usb.data.get_ids_from.call(null,db,from);return cljs.core.vec.call(null,(function (){var iter__4373__auto__ = ((function (ids_indexes){
return (function iter__149053(s__149054){return (new cljs.core.LazySeq(null,((function (ids_indexes){
return (function (){var s__149054__$1 = s__149054;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__149054__$1);if(temp__4126__auto__)
{var s__149054__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__149054__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__149054__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__149056 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__149055 = (0);while(true){
if((i__149055 < size__4372__auto__))
{var vec__149059 = cljs.core._nth.call(null,c__4371__auto__,i__149055);var id = cljs.core.nth.call(null,vec__149059,(0),null);var index = cljs.core.nth.call(null,vec__149059,(1),null);cljs.core.chunk_append.call(null,b__149056,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),id,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881),inc_or_dec.call(null,index)], null));
{
var G__149061 = (i__149055 + (1));
i__149055 = G__149061;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__149056),iter__149053.call(null,cljs.core.chunk_rest.call(null,s__149054__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__149056),null);
}
} else
{var vec__149060 = cljs.core.first.call(null,s__149054__$2);var id = cljs.core.nth.call(null,vec__149060,(0),null);var index = cljs.core.nth.call(null,vec__149060,(1),null);return cljs.core.cons.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),id,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881),inc_or_dec.call(null,index)], null),iter__149053.call(null,cljs.core.rest.call(null,s__149054__$2)));
}
} else
{return null;
}
break;
}
});})(ids_indexes))
,null,null));
});})(ids_indexes))
;return iter__4373__auto__.call(null,ids_indexes);
})());
});
ewen.cle_usb.data.add_password_BANG_ = (function add_password_BANG_(app,label,index){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("db","id","db/id",-1388397098),(-1),new cljs.core.Keyword("password","label","password/label",-806083889),label,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881),index], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db.fn","call","db.fn/call",-151594418),ewen.cle_usb.data.update_sort_indexes_from,index,cljs.core.inc], null)], null));
});
ewen.cle_usb.data.update_sort_indexes_rem = (function update_sort_indexes_rem(db,id){var from = new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,id));return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db.fn","call","db.fn/call",-151594418),ewen.cle_usb.data.update_sort_indexes_from,(from + (1)),cljs.core.dec], null)], null);
});
ewen.cle_usb.data.rem_password_BANG_ = (function rem_password_BANG_(app,id){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db.fn","retractEntity","db.fn/retractEntity",-1423535441),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db.fn","call","db.fn/call",-151594418),ewen.cle_usb.data.update_sort_indexes_rem,id], null)], null));
});
ewen.cle_usb.data.get_new_pwd_label = (function (){if(typeof ewen.cle_usb.data.t149062 !== 'undefined')
{} else
{
/**
* @constructor
*/
ewen.cle_usb.data.t149062 = (function (meta149063){
this.meta149063 = meta149063;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393217;
})
ewen.cle_usb.data.t149062.cljs$lang$type = true;
ewen.cle_usb.data.t149062.cljs$lang$ctorStr = "ewen.cle-usb.data/t149062";
ewen.cle_usb.data.t149062.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"ewen.cle-usb.data/t149062");
});
ewen.cle_usb.data.t149062.prototype.datascript$IndexKeys$ = true;
ewen.cle_usb.data.t149062.prototype.datascript$IndexKeys$get_index_keys$arity$3 = (function (this$,db,id){var self__ = this;
var this$__$1 = this;return cljs.core.conj.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [db], null),datascript.pattern__GT_index_keys.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword("new-password","label","new-password/label",1663661660),null,null], null))));
});
ewen.cle_usb.data.t149062.prototype.call = (function (self__,db,id){var self__ = this;
var self____$1 = this;var this$ = self____$1;var label = cljs.core.get.call(null,datascript.entity.call(null,db,id),new cljs.core.Keyword("new-password","label","new-password/label",1663661660));var or__3648__auto__ = label;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return "";
}
});
ewen.cle_usb.data.t149062.prototype.apply = (function (self__,args149065){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args149065)));
});
ewen.cle_usb.data.t149062.prototype.cljs$core$IFn$_invoke$arity$2 = (function (db,id){var self__ = this;
var this$ = this;var label = cljs.core.get.call(null,datascript.entity.call(null,db,id),new cljs.core.Keyword("new-password","label","new-password/label",1663661660));var or__3648__auto__ = label;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return "";
}
});
ewen.cle_usb.data.t149062.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_149064){var self__ = this;
var _149064__$1 = this;return self__.meta149063;
});
ewen.cle_usb.data.t149062.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_149064,meta149063__$1){var self__ = this;
var _149064__$1 = this;return (new ewen.cle_usb.data.t149062(meta149063__$1));
});
ewen.cle_usb.data.__GT_t149062 = (function __GT_t149062(meta149063){return (new ewen.cle_usb.data.t149062(meta149063));
});
}
return (new ewen.cle_usb.data.t149062(null));
})();
ewen.cle_usb.data.get_new_pwd_value = (function (){if(typeof ewen.cle_usb.data.t149066 !== 'undefined')
{} else
{
/**
* @constructor
*/
ewen.cle_usb.data.t149066 = (function (meta149067){
this.meta149067 = meta149067;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393217;
})
ewen.cle_usb.data.t149066.cljs$lang$type = true;
ewen.cle_usb.data.t149066.cljs$lang$ctorStr = "ewen.cle-usb.data/t149066";
ewen.cle_usb.data.t149066.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"ewen.cle-usb.data/t149066");
});
ewen.cle_usb.data.t149066.prototype.datascript$IndexKeys$ = true;
ewen.cle_usb.data.t149066.prototype.datascript$IndexKeys$get_index_keys$arity$3 = (function (this$,db,id){var self__ = this;
var this$__$1 = this;return cljs.core.conj.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [db], null),datascript.pattern__GT_index_keys.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword("new-password","value","new-password/value",-409975903),null,null], null))));
});
ewen.cle_usb.data.t149066.prototype.call = (function (self__,db,id){var self__ = this;
var self____$1 = this;var this$ = self____$1;var label = cljs.core.get.call(null,datascript.entity.call(null,db,id),new cljs.core.Keyword("new-password","value","new-password/value",-409975903));var or__3648__auto__ = label;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return "";
}
});
ewen.cle_usb.data.t149066.prototype.apply = (function (self__,args149069){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args149069)));
});
ewen.cle_usb.data.t149066.prototype.cljs$core$IFn$_invoke$arity$2 = (function (db,id){var self__ = this;
var this$ = this;var label = cljs.core.get.call(null,datascript.entity.call(null,db,id),new cljs.core.Keyword("new-password","value","new-password/value",-409975903));var or__3648__auto__ = label;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return "";
}
});
ewen.cle_usb.data.t149066.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_149068){var self__ = this;
var _149068__$1 = this;return self__.meta149067;
});
ewen.cle_usb.data.t149066.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_149068,meta149067__$1){var self__ = this;
var _149068__$1 = this;return (new ewen.cle_usb.data.t149066(meta149067__$1));
});
ewen.cle_usb.data.__GT_t149066 = (function __GT_t149066(meta149067){return (new ewen.cle_usb.data.t149066(meta149067));
});
}
return (new ewen.cle_usb.data.t149066(null));
})();
ewen.cle_usb.data.get_new_pwd_button_enabled = (function (){if(typeof ewen.cle_usb.data.t149070 !== 'undefined')
{} else
{
/**
* @constructor
*/
ewen.cle_usb.data.t149070 = (function (meta149071){
this.meta149071 = meta149071;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393217;
})
ewen.cle_usb.data.t149070.cljs$lang$type = true;
ewen.cle_usb.data.t149070.cljs$lang$ctorStr = "ewen.cle-usb.data/t149070";
ewen.cle_usb.data.t149070.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"ewen.cle-usb.data/t149070");
});
ewen.cle_usb.data.t149070.prototype.datascript$IndexKeys$ = true;
ewen.cle_usb.data.t149070.prototype.datascript$IndexKeys$get_index_keys$arity$3 = (function (this$,db,id){var self__ = this;
var this$__$1 = this;return cljs.core.conj.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [db], null),datascript.pattern__GT_index_keys.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword("new-password","button-enabled","new-password/button-enabled",-1319323827),null,null], null))));
});
ewen.cle_usb.data.t149070.prototype.call = (function (self__,db,id){var self__ = this;
var self____$1 = this;var this$ = self____$1;var label = cljs.core.get.call(null,datascript.entity.call(null,db,id),new cljs.core.Keyword("new-password","button-enabled","new-password/button-enabled",-1319323827));var or__3648__auto__ = label;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return false;
}
});
ewen.cle_usb.data.t149070.prototype.apply = (function (self__,args149073){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args149073)));
});
ewen.cle_usb.data.t149070.prototype.cljs$core$IFn$_invoke$arity$2 = (function (db,id){var self__ = this;
var this$ = this;var label = cljs.core.get.call(null,datascript.entity.call(null,db,id),new cljs.core.Keyword("new-password","button-enabled","new-password/button-enabled",-1319323827));var or__3648__auto__ = label;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return false;
}
});
ewen.cle_usb.data.t149070.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_149072){var self__ = this;
var _149072__$1 = this;return self__.meta149071;
});
ewen.cle_usb.data.t149070.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_149072,meta149071__$1){var self__ = this;
var _149072__$1 = this;return (new ewen.cle_usb.data.t149070(meta149071__$1));
});
ewen.cle_usb.data.__GT_t149070 = (function __GT_t149070(meta149071){return (new ewen.cle_usb.data.t149070(meta149071));
});
}
return (new ewen.cle_usb.data.t149070(null));
})();

//# sourceMappingURL=data.js.map