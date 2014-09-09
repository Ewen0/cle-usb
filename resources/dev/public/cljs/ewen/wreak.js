// Compiled by ClojureScript 0.0-2311
goog.provide('ewen.wreak');
goog.require('cljs.core');
ewen.wreak.render = (function render(component,node){return React.renderComponent(component,node);
});
ewen.wreak.keyword__GT_string = (function keyword__GT_string(arg){var namespace = cljs.core.namespace.call(null,arg);if(cljs.core.truth_(namespace))
{return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(namespace)+"/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,arg)));
} else
{return cljs.core.name.call(null,arg);
}
});
ewen.wreak.get_state = (function get_state(comp){var temp__4126__auto__ = comp.state;if(cljs.core.truth_(temp__4126__auto__))
{var react_state = temp__4126__auto__;return (react_state[ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","state","ewen.wreak/state",-793923504))]);
} else
{return null;
}
});
ewen.wreak.replace_state_BANG_ = (function replace_state_BANG_(comp,next_state){return comp.replaceState((function (){var G__152111 = ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","state","ewen.wreak/state",-793923504));var obj152113 = {};(obj152113[G__152111] = next_state);
return obj152113;
})());
});
ewen.wreak.get_props = (function get_props(comp){return (comp.props[ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","props","ewen.wreak/props",846467200))]);
});
ewen.wreak.get_statics = (function get_statics(comp){return (comp.props[ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","statics","ewen.wreak/statics",-255414854))]);
});
ewen.wreak.bind_lifecycle_method_args = (function bind_lifecycle_method_args(p__152114){var vec__152127 = p__152114;var method_key = cljs.core.nth.call(null,vec__152127,(0),null);var method = cljs.core.nth.call(null,vec__152127,(1),null);if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"getInitialState","getInitialState",1541760916),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"getInitialState","getInitialState",1541760916),((function (vec__152127,method_key,method){
return (function (){var this$ = this;var _STAR_component_STAR_152128 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
var init_state = method.call(null,ewen.wreak.get_props.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_statics.call(null,ewen.wreak._STAR_component_STAR_));var G__152129 = ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","state","ewen.wreak/state",-793923504));var obj152131 = {};(obj152131[G__152129] = init_state);
return obj152131;
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152128;
}});})(vec__152127,method_key,method))
], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"getDefaultProps","getDefaultProps",898083104),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"getDefaultProps","getDefaultProps",898083104),((function (vec__152127,method_key,method){
return (function (){var this$ = this;var _STAR_component_STAR_152132 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
return method.call(null);
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152132;
}});})(vec__152127,method_key,method))
], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"componentWillMount","componentWillMount",-285327619),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"componentWillMount","componentWillMount",-285327619),((function (vec__152127,method_key,method){
return (function (){var this$ = this;var _STAR_component_STAR_152133 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
return method.call(null,ewen.wreak.get_props.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_state.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_statics.call(null,ewen.wreak._STAR_component_STAR_));
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152133;
}});})(vec__152127,method_key,method))
], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"componentDidMount","componentDidMount",955710936),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"componentDidMount","componentDidMount",955710936),((function (vec__152127,method_key,method){
return (function (){var this$ = this;var _STAR_component_STAR_152134 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
return method.call(null,ewen.wreak.get_props.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_state.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_statics.call(null,ewen.wreak._STAR_component_STAR_));
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152134;
}});})(vec__152127,method_key,method))
], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"componentWillUpdate","componentWillUpdate",657390932),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"componentWillUpdate","componentWillUpdate",657390932),((function (vec__152127,method_key,method){
return (function (next_props,next_state){var this$ = this;var _STAR_component_STAR_152135 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
return method.call(null,ewen.wreak.get_props.call(null,ewen.wreak._STAR_component_STAR_),(next_props[ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","props","ewen.wreak/props",846467200))]),ewen.wreak.get_state.call(null,ewen.wreak._STAR_component_STAR_),(next_state[ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","state","ewen.wreak/state",-793923504))]),ewen.wreak.get_statics.call(null,ewen.wreak._STAR_component_STAR_));
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152135;
}});})(vec__152127,method_key,method))
], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"componentDidUpdate","componentDidUpdate",-1983477981),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"componentDidUpdate","componentDidUpdate",-1983477981),((function (vec__152127,method_key,method){
return (function (prev_props,prev_state){var this$ = this;var _STAR_component_STAR_152136 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
return method.call(null,(prev_props[ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","props","ewen.wreak/props",846467200))]),ewen.wreak.get_props.call(null,ewen.wreak._STAR_component_STAR_),(prev_state[ewen.wreak.keyword__GT_string.call(null,new cljs.core.Keyword("ewen.wreak","state","ewen.wreak/state",-793923504))]),ewen.wreak.get_state.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_statics.call(null,ewen.wreak._STAR_component_STAR_));
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152136;
}});})(vec__152127,method_key,method))
], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"componentWillUnmount","componentWillUnmount",1573788814),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"componentWillUnmount","componentWillUnmount",1573788814),((function (vec__152127,method_key,method){
return (function (){var this$ = this;var _STAR_component_STAR_152137 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
return method.call(null,ewen.wreak.get_props.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_state.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_statics.call(null,ewen.wreak._STAR_component_STAR_));
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152137;
}});})(vec__152127,method_key,method))
], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"componentWillReceiveProps","componentWillReceiveProps",559988974),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"componentWillReceiveProps","componentWillReceiveProps",559988974),((function (vec__152127,method_key,method){
return (function (next_props){var this$ = this;var _STAR_component_STAR_152138 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
return method.call(null,next_props,ewen.wreak.get_props.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_state.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_statics.call(null,ewen.wreak._STAR_component_STAR_));
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152138;
}});})(vec__152127,method_key,method))
], null);
} else
{return new cljs.core.PersistentArrayMap.fromArray([method_key,method], true, false);

}
}
}
}
}
}
}
}
});
ewen.wreak.bind_other_method_args = (function bind_other_method_args(p__152139){var vec__152142 = p__152139;var method_key = cljs.core.nth.call(null,vec__152142,(0),null);var method = cljs.core.nth.call(null,vec__152142,(1),null);if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"shouldComponentUpdate","shouldComponentUpdate",1795750960),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"shouldComponentUpdate","shouldComponentUpdate",1795750960),method], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"render","render",-1408033454),method_key))
{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"render","render",-1408033454),((function (vec__152142,method_key,method){
return (function (){var this$ = this;var _STAR_component_STAR_152143 = ewen.wreak._STAR_component_STAR_;try{ewen.wreak._STAR_component_STAR_ = this$;
return method.call(null,ewen.wreak.get_props.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_state.call(null,ewen.wreak._STAR_component_STAR_),ewen.wreak.get_statics.call(null,ewen.wreak._STAR_component_STAR_));
}finally {ewen.wreak._STAR_component_STAR_ = _STAR_component_STAR_152143;
}});})(vec__152142,method_key,method))
], null);
} else
{return new cljs.core.PersistentArrayMap.fromArray([method_key,method], true, false);

}
}
});
ewen.wreak.bind_methods_args_comp = (function bind_methods_args_comp(methods_args){return cljs.core.apply.call(null,cljs.core.merge,cljs.core.map.call(null,ewen.wreak.bind_other_method_args,cljs.core.apply.call(null,cljs.core.merge,cljs.core.map.call(null,ewen.wreak.bind_lifecycle_method_args,methods_args))));
});
ewen.wreak.bind_methods_args_mixin = (function bind_methods_args_mixin(methods_args){return cljs.core.apply.call(null,cljs.core.merge,cljs.core.map.call(null,ewen.wreak.bind_lifecycle_method_args,methods_args));
});
ewen.wreak.map__GT_js_obj = (function map__GT_js_obj(in_map){return cljs.core.apply.call(null,cljs.core.js_obj,cljs.core.mapcat.call(null,(function (p__152146){var vec__152147 = p__152146;var k = cljs.core.nth.call(null,vec__152147,(0),null);var v = cljs.core.nth.call(null,vec__152147,(1),null);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ewen.wreak.keyword__GT_string.call(null,k),v], null);
}),in_map));
});
ewen.wreak.component = (function component(name,methods_map){var default_methods = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"shouldComponentUpdate","shouldComponentUpdate",1795750960),(function (next_props,next_state){var this$ = this;return (cljs.core.not_EQ_.call(null,ewen.wreak.get_state.call(null,this$),next_state)) || (cljs.core.not_EQ_.call(null,ewen.wreak.get_props.call(null,this$),next_props));
}),new cljs.core.Keyword(null,"displayName","displayName",-809144601),name], null);var methods_map__$1 = cljs.core.merge.call(null,default_methods,methods_map);var methods_map__$2 = ewen.wreak.bind_methods_args_comp.call(null,methods_map__$1);var react_component = React.createClass(cljs.core.clj__GT_js.call(null,methods_map__$2));return ((function (default_methods,methods_map__$1,methods_map__$2,react_component){
return (function (props,statics,react_keys){return react_component.call(null,ewen.wreak.map__GT_js_obj.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("ewen.wreak","props","ewen.wreak/props",846467200),props,new cljs.core.Keyword("ewen.wreak","statics","ewen.wreak/statics",-255414854),statics], null),react_keys)));
});
;})(default_methods,methods_map__$1,methods_map__$2,react_component))
});
ewen.wreak.mixin = (function mixin(methods_map){var methods_map__$1 = ewen.wreak.bind_methods_args_mixin.call(null,methods_map);return ewen.wreak.map__GT_js_obj.call(null,methods_map__$1);
});

//# sourceMappingURL=wreak.js.map