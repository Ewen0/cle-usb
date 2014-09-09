// Compiled by ClojureScript 0.0-2311
goog.provide('datascript.analyze');
goog.require('cljs.core');
goog.require('datascript.query');
goog.require('datascript.query');
goog.require('datascript.core');
goog.require('datascript.core');
goog.require('clojure.walk');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.set');
datascript.analyze.pattern__GT_index_keys = (function pattern__GT_index_keys(p__156572){var vec__156574 = p__156572;var e = cljs.core.nth.call(null,vec__156574,(0),null);var a = cljs.core.nth.call(null,vec__156574,(1),null);var v = cljs.core.nth.call(null,vec__156574,(2),null);var tx = cljs.core.nth.call(null,vec__156574,(3),null);var added = cljs.core.nth.call(null,vec__156574,(4),null);var pattern = vec__156574;if(cljs.core.truth_(e))
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
datascript.analyze.parse_where = (function parse_where(where){var source = cljs.core.first.call(null,where);if(((source instanceof cljs.core.Symbol)) && (cljs.core._EQ_.call(null,"$",cljs.core.first.call(null,cljs.core.name.call(null,source)))))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,where),cljs.core.next.call(null,where)], null);
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"$","$",-1580747756,null),where], null);
}
});
datascript.analyze.context_resolve_val = (function context_resolve_val(context,sym){var temp__4126__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__156575_SHARP_){return cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"attrs","attrs",-2090668713).cljs$core$IFn$_invoke$arity$1(p1__156575_SHARP_),sym);
}),new cljs.core.Keyword(null,"rels","rels",1770187185).cljs$core$IFn$_invoke$arity$1(context)));if(cljs.core.truth_(temp__4126__auto__))
{var rel = temp__4126__auto__;return cljs.core.map.call(null,((function (rel,temp__4126__auto__){
return (function (p1__156576_SHARP_){return (p1__156576_SHARP_[new cljs.core.Keyword(null,"attrs","attrs",-2090668713).cljs$core$IFn$_invoke$arity$1(rel).call(null,sym)]);
});})(rel,temp__4126__auto__))
,new cljs.core.Keyword(null,"tuples","tuples",-676032639).cljs$core$IFn$_invoke$arity$1(rel));
} else
{return null;
}
});
datascript.analyze.bind_symbol = (function bind_symbol(sym,context){if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"_","_",-1201019570,null),sym))
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null);
} else
{if((sym instanceof cljs.core.Symbol))
{var or__3648__auto__ = datascript.analyze.context_resolve_val.call(null,context,sym);if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null);
}
} else
{return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sym], null);

}
}
});
datascript.analyze.cart = (function cart(colls){if(cljs.core.empty_QMARK_.call(null,colls))
{return cljs.core.list(cljs.core.List.EMPTY);
} else
{var iter__4373__auto__ = (function iter__156583(s__156584){return (new cljs.core.LazySeq(null,(function (){var s__156584__$1 = s__156584;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__156584__$1);if(temp__4126__auto__)
{var xs__4624__auto__ = temp__4126__auto__;var x = cljs.core.first.call(null,xs__4624__auto__);var iterys__4369__auto__ = ((function (s__156584__$1,x,xs__4624__auto__,temp__4126__auto__){
return (function iter__156585(s__156586){return (new cljs.core.LazySeq(null,((function (s__156584__$1,x,xs__4624__auto__,temp__4126__auto__){
return (function (){var s__156586__$1 = s__156586;while(true){
var temp__4126__auto____$1 = cljs.core.seq.call(null,s__156586__$1);if(temp__4126__auto____$1)
{var s__156586__$2 = temp__4126__auto____$1;if(cljs.core.chunked_seq_QMARK_.call(null,s__156586__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__156586__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__156588 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__156587 = (0);while(true){
if((i__156587 < size__4372__auto__))
{var more = cljs.core._nth.call(null,c__4371__auto__,i__156587);cljs.core.chunk_append.call(null,b__156588,cljs.core.cons.call(null,x,more));
{
var G__156589 = (i__156587 + (1));
i__156587 = G__156589;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__156588),iter__156585.call(null,cljs.core.chunk_rest.call(null,s__156586__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__156588),null);
}
} else
{var more = cljs.core.first.call(null,s__156586__$2);return cljs.core.cons.call(null,cljs.core.cons.call(null,x,more),iter__156585.call(null,cljs.core.rest.call(null,s__156586__$2)));
}
} else
{return null;
}
break;
}
});})(s__156584__$1,x,xs__4624__auto__,temp__4126__auto__))
,null,null));
});})(s__156584__$1,x,xs__4624__auto__,temp__4126__auto__))
;var fs__4370__auto__ = cljs.core.seq.call(null,iterys__4369__auto__.call(null,cart.call(null,cljs.core.rest.call(null,colls))));if(fs__4370__auto__)
{return cljs.core.concat.call(null,fs__4370__auto__,iter__156583.call(null,cljs.core.rest.call(null,s__156584__$1)));
} else
{{
var G__156590 = cljs.core.rest.call(null,s__156584__$1);
s__156584__$1 = G__156590;
continue;
}
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4373__auto__.call(null,cljs.core.first.call(null,colls));
}
});
datascript.analyze.bind_symbols = (function bind_symbols(form,context){var bound_symbols = cljs.core.map.call(null,(function (p1__156591_SHARP_){return datascript.analyze.bind_symbol.call(null,p1__156591_SHARP_,context);
}),form);return datascript.analyze.cart.call(null,bound_symbols);
});
datascript.analyze.analyze_call = (function analyze_call(p__156593,context){var vec__156595 = p__156593;var f = cljs.core.nth.call(null,vec__156595,(0),null);var args = cljs.core.nthnext.call(null,vec__156595,(1));var bound_args = datascript.analyze.bind_symbols.call(null,args,context);var f__$1 = (function (){var or__3648__auto__ = cljs.core.get.call(null,datascript.query.built_ins,f);if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return datascript.query.context_resolve_val.call(null,context,f);
}
})();return cljs.core.set.call(null,cljs.core.map.call(null,((function (bound_args,f__$1,vec__156595,f,args){
return (function (p1__156592_SHARP_){return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [f__$1], null),p1__156592_SHARP_);
});})(bound_args,f__$1,vec__156595,f,args))
,bound_args));
});
datascript.analyze.index_keys = (function index_keys(source,where,context){var index_keys__$1 = cljs.core.map.call(null,datascript.analyze.pattern__GT_index_keys,datascript.analyze.bind_symbols.call(null,where,context));var keys = cljs.core.map.call(null,((function (index_keys__$1){
return (function (p1__156596_SHARP_){return cljs.core.vec.call(null,cljs.core.cons.call(null,source,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),p1__156596_SHARP_)));
});})(index_keys__$1))
,index_keys__$1);var keys__$1 = cljs.core.filter.call(null,cljs.core.not_empty,keys);return cljs.core.set.call(null,keys__$1);
});
datascript.analyze._resolve_clause = (function _resolve_clause(context,clause){var pred__156601 = datascript.query.looks_like_QMARK_;var expr__156602 = clause;if(cljs.core.truth_(pred__156601.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",345799209,null)], null)], null),expr__156602)))
{return datascript.query.filter_by_pred.call(null,context,clause);
} else
{if(cljs.core.truth_(pred__156601.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",345799209,null)], null),new cljs.core.Symbol(null,"_","_",-1201019570,null)], null),expr__156602)))
{return cljs.core.update_in.call(null,context,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"calls","calls",-433802344)], null),clojure.set.union,datascript.analyze.analyze_call.call(null,cljs.core.first.call(null,clause),context));
} else
{if(cljs.core.truth_(pred__156601.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"*","*",345799209,null)], null),expr__156602)))
{var vec__156604 = datascript.analyze.parse_where.call(null,clause);var source = cljs.core.nth.call(null,vec__156604,(0),null);var where = cljs.core.nth.call(null,vec__156604,(1),null);var found = datascript.analyze.index_keys.call(null,source,where,context);return cljs.core.update_in.call(null,context,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"index-keys","index-keys",-43183086)], null),clojure.set.union,found);
} else
{throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr__156602))));
}
}
}
});
datascript.analyze.solve_rule = (function solve_rule(context,clause){var final_attrs = cljs.core.filter.call(null,datascript.query.free_var_QMARK_,clause);var final_attrs_map = cljs.core.zipmap.call(null,final_attrs,cljs.core.range.call(null));var solve = ((function (final_attrs,final_attrs_map){
return (function (prefix_context,clauses){return cljs.core.reduce.call(null,datascript.analyze._resolve_clause,prefix_context,clauses);
});})(final_attrs,final_attrs_map))
;var empty_rels_QMARK_ = ((function (final_attrs,final_attrs_map,solve){
return (function (context__$1){return cljs.core.some.call(null,((function (final_attrs,final_attrs_map,solve){
return (function (p1__156605_SHARP_){return cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword(null,"tuples","tuples",-676032639).cljs$core$IFn$_invoke$arity$1(p1__156605_SHARP_));
});})(final_attrs,final_attrs_map,solve))
,new cljs.core.Keyword(null,"rels","rels",1770187185).cljs$core$IFn$_invoke$arity$1(context__$1));
});})(final_attrs,final_attrs_map,solve))
;var stack = cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"prefix-clauses","prefix-clauses",1294180028),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"prefix-context","prefix-context",-1269613591),cljs.core.assoc.call(null,context,new cljs.core.Keyword(null,"rels","rels",1770187185),cljs.core.PersistentVector.EMPTY),new cljs.core.Keyword(null,"clauses","clauses",1454841241),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clause], null),new cljs.core.Keyword(null,"used-args","used-args",23596256),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"pending-guards","pending-guards",-1255527308),cljs.core.PersistentArrayMap.EMPTY], null));var rel = (new datascript.query.Relation(final_attrs_map,cljs.core.PersistentVector.EMPTY));var index_keys = cljs.core.PersistentHashSet.EMPTY;while(true){
var temp__4124__auto__ = cljs.core.first.call(null,stack);if(cljs.core.truth_(temp__4124__auto__))
{var frame = temp__4124__auto__;var vec__156616 = cljs.core.split_with.call(null,((function (stack,rel,index_keys,frame,temp__4124__auto__,final_attrs,final_attrs_map,solve,empty_rels_QMARK_){
return (function (p1__156606_SHARP_){return !(datascript.query.rule_QMARK_.call(null,context,p1__156606_SHARP_));
});})(stack,rel,index_keys,frame,temp__4124__auto__,final_attrs,final_attrs_map,solve,empty_rels_QMARK_))
,new cljs.core.Keyword(null,"clauses","clauses",1454841241).cljs$core$IFn$_invoke$arity$1(frame));var clauses = cljs.core.nth.call(null,vec__156616,(0),null);var vec__156617 = cljs.core.nth.call(null,vec__156616,(1),null);var rule_clause = cljs.core.nth.call(null,vec__156617,(0),null);var next_clauses = cljs.core.nthnext.call(null,vec__156617,(1));if((rule_clause == null))
{var context__$1 = solve.call(null,new cljs.core.Keyword(null,"prefix-context","prefix-context",-1269613591).cljs$core$IFn$_invoke$arity$1(frame),clauses);var tuples = datascript.query._collect.call(null,context__$1,final_attrs);var new_rel = (new datascript.query.Relation(final_attrs_map,tuples));{
var G__156624 = cljs.core.next.call(null,stack);
var G__156625 = datascript.query.sum_rel.call(null,rel,new_rel);
var G__156626 = clojure.set.union.call(null,index_keys,new cljs.core.Keyword(null,"index-keys","index-keys",-43183086).cljs$core$IFn$_invoke$arity$1(context__$1));
stack = G__156624;
rel = G__156625;
index_keys = G__156626;
continue;
}
} else
{var vec__156618 = rule_clause;var rule = cljs.core.nth.call(null,vec__156618,(0),null);var call_args = cljs.core.nthnext.call(null,vec__156618,(1));var guards = datascript.query.rule_gen_guards.call(null,rule_clause,new cljs.core.Keyword(null,"used-args","used-args",23596256).cljs$core$IFn$_invoke$arity$1(frame));var vec__156619 = datascript.query.split_guards.call(null,cljs.core.concat.call(null,new cljs.core.Keyword(null,"prefix-clauses","prefix-clauses",1294180028).cljs$core$IFn$_invoke$arity$1(frame),clauses),cljs.core.concat.call(null,guards,new cljs.core.Keyword(null,"pending-guards","pending-guards",-1255527308).cljs$core$IFn$_invoke$arity$1(frame)));var active_gs = cljs.core.nth.call(null,vec__156619,(0),null);var pending_gs = cljs.core.nth.call(null,vec__156619,(1),null);if(cljs.core.truth_(cljs.core.some.call(null,((function (stack,rel,index_keys,vec__156618,rule,call_args,guards,vec__156619,active_gs,pending_gs,vec__156616,clauses,vec__156617,rule_clause,next_clauses,frame,temp__4124__auto__,final_attrs,final_attrs_map,solve,empty_rels_QMARK_){
return (function (p1__156607_SHARP_){return cljs.core._EQ_.call(null,p1__156607_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"-differ?","-differ?",1465687357,null))], null));
});})(stack,rel,index_keys,vec__156618,rule,call_args,guards,vec__156619,active_gs,pending_gs,vec__156616,clauses,vec__156617,rule_clause,next_clauses,frame,temp__4124__auto__,final_attrs,final_attrs_map,solve,empty_rels_QMARK_))
,active_gs)))
{{
var G__156627 = cljs.core.next.call(null,stack);
var G__156628 = rel;
var G__156629 = index_keys;
stack = G__156627;
rel = G__156628;
index_keys = G__156629;
continue;
}
} else
{var prefix_clauses = cljs.core.concat.call(null,clauses,active_gs);var prefix_context = solve.call(null,new cljs.core.Keyword(null,"prefix-context","prefix-context",-1269613591).cljs$core$IFn$_invoke$arity$1(frame),prefix_clauses);if(cljs.core.truth_(empty_rels_QMARK_.call(null,prefix_context)))
{{
var G__156630 = cljs.core.next.call(null,stack);
var G__156631 = rel;
var G__156632 = clojure.set.union.call(null,index_keys,new cljs.core.Keyword(null,"index-keys","index-keys",-43183086).cljs$core$IFn$_invoke$arity$1(prefix_context));
stack = G__156630;
rel = G__156631;
index_keys = G__156632;
continue;
}
} else
{var used_args = cljs.core.assoc.call(null,new cljs.core.Keyword(null,"used-args","used-args",23596256).cljs$core$IFn$_invoke$arity$1(frame),rule,cljs.core.conj.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"used-args","used-args",23596256).cljs$core$IFn$_invoke$arity$1(frame),rule,cljs.core.PersistentVector.EMPTY),call_args));var branches = datascript.query.expand_rule.call(null,rule_clause,context,used_args);{
var G__156633 = cljs.core.concat.call(null,(function (){var iter__4373__auto__ = ((function (stack,rel,index_keys,used_args,branches,prefix_clauses,prefix_context,vec__156618,rule,call_args,guards,vec__156619,active_gs,pending_gs,vec__156616,clauses,vec__156617,rule_clause,next_clauses,frame,temp__4124__auto__,final_attrs,final_attrs_map,solve,empty_rels_QMARK_){
return (function iter__156620(s__156621){return (new cljs.core.LazySeq(null,((function (stack,rel,index_keys,used_args,branches,prefix_clauses,prefix_context,vec__156618,rule,call_args,guards,vec__156619,active_gs,pending_gs,vec__156616,clauses,vec__156617,rule_clause,next_clauses,frame,temp__4124__auto__,final_attrs,final_attrs_map,solve,empty_rels_QMARK_){
return (function (){var s__156621__$1 = s__156621;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__156621__$1);if(temp__4126__auto__)
{var s__156621__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__156621__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__156621__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__156623 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__156622 = (0);while(true){
if((i__156622 < size__4372__auto__))
{var branch = cljs.core._nth.call(null,c__4371__auto__,i__156622);cljs.core.chunk_append.call(null,b__156623,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"prefix-clauses","prefix-clauses",1294180028),prefix_clauses,new cljs.core.Keyword(null,"prefix-context","prefix-context",-1269613591),prefix_context,new cljs.core.Keyword(null,"clauses","clauses",1454841241),datascript.query.concatv.call(null,branch,next_clauses),new cljs.core.Keyword(null,"used-args","used-args",23596256),used_args,new cljs.core.Keyword(null,"pending-guards","pending-guards",-1255527308),pending_gs], null));
{
var G__156636 = (i__156622 + (1));
i__156622 = G__156636;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__156623),iter__156620.call(null,cljs.core.chunk_rest.call(null,s__156621__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__156623),null);
}
} else
{var branch = cljs.core.first.call(null,s__156621__$2);return cljs.core.cons.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"prefix-clauses","prefix-clauses",1294180028),prefix_clauses,new cljs.core.Keyword(null,"prefix-context","prefix-context",-1269613591),prefix_context,new cljs.core.Keyword(null,"clauses","clauses",1454841241),datascript.query.concatv.call(null,branch,next_clauses),new cljs.core.Keyword(null,"used-args","used-args",23596256),used_args,new cljs.core.Keyword(null,"pending-guards","pending-guards",-1255527308),pending_gs], null),iter__156620.call(null,cljs.core.rest.call(null,s__156621__$2)));
}
} else
{return null;
}
break;
}
});})(stack,rel,index_keys,used_args,branches,prefix_clauses,prefix_context,vec__156618,rule,call_args,guards,vec__156619,active_gs,pending_gs,vec__156616,clauses,vec__156617,rule_clause,next_clauses,frame,temp__4124__auto__,final_attrs,final_attrs_map,solve,empty_rels_QMARK_))
,null,null));
});})(stack,rel,index_keys,used_args,branches,prefix_clauses,prefix_context,vec__156618,rule,call_args,guards,vec__156619,active_gs,pending_gs,vec__156616,clauses,vec__156617,rule_clause,next_clauses,frame,temp__4124__auto__,final_attrs,final_attrs_map,solve,empty_rels_QMARK_))
;return iter__4373__auto__.call(null,branches);
})(),cljs.core.next.call(null,stack));
var G__156634 = rel;
var G__156635 = clojure.set.union.call(null,index_keys,new cljs.core.Keyword(null,"index-keys","index-keys",-43183086).cljs$core$IFn$_invoke$arity$1(context));
stack = G__156633;
rel = G__156634;
index_keys = G__156635;
continue;
}
}
}
}
} else
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rel,index_keys], null);
}
break;
}
});
datascript.analyze.resolve_clause = (function resolve_clause(context,clause){if(datascript.query.rule_QMARK_.call(null,context,clause))
{var vec__156639 = ((datascript.query.source_QMARK_.call(null,cljs.core.first.call(null,clause)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,clause),cljs.core.next.call(null,clause)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"$","$",-1580747756,null),clause], null));var source = cljs.core.nth.call(null,vec__156639,(0),null);var rule = cljs.core.nth.call(null,vec__156639,(1),null);var source__$1 = cljs.core.get_in.call(null,context,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sources","sources",-321166424),source], null));var vec__156640 = datascript.analyze.solve_rule.call(null,cljs.core.assoc.call(null,context,new cljs.core.Keyword(null,"sources","sources",-321166424),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Symbol(null,"$","$",-1580747756,null),source__$1], null)),rule);var rel = cljs.core.nth.call(null,vec__156640,(0),null);var cc = cljs.core.nth.call(null,vec__156640,(1),null);var context__$1 = cljs.core.update_in.call(null,context,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"index-keys","index-keys",-43183086)], null),clojure.set.union,cc);return cljs.core.update_in.call(null,context__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rels","rels",1770187185)], null),datascript.query.collapse_rels,rel);
} else
{return datascript.analyze._resolve_clause.call(null,context,clause);
}
});
datascript.analyze._q__GT_index_keys = (function _q__GT_index_keys(context,clauses){return cljs.core.reduce.call(null,datascript.analyze.resolve_clause,context,clauses);
});
/**
* @param {...*} var_args
*/
datascript.analyze.analyze_q = (function() { 
var analyze_q__delegate = function (q,inputs){var q__$1 = ((cljs.core.sequential_QMARK_.call(null,q))?datascript.query.parse_query.call(null,q):q);var find = datascript.query.find_attrs.call(null,q__$1);var ins = new cljs.core.Keyword(null,"in","in",-1531184865).cljs$core$IFn$_invoke$arity$2(q__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"$","$",-1580747756,null)], null));var wheres = new cljs.core.Keyword(null,"where","where",-2044795965).cljs$core$IFn$_invoke$arity$1(q__$1);var context = datascript.query.parse_ins.call(null,(new datascript.query.Context(cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY)),ins,inputs);var result_context = datascript.analyze._q__GT_index_keys.call(null,context,wheres);var process_index_keys = ((function (q__$1,find,ins,wheres,context,result_context){
return (function (index_keys){return cljs.core.set.call(null,cljs.core.map.call(null,((function (q__$1,find,ins,wheres,context,result_context){
return (function (p1__156641_SHARP_){return cljs.core.assoc.call(null,p1__156641_SHARP_,(0),cljs.core.get.call(null,new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(result_context),cljs.core.first.call(null,p1__156641_SHARP_)));
});})(q__$1,find,ins,wheres,context,result_context))
,cljs.core.filter.call(null,((function (q__$1,find,ins,wheres,context,result_context){
return (function (p1__156642_SHARP_){return (cljs.core.count.call(null,p1__156642_SHARP_) > (1));
});})(q__$1,find,ins,wheres,context,result_context))
,index_keys)));
});})(q__$1,find,ins,wheres,context,result_context))
;var index_keys = process_index_keys.call(null,cljs.core.identity.call(null,new cljs.core.Keyword(null,"index-keys","index-keys",-43183086).cljs$core$IFn$_invoke$arity$1(result_context)));return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"index-keys","index-keys",-43183086),index_keys,new cljs.core.Keyword(null,"calls","calls",-433802344),(function (){var or__3648__auto__ = new cljs.core.Keyword(null,"calls","calls",-433802344).cljs$core$IFn$_invoke$arity$1(result_context);if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return cljs.core.PersistentHashSet.EMPTY;
}
})()], null);
};
var analyze_q = function (q,var_args){
var inputs = null;if (arguments.length > 1) {
  inputs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return analyze_q__delegate.call(this,q,inputs);};
analyze_q.cljs$lang$maxFixedArity = 1;
analyze_q.cljs$lang$applyTo = (function (arglist__156643){
var q = cljs.core.first(arglist__156643);
var inputs = cljs.core.rest(arglist__156643);
return analyze_q__delegate(q,inputs);
});
analyze_q.cljs$core$IFn$_invoke$arity$variadic = analyze_q__delegate;
return analyze_q;
})()
;

//# sourceMappingURL=analyze.js.map