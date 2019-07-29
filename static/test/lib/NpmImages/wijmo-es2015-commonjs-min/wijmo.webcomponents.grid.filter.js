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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcGridFilter=require("wijmo/wijmo.grid.filter");let _wj_ns_exists_10=!0;class WjcFlexGridFilter extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,i){this._wjBehaviour.lhAttributeChanged(e,t,i)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcFlexGridFilter.wrappedClass=(()=>wjcGridFilter.FlexGridFilter),WjcFlexGridFilter.parentInCtor=!0,exports.WjcFlexGridFilter=WjcFlexGridFilter,_wj_ns_exists_10&&(wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-grid-filter",WjcFlexGridFilter),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridFilter.ColumnFilterEditor),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridFilter.ConditionFilterEditor),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridFilter.ValueFilterEditor));