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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_chart_1=require("wijmo/wijmo.knockout.chart"),mKo=require("knockout"),wjcChartAnal=require("wijmo/wijmo.chart.analytics");var wjKo=mKo;class WjTrendLineBase extends wijmo_knockout_chart_1.WjSeriesBase{_getControlConstructor(){return wjcChartAnal.TrendLineBase}}exports.WjTrendLineBase=WjTrendLineBase;class wjFlexChartTrendLine extends WjTrendLineBase{_getControlConstructor(){return wjcChartAnal.TrendLine}}exports.wjFlexChartTrendLine=wjFlexChartTrendLine;class wjFlexChartMovingAverage extends WjTrendLineBase{_getControlConstructor(){return wjcChartAnal.MovingAverage}}exports.wjFlexChartMovingAverage=wjFlexChartMovingAverage;class wjFlexChartYFunctionSeries extends WjTrendLineBase{_getControlConstructor(){return wjcChartAnal.YFunctionSeries}}exports.wjFlexChartYFunctionSeries=wjFlexChartYFunctionSeries;class wjFlexChartParametricFunctionSeries extends WjTrendLineBase{_getControlConstructor(){return wjcChartAnal.ParametricFunctionSeries}_initialize(){super._initialize(),wijmo_knockout_base_1.MetaFactory.findProp("func",this._metaData.props).updateControl=function(e,r,n,t,a){return null!=a&&(n.xFunc=a),!0}}}exports.wjFlexChartParametricFunctionSeries=wjFlexChartParametricFunctionSeries;class wjFlexChartWaterfall extends wijmo_knockout_chart_1.WjSeriesBase{_getControlConstructor(){return wjcChartAnal.Waterfall}}exports.wjFlexChartWaterfall=wjFlexChartWaterfall,wjKo.bindingHandlers.wjFlexChartTrendLine=new wjFlexChartTrendLine,wjKo.bindingHandlers.wjFlexChartMovingAverage=new wjFlexChartMovingAverage,wjKo.bindingHandlers.wjFlexChartYFunctionSeries=new wjFlexChartYFunctionSeries,wjKo.bindingHandlers.wjFlexChartParametricFunctionSeries=new wjFlexChartParametricFunctionSeries,wjKo.bindingHandlers.wjFlexChartWaterfall=new wjFlexChartWaterfall;