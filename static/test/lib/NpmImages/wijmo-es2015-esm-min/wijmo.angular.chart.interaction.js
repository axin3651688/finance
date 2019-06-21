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

import{WjDirective,_registerNgModule,softRefChartInteraction}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcChartInteraction from"wijmo/wijmo.chart.interaction";var wjNg=mNg;const wijmoChartInteractionName="wj.chart.interaction";export const ngModuleName="wj.chart.interaction";var wijmoChartInteraction=_registerNgModule("wj.chart.interaction");softRefChartInteraction()&&(wijmoChartInteraction.directive("wjFlexChartRangeSelector",[function(){return new WjFlexChartRangeSelector}]),wijmoChartInteraction.directive("wjFlexChartGestures",[function(){return new WjFlexChartChartGestures}]),wijmoChartInteraction.directive("wjFlexChartChartGestures",[function(){return new WjFlexChartChartGestures}]));export class WjFlexChartRangeSelector extends WjDirective{constructor(){super(),this.require=["?^wjFlexChart","?^wjFinancialChart"]}get _controlConstructor(){return wjcChartInteraction.RangeSelector}};export class WjFlexChartChartGestures extends WjDirective{constructor(){super(),this.require=["?^wjFlexChart","?^wjFinancialChart"]}get _controlConstructor(){return wjcChartInteraction.ChartGestures}};