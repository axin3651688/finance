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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_chart_1=require("wijmo/wijmo.angular.chart"),mNg=require("angular"),wjcChartRadar=require("wijmo/wijmo.chart.radar");var wjNg=mNg;const wijmoChartRadarName="wj.chart.radar";exports.ngModuleName="wj.chart.radar";var wijmoChartRadar=wijmo_angular_base_1._registerNgModule("wj.chart.radar");wijmo_angular_base_1.softRefChartRadar()&&(wijmoChartRadar.directive("wjFlexRadar",[function(){return new WjFlexRadar}]),wijmoChartRadar.directive("wjFlexRadarSeries",[function(){return new WjFlexRadarSeries}]),wijmoChartRadar.directive("wjFlexRadarAxis",[function(){return new WjFlexRadarAxis}]));class WjFlexRadar extends wijmo_angular_chart_1.WjFlexChartCore{get _controlConstructor(){return wjcChartRadar.FlexRadar}}exports.WjFlexRadar=WjFlexRadar;class WjFlexRadarSeries extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super(),this.require="^wjFlexRadar",this.template='<div class="wjFlexRadarSeries" ng-transclude />'}get _controlConstructor(){return wjcChartRadar.FlexRadarSeries}}exports.WjFlexRadarSeries=WjFlexRadarSeries;class WjFlexRadarAxis extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.require=["?^wjFlexRadarSeries","?^wjFlexRadar"],this.template='<div class="wjFlexRadarAxis" />'}get _controlConstructor(){return wjcChartRadar.FlexRadarAxis}_initControl(r){return super._initControl(void 0)}}exports.WjFlexRadarAxis=WjFlexRadarAxis;