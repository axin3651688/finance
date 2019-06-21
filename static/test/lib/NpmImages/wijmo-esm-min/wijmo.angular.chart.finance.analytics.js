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

var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();import{_registerNgModule,softRefChartFinanceAnalytics}from"wijmo/wijmo.angular.base";import{WjSeriesBase}from"wijmo/wijmo.angular.chart";import*as mNg from"angular";import*as wjcChartFinAn from"wijmo/wijmo.chart.finance.analytics";var wjNg=mNg,wijmoChartFinAnName="wj.chart.finance.analytics";export var ngModuleName=wijmoChartFinAnName;var wijmoChartFinAn=_registerNgModule(wijmoChartFinAnName);softRefChartFinanceAnalytics()&&(wijmoChartFinAn.directive("wjFlexChartFibonacci",[function(){return new WjFlexChartFibonacci}]),wijmoChartFinAn.directive("wjFlexChartFibonacciArcs",[function(){return new WjFlexChartFibonacciArcs}]),wijmoChartFinAn.directive("wjFlexChartFibonacciFans",[function(){return new WjFlexChartFibonacciFans}]),wijmoChartFinAn.directive("wjFlexChartFibonacciTimeZones",[function(){return new WjFlexChartFibonacciTimeZones}]),wijmoChartFinAn.directive("wjFlexChartAtr",[function(){return new WjFlexChartAtr}]),wijmoChartFinAn.directive("wjFlexChartCci",[function(){return new WjFlexChartCci}]),wijmoChartFinAn.directive("wjFlexChartRsi",[function(){return new WjFlexChartRsi}]),wijmoChartFinAn.directive("wjFlexChartWilliamsR",[function(){return new WjFlexChartWilliamsR}]),wijmoChartFinAn.directive("wjFlexChartMacd",[function(){return new WjFlexChartMacd}]),wijmoChartFinAn.directive("wjFlexChartMacdHistogram",[function(){return new WjFlexChartMacdHistogram}]),wijmoChartFinAn.directive("wjFlexChartStochastic",[function(){return new WjFlexChartStochastic}]),wijmoChartFinAn.directive("wjFlexChartBollingerBands",[function(){return new WjFlexChartBollingerBands}]),wijmoChartFinAn.directive("wjFlexChartEnvelopes",[function(){return new WjFlexChartEnvelopes}]));var WjBaseOverlayIndicator=function(t){function e(){var e=t.call(this)||this;return e.require="^wjFinancialChart",e.template='<div class="wjBaseOverlayIndicator" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.OverlayIndicatorBase},enumerable:!0,configurable:!0}),e}(WjSeriesBase);export{WjBaseOverlayIndicator};var WjBaseSingleOverlayIndicator=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjBaseSingleOverlayIndicator" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.SingleOverlayIndicatorBase},enumerable:!0,configurable:!0}),e}(WjBaseOverlayIndicator);export{WjBaseSingleOverlayIndicator};var WjFlexChartFibonacci=function(t){function e(){var e=t.call(this)||this;return e.require=["?^wjFinancialChart"],e.template='<div class="wjFlexChartFibonacci" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.Fibonacci},enumerable:!0,configurable:!0}),e.prototype._initControl=function(e){return t.prototype._initControl.call(this,void 0)},e}(WjSeriesBase);export{WjFlexChartFibonacci};var WjFlexChartFibonacciArcs=function(t){function e(){var e=t.call(this)||this;return e.require=["?^wjFinancialChart"],e.template='<div class="wjFlexChartFibonacciArcs" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.FibonacciArcs},enumerable:!0,configurable:!0}),e.prototype._initControl=function(e){return t.prototype._initControl.call(this,void 0)},e}(WjSeriesBase);export{WjFlexChartFibonacciArcs};var WjFlexChartFibonacciFans=function(t){function e(){var e=t.call(this)||this;return e.require=["?^wjFinancialChart"],e.template='<div class="wjFlexChartFibonacciFans" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.FibonacciFans},enumerable:!0,configurable:!0}),e.prototype._initControl=function(e){return t.prototype._initControl.call(this,void 0)},e}(WjSeriesBase);export{WjFlexChartFibonacciFans};var WjFlexChartFibonacciTimeZones=function(t){function e(){var e=t.call(this)||this;return e.require=["?^wjFinancialChart"],e.template='<div class="wjFlexChartFibonacciTimeZones" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.FibonacciTimeZones},enumerable:!0,configurable:!0}),e.prototype._initControl=function(e){return t.prototype._initControl.call(this,void 0)},e}(WjSeriesBase);export{WjFlexChartFibonacciTimeZones};var WjFlexChartAtr=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartAtr" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.ATR},enumerable:!0,configurable:!0}),e}(WjBaseSingleOverlayIndicator);export{WjFlexChartAtr};var WjFlexChartCci=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartCci" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.CCI},enumerable:!0,configurable:!0}),e}(WjBaseSingleOverlayIndicator);export{WjFlexChartCci};var WjFlexChartRsi=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartRsi" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.RSI},enumerable:!0,configurable:!0}),e}(WjBaseSingleOverlayIndicator);export{WjFlexChartRsi};var WjFlexChartWilliamsR=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartWilliamsR" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.WilliamsR},enumerable:!0,configurable:!0}),e}(WjBaseSingleOverlayIndicator);export{WjFlexChartWilliamsR};var WjFlexChartMacdBase=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartBaseMacd" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.MacdBase},enumerable:!0,configurable:!0}),e}(WjBaseOverlayIndicator);export{WjFlexChartMacdBase};var WjFlexChartMacd=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartMacd" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.Macd},enumerable:!0,configurable:!0}),e}(WjFlexChartMacdBase);export{WjFlexChartMacd};var WjFlexChartMacdHistogram=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartMacdHistogram" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.MacdHistogram},enumerable:!0,configurable:!0}),e}(WjFlexChartMacdBase);export{WjFlexChartMacdHistogram};var WjFlexChartStochastic=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartStochastic" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.Stochastic},enumerable:!0,configurable:!0}),e}(WjBaseOverlayIndicator);export{WjFlexChartStochastic};var WjFlexChartBollingerBands=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartBollingerBands" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.BollingerBands},enumerable:!0,configurable:!0}),e}(WjBaseOverlayIndicator);export{WjFlexChartBollingerBands};var WjFlexChartEnvelopes=function(t){function e(){var e=t.call(this)||this;return e.template='<div class="wjFlexChartEnvelopes" ng-transclude />',e}return __extends(e,t),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartFinAn.Envelopes},enumerable:!0,configurable:!0}),e}(WjBaseOverlayIndicator);export{WjFlexChartEnvelopes};