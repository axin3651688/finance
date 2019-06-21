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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcChartFinance=require("wijmo/wijmo.chart.finance");let _wj_ns_exists_4=!0;class WjcFinancialChart extends wjcChartFinance.FinancialChart{constructor(){super(document.createElement("div")),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,i){this._wjBehaviour.lhAttributeChanged(e,t,i)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}}exports.WjcFinancialChart=WjcFinancialChart,_wj_ns_exists_4&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-financial-chart",WjcFinancialChart);class WjcFinancialChartSeries extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,i){this._wjBehaviour.lhAttributeChanged(e,t,i)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFinancialChartSeries.wrappedClass=(()=>wjcChartFinance.FinancialSeries),WjcFinancialChartSeries.parentProp="series",WjcFinancialChartSeries.siblingId="series",exports.WjcFinancialChartSeries=WjcFinancialChartSeries,_wj_ns_exists_4&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-financial-chart-series",WjcFinancialChartSeries);