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

import{WjDirective,_registerNgModule,softRefChartAnimation}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcChartAnimation from"wijmo/wijmo.chart.animation";var wjNg=mNg;const wijmoChartAnimationName="wj.chart.animation";export const ngModuleName="wj.chart.animation";var wijmoChartAnimation=_registerNgModule("wj.chart.animation");softRefChartAnimation()&&wijmoChartAnimation.directive("wjFlexChartAnimation",[function(){return new WjFlexChartAnimation}]);export class WjFlexChartAnimation extends WjDirective{constructor(){super(),this.require=["?^wjFlexChart","?^wjFlexPie","?^wjSunburst","?^wjFinancialChart","?^wjFlexRadar"]}get _controlConstructor(){return wjcChartAnimation.ChartAnimation}};