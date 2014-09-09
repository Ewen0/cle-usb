// Compiled by ClojureScript 0.0-2311
goog.provide('ewen.async_plus');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
ewen.async_plus.map_LT_ = (function map_LT_(f,mult){var ch = cljs.core.async.tap.call(null,mult,cljs.core.async.chan.call(null));var out_ch = cljs.core.async.map_LT_.call(null,f,ch);return cljs.core.async.mult.call(null,out_ch);
});
ewen.async_plus.filter_LT_ = (function filter_LT_(pred_ch,mult){if(cljs.core._EQ_.call(null,"function",typeof pred_ch))
{var ch = cljs.core.async.chan.call(null);var c__5812__auto___148933 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5812__auto___148933,ch){
return (function (){var f__5813__auto__ = (function (){var switch__5797__auto__ = ((function (c__5812__auto___148933,ch){
return (function (state_148878){var state_val_148879 = (state_148878[(1)]);if((state_val_148879 === (2)))
{var inst_148876 = (state_148878[(2)]);var state_148878__$1 = state_148878;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_148878__$1,inst_148876);
} else
{if((state_val_148879 === (1)))
{var state_148878__$1 = state_148878;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_148878__$1,(2),ch,pred_ch);
} else
{return null;
}
}
});})(c__5812__auto___148933,ch))
;return ((function (switch__5797__auto__,c__5812__auto___148933,ch){
return (function() {
var state_machine__5798__auto__ = null;
var state_machine__5798__auto____0 = (function (){var statearr_148883 = [null,null,null,null,null,null,null];(statearr_148883[(0)] = state_machine__5798__auto__);
(statearr_148883[(1)] = (1));
return statearr_148883;
});
var state_machine__5798__auto____1 = (function (state_148878){while(true){
var ret_value__5799__auto__ = (function (){try{while(true){
var result__5800__auto__ = switch__5797__auto__.call(null,state_148878);if(cljs.core.keyword_identical_QMARK_.call(null,result__5800__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5800__auto__;
}
break;
}
}catch (e148884){if((e148884 instanceof Object))
{var ex__5801__auto__ = e148884;var statearr_148885_148934 = state_148878;(statearr_148885_148934[(5)] = ex__5801__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_148878);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e148884;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5799__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__148935 = state_148878;
state_148878 = G__148935;
continue;
}
} else
{return ret_value__5799__auto__;
}
break;
}
});
state_machine__5798__auto__ = function(state_148878){
switch(arguments.length){
case 0:
return state_machine__5798__auto____0.call(this);
case 1:
return state_machine__5798__auto____1.call(this,state_148878);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5798__auto____0;
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5798__auto____1;
return state_machine__5798__auto__;
})()
;})(switch__5797__auto__,c__5812__auto___148933,ch))
})();var state__5814__auto__ = (function (){var statearr_148886 = f__5813__auto__.call(null);(statearr_148886[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5812__auto___148933);
return statearr_148886;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5814__auto__);
});})(c__5812__auto___148933,ch))
);
return filter_LT_.call(null,ch,mult);
} else
{var out_ch = cljs.core.async.chan.call(null);var c__5812__auto___148936 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5812__auto___148936,out_ch){
return (function (){var f__5813__auto__ = (function (){var switch__5797__auto__ = ((function (c__5812__auto___148936,out_ch){
return (function (state_148913){var state_val_148914 = (state_148913[(1)]);if((state_val_148914 === (7)))
{var inst_148891 = (state_148913[(7)]);var inst_148905 = (state_148913[(2)]);var inst_148906 = cljs.core.async.untap.call(null,mult,inst_148891);var inst_148907 = cljs.core.async.chan.call(null);var inst_148908 = cljs.core.async.tap.call(null,mult,inst_148907);var inst_148909 = cljs.core.async.pipe.call(null,inst_148908,out_ch);var state_148913__$1 = (function (){var statearr_148915 = state_148913;(statearr_148915[(8)] = inst_148906);
(statearr_148915[(9)] = inst_148905);
return statearr_148915;
})();var statearr_148916_148937 = state_148913__$1;(statearr_148916_148937[(2)] = inst_148909);
(statearr_148916_148937[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_148914 === (6)))
{var state_148913__$1 = state_148913;var statearr_148917_148938 = state_148913__$1;(statearr_148917_148938[(2)] = null);
(statearr_148917_148938[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_148914 === (5)))
{var inst_148891 = (state_148913[(7)]);var inst_148896 = (state_148913[(10)]);var inst_148898 = cljs.core.async.untap.call(null,mult,inst_148891);var inst_148899 = cljs.core.async.chan.call(null);var inst_148900 = cljs.core.async.tap.call(null,mult,inst_148899);var inst_148901 = cljs.core.async.filter_LT_.call(null,inst_148896,inst_148900);var inst_148891__$1 = inst_148900;var inst_148892 = inst_148901;var state_148913__$1 = (function (){var statearr_148918 = state_148913;(statearr_148918[(11)] = inst_148892);
(statearr_148918[(7)] = inst_148891__$1);
(statearr_148918[(12)] = inst_148898);
return statearr_148918;
})();var statearr_148919_148939 = state_148913__$1;(statearr_148919_148939[(2)] = null);
(statearr_148919_148939[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_148914 === (4)))
{var inst_148896 = (state_148913[(10)]);var inst_148896__$1 = (state_148913[(2)]);var state_148913__$1 = (function (){var statearr_148920 = state_148913;(statearr_148920[(10)] = inst_148896__$1);
return statearr_148920;
})();if(cljs.core.truth_(inst_148896__$1))
{var statearr_148921_148940 = state_148913__$1;(statearr_148921_148940[(1)] = (5));
} else
{var statearr_148922_148941 = state_148913__$1;(statearr_148922_148941[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_148914 === (3)))
{var inst_148911 = (state_148913[(2)]);var state_148913__$1 = state_148913;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_148913__$1,inst_148911);
} else
{if((state_val_148914 === (2)))
{var inst_148892 = (state_148913[(11)]);var inst_148894 = cljs.core.async.pipe.call(null,inst_148892,out_ch,false);var state_148913__$1 = (function (){var statearr_148923 = state_148913;(statearr_148923[(13)] = inst_148894);
return statearr_148923;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_148913__$1,(4),pred_ch);
} else
{if((state_val_148914 === (1)))
{var inst_148887 = cljs.core.async.chan.call(null);var inst_148888 = cljs.core.async.tap.call(null,mult,inst_148887);var inst_148889 = (function (){var in_ch = inst_148888;return ((function (in_ch,inst_148887,inst_148888,state_val_148914,c__5812__auto___148936,out_ch){
return (function (){return cljs.core.constantly.call(null,true);
});
;})(in_ch,inst_148887,inst_148888,state_val_148914,c__5812__auto___148936,out_ch))
})();var inst_148890 = cljs.core.async.filter_LT_.call(null,inst_148889,inst_148888);var inst_148891 = inst_148888;var inst_148892 = inst_148890;var state_148913__$1 = (function (){var statearr_148924 = state_148913;(statearr_148924[(11)] = inst_148892);
(statearr_148924[(7)] = inst_148891);
return statearr_148924;
})();var statearr_148925_148942 = state_148913__$1;(statearr_148925_148942[(2)] = null);
(statearr_148925_148942[(1)] = (2));
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
});})(c__5812__auto___148936,out_ch))
;return ((function (switch__5797__auto__,c__5812__auto___148936,out_ch){
return (function() {
var state_machine__5798__auto__ = null;
var state_machine__5798__auto____0 = (function (){var statearr_148929 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_148929[(0)] = state_machine__5798__auto__);
(statearr_148929[(1)] = (1));
return statearr_148929;
});
var state_machine__5798__auto____1 = (function (state_148913){while(true){
var ret_value__5799__auto__ = (function (){try{while(true){
var result__5800__auto__ = switch__5797__auto__.call(null,state_148913);if(cljs.core.keyword_identical_QMARK_.call(null,result__5800__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5800__auto__;
}
break;
}
}catch (e148930){if((e148930 instanceof Object))
{var ex__5801__auto__ = e148930;var statearr_148931_148943 = state_148913;(statearr_148931_148943[(5)] = ex__5801__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_148913);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e148930;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5799__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__148944 = state_148913;
state_148913 = G__148944;
continue;
}
} else
{return ret_value__5799__auto__;
}
break;
}
});
state_machine__5798__auto__ = function(state_148913){
switch(arguments.length){
case 0:
return state_machine__5798__auto____0.call(this);
case 1:
return state_machine__5798__auto____1.call(this,state_148913);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5798__auto____0;
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5798__auto____1;
return state_machine__5798__auto__;
})()
;})(switch__5797__auto__,c__5812__auto___148936,out_ch))
})();var state__5814__auto__ = (function (){var statearr_148932 = f__5813__auto__.call(null);(statearr_148932[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5812__auto___148936);
return statearr_148932;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5814__auto__);
});})(c__5812__auto___148936,out_ch))
);
return cljs.core.async.mult.call(null,out_ch);
}
});
ewen.async_plus.delay_LT_ = (function delay_LT_(delay,mult){var out_mult = cljs.core.async.mult.call(null,cljs.core.async.chan.call(null));var c__5812__auto___149013 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5812__auto___149013,out_mult){
return (function (){var f__5813__auto__ = (function (){var switch__5797__auto__ = ((function (c__5812__auto___149013,out_mult){
return (function (state_148995){var state_val_148996 = (state_148995[(1)]);if((state_val_148996 === (7)))
{var inst_148981 = (state_148995[(7)]);var inst_148990 = (state_148995[(2)]);var inst_148991 = cljs.core.async.untap.call(null,mult,inst_148981);var state_148995__$1 = (function (){var statearr_148997 = state_148995;(statearr_148997[(8)] = inst_148990);
return statearr_148997;
})();var statearr_148998_149014 = state_148995__$1;(statearr_148998_149014[(2)] = inst_148991);
(statearr_148998_149014[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_148996 === (6)))
{var state_148995__$1 = state_148995;var statearr_148999_149015 = state_148995__$1;(statearr_148999_149015[(2)] = null);
(statearr_148999_149015[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_148996 === (5)))
{var inst_148981 = (state_148995[(7)]);var inst_148984 = (state_148995[(9)]);var inst_148986 = (function (){var val = inst_148984;var temp__4126__auto__ = inst_148984;var ch = inst_148981;return ((function (val,temp__4126__auto__,ch,inst_148981,inst_148984,state_val_148996,c__5812__auto___149013,out_mult){
return (function (){return cljs.core.async.put_BANG_.call(null,cljs.core.async.muxch_STAR_.call(null,out_mult),val);
});
;})(val,temp__4126__auto__,ch,inst_148981,inst_148984,state_val_148996,c__5812__auto___149013,out_mult))
})();var inst_148987 = setTimeout(inst_148986,delay);var state_148995__$1 = state_148995;var statearr_149000_149016 = state_148995__$1;(statearr_149000_149016[(2)] = inst_148987);
(statearr_149000_149016[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_148996 === (4)))
{var inst_148984 = (state_148995[(9)]);var inst_148984__$1 = (state_148995[(2)]);var state_148995__$1 = (function (){var statearr_149001 = state_148995;(statearr_149001[(9)] = inst_148984__$1);
return statearr_149001;
})();if(cljs.core.truth_(inst_148984__$1))
{var statearr_149002_149017 = state_148995__$1;(statearr_149002_149017[(1)] = (5));
} else
{var statearr_149003_149018 = state_148995__$1;(statearr_149003_149018[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_148996 === (3)))
{var inst_148993 = (state_148995[(2)]);var state_148995__$1 = state_148995;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_148995__$1,inst_148993);
} else
{if((state_val_148996 === (2)))
{var inst_148981 = (state_148995[(7)]);var state_148995__$1 = state_148995;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_148995__$1,(4),inst_148981);
} else
{if((state_val_148996 === (1)))
{var inst_148979 = cljs.core.async.chan.call(null);var inst_148980 = cljs.core.async.tap.call(null,mult,inst_148979);var inst_148981 = inst_148980;var state_148995__$1 = (function (){var statearr_149004 = state_148995;(statearr_149004[(7)] = inst_148981);
return statearr_149004;
})();var statearr_149005_149019 = state_148995__$1;(statearr_149005_149019[(2)] = null);
(statearr_149005_149019[(1)] = (2));
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
});})(c__5812__auto___149013,out_mult))
;return ((function (switch__5797__auto__,c__5812__auto___149013,out_mult){
return (function() {
var state_machine__5798__auto__ = null;
var state_machine__5798__auto____0 = (function (){var statearr_149009 = [null,null,null,null,null,null,null,null,null,null];(statearr_149009[(0)] = state_machine__5798__auto__);
(statearr_149009[(1)] = (1));
return statearr_149009;
});
var state_machine__5798__auto____1 = (function (state_148995){while(true){
var ret_value__5799__auto__ = (function (){try{while(true){
var result__5800__auto__ = switch__5797__auto__.call(null,state_148995);if(cljs.core.keyword_identical_QMARK_.call(null,result__5800__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5800__auto__;
}
break;
}
}catch (e149010){if((e149010 instanceof Object))
{var ex__5801__auto__ = e149010;var statearr_149011_149020 = state_148995;(statearr_149011_149020[(5)] = ex__5801__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_148995);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e149010;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5799__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__149021 = state_148995;
state_148995 = G__149021;
continue;
}
} else
{return ret_value__5799__auto__;
}
break;
}
});
state_machine__5798__auto__ = function(state_148995){
switch(arguments.length){
case 0:
return state_machine__5798__auto____0.call(this);
case 1:
return state_machine__5798__auto____1.call(this,state_148995);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5798__auto____0;
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5798__auto____1;
return state_machine__5798__auto__;
})()
;})(switch__5797__auto__,c__5812__auto___149013,out_mult))
})();var state__5814__auto__ = (function (){var statearr_149012 = f__5813__auto__.call(null);(statearr_149012[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5812__auto___149013);
return statearr_149012;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5814__auto__);
});})(c__5812__auto___149013,out_mult))
);
return out_mult;
});
ewen.async_plus.merge = (function() {
var merge = null;
var merge__1 = (function (mults){return merge.call(null,mults,null);
});
var merge__2 = (function (mults,buf_or_n){var out_chs = cljs.core.map.call(null,(function (p1__149022_SHARP_){return cljs.core.async.tap.call(null,p1__149022_SHARP_,cljs.core.async.chan.call(null));
}),mults);var out_ch = cljs.core.async.merge.call(null,out_chs,buf_or_n);return cljs.core.async.mult.call(null,out_ch);
});
merge = function(mults,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,mults);
case 2:
return merge__2.call(this,mults,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
ewen.async_plus.close_BANG_ = (function close_BANG_(mult){return cljs.core.async.close_BANG_.call(null,cljs.core.async.muxch_STAR_.call(null,mult));
});
ewen.async_plus.put_BANG_ = (function put_BANG_(mult,val){return cljs.core.async.put_BANG_.call(null,cljs.core.async.muxch_STAR_.call(null,mult),val);
});
ewen.async_plus.unique = (function() {
var unique = null;
var unique__1 = (function (mult){return unique.call(null,mult,null);
});
var unique__2 = (function (mult,buf_or_n){var out_ch = cljs.core.async.tap.call(null,mult,cljs.core.async.chan.call(null));var out_ch__$1 = cljs.core.async.unique.call(null,out_ch,buf_or_n);return cljs.core.async.mult.call(null,out_ch__$1);
});
unique = function(mult,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,mult);
case 2:
return unique__2.call(this,mult,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;

//# sourceMappingURL=async_plus.js.map