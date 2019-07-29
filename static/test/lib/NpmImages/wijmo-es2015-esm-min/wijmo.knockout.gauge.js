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

import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcGauge from"wijmo/wijmo.gauge";var wjKo=mKo;export class WjGaugeBinding extends WjBinding{_getControlConstructor(){return wjcGauge.Gauge}};export class wjLinearGauge extends WjGaugeBinding{_getControlConstructor(){return wjcGauge.LinearGauge}};export class wjBulletGraph extends wjLinearGauge{_getControlConstructor(){return wjcGauge.BulletGraph}};export class wjRadialGauge extends WjGaugeBinding{_getControlConstructor(){return wjcGauge.RadialGauge}};export class wjRange extends WjBinding{_getControlConstructor(){return wjcGauge.Range}_createControl(e){return new wjcGauge.Range}};wjKo.bindingHandlers.wjLinearGauge=new wjLinearGauge,wjKo.bindingHandlers.wjBulletGraph=new wjBulletGraph,wjKo.bindingHandlers.wjRadialGauge=new wjRadialGauge,wjKo.bindingHandlers.wjRange=new wjRange;