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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=require("knockout"),wjcGauge=require("wijmo/wijmo.gauge");var wjKo=mKo;class WjGaugeBinding extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcGauge.Gauge}}exports.WjGaugeBinding=WjGaugeBinding;class wjLinearGauge extends WjGaugeBinding{_getControlConstructor(){return wjcGauge.LinearGauge}}exports.wjLinearGauge=wjLinearGauge;class wjBulletGraph extends wjLinearGauge{_getControlConstructor(){return wjcGauge.BulletGraph}}exports.wjBulletGraph=wjBulletGraph;class wjRadialGauge extends WjGaugeBinding{_getControlConstructor(){return wjcGauge.RadialGauge}}exports.wjRadialGauge=wjRadialGauge;class wjRange extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcGauge.Range}_createControl(e){return new wjcGauge.Range}}exports.wjRange=wjRange,wjKo.bindingHandlers.wjLinearGauge=new wjLinearGauge,wjKo.bindingHandlers.wjBulletGraph=new wjBulletGraph,wjKo.bindingHandlers.wjRadialGauge=new wjRadialGauge,wjKo.bindingHandlers.wjRange=new wjRange;