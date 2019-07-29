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

import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcChartFinance from"wijmo/wijmo.chart.finance";let _wj_ns_exists_4=!0;export class WjcFinancialChart extends wjcChartFinance.FinancialChart{constructor(){super(document.createElement("div")),this._wjBehaviour=WjComponentBehavior._attach(this)}static get observedAttributes(){return WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,i){this._wjBehaviour.lhAttributeChanged(e,t,i)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}};_wj_ns_exists_4&&WjComponentBehavior.register("wjc-financial-chart",WjcFinancialChart);export class WjcFinancialChartSeries extends HTMLElement{constructor(){super(),this._wjBehaviour=WjComponentBehavior._attach(this)}static get observedAttributes(){return WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,i){this._wjBehaviour.lhAttributeChanged(e,t,i)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}};WjcFinancialChartSeries.wrappedClass=(()=>wjcChartFinance.FinancialSeries),WjcFinancialChartSeries.parentProp="series",WjcFinancialChartSeries.siblingId="series",_wj_ns_exists_4&&WjComponentBehavior.register("wjc-financial-chart-series",WjcFinancialChartSeries);