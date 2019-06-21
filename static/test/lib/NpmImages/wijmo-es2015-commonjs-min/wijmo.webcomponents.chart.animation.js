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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcChartAnimation=require("wijmo/wijmo.chart.animation");let _wj_ns_exists_2=!0;class WjcFlexChartAnimation extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,n){this._wjBehaviour.lhAttributeChanged(e,t,n)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexChartAnimation.wrappedClass=(()=>wjcChartAnimation.ChartAnimation),WjcFlexChartAnimation.parentInCtor=!0,exports.WjcFlexChartAnimation=WjcFlexChartAnimation,_wj_ns_exists_2&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-animation",WjcFlexChartAnimation);