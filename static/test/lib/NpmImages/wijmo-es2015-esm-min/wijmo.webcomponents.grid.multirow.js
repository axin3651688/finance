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

import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcGridMultirow from"wijmo/wijmo.grid.multirow";let _wj_ns_exists_12=!0;export class WjcMultiRow extends wjcGridMultirow.MultiRow{constructor(){super(document.createElement("div")),this._wjBehaviour=WjComponentBehavior._attach(this)}static get observedAttributes(){return WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(t,e,i){this._wjBehaviour.lhAttributeChanged(t,e,i)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...t){"string"==typeof t[0]?HTMLElement.prototype.addEventListener.apply(this,t):super.addEventListener.apply(this,t)}};_wj_ns_exists_12&&WjComponentBehavior.register("wjc-multi-row",WjcMultiRow);