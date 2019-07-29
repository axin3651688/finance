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

var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChartInteraction from"wijmo/wijmo.chart.interaction";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjFlexChartRangeSelectorBehavior=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.tag="wj-flex-chart-range-selector",e.className="wijmo.chart.interaction.RangeSelector",e.parentInCtor=!0,e.classCtor=function(){return wjcChartInteraction.RangeSelector},e}(WjComponentBehavior);export var WjFlexChartRangeSelector=WjFlexChartRangeSelectorBehavior.register();var WjFlexChartGesturesBehavior=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.tag="wj-flex-chart-gestures",e.className="wijmo.chart.interaction.ChartGestures",e.parentInCtor=!0,e.classCtor=function(){return wjcChartInteraction.ChartGestures},e}(WjComponentBehavior);export var WjFlexChartGestures=WjFlexChartGesturesBehavior.register();