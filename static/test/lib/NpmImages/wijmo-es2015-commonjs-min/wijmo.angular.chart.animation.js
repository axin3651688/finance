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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcChartAnimation=require("wijmo/wijmo.chart.animation");var wjNg=mNg;const wijmoChartAnimationName="wj.chart.animation";exports.ngModuleName="wj.chart.animation";var wijmoChartAnimation=wijmo_angular_base_1._registerNgModule("wj.chart.animation");wijmo_angular_base_1.softRefChartAnimation()&&wijmoChartAnimation.directive("wjFlexChartAnimation",[function(){return new WjFlexChartAnimation}]);class WjFlexChartAnimation extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.require=["?^wjFlexChart","?^wjFlexPie","?^wjSunburst","?^wjFinancialChart","?^wjFlexRadar"]}get _controlConstructor(){return wjcChartAnimation.ChartAnimation}}exports.WjFlexChartAnimation=WjFlexChartAnimation;