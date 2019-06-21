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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcGridSheet=require("wijmo/wijmo.grid.sheet");let _wj_ns_exists_13=!0;class WjcFlexSheet extends wjcGridSheet.FlexSheet{constructor(){super(document.createElement("div")),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,o){this._wjBehaviour.lhAttributeChanged(e,t,o)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}addEventListener(...e){"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):super.addEventListener.apply(this,e)}}exports.WjcFlexSheet=WjcFlexSheet,_wj_ns_exists_13&&(wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridSheet._TabHolder),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridSheet._ContextMenu),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridSheet._SheetContextMenu),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridSheet._SheetTabContextMenu),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridSheet.FlexSheetColumnFilterEditor),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridSheet.FlexSheetValueFilterEditor),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridSheet._SheetTabs),wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-sheet",WjcFlexSheet));class WjcSheet extends HTMLElement{constructor(){super(),this._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(this)}static get observedAttributes(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)}connectedCallback(){this._wjBehaviour.lhConnected()}attributeChangedCallback(e,t,o){this._wjBehaviour.lhAttributeChanged(e,t,o)}disconnectedCallback(){this._wjBehaviour.lhDisconnected()}}WjcSheet.wrappedClass=(()=>wjcGridSheet.Sheet),WjcSheet.parentProp="sheets",WjcSheet.parentInCtor=!0,exports.WjcSheet=WjcSheet,_wj_ns_exists_13&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-sheet",WjcSheet);