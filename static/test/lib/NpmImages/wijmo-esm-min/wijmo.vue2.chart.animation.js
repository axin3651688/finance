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

var __extends=this&&this.__extends||function(){var t=function(o,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var n in o)o.hasOwnProperty(n)&&(t[n]=o[n])})(o,n)};return function(o,n){function r(){this.constructor=o}t(o,n),o.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChartAnimation from"wijmo/wijmo.chart.animation";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjFlexChartAnimationBehavior=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.tag="wj-flex-chart-animation",o.className="wijmo.chart.animation.ChartAnimation",o.parentInCtor=!0,o.classCtor=function(){return wjcChartAnimation.ChartAnimation},o}(WjComponentBehavior);export var WjFlexChartAnimation=WjFlexChartAnimationBehavior.register();