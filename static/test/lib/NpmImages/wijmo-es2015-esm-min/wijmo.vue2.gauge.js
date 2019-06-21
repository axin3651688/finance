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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGauge from"wijmo/wijmo.gauge";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjLinearGaugeBehavior extends WjComponentBehavior{}WjLinearGaugeBehavior.tag="wj-linear-gauge",WjLinearGaugeBehavior.className="wijmo.gauge.LinearGauge",WjLinearGaugeBehavior.classCtor=function(){return wjcGauge.LinearGauge};export var WjLinearGauge=WjLinearGaugeBehavior.register();class WjBulletGraphBehavior extends WjComponentBehavior{}WjBulletGraphBehavior.tag="wj-bullet-graph",WjBulletGraphBehavior.className="wijmo.gauge.BulletGraph",WjBulletGraphBehavior.classCtor=function(){return wjcGauge.BulletGraph};export var WjBulletGraph=WjBulletGraphBehavior.register();class WjRadialGaugeBehavior extends WjComponentBehavior{}WjRadialGaugeBehavior.tag="wj-radial-gauge",WjRadialGaugeBehavior.className="wijmo.gauge.RadialGauge",WjRadialGaugeBehavior.classCtor=function(){return wjcGauge.RadialGauge};export var WjRadialGauge=WjRadialGaugeBehavior.register();class WjRangeBehavior extends WjComponentBehavior{}WjRangeBehavior.tag="wj-range",WjRangeBehavior.className="wijmo.gauge.Range",WjRangeBehavior.parentProp="ranges",WjRangeBehavior.classCtor=function(){return wjcGauge.Range};export var WjRange=WjRangeBehavior.register();