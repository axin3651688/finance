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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcOlap=require("wijmo/wijmo.olap"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjPivotGridBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-pivot-grid",t.className="wijmo.olap.PivotGrid",t.classCtor=function(){return wjcOlap.PivotGrid},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjPivotGrid=WjPivotGridBehavior.register();var WjPivotChartBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-pivot-chart",t.className="wijmo.olap.PivotChart",t.classCtor=function(){return wjcOlap.PivotChart},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjPivotChart=WjPivotChartBehavior.register();var WjPivotPanelBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-pivot-panel",t.className="wijmo.olap.PivotPanel",t.classCtor=function(){return wjcOlap.PivotPanel},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjPivotPanel=WjPivotPanelBehavior.register();var WjSlicerBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-slicer",t.className="wijmo.olap.Slicer",t.classCtor=function(){return wjcOlap.Slicer},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjSlicer=WjSlicerBehavior.register();