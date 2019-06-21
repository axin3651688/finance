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

import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcChartInter from"wijmo/wijmo.chart.interaction";var wjKo=mKo;export class wjFlexChartRangeSelector extends WjBinding{_getControlConstructor(){return wjcChartInter.RangeSelector}};export class wjFlexChartGestures extends WjBinding{_getControlConstructor(){return wjcChartInter.ChartGestures}};wjKo.bindingHandlers.wjFlexChartRangeSelector=new wjFlexChartRangeSelector,wjKo.bindingHandlers.wjFlexChartGestures=new wjFlexChartGestures;