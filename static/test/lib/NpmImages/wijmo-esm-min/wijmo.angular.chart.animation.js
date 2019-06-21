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

var __extends=this&&this.__extends||function(){var t=function(r,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)r.hasOwnProperty(n)&&(t[n]=r[n])})(r,n)};return function(r,n){function i(){this.constructor=r}t(r,n),r.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}();import{WjDirective,_registerNgModule,softRefChartAnimation}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcChartAnimation from"wijmo/wijmo.chart.animation";var wjNg=mNg,wijmoChartAnimationName="wj.chart.animation";export var ngModuleName=wijmoChartAnimationName;var wijmoChartAnimation=_registerNgModule(wijmoChartAnimationName);softRefChartAnimation()&&wijmoChartAnimation.directive("wjFlexChartAnimation",[function(){return new WjFlexChartAnimation}]);var WjFlexChartAnimation=function(t){function r(){var r=t.call(this)||this;return r.require=["?^wjFlexChart","?^wjFlexPie","?^wjSunburst","?^wjFinancialChart","?^wjFlexRadar"],r}return __extends(r,t),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcChartAnimation.ChartAnimation},enumerable:!0,configurable:!0}),r}(WjDirective);export{WjFlexChartAnimation};