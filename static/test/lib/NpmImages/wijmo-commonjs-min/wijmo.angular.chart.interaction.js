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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcChartInteraction=require("wijmo/wijmo.chart.interaction"),wjNg=mNg,wijmoChartInteractionName="wj.chart.interaction";exports.ngModuleName=wijmoChartInteractionName;var wijmoChartInteraction=wijmo_angular_base_1._registerNgModule(wijmoChartInteractionName);wijmo_angular_base_1.softRefChartInteraction()&&(wijmoChartInteraction.directive("wjFlexChartRangeSelector",[function(){return new WjFlexChartRangeSelector}]),wijmoChartInteraction.directive("wjFlexChartGestures",[function(){return new WjFlexChartChartGestures}]),wijmoChartInteraction.directive("wjFlexChartChartGestures",[function(){return new WjFlexChartChartGestures}]));var WjFlexChartRangeSelector=function(e){function t(){var t=e.call(this)||this;return t.require=["?^wjFlexChart","?^wjFinancialChart"],t}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcChartInteraction.RangeSelector},enumerable:!0,configurable:!0}),t}(wijmo_angular_base_1.WjDirective);exports.WjFlexChartRangeSelector=WjFlexChartRangeSelector;var WjFlexChartChartGestures=function(e){function t(){var t=e.call(this)||this;return t.require=["?^wjFlexChart","?^wjFinancialChart"],t}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcChartInteraction.ChartGestures},enumerable:!0,configurable:!0}),t}(wijmo_angular_base_1.WjDirective);exports.WjFlexChartChartGestures=WjFlexChartChartGestures;