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

var __extends=this&&this.__extends||function(){var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(e,t)};return function(e,t){function o(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGridFilter from"wijmo/wijmo.grid.filter";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjFlexGridFilterBehavior=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),e.tag="wj-flex-grid-filter",e.className="wijmo.grid.filter.FlexGridFilter",e.parentInCtor=!0,e.classCtor=function(){return wjcGridFilter.FlexGridFilter},e}(WjComponentBehavior);export var WjFlexGridFilter=WjFlexGridFilterBehavior.register();