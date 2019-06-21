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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcCore=require("wijmo/wijmo"),wjcGrid=require("wijmo/wijmo.grid"),vue_1=require("vue");function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}exports.Vue=vue_1.default||VueModule;class WjFlexGridBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexGridBehavior.tag="wj-flex-grid",WjFlexGridBehavior.className="wijmo.grid.FlexGrid",WjFlexGridBehavior.classCtor=function(){return wjcGrid.FlexGrid},exports.WjFlexGrid=WjFlexGridBehavior.register();class WjFlexGridColumnBehavior extends wijmo_vue2_base_1.WjComponentBehavior{_initParent(){var e=this.parent.control;e.autoGenerateColumns&&(e.autoGenerateColumns=!1,e.columns.clear()),super._initParent()}}WjFlexGridColumnBehavior.tag="wj-flex-grid-column",WjFlexGridColumnBehavior.className="wijmo.grid.Column",WjFlexGridColumnBehavior.parentProp="columns",WjFlexGridColumnBehavior.classCtor=function(){return wjcGrid.Column},exports.WjFlexGridColumn=WjFlexGridColumnBehavior.register();