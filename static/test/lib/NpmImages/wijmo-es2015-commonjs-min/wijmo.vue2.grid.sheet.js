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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcGridSheet=require("wijmo/wijmo.grid.sheet"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjFlexSheetBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexSheetBehavior.tag="wj-flex-sheet",WjFlexSheetBehavior.className="wijmo.grid.sheet.FlexSheet",WjFlexSheetBehavior.classCtor=function(){return wjcGridSheet.FlexSheet},exports.WjFlexSheet=WjFlexSheetBehavior.register();class WjSheetBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjSheetBehavior.tag="wj-sheet",WjSheetBehavior.className="wijmo.grid.sheet.Sheet",WjSheetBehavior.parentProp="sheets",WjSheetBehavior.parentInCtor=!0,WjSheetBehavior.classCtor=function(){return wjcGridSheet.Sheet},exports.WjSheet=WjSheetBehavior.register();