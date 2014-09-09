// Compiled by ClojureScript 0.0-2311
goog.provide('sablono.core');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.string');
goog.require('sablono.util');
goog.require('goog.dom');
goog.require('goog.dom');
goog.require('sablono.interpreter');
goog.require('sablono.interpreter');
goog.require('sablono.util');
goog.require('clojure.walk');
goog.require('clojure.string');
/**
* Add an optional attribute argument to a function that returns a element vector.
*/
sablono.core.wrap_attrs = (function wrap_attrs(func){return (function() { 
var G__161098__delegate = function (args){if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,args)))
{var vec__161097 = cljs.core.apply.call(null,func,cljs.core.rest.call(null,args));var tag = cljs.core.nth.call(null,vec__161097,(0),null);var body = cljs.core.nthnext.call(null,vec__161097,(1));if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,body)))
{return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.merge.call(null,cljs.core.first.call(null,body),cljs.core.first.call(null,args)),cljs.core.rest.call(null,body));
} else
{return cljs.core.apply.call(null,cljs.core.vector,tag,cljs.core.first.call(null,args),body);
}
} else
{return cljs.core.apply.call(null,func,args);
}
};
var G__161098 = function (var_args){
var args = null;if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return G__161098__delegate.call(this,args);};
G__161098.cljs$lang$maxFixedArity = 0;
G__161098.cljs$lang$applyTo = (function (arglist__161099){
var args = cljs.core.seq(arglist__161099);
return G__161098__delegate(args);
});
G__161098.cljs$core$IFn$_invoke$arity$variadic = G__161098__delegate;
return G__161098;
})()
;
});
sablono.core.update_arglists = (function update_arglists(arglists){var iter__4373__auto__ = (function iter__161104(s__161105){return (new cljs.core.LazySeq(null,(function (){var s__161105__$1 = s__161105;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__161105__$1);if(temp__4126__auto__)
{var s__161105__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__161105__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__161105__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__161107 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__161106 = (0);while(true){
if((i__161106 < size__4372__auto__))
{var args = cljs.core._nth.call(null,c__4371__auto__,i__161106);cljs.core.chunk_append.call(null,b__161107,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)));
{
var G__161108 = (i__161106 + (1));
i__161106 = G__161108;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161107),iter__161104.call(null,cljs.core.chunk_rest.call(null,s__161105__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161107),null);
}
} else
{var args = cljs.core.first.call(null,s__161105__$2);return cljs.core.cons.call(null,cljs.core.vec.call(null,cljs.core.cons.call(null,new cljs.core.Symbol(null,"attr-map?","attr-map?",116307443,null),args)),iter__161104.call(null,cljs.core.rest.call(null,s__161105__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4373__auto__.call(null,arglists);
});
/**
* Render the React `component` as an HTML string.
*/
sablono.core.render = (function render(component){var html = cljs.core.atom.call(null,null);React.renderComponentToString(component,((function (html){
return (function (p1__161109_SHARP_){return cljs.core.reset_BANG_.call(null,html,p1__161109_SHARP_);
});})(html))
);
return cljs.core.deref.call(null,html);
});
/**
* Include a list of external stylesheet files.
* @param {...*} var_args
*/
sablono.core.include_css = (function() { 
var include_css__delegate = function (styles){var iter__4373__auto__ = (function iter__161114(s__161115){return (new cljs.core.LazySeq(null,(function (){var s__161115__$1 = s__161115;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__161115__$1);if(temp__4126__auto__)
{var s__161115__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__161115__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__161115__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__161117 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__161116 = (0);while(true){
if((i__161116 < size__4372__auto__))
{var style = cljs.core._nth.call(null,c__4371__auto__,i__161116);cljs.core.chunk_append.call(null,b__161117,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null));
{
var G__161118 = (i__161116 + (1));
i__161116 = G__161118;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161117),iter__161114.call(null,cljs.core.chunk_rest.call(null,s__161115__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161117),null);
}
} else
{var style = cljs.core.first.call(null,s__161115__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"link","link",-1769163468),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text/css",new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,style),new cljs.core.Keyword(null,"rel","rel",1378823488),"stylesheet"], null)], null),iter__161114.call(null,cljs.core.rest.call(null,s__161115__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4373__auto__.call(null,styles);
};
var include_css = function (var_args){
var styles = null;if (arguments.length > 0) {
  styles = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return include_css__delegate.call(this,styles);};
include_css.cljs$lang$maxFixedArity = 0;
include_css.cljs$lang$applyTo = (function (arglist__161119){
var styles = cljs.core.seq(arglist__161119);
return include_css__delegate(styles);
});
include_css.cljs$core$IFn$_invoke$arity$variadic = include_css__delegate;
return include_css;
})()
;
/**
* Include the JavaScript library at `src`.
*/
sablono.core.include_js = (function include_js(src){return goog.dom.appendChild(goog.dom.getDocument().body,goog.dom.createDom("script",{"src": src}));
});
/**
* Include Facebook's React JavaScript library.
*/
sablono.core.include_react = (function include_react(){return sablono.core.include_js.call(null,"http://fb.me/react-0.8.0.js");
});
/**
* Wraps some content in a HTML hyperlink with the supplied URL.
* @param {...*} var_args
*/
sablono.core.link_to161120 = (function() { 
var link_to161120__delegate = function (url,content){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),sablono.util.as_str.call(null,url)], null),content], null);
};
var link_to161120 = function (url,var_args){
var content = null;if (arguments.length > 1) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return link_to161120__delegate.call(this,url,content);};
link_to161120.cljs$lang$maxFixedArity = 1;
link_to161120.cljs$lang$applyTo = (function (arglist__161121){
var url = cljs.core.first(arglist__161121);
var content = cljs.core.rest(arglist__161121);
return link_to161120__delegate(url,content);
});
link_to161120.cljs$core$IFn$_invoke$arity$variadic = link_to161120__delegate;
return link_to161120;
})()
;
sablono.core.link_to = sablono.core.wrap_attrs.call(null,sablono.core.link_to161120);
/**
* Wraps some content in a HTML hyperlink with the supplied e-mail
* address. If no content provided use the e-mail address as content.
* @param {...*} var_args
*/
sablono.core.mail_to161122 = (function() { 
var mail_to161122__delegate = function (e_mail,p__161123){var vec__161125 = p__161123;var content = cljs.core.nth.call(null,vec__161125,(0),null);return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),("mailto:"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_mail))], null),(function (){var or__3648__auto__ = content;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return e_mail;
}
})()], null);
};
var mail_to161122 = function (e_mail,var_args){
var p__161123 = null;if (arguments.length > 1) {
  p__161123 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return mail_to161122__delegate.call(this,e_mail,p__161123);};
mail_to161122.cljs$lang$maxFixedArity = 1;
mail_to161122.cljs$lang$applyTo = (function (arglist__161126){
var e_mail = cljs.core.first(arglist__161126);
var p__161123 = cljs.core.rest(arglist__161126);
return mail_to161122__delegate(e_mail,p__161123);
});
mail_to161122.cljs$core$IFn$_invoke$arity$variadic = mail_to161122__delegate;
return mail_to161122;
})()
;
sablono.core.mail_to = sablono.core.wrap_attrs.call(null,sablono.core.mail_to161122);
/**
* Wrap a collection in an unordered list.
*/
sablono.core.unordered_list161127 = (function unordered_list161127(coll){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__4373__auto__ = (function iter__161132(s__161133){return (new cljs.core.LazySeq(null,(function (){var s__161133__$1 = s__161133;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__161133__$1);if(temp__4126__auto__)
{var s__161133__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__161133__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__161133__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__161135 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__161134 = (0);while(true){
if((i__161134 < size__4372__auto__))
{var x = cljs.core._nth.call(null,c__4371__auto__,i__161134);cljs.core.chunk_append.call(null,b__161135,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));
{
var G__161136 = (i__161134 + (1));
i__161134 = G__161136;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161135),iter__161132.call(null,cljs.core.chunk_rest.call(null,s__161133__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161135),null);
}
} else
{var x = cljs.core.first.call(null,s__161133__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),iter__161132.call(null,cljs.core.rest.call(null,s__161133__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4373__auto__.call(null,coll);
})()], null);
});
sablono.core.unordered_list = sablono.core.wrap_attrs.call(null,sablono.core.unordered_list161127);
/**
* Wrap a collection in an ordered list.
*/
sablono.core.ordered_list161137 = (function ordered_list161137(coll){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ol","ol",932524051),(function (){var iter__4373__auto__ = (function iter__161142(s__161143){return (new cljs.core.LazySeq(null,(function (){var s__161143__$1 = s__161143;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__161143__$1);if(temp__4126__auto__)
{var s__161143__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__161143__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__161143__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__161145 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__161144 = (0);while(true){
if((i__161144 < size__4372__auto__))
{var x = cljs.core._nth.call(null,c__4371__auto__,i__161144);cljs.core.chunk_append.call(null,b__161145,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null));
{
var G__161146 = (i__161144 + (1));
i__161144 = G__161146;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161145),iter__161142.call(null,cljs.core.chunk_rest.call(null,s__161143__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161145),null);
}
} else
{var x = cljs.core.first.call(null,s__161143__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),x], null),iter__161142.call(null,cljs.core.rest.call(null,s__161143__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4373__auto__.call(null,coll);
})()], null);
});
sablono.core.ordered_list = sablono.core.wrap_attrs.call(null,sablono.core.ordered_list161137);
/**
* Create an image element.
*/
sablono.core.image161147 = (function() {
var image161147 = null;
var image161147__1 = (function (src){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src)], null)], null);
});
var image161147__2 = (function (src,alt){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),sablono.util.as_str.call(null,src),new cljs.core.Keyword(null,"alt","alt",-3214426),alt], null)], null);
});
image161147 = function(src,alt){
switch(arguments.length){
case 1:
return image161147__1.call(this,src);
case 2:
return image161147__2.call(this,src,alt);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
image161147.cljs$core$IFn$_invoke$arity$1 = image161147__1;
image161147.cljs$core$IFn$_invoke$arity$2 = image161147__2;
return image161147;
})()
;
sablono.core.image = sablono.core.wrap_attrs.call(null,sablono.core.image161147);
sablono.core._STAR_group_STAR_ = cljs.core.PersistentVector.EMPTY;
/**
* Create a field name from the supplied argument the current field group.
*/
sablono.core.make_name = (function make_name(name){return cljs.core.reduce.call(null,(function (p1__161148_SHARP_,p2__161149_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__161148_SHARP_)+"["+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p2__161149_SHARP_)+"]");
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
* Create a field id from the supplied argument and current field group.
*/
sablono.core.make_id = (function make_id(name){return cljs.core.reduce.call(null,(function (p1__161150_SHARP_,p2__161151_SHARP_){return (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__161150_SHARP_)+"-"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(p2__161151_SHARP_));
}),cljs.core.conj.call(null,sablono.core._STAR_group_STAR_,sablono.util.as_str.call(null,name)));
});
/**
* Creates a new <input> element.
*/
sablono.core.input_field = (function input_field(type,name,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),type,new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value], null)], null);
});
/**
* Creates a hidden input field.
*/
sablono.core.hidden_field161152 = (function() {
var hidden_field161152 = null;
var hidden_field161152__1 = (function (name){return hidden_field161152.call(null,name,null);
});
var hidden_field161152__2 = (function (name,value){return sablono.core.input_field.call(null,"hidden",name,value);
});
hidden_field161152 = function(name,value){
switch(arguments.length){
case 1:
return hidden_field161152__1.call(this,name);
case 2:
return hidden_field161152__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
hidden_field161152.cljs$core$IFn$_invoke$arity$1 = hidden_field161152__1;
hidden_field161152.cljs$core$IFn$_invoke$arity$2 = hidden_field161152__2;
return hidden_field161152;
})()
;
sablono.core.hidden_field = sablono.core.wrap_attrs.call(null,sablono.core.hidden_field161152);
/**
* Creates a new text input field.
*/
sablono.core.text_field161153 = (function() {
var text_field161153 = null;
var text_field161153__1 = (function (name){return text_field161153.call(null,name,null);
});
var text_field161153__2 = (function (name,value){return sablono.core.input_field.call(null,"text",name,value);
});
text_field161153 = function(name,value){
switch(arguments.length){
case 1:
return text_field161153__1.call(this,name);
case 2:
return text_field161153__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text_field161153.cljs$core$IFn$_invoke$arity$1 = text_field161153__1;
text_field161153.cljs$core$IFn$_invoke$arity$2 = text_field161153__2;
return text_field161153;
})()
;
sablono.core.text_field = sablono.core.wrap_attrs.call(null,sablono.core.text_field161153);
/**
* Creates a new password field.
*/
sablono.core.password_field161154 = (function() {
var password_field161154 = null;
var password_field161154__1 = (function (name){return password_field161154.call(null,name,null);
});
var password_field161154__2 = (function (name,value){return sablono.core.input_field.call(null,"password",name,value);
});
password_field161154 = function(name,value){
switch(arguments.length){
case 1:
return password_field161154__1.call(this,name);
case 2:
return password_field161154__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
password_field161154.cljs$core$IFn$_invoke$arity$1 = password_field161154__1;
password_field161154.cljs$core$IFn$_invoke$arity$2 = password_field161154__2;
return password_field161154;
})()
;
sablono.core.password_field = sablono.core.wrap_attrs.call(null,sablono.core.password_field161154);
/**
* Creates a new email input field.
*/
sablono.core.email_field161155 = (function() {
var email_field161155 = null;
var email_field161155__1 = (function (name){return email_field161155.call(null,name,null);
});
var email_field161155__2 = (function (name,value){return sablono.core.input_field.call(null,"email",name,value);
});
email_field161155 = function(name,value){
switch(arguments.length){
case 1:
return email_field161155__1.call(this,name);
case 2:
return email_field161155__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
email_field161155.cljs$core$IFn$_invoke$arity$1 = email_field161155__1;
email_field161155.cljs$core$IFn$_invoke$arity$2 = email_field161155__2;
return email_field161155;
})()
;
sablono.core.email_field = sablono.core.wrap_attrs.call(null,sablono.core.email_field161155);
/**
* Creates a check box.
*/
sablono.core.check_box161156 = (function() {
var check_box161156 = null;
var check_box161156__1 = (function (name){return check_box161156.call(null,name,null);
});
var check_box161156__2 = (function (name,checked_QMARK_){return check_box161156.call(null,name,checked_QMARK_,"true");
});
var check_box161156__3 = (function (name,checked_QMARK_,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"checkbox",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});
check_box161156 = function(name,checked_QMARK_,value){
switch(arguments.length){
case 1:
return check_box161156__1.call(this,name);
case 2:
return check_box161156__2.call(this,name,checked_QMARK_);
case 3:
return check_box161156__3.call(this,name,checked_QMARK_,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
check_box161156.cljs$core$IFn$_invoke$arity$1 = check_box161156__1;
check_box161156.cljs$core$IFn$_invoke$arity$2 = check_box161156__2;
check_box161156.cljs$core$IFn$_invoke$arity$3 = check_box161156__3;
return check_box161156;
})()
;
sablono.core.check_box = sablono.core.wrap_attrs.call(null,sablono.core.check_box161156);
/**
* Creates a radio button.
*/
sablono.core.radio_button161157 = (function() {
var radio_button161157 = null;
var radio_button161157__1 = (function (group){return radio_button161157.call(null,group,null);
});
var radio_button161157__2 = (function (group,checked_QMARK_){return radio_button161157.call(null,group,checked_QMARK_,"true");
});
var radio_button161157__3 = (function (group,checked_QMARK_,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"radio",new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,group),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(sablono.util.as_str.call(null,group))+"-"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(sablono.util.as_str.call(null,value)))),new cljs.core.Keyword(null,"value","value",305978217),value,new cljs.core.Keyword(null,"checked","checked",-50955819),checked_QMARK_], null)], null);
});
radio_button161157 = function(group,checked_QMARK_,value){
switch(arguments.length){
case 1:
return radio_button161157__1.call(this,group);
case 2:
return radio_button161157__2.call(this,group,checked_QMARK_);
case 3:
return radio_button161157__3.call(this,group,checked_QMARK_,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
radio_button161157.cljs$core$IFn$_invoke$arity$1 = radio_button161157__1;
radio_button161157.cljs$core$IFn$_invoke$arity$2 = radio_button161157__2;
radio_button161157.cljs$core$IFn$_invoke$arity$3 = radio_button161157__3;
return radio_button161157;
})()
;
sablono.core.radio_button = sablono.core.wrap_attrs.call(null,sablono.core.radio_button161157);
/**
* Creates a seq of option tags from a collection.
*/
sablono.core.select_options161158 = (function() {
var select_options161158 = null;
var select_options161158__1 = (function (coll){return select_options161158.call(null,coll,null);
});
var select_options161158__2 = (function (coll,selected){var iter__4373__auto__ = (function iter__161167(s__161168){return (new cljs.core.LazySeq(null,(function (){var s__161168__$1 = s__161168;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__161168__$1);if(temp__4126__auto__)
{var s__161168__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__161168__$2))
{var c__4371__auto__ = cljs.core.chunk_first.call(null,s__161168__$2);var size__4372__auto__ = cljs.core.count.call(null,c__4371__auto__);var b__161170 = cljs.core.chunk_buffer.call(null,size__4372__auto__);if((function (){var i__161169 = (0);while(true){
if((i__161169 < size__4372__auto__))
{var x = cljs.core._nth.call(null,c__4371__auto__,i__161169);cljs.core.chunk_append.call(null,b__161170,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__161173 = x;var text = cljs.core.nth.call(null,vec__161173,(0),null);var val = cljs.core.nth.call(null,vec__161173,(1),null);if(cljs.core.sequential_QMARK_.call(null,val))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),text], null),select_options161158.call(null,val,selected)], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),val,new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core._EQ_.call(null,val,selected)], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core._EQ_.call(null,x,selected)], null),x], null)));
{
var G__161175 = (i__161169 + (1));
i__161169 = G__161175;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161170),iter__161167.call(null,cljs.core.chunk_rest.call(null,s__161168__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__161170),null);
}
} else
{var x = cljs.core.first.call(null,s__161168__$2);return cljs.core.cons.call(null,((cljs.core.sequential_QMARK_.call(null,x))?(function (){var vec__161174 = x;var text = cljs.core.nth.call(null,vec__161174,(0),null);var val = cljs.core.nth.call(null,vec__161174,(1),null);if(cljs.core.sequential_QMARK_.call(null,val))
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"optgroup","optgroup",1738282218),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),text], null),select_options161158.call(null,val,selected)], null);
} else
{return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),val,new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core._EQ_.call(null,val,selected)], null),text], null);
}
})():new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"selected","selected",574897764),cljs.core._EQ_.call(null,x,selected)], null),x], null)),iter__161167.call(null,cljs.core.rest.call(null,s__161168__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4373__auto__.call(null,coll);
});
select_options161158 = function(coll,selected){
switch(arguments.length){
case 1:
return select_options161158__1.call(this,coll);
case 2:
return select_options161158__2.call(this,coll,selected);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
select_options161158.cljs$core$IFn$_invoke$arity$1 = select_options161158__1;
select_options161158.cljs$core$IFn$_invoke$arity$2 = select_options161158__2;
return select_options161158;
})()
;
sablono.core.select_options = sablono.core.wrap_attrs.call(null,sablono.core.select_options161158);
/**
* Creates a drop-down box using the <select> tag.
*/
sablono.core.drop_down161176 = (function() {
var drop_down161176 = null;
var drop_down161176__2 = (function (name,options){return drop_down161176.call(null,name,options,null);
});
var drop_down161176__3 = (function (name,options,selected){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name)], null),sablono.core.select_options.call(null,options,selected)], null);
});
drop_down161176 = function(name,options,selected){
switch(arguments.length){
case 2:
return drop_down161176__2.call(this,name,options);
case 3:
return drop_down161176__3.call(this,name,options,selected);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
drop_down161176.cljs$core$IFn$_invoke$arity$2 = drop_down161176__2;
drop_down161176.cljs$core$IFn$_invoke$arity$3 = drop_down161176__3;
return drop_down161176;
})()
;
sablono.core.drop_down = sablono.core.wrap_attrs.call(null,sablono.core.drop_down161176);
/**
* Creates a text area element.
*/
sablono.core.text_area161177 = (function() {
var text_area161177 = null;
var text_area161177__1 = (function (name){return text_area161177.call(null,name,null);
});
var text_area161177__2 = (function (name,value){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",-650375824),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),sablono.core.make_name.call(null,name),new cljs.core.Keyword(null,"id","id",-1388402092),sablono.core.make_id.call(null,name),new cljs.core.Keyword(null,"value","value",305978217),value], null)], null);
});
text_area161177 = function(name,value){
switch(arguments.length){
case 1:
return text_area161177__1.call(this,name);
case 2:
return text_area161177__2.call(this,name,value);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
text_area161177.cljs$core$IFn$_invoke$arity$1 = text_area161177__1;
text_area161177.cljs$core$IFn$_invoke$arity$2 = text_area161177__2;
return text_area161177;
})()
;
sablono.core.text_area = sablono.core.wrap_attrs.call(null,sablono.core.text_area161177);
/**
* Creates a file upload input.
*/
sablono.core.file_upload161178 = (function file_upload161178(name){return sablono.core.input_field.call(null,"file",name,null);
});
sablono.core.file_upload = sablono.core.wrap_attrs.call(null,sablono.core.file_upload161178);
/**
* Creates a label for an input field with the supplied name.
*/
sablono.core.label161179 = (function label161179(name,text){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"htmlFor","htmlFor",-1050291720),sablono.core.make_id.call(null,name)], null),text], null);
});
sablono.core.label = sablono.core.wrap_attrs.call(null,sablono.core.label161179);
/**
* Creates a submit button.
*/
sablono.core.submit_button161180 = (function submit_button161180(text){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"submit",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});
sablono.core.submit_button = sablono.core.wrap_attrs.call(null,sablono.core.submit_button161180);
/**
* Creates a form reset button.
*/
sablono.core.reset_button161181 = (function reset_button161181(text){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"reset",new cljs.core.Keyword(null,"value","value",305978217),text], null)], null);
});
sablono.core.reset_button = sablono.core.wrap_attrs.call(null,sablono.core.reset_button161181);
/**
* Create a form that points to a particular method and route.
* e.g. (form-to [:put "/post"]
* ...)
* @param {...*} var_args
*/
sablono.core.form_to161182 = (function() { 
var form_to161182__delegate = function (p__161183,body){var vec__161185 = p__161183;var method = cljs.core.nth.call(null,vec__161185,(0),null);var action = cljs.core.nth.call(null,vec__161185,(1),null);var method_str = clojure.string.upper_case.call(null,cljs.core.name.call(null,method));var action_uri = sablono.util.to_uri.call(null,action);return cljs.core.vec.call(null,cljs.core.concat.call(null,((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"get","get",1683182755),null,new cljs.core.Keyword(null,"post","post",269697687),null], null), null),method))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),method_str,new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),"POST",new cljs.core.Keyword(null,"action","action",-811238024),action_uri], null),sablono.core.hidden_field.call(null,"_method",method_str)], null)),body));
};
var form_to161182 = function (p__161183,var_args){
var body = null;if (arguments.length > 1) {
  body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return form_to161182__delegate.call(this,p__161183,body);};
form_to161182.cljs$lang$maxFixedArity = 1;
form_to161182.cljs$lang$applyTo = (function (arglist__161186){
var p__161183 = cljs.core.first(arglist__161186);
var body = cljs.core.rest(arglist__161186);
return form_to161182__delegate(p__161183,body);
});
form_to161182.cljs$core$IFn$_invoke$arity$variadic = form_to161182__delegate;
return form_to161182;
})()
;
sablono.core.form_to = sablono.core.wrap_attrs.call(null,sablono.core.form_to161182);

//# sourceMappingURL=core.js.map