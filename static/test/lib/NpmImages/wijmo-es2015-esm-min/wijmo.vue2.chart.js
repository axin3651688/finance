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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChart from"wijmo/wijmo.chart";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjFlexChartBehavior extends WjComponentBehavior{_updateControl(e,a){switch(e){case"tooltipContent":this.control.tooltip.content=a;break;case"labelContent":this.control.dataLabel.content=a;break;default:super._updateControl(e,a)}}}WjFlexChartBehavior.tag="wj-flex-chart",WjFlexChartBehavior.className="wijmo.chart.FlexChart",WjFlexChartBehavior.extraProps=["tooltipContent","labelContent"],WjFlexChartBehavior.classCtor=function(){return wjcChart.FlexChart};export var WjFlexChart=WjFlexChartBehavior.register();class WjFlexPieBehavior extends WjComponentBehavior{_updateControl(e,a){switch(e){case"tooltipContent":this.control.tooltip.content=a;break;case"labelContent":this.control.dataLabel.content=a;break;default:super._updateControl(e,a)}}}WjFlexPieBehavior.tag="wj-flex-pie",WjFlexPieBehavior.className="wijmo.chart.FlexPie",WjFlexPieBehavior.extraProps=["tooltipContent","labelContent"],WjFlexPieBehavior.classCtor=function(){return wjcChart.FlexPie};export var WjFlexPie=WjFlexPieBehavior.register();class WjFlexChartAxisBehavior extends WjComponentBehavior{}WjFlexChartAxisBehavior.tag="wj-flex-chart-axis",WjFlexChartAxisBehavior.className="wijmo.chart.Axis",WjFlexChartAxisBehavior.parentProp="axes",WjFlexChartAxisBehavior.classCtor=function(){return wjcChart.Axis};export var WjFlexChartAxis=WjFlexChartAxisBehavior.register();class WjFlexChartLegendBehavior extends WjComponentBehavior{}WjFlexChartLegendBehavior.tag="wj-flex-chart-legend",WjFlexChartLegendBehavior.className="wijmo.chart.Legend",WjFlexChartLegendBehavior.parentProp="legend",WjFlexChartLegendBehavior.parentInCtor=!0,WjFlexChartLegendBehavior.classCtor=function(){return wjcChart.Legend};export var WjFlexChartLegend=WjFlexChartLegendBehavior.register();class WjFlexChartDataLabelBehavior extends WjComponentBehavior{}WjFlexChartDataLabelBehavior.tag="wj-flex-chart-data-label",WjFlexChartDataLabelBehavior.className="wijmo.chart.DataLabel",WjFlexChartDataLabelBehavior.parentProp="dataLabel",WjFlexChartDataLabelBehavior.classCtor=function(){return wjcChart.DataLabel};export var WjFlexChartDataLabel=WjFlexChartDataLabelBehavior.register();class WjFlexPieDataLabelBehavior extends WjComponentBehavior{}WjFlexPieDataLabelBehavior.tag="wj-flex-pie-data-label",WjFlexPieDataLabelBehavior.className="wijmo.chart.PieDataLabel",WjFlexPieDataLabelBehavior.parentProp="dataLabel",WjFlexPieDataLabelBehavior.classCtor=function(){return wjcChart.PieDataLabel};export var WjFlexPieDataLabel=WjFlexPieDataLabelBehavior.register();class WjFlexChartSeriesBehavior extends WjComponentBehavior{}WjFlexChartSeriesBehavior.tag="wj-flex-chart-series",WjFlexChartSeriesBehavior.className="wijmo.chart.Series",WjFlexChartSeriesBehavior.parentProp="series",WjFlexChartSeriesBehavior.siblingId="series",WjFlexChartSeriesBehavior.classCtor=function(){return wjcChart.Series};export var WjFlexChartSeries=WjFlexChartSeriesBehavior.register();class WjFlexChartLineMarkerBehavior extends WjComponentBehavior{}WjFlexChartLineMarkerBehavior.tag="wj-flex-chart-line-marker",WjFlexChartLineMarkerBehavior.className="wijmo.chart.LineMarker",WjFlexChartLineMarkerBehavior.parentInCtor=!0,WjFlexChartLineMarkerBehavior.classCtor=function(){return wjcChart.LineMarker};export var WjFlexChartLineMarker=WjFlexChartLineMarkerBehavior.register();class WjFlexChartDataPointBehavior extends WjComponentBehavior{}WjFlexChartDataPointBehavior.tag="wj-flex-chart-data-point",WjFlexChartDataPointBehavior.className="wijmo.chart.DataPoint",WjFlexChartDataPointBehavior.parentProp="",WjFlexChartDataPointBehavior.classCtor=function(){return wjcChart.DataPoint};export var WjFlexChartDataPoint=WjFlexChartDataPointBehavior.register();class WjFlexChartPlotAreaBehavior extends WjComponentBehavior{}WjFlexChartPlotAreaBehavior.tag="wj-flex-chart-plot-area",WjFlexChartPlotAreaBehavior.className="wijmo.chart.PlotArea",WjFlexChartPlotAreaBehavior.parentProp="plotAreas",WjFlexChartPlotAreaBehavior.classCtor=function(){return wjcChart.PlotArea};export var WjFlexChartPlotArea=WjFlexChartPlotAreaBehavior.register();