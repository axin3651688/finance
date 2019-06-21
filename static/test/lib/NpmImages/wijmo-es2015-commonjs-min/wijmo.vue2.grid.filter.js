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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcGridFilter=require("wijmo/wijmo.grid.filter"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjFlexGridFilterBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexGridFilterBehavior.tag="wj-flex-grid-filter",WjFlexGridFilterBehavior.className="wijmo.grid.filter.FlexGridFilter",WjFlexGridFilterBehavior.parentInCtor=!0,WjFlexGridFilterBehavior.classCtor=function(){return wjcGridFilter.FlexGridFilter},exports.WjFlexGridFilter=WjFlexGridFilterBehavior.register();