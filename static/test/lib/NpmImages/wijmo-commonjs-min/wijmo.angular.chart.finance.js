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

"use strict";var __extends=this&&this.__extends||function(){var r=function(n,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var e in n)n.hasOwnProperty(e)&&(r[e]=n[e])})(n,e)};return function(n,e){function a(){this.constructor=n}r(n,e),n.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_chart_1=require("wijmo/wijmo.angular.chart"),mNg=require("angular"),wjcChartFinance=require("wijmo/wijmo.chart.finance"),wjNg=mNg,wijmoChartFinanceName="wj.chart.finance";exports.ngModuleName=wijmoChartFinanceName;var wijmoChartFinance=wijmo_angular_base_1._registerNgModule(wijmoChartFinanceName);wijmo_angular_base_1.softRefChartFinance()&&(wijmoChartFinance.directive("wjFinancialChart",[function(){return new WjFinancialChart}]),wijmoChartFinance.directive("wjFinancialChartSeries",[function(){return new WjFinancialChartSeries}]));var WjFinancialChart=function(r){function n(){return null!==r&&r.apply(this,arguments)||this}return __extends(n,r),Object.defineProperty(n.prototype,"_controlConstructor",{get:function(){return wjcChartFinance.FinancialChart},enumerable:!0,configurable:!0}),n}(wijmo_angular_chart_1.WjFlexChartCore);exports.WjFinancialChart=WjFinancialChart;var WjFinancialChartSeries=function(r){function n(){var n=r.call(this)||this;return n.require="^wjFinancialChart",n.template='<div class="wjFinancialChartSeries" ng-transclude />',n}return __extends(n,r),Object.defineProperty(n.prototype,"_controlConstructor",{get:function(){return wjcChartFinance.FinancialSeries},enumerable:!0,configurable:!0}),n}(wijmo_angular_chart_1.WjSeriesBase);exports.WjFinancialChartSeries=WjFinancialChartSeries;