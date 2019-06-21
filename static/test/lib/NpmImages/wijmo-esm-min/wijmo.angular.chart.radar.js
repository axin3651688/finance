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

var __extends=this&&this.__extends||function(){var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(e,t)};return function(e,t){function a(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}}();import{WjDirective,_registerNgModule,softRefChartRadar}from"wijmo/wijmo.angular.base";import{WjFlexChartCore,WjSeriesBase}from"wijmo/wijmo.angular.chart";import*as mNg from"angular";import*as wjcChartRadar from"wijmo/wijmo.chart.radar";var wjNg=mNg,wijmoChartRadarName="wj.chart.radar";export var ngModuleName=wijmoChartRadarName;var wijmoChartRadar=_registerNgModule(wijmoChartRadarName);softRefChartRadar()&&(wijmoChartRadar.directive("wjFlexRadar",[function(){return new WjFlexRadar}]),wijmoChartRadar.directive("wjFlexRadarSeries",[function(){return new WjFlexRadarSeries}]),wijmoChartRadar.directive("wjFlexRadarAxis",[function(){return new WjFlexRadarAxis}]));var WjFlexRadar=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartRadar.FlexRadar},enumerable:!0,configurable:!0}),e}(WjFlexChartCore);export{WjFlexRadar};var WjFlexRadarSeries=function(r){function e(){var e=r.call(this)||this;return e.require="^wjFlexRadar",e.template='<div class="wjFlexRadarSeries" ng-transclude />',e}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartRadar.FlexRadarSeries},enumerable:!0,configurable:!0}),e}(WjSeriesBase);export{WjFlexRadarSeries};var WjFlexRadarAxis=function(r){function e(){var e=r.call(this)||this;return e.require=["?^wjFlexRadarSeries","?^wjFlexRadar"],e.template='<div class="wjFlexRadarAxis" />',e}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartRadar.FlexRadarAxis},enumerable:!0,configurable:!0}),e.prototype._initControl=function(e){return r.prototype._initControl.call(this,void 0)},e}(WjDirective);export{WjFlexRadarAxis};