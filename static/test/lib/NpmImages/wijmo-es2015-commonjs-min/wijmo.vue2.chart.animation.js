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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcChartAnimation=require("wijmo/wijmo.chart.animation"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjFlexChartAnimationBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexChartAnimationBehavior.tag="wj-flex-chart-animation",WjFlexChartAnimationBehavior.className="wijmo.chart.animation.ChartAnimation",WjFlexChartAnimationBehavior.parentInCtor=!0,WjFlexChartAnimationBehavior.classCtor=function(){return wjcChartAnimation.ChartAnimation},exports.WjFlexChartAnimation=WjFlexChartAnimationBehavior.register();