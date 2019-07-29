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

var __extends=this&&this.__extends||function(){var e=function(r,a){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var a in r)r.hasOwnProperty(a)&&(e[a]=r[a])})(r,a)};return function(r,a){function t(){this.constructor=r}e(r,a),r.prototype=null===a?Object.create(a):(t.prototype=a.prototype,new t)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGauge from"wijmo/wijmo.gauge";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjLinearGaugeBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-linear-gauge",r.className="wijmo.gauge.LinearGauge",r.classCtor=function(){return wjcGauge.LinearGauge},r}(WjComponentBehavior);export var WjLinearGauge=WjLinearGaugeBehavior.register();var WjBulletGraphBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-bullet-graph",r.className="wijmo.gauge.BulletGraph",r.classCtor=function(){return wjcGauge.BulletGraph},r}(WjComponentBehavior);export var WjBulletGraph=WjBulletGraphBehavior.register();var WjRadialGaugeBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-radial-gauge",r.className="wijmo.gauge.RadialGauge",r.classCtor=function(){return wjcGauge.RadialGauge},r}(WjComponentBehavior);export var WjRadialGauge=WjRadialGaugeBehavior.register();var WjRangeBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-range",r.className="wijmo.gauge.Range",r.parentProp="ranges",r.classCtor=function(){return wjcGauge.Range},r}(WjComponentBehavior);export var WjRange=WjRangeBehavior.register();