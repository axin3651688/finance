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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcChartRadar=require("wijmo/wijmo.chart.radar");let _wj_ns_exists_7=!0;class WjcFlexRadar extends wjcChartRadar.FlexRadar{constructor(){super(document.createElement("div")),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}}exports.WjcFlexRadar=WjcFlexRadar,_wj_ns_exists_7&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-radar",WjcFlexRadar);class WjcFlexRadarAxis extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexRadarAxis.wrappedClass=(()=>wjcChartRadar.FlexRadarAxis),WjcFlexRadarAxis.parentProp="axes",exports.WjcFlexRadarAxis=WjcFlexRadarAxis,_wj_ns_exists_7&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-radar-axis",WjcFlexRadarAxis);class WjcFlexRadarSeries extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,a){this._wjBehaviour.lhAttributeChanged(e,t,a)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexRadarSeries.wrappedClass=(()=>wjcChartRadar.FlexRadarSeries),WjcFlexRadarSeries.parentProp="series",WjcFlexRadarSeries.siblingId="series",exports.WjcFlexRadarSeries=WjcFlexRadarSeries,_wj_ns_exists_7&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-radar-series",WjcFlexRadarSeries);