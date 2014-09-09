// Compiled by ClojureScript 0.0-2311
goog.provide('domina');
goog.require('cljs.core');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.xml');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.string');
goog.require('cljs.core');
goog.require('domina.support');
goog.require('goog.events');
goog.require('goog.string');
goog.require('domina.support');
goog.require('goog.style');
goog.require('goog.style');
goog.require('clojure.string');
goog.require('clojure.string');
goog.require('goog.events');
goog.require('goog.dom.xml');
goog.require('cljs.core');
domina.re_html = /<|&#?\w+;/;
domina.re_leading_whitespace = /^\s+/;
domina.re_xhtml_tag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/i;
domina.re_tag_name = /<([\w:]+)/;
domina.re_no_inner_html = /<(?:script|style)/i;
domina.re_tbody = /<tbody/i;
var opt_wrapper_160644 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),"<select multiple='multiple'>","</select>"], null);var table_section_wrapper_160645 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),"<table>","</table>"], null);var cell_wrapper_160646 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(3),"<table><tbody><tr>","</tr></tbody></table>"], null);domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["td","optgroup","tfoot","tr","area",new cljs.core.Keyword(null,"default","default",-1987822328),"option","legend","thead","col","caption","th","colgroup","tbody"],[cell_wrapper_160646,opt_wrapper_160644,table_section_wrapper_160645,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),"<table><tbody>","</tbody></table>"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),"<map>","</map>"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),"",""], null),opt_wrapper_160644,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),"<fieldset>","</fieldset>"], null),table_section_wrapper_160645,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),"<table><tbody></tbody><colgroup>","</colgroup></table>"], null),table_section_wrapper_160645,cell_wrapper_160646,table_section_wrapper_160645,table_section_wrapper_160645]);
domina.remove_extraneous_tbody_BANG_ = (function remove_extraneous_tbody_BANG_(div,html,tag_name,start_wrap){var no_tbody_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_tbody,html));var tbody = (((cljs.core._EQ_.call(null,tag_name,"table")) && (no_tbody_QMARK_))?(function (){var and__3636__auto__ = div.firstChild;if(cljs.core.truth_(and__3636__auto__))
{return div.firstChild.childNodes;
} else
{return and__3636__auto__;
}
})():(((cljs.core._EQ_.call(null,start_wrap,"<table>")) && (no_tbody_QMARK_))?div.childNodes:cljs.core.PersistentVector.EMPTY));var seq__160651 = cljs.core.seq.call(null,tbody);var chunk__160652 = null;var count__160653 = (0);var i__160654 = (0);while(true){
if((i__160654 < count__160653))
{var child = cljs.core._nth.call(null,chunk__160652,i__160654);if((cljs.core._EQ_.call(null,child.nodeName,"tbody")) && (cljs.core._EQ_.call(null,child.childNodes.length,(0))))
{child.parentNode.removeChild(child);
} else
{}
{
var G__160655 = seq__160651;
var G__160656 = chunk__160652;
var G__160657 = count__160653;
var G__160658 = (i__160654 + (1));
seq__160651 = G__160655;
chunk__160652 = G__160656;
count__160653 = G__160657;
i__160654 = G__160658;
continue;
}
} else
{var temp__4126__auto__ = cljs.core.seq.call(null,seq__160651);if(temp__4126__auto__)
{var seq__160651__$1 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160651__$1))
{var c__4404__auto__ = cljs.core.chunk_first.call(null,seq__160651__$1);{
var G__160659 = cljs.core.chunk_rest.call(null,seq__160651__$1);
var G__160660 = c__4404__auto__;
var G__160661 = cljs.core.count.call(null,c__4404__auto__);
var G__160662 = (0);
seq__160651 = G__160659;
chunk__160652 = G__160660;
count__160653 = G__160661;
i__160654 = G__160662;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__160651__$1);if((cljs.core._EQ_.call(null,child.nodeName,"tbody")) && (cljs.core._EQ_.call(null,child.childNodes.length,(0))))
{child.parentNode.removeChild(child);
} else
{}
{
var G__160663 = cljs.core.next.call(null,seq__160651__$1);
var G__160664 = null;
var G__160665 = (0);
var G__160666 = (0);
seq__160651 = G__160663;
chunk__160652 = G__160664;
count__160653 = G__160665;
i__160654 = G__160666;
continue;
}
}
} else
{return null;
}
}
break;
}
});
domina.restore_leading_whitespace_BANG_ = (function restore_leading_whitespace_BANG_(div,html){return div.insertBefore(document.createTextNode(cljs.core.first.call(null,cljs.core.re_find.call(null,domina.re_leading_whitespace,html))),div.firstChild);
});
/**
* takes an string of html and returns a NodeList of dom fragments
*/
domina.html_to_dom = (function html_to_dom(html){var html__$1 = clojure.string.replace.call(null,html,domina.re_xhtml_tag,"<$1></$2>");var tag_name = (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html__$1)))).toLowerCase();var vec__160668 = cljs.core.get.call(null,domina.wrap_map,tag_name,new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(domina.wrap_map));var depth = cljs.core.nth.call(null,vec__160668,(0),null);var start_wrap = cljs.core.nth.call(null,vec__160668,(1),null);var end_wrap = cljs.core.nth.call(null,vec__160668,(2),null);var div = (function (){var wrapper = (function (){var div = document.createElement("div");div.innerHTML = (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(start_wrap)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(html__$1)+cljs.core.str.cljs$core$IFn$_invoke$arity$1(end_wrap));
return div;
})();var level = depth;while(true){
if((level > (0)))
{{
var G__160669 = wrapper.lastChild;
var G__160670 = (level - (1));
wrapper = G__160669;
level = G__160670;
continue;
}
} else
{return wrapper;
}
break;
}
})();if(cljs.core.truth_(domina.support.extraneous_tbody_QMARK_))
{domina.remove_extraneous_tbody_BANG_.call(null,div,html__$1,tag_name,start_wrap);
} else
{}
if(cljs.core.truth_((function (){var and__3636__auto__ = cljs.core.not.call(null,domina.support.leading_whitespace_QMARK_);if(and__3636__auto__)
{return cljs.core.re_find.call(null,domina.re_leading_whitespace,html__$1);
} else
{return and__3636__auto__;
}
})()))
{domina.restore_leading_whitespace_BANG_.call(null,div,html__$1);
} else
{}
return div.childNodes;
});
domina.string_to_dom = (function string_to_dom(s){if(cljs.core.truth_(cljs.core.re_find.call(null,domina.re_html,s)))
{return domina.html_to_dom.call(null,s);
} else
{return document.createTextNode(s);
}
});
domina.DomContent = (function (){var obj160672 = {};return obj160672;
})();
domina.nodes = (function nodes(content){if((function (){var and__3636__auto__ = content;if(and__3636__auto__)
{return content.domina$DomContent$nodes$arity$1;
} else
{return and__3636__auto__;
}
})())
{return content.domina$DomContent$nodes$arity$1(content);
} else
{var x__4275__auto__ = (((content == null))?null:content);return (function (){var or__3648__auto__ = (domina.nodes[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (domina.nodes["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.nodes",content);
}
}
})().call(null,content);
}
});
domina.single_node = (function single_node(nodeseq){if((function (){var and__3636__auto__ = nodeseq;if(and__3636__auto__)
{return nodeseq.domina$DomContent$single_node$arity$1;
} else
{return and__3636__auto__;
}
})())
{return nodeseq.domina$DomContent$single_node$arity$1(nodeseq);
} else
{var x__4275__auto__ = (((nodeseq == null))?null:nodeseq);return (function (){var or__3648__auto__ = (domina.single_node[goog.typeOf(x__4275__auto__)]);if(or__3648__auto__)
{return or__3648__auto__;
} else
{var or__3648__auto____$1 = (domina.single_node["_"]);if(or__3648__auto____$1)
{return or__3648__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.single-node",nodeseq);
}
}
})().call(null,nodeseq);
}
});
domina._STAR_debug_STAR_ = true;
/**
* @param {...*} var_args
*/
domina.log_debug = (function() { 
var log_debug__delegate = function (mesg){if(cljs.core.truth_((function (){var and__3636__auto__ = domina._STAR_debug_STAR_;if(cljs.core.truth_(and__3636__auto__))
{return !(cljs.core._EQ_.call(null,window.console,undefined));
} else
{return and__3636__auto__;
}
})()))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log_debug = function (var_args){
var mesg = null;if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return log_debug__delegate.call(this,mesg);};
log_debug.cljs$lang$maxFixedArity = 0;
log_debug.cljs$lang$applyTo = (function (arglist__160673){
var mesg = cljs.core.seq(arglist__160673);
return log_debug__delegate(mesg);
});
log_debug.cljs$core$IFn$_invoke$arity$variadic = log_debug__delegate;
return log_debug;
})()
;
/**
* @param {...*} var_args
*/
domina.log = (function() { 
var log__delegate = function (mesg){if(cljs.core.truth_(window.console))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log = function (var_args){
var mesg = null;if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return log__delegate.call(this,mesg);};
log.cljs$lang$maxFixedArity = 0;
log.cljs$lang$applyTo = (function (arglist__160674){
var mesg = cljs.core.seq(arglist__160674);
return log__delegate(mesg);
});
log.cljs$core$IFn$_invoke$arity$variadic = log__delegate;
return log;
})()
;
/**
* Returns content containing a single node by looking up the given ID
*/
domina.by_id = (function by_id(id){return goog.dom.getElement(cljs.core.name.call(null,id));
});
/**
* Returns content containing nodes which have the specified CSS class.
*/
domina.by_class = (function by_class(class_name){return domina.normalize_seq.call(null,goog.dom.getElementsByClass(cljs.core.name.call(null,class_name)));
});
/**
* Gets all the child nodes of the elements in a content. Same as (xpath content '*') but more efficient.
*/
domina.children = (function children(content){return cljs.core.doall.call(null,cljs.core.mapcat.call(null,goog.dom.getChildren,domina.nodes.call(null,content)));
});
/**
* Returns the deepest common ancestor of the argument contents (which are presumed to be single nodes), or nil if they are from different documents.
* @param {...*} var_args
*/
domina.common_ancestor = (function() { 
var common_ancestor__delegate = function (contents){return cljs.core.apply.call(null,goog.dom.findCommonAncestor,cljs.core.map.call(null,domina.single_node,contents));
};
var common_ancestor = function (var_args){
var contents = null;if (arguments.length > 0) {
  contents = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);} 
return common_ancestor__delegate.call(this,contents);};
common_ancestor.cljs$lang$maxFixedArity = 0;
common_ancestor.cljs$lang$applyTo = (function (arglist__160675){
var contents = cljs.core.seq(arglist__160675);
return common_ancestor__delegate(contents);
});
common_ancestor.cljs$core$IFn$_invoke$arity$variadic = common_ancestor__delegate;
return common_ancestor;
})()
;
/**
* Returns true if the first argument is an ancestor of the second argument. Presumes both arguments are single-node contents.
*/
domina.ancestor_QMARK_ = (function ancestor_QMARK_(ancestor_content,descendant_content){return cljs.core._EQ_.call(null,domina.common_ancestor.call(null,ancestor_content,descendant_content),domina.single_node.call(null,ancestor_content));
});
/**
* Returns a deep clone of content.
*/
domina.clone = (function clone(content){return cljs.core.map.call(null,(function (p1__160676_SHARP_){return p1__160676_SHARP_.cloneNode(true);
}),domina.nodes.call(null,content));
});
/**
* Given a parent and child contents, appends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.append_BANG_ = (function append_BANG_(parent_content,child_content){domina.apply_with_cloning.call(null,goog.dom.appendChild,parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, appends each of the children to all of the parents at the specified index. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.insert_BANG_ = (function insert_BANG_(parent_content,child_content,idx){domina.apply_with_cloning.call(null,(function (p1__160677_SHARP_,p2__160678_SHARP_){return goog.dom.insertChildAt(p1__160677_SHARP_,p2__160678_SHARP_,idx);
}),parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, prepends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.prepend_BANG_ = (function prepend_BANG_(parent_content,child_content){domina.insert_BANG_.call(null,parent_content,child_content,(0));
return parent_content;
});
/**
* Given a content and some new content, inserts the new content immediately before the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_before_BANG_ = (function insert_before_BANG_(content,new_content){domina.apply_with_cloning.call(null,(function (p1__160680_SHARP_,p2__160679_SHARP_){return goog.dom.insertSiblingBefore(p2__160679_SHARP_,p1__160680_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){domina.apply_with_cloning.call(null,(function (p1__160682_SHARP_,p2__160681_SHARP_){return goog.dom.insertSiblingAfter(p2__160681_SHARP_,p1__160682_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){domina.apply_with_cloning.call(null,(function (p1__160684_SHARP_,p2__160683_SHARP_){return goog.dom.replaceNode(p2__160683_SHARP_,p1__160684_SHARP_);
}),old_content,new_content);
return old_content;
});
/**
* Removes all the nodes in a content from the DOM and returns them.
*/
domina.detach_BANG_ = (function detach_BANG_(content){return cljs.core.doall.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the nodes in a content from the DOM. Returns nil.
*/
domina.destroy_BANG_ = (function destroy_BANG_(content){return cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the child nodes in a content from the DOM. Returns the original content.
*/
domina.destroy_children_BANG_ = (function destroy_children_BANG_(content){cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeChildren,domina.nodes.call(null,content)));
return content;
});
/**
* Gets the value of a CSS property. Assumes content will be a single node. Name may be a string or keyword. Returns nil if there is no value set for the style.
*/
domina.style = (function style(content,name){var s = goog.style.getStyle(domina.single_node.call(null,content),cljs.core.name.call(null,name));if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return null;
} else
{return s;
}
});
/**
* Gets the value of an HTML attribute. Assumes content will be a single node. Name may be a stirng or keyword. Returns nil if there is no value set for the style.
*/
domina.attr = (function attr(content,name){return domina.single_node.call(null,content).getAttribute(cljs.core.name.call(null,name));
});
/**
* Sets the value of a CSS property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (content,name,value){var seq__160689_160693 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__160690_160694 = null;var count__160691_160695 = (0);var i__160692_160696 = (0);while(true){
if((i__160692_160696 < count__160691_160695))
{var n_160697 = cljs.core._nth.call(null,chunk__160690_160694,i__160692_160696);goog.style.setStyle(n_160697,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__160698 = seq__160689_160693;
var G__160699 = chunk__160690_160694;
var G__160700 = count__160691_160695;
var G__160701 = (i__160692_160696 + (1));
seq__160689_160693 = G__160698;
chunk__160690_160694 = G__160699;
count__160691_160695 = G__160700;
i__160692_160696 = G__160701;
continue;
}
} else
{var temp__4126__auto___160702 = cljs.core.seq.call(null,seq__160689_160693);if(temp__4126__auto___160702)
{var seq__160689_160703__$1 = temp__4126__auto___160702;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160689_160703__$1))
{var c__4404__auto___160704 = cljs.core.chunk_first.call(null,seq__160689_160703__$1);{
var G__160705 = cljs.core.chunk_rest.call(null,seq__160689_160703__$1);
var G__160706 = c__4404__auto___160704;
var G__160707 = cljs.core.count.call(null,c__4404__auto___160704);
var G__160708 = (0);
seq__160689_160693 = G__160705;
chunk__160690_160694 = G__160706;
count__160691_160695 = G__160707;
i__160692_160696 = G__160708;
continue;
}
} else
{var n_160709 = cljs.core.first.call(null,seq__160689_160703__$1);goog.style.setStyle(n_160709,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__160710 = cljs.core.next.call(null,seq__160689_160703__$1);
var G__160711 = null;
var G__160712 = (0);
var G__160713 = (0);
seq__160689_160693 = G__160710;
chunk__160690_160694 = G__160711;
count__160691_160695 = G__160712;
i__160692_160696 = G__160713;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_style_BANG_ = function (content,name,var_args){
var value = null;if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return set_style_BANG___delegate.call(this,content,name,value);};
set_style_BANG_.cljs$lang$maxFixedArity = 2;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__160714){
var content = cljs.core.first(arglist__160714);
arglist__160714 = cljs.core.next(arglist__160714);
var name = cljs.core.first(arglist__160714);
var value = cljs.core.rest(arglist__160714);
return set_style_BANG___delegate(content,name,value);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
/**
* Sets the value of an HTML property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_attr_BANG_ = (function() { 
var set_attr_BANG___delegate = function (content,name,value){var seq__160719_160723 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__160720_160724 = null;var count__160721_160725 = (0);var i__160722_160726 = (0);while(true){
if((i__160722_160726 < count__160721_160725))
{var n_160727 = cljs.core._nth.call(null,chunk__160720_160724,i__160722_160726);n_160727.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__160728 = seq__160719_160723;
var G__160729 = chunk__160720_160724;
var G__160730 = count__160721_160725;
var G__160731 = (i__160722_160726 + (1));
seq__160719_160723 = G__160728;
chunk__160720_160724 = G__160729;
count__160721_160725 = G__160730;
i__160722_160726 = G__160731;
continue;
}
} else
{var temp__4126__auto___160732 = cljs.core.seq.call(null,seq__160719_160723);if(temp__4126__auto___160732)
{var seq__160719_160733__$1 = temp__4126__auto___160732;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160719_160733__$1))
{var c__4404__auto___160734 = cljs.core.chunk_first.call(null,seq__160719_160733__$1);{
var G__160735 = cljs.core.chunk_rest.call(null,seq__160719_160733__$1);
var G__160736 = c__4404__auto___160734;
var G__160737 = cljs.core.count.call(null,c__4404__auto___160734);
var G__160738 = (0);
seq__160719_160723 = G__160735;
chunk__160720_160724 = G__160736;
count__160721_160725 = G__160737;
i__160722_160726 = G__160738;
continue;
}
} else
{var n_160739 = cljs.core.first.call(null,seq__160719_160733__$1);n_160739.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__160740 = cljs.core.next.call(null,seq__160719_160733__$1);
var G__160741 = null;
var G__160742 = (0);
var G__160743 = (0);
seq__160719_160723 = G__160740;
chunk__160720_160724 = G__160741;
count__160721_160725 = G__160742;
i__160722_160726 = G__160743;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_attr_BANG_ = function (content,name,var_args){
var value = null;if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return set_attr_BANG___delegate.call(this,content,name,value);};
set_attr_BANG_.cljs$lang$maxFixedArity = 2;
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__160744){
var content = cljs.core.first(arglist__160744);
arglist__160744 = cljs.core.next(arglist__160744);
var name = cljs.core.first(arglist__160744);
var value = cljs.core.rest(arglist__160744);
return set_attr_BANG___delegate(content,name,value);
});
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___delegate;
return set_attr_BANG_;
})()
;
/**
* Removes the specified HTML property for each node in the content. Name may be a string or keyword.
*/
domina.remove_attr_BANG_ = (function remove_attr_BANG_(content,name){var seq__160749_160753 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__160750_160754 = null;var count__160751_160755 = (0);var i__160752_160756 = (0);while(true){
if((i__160752_160756 < count__160751_160755))
{var n_160757 = cljs.core._nth.call(null,chunk__160750_160754,i__160752_160756);n_160757.removeAttribute(cljs.core.name.call(null,name));
{
var G__160758 = seq__160749_160753;
var G__160759 = chunk__160750_160754;
var G__160760 = count__160751_160755;
var G__160761 = (i__160752_160756 + (1));
seq__160749_160753 = G__160758;
chunk__160750_160754 = G__160759;
count__160751_160755 = G__160760;
i__160752_160756 = G__160761;
continue;
}
} else
{var temp__4126__auto___160762 = cljs.core.seq.call(null,seq__160749_160753);if(temp__4126__auto___160762)
{var seq__160749_160763__$1 = temp__4126__auto___160762;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160749_160763__$1))
{var c__4404__auto___160764 = cljs.core.chunk_first.call(null,seq__160749_160763__$1);{
var G__160765 = cljs.core.chunk_rest.call(null,seq__160749_160763__$1);
var G__160766 = c__4404__auto___160764;
var G__160767 = cljs.core.count.call(null,c__4404__auto___160764);
var G__160768 = (0);
seq__160749_160753 = G__160765;
chunk__160750_160754 = G__160766;
count__160751_160755 = G__160767;
i__160752_160756 = G__160768;
continue;
}
} else
{var n_160769 = cljs.core.first.call(null,seq__160749_160763__$1);n_160769.removeAttribute(cljs.core.name.call(null,name));
{
var G__160770 = cljs.core.next.call(null,seq__160749_160763__$1);
var G__160771 = null;
var G__160772 = (0);
var G__160773 = (0);
seq__160749_160753 = G__160770;
chunk__160750_160754 = G__160771;
count__160751_160755 = G__160772;
i__160752_160756 = G__160773;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Parses a CSS style string and returns the properties as a map.
*/
domina.parse_style_attributes = (function parse_style_attributes(style){return cljs.core.reduce.call(null,(function (acc,pair){var vec__160775 = pair.split(/\s*:\s*/);var k = cljs.core.nth.call(null,vec__160775,(0),null);var v = cljs.core.nth.call(null,vec__160775,(1),null);if(cljs.core.truth_((function (){var and__3636__auto__ = k;if(cljs.core.truth_(and__3636__auto__))
{return v;
} else
{return and__3636__auto__;
}
})()))
{return cljs.core.assoc.call(null,acc,cljs.core.keyword.call(null,k.toLowerCase()),v);
} else
{return acc;
}
}),cljs.core.PersistentArrayMap.EMPTY,style.split(/\s*;\s*/));
});
/**
* Returns a map of the CSS styles/values. Assumes content will be a single node. Style names are returned as keywords.
*/
domina.styles = (function styles(content){var style = domina.attr.call(null,content,"style");if(typeof style === 'string')
{return domina.parse_style_attributes.call(null,style);
} else
{if((style == null))
{return cljs.core.PersistentArrayMap.EMPTY;
} else
{if(cljs.core.truth_(style.cssText))
{return domina.parse_style_attributes.call(null,style.cssText);
} else
{return cljs.core.PersistentArrayMap.EMPTY;

}
}
}
});
/**
* Returns a map of the HTML attributes/values. Assumes content will be a single node. Attribute names are returned as keywords.
*/
domina.attrs = (function attrs(content){var node = domina.single_node.call(null,content);var attrs__$1 = node.attributes;return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,((function (node,attrs__$1){
return (function (p1__160776_SHARP_){var attr = attrs__$1.item(p1__160776_SHARP_);var value = attr.nodeValue;if((cljs.core.not_EQ_.call(null,null,value)) && (cljs.core.not_EQ_.call(null,"",value)))
{return new cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,attr.nodeName.toLowerCase()),attr.nodeValue], true, false);
} else
{return null;
}
});})(node,attrs__$1))
,cljs.core.range.call(null,attrs__$1.length))));
});
/**
* Sets the specified CSS styles for each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_styles_BANG_ = (function set_styles_BANG_(content,styles){var seq__160783_160789 = cljs.core.seq.call(null,styles);var chunk__160784_160790 = null;var count__160785_160791 = (0);var i__160786_160792 = (0);while(true){
if((i__160786_160792 < count__160785_160791))
{var vec__160787_160793 = cljs.core._nth.call(null,chunk__160784_160790,i__160786_160792);var name_160794 = cljs.core.nth.call(null,vec__160787_160793,(0),null);var value_160795 = cljs.core.nth.call(null,vec__160787_160793,(1),null);domina.set_style_BANG_.call(null,content,name_160794,value_160795);
{
var G__160796 = seq__160783_160789;
var G__160797 = chunk__160784_160790;
var G__160798 = count__160785_160791;
var G__160799 = (i__160786_160792 + (1));
seq__160783_160789 = G__160796;
chunk__160784_160790 = G__160797;
count__160785_160791 = G__160798;
i__160786_160792 = G__160799;
continue;
}
} else
{var temp__4126__auto___160800 = cljs.core.seq.call(null,seq__160783_160789);if(temp__4126__auto___160800)
{var seq__160783_160801__$1 = temp__4126__auto___160800;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160783_160801__$1))
{var c__4404__auto___160802 = cljs.core.chunk_first.call(null,seq__160783_160801__$1);{
var G__160803 = cljs.core.chunk_rest.call(null,seq__160783_160801__$1);
var G__160804 = c__4404__auto___160802;
var G__160805 = cljs.core.count.call(null,c__4404__auto___160802);
var G__160806 = (0);
seq__160783_160789 = G__160803;
chunk__160784_160790 = G__160804;
count__160785_160791 = G__160805;
i__160786_160792 = G__160806;
continue;
}
} else
{var vec__160788_160807 = cljs.core.first.call(null,seq__160783_160801__$1);var name_160808 = cljs.core.nth.call(null,vec__160788_160807,(0),null);var value_160809 = cljs.core.nth.call(null,vec__160788_160807,(1),null);domina.set_style_BANG_.call(null,content,name_160808,value_160809);
{
var G__160810 = cljs.core.next.call(null,seq__160783_160801__$1);
var G__160811 = null;
var G__160812 = (0);
var G__160813 = (0);
seq__160783_160789 = G__160810;
chunk__160784_160790 = G__160811;
count__160785_160791 = G__160812;
i__160786_160792 = G__160813;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Sets the specified attributes for each node in the content, given a map of names and values. Names may be a string or keyword. Values will be cast to a string, multiple values wil be concatenated.
*/
domina.set_attrs_BANG_ = (function set_attrs_BANG_(content,attrs){var seq__160820_160826 = cljs.core.seq.call(null,attrs);var chunk__160821_160827 = null;var count__160822_160828 = (0);var i__160823_160829 = (0);while(true){
if((i__160823_160829 < count__160822_160828))
{var vec__160824_160830 = cljs.core._nth.call(null,chunk__160821_160827,i__160823_160829);var name_160831 = cljs.core.nth.call(null,vec__160824_160830,(0),null);var value_160832 = cljs.core.nth.call(null,vec__160824_160830,(1),null);domina.set_attr_BANG_.call(null,content,name_160831,value_160832);
{
var G__160833 = seq__160820_160826;
var G__160834 = chunk__160821_160827;
var G__160835 = count__160822_160828;
var G__160836 = (i__160823_160829 + (1));
seq__160820_160826 = G__160833;
chunk__160821_160827 = G__160834;
count__160822_160828 = G__160835;
i__160823_160829 = G__160836;
continue;
}
} else
{var temp__4126__auto___160837 = cljs.core.seq.call(null,seq__160820_160826);if(temp__4126__auto___160837)
{var seq__160820_160838__$1 = temp__4126__auto___160837;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160820_160838__$1))
{var c__4404__auto___160839 = cljs.core.chunk_first.call(null,seq__160820_160838__$1);{
var G__160840 = cljs.core.chunk_rest.call(null,seq__160820_160838__$1);
var G__160841 = c__4404__auto___160839;
var G__160842 = cljs.core.count.call(null,c__4404__auto___160839);
var G__160843 = (0);
seq__160820_160826 = G__160840;
chunk__160821_160827 = G__160841;
count__160822_160828 = G__160842;
i__160823_160829 = G__160843;
continue;
}
} else
{var vec__160825_160844 = cljs.core.first.call(null,seq__160820_160838__$1);var name_160845 = cljs.core.nth.call(null,vec__160825_160844,(0),null);var value_160846 = cljs.core.nth.call(null,vec__160825_160844,(1),null);domina.set_attr_BANG_.call(null,content,name_160845,value_160846);
{
var G__160847 = cljs.core.next.call(null,seq__160820_160838__$1);
var G__160848 = null;
var G__160849 = (0);
var G__160850 = (0);
seq__160820_160826 = G__160847;
chunk__160821_160827 = G__160848;
count__160822_160828 = G__160849;
i__160823_160829 = G__160850;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns true if the node has the specified CSS class. Assumes content is a single node.
*/
domina.has_class_QMARK_ = (function has_class_QMARK_(content,class$){return goog.dom.classes.has(domina.single_node.call(null,content),class$);
});
/**
* Adds the specified CSS class to each node in the content.
*/
domina.add_class_BANG_ = (function add_class_BANG_(content,class$){var seq__160855_160859 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__160856_160860 = null;var count__160857_160861 = (0);var i__160858_160862 = (0);while(true){
if((i__160858_160862 < count__160857_160861))
{var node_160863 = cljs.core._nth.call(null,chunk__160856_160860,i__160858_160862);goog.dom.classes.add(node_160863,class$);
{
var G__160864 = seq__160855_160859;
var G__160865 = chunk__160856_160860;
var G__160866 = count__160857_160861;
var G__160867 = (i__160858_160862 + (1));
seq__160855_160859 = G__160864;
chunk__160856_160860 = G__160865;
count__160857_160861 = G__160866;
i__160858_160862 = G__160867;
continue;
}
} else
{var temp__4126__auto___160868 = cljs.core.seq.call(null,seq__160855_160859);if(temp__4126__auto___160868)
{var seq__160855_160869__$1 = temp__4126__auto___160868;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160855_160869__$1))
{var c__4404__auto___160870 = cljs.core.chunk_first.call(null,seq__160855_160869__$1);{
var G__160871 = cljs.core.chunk_rest.call(null,seq__160855_160869__$1);
var G__160872 = c__4404__auto___160870;
var G__160873 = cljs.core.count.call(null,c__4404__auto___160870);
var G__160874 = (0);
seq__160855_160859 = G__160871;
chunk__160856_160860 = G__160872;
count__160857_160861 = G__160873;
i__160858_160862 = G__160874;
continue;
}
} else
{var node_160875 = cljs.core.first.call(null,seq__160855_160869__$1);goog.dom.classes.add(node_160875,class$);
{
var G__160876 = cljs.core.next.call(null,seq__160855_160869__$1);
var G__160877 = null;
var G__160878 = (0);
var G__160879 = (0);
seq__160855_160859 = G__160876;
chunk__160856_160860 = G__160877;
count__160857_160861 = G__160878;
i__160858_160862 = G__160879;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Removes the specified CSS class from each node in the content.
*/
domina.remove_class_BANG_ = (function remove_class_BANG_(content,class$){var seq__160884_160888 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__160885_160889 = null;var count__160886_160890 = (0);var i__160887_160891 = (0);while(true){
if((i__160887_160891 < count__160886_160890))
{var node_160892 = cljs.core._nth.call(null,chunk__160885_160889,i__160887_160891);goog.dom.classes.remove(node_160892,class$);
{
var G__160893 = seq__160884_160888;
var G__160894 = chunk__160885_160889;
var G__160895 = count__160886_160890;
var G__160896 = (i__160887_160891 + (1));
seq__160884_160888 = G__160893;
chunk__160885_160889 = G__160894;
count__160886_160890 = G__160895;
i__160887_160891 = G__160896;
continue;
}
} else
{var temp__4126__auto___160897 = cljs.core.seq.call(null,seq__160884_160888);if(temp__4126__auto___160897)
{var seq__160884_160898__$1 = temp__4126__auto___160897;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160884_160898__$1))
{var c__4404__auto___160899 = cljs.core.chunk_first.call(null,seq__160884_160898__$1);{
var G__160900 = cljs.core.chunk_rest.call(null,seq__160884_160898__$1);
var G__160901 = c__4404__auto___160899;
var G__160902 = cljs.core.count.call(null,c__4404__auto___160899);
var G__160903 = (0);
seq__160884_160888 = G__160900;
chunk__160885_160889 = G__160901;
count__160886_160890 = G__160902;
i__160887_160891 = G__160903;
continue;
}
} else
{var node_160904 = cljs.core.first.call(null,seq__160884_160898__$1);goog.dom.classes.remove(node_160904,class$);
{
var G__160905 = cljs.core.next.call(null,seq__160884_160898__$1);
var G__160906 = null;
var G__160907 = (0);
var G__160908 = (0);
seq__160884_160888 = G__160905;
chunk__160885_160889 = G__160906;
count__160886_160890 = G__160907;
i__160887_160891 = G__160908;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Toggles the specified CSS class from each node in the content.
*/
domina.toggle_class_BANG_ = (function toggle_class_BANG_(content,class$){var seq__160913_160917 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__160914_160918 = null;var count__160915_160919 = (0);var i__160916_160920 = (0);while(true){
if((i__160916_160920 < count__160915_160919))
{var node_160921 = cljs.core._nth.call(null,chunk__160914_160918,i__160916_160920);goog.dom.classes.toggle(node_160921,class$);
{
var G__160922 = seq__160913_160917;
var G__160923 = chunk__160914_160918;
var G__160924 = count__160915_160919;
var G__160925 = (i__160916_160920 + (1));
seq__160913_160917 = G__160922;
chunk__160914_160918 = G__160923;
count__160915_160919 = G__160924;
i__160916_160920 = G__160925;
continue;
}
} else
{var temp__4126__auto___160926 = cljs.core.seq.call(null,seq__160913_160917);if(temp__4126__auto___160926)
{var seq__160913_160927__$1 = temp__4126__auto___160926;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160913_160927__$1))
{var c__4404__auto___160928 = cljs.core.chunk_first.call(null,seq__160913_160927__$1);{
var G__160929 = cljs.core.chunk_rest.call(null,seq__160913_160927__$1);
var G__160930 = c__4404__auto___160928;
var G__160931 = cljs.core.count.call(null,c__4404__auto___160928);
var G__160932 = (0);
seq__160913_160917 = G__160929;
chunk__160914_160918 = G__160930;
count__160915_160919 = G__160931;
i__160916_160920 = G__160932;
continue;
}
} else
{var node_160933 = cljs.core.first.call(null,seq__160913_160927__$1);goog.dom.classes.toggle(node_160933,class$);
{
var G__160934 = cljs.core.next.call(null,seq__160913_160927__$1);
var G__160935 = null;
var G__160936 = (0);
var G__160937 = (0);
seq__160913_160917 = G__160934;
chunk__160914_160918 = G__160935;
count__160915_160919 = G__160936;
i__160916_160920 = G__160937;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns a seq of all the CSS classes currently applied to a node. Assumes content is a single node.
*/
domina.classes = (function classes(content){return cljs.core.seq.call(null,goog.dom.classes.get(domina.single_node.call(null,content)));
});
/**
* Sets the class attribute of the content nodes to classes, which can
* be either a class attribute string or a seq of classname strings.
*/
domina.set_classes_BANG_ = (function set_classes_BANG_(content,classes){var classes_160946__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);var seq__160942_160947 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__160943_160948 = null;var count__160944_160949 = (0);var i__160945_160950 = (0);while(true){
if((i__160945_160950 < count__160944_160949))
{var node_160951 = cljs.core._nth.call(null,chunk__160943_160948,i__160945_160950);goog.dom.classes.set(node_160951,classes_160946__$1);
{
var G__160952 = seq__160942_160947;
var G__160953 = chunk__160943_160948;
var G__160954 = count__160944_160949;
var G__160955 = (i__160945_160950 + (1));
seq__160942_160947 = G__160952;
chunk__160943_160948 = G__160953;
count__160944_160949 = G__160954;
i__160945_160950 = G__160955;
continue;
}
} else
{var temp__4126__auto___160956 = cljs.core.seq.call(null,seq__160942_160947);if(temp__4126__auto___160956)
{var seq__160942_160957__$1 = temp__4126__auto___160956;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160942_160957__$1))
{var c__4404__auto___160958 = cljs.core.chunk_first.call(null,seq__160942_160957__$1);{
var G__160959 = cljs.core.chunk_rest.call(null,seq__160942_160957__$1);
var G__160960 = c__4404__auto___160958;
var G__160961 = cljs.core.count.call(null,c__4404__auto___160958);
var G__160962 = (0);
seq__160942_160947 = G__160959;
chunk__160943_160948 = G__160960;
count__160944_160949 = G__160961;
i__160945_160950 = G__160962;
continue;
}
} else
{var node_160963 = cljs.core.first.call(null,seq__160942_160957__$1);goog.dom.classes.set(node_160963,classes_160946__$1);
{
var G__160964 = cljs.core.next.call(null,seq__160942_160957__$1);
var G__160965 = null;
var G__160966 = (0);
var G__160967 = (0);
seq__160942_160947 = G__160964;
chunk__160943_160948 = G__160965;
count__160944_160949 = G__160966;
i__160945_160950 = G__160967;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the text of a node. Assumes content is a single node. For consistency across browsers, will always trim whitespace of the beginning and end of the returned text.
*/
domina.text = (function text(content){return goog.string.trim(goog.dom.getTextContent(domina.single_node.call(null,content)));
});
/**
* Sets the text value of all the nodes in the given content.
*/
domina.set_text_BANG_ = (function set_text_BANG_(content,value){var seq__160972_160976 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__160973_160977 = null;var count__160974_160978 = (0);var i__160975_160979 = (0);while(true){
if((i__160975_160979 < count__160974_160978))
{var node_160980 = cljs.core._nth.call(null,chunk__160973_160977,i__160975_160979);goog.dom.setTextContent(node_160980,value);
{
var G__160981 = seq__160972_160976;
var G__160982 = chunk__160973_160977;
var G__160983 = count__160974_160978;
var G__160984 = (i__160975_160979 + (1));
seq__160972_160976 = G__160981;
chunk__160973_160977 = G__160982;
count__160974_160978 = G__160983;
i__160975_160979 = G__160984;
continue;
}
} else
{var temp__4126__auto___160985 = cljs.core.seq.call(null,seq__160972_160976);if(temp__4126__auto___160985)
{var seq__160972_160986__$1 = temp__4126__auto___160985;if(cljs.core.chunked_seq_QMARK_.call(null,seq__160972_160986__$1))
{var c__4404__auto___160987 = cljs.core.chunk_first.call(null,seq__160972_160986__$1);{
var G__160988 = cljs.core.chunk_rest.call(null,seq__160972_160986__$1);
var G__160989 = c__4404__auto___160987;
var G__160990 = cljs.core.count.call(null,c__4404__auto___160987);
var G__160991 = (0);
seq__160972_160976 = G__160988;
chunk__160973_160977 = G__160989;
count__160974_160978 = G__160990;
i__160975_160979 = G__160991;
continue;
}
} else
{var node_160992 = cljs.core.first.call(null,seq__160972_160986__$1);goog.dom.setTextContent(node_160992,value);
{
var G__160993 = cljs.core.next.call(null,seq__160972_160986__$1);
var G__160994 = null;
var G__160995 = (0);
var G__160996 = (0);
seq__160972_160976 = G__160993;
chunk__160973_160977 = G__160994;
count__160974_160978 = G__160995;
i__160975_160979 = G__160996;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the value of a node (presumably a form field). Assumes content is a single node.
*/
domina.value = (function value(content){return goog.dom.forms.getValue(domina.single_node.call(null,content));
});
/**
* Sets the value of all the nodes (presumably form fields) in the given content.
*/
domina.set_value_BANG_ = (function set_value_BANG_(content,value){var seq__161001_161005 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__161002_161006 = null;var count__161003_161007 = (0);var i__161004_161008 = (0);while(true){
if((i__161004_161008 < count__161003_161007))
{var node_161009 = cljs.core._nth.call(null,chunk__161002_161006,i__161004_161008);goog.dom.forms.setValue(node_161009,value);
{
var G__161010 = seq__161001_161005;
var G__161011 = chunk__161002_161006;
var G__161012 = count__161003_161007;
var G__161013 = (i__161004_161008 + (1));
seq__161001_161005 = G__161010;
chunk__161002_161006 = G__161011;
count__161003_161007 = G__161012;
i__161004_161008 = G__161013;
continue;
}
} else
{var temp__4126__auto___161014 = cljs.core.seq.call(null,seq__161001_161005);if(temp__4126__auto___161014)
{var seq__161001_161015__$1 = temp__4126__auto___161014;if(cljs.core.chunked_seq_QMARK_.call(null,seq__161001_161015__$1))
{var c__4404__auto___161016 = cljs.core.chunk_first.call(null,seq__161001_161015__$1);{
var G__161017 = cljs.core.chunk_rest.call(null,seq__161001_161015__$1);
var G__161018 = c__4404__auto___161016;
var G__161019 = cljs.core.count.call(null,c__4404__auto___161016);
var G__161020 = (0);
seq__161001_161005 = G__161017;
chunk__161002_161006 = G__161018;
count__161003_161007 = G__161019;
i__161004_161008 = G__161020;
continue;
}
} else
{var node_161021 = cljs.core.first.call(null,seq__161001_161015__$1);goog.dom.forms.setValue(node_161021,value);
{
var G__161022 = cljs.core.next.call(null,seq__161001_161015__$1);
var G__161023 = null;
var G__161024 = (0);
var G__161025 = (0);
seq__161001_161005 = G__161022;
chunk__161002_161006 = G__161023;
count__161003_161007 = G__161024;
i__161004_161008 = G__161025;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the innerHTML of a node. Assumes content is a single node.
*/
domina.html = (function html(content){return domina.single_node.call(null,content).innerHTML;
});
domina.replace_children_BANG_ = (function replace_children_BANG_(content,inner_content){return domina.append_BANG_.call(null,domina.destroy_children_BANG_.call(null,content),inner_content);
});
domina.set_inner_html_BANG_ = (function set_inner_html_BANG_(content,html_string){var allows_inner_html_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_no_inner_html,html_string));var leading_whitespace_QMARK_ = cljs.core.re_find.call(null,domina.re_leading_whitespace,html_string);var tag_name = (''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html_string)))).toLowerCase();var special_tag_QMARK_ = cljs.core.contains_QMARK_.call(null,domina.wrap_map,tag_name);if(cljs.core.truth_((function (){var and__3636__auto__ = allows_inner_html_QMARK_;if(and__3636__auto__)
{var and__3636__auto____$1 = (function (){var or__3648__auto__ = domina.support.leading_whitespace_QMARK_;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return cljs.core.not.call(null,leading_whitespace_QMARK_);
}
})();if(cljs.core.truth_(and__3636__auto____$1))
{return !(special_tag_QMARK_);
} else
{return and__3636__auto____$1;
}
} else
{return and__3636__auto__;
}
})()))
{var value_161036 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");try{var seq__161032_161037 = cljs.core.seq.call(null,domina.nodes.call(null,content));var chunk__161033_161038 = null;var count__161034_161039 = (0);var i__161035_161040 = (0);while(true){
if((i__161035_161040 < count__161034_161039))
{var node_161041 = cljs.core._nth.call(null,chunk__161033_161038,i__161035_161040);node_161041.innerHTML = value_161036;
{
var G__161042 = seq__161032_161037;
var G__161043 = chunk__161033_161038;
var G__161044 = count__161034_161039;
var G__161045 = (i__161035_161040 + (1));
seq__161032_161037 = G__161042;
chunk__161033_161038 = G__161043;
count__161034_161039 = G__161044;
i__161035_161040 = G__161045;
continue;
}
} else
{var temp__4126__auto___161046 = cljs.core.seq.call(null,seq__161032_161037);if(temp__4126__auto___161046)
{var seq__161032_161047__$1 = temp__4126__auto___161046;if(cljs.core.chunked_seq_QMARK_.call(null,seq__161032_161047__$1))
{var c__4404__auto___161048 = cljs.core.chunk_first.call(null,seq__161032_161047__$1);{
var G__161049 = cljs.core.chunk_rest.call(null,seq__161032_161047__$1);
var G__161050 = c__4404__auto___161048;
var G__161051 = cljs.core.count.call(null,c__4404__auto___161048);
var G__161052 = (0);
seq__161032_161037 = G__161049;
chunk__161033_161038 = G__161050;
count__161034_161039 = G__161051;
i__161035_161040 = G__161052;
continue;
}
} else
{var node_161053 = cljs.core.first.call(null,seq__161032_161047__$1);node_161053.innerHTML = value_161036;
{
var G__161054 = cljs.core.next.call(null,seq__161032_161047__$1);
var G__161055 = null;
var G__161056 = (0);
var G__161057 = (0);
seq__161032_161037 = G__161054;
chunk__161033_161038 = G__161055;
count__161034_161039 = G__161056;
i__161035_161040 = G__161057;
continue;
}
}
} else
{}
}
break;
}
}catch (e161031){if((e161031 instanceof Error))
{var e_161058 = e161031;domina.replace_children_BANG_.call(null,content,value_161036);
} else
{throw e161031;

}
}} else
{domina.replace_children_BANG_.call(null,content,html_string);
}
return content;
});
/**
* Sets the innerHTML value for all the nodes in the given content.
*/
domina.set_html_BANG_ = (function set_html_BANG_(content,inner_content){if(typeof inner_content === 'string')
{return domina.set_inner_html_BANG_.call(null,content,inner_content);
} else
{return domina.replace_children_BANG_.call(null,content,inner_content);
}
});
/**
* Returns data associated with a node for a given key. Assumes
* content is a single node. If the bubble parameter is set to true,
* will search parent nodes if the key is not found.
*/
domina.get_data = (function() {
var get_data = null;
var get_data__2 = (function (node,key){return get_data.call(null,node,key,false);
});
var get_data__3 = (function (node,key,bubble){var m = domina.single_node.call(null,node).__domina_data;var value = (cljs.core.truth_(m)?cljs.core.get.call(null,m,key):null);if(cljs.core.truth_((function (){var and__3636__auto__ = bubble;if(cljs.core.truth_(and__3636__auto__))
{return (value == null);
} else
{return and__3636__auto__;
}
})()))
{var temp__4126__auto__ = domina.single_node.call(null,node).parentNode;if(cljs.core.truth_(temp__4126__auto__))
{var parent = temp__4126__auto__;return get_data.call(null,parent,key,true);
} else
{return null;
}
} else
{return value;
}
});
get_data = function(node,key,bubble){
switch(arguments.length){
case 2:
return get_data__2.call(this,node,key);
case 3:
return get_data__3.call(this,node,key,bubble);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_data.cljs$core$IFn$_invoke$arity$2 = get_data__2;
get_data.cljs$core$IFn$_invoke$arity$3 = get_data__3;
return get_data;
})()
;
/**
* Sets a data on the node for a given key. Assumes content is a
* single node. Data should be ClojureScript values and data structures
* only; using other objects as data may result in memory leaks on some
* browsers.
*/
domina.set_data_BANG_ = (function set_data_BANG_(node,key,value){var m = (function (){var or__3648__auto__ = domina.single_node.call(null,node).__domina_data;if(cljs.core.truth_(or__3648__auto__))
{return or__3648__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})();return domina.single_node.call(null,node).__domina_data = cljs.core.assoc.call(null,m,key,value);
});
/**
* Takes a two-arg function, a reference DomContent and new
* DomContent. Applies the function for each reference / content
* combination. Uses clones of the new content for each additional
* parent after the first.
*/
domina.apply_with_cloning = (function apply_with_cloning(f,parent_content,child_content){var parents = domina.nodes.call(null,parent_content);var children = domina.nodes.call(null,child_content);var first_child = (function (){var frag = document.createDocumentFragment();var seq__161065_161069 = cljs.core.seq.call(null,children);var chunk__161066_161070 = null;var count__161067_161071 = (0);var i__161068_161072 = (0);while(true){
if((i__161068_161072 < count__161067_161071))
{var child_161073 = cljs.core._nth.call(null,chunk__161066_161070,i__161068_161072);frag.appendChild(child_161073);
{
var G__161074 = seq__161065_161069;
var G__161075 = chunk__161066_161070;
var G__161076 = count__161067_161071;
var G__161077 = (i__161068_161072 + (1));
seq__161065_161069 = G__161074;
chunk__161066_161070 = G__161075;
count__161067_161071 = G__161076;
i__161068_161072 = G__161077;
continue;
}
} else
{var temp__4126__auto___161078 = cljs.core.seq.call(null,seq__161065_161069);if(temp__4126__auto___161078)
{var seq__161065_161079__$1 = temp__4126__auto___161078;if(cljs.core.chunked_seq_QMARK_.call(null,seq__161065_161079__$1))
{var c__4404__auto___161080 = cljs.core.chunk_first.call(null,seq__161065_161079__$1);{
var G__161081 = cljs.core.chunk_rest.call(null,seq__161065_161079__$1);
var G__161082 = c__4404__auto___161080;
var G__161083 = cljs.core.count.call(null,c__4404__auto___161080);
var G__161084 = (0);
seq__161065_161069 = G__161081;
chunk__161066_161070 = G__161082;
count__161067_161071 = G__161083;
i__161068_161072 = G__161084;
continue;
}
} else
{var child_161085 = cljs.core.first.call(null,seq__161065_161079__$1);frag.appendChild(child_161085);
{
var G__161086 = cljs.core.next.call(null,seq__161065_161079__$1);
var G__161087 = null;
var G__161088 = (0);
var G__161089 = (0);
seq__161065_161069 = G__161086;
chunk__161066_161070 = G__161087;
count__161067_161071 = G__161088;
i__161068_161072 = G__161089;
continue;
}
}
} else
{}
}
break;
}
return frag;
})();var other_children = cljs.core.doall.call(null,cljs.core.repeatedly.call(null,(cljs.core.count.call(null,parents) - (1)),((function (parents,children,first_child){
return (function (){return first_child.cloneNode(true);
});})(parents,children,first_child))
));if(cljs.core.seq.call(null,parents))
{f.call(null,cljs.core.first.call(null,parents),first_child);
return cljs.core.doall.call(null,cljs.core.map.call(null,((function (parents,children,first_child,other_children){
return (function (p1__161059_SHARP_,p2__161060_SHARP_){return f.call(null,p1__161059_SHARP_,p2__161060_SHARP_);
});})(parents,children,first_child,other_children))
,cljs.core.rest.call(null,parents),other_children));
} else
{return null;
}
});
domina.lazy_nl_via_item = (function() {
var lazy_nl_via_item = null;
var lazy_nl_via_item__1 = (function (nl){return lazy_nl_via_item.call(null,nl,(0));
});
var lazy_nl_via_item__2 = (function (nl,n){if((n < nl.length))
{return (new cljs.core.LazySeq(null,(function (){return cljs.core.cons.call(null,nl.item(n),lazy_nl_via_item.call(null,nl,(n + (1))));
}),null,null));
} else
{return null;
}
});
lazy_nl_via_item = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_item__1.call(this,nl);
case 2:
return lazy_nl_via_item__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_item__1;
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_item__2;
return lazy_nl_via_item;
})()
;
domina.lazy_nl_via_array_ref = (function() {
var lazy_nl_via_array_ref = null;
var lazy_nl_via_array_ref__1 = (function (nl){return lazy_nl_via_array_ref.call(null,nl,(0));
});
var lazy_nl_via_array_ref__2 = (function (nl,n){if((n < nl.length))
{return (new cljs.core.LazySeq(null,(function (){return cljs.core.cons.call(null,(nl[n]),lazy_nl_via_array_ref.call(null,nl,(n + (1))));
}),null,null));
} else
{return null;
}
});
lazy_nl_via_array_ref = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_array_ref__1.call(this,nl);
case 2:
return lazy_nl_via_array_ref__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_array_ref__1;
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_array_ref__2;
return lazy_nl_via_array_ref;
})()
;
/**
* A lazy seq view of a js/NodeList, or other array-like javascript things
*/
domina.lazy_nodelist = (function lazy_nodelist(nl){if(cljs.core.truth_(nl.item))
{return domina.lazy_nl_via_item.call(null,nl);
} else
{return domina.lazy_nl_via_array_ref.call(null,nl);
}
});
domina.array_like_QMARK_ = (function array_like_QMARK_(obj){var and__3636__auto__ = obj;if(cljs.core.truth_(and__3636__auto__))
{var and__3636__auto____$1 = cljs.core.not.call(null,obj.nodeName);if(and__3636__auto____$1)
{return obj.length;
} else
{return and__3636__auto____$1;
}
} else
{return and__3636__auto__;
}
});
/**
* Some versions of IE have things that are like arrays in that they
* respond to .length, but are not arrays nor NodeSets. This returns a
* real sequence view of such objects. If passed an object that is not
* a logical sequence at all, returns a single-item seq containing the
* object.
*/
domina.normalize_seq = (function normalize_seq(list_thing){if((list_thing == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__161091 = list_thing;if(G__161091)
{var bit__4298__auto__ = (G__161091.cljs$lang$protocol_mask$partition0$ & (8388608));if((bit__4298__auto__) || (G__161091.cljs$core$ISeqable$))
{return true;
} else
{if((!G__161091.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__161091);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__161091);
}
})())
{return cljs.core.seq.call(null,list_thing);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,list_thing)))
{return domina.lazy_nodelist.call(null,list_thing);
} else
{return cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [list_thing], null));

}
}
}
});
(domina.DomContent["_"] = true);
(domina.nodes["_"] = (function (content){if((content == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__161092 = content;if(G__161092)
{var bit__4298__auto__ = (G__161092.cljs$lang$protocol_mask$partition0$ & (8388608));if((bit__4298__auto__) || (G__161092.cljs$core$ISeqable$))
{return true;
} else
{if((!G__161092.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__161092);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__161092);
}
})())
{return cljs.core.seq.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return domina.lazy_nodelist.call(null,content);
} else
{return cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [content], null));

}
}
}
}));
(domina.single_node["_"] = (function (content){if((content == null))
{return null;
} else
{if((function (){var G__161093 = content;if(G__161093)
{var bit__4298__auto__ = (G__161093.cljs$lang$protocol_mask$partition0$ & (8388608));if((bit__4298__auto__) || (G__161093.cljs$core$ISeqable$))
{return true;
} else
{if((!G__161093.cljs$lang$protocol_mask$partition0$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__161093);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.ISeqable,G__161093);
}
})())
{return cljs.core.first.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return content.item((0));
} else
{return content;

}
}
}
}));
(domina.DomContent["string"] = true);
(domina.nodes["string"] = (function (s){return cljs.core.doall.call(null,domina.nodes.call(null,domina.string_to_dom.call(null,s)));
}));
(domina.single_node["string"] = (function (s){return domina.single_node.call(null,domina.string_to_dom.call(null,s));
}));
if(cljs.core.truth_((typeof NodeList != 'undefined')))
{NodeList.prototype.cljs$core$ISeqable$ = true;
NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){var nodelist__$1 = this;return domina.lazy_nodelist.call(null,nodelist__$1);
});
NodeList.prototype.cljs$core$IIndexed$ = true;
NodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){var nodelist__$1 = this;return nodelist__$1.item(n);
});
NodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){var nodelist__$1 = this;if((nodelist__$1.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist__$1,n);
}
});
NodeList.prototype.cljs$core$ICounted$ = true;
NodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){var nodelist__$1 = this;return nodelist__$1.length;
});
} else
{}
if(cljs.core.truth_((typeof StaticNodeList != 'undefined')))
{StaticNodeList.prototype.cljs$core$ISeqable$ = true;
StaticNodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){var nodelist__$1 = this;return domina.lazy_nodelist.call(null,nodelist__$1);
});
StaticNodeList.prototype.cljs$core$IIndexed$ = true;
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){var nodelist__$1 = this;return nodelist__$1.item(n);
});
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){var nodelist__$1 = this;if((nodelist__$1.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist__$1,n);
}
});
StaticNodeList.prototype.cljs$core$ICounted$ = true;
StaticNodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){var nodelist__$1 = this;return nodelist__$1.length;
});
} else
{}
if(cljs.core.truth_((typeof HTMLCollection != 'undefined')))
{HTMLCollection.prototype.cljs$core$ISeqable$ = true;
HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){var coll__$1 = this;return domina.lazy_nodelist.call(null,coll__$1);
});
HTMLCollection.prototype.cljs$core$IIndexed$ = true;
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){var coll__$1 = this;return coll__$1.item(n);
});
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){var coll__$1 = this;if((coll__$1.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,coll__$1,n);
}
});
HTMLCollection.prototype.cljs$core$ICounted$ = true;
HTMLCollection.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){var coll__$1 = this;return coll__$1.length;
});
} else
{}

//# sourceMappingURL=domina.js.map