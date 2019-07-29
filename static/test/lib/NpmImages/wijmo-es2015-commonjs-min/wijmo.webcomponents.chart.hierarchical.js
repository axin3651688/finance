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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcChartHierarchical=require("wijmo/wijmo.chart.hierarchical");let _wj_ns_exists_5=!0;class WjcSunburst extends wjcChartHierarchical.Sunburst{constructor(){super(document.createElement("div")),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,s){this._wjBehaviour.lhAttributeChanged(e,t,s)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}}exports.WjcSunburst=WjcSunburst,_wj_ns_exists_5&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-sunburst",WjcSunburst);class WjcTreeMap extends wjcChartHierarchical.TreeMap{constructor(){super(document.createElement("div")),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,s){this._wjBehaviour.lhAttributeChanged(e,t,s)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}}exports.WjcTreeMap=WjcTreeMap,_wj_ns_exists_5&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-tree-map",WjcTreeMap);