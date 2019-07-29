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

var __extends=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function n(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcChartInter from"wijmo/wijmo.chart.interaction";var wjKo=mKo,wjFlexChartRangeSelector=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return __extends(r,t),r.prototype._getControlConstructor=function(){return wjcChartInter.RangeSelector},r}(WjBinding);export{wjFlexChartRangeSelector};var wjFlexChartGestures=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return __extends(r,t),r.prototype._getControlConstructor=function(){return wjcChartInter.ChartGestures},r}(WjBinding);export{wjFlexChartGestures};wjKo.bindingHandlers.wjFlexChartRangeSelector=new wjFlexChartRangeSelector,wjKo.bindingHandlers.wjFlexChartGestures=new wjFlexChartGestures;