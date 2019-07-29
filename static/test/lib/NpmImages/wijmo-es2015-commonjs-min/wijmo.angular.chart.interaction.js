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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcChartInteraction=require("wijmo/wijmo.chart.interaction");var wjNg=mNg;const wijmoChartInteractionName="wj.chart.interaction";exports.ngModuleName="wj.chart.interaction";var wijmoChartInteraction=wijmo_angular_base_1._registerNgModule("wj.chart.interaction");wijmo_angular_base_1.softRefChartInteraction()&&(wijmoChartInteraction.directive("wjFlexChartRangeSelector",[function(){return new WjFlexChartRangeSelector}]),wijmoChartInteraction.directive("wjFlexChartGestures",[function(){return new WjFlexChartChartGestures}]),wijmoChartInteraction.directive("wjFlexChartChartGestures",[function(){return new WjFlexChartChartGestures}]));class WjFlexChartRangeSelector extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.require=["?^wjFlexChart","?^wjFinancialChart"]}get _controlConstructor(){return wjcChartInteraction.RangeSelector}}exports.WjFlexChartRangeSelector=WjFlexChartRangeSelector;class WjFlexChartChartGestures extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.require=["?^wjFlexChart","?^wjFinancialChart"]}get _controlConstructor(){return wjcChartInteraction.ChartGestures}}exports.WjFlexChartChartGestures=WjFlexChartChartGestures;