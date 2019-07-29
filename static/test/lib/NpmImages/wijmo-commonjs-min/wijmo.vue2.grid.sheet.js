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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcGridSheet=require("wijmo/wijmo.grid.sheet"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjFlexSheetBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-flex-sheet",t.className="wijmo.grid.sheet.FlexSheet",t.classCtor=function(){return wjcGridSheet.FlexSheet},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexSheet=WjFlexSheetBehavior.register();var WjSheetBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-sheet",t.className="wijmo.grid.sheet.Sheet",t.parentProp="sheets",t.parentInCtor=!0,t.classCtor=function(){return wjcGridSheet.Sheet},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjSheet=WjSheetBehavior.register();