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

var __extends=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])})(t,e)};return function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcGauge from"wijmo/wijmo.gauge";var wjKo=mKo,WjGaugeBinding=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype._getControlConstructor=function(){return wjcGauge.Gauge},t}(WjBinding);export{WjGaugeBinding};var wjLinearGauge=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype._getControlConstructor=function(){return wjcGauge.LinearGauge},t}(WjGaugeBinding);export{wjLinearGauge};var wjBulletGraph=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype._getControlConstructor=function(){return wjcGauge.BulletGraph},t}(wjLinearGauge);export{wjBulletGraph};var wjRadialGauge=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype._getControlConstructor=function(){return wjcGauge.RadialGauge},t}(WjGaugeBinding);export{wjRadialGauge};var wjRange=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype._getControlConstructor=function(){return wjcGauge.Range},t.prototype._createControl=function(n){return new wjcGauge.Range},t}(WjBinding);export{wjRange};wjKo.bindingHandlers.wjLinearGauge=new wjLinearGauge,wjKo.bindingHandlers.wjBulletGraph=new wjBulletGraph,wjKo.bindingHandlers.wjRadialGauge=new wjRadialGauge,wjKo.bindingHandlers.wjRange=new wjRange;