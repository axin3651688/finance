﻿/*!
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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcChart=require("wijmo/wijmo.chart"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjFlexChartBehavior extends wijmo_vue2_base_1.WjComponentBehavior{_updateControl(e,a){switch(e){case"tooltipContent":this.control.tooltip.content=a;break;case"labelContent":this.control.dataLabel.content=a;break;default:super._updateControl(e,a)}}}WjFlexChartBehavior.tag="wj-flex-chart",WjFlexChartBehavior.className="wijmo.chart.FlexChart",WjFlexChartBehavior.extraProps=["tooltipContent","labelContent"],WjFlexChartBehavior.classCtor=function(){return wjcChart.FlexChart},exports.WjFlexChart=WjFlexChartBehavior.register();class WjFlexPieBehavior extends wijmo_vue2_base_1.WjComponentBehavior{_updateControl(e,a){switch(e){case"tooltipContent":this.control.tooltip.content=a;break;case"labelContent":this.control.dataLabel.content=a;break;default:super._updateControl(e,a)}}}WjFlexPieBehavior.tag="wj-flex-pie",WjFlexPieBehavior.className="wijmo.chart.FlexPie",WjFlexPieBehavior.extraProps=["tooltipContent","labelContent"],WjFlexPieBehavior.classCtor=function(){return wjcChart.FlexPie},exports.WjFlexPie=WjFlexPieBehavior.register();class WjFlexChartAxisBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartAxisBehavior.tag="wj-flex-chart-axis",WjFlexChartAxisBehavior.className="wijmo.chart.Axis",WjFlexChartAxisBehavior.parentProp="axes",WjFlexChartAxisBehavior.classCtor=function(){return wjcChart.Axis},exports.WjFlexChartAxis=WjFlexChartAxisBehavior.register();class WjFlexChartLegendBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartLegendBehavior.tag="wj-flex-chart-legend",WjFlexChartLegendBehavior.className="wijmo.chart.Legend",WjFlexChartLegendBehavior.parentProp="legend",WjFlexChartLegendBehavior.parentInCtor=!0,WjFlexChartLegendBehavior.classCtor=function(){return wjcChart.Legend},exports.WjFlexChartLegend=WjFlexChartLegendBehavior.register();class WjFlexChartDataLabelBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartDataLabelBehavior.tag="wj-flex-chart-data-label",WjFlexChartDataLabelBehavior.className="wijmo.chart.DataLabel",WjFlexChartDataLabelBehavior.parentProp="dataLabel",WjFlexChartDataLabelBehavior.classCtor=function(){return wjcChart.DataLabel},exports.WjFlexChartDataLabel=WjFlexChartDataLabelBehavior.register();class WjFlexPieDataLabelBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexPieDataLabelBehavior.tag="wj-flex-pie-data-label",WjFlexPieDataLabelBehavior.className="wijmo.chart.PieDataLabel",WjFlexPieDataLabelBehavior.parentProp="dataLabel",WjFlexPieDataLabelBehavior.classCtor=function(){return wjcChart.PieDataLabel},exports.WjFlexPieDataLabel=WjFlexPieDataLabelBehavior.register();class WjFlexChartSeriesBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartSeriesBehavior.tag="wj-flex-chart-series",WjFlexChartSeriesBehavior.className="wijmo.chart.Series",WjFlexChartSeriesBehavior.parentProp="series",WjFlexChartSeriesBehavior.siblingId="series",WjFlexChartSeriesBehavior.classCtor=function(){return wjcChart.Series},exports.WjFlexChartSeries=WjFlexChartSeriesBehavior.register();class WjFlexChartLineMarkerBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartLineMarkerBehavior.tag="wj-flex-chart-line-marker",WjFlexChartLineMarkerBehavior.className="wijmo.chart.LineMarker",WjFlexChartLineMarkerBehavior.parentInCtor=!0,WjFlexChartLineMarkerBehavior.classCtor=function(){return wjcChart.LineMarker},exports.WjFlexChartLineMarker=WjFlexChartLineMarkerBehavior.register();class WjFlexChartDataPointBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartDataPointBehavior.tag="wj-flex-chart-data-point",WjFlexChartDataPointBehavior.className="wijmo.chart.DataPoint",WjFlexChartDataPointBehavior.parentProp="",WjFlexChartDataPointBehavior.classCtor=function(){return wjcChart.DataPoint},exports.WjFlexChartDataPoint=WjFlexChartDataPointBehavior.register();class WjFlexChartPlotAreaBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartPlotAreaBehavior.tag="wj-flex-chart-plot-area",WjFlexChartPlotAreaBehavior.className="wijmo.chart.PlotArea",WjFlexChartPlotAreaBehavior.parentProp="plotAreas",WjFlexChartPlotAreaBehavior.classCtor=function(){return wjcChart.PlotArea},exports.WjFlexChartPlotArea=WjFlexChartPlotAreaBehavior.register();