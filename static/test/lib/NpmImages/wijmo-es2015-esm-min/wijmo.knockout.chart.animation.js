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

import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcChartAnim from"wijmo/wijmo.chart.animation";var wjKo=mKo;export class wjFlexChartAnimation extends WjBinding{_getControlConstructor(){return wjcChartAnim.ChartAnimation}};wjKo.bindingHandlers.wjFlexChartAnimation=new wjFlexChartAnimation;