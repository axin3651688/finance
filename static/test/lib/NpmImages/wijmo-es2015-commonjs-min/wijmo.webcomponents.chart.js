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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcChart=require("wijmo/wijmo.chart");let _wj_ns_exists_8=!0;class WjcFlexChart extends wjcChart.FlexChart{constructor(){super(document.createElement("div")),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}}exports.WjcFlexChart=WjcFlexChart,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart",WjcFlexChart);class WjcFlexPie extends wjcChart.FlexPie{constructor(){super(document.createElement("div")),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}}exports.WjcFlexPie=WjcFlexPie,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-pie",WjcFlexPie);class WjcFlexChartAxis extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartAxis.wrappedClass=(()=>wjcChart.Axis),WjcFlexChartAxis.parentProp="axes",exports.WjcFlexChartAxis=WjcFlexChartAxis,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-axis",WjcFlexChartAxis);class WjcFlexChartLegend extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartLegend.wrappedClass=(()=>wjcChart.Legend),WjcFlexChartLegend.parentProp="legend",WjcFlexChartLegend.parentInCtor=!0,exports.WjcFlexChartLegend=WjcFlexChartLegend,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-legend",WjcFlexChartLegend);class WjcFlexChartDataLabel extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartDataLabel.wrappedClass=(()=>wjcChart.DataLabel),WjcFlexChartDataLabel.parentProp="dataLabel",exports.WjcFlexChartDataLabel=WjcFlexChartDataLabel,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-data-label",WjcFlexChartDataLabel);class WjcFlexPieDataLabel extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexPieDataLabel.wrappedClass=(()=>wjcChart.PieDataLabel),WjcFlexPieDataLabel.parentProp="dataLabel",exports.WjcFlexPieDataLabel=WjcFlexPieDataLabel,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-pie-data-label",WjcFlexPieDataLabel);class WjcFlexChartSeries extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartSeries.wrappedClass=(()=>wjcChart.Series),WjcFlexChartSeries.parentProp="series",WjcFlexChartSeries.siblingId="series",exports.WjcFlexChartSeries=WjcFlexChartSeries,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-series",WjcFlexChartSeries);class WjcFlexChartLineMarker extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartLineMarker.wrappedClass=(()=>wjcChart.LineMarker),WjcFlexChartLineMarker.parentInCtor=!0,exports.WjcFlexChartLineMarker=WjcFlexChartLineMarker,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-line-marker",WjcFlexChartLineMarker);class WjcFlexChartDataPoint extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartDataPoint.wrappedClass=(()=>wjcChart.DataPoint),WjcFlexChartDataPoint.parentProp="",exports.WjcFlexChartDataPoint=WjcFlexChartDataPoint,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-data-point",WjcFlexChartDataPoint);class WjcFlexChartPlotArea extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartPlotArea.wrappedClass=(()=>wjcChart.PlotArea),WjcFlexChartPlotArea.parentProp="plotAreas",exports.WjcFlexChartPlotArea=WjcFlexChartPlotArea,_wj_ns_exists_8&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-plot-area",WjcFlexChartPlotArea);