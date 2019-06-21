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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcCore from"wijmo/wijmo";import*as wjcGrid from"wijmo/wijmo.grid";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}class WjFlexGridBehavior extends WjComponentBehavior{}WjFlexGridBehavior.tag="wj-flex-grid",WjFlexGridBehavior.className="wijmo.grid.FlexGrid",WjFlexGridBehavior.classCtor=function(){return wjcGrid.FlexGrid};export var WjFlexGrid=WjFlexGridBehavior.register();class WjFlexGridColumnBehavior extends WjComponentBehavior{_initParent(){var e=this.parent.control;e.autoGenerateColumns&&(e.autoGenerateColumns=!1,e.columns.clear()),super._initParent()}}WjFlexGridColumnBehavior.tag="wj-flex-grid-column",WjFlexGridColumnBehavior.className="wijmo.grid.Column",WjFlexGridColumnBehavior.parentProp="columns",WjFlexGridColumnBehavior.classCtor=function(){return wjcGrid.Column};export var WjFlexGridColumn=WjFlexGridColumnBehavior.register();