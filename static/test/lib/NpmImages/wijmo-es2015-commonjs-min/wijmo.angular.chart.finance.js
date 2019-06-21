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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_chart_1=require("wijmo/wijmo.angular.chart"),mNg=require("angular"),wjcChartFinance=require("wijmo/wijmo.chart.finance");var wjNg=mNg;const wijmoChartFinanceName="wj.chart.finance";exports.ngModuleName="wj.chart.finance";var wijmoChartFinance=wijmo_angular_base_1._registerNgModule("wj.chart.finance");wijmo_angular_base_1.softRefChartFinance()&&(wijmoChartFinance.directive("wjFinancialChart",[function(){return new WjFinancialChart}]),wijmoChartFinance.directive("wjFinancialChartSeries",[function(){return new WjFinancialChartSeries}]));class WjFinancialChart extends wijmo_angular_chart_1.WjFlexChartCore{get _controlConstructor(){return wjcChartFinance.FinancialChart}}exports.WjFinancialChart=WjFinancialChart;class WjFinancialChartSeries extends wijmo_angular_chart_1.WjSeriesBase{constructor(){super(),this.require="^wjFinancialChart",this.template='<div class="wjFinancialChartSeries" ng-transclude />'}get _controlConstructor(){return wjcChartFinance.FinancialSeries}}exports.WjFinancialChartSeries=WjFinancialChartSeries;