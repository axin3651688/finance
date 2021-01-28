﻿/*!
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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_chart_1=require("wijmo/wijmo.angular.chart"),mNg=require("angular"),wjcChartAnalytics=require("wijmo/wijmo.chart.analytics");var wjNg=mNg;const wijmoChartAnalyticsName="wj.chart.analytics";exports.ngModuleName="wj.chart.analytics";var wijmoChartAnalytics=wijmo_angular_base_1._registerNgModule("wj.chart.analytics");wijmo_angular_base_1.softRefChartAnalytics()&&(wijmoChartAnalytics.directive("wjFlexChartTrendLine",[function(){return new WjFlexChartTrendLine}]),wijmoChartAnalytics.directive("wjFlexChartMovingAverage",[function(){return new WjFlexChartMovingAverage}]),wijmoChartAnalytics.directive("wjFlexChartYFunctionSeries",[function(){return new WjFlexChartYFunctionSeries}]),wijmoChartAnalytics.directive("wjFlexChartParametricFunctionSeries",[function(){return new WjFlexChartParametricFunctionSeries}]),wijmoChartAnalytics.directive("wjFlexChartWaterfall",[function(){return new WjFlexChartWaterfall}]),wijmoChartAnalytics.directive("wjFlexChartBoxWhisker",[function(){return new WjFlexChartBoxWhisker}]),wijmoChartAnalytics.directive("wjFlexChartErrorBar",[function(){return new WjFlexChartErrorBar}]));class WjTrendLineBase extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super(),this.require=["?^wjFlexChart","?^wjFinancialChart"],this.template='<div class="wjTrendLineBase" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.TrendLineBase}}exports.WjTrendLineBase=WjTrendLineBase;class WjFlexChartTrendLine extends WjTrendLineBase{constructor(){super(),this.template='<div class="wjTrendLine" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.TrendLine}}exports.WjFlexChartTrendLine=WjFlexChartTrendLine;class WjFlexChartMovingAverage extends WjTrendLineBase{constructor(){super(),this.template='<div class="wjMovingAverage" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.MovingAverage}}exports.WjFlexChartMovingAverage=WjFlexChartMovingAverage;class WjFlexChartYFunctionSeries extends WjTrendLineBase{constructor(){super(),this.template='<div class="wjYFunctionSeries" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.YFunctionSeries}}exports.WjFlexChartYFunctionSeries=WjFlexChartYFunctionSeries;class WjFlexChartParametricFunctionSeries extends WjTrendLineBase{constructor(){super(),this.template='<div class="wjParametricFunctionSeries" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.ParametricFunctionSeries}_initProps(){super._initProps();wijmo_angular_base_1.MetaFactory.findProp("func",this._props).customHandler=function(r,e,t,a,n){null!=t&&(e.xFunc=t)}}}exports.WjFlexChartParametricFunctionSeries=WjFlexChartParametricFunctionSeries;class WjFlexChartWaterfall extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super(),this.require=["?^wjFlexChart","?^wjFinancialChart"],this.template='<div class="wjWaterfall" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.Waterfall}}exports.WjFlexChartWaterfall=WjFlexChartWaterfall;class WjFlexChartBoxWhisker extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super(),this.require=["?^wjFlexChart","?^wjFinancialChart"],this.template='<div class="wjBoxWhisker" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.BoxWhisker}}exports.WjFlexChartBoxWhisker=WjFlexChartBoxWhisker;class WjFlexChartErrorBar extends wijmo_angular_chart_1.WjFlexChartSeries{constructor(){super(),this.require=["?^wjFlexChart"],this.template='<div class="wjErrorBar" ng-transclude />'}get _controlConstructor(){return wjcChartAnalytics.ErrorBar}}exports.WjFlexChartErrorBar=WjFlexChartErrorBar;