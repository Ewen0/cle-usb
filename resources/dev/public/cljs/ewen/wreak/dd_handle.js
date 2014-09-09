// Compiled by ClojureScript 0.0-2311
goog.provide('ewen.wreak.dd_handle');
goog.require('cljs.core');
goog.require('domina.events');
goog.require('ewen.wreak');
goog.require('domina.events');
goog.require('goog.style');
goog.require('goog.style');
goog.require('cljs.core.match');
goog.require('datascript');
goog.require('datascript');
goog.require('ewen.wreak');
goog.require('cljs.core.async');
goog.require('cljs.core.async');
/**
* A map from keywords to event types. Useful for multiplatform (desktop/mobile) compatibility.
*/
ewen.wreak.dd_handle.event_types = (cljs.core.truth_('ontouchstart' in window)?new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"down","down",1565245570),new cljs.core.Keyword(null,"touchstart","touchstart",369858804),new cljs.core.Keyword(null,"up","up",-269712113),new cljs.core.Keyword(null,"touchend","touchend",-1574059019),new cljs.core.Keyword(null,"move","move",-2110884309),new cljs.core.Keyword(null,"touchmove","touchmove",1885249923),new cljs.core.Keyword(null,"over","over",192553051),new cljs.core.Keyword(null,"touchstart","touchstart",369858804),new cljs.core.Keyword(null,"out","out",-910545517),new cljs.core.Keyword(null,"touchend","touchend",-1574059019),new cljs.core.Keyword(null,"click","click",1912301393),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null):new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"down","down",1565245570),new cljs.core.Keyword(null,"mousedown","mousedown",1391242074),new cljs.core.Keyword(null,"up","up",-269712113),new cljs.core.Keyword(null,"mouseup","mouseup",350619456),new cljs.core.Keyword(null,"move","move",-2110884309),new cljs.core.Keyword(null,"mousemove","mousemove",-1077794734),new cljs.core.Keyword(null,"over","over",192553051),new cljs.core.Keyword(null,"mouseover","mouseover",-484272303),new cljs.core.Keyword(null,"out","out",-910545517),new cljs.core.Keyword(null,"mouseout","mouseout",2049446890),new cljs.core.Keyword(null,"click","click",1912301393),new cljs.core.Keyword(null,"click","click",1912301393)], null));
ewen.wreak.dd_handle.event__GT_pos = (function event__GT_pos(e){var e__$1 = domina.events.raw_event.call(null,e).getBrowserEvent();if(cljs.core.truth_(e__$1.changedTouches))
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),e__$1.changedTouches.item((0)).pageX,new cljs.core.Keyword(null,"y","y",-1757859776),e__$1.changedTouches.item((0)).pageY], null);
} else
{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),e__$1.pageX,new cljs.core.Keyword(null,"y","y",-1757859776),e__$1.pageY], null);
}
});
ewen.wreak.dd_handle.get_dragging = (function (){if(typeof ewen.wreak.dd_handle.t152148 !== 'undefined')
{} else
{
/**
* @constructor
*/
ewen.wreak.dd_handle.t152148 = (function (meta152149){
this.meta152149 = meta152149;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393217;
})
ewen.wreak.dd_handle.t152148.cljs$lang$type = true;
ewen.wreak.dd_handle.t152148.cljs$lang$ctorStr = "ewen.wreak.dd-handle/t152148";
ewen.wreak.dd_handle.t152148.cljs$lang$ctorPrWriter = (function (this__4215__auto__,writer__4216__auto__,opt__4217__auto__){return cljs.core._write.call(null,writer__4216__auto__,"ewen.wreak.dd-handle/t152148");
});
ewen.wreak.dd_handle.t152148.prototype.datascript$IndexKeys$ = true;
ewen.wreak.dd_handle.t152148.prototype.datascript$IndexKeys$get_index_keys$arity$3 = (function (this$,db,pwd_id){var self__ = this;
var this$__$1 = this;return cljs.core.conj.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [db], null),datascript.pattern__GT_index_keys.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [pwd_id,new cljs.core.Keyword("state","dragging","state/dragging",1965974580),null,null], null))));
});
ewen.wreak.dd_handle.t152148.prototype.call = (function (self__,db,pwd_id){var self__ = this;
var self____$1 = this;var this$ = self____$1;var dragging = cljs.core.get.call(null,datascript.entity.call(null,db,pwd_id),new cljs.core.Keyword("state","dragging","state/dragging",1965974580));var or__3648__auto__ = dragging;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return false;
}
});
ewen.wreak.dd_handle.t152148.prototype.apply = (function (self__,args152151){var self__ = this;
var self____$1 = this;return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args152151)));
});
ewen.wreak.dd_handle.t152148.prototype.cljs$core$IFn$_invoke$arity$2 = (function (db,pwd_id){var self__ = this;
var this$ = this;var dragging = cljs.core.get.call(null,datascript.entity.call(null,db,pwd_id),new cljs.core.Keyword("state","dragging","state/dragging",1965974580));var or__3648__auto__ = dragging;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return false;
}
});
ewen.wreak.dd_handle.t152148.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_152150){var self__ = this;
var _152150__$1 = this;return self__.meta152149;
});
ewen.wreak.dd_handle.t152148.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_152150,meta152149__$1){var self__ = this;
var _152150__$1 = this;return (new ewen.wreak.dd_handle.t152148(meta152149__$1));
});
ewen.wreak.dd_handle.__GT_t152148 = (function __GT_t152148(meta152149){return (new ewen.wreak.dd_handle.t152148(meta152149));
});
}
return (new ewen.wreak.dd_handle.t152148(null));
})();
ewen.wreak.dd_handle.set_dragging_BANG_ = (function set_dragging_BANG_(app,pwd_id,dragging){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),pwd_id,new cljs.core.Keyword("state","dragging","state/dragging",1965974580),dragging], null)], null));
});
ewen.wreak.dd_handle.set_handle_pos_BANG_ = (function set_handle_pos_BANG_(app,pwd_id,pos){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),pwd_id,new cljs.core.Keyword("state","handle-pos","state/handle-pos",1758542798),pos], null)], null));
});
ewen.wreak.dd_handle.set_pwd_pos_BANG_ = (function set_pwd_pos_BANG_(app,pwd_id,pos){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("db","id","db/id",-1388397098),pwd_id,new cljs.core.Keyword("password","pos","password/pos",903909613),pos], null)], null));
});
ewen.wreak.dd_handle.dd_down_callback = (function dd_down_callback(app,id,e){domina.events.prevent_default.call(null,e);
ewen.wreak.dd_handle.set_dragging_BANG_.call(null,app,id,true);
return ewen.wreak.dd_handle.set_handle_pos_BANG_.call(null,app,id,(function (){var init_pos = new cljs.core.Keyword("state","init-pos","state/init-pos",973379173).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,cljs.core.deref.call(null,app),id));return (new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event__GT_pos.call(null,e)) - init_pos);
})());
});
ewen.wreak.dd_handle.dd_up_callback = (function dd_up_callback(app,id){return ewen.wreak.dd_handle.set_dragging_BANG_.call(null,app,id,false);
});
ewen.wreak.dd_handle.merge_pos = (function merge_pos(pos,handle_pos){return (new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(pos) - handle_pos);
});
ewen.wreak.dd_handle.dd_move_callback = (function dd_move_callback(app,id,e){if(cljs.core.truth_(ewen.wreak.dd_handle.get_dragging.call(null,cljs.core.deref.call(null,app),id)))
{var handle_pos = new cljs.core.Keyword("state","handle-pos","state/handle-pos",1758542798).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,cljs.core.deref.call(null,app),id));return ewen.wreak.dd_handle.set_pwd_pos_BANG_.call(null,app,id,ewen.wreak.dd_handle.merge_pos.call(null,ewen.wreak.dd_handle.event__GT_pos.call(null,e),handle_pos));
} else
{return null;
}
});
ewen.wreak.dd_handle.set_attr_BANG_ = (function set_attr_BANG_(app,id,attr,val){return datascript.transact_BANG_.call(null,app,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword("db","id","db/id",-1388397098),id,attr,val], true, false)], null));
});
ewen.wreak.dd_handle.listen_dragging_helper_BANG_ = (function listen_dragging_helper_BANG_(app,pwd_id,callback){var index_keys = datascript.get_index_keys.call(null,ewen.wreak.dd_handle.get_dragging,app,pwd_id);return datascript.listen_BANG_.call(null,app,callback,index_keys);
});
ewen.wreak.dd_handle.listen_dragging_BANG_ = (function listen_dragging_BANG_(app,id,callback){return ewen.wreak.dd_handle.listen_dragging_helper_BANG_.call(null,app,id,callback);
});
ewen.wreak.dd_handle.dd_handle_mixin = ewen.wreak.mixin.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"componentDidMount","componentDidMount",955710936),(function (p__152154,_,p__152155){var map__152156 = p__152154;var map__152156__$1 = ((cljs.core.seq_QMARK_.call(null,map__152156))?cljs.core.apply.call(null,cljs.core.hash_map,map__152156):map__152156);var id = cljs.core.get.call(null,map__152156__$1,new cljs.core.Keyword(null,"id","id",-1388402092));var map__152157 = p__152155;var map__152157__$1 = ((cljs.core.seq_QMARK_.call(null,map__152157))?cljs.core.apply.call(null,cljs.core.hash_map,map__152157):map__152157);var app = cljs.core.get.call(null,map__152157__$1,new cljs.core.Keyword(null,"app","app",-560961707));domina.events.listen_BANG_.call(null,ewen.wreak._STAR_component_STAR_.getDOMNode(),new cljs.core.Keyword(null,"down","down",1565245570).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types),((function (map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (p1__152152_SHARP_){return ewen.wreak.dd_handle.dd_down_callback.call(null,app,id,p1__152152_SHARP_);
});})(map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
);
var chan_153394 = cljs.core.async.chan.call(null);var c__5812__auto___153395 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (){var f__5813__auto__ = (function (){var switch__5797__auto__ = ((function (c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (state_152530){var state_val_152531 = (state_152530[(1)]);if((state_val_152531 === (121)))
{var state_152530__$1 = state_152530;var statearr_152532_153396 = state_152530__$1;(statearr_152532_153396[(2)] = null);
(statearr_152532_153396[(1)] = (129));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (65)))
{var inst_152271 = (state_152530[(7)]);var inst_152271__$1 = (state_152530[(2)]);var inst_152272 = (inst_152271__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152533 = state_152530;(statearr_152533[(7)] = inst_152271__$1);
return statearr_152533;
})();if(cljs.core.truth_(inst_152272))
{var statearr_152534_153397 = state_152530__$1;(statearr_152534_153397[(1)] = (66));
} else
{var statearr_152535_153398 = state_152530__$1;(statearr_152535_153398[(1)] = (67));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (70)))
{var inst_152240 = (state_152530[(8)]);var inst_152177 = (state_152530[(9)]);var inst_152160 = (state_152530[(10)]);var inst_152282 = (state_152530[(11)]);var inst_152178 = (state_152530[(12)]);var inst_152183 = (state_152530[(13)]);var inst_152268 = (state_152530[(14)]);var inst_152176 = (state_152530[(15)]);var inst_152254 = (state_152530[(16)]);var inst_152175 = (state_152530[(17)]);var inst_152169 = (state_152530[(18)]);var inst_152168 = (state_152530[(19)]);var inst_152285 = new cljs.core.Keyword(null,"move","move",-2110884309).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types);var inst_152286 = (function (){var temp__4126__auto__ = inst_152160;var chunk__152171 = inst_152176;var i__152173 = inst_152178;var datom_added__152191 = inst_152254;var seq__152170 = inst_152175;var datom_a__152193 = inst_152282;var datom = inst_152183;var count__152172 = inst_152177;var datom_v__152190 = inst_152240;var tx_data = inst_152169;var map__152162 = inst_152168;var datom_e__152192 = inst_152268;return ((function (temp__4126__auto__,chunk__152171,i__152173,datom_added__152191,seq__152170,datom_a__152193,datom,count__152172,datom_v__152190,tx_data,map__152162,datom_e__152192,inst_152240,inst_152177,inst_152160,inst_152282,inst_152178,inst_152183,inst_152268,inst_152176,inst_152254,inst_152175,inst_152169,inst_152168,inst_152285,state_val_152531,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (p1__152153_SHARP_){return ewen.wreak.dd_handle.dd_move_callback.call(null,app,id,p1__152153_SHARP_);
});
;})(temp__4126__auto__,chunk__152171,i__152173,datom_added__152191,seq__152170,datom_a__152193,datom,count__152172,datom_v__152190,tx_data,map__152162,datom_e__152192,inst_152240,inst_152177,inst_152160,inst_152282,inst_152178,inst_152183,inst_152268,inst_152176,inst_152254,inst_152175,inst_152169,inst_152168,inst_152285,state_val_152531,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
})();var inst_152287 = domina.events.listen_BANG_.call(null,inst_152285,inst_152286);var inst_152288 = new cljs.core.Keyword(null,"up","up",-269712113).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types);var inst_152289 = (function (){var temp__4126__auto__ = inst_152160;var chunk__152171 = inst_152176;var i__152173 = inst_152178;var datom_added__152191 = inst_152254;var seq__152170 = inst_152175;var datom_a__152193 = inst_152282;var datom = inst_152183;var count__152172 = inst_152177;var datom_v__152190 = inst_152240;var tx_data = inst_152169;var map__152162 = inst_152168;var datom_e__152192 = inst_152268;return ((function (temp__4126__auto__,chunk__152171,i__152173,datom_added__152191,seq__152170,datom_a__152193,datom,count__152172,datom_v__152190,tx_data,map__152162,datom_e__152192,inst_152240,inst_152177,inst_152160,inst_152282,inst_152178,inst_152183,inst_152268,inst_152176,inst_152254,inst_152175,inst_152169,inst_152168,inst_152285,inst_152286,inst_152287,inst_152288,state_val_152531,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (){return ewen.wreak.dd_handle.dd_up_callback.call(null,app,id);
});
;})(temp__4126__auto__,chunk__152171,i__152173,datom_added__152191,seq__152170,datom_a__152193,datom,count__152172,datom_v__152190,tx_data,map__152162,datom_e__152192,inst_152240,inst_152177,inst_152160,inst_152282,inst_152178,inst_152183,inst_152268,inst_152176,inst_152254,inst_152175,inst_152169,inst_152168,inst_152285,inst_152286,inst_152287,inst_152288,state_val_152531,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
})();var inst_152290 = domina.events.listen_BANG_.call(null,inst_152288,inst_152289);var state_152530__$1 = (function (){var statearr_152536 = state_152530;(statearr_152536[(20)] = inst_152287);
return statearr_152536;
})();var statearr_152537_153399 = state_152530__$1;(statearr_152537_153399[(2)] = inst_152290);
(statearr_152537_153399[(1)] = (72));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (62)))
{var state_152530__$1 = state_152530;var statearr_152538_153400 = state_152530__$1;(statearr_152538_153400[(1)] = (76));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (74)))
{var state_152530__$1 = state_152530;var statearr_152540_153401 = state_152530__$1;(statearr_152540_153401[(2)] = null);
(statearr_152540_153401[(1)] = (75));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (164)))
{var state_152530__$1 = state_152530;var statearr_152541_153402 = state_152530__$1;(statearr_152541_153402[(2)] = null);
(statearr_152541_153402[(1)] = (165));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (110)))
{var state_152530__$1 = state_152530;var statearr_152542_153403 = state_152530__$1;(statearr_152542_153403[(2)] = false);
(statearr_152542_153403[(1)] = (111));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (130)))
{var state_152530__$1 = state_152530;var statearr_152543_153404 = state_152530__$1;(statearr_152543_153404[(2)] = null);
(statearr_152543_153404[(1)] = (138));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (128)))
{var inst_152420 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152544_153405 = state_152530__$1;(statearr_152544_153405[(2)] = inst_152420);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (153)))
{var inst_152466 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152545_153406 = state_152530__$1;(statearr_152545_153406[(2)] = inst_152466);
(statearr_152545_153406[(1)] = (150));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (7)))
{var inst_152525 = (state_152530[(2)]);var inst_152526 = cljs.core.async.close_BANG_.call(null,chan_153394);var state_152530__$1 = (function (){var statearr_152546 = state_152530;(statearr_152546[(21)] = inst_152525);
return statearr_152546;
})();var statearr_152547_153407 = state_152530__$1;(statearr_152547_153407[(2)] = inst_152526);
(statearr_152547_153407[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (59)))
{var inst_152264 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152548_153408 = state_152530__$1;(statearr_152548_153408[(2)] = inst_152264);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (86)))
{var state_152530__$1 = state_152530;var statearr_152549_153409 = state_152530__$1;(statearr_152549_153409[(2)] = null);
(statearr_152549_153409[(1)] = (87));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (154)))
{var inst_152473 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152550_153410 = state_152530__$1;(statearr_152550_153410[(2)] = inst_152473);
(statearr_152550_153410[(1)] = (156));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (20)))
{var inst_152200 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152551_153411 = state_152530__$1;(statearr_152551_153411[(2)] = inst_152200);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (72)))
{var inst_152298 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152552_153412 = state_152530__$1;(statearr_152552_153412[(2)] = inst_152298);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (58)))
{var inst_152257 = (state_152530[(22)]);var inst_152262 = (function(){throw inst_152257})();var state_152530__$1 = state_152530;var statearr_152553_153413 = state_152530__$1;(statearr_152553_153413[(2)] = inst_152262);
(statearr_152553_153413[(1)] = (59));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (60)))
{var inst_152183 = (state_152530[(13)]);var inst_152268 = (state_152530[(14)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(56),Error,null,(55));var inst_152268__$1 = cljs.core.get.call(null,inst_152183,new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152269 = cljs.core._EQ_.call(null,inst_152268__$1,id);var state_152530__$1 = (function (){var statearr_152554 = state_152530;(statearr_152554[(14)] = inst_152268__$1);
return statearr_152554;
})();if(inst_152269)
{var statearr_152555_153414 = state_152530__$1;(statearr_152555_153414[(1)] = (61));
} else
{var statearr_152556_153415 = state_152530__$1;(statearr_152556_153415[(1)] = (62));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (27)))
{var inst_152212 = (state_152530[(2)]);var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152212))
{var statearr_152557_153416 = state_152530__$1;(statearr_152557_153416[(1)] = (28));
} else
{var statearr_152558_153417 = state_152530__$1;(statearr_152558_153417[(1)] = (29));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (1)))
{var state_152530__$1 = state_152530;var statearr_152559_153418 = state_152530__$1;(statearr_152559_153418[(2)] = null);
(statearr_152559_153418[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (69)))
{var inst_152282 = (state_152530[(11)]);var inst_152183 = (state_152530[(13)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(65),Error,null,(64));var inst_152282__$1 = cljs.core.get.call(null,inst_152183,new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152283 = cljs.core.keyword_identical_QMARK_.call(null,inst_152282__$1,new cljs.core.Keyword("state","dragging","state/dragging",1965974580));var state_152530__$1 = (function (){var statearr_152560 = state_152530;(statearr_152560[(11)] = inst_152282__$1);
return statearr_152560;
})();if(inst_152283)
{var statearr_152561_153419 = state_152530__$1;(statearr_152561_153419[(1)] = (70));
} else
{var statearr_152562_153420 = state_152530__$1;(statearr_152562_153420[(1)] = (71));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (101)))
{var inst_152353 = (state_152530[(23)]);var inst_152395 = cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,inst_152353);var state_152530__$1 = state_152530;var statearr_152563_153421 = state_152530__$1;(statearr_152563_153421[(2)] = inst_152395);
(statearr_152563_153421[(1)] = (102));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (24)))
{var inst_152227 = (state_152530[(2)]);var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152227))
{var statearr_152564_153422 = state_152530__$1;(statearr_152564_153422[(1)] = (34));
} else
{var statearr_152565_153423 = state_152530__$1;(statearr_152565_153423[(1)] = (35));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (102)))
{var inst_152397 = (state_152530[(2)]);var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152397))
{var statearr_152566_153424 = state_152530__$1;(statearr_152566_153424[(1)] = (112));
} else
{var statearr_152567_153425 = state_152530__$1;(statearr_152567_153425[(1)] = (113));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (135)))
{var inst_152430 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152568_153426 = state_152530__$1;(statearr_152568_153426[(2)] = inst_152430);
(statearr_152568_153426[(1)] = (137));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (55)))
{var inst_152310 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152569_153427 = state_152530__$1;(statearr_152569_153427[(2)] = inst_152310);
(statearr_152569_153427[(1)] = (54));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (165)))
{var inst_152506 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152570_153428 = state_152530__$1;(statearr_152570_153428[(2)] = inst_152506);
(statearr_152570_153428[(1)] = (114));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (85)))
{var inst_152333 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152571_153429 = state_152530__$1;(statearr_152571_153429[(2)] = inst_152333);
(statearr_152571_153429[(1)] = (87));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (39)))
{var inst_152232 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152572_153430 = state_152530__$1;(statearr_152572_153430[(2)] = inst_152232);
(statearr_152572_153430[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (88)))
{var inst_152344 = (state_152530[(24)]);var inst_152346 = cljs.core.chunked_seq_QMARK_.call(null,inst_152344);var state_152530__$1 = state_152530;if(inst_152346)
{var statearr_152573_153431 = state_152530__$1;(statearr_152573_153431[(1)] = (91));
} else
{var statearr_152574_153432 = state_152530__$1;(statearr_152574_153432[(1)] = (92));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (46)))
{var inst_152320 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152575_153433 = state_152530__$1;(statearr_152575_153433[(2)] = inst_152320);
(statearr_152575_153433[(1)] = (45));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (149)))
{var state_152530__$1 = state_152530;var statearr_152576_153434 = state_152530__$1;(statearr_152576_153434[(1)] = (151));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (157)))
{var inst_152483 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152578_153435 = state_152530__$1;(statearr_152578_153435[(2)] = inst_152483);
(statearr_152578_153435[(1)] = (159));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (4)))
{var inst_152160 = (state_152530[(10)]);var inst_152160__$1 = (state_152530[(2)]);var state_152530__$1 = (function (){var statearr_152579 = state_152530;(statearr_152579[(10)] = inst_152160__$1);
return statearr_152579;
})();if(cljs.core.truth_(inst_152160__$1))
{var statearr_152580_153436 = state_152530__$1;(statearr_152580_153436[(1)] = (5));
} else
{var statearr_152581_153437 = state_152530__$1;(statearr_152581_153437[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (77)))
{var state_152530__$1 = state_152530;var statearr_152582_153438 = state_152530__$1;(statearr_152582_153438[(2)] = null);
(statearr_152582_153438[(1)] = (78));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (106)))
{var state_152530__$1 = state_152530;var statearr_152583_153439 = state_152530__$1;(statearr_152583_153439[(2)] = true);
(statearr_152583_153439[(1)] = (108));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (119)))
{var inst_152406 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152584_153440 = state_152530__$1;(statearr_152584_153440[(2)] = inst_152406);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (95)))
{var inst_152364 = (state_152530[(25)]);var inst_152364__$1 = (state_152530[(2)]);var inst_152365 = (inst_152364__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152585 = state_152530;(statearr_152585[(25)] = inst_152364__$1);
return statearr_152585;
})();if(cljs.core.truth_(inst_152365))
{var statearr_152586_153441 = state_152530__$1;(statearr_152586_153441[(1)] = (96));
} else
{var statearr_152587_153442 = state_152530__$1;(statearr_152587_153442[(1)] = (97));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (144)))
{var inst_152444 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152588_153443 = state_152530__$1;(statearr_152588_153443[(2)] = inst_152444);
(statearr_152588_153443[(1)] = (146));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (54)))
{var inst_152318 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152589_153444 = state_152530__$1;(statearr_152589_153444[(2)] = inst_152318);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (92)))
{var inst_152344 = (state_152530[(24)]);var inst_152353 = cljs.core.first.call(null,inst_152344);var state_152530__$1 = (function (){var statearr_152590 = state_152530;(statearr_152590[(23)] = inst_152353);
return statearr_152590;
})();var statearr_152591_153445 = state_152530__$1;(statearr_152591_153445[(2)] = null);
(statearr_152591_153445[(1)] = (99));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (141)))
{var inst_152478 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152592_153446 = state_152530__$1;(statearr_152592_153446[(2)] = inst_152478);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (137)))
{var inst_152434 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152593_153447 = state_152530__$1;(statearr_152593_153447[(2)] = inst_152434);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (104)))
{var inst_152353 = (state_152530[(23)]);var inst_152380 = inst_152353.cljs$core$ILookup$;var state_152530__$1 = state_152530;var statearr_152594_153448 = state_152530__$1;(statearr_152594_153448[(2)] = inst_152380);
(statearr_152594_153448[(1)] = (105));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (15)))
{var inst_152519 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152595_153449 = state_152530__$1;(statearr_152595_153449[(2)] = inst_152519);
(statearr_152595_153449[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (48)))
{var inst_152246 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152596_153450 = state_152530__$1;(statearr_152596_153450[(2)] = inst_152246);
(statearr_152596_153450[(1)] = (50));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (50)))
{var inst_152250 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152597_153451 = state_152530__$1;(statearr_152597_153451[(2)] = inst_152250);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (116)))
{var inst_152399 = (state_152530[(26)]);var inst_152399__$1 = (state_152530[(2)]);var inst_152400 = (inst_152399__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152598 = state_152530;(statearr_152598[(26)] = inst_152399__$1);
return statearr_152598;
})();if(cljs.core.truth_(inst_152400))
{var statearr_152599_153452 = state_152530__$1;(statearr_152599_153452[(1)] = (117));
} else
{var statearr_152600_153453 = state_152530__$1;(statearr_152600_153453[(1)] = (118));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (75)))
{var inst_152296 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152601_153454 = state_152530__$1;(statearr_152601_153454[(2)] = inst_152296);
(statearr_152601_153454[(1)] = (72));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (159)))
{var inst_152486 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152602_153455 = state_152530__$1;(statearr_152602_153455[(2)] = inst_152486);
(statearr_152602_153455[(1)] = (132));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (99)))
{var inst_152353 = (state_152530[(23)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(95),Error,null,(94));var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152353))
{var statearr_152603_153456 = state_152530__$1;(statearr_152603_153456[(1)] = (100));
} else
{var statearr_152604_153457 = state_152530__$1;(statearr_152604_153457[(1)] = (101));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (21)))
{var inst_152183 = (state_152530[(13)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(17),Error,null,(16));var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152183))
{var statearr_152605_153458 = state_152530__$1;(statearr_152605_153458[(1)] = (22));
} else
{var statearr_152606_153459 = state_152530__$1;(statearr_152606_153459[(1)] = (23));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (31)))
{var inst_152183 = (state_152530[(13)]);var inst_152218 = cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,inst_152183);var state_152530__$1 = state_152530;var statearr_152607_153460 = state_152530__$1;(statearr_152607_153460[(2)] = inst_152218);
(statearr_152607_153460[(1)] = (33));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (113)))
{var state_152530__$1 = state_152530;var statearr_152608_153461 = state_152530__$1;(statearr_152608_153461[(1)] = (163));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (32)))
{var state_152530__$1 = state_152530;var statearr_152610_153462 = state_152530__$1;(statearr_152610_153462[(2)] = false);
(statearr_152610_153462[(1)] = (33));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (136)))
{var inst_152427 = (state_152530[(27)]);var inst_152432 = (function(){throw inst_152427})();var state_152530__$1 = state_152530;var statearr_152611_153463 = state_152530__$1;(statearr_152611_153463[(2)] = inst_152432);
(statearr_152611_153463[(1)] = (137));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (139)))
{var state_152530__$1 = state_152530;var statearr_152612_153464 = state_152530__$1;(statearr_152612_153464[(2)] = null);
(statearr_152612_153464[(1)] = (147));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (40)))
{var inst_152229 = (state_152530[(28)]);var inst_152234 = (function(){throw inst_152229})();var state_152530__$1 = state_152530;var statearr_152613_153465 = state_152530__$1;(statearr_152613_153465[(2)] = inst_152234);
(statearr_152613_153465[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (129)))
{var inst_152353 = (state_152530[(23)]);var inst_152424 = (state_152530[(29)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(125),Error,null,(124));var inst_152424__$1 = cljs.core.get.call(null,inst_152353,new cljs.core.Keyword(null,"added","added",2057651688),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152425 = (inst_152424__$1 === true);var state_152530__$1 = (function (){var statearr_152614 = state_152530;(statearr_152614[(29)] = inst_152424__$1);
return statearr_152614;
})();if(cljs.core.truth_(inst_152425))
{var statearr_152615_153466 = state_152530__$1;(statearr_152615_153466[(1)] = (130));
} else
{var statearr_152616_153467 = state_152530__$1;(statearr_152616_153467[(1)] = (131));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (91)))
{var inst_152344 = (state_152530[(24)]);var inst_152348 = cljs.core.chunk_first.call(null,inst_152344);var inst_152349 = cljs.core.chunk_rest.call(null,inst_152344);var inst_152350 = cljs.core.count.call(null,inst_152348);var inst_152175 = inst_152349;var inst_152176 = inst_152348;var inst_152177 = inst_152350;var inst_152178 = (0);var state_152530__$1 = (function (){var statearr_152617 = state_152530;(statearr_152617[(9)] = inst_152177);
(statearr_152617[(12)] = inst_152178);
(statearr_152617[(15)] = inst_152176);
(statearr_152617[(17)] = inst_152175);
return statearr_152617;
})();var statearr_152618_153468 = state_152530__$1;(statearr_152618_153468[(2)] = null);
(statearr_152618_153468[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (117)))
{var inst_152402 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152619_153469 = state_152530__$1;(statearr_152619_153469[(2)] = inst_152402);
(statearr_152619_153469[(1)] = (119));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (108)))
{var inst_152393 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152620_153470 = state_152530__$1;(statearr_152620_153470[(2)] = inst_152393);
(statearr_152620_153470[(1)] = (102));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (156)))
{var inst_152476 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152621_153471 = state_152530__$1;(statearr_152621_153471[(2)] = inst_152476);
(statearr_152621_153471[(1)] = (141));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (56)))
{var inst_152257 = (state_152530[(22)]);var inst_152257__$1 = (state_152530[(2)]);var inst_152258 = (inst_152257__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152622 = state_152530;(statearr_152622[(22)] = inst_152257__$1);
return statearr_152622;
})();if(cljs.core.truth_(inst_152258))
{var statearr_152623_153472 = state_152530__$1;(statearr_152623_153472[(1)] = (57));
} else
{var statearr_152624_153473 = state_152530__$1;(statearr_152624_153473[(1)] = (58));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (33)))
{var inst_152221 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152625_153474 = state_152530__$1;(statearr_152625_153474[(2)] = inst_152221);
(statearr_152625_153474[(1)] = (30));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (13)))
{var inst_152178 = (state_152530[(12)]);var inst_152176 = (state_152530[(15)]);var inst_152183 = cljs.core._nth.call(null,inst_152176,inst_152178);var state_152530__$1 = (function (){var statearr_152626 = state_152530;(statearr_152626[(13)] = inst_152183);
return statearr_152626;
})();var statearr_152627_153475 = state_152530__$1;(statearr_152627_153475[(2)] = null);
(statearr_152627_153475[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (22)))
{var inst_152207 = (state_152530[(30)]);var inst_152183 = (state_152530[(13)]);var inst_152206 = inst_152183.cljs$lang$protocol_mask$partition0$;var inst_152207__$1 = (inst_152206 & (256));var state_152530__$1 = (function (){var statearr_152628 = state_152530;(statearr_152628[(30)] = inst_152207__$1);
return statearr_152628;
})();if(cljs.core.truth_(inst_152207__$1))
{var statearr_152629_153476 = state_152530__$1;(statearr_152629_153476[(1)] = (25));
} else
{var statearr_152630_153477 = state_152530__$1;(statearr_152630_153477[(1)] = (26));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (90)))
{var inst_152517 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152631_153478 = state_152530__$1;(statearr_152631_153478[(2)] = inst_152517);
(statearr_152631_153478[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (109)))
{var inst_152353 = (state_152530[(23)]);var inst_152388 = cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,inst_152353);var state_152530__$1 = state_152530;var statearr_152632_153479 = state_152530__$1;(statearr_152632_153479[(2)] = inst_152388);
(statearr_152632_153479[(1)] = (111));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (143)))
{var inst_152441 = (state_152530[(31)]);var inst_152441__$1 = (state_152530[(2)]);var inst_152442 = (inst_152441__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152633 = state_152530;(statearr_152633[(31)] = inst_152441__$1);
return statearr_152633;
})();if(cljs.core.truth_(inst_152442))
{var statearr_152634_153480 = state_152530__$1;(statearr_152634_153480[(1)] = (144));
} else
{var statearr_152635_153481 = state_152530__$1;(statearr_152635_153481[(1)] = (145));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (36)))
{var inst_152338 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152636_153482 = state_152530__$1;(statearr_152636_153482[(2)] = inst_152338);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (41)))
{var inst_152236 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152637_153483 = state_152530__$1;(statearr_152637_153483[(2)] = inst_152236);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (118)))
{var inst_152399 = (state_152530[(26)]);var inst_152404 = (function(){throw inst_152399})();var state_152530__$1 = state_152530;var statearr_152638_153484 = state_152530__$1;(statearr_152638_153484[(2)] = inst_152404);
(statearr_152638_153484[(1)] = (119));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (150)))
{var inst_152468 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152639_153485 = state_152530__$1;(statearr_152639_153485[(2)] = inst_152468);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (162)))
{var inst_152496 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152640_153486 = state_152530__$1;(statearr_152640_153486[(2)] = inst_152496);
(statearr_152640_153486[(1)] = (123));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (89)))
{var state_152530__$1 = state_152530;var statearr_152641_153487 = state_152530__$1;(statearr_152641_153487[(2)] = null);
(statearr_152641_153487[(1)] = (90));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (100)))
{var inst_152353 = (state_152530[(23)]);var inst_152377 = (state_152530[(32)]);var inst_152376 = inst_152353.cljs$lang$protocol_mask$partition0$;var inst_152377__$1 = (inst_152376 & (256));var state_152530__$1 = (function (){var statearr_152642 = state_152530;(statearr_152642[(32)] = inst_152377__$1);
return statearr_152642;
})();if(cljs.core.truth_(inst_152377__$1))
{var statearr_152643_153488 = state_152530__$1;(statearr_152643_153488[(1)] = (103));
} else
{var statearr_152644_153489 = state_152530__$1;(statearr_152644_153489[(1)] = (104));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (131)))
{var state_152530__$1 = state_152530;var statearr_152645_153490 = state_152530__$1;(statearr_152645_153490[(1)] = (157));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (122)))
{var state_152530__$1 = state_152530;var statearr_152647_153491 = state_152530__$1;(statearr_152647_153491[(1)] = (160));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (43)))
{var state_152530__$1 = state_152530;var statearr_152649_153492 = state_152530__$1;(statearr_152649_153492[(2)] = null);
(statearr_152649_153492[(1)] = (51));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (61)))
{var state_152530__$1 = state_152530;var statearr_152650_153493 = state_152530__$1;(statearr_152650_153493[(2)] = null);
(statearr_152650_153493[(1)] = (69));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (29)))
{var inst_152183 = (state_152530[(13)]);var inst_152215 = inst_152183.cljs$lang$protocol_mask$partition0$;var inst_152216 = (!inst_152215);var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152216))
{var statearr_152651_153494 = state_152530__$1;(statearr_152651_153494[(1)] = (31));
} else
{var statearr_152652_153495 = state_152530__$1;(statearr_152652_153495[(1)] = (32));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (151)))
{var inst_152463 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152653_153496 = state_152530__$1;(statearr_152653_153496[(2)] = inst_152463);
(statearr_152653_153496[(1)] = (153));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (44)))
{var state_152530__$1 = state_152530;var statearr_152654_153497 = state_152530__$1;(statearr_152654_153497[(1)] = (82));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (93)))
{var inst_152514 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152656_153498 = state_152530__$1;(statearr_152656_153498[(2)] = inst_152514);
(statearr_152656_153498[(1)] = (90));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (6)))
{var state_152530__$1 = state_152530;var statearr_152657_153499 = state_152530__$1;(statearr_152657_153499[(2)] = null);
(statearr_152657_153499[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (111)))
{var inst_152391 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152658_153500 = state_152530__$1;(statearr_152658_153500[(2)] = inst_152391);
(statearr_152658_153500[(1)] = (108));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (28)))
{var state_152530__$1 = state_152530;var statearr_152659_153501 = state_152530__$1;(statearr_152659_153501[(2)] = true);
(statearr_152659_153501[(1)] = (30));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (134)))
{var inst_152427 = (state_152530[(27)]);var inst_152427__$1 = (state_152530[(2)]);var inst_152428 = (inst_152427__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152660 = state_152530;(statearr_152660[(27)] = inst_152427__$1);
return statearr_152660;
})();if(cljs.core.truth_(inst_152428))
{var statearr_152661_153502 = state_152530__$1;(statearr_152661_153502[(1)] = (135));
} else
{var statearr_152662_153503 = state_152530__$1;(statearr_152662_153503[(1)] = (136));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (64)))
{var inst_152300 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152663_153504 = state_152530__$1;(statearr_152663_153504[(2)] = inst_152300);
(statearr_152663_153504[(1)] = (63));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (155)))
{var state_152530__$1 = state_152530;var statearr_152664_153505 = state_152530__$1;(statearr_152664_153505[(2)] = null);
(statearr_152664_153505[(1)] = (156));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (103)))
{var inst_152377 = (state_152530[(32)]);var state_152530__$1 = state_152530;var statearr_152665_153506 = state_152530__$1;(statearr_152665_153506[(2)] = inst_152377);
(statearr_152665_153506[(1)] = (105));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (51)))
{var inst_152183 = (state_152530[(13)]);var inst_152254 = (state_152530[(16)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(47),Error,null,(46));var inst_152254__$1 = cljs.core.get.call(null,inst_152183,new cljs.core.Keyword(null,"added","added",2057651688),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152255 = (inst_152254__$1 === true);var state_152530__$1 = (function (){var statearr_152666 = state_152530;(statearr_152666[(16)] = inst_152254__$1);
return statearr_152666;
})();if(cljs.core.truth_(inst_152255))
{var statearr_152667_153507 = state_152530__$1;(statearr_152667_153507[(1)] = (52));
} else
{var statearr_152668_153508 = state_152530__$1;(statearr_152668_153508[(1)] = (53));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (25)))
{var inst_152207 = (state_152530[(30)]);var state_152530__$1 = state_152530;var statearr_152669_153509 = state_152530__$1;(statearr_152669_153509[(2)] = inst_152207);
(statearr_152669_153509[(1)] = (27));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (34)))
{var state_152530__$1 = state_152530;var statearr_152670_153510 = state_152530__$1;(statearr_152670_153510[(2)] = null);
(statearr_152670_153510[(1)] = (42));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (146)))
{var inst_152448 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152671_153511 = state_152530__$1;(statearr_152671_153511[(2)] = inst_152448);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (125)))
{var inst_152413 = (state_152530[(33)]);var inst_152413__$1 = (state_152530[(2)]);var inst_152414 = (inst_152413__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152672 = state_152530;(statearr_152672[(33)] = inst_152413__$1);
return statearr_152672;
})();if(cljs.core.truth_(inst_152414))
{var statearr_152673_153512 = state_152530__$1;(statearr_152673_153512[(1)] = (126));
} else
{var statearr_152674_153513 = state_152530__$1;(statearr_152674_153513[(1)] = (127));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (148)))
{var inst_152177 = (state_152530[(9)]);var inst_152344 = (state_152530[(24)]);var inst_152353 = (state_152530[(23)]);var inst_152424 = (state_152530[(29)]);var inst_152178 = (state_152530[(12)]);var inst_152176 = (state_152530[(15)]);var inst_152410 = (state_152530[(34)]);var inst_152438 = (state_152530[(35)]);var inst_152169 = (state_152530[(18)]);var inst_152452 = (state_152530[(36)]);var inst_152168 = (state_152530[(19)]);var inst_152455 = new cljs.core.Keyword(null,"move","move",-2110884309).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types);var inst_152456 = (function (){var temp__4126__auto__ = inst_152344;var chunk__152171 = inst_152176;var i__152173 = inst_152178;var seq__152170 = inst_152344;var datom = inst_152353;var count__152172 = inst_152177;var datom_added__152361 = inst_152424;var datom_v__152360 = inst_152410;var datom_a__152363 = inst_152452;var tx_data = inst_152169;var datom_e__152362 = inst_152438;var map__152162 = inst_152168;return ((function (temp__4126__auto__,chunk__152171,i__152173,seq__152170,datom,count__152172,datom_added__152361,datom_v__152360,datom_a__152363,tx_data,datom_e__152362,map__152162,inst_152177,inst_152344,inst_152353,inst_152424,inst_152178,inst_152176,inst_152410,inst_152438,inst_152169,inst_152452,inst_152168,inst_152455,state_val_152531,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (p1__152153_SHARP_){return ewen.wreak.dd_handle.dd_move_callback.call(null,app,id,p1__152153_SHARP_);
});
;})(temp__4126__auto__,chunk__152171,i__152173,seq__152170,datom,count__152172,datom_added__152361,datom_v__152360,datom_a__152363,tx_data,datom_e__152362,map__152162,inst_152177,inst_152344,inst_152353,inst_152424,inst_152178,inst_152176,inst_152410,inst_152438,inst_152169,inst_152452,inst_152168,inst_152455,state_val_152531,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
})();var inst_152457 = domina.events.listen_BANG_.call(null,inst_152455,inst_152456);var inst_152458 = new cljs.core.Keyword(null,"up","up",-269712113).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types);var inst_152459 = (function (){var temp__4126__auto__ = inst_152344;var chunk__152171 = inst_152176;var i__152173 = inst_152178;var seq__152170 = inst_152344;var datom = inst_152353;var count__152172 = inst_152177;var datom_added__152361 = inst_152424;var datom_v__152360 = inst_152410;var datom_a__152363 = inst_152452;var tx_data = inst_152169;var datom_e__152362 = inst_152438;var map__152162 = inst_152168;return ((function (temp__4126__auto__,chunk__152171,i__152173,seq__152170,datom,count__152172,datom_added__152361,datom_v__152360,datom_a__152363,tx_data,datom_e__152362,map__152162,inst_152177,inst_152344,inst_152353,inst_152424,inst_152178,inst_152176,inst_152410,inst_152438,inst_152169,inst_152452,inst_152168,inst_152455,inst_152456,inst_152457,inst_152458,state_val_152531,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (){return ewen.wreak.dd_handle.dd_up_callback.call(null,app,id);
});
;})(temp__4126__auto__,chunk__152171,i__152173,seq__152170,datom,count__152172,datom_added__152361,datom_v__152360,datom_a__152363,tx_data,datom_e__152362,map__152162,inst_152177,inst_152344,inst_152353,inst_152424,inst_152178,inst_152176,inst_152410,inst_152438,inst_152169,inst_152452,inst_152168,inst_152455,inst_152456,inst_152457,inst_152458,state_val_152531,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
})();var inst_152460 = domina.events.listen_BANG_.call(null,inst_152458,inst_152459);var state_152530__$1 = (function (){var statearr_152675 = state_152530;(statearr_152675[(37)] = inst_152457);
return statearr_152675;
})();var statearr_152676_153514 = state_152530__$1;(statearr_152676_153514[(2)] = inst_152460);
(statearr_152676_153514[(1)] = (150));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (17)))
{var inst_152194 = (state_152530[(38)]);var inst_152194__$1 = (state_152530[(2)]);var inst_152195 = (inst_152194__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152677 = state_152530;(statearr_152677[(38)] = inst_152194__$1);
return statearr_152677;
})();if(cljs.core.truth_(inst_152195))
{var statearr_152678_153515 = state_152530__$1;(statearr_152678_153515[(1)] = (18));
} else
{var statearr_152679_153516 = state_152530__$1;(statearr_152679_153516[(1)] = (19));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (3)))
{var inst_152528 = (state_152530[(2)]);var state_152530__$1 = state_152530;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_152530__$1,inst_152528);
} else
{if((state_val_152531 === (12)))
{var inst_152521 = (state_152530[(2)]);var state_152530__$1 = (function (){var statearr_152680 = state_152530;(statearr_152680[(39)] = inst_152521);
return statearr_152680;
})();var statearr_152681_153517 = state_152530__$1;(statearr_152681_153517[(2)] = null);
(statearr_152681_153517[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (152)))
{var state_152530__$1 = state_152530;var statearr_152682_153518 = state_152530__$1;(statearr_152682_153518[(2)] = null);
(statearr_152682_153518[(1)] = (153));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (2)))
{var state_152530__$1 = state_152530;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_152530__$1,(4),chan_153394);
} else
{if((state_val_152531 === (66)))
{var inst_152274 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152683_153519 = state_152530__$1;(statearr_152683_153519[(2)] = inst_152274);
(statearr_152683_153519[(1)] = (68));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (142)))
{var inst_152470 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152684_153520 = state_152530__$1;(statearr_152684_153520[(2)] = inst_152470);
(statearr_152684_153520[(1)] = (141));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (107)))
{var inst_152353 = (state_152530[(23)]);var inst_152385 = inst_152353.cljs$lang$protocol_mask$partition0$;var inst_152386 = (!inst_152385);var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152386))
{var statearr_152685_153521 = state_152530__$1;(statearr_152685_153521[(1)] = (109));
} else
{var statearr_152686_153522 = state_152530__$1;(statearr_152686_153522[(1)] = (110));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (23)))
{var inst_152183 = (state_152530[(13)]);var inst_152225 = cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,inst_152183);var state_152530__$1 = state_152530;var statearr_152687_153523 = state_152530__$1;(statearr_152687_153523[(2)] = inst_152225);
(statearr_152687_153523[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (47)))
{var inst_152243 = (state_152530[(40)]);var inst_152243__$1 = (state_152530[(2)]);var inst_152244 = (inst_152243__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152688 = state_152530;(statearr_152688[(40)] = inst_152243__$1);
return statearr_152688;
})();if(cljs.core.truth_(inst_152244))
{var statearr_152689_153524 = state_152530__$1;(statearr_152689_153524[(1)] = (48));
} else
{var statearr_152690_153525 = state_152530__$1;(statearr_152690_153525[(1)] = (49));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (158)))
{var state_152530__$1 = state_152530;var statearr_152691_153526 = state_152530__$1;(statearr_152691_153526[(2)] = null);
(statearr_152691_153526[(1)] = (159));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (35)))
{var state_152530__$1 = state_152530;var statearr_152692_153527 = state_152530__$1;(statearr_152692_153527[(1)] = (85));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (127)))
{var inst_152413 = (state_152530[(33)]);var inst_152418 = (function(){throw inst_152413})();var state_152530__$1 = state_152530;var statearr_152694_153528 = state_152530__$1;(statearr_152694_153528[(2)] = inst_152418);
(statearr_152694_153528[(1)] = (128));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (82)))
{var inst_152323 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152695_153529 = state_152530__$1;(statearr_152695_153529[(2)] = inst_152323);
(statearr_152695_153529[(1)] = (84));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (76)))
{var inst_152303 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152696_153530 = state_152530__$1;(statearr_152696_153530[(2)] = inst_152303);
(statearr_152696_153530[(1)] = (78));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (97)))
{var inst_152364 = (state_152530[(25)]);var inst_152368 = (function(){throw inst_152364})();var state_152530__$1 = state_152530;var statearr_152697_153531 = state_152530__$1;(statearr_152697_153531[(2)] = inst_152368);
(statearr_152697_153531[(1)] = (98));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (19)))
{var inst_152194 = (state_152530[(38)]);var inst_152198 = (function(){throw inst_152194})();var state_152530__$1 = state_152530;var statearr_152698_153532 = state_152530__$1;(statearr_152698_153532[(2)] = inst_152198);
(statearr_152698_153532[(1)] = (20));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (57)))
{var inst_152260 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152699_153533 = state_152530__$1;(statearr_152699_153533[(2)] = inst_152260);
(statearr_152699_153533[(1)] = (59));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (68)))
{var inst_152278 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152700_153534 = state_152530__$1;(statearr_152700_153534[(2)] = inst_152278);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (11)))
{var inst_152177 = (state_152530[(9)]);var inst_152178 = (state_152530[(12)]);var inst_152180 = (inst_152178 < inst_152177);var inst_152181 = inst_152180;var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152181))
{var statearr_152701_153535 = state_152530__$1;(statearr_152701_153535[(1)] = (13));
} else
{var statearr_152702_153536 = state_152530__$1;(statearr_152702_153536[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (115)))
{var inst_152500 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152703_153537 = state_152530__$1;(statearr_152703_153537[(2)] = inst_152500);
(statearr_152703_153537[(1)] = (114));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (9)))
{var inst_152160 = (state_152530[(10)]);var state_152530__$1 = state_152530;var statearr_152704_153538 = state_152530__$1;(statearr_152704_153538[(2)] = inst_152160);
(statearr_152704_153538[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (145)))
{var inst_152441 = (state_152530[(31)]);var inst_152446 = (function(){throw inst_152441})();var state_152530__$1 = state_152530;var statearr_152705_153539 = state_152530__$1;(statearr_152705_153539[(2)] = inst_152446);
(statearr_152705_153539[(1)] = (146));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (5)))
{var inst_152160 = (state_152530[(10)]);var inst_152163 = cljs.core.seq_QMARK_.call(null,inst_152160);var state_152530__$1 = state_152530;if(inst_152163)
{var statearr_152706_153540 = state_152530__$1;(statearr_152706_153540[(1)] = (8));
} else
{var statearr_152707_153541 = state_152530__$1;(statearr_152707_153541[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (112)))
{var state_152530__$1 = state_152530;var statearr_152708_153542 = state_152530__$1;(statearr_152708_153542[(2)] = null);
(statearr_152708_153542[(1)] = (120));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (83)))
{var state_152530__$1 = state_152530;var statearr_152709_153543 = state_152530__$1;(statearr_152709_153543[(2)] = null);
(statearr_152709_153543[(1)] = (84));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (138)))
{var inst_152353 = (state_152530[(23)]);var inst_152438 = (state_152530[(35)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(134),Error,null,(133));var inst_152438__$1 = cljs.core.get.call(null,inst_152353,new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152439 = cljs.core._EQ_.call(null,inst_152438__$1,id);var state_152530__$1 = (function (){var statearr_152710 = state_152530;(statearr_152710[(35)] = inst_152438__$1);
return statearr_152710;
})();if(inst_152439)
{var statearr_152711_153544 = state_152530__$1;(statearr_152711_153544[(1)] = (139));
} else
{var statearr_152712_153545 = state_152530__$1;(statearr_152712_153545[(1)] = (140));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (14)))
{var inst_152344 = (state_152530[(24)]);var inst_152175 = (state_152530[(17)]);var inst_152344__$1 = cljs.core.seq.call(null,inst_152175);var state_152530__$1 = (function (){var statearr_152713 = state_152530;(statearr_152713[(24)] = inst_152344__$1);
return statearr_152713;
})();if(inst_152344__$1)
{var statearr_152714_153546 = state_152530__$1;(statearr_152714_153546[(1)] = (88));
} else
{var statearr_152715_153547 = state_152530__$1;(statearr_152715_153547[(1)] = (89));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (45)))
{var inst_152328 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152716_153548 = state_152530__$1;(statearr_152716_153548[(2)] = inst_152328);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (53)))
{var state_152530__$1 = state_152530;var statearr_152717_153549 = state_152530__$1;(statearr_152717_153549[(1)] = (79));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (78)))
{var inst_152306 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152719_153550 = state_152530__$1;(statearr_152719_153550[(2)] = inst_152306);
(statearr_152719_153550[(1)] = (63));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (132)))
{var inst_152488 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152720_153551 = state_152530__$1;(statearr_152720_153551[(2)] = inst_152488);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (26)))
{var inst_152183 = (state_152530[(13)]);var inst_152210 = inst_152183.cljs$core$ILookup$;var state_152530__$1 = state_152530;var statearr_152721_153552 = state_152530__$1;(statearr_152721_153552[(2)] = inst_152210);
(statearr_152721_153552[(1)] = (27));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (123)))
{var inst_152498 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152725_153553 = state_152530__$1;(statearr_152725_153553[(2)] = inst_152498);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (140)))
{var state_152530__$1 = state_152530;var statearr_152726_153554 = state_152530__$1;(statearr_152726_153554[(1)] = (154));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (16)))
{var inst_152177 = (state_152530[(9)]);var inst_152178 = (state_152530[(12)]);var inst_152176 = (state_152530[(15)]);var inst_152175 = (state_152530[(17)]);var inst_152340 = (state_152530[(2)]);var inst_152341 = (inst_152178 + (1));var tmp152722 = inst_152177;var tmp152723 = inst_152176;var tmp152724 = inst_152175;var inst_152175__$1 = tmp152724;var inst_152176__$1 = tmp152723;var inst_152177__$1 = tmp152722;var inst_152178__$1 = inst_152341;var state_152530__$1 = (function (){var statearr_152728 = state_152530;(statearr_152728[(9)] = inst_152177__$1);
(statearr_152728[(12)] = inst_152178__$1);
(statearr_152728[(15)] = inst_152176__$1);
(statearr_152728[(17)] = inst_152175__$1);
(statearr_152728[(41)] = inst_152340);
return statearr_152728;
})();var statearr_152729_153555 = state_152530__$1;(statearr_152729_153555[(2)] = null);
(statearr_152729_153555[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (133)))
{var inst_152480 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152730_153556 = state_152530__$1;(statearr_152730_153556[(2)] = inst_152480);
(statearr_152730_153556[(1)] = (132));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (163)))
{var inst_152503 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152731_153557 = state_152530__$1;(statearr_152731_153557[(2)] = inst_152503);
(statearr_152731_153557[(1)] = (165));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (81)))
{var inst_152316 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152732_153558 = state_152530__$1;(statearr_152732_153558[(2)] = inst_152316);
(statearr_152732_153558[(1)] = (54));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (120)))
{var inst_152353 = (state_152530[(23)]);var inst_152410 = (state_152530[(34)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(116),Error,null,(115));var inst_152410__$1 = cljs.core.get.call(null,inst_152353,new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152411 = (inst_152410__$1 === true);var state_152530__$1 = (function (){var statearr_152733 = state_152530;(statearr_152733[(34)] = inst_152410__$1);
return statearr_152733;
})();if(cljs.core.truth_(inst_152411))
{var statearr_152734_153559 = state_152530__$1;(statearr_152734_153559[(1)] = (121));
} else
{var statearr_152735_153560 = state_152530__$1;(statearr_152735_153560[(1)] = (122));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (79)))
{var inst_152313 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152736_153561 = state_152530__$1;(statearr_152736_153561[(2)] = inst_152313);
(statearr_152736_153561[(1)] = (81));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (38)))
{var inst_152229 = (state_152530[(28)]);var inst_152229__$1 = (state_152530[(2)]);var inst_152230 = (inst_152229__$1 === cljs.core.match.backtrack);var state_152530__$1 = (function (){var statearr_152737 = state_152530;(statearr_152737[(28)] = inst_152229__$1);
return statearr_152737;
})();if(cljs.core.truth_(inst_152230))
{var statearr_152738_153562 = state_152530__$1;(statearr_152738_153562[(1)] = (39));
} else
{var statearr_152739_153563 = state_152530__$1;(statearr_152739_153563[(1)] = (40));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (126)))
{var inst_152416 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152740_153564 = state_152530__$1;(statearr_152740_153564[(2)] = inst_152416);
(statearr_152740_153564[(1)] = (128));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (98)))
{var inst_152370 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152741_153565 = state_152530__$1;(statearr_152741_153565[(2)] = inst_152370);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (124)))
{var inst_152490 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152742_153566 = state_152530__$1;(statearr_152742_153566[(2)] = inst_152490);
(statearr_152742_153566[(1)] = (123));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (87)))
{var inst_152336 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152743_153567 = state_152530__$1;(statearr_152743_153567[(2)] = inst_152336);
(statearr_152743_153567[(1)] = (36));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (160)))
{var inst_152493 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152744_153568 = state_152530__$1;(statearr_152744_153568[(2)] = inst_152493);
(statearr_152744_153568[(1)] = (162));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (30)))
{var inst_152223 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152745_153569 = state_152530__$1;(statearr_152745_153569[(2)] = inst_152223);
(statearr_152745_153569[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (73)))
{var inst_152293 = (function(){throw cljs.core.match.backtrack})();var state_152530__$1 = state_152530;var statearr_152746_153570 = state_152530__$1;(statearr_152746_153570[(2)] = inst_152293);
(statearr_152746_153570[(1)] = (75));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (96)))
{var state_152530__$1 = state_152530;var statearr_152747_153571 = state_152530__$1;(statearr_152747_153571[(2)] = null);
(statearr_152747_153571[(1)] = (98));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (10)))
{var inst_152169 = (state_152530[(18)]);var inst_152168 = (state_152530[(19)]);var inst_152168__$1 = (state_152530[(2)]);var inst_152169__$1 = cljs.core.get.call(null,inst_152168__$1,new cljs.core.Keyword(null,"tx-data","tx-data",934159761));var inst_152174 = cljs.core.seq.call(null,inst_152169__$1);var inst_152175 = inst_152174;var inst_152176 = null;var inst_152177 = (0);var inst_152178 = (0);var state_152530__$1 = (function (){var statearr_152748 = state_152530;(statearr_152748[(9)] = inst_152177);
(statearr_152748[(12)] = inst_152178);
(statearr_152748[(15)] = inst_152176);
(statearr_152748[(17)] = inst_152175);
(statearr_152748[(18)] = inst_152169__$1);
(statearr_152748[(19)] = inst_152168__$1);
return statearr_152748;
})();var statearr_152749_153572 = state_152530__$1;(statearr_152749_153572[(2)] = null);
(statearr_152749_153572[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (18)))
{var state_152530__$1 = state_152530;var statearr_152750_153573 = state_152530__$1;(statearr_152750_153573[(2)] = null);
(statearr_152750_153573[(1)] = (20));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (105)))
{var inst_152382 = (state_152530[(2)]);var state_152530__$1 = state_152530;if(cljs.core.truth_(inst_152382))
{var statearr_152751_153574 = state_152530__$1;(statearr_152751_153574[(1)] = (106));
} else
{var statearr_152752_153575 = state_152530__$1;(statearr_152752_153575[(1)] = (107));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (52)))
{var state_152530__$1 = state_152530;var statearr_152753_153576 = state_152530__$1;(statearr_152753_153576[(2)] = null);
(statearr_152753_153576[(1)] = (60));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (114)))
{var inst_152508 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152754_153577 = state_152530__$1;(statearr_152754_153577[(2)] = inst_152508);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (147)))
{var inst_152353 = (state_152530[(23)]);var inst_152452 = (state_152530[(36)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(143),Error,null,(142));var inst_152452__$1 = cljs.core.get.call(null,inst_152353,new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152453 = cljs.core.keyword_identical_QMARK_.call(null,inst_152452__$1,new cljs.core.Keyword("state","dragging","state/dragging",1965974580));var state_152530__$1 = (function (){var statearr_152755 = state_152530;(statearr_152755[(36)] = inst_152452__$1);
return statearr_152755;
})();if(inst_152453)
{var statearr_152756_153578 = state_152530__$1;(statearr_152756_153578[(1)] = (148));
} else
{var statearr_152757_153579 = state_152530__$1;(statearr_152757_153579[(1)] = (149));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (67)))
{var inst_152271 = (state_152530[(7)]);var inst_152276 = (function(){throw inst_152271})();var state_152530__$1 = state_152530;var statearr_152758_153580 = state_152530__$1;(statearr_152758_153580[(2)] = inst_152276);
(statearr_152758_153580[(1)] = (68));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (161)))
{var state_152530__$1 = state_152530;var statearr_152759_153581 = state_152530__$1;(statearr_152759_153581[(2)] = null);
(statearr_152759_153581[(1)] = (162));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (71)))
{var state_152530__$1 = state_152530;var statearr_152760_153582 = state_152530__$1;(statearr_152760_153582[(1)] = (73));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (42)))
{var inst_152240 = (state_152530[(8)]);var inst_152183 = (state_152530[(13)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_152530,(38),Error,null,(37));var inst_152240__$1 = cljs.core.get.call(null,inst_152183,new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152241 = (inst_152240__$1 === true);var state_152530__$1 = (function (){var statearr_152762 = state_152530;(statearr_152762[(8)] = inst_152240__$1);
return statearr_152762;
})();if(cljs.core.truth_(inst_152241))
{var statearr_152763_153583 = state_152530__$1;(statearr_152763_153583[(1)] = (43));
} else
{var statearr_152764_153584 = state_152530__$1;(statearr_152764_153584[(1)] = (44));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (80)))
{var state_152530__$1 = state_152530;var statearr_152765_153585 = state_152530__$1;(statearr_152765_153585[(2)] = null);
(statearr_152765_153585[(1)] = (81));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (37)))
{var inst_152330 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152766_153586 = state_152530__$1;(statearr_152766_153586[(2)] = inst_152330);
(statearr_152766_153586[(1)] = (36));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (63)))
{var inst_152308 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152767_153587 = state_152530__$1;(statearr_152767_153587[(2)] = inst_152308);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (94)))
{var inst_152344 = (state_152530[(24)]);var inst_152510 = (state_152530[(2)]);var inst_152511 = cljs.core.next.call(null,inst_152344);var inst_152175 = inst_152511;var inst_152176 = null;var inst_152177 = (0);var inst_152178 = (0);var state_152530__$1 = (function (){var statearr_152768 = state_152530;(statearr_152768[(9)] = inst_152177);
(statearr_152768[(12)] = inst_152178);
(statearr_152768[(15)] = inst_152176);
(statearr_152768[(42)] = inst_152510);
(statearr_152768[(17)] = inst_152175);
return statearr_152768;
})();var statearr_152769_153588 = state_152530__$1;(statearr_152769_153588[(2)] = null);
(statearr_152769_153588[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (8)))
{var inst_152160 = (state_152530[(10)]);var inst_152165 = cljs.core.apply.call(null,cljs.core.hash_map,inst_152160);var state_152530__$1 = state_152530;var statearr_152770_153589 = state_152530__$1;(statearr_152770_153589[(2)] = inst_152165);
(statearr_152770_153589[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (49)))
{var inst_152243 = (state_152530[(40)]);var inst_152248 = (function(){throw inst_152243})();var state_152530__$1 = state_152530;var statearr_152771_153590 = state_152530__$1;(statearr_152771_153590[(2)] = inst_152248);
(statearr_152771_153590[(1)] = (50));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_152531 === (84)))
{var inst_152326 = (state_152530[(2)]);var state_152530__$1 = state_152530;var statearr_152772_153591 = state_152530__$1;(statearr_152772_153591[(2)] = inst_152326);
(statearr_152772_153591[(1)] = (45));
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
}
}
}
}
}
});})(c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
;return ((function (switch__5797__auto__,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function() {
var state_machine__5798__auto__ = null;
var state_machine__5798__auto____0 = (function (){var statearr_152776 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_152776[(0)] = state_machine__5798__auto__);
(statearr_152776[(1)] = (1));
return statearr_152776;
});
var state_machine__5798__auto____1 = (function (state_152530){while(true){
var ret_value__5799__auto__ = (function (){try{while(true){
var result__5800__auto__ = switch__5797__auto__.call(null,state_152530);if(cljs.core.keyword_identical_QMARK_.call(null,result__5800__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5800__auto__;
}
break;
}
}catch (e152777){if((e152777 instanceof Object))
{var ex__5801__auto__ = e152777;var statearr_152778_153592 = state_152530;(statearr_152778_153592[(5)] = ex__5801__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_152530);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e152777;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5799__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__153593 = state_152530;
state_152530 = G__153593;
continue;
}
} else
{return ret_value__5799__auto__;
}
break;
}
});
state_machine__5798__auto__ = function(state_152530){
switch(arguments.length){
case 0:
return state_machine__5798__auto____0.call(this);
case 1:
return state_machine__5798__auto____1.call(this,state_152530);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5798__auto____0;
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5798__auto____1;
return state_machine__5798__auto__;
})()
;})(switch__5797__auto__,c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
})();var state__5814__auto__ = (function (){var statearr_152779 = f__5813__auto__.call(null);(statearr_152779[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5812__auto___153395);
return statearr_152779;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5814__auto__);
});})(c__5812__auto___153395,chan_153394,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
);
ewen.wreak.dd_handle.set_attr_BANG_.call(null,app,id,new cljs.core.Keyword(null,"handle-start-dragging-chan","handle-start-dragging-chan",1703005358),chan_153394);
ewen.wreak.dd_handle.listen_dragging_BANG_.call(null,app,id,chan_153394);
var chan = cljs.core.async.chan.call(null);var c__5812__auto___153594 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5812__auto___153594,chan,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (){var f__5813__auto__ = (function (){var switch__5797__auto__ = ((function (c__5812__auto___153594,chan,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function (state_153148){var state_val_153149 = (state_153148[(1)]);if((state_val_153149 === (121)))
{var state_153148__$1 = state_153148;var statearr_153150_153595 = state_153148__$1;(statearr_153150_153595[(2)] = null);
(statearr_153150_153595[(1)] = (129));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (65)))
{var inst_152893 = (state_153148[(7)]);var inst_152893__$1 = (state_153148[(2)]);var inst_152894 = (inst_152893__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153151 = state_153148;(statearr_153151[(7)] = inst_152893__$1);
return statearr_153151;
})();if(cljs.core.truth_(inst_152894))
{var statearr_153152_153596 = state_153148__$1;(statearr_153152_153596[(1)] = (66));
} else
{var statearr_153153_153597 = state_153148__$1;(statearr_153153_153597[(1)] = (67));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (70)))
{var inst_152907 = new cljs.core.Keyword(null,"move","move",-2110884309).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types);var inst_152908 = domina.events.unlisten_BANG_.call(null,domina.root_element,inst_152907);var inst_152909 = new cljs.core.Keyword(null,"up","up",-269712113).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types);var inst_152910 = domina.events.unlisten_BANG_.call(null,domina.root_element,inst_152909);var state_153148__$1 = (function (){var statearr_153154 = state_153148;(statearr_153154[(8)] = inst_152908);
return statearr_153154;
})();var statearr_153155_153598 = state_153148__$1;(statearr_153155_153598[(2)] = inst_152910);
(statearr_153155_153598[(1)] = (72));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (62)))
{var state_153148__$1 = state_153148;var statearr_153156_153599 = state_153148__$1;(statearr_153156_153599[(1)] = (76));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (74)))
{var state_153148__$1 = state_153148;var statearr_153158_153600 = state_153148__$1;(statearr_153158_153600[(2)] = null);
(statearr_153158_153600[(1)] = (75));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (164)))
{var state_153148__$1 = state_153148;var statearr_153159_153601 = state_153148__$1;(statearr_153159_153601[(2)] = null);
(statearr_153159_153601[(1)] = (165));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (110)))
{var state_153148__$1 = state_153148;var statearr_153160_153602 = state_153148__$1;(statearr_153160_153602[(2)] = false);
(statearr_153160_153602[(1)] = (111));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (130)))
{var state_153148__$1 = state_153148;var statearr_153161_153603 = state_153148__$1;(statearr_153161_153603[(2)] = null);
(statearr_153161_153603[(1)] = (138));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (128)))
{var inst_153040 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153162_153604 = state_153148__$1;(statearr_153162_153604[(2)] = inst_153040);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (153)))
{var inst_153084 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153163_153605 = state_153148__$1;(statearr_153163_153605[(2)] = inst_153084);
(statearr_153163_153605[(1)] = (150));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (7)))
{var inst_153143 = (state_153148[(2)]);var inst_153144 = cljs.core.async.close_BANG_.call(null,chan);var state_153148__$1 = (function (){var statearr_153164 = state_153148;(statearr_153164[(9)] = inst_153143);
return statearr_153164;
})();var statearr_153165_153606 = state_153148__$1;(statearr_153165_153606[(2)] = inst_153144);
(statearr_153165_153606[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (59)))
{var inst_152886 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153166_153607 = state_153148__$1;(statearr_153166_153607[(2)] = inst_152886);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (86)))
{var state_153148__$1 = state_153148;var statearr_153167_153608 = state_153148__$1;(statearr_153167_153608[(2)] = null);
(statearr_153167_153608[(1)] = (87));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (154)))
{var inst_153091 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153168_153609 = state_153148__$1;(statearr_153168_153609[(2)] = inst_153091);
(statearr_153168_153609[(1)] = (156));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (20)))
{var inst_152822 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153169_153610 = state_153148__$1;(statearr_153169_153610[(2)] = inst_152822);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (72)))
{var inst_152918 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153170_153611 = state_153148__$1;(statearr_153170_153611[(2)] = inst_152918);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (58)))
{var inst_152879 = (state_153148[(10)]);var inst_152884 = (function(){throw inst_152879})();var state_153148__$1 = state_153148;var statearr_153171_153612 = state_153148__$1;(statearr_153171_153612[(2)] = inst_152884);
(statearr_153171_153612[(1)] = (59));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (60)))
{var inst_152805 = (state_153148[(11)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(56),Error,null,(55));var inst_152890 = cljs.core.get.call(null,inst_152805,new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152891 = cljs.core._EQ_.call(null,inst_152890,id);var state_153148__$1 = state_153148;if(inst_152891)
{var statearr_153172_153613 = state_153148__$1;(statearr_153172_153613[(1)] = (61));
} else
{var statearr_153173_153614 = state_153148__$1;(statearr_153173_153614[(1)] = (62));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (27)))
{var inst_152834 = (state_153148[(2)]);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_152834))
{var statearr_153174_153615 = state_153148__$1;(statearr_153174_153615[(1)] = (28));
} else
{var statearr_153175_153616 = state_153148__$1;(statearr_153175_153616[(1)] = (29));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (1)))
{var state_153148__$1 = state_153148;var statearr_153176_153617 = state_153148__$1;(statearr_153176_153617[(2)] = null);
(statearr_153176_153617[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (69)))
{var inst_152805 = (state_153148[(11)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(65),Error,null,(64));var inst_152904 = cljs.core.get.call(null,inst_152805,new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152905 = cljs.core.keyword_identical_QMARK_.call(null,inst_152904,new cljs.core.Keyword("state","dragging","state/dragging",1965974580));var state_153148__$1 = state_153148;if(inst_152905)
{var statearr_153177_153618 = state_153148__$1;(statearr_153177_153618[(1)] = (70));
} else
{var statearr_153178_153619 = state_153148__$1;(statearr_153178_153619[(1)] = (71));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (101)))
{var inst_152973 = (state_153148[(12)]);var inst_153015 = cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,inst_152973);var state_153148__$1 = state_153148;var statearr_153179_153620 = state_153148__$1;(statearr_153179_153620[(2)] = inst_153015);
(statearr_153179_153620[(1)] = (102));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (24)))
{var inst_152849 = (state_153148[(2)]);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_152849))
{var statearr_153180_153621 = state_153148__$1;(statearr_153180_153621[(1)] = (34));
} else
{var statearr_153181_153622 = state_153148__$1;(statearr_153181_153622[(1)] = (35));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (102)))
{var inst_153017 = (state_153148[(2)]);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_153017))
{var statearr_153182_153623 = state_153148__$1;(statearr_153182_153623[(1)] = (112));
} else
{var statearr_153183_153624 = state_153148__$1;(statearr_153183_153624[(1)] = (113));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (135)))
{var inst_153050 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153184_153625 = state_153148__$1;(statearr_153184_153625[(2)] = inst_153050);
(statearr_153184_153625[(1)] = (137));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (55)))
{var inst_152930 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153185_153626 = state_153148__$1;(statearr_153185_153626[(2)] = inst_152930);
(statearr_153185_153626[(1)] = (54));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (165)))
{var inst_153124 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153186_153627 = state_153148__$1;(statearr_153186_153627[(2)] = inst_153124);
(statearr_153186_153627[(1)] = (114));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (85)))
{var inst_152953 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153187_153628 = state_153148__$1;(statearr_153187_153628[(2)] = inst_152953);
(statearr_153187_153628[(1)] = (87));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (39)))
{var inst_152854 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153188_153629 = state_153148__$1;(statearr_153188_153629[(2)] = inst_152854);
(statearr_153188_153629[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (88)))
{var inst_152964 = (state_153148[(13)]);var inst_152966 = cljs.core.chunked_seq_QMARK_.call(null,inst_152964);var state_153148__$1 = state_153148;if(inst_152966)
{var statearr_153189_153630 = state_153148__$1;(statearr_153189_153630[(1)] = (91));
} else
{var statearr_153190_153631 = state_153148__$1;(statearr_153190_153631[(1)] = (92));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (46)))
{var inst_152940 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153191_153632 = state_153148__$1;(statearr_153191_153632[(2)] = inst_152940);
(statearr_153191_153632[(1)] = (45));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (149)))
{var state_153148__$1 = state_153148;var statearr_153192_153633 = state_153148__$1;(statearr_153192_153633[(1)] = (151));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (157)))
{var inst_153101 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153194_153634 = state_153148__$1;(statearr_153194_153634[(2)] = inst_153101);
(statearr_153194_153634[(1)] = (159));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (4)))
{var inst_152782 = (state_153148[(14)]);var inst_152782__$1 = (state_153148[(2)]);var state_153148__$1 = (function (){var statearr_153195 = state_153148;(statearr_153195[(14)] = inst_152782__$1);
return statearr_153195;
})();if(cljs.core.truth_(inst_152782__$1))
{var statearr_153196_153635 = state_153148__$1;(statearr_153196_153635[(1)] = (5));
} else
{var statearr_153197_153636 = state_153148__$1;(statearr_153197_153636[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (77)))
{var state_153148__$1 = state_153148;var statearr_153198_153637 = state_153148__$1;(statearr_153198_153637[(2)] = null);
(statearr_153198_153637[(1)] = (78));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (106)))
{var state_153148__$1 = state_153148;var statearr_153199_153638 = state_153148__$1;(statearr_153199_153638[(2)] = true);
(statearr_153199_153638[(1)] = (108));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (119)))
{var inst_153026 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153200_153639 = state_153148__$1;(statearr_153200_153639[(2)] = inst_153026);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (95)))
{var inst_152984 = (state_153148[(15)]);var inst_152984__$1 = (state_153148[(2)]);var inst_152985 = (inst_152984__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153201 = state_153148;(statearr_153201[(15)] = inst_152984__$1);
return statearr_153201;
})();if(cljs.core.truth_(inst_152985))
{var statearr_153202_153640 = state_153148__$1;(statearr_153202_153640[(1)] = (96));
} else
{var statearr_153203_153641 = state_153148__$1;(statearr_153203_153641[(1)] = (97));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (144)))
{var inst_153064 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153204_153642 = state_153148__$1;(statearr_153204_153642[(2)] = inst_153064);
(statearr_153204_153642[(1)] = (146));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (54)))
{var inst_152938 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153205_153643 = state_153148__$1;(statearr_153205_153643[(2)] = inst_152938);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (92)))
{var inst_152964 = (state_153148[(13)]);var inst_152973 = cljs.core.first.call(null,inst_152964);var state_153148__$1 = (function (){var statearr_153206 = state_153148;(statearr_153206[(12)] = inst_152973);
return statearr_153206;
})();var statearr_153207_153644 = state_153148__$1;(statearr_153207_153644[(2)] = null);
(statearr_153207_153644[(1)] = (99));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (141)))
{var inst_153096 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153208_153645 = state_153148__$1;(statearr_153208_153645[(2)] = inst_153096);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (137)))
{var inst_153054 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153209_153646 = state_153148__$1;(statearr_153209_153646[(2)] = inst_153054);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (104)))
{var inst_152973 = (state_153148[(12)]);var inst_153000 = inst_152973.cljs$core$ILookup$;var state_153148__$1 = state_153148;var statearr_153210_153647 = state_153148__$1;(statearr_153210_153647[(2)] = inst_153000);
(statearr_153210_153647[(1)] = (105));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (15)))
{var inst_153137 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153211_153648 = state_153148__$1;(statearr_153211_153648[(2)] = inst_153137);
(statearr_153211_153648[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (48)))
{var inst_152868 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153212_153649 = state_153148__$1;(statearr_153212_153649[(2)] = inst_152868);
(statearr_153212_153649[(1)] = (50));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (50)))
{var inst_152872 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153213_153650 = state_153148__$1;(statearr_153213_153650[(2)] = inst_152872);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (116)))
{var inst_153019 = (state_153148[(16)]);var inst_153019__$1 = (state_153148[(2)]);var inst_153020 = (inst_153019__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153214 = state_153148;(statearr_153214[(16)] = inst_153019__$1);
return statearr_153214;
})();if(cljs.core.truth_(inst_153020))
{var statearr_153215_153651 = state_153148__$1;(statearr_153215_153651[(1)] = (117));
} else
{var statearr_153216_153652 = state_153148__$1;(statearr_153216_153652[(1)] = (118));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (75)))
{var inst_152916 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153217_153653 = state_153148__$1;(statearr_153217_153653[(2)] = inst_152916);
(statearr_153217_153653[(1)] = (72));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (159)))
{var inst_153104 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153218_153654 = state_153148__$1;(statearr_153218_153654[(2)] = inst_153104);
(statearr_153218_153654[(1)] = (132));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (99)))
{var inst_152973 = (state_153148[(12)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(95),Error,null,(94));var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_152973))
{var statearr_153219_153655 = state_153148__$1;(statearr_153219_153655[(1)] = (100));
} else
{var statearr_153220_153656 = state_153148__$1;(statearr_153220_153656[(1)] = (101));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (21)))
{var inst_152805 = (state_153148[(11)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(17),Error,null,(16));var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_152805))
{var statearr_153221_153657 = state_153148__$1;(statearr_153221_153657[(1)] = (22));
} else
{var statearr_153222_153658 = state_153148__$1;(statearr_153222_153658[(1)] = (23));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (31)))
{var inst_152805 = (state_153148[(11)]);var inst_152840 = cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,inst_152805);var state_153148__$1 = state_153148;var statearr_153223_153659 = state_153148__$1;(statearr_153223_153659[(2)] = inst_152840);
(statearr_153223_153659[(1)] = (33));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (113)))
{var state_153148__$1 = state_153148;var statearr_153224_153660 = state_153148__$1;(statearr_153224_153660[(1)] = (163));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (32)))
{var state_153148__$1 = state_153148;var statearr_153226_153661 = state_153148__$1;(statearr_153226_153661[(2)] = false);
(statearr_153226_153661[(1)] = (33));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (136)))
{var inst_153047 = (state_153148[(17)]);var inst_153052 = (function(){throw inst_153047})();var state_153148__$1 = state_153148;var statearr_153227_153662 = state_153148__$1;(statearr_153227_153662[(2)] = inst_153052);
(statearr_153227_153662[(1)] = (137));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (139)))
{var state_153148__$1 = state_153148;var statearr_153228_153663 = state_153148__$1;(statearr_153228_153663[(2)] = null);
(statearr_153228_153663[(1)] = (147));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (40)))
{var inst_152851 = (state_153148[(18)]);var inst_152856 = (function(){throw inst_152851})();var state_153148__$1 = state_153148;var statearr_153229_153664 = state_153148__$1;(statearr_153229_153664[(2)] = inst_152856);
(statearr_153229_153664[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (129)))
{var inst_152973 = (state_153148[(12)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(125),Error,null,(124));var inst_153044 = cljs.core.get.call(null,inst_152973,new cljs.core.Keyword(null,"added","added",2057651688),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_153045 = (inst_153044 === true);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_153045))
{var statearr_153230_153665 = state_153148__$1;(statearr_153230_153665[(1)] = (130));
} else
{var statearr_153231_153666 = state_153148__$1;(statearr_153231_153666[(1)] = (131));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (91)))
{var inst_152964 = (state_153148[(13)]);var inst_152968 = cljs.core.chunk_first.call(null,inst_152964);var inst_152969 = cljs.core.chunk_rest.call(null,inst_152964);var inst_152970 = cljs.core.count.call(null,inst_152968);var inst_152797 = inst_152969;var inst_152798 = inst_152968;var inst_152799 = inst_152970;var inst_152800 = (0);var state_153148__$1 = (function (){var statearr_153232 = state_153148;(statearr_153232[(19)] = inst_152797);
(statearr_153232[(20)] = inst_152800);
(statearr_153232[(21)] = inst_152798);
(statearr_153232[(22)] = inst_152799);
return statearr_153232;
})();var statearr_153233_153667 = state_153148__$1;(statearr_153233_153667[(2)] = null);
(statearr_153233_153667[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (117)))
{var inst_153022 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153234_153668 = state_153148__$1;(statearr_153234_153668[(2)] = inst_153022);
(statearr_153234_153668[(1)] = (119));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (108)))
{var inst_153013 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153235_153669 = state_153148__$1;(statearr_153235_153669[(2)] = inst_153013);
(statearr_153235_153669[(1)] = (102));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (156)))
{var inst_153094 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153236_153670 = state_153148__$1;(statearr_153236_153670[(2)] = inst_153094);
(statearr_153236_153670[(1)] = (141));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (56)))
{var inst_152879 = (state_153148[(10)]);var inst_152879__$1 = (state_153148[(2)]);var inst_152880 = (inst_152879__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153237 = state_153148;(statearr_153237[(10)] = inst_152879__$1);
return statearr_153237;
})();if(cljs.core.truth_(inst_152880))
{var statearr_153238_153671 = state_153148__$1;(statearr_153238_153671[(1)] = (57));
} else
{var statearr_153239_153672 = state_153148__$1;(statearr_153239_153672[(1)] = (58));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (33)))
{var inst_152843 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153240_153673 = state_153148__$1;(statearr_153240_153673[(2)] = inst_152843);
(statearr_153240_153673[(1)] = (30));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (13)))
{var inst_152800 = (state_153148[(20)]);var inst_152798 = (state_153148[(21)]);var inst_152805 = cljs.core._nth.call(null,inst_152798,inst_152800);var state_153148__$1 = (function (){var statearr_153241 = state_153148;(statearr_153241[(11)] = inst_152805);
return statearr_153241;
})();var statearr_153242_153674 = state_153148__$1;(statearr_153242_153674[(2)] = null);
(statearr_153242_153674[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (22)))
{var inst_152829 = (state_153148[(23)]);var inst_152805 = (state_153148[(11)]);var inst_152828 = inst_152805.cljs$lang$protocol_mask$partition0$;var inst_152829__$1 = (inst_152828 & (256));var state_153148__$1 = (function (){var statearr_153243 = state_153148;(statearr_153243[(23)] = inst_152829__$1);
return statearr_153243;
})();if(cljs.core.truth_(inst_152829__$1))
{var statearr_153244_153675 = state_153148__$1;(statearr_153244_153675[(1)] = (25));
} else
{var statearr_153245_153676 = state_153148__$1;(statearr_153245_153676[(1)] = (26));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (90)))
{var inst_153135 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153246_153677 = state_153148__$1;(statearr_153246_153677[(2)] = inst_153135);
(statearr_153246_153677[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (109)))
{var inst_152973 = (state_153148[(12)]);var inst_153008 = cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,inst_152973);var state_153148__$1 = state_153148;var statearr_153247_153678 = state_153148__$1;(statearr_153247_153678[(2)] = inst_153008);
(statearr_153247_153678[(1)] = (111));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (143)))
{var inst_153061 = (state_153148[(24)]);var inst_153061__$1 = (state_153148[(2)]);var inst_153062 = (inst_153061__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153248 = state_153148;(statearr_153248[(24)] = inst_153061__$1);
return statearr_153248;
})();if(cljs.core.truth_(inst_153062))
{var statearr_153249_153679 = state_153148__$1;(statearr_153249_153679[(1)] = (144));
} else
{var statearr_153250_153680 = state_153148__$1;(statearr_153250_153680[(1)] = (145));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (36)))
{var inst_152958 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153251_153681 = state_153148__$1;(statearr_153251_153681[(2)] = inst_152958);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (41)))
{var inst_152858 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153252_153682 = state_153148__$1;(statearr_153252_153682[(2)] = inst_152858);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (118)))
{var inst_153019 = (state_153148[(16)]);var inst_153024 = (function(){throw inst_153019})();var state_153148__$1 = state_153148;var statearr_153253_153683 = state_153148__$1;(statearr_153253_153683[(2)] = inst_153024);
(statearr_153253_153683[(1)] = (119));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (150)))
{var inst_153086 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153254_153684 = state_153148__$1;(statearr_153254_153684[(2)] = inst_153086);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (162)))
{var inst_153114 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153255_153685 = state_153148__$1;(statearr_153255_153685[(2)] = inst_153114);
(statearr_153255_153685[(1)] = (123));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (89)))
{var state_153148__$1 = state_153148;var statearr_153256_153686 = state_153148__$1;(statearr_153256_153686[(2)] = null);
(statearr_153256_153686[(1)] = (90));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (100)))
{var inst_152973 = (state_153148[(12)]);var inst_152997 = (state_153148[(25)]);var inst_152996 = inst_152973.cljs$lang$protocol_mask$partition0$;var inst_152997__$1 = (inst_152996 & (256));var state_153148__$1 = (function (){var statearr_153257 = state_153148;(statearr_153257[(25)] = inst_152997__$1);
return statearr_153257;
})();if(cljs.core.truth_(inst_152997__$1))
{var statearr_153258_153687 = state_153148__$1;(statearr_153258_153687[(1)] = (103));
} else
{var statearr_153259_153688 = state_153148__$1;(statearr_153259_153688[(1)] = (104));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (131)))
{var state_153148__$1 = state_153148;var statearr_153260_153689 = state_153148__$1;(statearr_153260_153689[(1)] = (157));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (122)))
{var state_153148__$1 = state_153148;var statearr_153262_153690 = state_153148__$1;(statearr_153262_153690[(1)] = (160));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (43)))
{var state_153148__$1 = state_153148;var statearr_153264_153691 = state_153148__$1;(statearr_153264_153691[(2)] = null);
(statearr_153264_153691[(1)] = (51));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (61)))
{var state_153148__$1 = state_153148;var statearr_153265_153692 = state_153148__$1;(statearr_153265_153692[(2)] = null);
(statearr_153265_153692[(1)] = (69));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (29)))
{var inst_152805 = (state_153148[(11)]);var inst_152837 = inst_152805.cljs$lang$protocol_mask$partition0$;var inst_152838 = (!inst_152837);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_152838))
{var statearr_153266_153693 = state_153148__$1;(statearr_153266_153693[(1)] = (31));
} else
{var statearr_153267_153694 = state_153148__$1;(statearr_153267_153694[(1)] = (32));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (151)))
{var inst_153081 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153268_153695 = state_153148__$1;(statearr_153268_153695[(2)] = inst_153081);
(statearr_153268_153695[(1)] = (153));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (44)))
{var state_153148__$1 = state_153148;var statearr_153269_153696 = state_153148__$1;(statearr_153269_153696[(1)] = (82));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (93)))
{var inst_153132 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153271_153697 = state_153148__$1;(statearr_153271_153697[(2)] = inst_153132);
(statearr_153271_153697[(1)] = (90));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (6)))
{var state_153148__$1 = state_153148;var statearr_153272_153698 = state_153148__$1;(statearr_153272_153698[(2)] = null);
(statearr_153272_153698[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (111)))
{var inst_153011 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153273_153699 = state_153148__$1;(statearr_153273_153699[(2)] = inst_153011);
(statearr_153273_153699[(1)] = (108));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (28)))
{var state_153148__$1 = state_153148;var statearr_153274_153700 = state_153148__$1;(statearr_153274_153700[(2)] = true);
(statearr_153274_153700[(1)] = (30));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (134)))
{var inst_153047 = (state_153148[(17)]);var inst_153047__$1 = (state_153148[(2)]);var inst_153048 = (inst_153047__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153275 = state_153148;(statearr_153275[(17)] = inst_153047__$1);
return statearr_153275;
})();if(cljs.core.truth_(inst_153048))
{var statearr_153276_153701 = state_153148__$1;(statearr_153276_153701[(1)] = (135));
} else
{var statearr_153277_153702 = state_153148__$1;(statearr_153277_153702[(1)] = (136));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (64)))
{var inst_152920 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153278_153703 = state_153148__$1;(statearr_153278_153703[(2)] = inst_152920);
(statearr_153278_153703[(1)] = (63));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (155)))
{var state_153148__$1 = state_153148;var statearr_153279_153704 = state_153148__$1;(statearr_153279_153704[(2)] = null);
(statearr_153279_153704[(1)] = (156));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (103)))
{var inst_152997 = (state_153148[(25)]);var state_153148__$1 = state_153148;var statearr_153280_153705 = state_153148__$1;(statearr_153280_153705[(2)] = inst_152997);
(statearr_153280_153705[(1)] = (105));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (51)))
{var inst_152805 = (state_153148[(11)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(47),Error,null,(46));var inst_152876 = cljs.core.get.call(null,inst_152805,new cljs.core.Keyword(null,"added","added",2057651688),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152877 = (inst_152876 === true);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_152877))
{var statearr_153281_153706 = state_153148__$1;(statearr_153281_153706[(1)] = (52));
} else
{var statearr_153282_153707 = state_153148__$1;(statearr_153282_153707[(1)] = (53));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (25)))
{var inst_152829 = (state_153148[(23)]);var state_153148__$1 = state_153148;var statearr_153283_153708 = state_153148__$1;(statearr_153283_153708[(2)] = inst_152829);
(statearr_153283_153708[(1)] = (27));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (34)))
{var state_153148__$1 = state_153148;var statearr_153284_153709 = state_153148__$1;(statearr_153284_153709[(2)] = null);
(statearr_153284_153709[(1)] = (42));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (146)))
{var inst_153068 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153285_153710 = state_153148__$1;(statearr_153285_153710[(2)] = inst_153068);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (125)))
{var inst_153033 = (state_153148[(26)]);var inst_153033__$1 = (state_153148[(2)]);var inst_153034 = (inst_153033__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153286 = state_153148;(statearr_153286[(26)] = inst_153033__$1);
return statearr_153286;
})();if(cljs.core.truth_(inst_153034))
{var statearr_153287_153711 = state_153148__$1;(statearr_153287_153711[(1)] = (126));
} else
{var statearr_153288_153712 = state_153148__$1;(statearr_153288_153712[(1)] = (127));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (148)))
{var inst_153075 = new cljs.core.Keyword(null,"move","move",-2110884309).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types);var inst_153076 = domina.events.unlisten_BANG_.call(null,domina.root_element,inst_153075);var inst_153077 = new cljs.core.Keyword(null,"up","up",-269712113).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types);var inst_153078 = domina.events.unlisten_BANG_.call(null,domina.root_element,inst_153077);var state_153148__$1 = (function (){var statearr_153289 = state_153148;(statearr_153289[(27)] = inst_153076);
return statearr_153289;
})();var statearr_153290_153713 = state_153148__$1;(statearr_153290_153713[(2)] = inst_153078);
(statearr_153290_153713[(1)] = (150));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (17)))
{var inst_152816 = (state_153148[(28)]);var inst_152816__$1 = (state_153148[(2)]);var inst_152817 = (inst_152816__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153291 = state_153148;(statearr_153291[(28)] = inst_152816__$1);
return statearr_153291;
})();if(cljs.core.truth_(inst_152817))
{var statearr_153292_153714 = state_153148__$1;(statearr_153292_153714[(1)] = (18));
} else
{var statearr_153293_153715 = state_153148__$1;(statearr_153293_153715[(1)] = (19));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (3)))
{var inst_153146 = (state_153148[(2)]);var state_153148__$1 = state_153148;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_153148__$1,inst_153146);
} else
{if((state_val_153149 === (12)))
{var inst_153139 = (state_153148[(2)]);var state_153148__$1 = (function (){var statearr_153294 = state_153148;(statearr_153294[(29)] = inst_153139);
return statearr_153294;
})();var statearr_153295_153716 = state_153148__$1;(statearr_153295_153716[(2)] = null);
(statearr_153295_153716[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (152)))
{var state_153148__$1 = state_153148;var statearr_153296_153717 = state_153148__$1;(statearr_153296_153717[(2)] = null);
(statearr_153296_153717[(1)] = (153));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (2)))
{var state_153148__$1 = state_153148;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_153148__$1,(4),chan);
} else
{if((state_val_153149 === (66)))
{var inst_152896 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153297_153718 = state_153148__$1;(statearr_153297_153718[(2)] = inst_152896);
(statearr_153297_153718[(1)] = (68));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (142)))
{var inst_153088 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153298_153719 = state_153148__$1;(statearr_153298_153719[(2)] = inst_153088);
(statearr_153298_153719[(1)] = (141));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (107)))
{var inst_152973 = (state_153148[(12)]);var inst_153005 = inst_152973.cljs$lang$protocol_mask$partition0$;var inst_153006 = (!inst_153005);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_153006))
{var statearr_153299_153720 = state_153148__$1;(statearr_153299_153720[(1)] = (109));
} else
{var statearr_153300_153721 = state_153148__$1;(statearr_153300_153721[(1)] = (110));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (23)))
{var inst_152805 = (state_153148[(11)]);var inst_152847 = cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ILookup,inst_152805);var state_153148__$1 = state_153148;var statearr_153301_153722 = state_153148__$1;(statearr_153301_153722[(2)] = inst_152847);
(statearr_153301_153722[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (47)))
{var inst_152865 = (state_153148[(30)]);var inst_152865__$1 = (state_153148[(2)]);var inst_152866 = (inst_152865__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153302 = state_153148;(statearr_153302[(30)] = inst_152865__$1);
return statearr_153302;
})();if(cljs.core.truth_(inst_152866))
{var statearr_153303_153723 = state_153148__$1;(statearr_153303_153723[(1)] = (48));
} else
{var statearr_153304_153724 = state_153148__$1;(statearr_153304_153724[(1)] = (49));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (158)))
{var state_153148__$1 = state_153148;var statearr_153305_153725 = state_153148__$1;(statearr_153305_153725[(2)] = null);
(statearr_153305_153725[(1)] = (159));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (35)))
{var state_153148__$1 = state_153148;var statearr_153306_153726 = state_153148__$1;(statearr_153306_153726[(1)] = (85));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (127)))
{var inst_153033 = (state_153148[(26)]);var inst_153038 = (function(){throw inst_153033})();var state_153148__$1 = state_153148;var statearr_153308_153727 = state_153148__$1;(statearr_153308_153727[(2)] = inst_153038);
(statearr_153308_153727[(1)] = (128));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (82)))
{var inst_152943 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153309_153728 = state_153148__$1;(statearr_153309_153728[(2)] = inst_152943);
(statearr_153309_153728[(1)] = (84));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (76)))
{var inst_152923 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153310_153729 = state_153148__$1;(statearr_153310_153729[(2)] = inst_152923);
(statearr_153310_153729[(1)] = (78));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (97)))
{var inst_152984 = (state_153148[(15)]);var inst_152988 = (function(){throw inst_152984})();var state_153148__$1 = state_153148;var statearr_153311_153730 = state_153148__$1;(statearr_153311_153730[(2)] = inst_152988);
(statearr_153311_153730[(1)] = (98));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (19)))
{var inst_152816 = (state_153148[(28)]);var inst_152820 = (function(){throw inst_152816})();var state_153148__$1 = state_153148;var statearr_153312_153731 = state_153148__$1;(statearr_153312_153731[(2)] = inst_152820);
(statearr_153312_153731[(1)] = (20));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (57)))
{var inst_152882 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153313_153732 = state_153148__$1;(statearr_153313_153732[(2)] = inst_152882);
(statearr_153313_153732[(1)] = (59));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (68)))
{var inst_152900 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153314_153733 = state_153148__$1;(statearr_153314_153733[(2)] = inst_152900);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (11)))
{var inst_152800 = (state_153148[(20)]);var inst_152799 = (state_153148[(22)]);var inst_152802 = (inst_152800 < inst_152799);var inst_152803 = inst_152802;var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_152803))
{var statearr_153315_153734 = state_153148__$1;(statearr_153315_153734[(1)] = (13));
} else
{var statearr_153316_153735 = state_153148__$1;(statearr_153316_153735[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (115)))
{var inst_153118 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153317_153736 = state_153148__$1;(statearr_153317_153736[(2)] = inst_153118);
(statearr_153317_153736[(1)] = (114));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (9)))
{var inst_152782 = (state_153148[(14)]);var state_153148__$1 = state_153148;var statearr_153318_153737 = state_153148__$1;(statearr_153318_153737[(2)] = inst_152782);
(statearr_153318_153737[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (145)))
{var inst_153061 = (state_153148[(24)]);var inst_153066 = (function(){throw inst_153061})();var state_153148__$1 = state_153148;var statearr_153319_153738 = state_153148__$1;(statearr_153319_153738[(2)] = inst_153066);
(statearr_153319_153738[(1)] = (146));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (5)))
{var inst_152782 = (state_153148[(14)]);var inst_152785 = cljs.core.seq_QMARK_.call(null,inst_152782);var state_153148__$1 = state_153148;if(inst_152785)
{var statearr_153320_153739 = state_153148__$1;(statearr_153320_153739[(1)] = (8));
} else
{var statearr_153321_153740 = state_153148__$1;(statearr_153321_153740[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (112)))
{var state_153148__$1 = state_153148;var statearr_153322_153741 = state_153148__$1;(statearr_153322_153741[(2)] = null);
(statearr_153322_153741[(1)] = (120));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (83)))
{var state_153148__$1 = state_153148;var statearr_153323_153742 = state_153148__$1;(statearr_153323_153742[(2)] = null);
(statearr_153323_153742[(1)] = (84));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (138)))
{var inst_152973 = (state_153148[(12)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(134),Error,null,(133));var inst_153058 = cljs.core.get.call(null,inst_152973,new cljs.core.Keyword(null,"e","e",1381269198),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_153059 = cljs.core._EQ_.call(null,inst_153058,id);var state_153148__$1 = state_153148;if(inst_153059)
{var statearr_153324_153743 = state_153148__$1;(statearr_153324_153743[(1)] = (139));
} else
{var statearr_153325_153744 = state_153148__$1;(statearr_153325_153744[(1)] = (140));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (14)))
{var inst_152964 = (state_153148[(13)]);var inst_152797 = (state_153148[(19)]);var inst_152964__$1 = cljs.core.seq.call(null,inst_152797);var state_153148__$1 = (function (){var statearr_153326 = state_153148;(statearr_153326[(13)] = inst_152964__$1);
return statearr_153326;
})();if(inst_152964__$1)
{var statearr_153327_153745 = state_153148__$1;(statearr_153327_153745[(1)] = (88));
} else
{var statearr_153328_153746 = state_153148__$1;(statearr_153328_153746[(1)] = (89));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (45)))
{var inst_152948 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153329_153747 = state_153148__$1;(statearr_153329_153747[(2)] = inst_152948);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (53)))
{var state_153148__$1 = state_153148;var statearr_153330_153748 = state_153148__$1;(statearr_153330_153748[(1)] = (79));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (78)))
{var inst_152926 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153332_153749 = state_153148__$1;(statearr_153332_153749[(2)] = inst_152926);
(statearr_153332_153749[(1)] = (63));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (132)))
{var inst_153106 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153333_153750 = state_153148__$1;(statearr_153333_153750[(2)] = inst_153106);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (26)))
{var inst_152805 = (state_153148[(11)]);var inst_152832 = inst_152805.cljs$core$ILookup$;var state_153148__$1 = state_153148;var statearr_153334_153751 = state_153148__$1;(statearr_153334_153751[(2)] = inst_152832);
(statearr_153334_153751[(1)] = (27));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (123)))
{var inst_153116 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153338_153752 = state_153148__$1;(statearr_153338_153752[(2)] = inst_153116);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (140)))
{var state_153148__$1 = state_153148;var statearr_153339_153753 = state_153148__$1;(statearr_153339_153753[(1)] = (154));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (16)))
{var inst_152797 = (state_153148[(19)]);var inst_152800 = (state_153148[(20)]);var inst_152798 = (state_153148[(21)]);var inst_152799 = (state_153148[(22)]);var inst_152960 = (state_153148[(2)]);var inst_152961 = (inst_152800 + (1));var tmp153335 = inst_152797;var tmp153336 = inst_152798;var tmp153337 = inst_152799;var inst_152797__$1 = tmp153335;var inst_152798__$1 = tmp153336;var inst_152799__$1 = tmp153337;var inst_152800__$1 = inst_152961;var state_153148__$1 = (function (){var statearr_153341 = state_153148;(statearr_153341[(31)] = inst_152960);
(statearr_153341[(19)] = inst_152797__$1);
(statearr_153341[(20)] = inst_152800__$1);
(statearr_153341[(21)] = inst_152798__$1);
(statearr_153341[(22)] = inst_152799__$1);
return statearr_153341;
})();var statearr_153342_153754 = state_153148__$1;(statearr_153342_153754[(2)] = null);
(statearr_153342_153754[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (133)))
{var inst_153098 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153343_153755 = state_153148__$1;(statearr_153343_153755[(2)] = inst_153098);
(statearr_153343_153755[(1)] = (132));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (163)))
{var inst_153121 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153344_153756 = state_153148__$1;(statearr_153344_153756[(2)] = inst_153121);
(statearr_153344_153756[(1)] = (165));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (81)))
{var inst_152936 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153345_153757 = state_153148__$1;(statearr_153345_153757[(2)] = inst_152936);
(statearr_153345_153757[(1)] = (54));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (120)))
{var inst_152973 = (state_153148[(12)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(116),Error,null,(115));var inst_153030 = cljs.core.get.call(null,inst_152973,new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_153031 = (inst_153030 === false);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_153031))
{var statearr_153346_153758 = state_153148__$1;(statearr_153346_153758[(1)] = (121));
} else
{var statearr_153347_153759 = state_153148__$1;(statearr_153347_153759[(1)] = (122));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (79)))
{var inst_152933 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153348_153760 = state_153148__$1;(statearr_153348_153760[(2)] = inst_152933);
(statearr_153348_153760[(1)] = (81));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (38)))
{var inst_152851 = (state_153148[(18)]);var inst_152851__$1 = (state_153148[(2)]);var inst_152852 = (inst_152851__$1 === cljs.core.match.backtrack);var state_153148__$1 = (function (){var statearr_153349 = state_153148;(statearr_153349[(18)] = inst_152851__$1);
return statearr_153349;
})();if(cljs.core.truth_(inst_152852))
{var statearr_153350_153761 = state_153148__$1;(statearr_153350_153761[(1)] = (39));
} else
{var statearr_153351_153762 = state_153148__$1;(statearr_153351_153762[(1)] = (40));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (126)))
{var inst_153036 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153352_153763 = state_153148__$1;(statearr_153352_153763[(2)] = inst_153036);
(statearr_153352_153763[(1)] = (128));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (98)))
{var inst_152990 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153353_153764 = state_153148__$1;(statearr_153353_153764[(2)] = inst_152990);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (124)))
{var inst_153108 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153354_153765 = state_153148__$1;(statearr_153354_153765[(2)] = inst_153108);
(statearr_153354_153765[(1)] = (123));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (87)))
{var inst_152956 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153355_153766 = state_153148__$1;(statearr_153355_153766[(2)] = inst_152956);
(statearr_153355_153766[(1)] = (36));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (160)))
{var inst_153111 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153356_153767 = state_153148__$1;(statearr_153356_153767[(2)] = inst_153111);
(statearr_153356_153767[(1)] = (162));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (30)))
{var inst_152845 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153357_153768 = state_153148__$1;(statearr_153357_153768[(2)] = inst_152845);
(statearr_153357_153768[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (73)))
{var inst_152913 = (function(){throw cljs.core.match.backtrack})();var state_153148__$1 = state_153148;var statearr_153358_153769 = state_153148__$1;(statearr_153358_153769[(2)] = inst_152913);
(statearr_153358_153769[(1)] = (75));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (96)))
{var state_153148__$1 = state_153148;var statearr_153359_153770 = state_153148__$1;(statearr_153359_153770[(2)] = null);
(statearr_153359_153770[(1)] = (98));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (10)))
{var inst_152790 = (state_153148[(2)]);var inst_152791 = cljs.core.get.call(null,inst_152790,new cljs.core.Keyword(null,"tx-data","tx-data",934159761));var inst_152796 = cljs.core.seq.call(null,inst_152791);var inst_152797 = inst_152796;var inst_152798 = null;var inst_152799 = (0);var inst_152800 = (0);var state_153148__$1 = (function (){var statearr_153360 = state_153148;(statearr_153360[(19)] = inst_152797);
(statearr_153360[(20)] = inst_152800);
(statearr_153360[(21)] = inst_152798);
(statearr_153360[(22)] = inst_152799);
return statearr_153360;
})();var statearr_153361_153771 = state_153148__$1;(statearr_153361_153771[(2)] = null);
(statearr_153361_153771[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (18)))
{var state_153148__$1 = state_153148;var statearr_153362_153772 = state_153148__$1;(statearr_153362_153772[(2)] = null);
(statearr_153362_153772[(1)] = (20));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (105)))
{var inst_153002 = (state_153148[(2)]);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_153002))
{var statearr_153363_153773 = state_153148__$1;(statearr_153363_153773[(1)] = (106));
} else
{var statearr_153364_153774 = state_153148__$1;(statearr_153364_153774[(1)] = (107));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (52)))
{var state_153148__$1 = state_153148;var statearr_153365_153775 = state_153148__$1;(statearr_153365_153775[(2)] = null);
(statearr_153365_153775[(1)] = (60));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (114)))
{var inst_153126 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153366_153776 = state_153148__$1;(statearr_153366_153776[(2)] = inst_153126);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (147)))
{var inst_152973 = (state_153148[(12)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(143),Error,null,(142));var inst_153072 = cljs.core.get.call(null,inst_152973,new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_153073 = cljs.core.keyword_identical_QMARK_.call(null,inst_153072,new cljs.core.Keyword("state","dragging","state/dragging",1965974580));var state_153148__$1 = state_153148;if(inst_153073)
{var statearr_153367_153777 = state_153148__$1;(statearr_153367_153777[(1)] = (148));
} else
{var statearr_153368_153778 = state_153148__$1;(statearr_153368_153778[(1)] = (149));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (67)))
{var inst_152893 = (state_153148[(7)]);var inst_152898 = (function(){throw inst_152893})();var state_153148__$1 = state_153148;var statearr_153369_153779 = state_153148__$1;(statearr_153369_153779[(2)] = inst_152898);
(statearr_153369_153779[(1)] = (68));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (161)))
{var state_153148__$1 = state_153148;var statearr_153370_153780 = state_153148__$1;(statearr_153370_153780[(2)] = null);
(statearr_153370_153780[(1)] = (162));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (71)))
{var state_153148__$1 = state_153148;var statearr_153371_153781 = state_153148__$1;(statearr_153371_153781[(1)] = (73));

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (42)))
{var inst_152805 = (state_153148[(11)]);var ___$1 = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_153148,(38),Error,null,(37));var inst_152862 = cljs.core.get.call(null,inst_152805,new cljs.core.Keyword(null,"v","v",21465059),new cljs.core.Keyword("clojure.core.match","not-found","clojure.core.match/not-found",1553053780));var inst_152863 = (inst_152862 === false);var state_153148__$1 = state_153148;if(cljs.core.truth_(inst_152863))
{var statearr_153373_153782 = state_153148__$1;(statearr_153373_153782[(1)] = (43));
} else
{var statearr_153374_153783 = state_153148__$1;(statearr_153374_153783[(1)] = (44));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (80)))
{var state_153148__$1 = state_153148;var statearr_153375_153784 = state_153148__$1;(statearr_153375_153784[(2)] = null);
(statearr_153375_153784[(1)] = (81));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (37)))
{var inst_152950 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153376_153785 = state_153148__$1;(statearr_153376_153785[(2)] = inst_152950);
(statearr_153376_153785[(1)] = (36));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (63)))
{var inst_152928 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153377_153786 = state_153148__$1;(statearr_153377_153786[(2)] = inst_152928);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (94)))
{var inst_152964 = (state_153148[(13)]);var inst_153128 = (state_153148[(2)]);var inst_153129 = cljs.core.next.call(null,inst_152964);var inst_152797 = inst_153129;var inst_152798 = null;var inst_152799 = (0);var inst_152800 = (0);var state_153148__$1 = (function (){var statearr_153378 = state_153148;(statearr_153378[(19)] = inst_152797);
(statearr_153378[(20)] = inst_152800);
(statearr_153378[(21)] = inst_152798);
(statearr_153378[(22)] = inst_152799);
(statearr_153378[(32)] = inst_153128);
return statearr_153378;
})();var statearr_153379_153787 = state_153148__$1;(statearr_153379_153787[(2)] = null);
(statearr_153379_153787[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (8)))
{var inst_152782 = (state_153148[(14)]);var inst_152787 = cljs.core.apply.call(null,cljs.core.hash_map,inst_152782);var state_153148__$1 = state_153148;var statearr_153380_153788 = state_153148__$1;(statearr_153380_153788[(2)] = inst_152787);
(statearr_153380_153788[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (49)))
{var inst_152865 = (state_153148[(30)]);var inst_152870 = (function(){throw inst_152865})();var state_153148__$1 = state_153148;var statearr_153381_153789 = state_153148__$1;(statearr_153381_153789[(2)] = inst_152870);
(statearr_153381_153789[(1)] = (50));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_153149 === (84)))
{var inst_152946 = (state_153148[(2)]);var state_153148__$1 = state_153148;var statearr_153382_153790 = state_153148__$1;(statearr_153382_153790[(2)] = inst_152946);
(statearr_153382_153790[(1)] = (45));
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
}
}
}
}
}
});})(c__5812__auto___153594,chan,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
;return ((function (switch__5797__auto__,c__5812__auto___153594,chan,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app){
return (function() {
var state_machine__5798__auto__ = null;
var state_machine__5798__auto____0 = (function (){var statearr_153386 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_153386[(0)] = state_machine__5798__auto__);
(statearr_153386[(1)] = (1));
return statearr_153386;
});
var state_machine__5798__auto____1 = (function (state_153148){while(true){
var ret_value__5799__auto__ = (function (){try{while(true){
var result__5800__auto__ = switch__5797__auto__.call(null,state_153148);if(cljs.core.keyword_identical_QMARK_.call(null,result__5800__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5800__auto__;
}
break;
}
}catch (e153387){if((e153387 instanceof Object))
{var ex__5801__auto__ = e153387;var statearr_153388_153791 = state_153148;(statearr_153388_153791[(5)] = ex__5801__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_153148);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e153387;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5799__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__153792 = state_153148;
state_153148 = G__153792;
continue;
}
} else
{return ret_value__5799__auto__;
}
break;
}
});
state_machine__5798__auto__ = function(state_153148){
switch(arguments.length){
case 0:
return state_machine__5798__auto____0.call(this);
case 1:
return state_machine__5798__auto____1.call(this,state_153148);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5798__auto____0;
state_machine__5798__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5798__auto____1;
return state_machine__5798__auto__;
})()
;})(switch__5797__auto__,c__5812__auto___153594,chan,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
})();var state__5814__auto__ = (function (){var statearr_153389 = f__5813__auto__.call(null);(statearr_153389[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5812__auto___153594);
return statearr_153389;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5814__auto__);
});})(c__5812__auto___153594,chan,map__152156,map__152156__$1,id,map__152157,map__152157__$1,app))
);
ewen.wreak.dd_handle.set_attr_BANG_.call(null,app,id,new cljs.core.Keyword(null,"handle-stop-dragging-chan","handle-stop-dragging-chan",1767890867),chan);
return ewen.wreak.dd_handle.listen_dragging_BANG_.call(null,app,id,chan);
}),new cljs.core.Keyword(null,"componentWillUnmount","componentWillUnmount",1573788814),(function (p__153390,_,p__153391){var map__153392 = p__153390;var map__153392__$1 = ((cljs.core.seq_QMARK_.call(null,map__153392))?cljs.core.apply.call(null,cljs.core.hash_map,map__153392):map__153392);var id = cljs.core.get.call(null,map__153392__$1,new cljs.core.Keyword(null,"id","id",-1388402092));var map__153393 = p__153391;var map__153393__$1 = ((cljs.core.seq_QMARK_.call(null,map__153393))?cljs.core.apply.call(null,cljs.core.hash_map,map__153393):map__153393);var app = cljs.core.get.call(null,map__153393__$1,new cljs.core.Keyword(null,"app","app",-560961707));domina.events.unlisten_BANG_.call(null,ewen.wreak._STAR_component_STAR_.getDOMNode(),new cljs.core.Keyword(null,"down","down",1565245570).cljs$core$IFn$_invoke$arity$1(ewen.wreak.dd_handle.event_types));
datascript.unlisten_BANG_.call(null,app,new cljs.core.Keyword(null,"handle-start-dragging-chan","handle-start-dragging-chan",1703005358).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,cljs.core.deref.call(null,app),id)));
return datascript.unlisten_BANG_.call(null,app,new cljs.core.Keyword(null,"handle-stop-dragging-callback","handle-stop-dragging-callback",715652461).cljs$core$IFn$_invoke$arity$1(datascript.entity.call(null,cljs.core.deref.call(null,app),id)));
})], null));

//# sourceMappingURL=dd_handle.js.map