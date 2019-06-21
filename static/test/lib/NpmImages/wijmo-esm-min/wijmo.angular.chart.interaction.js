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

var __extends=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();import{WjDirective,_registerNgModule,softRefChartInteraction}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcChartInteraction from"wijmo/wijmo.chart.interaction";var wjNg=mNg,wijmoChartInteractionName="wj.chart.interaction";export var ngModuleName=wijmoChartInteractionName;var wijmoChartInteraction=_registerNgModule(wijmoChartInteractionName);softRefChartInteraction()&&(wijmoChartInteraction.directive("wjFlexChartRangeSelector",[function(){return new WjFlexChartRangeSelector}]),wijmoChartInteraction.directive("wjFlexChartGestures",[function(){return new WjFlexChartChartGestures}]),wijmoChartInteraction.directive("wjFlexChartChartGestures",[function(){return new WjFlexChartChartGestures}]));var WjFlexChartRangeSelector=function(t){function r(){var r=t.call(this)||this;return r.require=["?^wjFlexChart","?^wjFinancialChart"],r}return __extends(r,t),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcChartInteraction.RangeSelector},enumerable:!0,configurable:!0}),r}(WjDirective);export{WjFlexChartRangeSelector};var WjFlexChartChartGestures=function(t){function r(){var r=t.call(this)||this;return r.require=["?^wjFlexChart","?^wjFinancialChart"],r}return __extends(r,t),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcChartInteraction.ChartGestures},enumerable:!0,configurable:!0}),r}(WjDirective);export{WjFlexChartChartGestures};