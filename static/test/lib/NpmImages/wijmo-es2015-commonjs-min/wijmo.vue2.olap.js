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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcOlap=require("wijmo/wijmo.olap"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjPivotGridBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjPivotGridBehavior.tag="wj-pivot-grid",WjPivotGridBehavior.className="wijmo.olap.PivotGrid",WjPivotGridBehavior.classCtor=function(){return wjcOlap.PivotGrid},exports.WjPivotGrid=WjPivotGridBehavior.register();class WjPivotChartBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjPivotChartBehavior.tag="wj-pivot-chart",WjPivotChartBehavior.className="wijmo.olap.PivotChart",WjPivotChartBehavior.classCtor=function(){return wjcOlap.PivotChart},exports.WjPivotChart=WjPivotChartBehavior.register();class WjPivotPanelBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjPivotPanelBehavior.tag="wj-pivot-panel",WjPivotPanelBehavior.className="wijmo.olap.PivotPanel",WjPivotPanelBehavior.classCtor=function(){return wjcOlap.PivotPanel},exports.WjPivotPanel=WjPivotPanelBehavior.register();class WjSlicerBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjSlicerBehavior.tag="wj-slicer",WjSlicerBehavior.className="wijmo.olap.Slicer",WjSlicerBehavior.classCtor=function(){return wjcOlap.Slicer},exports.WjSlicer=WjSlicerBehavior.register();