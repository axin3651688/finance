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

import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcChartRadar from"wijmo/wijmo.chart.radar";let _wj_ns_exists_7=!0;export class WjcFlexRadar extends wjcChartRadar.FlexRadar{constructor(){super(document.createElement("div")),this._wjBehaviour=WjComponentBehavior._attach(this)}static get observedAttributes(){return WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}};_wj_ns_exists_7&&WjComponentBehavior.register("wjc-flex-radar",WjcFlexRadar);export class WjcFlexRadarAxis extends HTMLElement{constructor(){super(),this._wjBehaviour=WjComponentBehavior._attach(this)}static get observedAttributes(){return WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}};WjcFlexRadarAxis.wrappedClass=(()=>wjcChartRadar.FlexRadarAxis),WjcFlexRadarAxis.parentProp="axes",_wj_ns_exists_7&&WjComponentBehavior.register("wjc-flex-radar-axis",WjcFlexRadarAxis);export class WjcFlexRadarSeries extends HTMLElement{constructor(){super(),this._wjBehaviour=WjComponentBehavior._attach(this)}static get observedAttributes(){return WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}};WjcFlexRadarSeries.wrappedClass=(()=>wjcChartRadar.FlexRadarSeries),WjcFlexRadarSeries.parentProp="series",WjcFlexRadarSeries.siblingId="series",_wj_ns_exists_7&&WjComponentBehavior.register("wjc-flex-radar-series",WjcFlexRadarSeries);