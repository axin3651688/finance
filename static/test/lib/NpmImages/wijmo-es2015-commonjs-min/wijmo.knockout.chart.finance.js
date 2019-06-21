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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_chart_1=require("wijmo/wijmo.knockout.chart"),mKo=require("knockout"),wjcChartFin=require("wijmo/wijmo.chart.finance");var wjKo=mKo;class wjFinancialChart extends wijmo_knockout_chart_1.WjFlexChartBaseBinding{_getControlConstructor(){return wjcChartFin.FinancialChart}_initialize(){super._initialize(),wijmo_knockout_base_1.MetaFactory.findProp("labelContent",this._metaData.props).updateControl=function(n,i,t,a,e){return null!=e&&(t.dataLabel.content=e),!0}}}exports.wjFinancialChart=wjFinancialChart;class wjFinancialChartSeries extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcChartFin.FinancialSeries}_createWijmoContext(){return new WjFinancialChartSeriesContext(this)}}exports.wjFinancialChartSeries=wjFinancialChartSeries;class WjFinancialChartSeriesContext extends wijmo_knockout_base_1.WjContext{_initControl(){super._initControl();var n=this.parentWjContext.control;n instanceof wjcChartFin.FinancialChart&&n.seriesVisibilityChanged.addHandler((n,i)=>{this._updateSource()})}}exports.WjFinancialChartSeriesContext=WjFinancialChartSeriesContext,wjKo.bindingHandlers.wjFinancialChart=new wjFinancialChart,wjKo.bindingHandlers.wjFinancialChartSeries=new wjFinancialChartSeries;