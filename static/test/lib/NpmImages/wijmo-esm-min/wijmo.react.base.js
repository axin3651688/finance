﻿/*!
    *
    * Wijmo Library 5.20191.603
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */

var __extends=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}();import{Control,Event,isArray,addClass,setCss,isFunction,isPrimitive,isObject,DateTime}from"wijmo/wijmo";import*as ReactDOM from"react-dom";import*as React from"react";var ComponentBase=function(t){function e(e,n,i){var r=t.call(this,e)||this;r._objPropHash={},r._isMounted=!1,r._mountedCBs=[],r.props=e,r.controlType=n;for(var o=0,s=i&&i.objectProps||[];o<s.length;o++){var p=s[o];r._objPropHash[p]=!0}return r}return __extends(e,t),e.prototype.render=function(){var t={};t[e._propsParent]=this;var n=React.Children.map(this.props.children,function(e){return React.cloneElement(e,t)});return React.createElement("div",this._isChild()?{style:{display:"none"}}:null,n)},e.prototype.componentDidMount=function(){var t=this;if(this._isChild()){var n=this.props[e._propsParent];n&&n._mountedCB(function(){t._setParent(n)})}else this._prepareControl();return this.control},e.prototype.componentWillUnmount=function(){this._siblingInsertedEH&&this._getElement().removeEventListener("DOMNodeInserted",this._siblingInsertedEH);var t=this.control;if(t)if(this._isChild()){var e=this._getParentProp();if(e){var n=this.parent.control[e];if(isArray(n)){var i=n.indexOf(t);i>-1&&n.splice(i,1)}}}else t instanceof Control&&t.dispose()},e.prototype.shouldComponentUpdate=function(t){var e=this.control;return this._copy(e,t),!0},e.prototype._mountedCB=function(t){this._isMounted?t():this._mountedCBs.push(t)},e.prototype._createControl=function(){var t=this._isChild()?this._isParentInCtor()?this.parent.control:void 0:this._getElement();return new this.controlType(t)},e.prototype._prepareControl=function(){var t=this.control=this._createControl(),n=this._getElement(),i=this.props,r=t instanceof Control,o=e;this._siblingId||(null==this.constructor[o._typeSiblingIdProp]&&(this.constructor[o._typeSiblingIdProp]=++o._siblingDirId+""),this._siblingId=this.constructor[o._typeSiblingIdProp]),n.setAttribute(o._typeSiblingIdProp,this._siblingId);var s={};for(var p in i)if(!this._ignoreProp(p))if(p in t)s[p]=i[p];else switch(p){case"className":addClass(n,i.className);break;case"style":setCss(n,i.style);break;default:null!=n[p]&&(n[p]=i[p])}r?t.initialize(s):this._copy(t,s,!0),this._isMounted=!0;var a=this._mountedCBs;this._mountedCBs=[];for(var l=0,h=a;l<h.length;l++){(0,h[l])()}isFunction(i.initialized)&&i.initialized(t)},e.prototype._initParent=function(){var t=this._getParentProp();if(t){var e=this.parent.control,n=e[t];if(isArray(n)){var i=this._getSiblingIndex();(i<0||i>=n.length)&&(i=n.length),n.splice(i,0,this.control),this._siblingInsertedEH=this._siblingInserted.bind(this),this._getElement().addEventListener("DOMNodeInserted",this._siblingInsertedEH)}else e[t]=this.control}},e.prototype._setParent=function(t){if(t!==this.parent){if(this.parent)throw"Wijmo child component is already attached to a different parent.";this.parent=t,this._prepareControl(),this._initParent()}},e.prototype._isChild=function(){return null!=this._parentProp||null!=this._parentInCtor},e.prototype._isParentInCtor=function(){return!0===this._parentInCtor},e.prototype._getParentProp=function(){return this.props.wjProperty||this._parentProp},e.prototype._getSiblingIndex=function(){var t=this._getElement(),n=t.parentElement;if(!n)return-1;for(var i=n.childNodes,r=-1,o=this._siblingId,s=0;s<i.length;s++){var p=i[s];if(1==p.nodeType&&p.getAttribute(e._typeSiblingIdProp)==o&&(++r,p===t))return r}return-1},e.prototype._siblingInserted=function(t){if(t.target===this._getElement()){var e=this._getSiblingIndex(),n=this.control,i=this.parent.control[this._getParentProp()],r=i.indexOf(n);e>=0&&r>=0&&e!==r&&(i.splice(r,1),e=Math.min(e,i.length),i.splice(e,0,n))}},e.prototype._copy=function(t,e,n){if(void 0===n&&(n=!1),t&&e){var i,r=t===this.control;for(var o in e)if(!this._ignoreProp(o)||!r){var s=e[o];if(o in t){if(this._isEvent(t,o))n&&isFunction(s)&&t[o].addHandler(s);else if(!this._sameValue(t[o],s))if(null==s)t[o]=s;else if(isPrimitive(s)||isFunction(s)||this._objPropHash[o]&&t===(i||(i=this.control)))t[o]=s;else if(isArray(s)&&isArray(t[o])){var p=t[o],a=s;if(a.length==p.length)for(var l=0;l<a.length;l++)this._copy(p[l],a[l])}else isObject(s)&&this._copy(t[o],e[o])}else"className"==o?t.hostElement&&addClass(t.hostElement,e[o]):"style"==o&&t.hostElement&&setCss(t.hostElement,e[o])}}},e.prototype._sameValue=function(t,e){return t==e||DateTime.equals(t,e)},e.prototype._isEvent=function(t,e){var n=t&&t[e];return null!=n&&n instanceof Event},e.prototype._getElement=function(){return ReactDOM.findDOMNode(this)},e.prototype._ignoreProp=function(t){return"children"===t},e._propsParent="$parent",e._typeSiblingIdProp="_wjSiblingIdProp",e._siblingDirId=0,e}(React.Component);export{ComponentBase};