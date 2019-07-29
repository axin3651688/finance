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

var __extends=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function r(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcChartAnim from"wijmo/wijmo.chart.animation";var wjKo=mKo,wjFlexChartAnimation=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcChartAnim.ChartAnimation},n}(WjBinding);export{wjFlexChartAnimation};wjKo.bindingHandlers.wjFlexChartAnimation=new wjFlexChartAnimation;