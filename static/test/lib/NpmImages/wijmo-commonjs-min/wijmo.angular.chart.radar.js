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

"use strict";var __extends=this&&this.__extends||function(){var r=function(e,a){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var a in e)e.hasOwnProperty(a)&&(r[a]=e[a])})(e,a)};return function(e,a){function t(){this.constructor=e}r(e,a),e.prototype=null===a?Object.create(a):(t.prototype=a.prototype,new t)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_chart_1=require("wijmo/wijmo.angular.chart"),mNg=require("angular"),wjcChartRadar=require("wijmo/wijmo.chart.radar"),wjNg=mNg,wijmoChartRadarName="wj.chart.radar";exports.ngModuleName=wijmoChartRadarName;var wijmoChartRadar=wijmo_angular_base_1._registerNgModule(wijmoChartRadarName);wijmo_angular_base_1.softRefChartRadar()&&(wijmoChartRadar.directive("wjFlexRadar",[function(){return new WjFlexRadar}]),wijmoChartRadar.directive("wjFlexRadarSeries",[function(){return new WjFlexRadarSeries}]),wijmoChartRadar.directive("wjFlexRadarAxis",[function(){return new WjFlexRadarAxis}]));var WjFlexRadar=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartRadar.FlexRadar},enumerable:!0,configurable:!0}),e}(wijmo_angular_chart_1.WjFlexChartCore);exports.WjFlexRadar=WjFlexRadar;var WjFlexRadarSeries=function(r){function e(){var e=r.call(this)||this;return e.require="^wjFlexRadar",e.template='<div class="wjFlexRadarSeries" ng-transclude />',e}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartRadar.FlexRadarSeries},enumerable:!0,configurable:!0}),e}(wijmo_angular_chart_1.WjSeriesBase);exports.WjFlexRadarSeries=WjFlexRadarSeries;var WjFlexRadarAxis=function(r){function e(){var e=r.call(this)||this;return e.require=["?^wjFlexRadarSeries","?^wjFlexRadar"],e.template='<div class="wjFlexRadarAxis" />',e}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartRadar.FlexRadarAxis},enumerable:!0,configurable:!0}),e.prototype._initControl=function(e){return r.prototype._initControl.call(this,void 0)},e}(wijmo_angular_base_1.WjDirective);exports.WjFlexRadarAxis=WjFlexRadarAxis;