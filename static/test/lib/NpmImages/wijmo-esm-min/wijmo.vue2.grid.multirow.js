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

var __extends=this&&this.__extends||function(){var o=function(t,r){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var r in t)t.hasOwnProperty(r)&&(o[r]=t[r])})(t,r)};return function(t,r){function e(){this.constructor=t}o(t,r),t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGridMultirow from"wijmo/wijmo.grid.multirow";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjMultiRowBehavior=function(o){function t(){return null!==o&&o.apply(this,arguments)||this}return __extends(t,o),t.tag="wj-multi-row",t.className="wijmo.grid.multirow.MultiRow",t.classCtor=function(){return wjcGridMultirow.MultiRow},t}(WjComponentBehavior);export var WjMultiRow=WjMultiRowBehavior.register();