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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcChartRadar from"wijmo/wijmo.chart.radar";export class FlexRadar extends ComponentBase{constructor(e){super(e,wjcChartRadar.FlexRadar,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","options","selection"]})}};export class FlexRadarAxis extends ComponentBase{constructor(e){super(e,wjcChartRadar.FlexRadarAxis,{objectProps:["plotArea","itemsSource"]}),this._parentProp="axes"}};export class FlexRadarSeries extends ComponentBase{constructor(e){super(e,wjcChartRadar.FlexRadarSeries,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}};