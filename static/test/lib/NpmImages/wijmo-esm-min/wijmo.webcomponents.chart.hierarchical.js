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

var __extends=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcChartHierarchical from"wijmo/wijmo.chart.hierarchical";var _wj_ns_exists_5=!0,WjcSunburst=function(t){function e(){var e=t.call(this,document.createElement("div"))||this;return e._wjBehaviour=WjComponentBehavior._attach(e),e}return __extends(e,t),Object.defineProperty(e,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0}),e.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()},e.prototype.attributeChangedCallback=function(t,e,n){this._wjBehaviour.lhAttributeChanged(t,e,n)},e.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()},e.prototype.addEventListener=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):t.prototype.addEventListener.apply(this,e)},e}(wjcChartHierarchical.Sunburst);export{WjcSunburst};_wj_ns_exists_5&&WjComponentBehavior.register("wjc-sunburst",WjcSunburst);var WjcTreeMap=function(t){function e(){var e=t.call(this,document.createElement("div"))||this;return e._wjBehaviour=WjComponentBehavior._attach(e),e}return __extends(e,t),Object.defineProperty(e,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0}),e.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()},e.prototype.attributeChangedCallback=function(t,e,n){this._wjBehaviour.lhAttributeChanged(t,e,n)},e.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()},e.prototype.addEventListener=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):t.prototype.addEventListener.apply(this,e)},e}(wjcChartHierarchical.TreeMap);export{WjcTreeMap};_wj_ns_exists_5&&WjComponentBehavior.register("wjc-tree-map",WjcTreeMap);