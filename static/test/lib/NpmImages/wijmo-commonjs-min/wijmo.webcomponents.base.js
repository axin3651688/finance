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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_1=require("wijmo/wijmo"),wijmo_meta_1=require("wijmo/wijmo.meta");!function(){var t=document.createElement("style");t.innerHTML=".wj-web-component {\n            display: inline-block;\n        }",document.head.insertBefore(t,document.head.firstElementChild)}();var WjComponentBehavior=function(){function t(t){this._isMounted=!1,this._mountedCBs=[],this._isDomInitialized=!1,this._initialValues=[],this.component=t,this.isWrapper||(this.control=t)}return t._attach=function(t){return new this(t)},t.register=function(t,e){if(null!=e){var n=!!t;if(this._registered.indexOf(e)<0)window.customElements.define(n?t:"wjc-dummy-"+ ++this._cmpRegId,e);else if(n)throw"Wijmo WebComponents error: component '"+t+"' is already registered.";if(e.wrappedClass){if(n)for(var o=function(t){var n=t.propertyName;t.isNativeControlProperty&&(n in HTMLElement.prototype&&console.log("WARNING: Wijmo WebComponent '"+e.name+"' exposes the '"+n+"' property which coinsides with the HTMLElement class member."),Object.defineProperty(e.prototype,n,{get:function(){return this.control[n]},set:function(t){this.control[n]=t},enumerable:!0,configurable:!0}))},i=0,r=this._getMetaData(e).props;i<r.length;i++){o(r[i])}}else for(var s=Object.getPrototypeOf(e.prototype).constructor;s.prototype!==HTMLElement.prototype&&this._registered.indexOf(s)<0;s=Object.getPrototypeOf(s.prototype).constructor){var a="wjc-dummy-"+ ++this._cmpRegId;this._registered.push(s),window.customElements.define(a,s)}}},t.getProps=function(t){return this._ensureMetadata(t),t._props},t.ensureNs=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var o=t.split("."),i=window,r=!0,s=0,a=o;s<a.length;s++){var p=a[s],l=i[p];l||(l=i[p]={},r=!1),i=l}if(e)for(var h=0,c=e;h<c.length;h++){var u=c[h];u&&!i[u]&&(i[u]=null,r=!1)}return r},Object.defineProperty(t.prototype,"isWrapper",{get:function(){return null!=this.component.constructor.wrappedClass},enumerable:!0,configurable:!0}),t.prototype.lhConnected=function(){this.parentComponent=this.component.parentElement,this._prepareControl(),this._isChild()&&this._initParent()},t.prototype.lhDisconnected=function(){var t=this.control;if(t)if(this._isChild()){var e=this._getParentProp();if(e){var n=this.parentComponent[e];if(wijmo_1.isArray(n)){var o=n.indexOf(t);o>-1&&n.splice(o,1)}}}else wijmo_1.Control;this.parentComponent=null},t.prototype.lhAttributeChanged=function(t,e,n){this._onAttributeChanged(t,e,n)},t.prototype._initParent=function(){this._callCmpMethod(t._beforeInitParent);var e=this._getParentProp();if(e){var n=this.parentComponent.control,o=n[e];if(wijmo_1.isArray(o)){var i=this._getSiblingIndex();(i<0||i>=o.length)&&(i=o.length),o.splice(i,0,this.control)}else n[e]=this.control}this._callCmpMethod(t._afterInitParent)},t.prototype._prepareControl=function(){if(!this._isDomInitialized){var e=this.component.constructor,n=this.component,o=this.control=e.wrappedClass?this._createControl():n;if(n.control=o,wijmo_1.addClass(n,"wj-web-component"),n instanceof wijmo_1.Control&&o.hostElement!==n){var i=o.hostElement;i.style.height="100%",i.style.width="100%"}this._isChild()&&(n.style.display="none"),this._initDom(),this._siblingId||(null==e.siblingId&&(e.siblingId=++t._siblingDirId+""),this._siblingId=e.siblingId),n.setAttribute(t._typeSiblingIdAttr,this._siblingId),this._flushInitialValues(),this._initEvents()}},t.prototype._initDom=function(){if(!this._isDomInitialized){this._isDomInitialized=!0;var t=this.control,e=this.component;t instanceof wijmo_1.Control&&t.hostElement!==e&&e.appendChild(t.hostElement)}},t.prototype._createControl=function(){var e=this._isChild()?this._isParentInCtor()?this.parentComponent.control:void 0:this._getElement();return new(t._getControlType(this.component.constructor))(e)},t.prototype._initEvents=function(){var e=this,n=t._getMetaData(this.component.constructor);if(n)for(var o=0,i=n.events;o<i.length;o++){!function(n){e.control[n.eventName].addHandler(function(o,i){e.component.dispatchEvent(new CustomEvent(t.toDash(n.eventName),{detail:i}))})}(i[o])}},t.prototype._onAttributeChanged=function(e,n,o){var i=this.control;if(n!=o)if(i){this._initialValues&&this._flushInitialValues();var r=t,s=r._getPropsMetaData(this.component.constructor),a=e,p=r.toCamelCase(e),l=s[a];null!=l&&(o=l.castValueToType(o)),i[p]!==o&&(i[p]=o)}else this._initialValues&&this._initialValues.push({name:e,oldValue:n,newValue:o})},t.prototype._flushInitialValues=function(){var t=this._initialValues;if(t){this._initialValues=null;for(var e=0,n=t;e<n.length;e++){var o=n[e];this._onAttributeChanged(o.name,o.oldValue,o.newValue)}}},t.prototype._isChild=function(){var t=this.component.constructor;return null!=t.parentProp||null!=t.parentInCtor},t.prototype._isParentInCtor=function(){return!0===this.component.constructor.parentInCtor},t.prototype._getParentProp=function(){return this.component.getAttribute("wj-property")||this.component.constructor.parentProp},t.prototype._getSiblingIndex=function(){var e=this._getElement(),n=e.parentElement;if(!n)return-1;for(var o=n.childNodes,i=-1,r=this._siblingId,s=0;s<o.length;s++){var a=o[s];if(1==a.nodeType&&a.getAttribute(t._typeSiblingIdAttr)==r&&(++i,a===e))return i}return-1},t.prototype._getElement=function(){return this.component},t._getControlType=function(t){return t.wrappedClass?t.wrappedClass():Object.getPrototypeOf(t.prototype).constructor},t._getMetaDataId=function(t){return this._getControlType(t)},t._getMetaData=function(t){return this._ensureMetadata(t),t._meta},t._getPropsMetaData=function(t){return this._ensureMetadata(t),t._propsMeta},t._ensureMetadata=function(e){if(!e._meta){var n=this._getMetaDataId(e);if(n){var o=e._meta=wijmo_meta_1.ControlMetaFactory.getMetaData(n);o.prepare();for(var i=e._propsMeta={},r=o.props,s=e._props=[],a=0,p=r;a<p.length;a++){var l=p[a];if(l.propertyType<=wijmo_meta_1.PropertyType.Enum){var h=t.toDash(l.propertyName);i[h]=l,s.push(h)}}}}},t.prototype._callCmpMethod=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var o=this.component,i=o[t];"function"==typeof i&&i.apply(o,e)},t.toCamelCase=function(t){return wijmo_meta_1.ControlMetaFactory.toCamelCase(t)},t.toDash=function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t[0].toLowerCase()})},t._typeSiblingIdAttr="_wjSiblingId",t._behClassProp="_wjBehCl",t._behProp="_wjBehaviour",t._beforeInitParent="_beforeInitParent",t._afterInitParent="_afterInitParent",t._siblingDirId=0,t._cmpRegId=0,t._registered=[],t}();exports.WjComponentBehavior=WjComponentBehavior;