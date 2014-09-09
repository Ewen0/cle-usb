// Compiled by ClojureScript 0.0-2311
goog.provide('ewen.cle_usb.client');
goog.require('cljs.core');
goog.require('ewen.cle_usb.data');
goog.require('goog.style');
goog.require('ewen.async_plus');
goog.require('cljs.core.async');
goog.require('clojure.browser.repl');
goog.require('datascript');
goog.require('cljs.core.async');
goog.require('ewen.async_plus');
goog.require('datascript');
goog.require('ewen.cle_usb.render');
goog.require('ewen.cle_usb.data');
goog.require('goog.style');
goog.require('ewen.cle_usb.render');
ewen.cle_usb.client.init = (function init(){cljs.core.enable_console_print_BANG_.call(null);
return React.initializeTouchEvents(true);
});
ewen.cle_usb.client.app = ewen.cle_usb.data.load_app.call(null);
ewen.cle_usb.client.init.call(null);
ewen.cle_usb.client.render_view = (function render_view(view){return ewen.cle_usb.render.request_render.call(null,ewen.cle_usb.client.app,view);
});
ewen.cle_usb.client.maybe_update_pos = (function maybe_update_pos(pwd_map,id,pos){if(cljs.core._EQ_.call(null,id,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(pwd_map)))
{return cljs.core.assoc.call(null,pwd_map,new cljs.core.Keyword(null,"position","position",-2011731912),pos);
} else
{return pwd_map;
}
});
ewen.cle_usb.client.get_render_data = (function (){var method_table__4514__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4515__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4516__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4517__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4518__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("get-render-data",((function (method_table__4514__auto__,prefer_table__4515__auto__,method_cache__4516__auto__,cached_hierarchy__4517__auto__,hierarchy__4518__auto__){
return (function (data,view){return view;
});})(method_table__4514__auto__,prefer_table__4515__auto__,method_cache__4516__auto__,cached_hierarchy__4517__auto__,hierarchy__4518__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4518__auto__,method_table__4514__auto__,prefer_table__4515__auto__,method_cache__4516__auto__,cached_hierarchy__4517__auto__));
})();
cljs.core._add_method.call(null,ewen.cle_usb.client.get_render_data,new cljs.core.Keyword(null,"home","home",-74557309),(function (data,view){return cljs.core.vec.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222),cljs.core.map.call(null,(function (p__149024){var vec__149025 = p__149024;var id = cljs.core.nth.call(null,vec__149025,(0),null);var label = cljs.core.nth.call(null,vec__149025,(1),null);var dragging = cljs.core.nth.call(null,vec__149025,(2),null);var sort_index = cljs.core.nth.call(null,vec__149025,(3),null);return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"label","label",1718410804),label,new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),dragging,new cljs.core.Keyword(null,"sort-index","sort-index",-1082353222),sort_index], null);
}),ewen.cle_usb.data.get_list_passwords.call(null,data))));
}));
cljs.core._add_method.call(null,ewen.cle_usb.client.get_render_data,new cljs.core.Keyword(null,"new-password","new-password",-1530942754),(function (data,view){return cljs.core.PersistentArrayMap.EMPTY;
}));
var change_view_callback_149026 = (function (tx_report){var view = new cljs.core.Keyword(null,"v","v",21465059).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,cljs.core.filter.call(null,new cljs.core.Keyword(null,"added","added",2057651688),new cljs.core.Keyword(null,"tx-data","tx-data",934159761).cljs$core$IFn$_invoke$arity$1(tx_report))));return ewen.cle_usb.client.render_view.call(null,view);
});datascript.listen_BANG_.call(null,ewen.cle_usb.client.app,change_view_callback_149026,datascript.get_index_keys.call(null,ewen.cle_usb.data.get_current_view,ewen.cle_usb.client.app));
var view_149027 = ewen.cle_usb.data.only.call(null,ewen.cle_usb.data.get_current_view.call(null,cljs.core.deref.call(null,ewen.cle_usb.client.app)));ewen.cle_usb.client.render_view.call(null,view_149027);

//# sourceMappingURL=client.js.map