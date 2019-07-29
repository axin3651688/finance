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

import{WjDirective,_registerNgModule,softRefChartRadar}from"wijmo/wijmo.angular.base";import{WjFlexChartCore,WjSeriesBase}from"wijmo/wijmo.angular.chart";import*as mNg from"angular";import*as wjcChartRadar from"wijmo/wijmo.chart.radar";var wjNg=mNg;const wijmoChartRadarName="wj.chart.radar";export const ngModuleName="wj.chart.radar";var wijmoChartRadar=_registerNgModule("wj.chart.radar");softRefChartRadar()&&(wijmoChartRadar.directive("wjFlexRadar",[function(){return new WjFlexRadar}]),wijmoChartRadar.directive("wjFlexRadarSeries",[function(){return new WjFlexRadarSeries}]),wijmoChartRadar.directive("wjFlexRadarAxis",[function(){return new WjFlexRadarAxis}]));export class WjFlexRadar extends WjFlexChartCore{get _controlConstructor(){return wjcChartRadar.FlexRadar}};export class WjFlexRadarSeries extends WjSeriesBase{constructor(){super(),this.require="^wjFlexRadar",this.template='<div class="wjFlexRadarSeries" ng-transclude />'}get _controlConstructor(){return wjcChartRadar.FlexRadarSeries}};export class WjFlexRadarAxis extends WjDirective{constructor(){super(),this.require=["?^wjFlexRadarSeries","?^wjFlexRadar"],this.template='<div class="wjFlexRadarAxis" />'}get _controlConstructor(){return wjcChartRadar.FlexRadarAxis}_initControl(r){return super._initControl(void 0)}};