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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcChartFinance=require("wijmo/wijmo.chart.finance");class FinancialChart extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChartFinance.FinancialChart,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","options","selection"]})}}exports.FinancialChart=FinancialChart;class FinancialChartSeries extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcChartFinance.FinancialSeries,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]}),this._parentProp="series",this._siblingId="series"}}exports.FinancialChartSeries=FinancialChartSeries;