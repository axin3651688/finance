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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcNav=require("wijmo/wijmo.nav"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjTreeViewBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjTreeViewBehavior.tag="wj-tree-view",WjTreeViewBehavior.className="wijmo.nav.TreeView",WjTreeViewBehavior.classCtor=function(){return wjcNav.TreeView},exports.WjTreeView=WjTreeViewBehavior.register();