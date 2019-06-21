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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcChartAnalytics from"wijmo/wijmo.chart.analytics";export class FlexChartTrendLine extends ComponentBase{constructor(e){super(e,wjcChartAnalytics.TrendLine,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}};export class FlexChartMovingAverage extends ComponentBase{constructor(e){super(e,wjcChartAnalytics.MovingAverage,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}};export class FlexChartYFunctionSeries extends ComponentBase{constructor(e){super(e,wjcChartAnalytics.YFunctionSeries,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}};export class FlexChartParametricFunctionSeries extends ComponentBase{constructor(e){super(e,wjcChartAnalytics.ParametricFunctionSeries,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}};export class FlexChartWaterfall extends ComponentBase{constructor(e){super(e,wjcChartAnalytics.Waterfall,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent","intermediateTotalPositions","intermediateTotalLabels","styles"]}),this._parentProp="series",this._siblingId="series"}};export class FlexChartBoxWhisker extends ComponentBase{constructor(e){super(e,wjcChartAnalytics.BoxWhisker,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent","meanLineStyle","meanMarkerStyle"]}),this._parentProp="series",this._siblingId="series"}};export class FlexChartErrorBar extends ComponentBase{constructor(e){super(e,wjcChartAnalytics.ErrorBar,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent","errorBarStyle","value"]}),this._parentProp="series",this._siblingId="series"}};