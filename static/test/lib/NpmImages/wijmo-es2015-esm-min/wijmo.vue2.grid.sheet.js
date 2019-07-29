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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGridSheet from"wijmo/wijmo.grid.sheet";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjFlexSheetBehavior extends WjComponentBehavior{}WjFlexSheetBehavior.tag="wj-flex-sheet",WjFlexSheetBehavior.className="wijmo.grid.sheet.FlexSheet",WjFlexSheetBehavior.classCtor=function(){return wjcGridSheet.FlexSheet};export var WjFlexSheet=WjFlexSheetBehavior.register();class WjSheetBehavior extends WjComponentBehavior{}WjSheetBehavior.tag="wj-sheet",WjSheetBehavior.className="wijmo.grid.sheet.Sheet",WjSheetBehavior.parentProp="sheets",WjSheetBehavior.parentInCtor=!0,WjSheetBehavior.classCtor=function(){return wjcGridSheet.Sheet};export var WjSheet=WjSheetBehavior.register();