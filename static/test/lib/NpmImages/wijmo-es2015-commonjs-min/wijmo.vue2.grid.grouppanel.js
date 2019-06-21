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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcGridGrouppanel=require("wijmo/wijmo.grid.grouppanel"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjGroupPanelBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjGroupPanelBehavior.tag="wj-group-panel",WjGroupPanelBehavior.className="wijmo.grid.grouppanel.GroupPanel",WjGroupPanelBehavior.classCtor=function(){return wjcGridGrouppanel.GroupPanel},exports.WjGroupPanel=WjGroupPanelBehavior.register();