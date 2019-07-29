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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=require("knockout"),wjcChartInter=require("wijmo/wijmo.chart.interaction");var wjKo=mKo;class wjFlexChartRangeSelector extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcChartInter.RangeSelector}}exports.wjFlexChartRangeSelector=wjFlexChartRangeSelector;class wjFlexChartGestures extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcChartInter.ChartGestures}}exports.wjFlexChartGestures=wjFlexChartGestures,wjKo.bindingHandlers.wjFlexChartRangeSelector=new wjFlexChartRangeSelector,wjKo.bindingHandlers.wjFlexChartGestures=new wjFlexChartGestures;