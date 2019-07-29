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

var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGridSheet from"wijmo/wijmo.grid.sheet";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjFlexSheetBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-flex-sheet",t.className="wijmo.grid.sheet.FlexSheet",t.classCtor=function(){return wjcGridSheet.FlexSheet},t}(WjComponentBehavior);export var WjFlexSheet=WjFlexSheetBehavior.register();var WjSheetBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-sheet",t.className="wijmo.grid.sheet.Sheet",t.parentProp="sheets",t.parentInCtor=!0,t.classCtor=function(){return wjcGridSheet.Sheet},t}(WjComponentBehavior);export var WjSheet=WjSheetBehavior.register();