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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcChart from"wijmo/wijmo.chart";export class FlexChart extends ComponentBase{constructor(e){super(e,wjcChart.FlexChart,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","options","selection"]})}};export class FlexPie extends ComponentBase{constructor(e){super(e,wjcChart.FlexPie,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource"]})}};export class FlexChartAxis extends ComponentBase{constructor(e){super(e,wjcChart.Axis,{objectProps:["plotArea","itemsSource"]}),this._parentProp="axes"}};export class FlexChartLegend extends ComponentBase{constructor(e){super(e,wjcChart.Legend),this._parentProp="legend",this._parentInCtor=!0}};export class FlexChartDataLabel extends ComponentBase{constructor(e){super(e,wjcChart.DataLabel,{objectProps:["content"]}),this._parentProp="dataLabel"}};export class FlexPieDataLabel extends ComponentBase{constructor(e){super(e,wjcChart.PieDataLabel,{objectProps:["content"]}),this._parentProp="dataLabel"}};export class FlexChartSeries extends ComponentBase{constructor(e){super(e,wjcChart.Series,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}};export class FlexChartLineMarker extends ComponentBase{constructor(e){super(e,wjcChart.LineMarker),this._parentInCtor=!0}};export class FlexChartDataPoint extends ComponentBase{constructor(e){super(e,wjcChart.DataPoint),this._parentProp=""}};export class FlexChartPlotArea extends ComponentBase{constructor(e){super(e,wjcChart.PlotArea,{objectProps:["style"]}),this._parentProp="plotAreas"}};