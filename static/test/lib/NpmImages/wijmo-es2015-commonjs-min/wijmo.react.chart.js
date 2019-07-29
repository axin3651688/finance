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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcChart=require("wijmo/wijmo.chart");class FlexChart extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.FlexChart,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","options","selection"]})}}exports.FlexChart=FlexChart;class FlexPie extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.FlexPie,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource"]})}}exports.FlexPie=FlexPie;class FlexChartAxis extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.Axis,{objectProps:["plotArea","itemsSource"]}),this._parentProp="axes"}}exports.FlexChartAxis=FlexChartAxis;class FlexChartLegend extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.Legend),this._parentProp="legend",this._parentInCtor=!0}}exports.FlexChartLegend=FlexChartLegend;class FlexChartDataLabel extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.DataLabel,{objectProps:["content"]}),this._parentProp="dataLabel"}}exports.FlexChartDataLabel=FlexChartDataLabel;class FlexPieDataLabel extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.PieDataLabel,{objectProps:["content"]}),this._parentProp="dataLabel"}}exports.FlexPieDataLabel=FlexPieDataLabel;class FlexChartSeries extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.Series,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}}exports.FlexChartSeries=FlexChartSeries;class FlexChartLineMarker extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.LineMarker),this._parentInCtor=!0}}exports.FlexChartLineMarker=FlexChartLineMarker;class FlexChartDataPoint extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.DataPoint),this._parentProp=""}}exports.FlexChartDataPoint=FlexChartDataPoint;class FlexChartPlotArea extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChart.PlotArea,{objectProps:["style"]}),this._parentProp="plotAreas"}}exports.FlexChartPlotArea=FlexChartPlotArea;