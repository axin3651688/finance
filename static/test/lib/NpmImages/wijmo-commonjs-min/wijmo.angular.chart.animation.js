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

"use strict";var __extends=this&&this.__extends||function(){var t=function(n,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])})(n,r)};return function(n,r){function e(){this.constructor=n}t(n,r),n.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcChartAnimation=require("wijmo/wijmo.chart.animation"),wjNg=mNg,wijmoChartAnimationName="wj.chart.animation";exports.ngModuleName=wijmoChartAnimationName;var wijmoChartAnimation=wijmo_angular_base_1._registerNgModule(wijmoChartAnimationName);wijmo_angular_base_1.softRefChartAnimation()&&wijmoChartAnimation.directive("wjFlexChartAnimation",[function(){return new WjFlexChartAnimation}]);var WjFlexChartAnimation=function(t){function n(){var n=t.call(this)||this;return n.require=["?^wjFlexChart","?^wjFlexPie","?^wjSunburst","?^wjFinancialChart","?^wjFlexRadar"],n}return __extends(n,t),Object.defineProperty(n.prototype,"_controlConstructor",{get:function(){return wjcChartAnimation.ChartAnimation},enumerable:!0,configurable:!0}),n}(wijmo_angular_base_1.WjDirective);exports.WjFlexChartAnimation=WjFlexChartAnimation;