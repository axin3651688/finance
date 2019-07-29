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

import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcChartAnimation from"wijmo/wijmo.chart.animation";let _wj_ns_exists_2=!0;export class WjcFlexChartAnimation extends HTMLElement{constructor(){super(),this._wjBehaviour=WjComponentBehavior._attach(this)}static get observedAttributes(){return WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(t,e,i){this._wjBehaviour.lhAttributeChanged(t,e,i)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}};WjcFlexChartAnimation.wrappedClass=(()=>wjcChartAnimation.ChartAnimation),WjcFlexChartAnimation.parentInCtor=!0,_wj_ns_exists_2&&WjComponentBehavior.register("wjc-flex-chart-animation",WjcFlexChartAnimation);