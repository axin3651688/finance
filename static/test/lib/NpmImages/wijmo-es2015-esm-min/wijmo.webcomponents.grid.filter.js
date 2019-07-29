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

import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcGridFilter from"wijmo/wijmo.grid.filter";let _wj_ns_exists_10=!0;export class WjcFlexGridFilter extends HTMLElement{constructor(){super(),this._wjBehaviour=WjComponentBehavior._attach(this)}static get observedAttributes(){return WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,i){this._wjBehaviour.lhAttributeChanged(e,t,i)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}};WjcFlexGridFilter.wrappedClass=(()=>wjcGridFilter.FlexGridFilter),WjcFlexGridFilter.parentInCtor=!0,_wj_ns_exists_10&&(WjComponentBehavior.register("wjc-flex-grid-filter",WjcFlexGridFilter),WjComponentBehavior.register("",wjcGridFilter.ColumnFilterEditor),WjComponentBehavior.register("",wjcGridFilter.ConditionFilterEditor),WjComponentBehavior.register("",wjcGridFilter.ValueFilterEditor));