// Compiled by ClojureScript 0.0-2311
goog.provide('ewen.wreak.sortable');
goog.require('cljs.core');
goog.require('ewen.wreak');
goog.require('schema.core');
goog.require('schema.core');
goog.require('clojure.data');
goog.require('cljs.core.match');
goog.require('datascript');
goog.require('datascript');
goog.require('ewen.wreak');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
/**
* Return the only item from a query result
*/
ewen.wreak.sortable.only = (function() {
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
ewen.wreak.sortable.not_nil_QMARK_ = cljs.core.comp.call(null,cljs.core.not,cljs.core.nil_QMARK_);
ewen.wreak.sortable.sortable_replace_state_BANG_ = (function sortable_replace_state_BANG_(comp,new_state){return ewen.wreak.replace_state_BANG_.call(null,comp,cljs.core.merge.call(null,ewen.wreak.get_state.call(null,comp),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("ewen.wreak.sortable","sortable-state","ewen.wreak.sortable/sortable-state",-410588655),new_state], null)));
});
ewen.wreak.sortable.sortable_get_state = (function sortable_get_state(comp){return new cljs.core.Keyword("ewen.wreak.sortable","sortable-state","ewen.wreak.sortable/sortable-state",-410588655).cljs$core$IFn$_invoke$arity$1(ewen.wreak.get_state.call(null,comp));
});
/**
* Same as compare, but a nil value is 'more'
* than a non-nil value.
*/
ewen.wreak.sortable.compare_STAR_ = (function compare_STAR_(x,y){if(cljs.core.truth_((function (){var and__3636__auto__ = (x == null);if(and__3636__auto__)
{return ewen.wreak.sortable.not_nil_QMARK_.call(null,y);
} else
{return and__3636__auto__;
}
})()))
{return (1);
} else
{if(cljs.core.truth_((function (){var and__3636__auto__ = (y == null);if(and__3636__auto__)
{return ewen.wreak.sortable.not_nil_QMARK_.call(null,x);
} else
{return and__3636__auto__;
}
})()))
{return (-1);
} else
{return cljs.core.compare.call(null,x,y);

}
}
});
ewen.wreak.sortable.apply_pos_updates = (function apply_pos_updates(sort_state,updates){var sort_state__$1 = cljs.core.atom.call(null,sort_state);var seq__153799_153805 = cljs.core.seq.call(null,updates);var chunk__153800_153806 = null;var count__153801_153807 = (0);var i__153802_153808 = (0);while(true){
if((i__153802_153808 < count__153801_153807))
{var vec__153803_153809 = cljs.core._nth.call(null,chunk__153800_153806,i__153802_153808);var k_153810 = cljs.core.nth.call(null,vec__153803_153809,(0),null);var v_153811 = cljs.core.nth.call(null,vec__153803_153809,(1),null);if((v_153811 == null))
{cljs.core.swap_BANG_.call(null,sort_state__$1,cljs.core.dissoc,k_153810);
} else
{cljs.core.swap_BANG_.call(null,sort_state__$1,cljs.core.assoc_in,k_153810,v_153811);
}
{
var G__153812 = seq__153799_153805;
var G__153813 = chunk__153800_153806;
var G__153814 = count__153801_153807;
var G__153815 = (i__153802_153808 + (1));
seq__153799_153805 = G__153812;
chunk__153800_153806 = G__153813;
count__153801_153807 = G__153814;
i__153802_153808 = G__153815;
continue;
}
} else
{var temp__4126__auto___153816 = cljs.core.seq.call(null,seq__153799_153805);if(temp__4126__auto___153816)
{var seq__153799_153817__$1 = temp__4126__auto___153816;if(cljs.core.chunked_seq_QMARK_.call(null,seq__153799_153817__$1))
{var c__4404__auto___153818 = cljs.core.chunk_first.call(null,seq__153799_153817__$1);{
var G__153819 = cljs.core.chunk_rest.call(null,seq__153799_153817__$1);
var G__153820 = c__4404__auto___153818;
var G__153821 = cljs.core.count.call(null,c__4404__auto___153818);
var G__153822 = (0);
seq__153799_153805 = G__153819;
chunk__153800_153806 = G__153820;
count__153801_153807 = G__153821;
i__153802_153808 = G__153822;
continue;
}
} else
{var vec__153804_153823 = cljs.core.first.call(null,seq__153799_153817__$1);var k_153824 = cljs.core.nth.call(null,vec__153804_153823,(0),null);var v_153825 = cljs.core.nth.call(null,vec__153804_153823,(1),null);if((v_153825 == null))
{cljs.core.swap_BANG_.call(null,sort_state__$1,cljs.core.dissoc,k_153824);
} else
{cljs.core.swap_BANG_.call(null,sort_state__$1,cljs.core.assoc_in,k_153824,v_153825);
}
{
var G__153826 = cljs.core.next.call(null,seq__153799_153817__$1);
var G__153827 = null;
var G__153828 = (0);
var G__153829 = (0);
seq__153799_153805 = G__153826;
chunk__153800_153806 = G__153827;
count__153801_153807 = G__153828;
i__153802_153808 = G__153829;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"pos","pos",-864607220),cljs.core.val),ewen.wreak.sortable.compare_STAR_,cljs.core.deref.call(null,sort_state__$1)));
});
ewen.wreak.sortable.pos_callback = (function pos_callback(ids,p__153832){var map__153854 = p__153832;var map__153854__$1 = ((cljs.core.seq_QMARK_.call(null,map__153854))?cljs.core.apply.call(null,cljs.core.hash_map,map__153854):map__153854);var tx_data = cljs.core.get.call(null,map__153854__$1,new cljs.core.Keyword(null,"tx-data","tx-data",934159761));var updates = cljs.core.map.call(null,((function (map__153854,map__153854__$1,tx_data){
return (function (datom){try{if((function (){var G__153867 = datom;if(G__153867)
{var bit__4298__auto__ = (G__153867.cljs$lang$protocol_mask$partition0$ & (256));if((bit__4298__auto__) || (G__153867.cljs$core$ILookup$))
{return true;
} else
{if((!G__153867.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,G__153867);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,G__153867);
}
})())
{try{var datom_added__153863 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"added","added",2057651688),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if((datom_added__153863 === true))
{try{var datom_e__153864 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.truth_(((function (datom_e__153864,datom_added__153863,map__153854,map__153854__$1,tx_data){
return (function (id){return cljs.core.some.call(null,((function (datom_e__153864,datom_added__153863,map__153854,map__153854__$1,tx_data){
return (function (p1__153830_SHARP_){return cljs.core._EQ_.call(null,id,p1__153830_SHARP_);
});})(datom_e__153864,datom_added__153863,map__153854,map__153854__$1,tx_data))
,ids);
});})(datom_e__153864,datom_added__153863,map__153854,map__153854__$1,tx_data))
.call(null,datom_e__153864)))
{try{var datom_a__153865 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.keyword_identical_QMARK_.call(null,datom_a__153865,new cljs.core.Keyword("password","pos","password/pos",903909613)))
{try{var datom_v__153862 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.not_EQ_.call(null,datom_v__153862,new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780)))
{var new_pos = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"v","v",21465059));var id = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"e","e",1381269198));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword(null,"pos","pos",-864607220)], null),new_pos], null);
} else
{throw cljs.core.match.backtrack;

}
}catch (e153871){if((e153871 instanceof Error))
{var e__9939__auto__ = e153871;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153871;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153870){if((e153870 instanceof Error))
{var e__9939__auto__ = e153870;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153870;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153869){if((e153869 instanceof Error))
{var e__9939__auto__ = e153869;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153869;

}
}} else
{if((datom_added__153863 === false))
{try{var datom_e__153864 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.truth_(((function (datom_e__153864,datom_added__153863,map__153854,map__153854__$1,tx_data){
return (function (id){return cljs.core.some.call(null,((function (datom_e__153864,datom_added__153863,map__153854,map__153854__$1,tx_data){
return (function (p1__153831_SHARP_){return cljs.core._EQ_.call(null,id,p1__153831_SHARP_);
});})(datom_e__153864,datom_added__153863,map__153854,map__153854__$1,tx_data))
,ids);
});})(datom_e__153864,datom_added__153863,map__153854,map__153854__$1,tx_data))
.call(null,datom_e__153864)))
{try{var datom_a__153865 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.keyword_identical_QMARK_.call(null,datom_a__153865,new cljs.core.Keyword("password","pos","password/pos",903909613)))
{try{var datom_v__153862 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.not_EQ_.call(null,datom_v__153862,new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780)))
{var id = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"e","e",1381269198));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword(null,"pos","pos",-864607220)], null),null], null);
} else
{throw cljs.core.match.backtrack;

}
}catch (e153874){if((e153874 instanceof Error))
{var e__9939__auto__ = e153874;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153874;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153873){if((e153873 instanceof Error))
{var e__9939__auto__ = e153873;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153873;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153872){if((e153872 instanceof Error))
{var e__9939__auto__ = e153872;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153872;

}
}} else
{throw cljs.core.match.backtrack;

}
}
}catch (e153868){if((e153868 instanceof Error))
{var e__9939__auto__ = e153868;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153868;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153866){if((e153866 instanceof Error))
{var e__9939__auto__ = e153866;if((e__9939__auto__ === cljs.core.match.backtrack))
{return null;
} else
{throw e__9939__auto__;
}
} else
{throw e153866;

}
}});})(map__153854,map__153854__$1,tx_data))
,tx_data);return cljs.core.filter.call(null,ewen.wreak.sortable.not_nil_QMARK_,updates);
});
ewen.wreak.sortable.apply_index_updates = (function apply_index_updates(sort_state,updates){return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222),cljs.core.val),ewen.wreak.sortable.compare_STAR_,(function (){var G__153884 = updates;var vec__153885 = G__153884;var vec__153886 = cljs.core.nth.call(null,vec__153885,(0),null);var id = cljs.core.nth.call(null,vec__153886,(0),null);var new_sort_index = cljs.core.nth.call(null,vec__153886,(1),null);var r = cljs.core.nthnext.call(null,vec__153885,(1));var sort_state__$1 = sort_state;var G__153884__$1 = G__153884;var sort_state__$2 = sort_state__$1;while(true){
var vec__153887 = G__153884__$1;var vec__153888 = cljs.core.nth.call(null,vec__153887,(0),null);var id__$1 = cljs.core.nth.call(null,vec__153888,(0),null);var new_sort_index__$1 = cljs.core.nth.call(null,vec__153888,(1),null);var r__$1 = cljs.core.nthnext.call(null,vec__153887,(1));var sort_state__$3 = sort_state__$2;if(cljs.core.empty_QMARK_.call(null,r__$1))
{return cljs.core.assoc_in.call(null,sort_state__$3,id__$1,new_sort_index__$1);
} else
{{
var G__153889 = r__$1;
var G__153890 = cljs.core.assoc_in.call(null,sort_state__$3,id__$1,new_sort_index__$1);
G__153884__$1 = G__153889;
sort_state__$2 = G__153890;
continue;
}
}
break;
}
})()));
});
ewen.wreak.sortable.index_callback = (function index_callback(ids,p__153893){var map__153915 = p__153893;var map__153915__$1 = ((cljs.core.seq_QMARK_.call(null,map__153915))?cljs.core.apply.call(null,cljs.core.hash_map,map__153915):map__153915);var tx_data = cljs.core.get.call(null,map__153915__$1,new cljs.core.Keyword(null,"tx-data","tx-data",934159761));var updates = cljs.core.map.call(null,((function (map__153915,map__153915__$1,tx_data){
return (function (datom){try{if((function (){var G__153928 = datom;if(G__153928)
{var bit__4298__auto__ = (G__153928.cljs$lang$protocol_mask$partition0$ & (256));if((bit__4298__auto__) || (G__153928.cljs$core$ILookup$))
{return true;
} else
{if((!G__153928.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,G__153928);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,G__153928);
}
})())
{try{var datom_added__153924 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"added","added",2057651688),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if((datom_added__153924 === true))
{try{var datom_e__153925 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.truth_(((function (datom_e__153925,datom_added__153924,map__153915,map__153915__$1,tx_data){
return (function (id){return cljs.core.some.call(null,((function (datom_e__153925,datom_added__153924,map__153915,map__153915__$1,tx_data){
return (function (p1__153891_SHARP_){return cljs.core._EQ_.call(null,id,p1__153891_SHARP_);
});})(datom_e__153925,datom_added__153924,map__153915,map__153915__$1,tx_data))
,ids);
});})(datom_e__153925,datom_added__153924,map__153915,map__153915__$1,tx_data))
.call(null,datom_e__153925)))
{try{var datom_a__153926 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.keyword_identical_QMARK_.call(null,datom_a__153926,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881)))
{try{var datom_v__153923 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.not_EQ_.call(null,datom_v__153923,new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780)))
{var new_sort_index = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"v","v",21465059));var id = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"e","e",1381269198));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222)], null),new_sort_index], null);
} else
{throw cljs.core.match.backtrack;

}
}catch (e153932){if((e153932 instanceof Error))
{var e__9939__auto__ = e153932;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153932;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153931){if((e153931 instanceof Error))
{var e__9939__auto__ = e153931;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153931;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153930){if((e153930 instanceof Error))
{var e__9939__auto__ = e153930;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153930;

}
}} else
{if((datom_added__153924 === false))
{try{var datom_e__153925 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.truth_(((function (datom_e__153925,datom_added__153924,map__153915,map__153915__$1,tx_data){
return (function (id){return cljs.core.some.call(null,((function (datom_e__153925,datom_added__153924,map__153915,map__153915__$1,tx_data){
return (function (p1__153892_SHARP_){return cljs.core._EQ_.call(null,id,p1__153892_SHARP_);
});})(datom_e__153925,datom_added__153924,map__153915,map__153915__$1,tx_data))
,ids);
});})(datom_e__153925,datom_added__153924,map__153915,map__153915__$1,tx_data))
.call(null,datom_e__153925)))
{try{var datom_a__153926 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.keyword_identical_QMARK_.call(null,datom_a__153926,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881)))
{try{var datom_v__153923 = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));if(cljs.core.not_EQ_.call(null,datom_v__153923,new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780)))
{var id = cljs.core.get.call(null,datom,new cljs.core.Keyword(null,"e","e",1381269198));return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222)], null),null], null);
} else
{throw cljs.core.match.backtrack;

}
}catch (e153935){if((e153935 instanceof Error))
{var e__9939__auto__ = e153935;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153935;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153934){if((e153934 instanceof Error))
{var e__9939__auto__ = e153934;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153934;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153933){if((e153933 instanceof Error))
{var e__9939__auto__ = e153933;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153933;

}
}} else
{throw cljs.core.match.backtrack;

}
}
}catch (e153929){if((e153929 instanceof Error))
{var e__9939__auto__ = e153929;if((e__9939__auto__ === cljs.core.match.backtrack))
{throw cljs.core.match.backtrack;
} else
{throw e__9939__auto__;
}
} else
{throw e153929;

}
}} else
{throw cljs.core.match.backtrack;

}
}catch (e153927){if((e153927 instanceof Error))
{var e__9939__auto__ = e153927;if((e__9939__auto__ === cljs.core.match.backtrack))
{return null;
} else
{throw e__9939__auto__;
}
} else
{throw e153927;

}
}});})(map__153915,map__153915__$1,tx_data))
,tx_data);return cljs.core.filter.call(null,ewen.wreak.sortable.not_nil_QMARK_,updates);
});
ewen.wreak.sortable.pos__GT_index_keys_STAR_ = (function pos__GT_index_keys_STAR_(app,id){return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [app], null),datascript.pattern__GT_index_keys.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword("password","pos","password/pos",903909613),null,null], null)));
});
ewen.wreak.sortable.sort_index__GT_index_keys_STAR_ = (function sort_index__GT_index_keys_STAR_(app,id){return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [app], null),datascript.pattern__GT_index_keys.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881),null,null], null)));
});
ewen.wreak.sortable.pos__GT_index_keys = (function pos__GT_index_keys(app,ids){return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,cljs.core.partial.call(null,ewen.wreak.sortable.pos__GT_index_keys_STAR_,app),ids));
});
ewen.wreak.sortable.sort_index__GT_index_keys = (function sort_index__GT_index_keys(app,ids){return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,cljs.core.partial.call(null,ewen.wreak.sortable.sort_index__GT_index_keys_STAR_,app),ids));
});
/**
* Add all the ids to sort-state. The DB is used to retrieve the sort indexes
* and positions associated with each entity.
*/
ewen.wreak.sortable.sortable_add_ids = (function sortable_add_ids(sort_state,db,ids){var sort_state__$1 = cljs.core.atom.call(null,sort_state);var seq__153940_153944 = cljs.core.seq.call(null,ids);var chunk__153941_153945 = null;var count__153942_153946 = (0);var i__153943_153947 = (0);while(true){
if((i__153943_153947 < count__153942_153946))
{var id_153948 = cljs.core._nth.call(null,chunk__153941_153945,i__153943_153947);var pos_153949 = new cljs.core.Keyword("password","pos","password/pos",903909613).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,id_153948));if(cljs.core.truth_(ewen.wreak.sortable.not_nil_QMARK_.call(null,pos_153949)))
{cljs.core.swap_BANG_.call(null,sort_state__$1,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id_153948,new cljs.core.Keyword(null,"pos","pos",-864607220)], null),pos_153949);
} else
{}
{
var G__153950 = seq__153940_153944;
var G__153951 = chunk__153941_153945;
var G__153952 = count__153942_153946;
var G__153953 = (i__153943_153947 + (1));
seq__153940_153944 = G__153950;
chunk__153941_153945 = G__153951;
count__153942_153946 = G__153952;
i__153943_153947 = G__153953;
continue;
}
} else
{var temp__4126__auto___153954 = cljs.core.seq.call(null,seq__153940_153944);if(temp__4126__auto___153954)
{var seq__153940_153955__$1 = temp__4126__auto___153954;if(cljs.core.chunked_seq_QMARK_.call(null,seq__153940_153955__$1))
{var c__4404__auto___153956 = cljs.core.chunk_first.call(null,seq__153940_153955__$1);{
var G__153957 = cljs.core.chunk_rest.call(null,seq__153940_153955__$1);
var G__153958 = c__4404__auto___153956;
var G__153959 = cljs.core.count.call(null,c__4404__auto___153956);
var G__153960 = (0);
seq__153940_153944 = G__153957;
chunk__153941_153945 = G__153958;
count__153942_153946 = G__153959;
i__153943_153947 = G__153960;
continue;
}
} else
{var id_153961 = cljs.core.first.call(null,seq__153940_153955__$1);var pos_153962 = new cljs.core.Keyword("password","pos","password/pos",903909613).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,id_153961));if(cljs.core.truth_(ewen.wreak.sortable.not_nil_QMARK_.call(null,pos_153962)))
{cljs.core.swap_BANG_.call(null,sort_state__$1,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id_153961,new cljs.core.Keyword(null,"pos","pos",-864607220)], null),pos_153962);
} else
{}
{
var G__153963 = cljs.core.next.call(null,seq__153940_153955__$1);
var G__153964 = null;
var G__153965 = (0);
var G__153966 = (0);
seq__153940_153944 = G__153963;
chunk__153941_153945 = G__153964;
count__153942_153946 = G__153965;
i__153943_153947 = G__153966;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"pos","pos",-864607220),cljs.core.val),ewen.wreak.sortable.compare_STAR_,cljs.core.deref.call(null,sort_state__$1)));
});
ewen.wreak.sortable.comp_state_add_ids = (function comp_state_add_ids(state,db,ids){var sort_state = cljs.core.atom.call(null,state);var seq__153971_153975 = cljs.core.seq.call(null,ids);var chunk__153972_153976 = null;var count__153973_153977 = (0);var i__153974_153978 = (0);while(true){
if((i__153974_153978 < count__153973_153977))
{var id_153979 = cljs.core._nth.call(null,chunk__153972_153976,i__153974_153978);var index_153980 = new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,id_153979));cljs.core.swap_BANG_.call(null,sort_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id_153979,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222)], null),index_153980);
{
var G__153981 = seq__153971_153975;
var G__153982 = chunk__153972_153976;
var G__153983 = count__153973_153977;
var G__153984 = (i__153974_153978 + (1));
seq__153971_153975 = G__153981;
chunk__153972_153976 = G__153982;
count__153973_153977 = G__153983;
i__153974_153978 = G__153984;
continue;
}
} else
{var temp__4126__auto___153985 = cljs.core.seq.call(null,seq__153971_153975);if(temp__4126__auto___153985)
{var seq__153971_153986__$1 = temp__4126__auto___153985;if(cljs.core.chunked_seq_QMARK_.call(null,seq__153971_153986__$1))
{var c__4404__auto___153987 = cljs.core.chunk_first.call(null,seq__153971_153986__$1);{
var G__153988 = cljs.core.chunk_rest.call(null,seq__153971_153986__$1);
var G__153989 = c__4404__auto___153987;
var G__153990 = cljs.core.count.call(null,c__4404__auto___153987);
var G__153991 = (0);
seq__153971_153975 = G__153988;
chunk__153972_153976 = G__153989;
count__153973_153977 = G__153990;
i__153974_153978 = G__153991;
continue;
}
} else
{var id_153992 = cljs.core.first.call(null,seq__153971_153986__$1);var index_153993 = new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,id_153992));cljs.core.swap_BANG_.call(null,sort_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id_153992,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222)], null),index_153993);
{
var G__153994 = cljs.core.next.call(null,seq__153971_153986__$1);
var G__153995 = null;
var G__153996 = (0);
var G__153997 = (0);
seq__153971_153975 = G__153994;
chunk__153972_153976 = G__153995;
count__153973_153977 = G__153996;
i__153974_153978 = G__153997;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222),cljs.core.val),ewen.wreak.sortable.compare_STAR_,cljs.core.deref.call(null,sort_state)));
});
ewen.wreak.sortable.remove_ids = (function remove_ids(state,ids){var state__$1 = cljs.core.atom.call(null,state);var seq__154002_154006 = cljs.core.seq.call(null,ids);var chunk__154003_154007 = null;var count__154004_154008 = (0);var i__154005_154009 = (0);while(true){
if((i__154005_154009 < count__154004_154008))
{var id_154010 = cljs.core._nth.call(null,chunk__154003_154007,i__154005_154009);cljs.core.swap_BANG_.call(null,state__$1,cljs.core.dissoc,id_154010);
{
var G__154011 = seq__154002_154006;
var G__154012 = chunk__154003_154007;
var G__154013 = count__154004_154008;
var G__154014 = (i__154005_154009 + (1));
seq__154002_154006 = G__154011;
chunk__154003_154007 = G__154012;
count__154004_154008 = G__154013;
i__154005_154009 = G__154014;
continue;
}
} else
{var temp__4126__auto___154015 = cljs.core.seq.call(null,seq__154002_154006);if(temp__4126__auto___154015)
{var seq__154002_154016__$1 = temp__4126__auto___154015;if(cljs.core.chunked_seq_QMARK_.call(null,seq__154002_154016__$1))
{var c__4404__auto___154017 = cljs.core.chunk_first.call(null,seq__154002_154016__$1);{
var G__154018 = cljs.core.chunk_rest.call(null,seq__154002_154016__$1);
var G__154019 = c__4404__auto___154017;
var G__154020 = cljs.core.count.call(null,c__4404__auto___154017);
var G__154021 = (0);
seq__154002_154006 = G__154018;
chunk__154003_154007 = G__154019;
count__154004_154008 = G__154020;
i__154005_154009 = G__154021;
continue;
}
} else
{var id_154022 = cljs.core.first.call(null,seq__154002_154016__$1);cljs.core.swap_BANG_.call(null,state__$1,cljs.core.dissoc,id_154022);
{
var G__154023 = cljs.core.next.call(null,seq__154002_154016__$1);
var G__154024 = null;
var G__154025 = (0);
var G__154026 = (0);
seq__154002_154006 = G__154023;
chunk__154003_154007 = G__154024;
count__154004_154008 = G__154025;
i__154005_154009 = G__154026;
continue;
}
}
} else
{}
}
break;
}
return cljs.core.deref.call(null,state__$1);
});
/**
* Given 2 maps, return a set of the keys that are in both maps
* but not at the same position
*/
ewen.wreak.sortable.keys_index_changed = (function keys_index_changed(m1,m2){var vec__154028 = clojure.data.diff.call(null,cljs.core.keys.call(null,m1),cljs.core.keys.call(null,m2));var diff1 = cljs.core.nth.call(null,vec__154028,(0),null);var diff2 = cljs.core.nth.call(null,vec__154028,(1),null);var _ = cljs.core.nth.call(null,vec__154028,(2),null);return cljs.core.disj.call(null,clojure.set.intersection.call(null,cljs.core.set.call(null,diff1),cljs.core.set.call(null,diff2)),null);
});
ewen.wreak.sortable.update_listen_ids_builder = (function update_listen_ids_builder(app,chan_pos,chan_sort_index){return (function update_listen_ids(_,___$1,old_ids,new_ids){datascript.listen_BANG_.call(null,app,chan_pos,ewen.wreak.sortable.pos__GT_index_keys.call(null,app,new_ids));
return datascript.listen_BANG_.call(null,app,chan_sort_index,ewen.wreak.sortable.sort_index__GT_index_keys.call(null,app,new_ids));
});
});
ewen.wreak.sortable.ids__GT_sort_state_builder = (function ids__GT_sort_state_builder(app,sort_state){return (function ids__GT_sort_state(_,___$1,old_ids,new_ids){var rem_ids = clojure.set.difference.call(null,old_ids,new_ids);var add_ids = clojure.set.difference.call(null,new_ids,old_ids);return cljs.core.swap_BANG_.call(null,sort_state,cljs.core.comp.call(null,((function (rem_ids,add_ids){
return (function (p1__154029_SHARP_){return ewen.wreak.sortable.sortable_add_ids.call(null,p1__154029_SHARP_,cljs.core.deref.call(null,app),add_ids);
});})(rem_ids,add_ids))
,((function (rem_ids,add_ids){
return (function (p1__154030_SHARP_){return ewen.wreak.sortable.remove_ids.call(null,p1__154030_SHARP_,rem_ids);
});})(rem_ids,add_ids))
));
});
});
ewen.wreak.sortable.ids__GT_comp_state_builder = (function ids__GT_comp_state_builder(app,comp){return (function ids__GT_comp_state(_,___$1,old_ids,new_ids){var rem_ids = clojure.set.difference.call(null,old_ids,new_ids);var add_ids = clojure.set.difference.call(null,new_ids,old_ids);var state = ewen.wreak.sortable.sortable_get_state.call(null,comp);var state__$1 = ewen.wreak.sortable.comp_state_add_ids.call(null,state,cljs.core.deref.call(null,app),add_ids);var state__$2 = ewen.wreak.sortable.remove_ids.call(null,state__$1,rem_ids);return ewen.wreak.sortable.sortable_replace_state_BANG_.call(null,comp,state__$2);
});
});
ewen.wreak.sortable.handle_item_new_sort_index = (function handle_item_new_sort_index(db,p__154031){var vec__154034 = p__154031;var id = cljs.core.nth.call(null,vec__154034,(0),null);var new_sort_id = cljs.core.nth.call(null,vec__154034,(1),null);var G__154035 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("db","id","db/id",-1388397098),id,new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881),new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,new_sort_id)),new cljs.core.Keyword("state","init-pos","state/init-pos",973379173),new cljs.core.Keyword("state","init-pos","state/init-pos",973379173).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,new_sort_id))], null);var G__154035__$1 = (cljs.core.truth_(((function (G__154035,vec__154034,id,new_sort_id){
return (function (){return new cljs.core.Keyword("state","dragging","state/dragging",1965974580).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,id));
});})(G__154035,vec__154034,id,new_sort_id))
)?cljs.core.assoc.call(null,G__154035,new cljs.core.Keyword("password","pos","password/pos",903909613),new cljs.core.Keyword("state","init-pos","state/init-pos",973379173).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,db,new_sort_id))):G__154035);return G__154035__$1;
});
ewen.wreak.sortable.build_process_sortable = (function build_process_sortable(app){return (function process_sortable(_,___$1,o,n){var keys_changed = ewen.wreak.sortable.keys_index_changed.call(null,o,n);var o_filtered = cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"pos","pos",-864607220),cljs.core.val),cljs.core.select_keys.call(null,o,keys_changed));var n_filtered = cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"pos","pos",-864607220),cljs.core.val),cljs.core.select_keys.call(null,n,keys_changed));var sort_updates = cljs.core.mapv.call(null,cljs.core.partial.call(null,ewen.wreak.sortable.handle_item_new_sort_index,cljs.core.deref.call(null,app)),cljs.core.filter.call(null,ewen.wreak.sortable.not_nil_QMARK_,cljs.core.map.call(null,((function (keys_changed,o_filtered,n_filtered){
return (function (p__154048,p__154049){var vec__154050 = p__154048;var id = cljs.core.nth.call(null,vec__154050,(0),null);var ___$2 = cljs.core.nth.call(null,vec__154050,(1),null);var vec__154051 = p__154049;var id_sorted = cljs.core.nth.call(null,vec__154051,(0),null);var ___$3 = cljs.core.nth.call(null,vec__154051,(1),null);if(cljs.core._EQ_.call(null,id,id_sorted))
{return null;
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,id_sorted], null);
}
});})(keys_changed,o_filtered,n_filtered))
,o_filtered,n_filtered)));if(cljs.core.truth_(cljs.core.not_empty.call(null,sort_updates)))
{return datascript.transact_BANG_.call(null,app,sort_updates);
} else
{return null;
}
});
});
ewen.wreak.sortable.listen_passwords_ids_BANG_ = (function listen_passwords_ids_BANG_(react_comp,app,ids,chan_pos,chan_sort_index){var sort_state = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var sort_state_schema = new cljs.core.PersistentArrayMap.fromArray([schema.core.Int,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"pos","pos",-864607220),schema.core.Int], null)], true, false);cljs.core.swap_BANG_.call(null,sort_state,ewen.wreak.sortable.sortable_add_ids,cljs.core.deref.call(null,app),cljs.core.deref.call(null,ids));
var c__5812__auto___154228 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5812__auto___154228,sort_state,sort_state_schema){
return (function (){var f__5813__auto__ = (function (){var switch__5797__auto__ = ((function (c__5812__auto___154228,sort_state,sort_state_schema){
return (function (state_154160){var state_val_154161 = (state_154160[(1)]);if((state_val_154161 === (7)))
{var inst_154155 = (state_154160[(2)]);var inst_154156 = cljs.core.async.close_BANG_.call(null,chan_pos);var state_154160__$1 = (function (){var statearr_154162 = state_154160;(statearr_154162[(7)] = inst_154155);
return statearr_154162;
})();var statearr_154163_154229 = state_154160__$1;(statearr_154163_154229[(2)] = inst_154156);
(statearr_154163_154229[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154161 === (1)))
{var state_154160__$1 = state_154160;var statearr_154164_154230 = state_154160__$1;(statearr_154164_154230[(2)] = null);
(statearr_154164_154230[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154161 === (4)))
{var inst_154142 = (state_154160[(8)]);var inst_154142__$1 = (state_154160[(2)]);var state_154160__$1 = (function (){var statearr_154165 = state_154160;(statearr_154165[(8)] = inst_154142__$1);
return statearr_154165;
})();if(cljs.core.truth_(inst_154142__$1))
{var statearr_154166_154231 = state_154160__$1;(statearr_154166_154231[(1)] = (5));
} else
{var statearr_154167_154232 = state_154160__$1;(statearr_154167_154232[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154161 === (6)))
{var state_154160__$1 = state_154160;var statearr_154168_154233 = state_154160__$1;(statearr_154168_154233[(2)] = null);
(statearr_154168_154233[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154161 === (3)))
{var inst_154158 = (state_154160[(2)]);var state_154160__$1 = state_154160;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_154160__$1,inst_154158);
} else
{if((state_val_154161 === (2)))
{var state_154160__$1 = state_154160;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_154160__$1,(4),chan_pos);
} else
{if((state_val_154161 === (9)))
{var state_154160__$1 = state_154160;var statearr_154169_154234 = state_154160__$1;(statearr_154169_154234[(2)] = null);
(statearr_154169_154234[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154161 === (5)))
{var inst_154145 = (state_154160[(9)]);var inst_154142 = (state_154160[(8)]);var inst_154144 = cljs.core.deref.call(null,ids);var inst_154145__$1 = ewen.wreak.sortable.pos_callback.call(null,inst_154144,inst_154142);var inst_154146 = cljs.core.not_empty.call(null,inst_154145__$1);var state_154160__$1 = (function (){var statearr_154170 = state_154160;(statearr_154170[(9)] = inst_154145__$1);
return statearr_154170;
})();if(cljs.core.truth_(inst_154146))
{var statearr_154171_154235 = state_154160__$1;(statearr_154171_154235[(1)] = (8));
} else
{var statearr_154172_154236 = state_154160__$1;(statearr_154172_154236[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154161 === (10)))
{var inst_154151 = (state_154160[(2)]);var state_154160__$1 = (function (){var statearr_154173 = state_154160;(statearr_154173[(10)] = inst_154151);
return statearr_154173;
})();var statearr_154174_154237 = state_154160__$1;(statearr_154174_154237[(2)] = null);
(statearr_154174_154237[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154161 === (8)))
{var inst_154145 = (state_154160[(9)]);var inst_154148 = cljs.core.swap_BANG_.call(null,sort_state,ewen.wreak.sortable.apply_pos_updates,inst_154145);var state_154160__$1 = state_154160;var statearr_154175_154238 = state_154160__$1;(statearr_154175_154238[(2)] = inst_154148);
(statearr_154175_154238[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
});})(c__5812__auto___154228,sort_state,sort_state_schema))
;return ((function (switch__5797__auto__,c__5812__auto___154228,sort_state,sort_state_schema){
return (function() {
var state_machine__5798__auto__ = null;
var state_machine__5798__auto____0 = (function (){var statearr_154179 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_154179[(0)] = state_machine__5798__auto__);
(statearr_154179[(1)] = (1));
return statearr_154179;
});
var state_machine__5798__auto____1 = (function (state_154160){while(true){
var ret_value__5799__auto__ = (function (){try{while(true){
var result__5800__auto__ = switch__5797__auto__.call(null,state_154160);if(cljs.core.keyword_identical_QMARK_.call(null,result__5800__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5800__auto__;
}
break;
}
}catch (e154180){if((e154180 instanceof Object))
{var ex__5801__auto__ = e154180;var statearr_154181_154239 = state_154160;(statearr_154181_154239[(5)] = ex__5801__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_154160);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e154180;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5799__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__154240 = state_154160;
state_154160 = G__154240;
continue;
}
} else
{return ret_value__5799__auto__;
}
break;
}
});
state_machine__5798__auto__ = function(state_154160){
switch(arguments.length){
case 0:
return state_machine__5798__auto____0.call(this);
case 1:
return state_machine__5798__auto____1.call(this,state_154160);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5798__auto____0;
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5798__auto____1;
return state_machine__5798__auto__;
})()
;})(switch__5797__auto__,c__5812__auto___154228,sort_state,sort_state_schema))
})();var state__5814__auto__ = (function (){var statearr_154182 = f__5813__auto__.call(null);(statearr_154182[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5812__auto___154228);
return statearr_154182;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5814__auto__);
});})(c__5812__auto___154228,sort_state,sort_state_schema))
);
var c__5812__auto___154241 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5812__auto___154241,sort_state,sort_state_schema){
return (function (){var f__5813__auto__ = (function (){var switch__5797__auto__ = ((function (c__5812__auto___154241,sort_state,sort_state_schema){
return (function (state_154205){var state_val_154206 = (state_154205[(1)]);if((state_val_154206 === (7)))
{var inst_154200 = (state_154205[(2)]);var inst_154201 = cljs.core.async.close_BANG_.call(null,chan_sort_index);var state_154205__$1 = (function (){var statearr_154207 = state_154205;(statearr_154207[(7)] = inst_154200);
return statearr_154207;
})();var statearr_154208_154242 = state_154205__$1;(statearr_154208_154242[(2)] = inst_154201);
(statearr_154208_154242[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154206 === (1)))
{var state_154205__$1 = state_154205;var statearr_154209_154243 = state_154205__$1;(statearr_154209_154243[(2)] = null);
(statearr_154209_154243[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154206 === (4)))
{var inst_154185 = (state_154205[(8)]);var inst_154185__$1 = (state_154205[(2)]);var state_154205__$1 = (function (){var statearr_154210 = state_154205;(statearr_154210[(8)] = inst_154185__$1);
return statearr_154210;
})();if(cljs.core.truth_(inst_154185__$1))
{var statearr_154211_154244 = state_154205__$1;(statearr_154211_154244[(1)] = (5));
} else
{var statearr_154212_154245 = state_154205__$1;(statearr_154212_154245[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154206 === (6)))
{var state_154205__$1 = state_154205;var statearr_154213_154246 = state_154205__$1;(statearr_154213_154246[(2)] = null);
(statearr_154213_154246[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154206 === (3)))
{var inst_154203 = (state_154205[(2)]);var state_154205__$1 = state_154205;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_154205__$1,inst_154203);
} else
{if((state_val_154206 === (2)))
{var state_154205__$1 = state_154205;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_154205__$1,(4),chan_sort_index);
} else
{if((state_val_154206 === (9)))
{var state_154205__$1 = state_154205;var statearr_154214_154247 = state_154205__$1;(statearr_154214_154247[(2)] = null);
(statearr_154214_154247[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154206 === (5)))
{var inst_154188 = (state_154205[(9)]);var inst_154185 = (state_154205[(8)]);var inst_154187 = cljs.core.deref.call(null,ids);var inst_154188__$1 = ewen.wreak.sortable.index_callback.call(null,inst_154187,inst_154185);var inst_154189 = cljs.core.not_empty.call(null,inst_154188__$1);var state_154205__$1 = (function (){var statearr_154215 = state_154205;(statearr_154215[(9)] = inst_154188__$1);
return statearr_154215;
})();if(cljs.core.truth_(inst_154189))
{var statearr_154216_154248 = state_154205__$1;(statearr_154216_154248[(1)] = (8));
} else
{var statearr_154217_154249 = state_154205__$1;(statearr_154217_154249[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154206 === (10)))
{var inst_154196 = (state_154205[(2)]);var state_154205__$1 = (function (){var statearr_154218 = state_154205;(statearr_154218[(10)] = inst_154196);
return statearr_154218;
})();var statearr_154219_154250 = state_154205__$1;(statearr_154219_154250[(2)] = null);
(statearr_154219_154250[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_154206 === (8)))
{var inst_154188 = (state_154205[(9)]);var inst_154191 = ewen.wreak.sortable.sortable_get_state.call(null,react_comp);var inst_154192 = ewen.wreak.sortable.apply_index_updates.call(null,inst_154191,inst_154188);var inst_154193 = ewen.wreak.sortable.sortable_replace_state_BANG_.call(null,react_comp,inst_154192);var state_154205__$1 = state_154205;var statearr_154220_154251 = state_154205__$1;(statearr_154220_154251[(2)] = inst_154193);
(statearr_154220_154251[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
});})(c__5812__auto___154241,sort_state,sort_state_schema))
;return ((function (switch__5797__auto__,c__5812__auto___154241,sort_state,sort_state_schema){
return (function() {
var state_machine__5798__auto__ = null;
var state_machine__5798__auto____0 = (function (){var statearr_154224 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_154224[(0)] = state_machine__5798__auto__);
(statearr_154224[(1)] = (1));
return statearr_154224;
});
var state_machine__5798__auto____1 = (function (state_154205){while(true){
var ret_value__5799__auto__ = (function (){try{while(true){
var result__5800__auto__ = switch__5797__auto__.call(null,state_154205);if(cljs.core.keyword_identical_QMARK_.call(null,result__5800__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5800__auto__;
}
break;
}
}catch (e154225){if((e154225 instanceof Object))
{var ex__5801__auto__ = e154225;var statearr_154226_154252 = state_154205;(statearr_154226_154252[(5)] = ex__5801__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_154205);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e154225;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5799__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__154253 = state_154205;
state_154205 = G__154253;
continue;
}
} else
{return ret_value__5799__auto__;
}
break;
}
});
state_machine__5798__auto__ = function(state_154205){
switch(arguments.length){
case 0:
return state_machine__5798__auto____0.call(this);
case 1:
return state_machine__5798__auto____1.call(this,state_154205);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5798__auto____0;
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5798__auto____1;
return state_machine__5798__auto__;
})()
;})(switch__5797__auto__,c__5812__auto___154241,sort_state,sort_state_schema))
})();var state__5814__auto__ = (function (){var statearr_154227 = f__5813__auto__.call(null);(statearr_154227[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5812__auto___154241);
return statearr_154227;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5814__auto__);
});})(c__5812__auto___154241,sort_state,sort_state_schema))
);
cljs.core.add_watch.call(null,sort_state,new cljs.core.Keyword(null,"sort-state-updates","sort-state-updates",-1509338324),ewen.wreak.sortable.build_process_sortable.call(null,app));
cljs.core.add_watch.call(null,ids,new cljs.core.Keyword(null,"ids-updates","ids-updates",-771524643),cljs.core.juxt.call(null,ewen.wreak.sortable.update_listen_ids_builder.call(null,app,chan_pos,chan_sort_index),ewen.wreak.sortable.ids__GT_comp_state_builder.call(null,app,react_comp),ewen.wreak.sortable.ids__GT_sort_state_builder.call(null,app,sort_state)));
datascript.listen_BANG_.call(null,app,chan_pos,ewen.wreak.sortable.pos__GT_index_keys.call(null,app,cljs.core.deref.call(null,ids)));
return datascript.listen_BANG_.call(null,app,chan_sort_index,ewen.wreak.sortable.sort_index__GT_index_keys.call(null,app,cljs.core.deref.call(null,ids)));
});
ewen.wreak.sortable.set_sortable_pos_chan_BANG_ = (function set_sortable_pos_chan_BANG_(app,chan){return cljs.core.get.call(null,new cljs.core.Keyword(null,"tempids","tempids",1767509089).cljs$core$IFn$_invoke$arity$1(datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),(-1),new cljs.core.Keyword("sortable","chan-pos","sortable/chan-pos",-1263950410),chan], null)], null))),(-1));
});
ewen.wreak.sortable.set_sortable_sort_index_chan_BANG_ = (function set_sortable_sort_index_chan_BANG_(app,chan){return cljs.core.get.call(null,new cljs.core.Keyword(null,"tempids","tempids",1767509089).cljs$core$IFn$_invoke$arity$1(datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),(-1),new cljs.core.Keyword("sortable","chan-sort-index","sortable/chan-sort-index",-2115530257),chan], null)], null))),(-1));
});
ewen.wreak.sortable.sortable_mixin = ewen.wreak.mixin.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"getInitialState","getInitialState",1541760916),(function (_,p__154254){var map__154255 = p__154254;var map__154255__$1 = ((cljs.core.seq_QMARK_.call(null,map__154255))?cljs.core.apply.call(null,cljs.core.hash_map,map__154255):map__154255);var app = cljs.core.get.call(null,map__154255__$1,new cljs.core.Keyword(null,"app","app",-560961707));return cljs.core.assoc.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword("ewen.wreak.sortable","sortable-state","ewen.wreak.sortable/sortable-state",-410588655),cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.sort_by.call(null,cljs.core.comp.call(null,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222),cljs.core.val),ewen.wreak.sortable.compare_STAR_,cljs.core.apply.call(null,cljs.core.merge,cljs.core.map.call(null,((function (map__154255,map__154255__$1,app){
return (function (id){return new cljs.core.PersistentArrayMap.fromArray([id,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222),new cljs.core.Keyword("state","sort-index","state/sort-index",-955752881).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,cljs.core.deref.call(null,app),id))], null)], true, false);
});})(map__154255,map__154255__$1,app))
,cljs.core.deref.call(null,ewen.wreak._STAR_component_STAR_.ids))))));
}),new cljs.core.Keyword(null,"componentDidMount","componentDidMount",955710936),(function (_,___$1,p__154256){var map__154257 = p__154256;var map__154257__$1 = ((cljs.core.seq_QMARK_.call(null,map__154257))?cljs.core.apply.call(null,cljs.core.hash_map,map__154257):map__154257);var app = cljs.core.get.call(null,map__154257__$1,new cljs.core.Keyword(null,"app","app",-560961707));var chan_pos = cljs.core.async.chan.call(null);var chan_sort_index = cljs.core.async.chan.call(null);(ewen.wreak._STAR_component_STAR_[new cljs.core.Keyword("ewen.wreak.sortable","pos-chan-id","ewen.wreak.sortable/pos-chan-id",690321613)] = ewen.wreak.sortable.set_sortable_pos_chan_BANG_.call(null,app,chan_pos));
(ewen.wreak._STAR_component_STAR_[new cljs.core.Keyword("ewen.wreak.sortable","sort-index-chan-id","ewen.wreak.sortable/sort-index-chan-id",-926642614)] = ewen.wreak.sortable.set_sortable_sort_index_chan_BANG_.call(null,app,chan_sort_index));
return ewen.wreak.sortable.listen_passwords_ids_BANG_.call(null,ewen.wreak._STAR_component_STAR_,app,ewen.wreak._STAR_component_STAR_.ids,chan_pos,chan_sort_index);
}),new cljs.core.Keyword(null,"componentWillUnmount","componentWillUnmount",1573788814),(function (_,___$1,p__154258){var map__154259 = p__154258;var map__154259__$1 = ((cljs.core.seq_QMARK_.call(null,map__154259))?cljs.core.apply.call(null,cljs.core.hash_map,map__154259):map__154259);var app = cljs.core.get.call(null,map__154259__$1,new cljs.core.Keyword(null,"app","app",-560961707));cljs.core.remove_watch.call(null,ewen.wreak._STAR_component_STAR_.ids,new cljs.core.Keyword(null,"ids-updates","ids-updates",-771524643));
datascript.unlisten_BANG_.call(null,app,new cljs.core.Keyword("sortable","chan-pos","sortable/chan-pos",-1263950410).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,cljs.core.deref.call(null,app),(ewen.wreak._STAR_component_STAR_[new cljs.core.Keyword("ewen.wreak.sortable","pos-chan-id","ewen.wreak.sortable/pos-chan-id",690321613)]))));
datascript.unlisten_BANG_.call(null,app,new cljs.core.Keyword("sortable","chan-sort-index","sortable/chan-sort-index",-2115530257).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,cljs.core.deref.call(null,app),(ewen.wreak._STAR_component_STAR_[new cljs.core.Keyword("ewen.wreak.sortable","sort-index-chan-id","ewen.wreak.sortable/sort-index-chan-id",-926642614)]))));
datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db.fn","retractAttribute","db.fn/retractAttribute",937402164),(ewen.wreak._STAR_component_STAR_[new cljs.core.Keyword("ewen.wreak.sortable","pos-chan-id","ewen.wreak.sortable/pos-chan-id",690321613)]),new cljs.core.Keyword("sortable","chan-pos","sortable/chan-pos",-1263950410)], null)], null));
return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("db.fn","retractAttribute","db.fn/retractAttribute",937402164),(ewen.wreak._STAR_component_STAR_[new cljs.core.Keyword("ewen.wreak.sortable","sort-index-chan-id","ewen.wreak.sortable/sort-index-chan-id",-926642614)]),new cljs.core.Keyword("sortable","chan-pos","sortable/chan-pos",-1263950410)], null)], null));
})], null));

//# sourceMappingURL=sortable.js.map