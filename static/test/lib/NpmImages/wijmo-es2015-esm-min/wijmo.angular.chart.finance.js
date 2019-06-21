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

import{_registerNgModule,softRefChartFinance}from"wijmo/wijmo.angular.base";import{WjSeriesBase,WjFlexChartCore}from"wijmo/wijmo.angular.chart";import*as mNg from"angular";import*as wjcChartFinance from"wijmo/wijmo.chart.finance";var wjNg=mNg;const wijmoChartFinanceName="wj.chart.finance";export const ngModuleName="wj.chart.finance";var wijmoChartFinance=_registerNgModule("wj.chart.finance");softRefChartFinance()&&(wijmoChartFinance.directive("wjFinancialChart",[function(){return new WjFinancialChart}]),wijmoChartFinance.directive("wjFinancialChartSeries",[function(){return new WjFinancialChartSeries}]));export class WjFinancialChart extends WjFlexChartCore{get _controlConstructor(){return wjcChartFinance.FinancialChart}};export class WjFinancialChartSeries extends WjSeriesBase{constructor(){super(),this.require="^wjFinancialChart",this.template='<div class="wjFinancialChartSeries" ng-transclude />'}get _controlConstructor(){return wjcChartFinance.FinancialSeries}};