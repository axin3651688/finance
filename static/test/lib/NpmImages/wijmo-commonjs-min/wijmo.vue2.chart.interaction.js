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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcChartInteraction=require("wijmo/wijmo.chart.interaction"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjFlexChartRangeSelectorBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-flex-chart-range-selector",t.className="wijmo.chart.interaction.RangeSelector",t.parentInCtor=!0,t.classCtor=function(){return wjcChartInteraction.RangeSelector},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexChartRangeSelector=WjFlexChartRangeSelectorBehavior.register();var WjFlexChartGesturesBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-flex-chart-gestures",t.className="wijmo.chart.interaction.ChartGestures",t.parentInCtor=!0,t.classCtor=function(){return wjcChartInteraction.ChartGestures},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexChartGestures=WjFlexChartGesturesBehavior.register();