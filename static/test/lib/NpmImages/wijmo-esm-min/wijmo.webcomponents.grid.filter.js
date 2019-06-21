/*!
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

var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcGridFilter from"wijmo/wijmo.grid.filter";var _wj_ns_exists_10=!0,WjcFlexGridFilter=function(t){function e(){var e=t.call(this)||this;return e._wjBehaviour=WjComponentBehavior._attach(e),e}return __extends(e,t),Object.defineProperty(e,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0}),e.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()},e.prototype.attributeChangedCallback=function(t,e,r){this._wjBehaviour.lhAttributeChanged(t,e,r)},e.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()},e.wrappedClass=function(){return wjcGridFilter.FlexGridFilter},e.parentInCtor=!0,e}(HTMLElement);export{WjcFlexGridFilter};_wj_ns_exists_10&&(WjComponentBehavior.register("wjc-flex-grid-filter",WjcFlexGridFilter),WjComponentBehavior.register("",wjcGridFilter.ColumnFilterEditor),WjComponentBehavior.register("",wjcGridFilter.ConditionFilterEditor),WjComponentBehavior.register("",wjcGridFilter.ValueFilterEditor));