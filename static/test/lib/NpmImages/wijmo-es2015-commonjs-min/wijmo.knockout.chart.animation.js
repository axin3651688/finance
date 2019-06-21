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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=require("knockout"),wjcChartAnim=require("wijmo/wijmo.chart.animation");var wjKo=mKo;class wjFlexChartAnimation extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcChartAnim.ChartAnimation}}exports.wjFlexChartAnimation=wjFlexChartAnimation,wjKo.bindingHandlers.wjFlexChartAnimation=new wjFlexChartAnimation;