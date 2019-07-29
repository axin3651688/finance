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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcGauge=require("wijmo/wijmo.gauge"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjLinearGaugeBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjLinearGaugeBehavior.tag="wj-linear-gauge",WjLinearGaugeBehavior.className="wijmo.gauge.LinearGauge",WjLinearGaugeBehavior.classCtor=function(){return wjcGauge.LinearGauge},exports.WjLinearGauge=WjLinearGaugeBehavior.register();class WjBulletGraphBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjBulletGraphBehavior.tag="wj-bullet-graph",WjBulletGraphBehavior.className="wijmo.gauge.BulletGraph",WjBulletGraphBehavior.classCtor=function(){return wjcGauge.BulletGraph},exports.WjBulletGraph=WjBulletGraphBehavior.register();class WjRadialGaugeBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjRadialGaugeBehavior.tag="wj-radial-gauge",WjRadialGaugeBehavior.className="wijmo.gauge.RadialGauge",WjRadialGaugeBehavior.classCtor=function(){return wjcGauge.RadialGauge},exports.WjRadialGauge=WjRadialGaugeBehavior.register();class WjRangeBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjRangeBehavior.tag="wj-range",WjRangeBehavior.className="wijmo.gauge.Range",WjRangeBehavior.parentProp="ranges",WjRangeBehavior.classCtor=function(){return wjcGauge.Range},exports.WjRange=WjRangeBehavior.register();