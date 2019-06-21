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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcChartRadar=require("wijmo/wijmo.chart.radar");class FlexRadar extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChartRadar.FlexRadar,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","options","selection"]})}}exports.FlexRadar=FlexRadar;class FlexRadarAxis extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChartRadar.FlexRadarAxis,{objectProps:["plotArea","itemsSource"]}),this._parentProp="axes"}}exports.FlexRadarAxis=FlexRadarAxis;class FlexRadarSeries extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChartRadar.FlexRadarSeries,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}}exports.FlexRadarSeries=FlexRadarSeries;