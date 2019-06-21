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

import{MetaFactory}from"wijmo/wijmo.knockout.base";import{WjSeriesBase}from"wijmo/wijmo.knockout.chart";import*as mKo from"knockout";import*as wjcChartAnal from"wijmo/wijmo.chart.analytics";var wjKo=mKo;export class WjTrendLineBase extends WjSeriesBase{_getControlConstructor(){return wjcChartAnal.TrendLineBase}};export class wjFlexChartTrendLine extends WjTrendLineBase{_getControlConstructor(){return wjcChartAnal.TrendLine}};export class wjFlexChartMovingAverage extends WjTrendLineBase{_getControlConstructor(){return wjcChartAnal.MovingAverage}};export class wjFlexChartYFunctionSeries extends WjTrendLineBase{_getControlConstructor(){return wjcChartAnal.YFunctionSeries}};export class wjFlexChartParametricFunctionSeries extends WjTrendLineBase{_getControlConstructor(){return wjcChartAnal.ParametricFunctionSeries}_initialize(){super._initialize(),MetaFactory.findProp("func",this._metaData.props).updateControl=function(e,r,n,t,a){return null!=a&&(n.xFunc=a),!0}}};export class wjFlexChartWaterfall extends WjSeriesBase{_getControlConstructor(){return wjcChartAnal.Waterfall}};wjKo.bindingHandlers.wjFlexChartTrendLine=new wjFlexChartTrendLine,wjKo.bindingHandlers.wjFlexChartMovingAverage=new wjFlexChartMovingAverage,wjKo.bindingHandlers.wjFlexChartYFunctionSeries=new wjFlexChartYFunctionSeries,wjKo.bindingHandlers.wjFlexChartParametricFunctionSeries=new wjFlexChartParametricFunctionSeries,wjKo.bindingHandlers.wjFlexChartWaterfall=new wjFlexChartWaterfall;