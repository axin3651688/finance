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

"use strict";var __extends=this&&this.__extends||function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=require("knockout"),wjcGauge=require("wijmo/wijmo.gauge"),wjKo=mKo,WjGaugeBinding=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return __extends(e,n),e.prototype._getControlConstructor=function(){return wjcGauge.Gauge},e}(wijmo_knockout_base_1.WjBinding);exports.WjGaugeBinding=WjGaugeBinding;var wjLinearGauge=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return __extends(e,n),e.prototype._getControlConstructor=function(){return wjcGauge.LinearGauge},e}(WjGaugeBinding);exports.wjLinearGauge=wjLinearGauge;var wjBulletGraph=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return __extends(e,n),e.prototype._getControlConstructor=function(){return wjcGauge.BulletGraph},e}(wjLinearGauge);exports.wjBulletGraph=wjBulletGraph;var wjRadialGauge=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return __extends(e,n),e.prototype._getControlConstructor=function(){return wjcGauge.RadialGauge},e}(WjGaugeBinding);exports.wjRadialGauge=wjRadialGauge;var wjRange=function(n){function e(){return null!==n&&n.apply(this,arguments)||this}return __extends(e,n),e.prototype._getControlConstructor=function(){return wjcGauge.Range},e.prototype._createControl=function(n){return new wjcGauge.Range},e}(wijmo_knockout_base_1.WjBinding);exports.wjRange=wjRange,wjKo.bindingHandlers.wjLinearGauge=new wjLinearGauge,wjKo.bindingHandlers.wjBulletGraph=new wjBulletGraph,wjKo.bindingHandlers.wjRadialGauge=new wjRadialGauge,wjKo.bindingHandlers.wjRange=new wjRange;