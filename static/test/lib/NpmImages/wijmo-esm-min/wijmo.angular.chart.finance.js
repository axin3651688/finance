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

var __extends=this&&this.__extends||function(){var r=function(n,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var e in n)n.hasOwnProperty(e)&&(r[e]=n[e])})(n,e)};return function(n,e){function t(){this.constructor=n}r(n,e),n.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}}();import{_registerNgModule,softRefChartFinance}from"wijmo/wijmo.angular.base";import{WjSeriesBase,WjFlexChartCore}from"wijmo/wijmo.angular.chart";import*as mNg from"angular";import*as wjcChartFinance from"wijmo/wijmo.chart.finance";var wjNg=mNg,wijmoChartFinanceName="wj.chart.finance";export var ngModuleName=wijmoChartFinanceName;var wijmoChartFinance=_registerNgModule(wijmoChartFinanceName);softRefChartFinance()&&(wijmoChartFinance.directive("wjFinancialChart",[function(){return new WjFinancialChart}]),wijmoChartFinance.directive("wjFinancialChartSeries",[function(){return new WjFinancialChartSeries}]));var WjFinancialChart=function(r){function n(){return null!==r&&r.apply(this,arguments)||this}return __extends(n,r),Object.defineProperty(n.prototype,"_controlConstructor",{get:function(){return wjcChartFinance.FinancialChart},enumerable:!0,configurable:!0}),n}(WjFlexChartCore);export{WjFinancialChart};var WjFinancialChartSeries=function(r){function n(){var n=r.call(this)||this;return n.require="^wjFinancialChart",n.template='<div class="wjFinancialChartSeries" ng-transclude />',n}return __extends(n,r),Object.defineProperty(n.prototype,"_controlConstructor",{get:function(){return wjcChartFinance.FinancialSeries},enumerable:!0,configurable:!0}),n}(WjSeriesBase);export{WjFinancialChartSeries};