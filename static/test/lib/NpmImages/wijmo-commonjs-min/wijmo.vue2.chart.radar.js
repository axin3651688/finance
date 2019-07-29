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

"use strict";var __extends=this&&this.__extends||function(){var e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(r,t)};return function(r,t){function a(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcChartRadar=require("wijmo/wijmo.chart.radar"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjFlexRadarBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.prototype._updateControl=function(r,t){switch(r){case"tooltipContent":this.control.tooltip.content=t;break;case"labelContent":this.control.dataLabel.content=t;break;default:e.prototype._updateControl.call(this,r,t)}},r.tag="wj-flex-radar",r.className="wijmo.chart.radar.FlexRadar",r.extraProps=["tooltipContent","labelContent"],r.classCtor=function(){return wjcChartRadar.FlexRadar},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexRadar=WjFlexRadarBehavior.register();var WjFlexRadarAxisBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-flex-radar-axis",r.className="wijmo.chart.radar.FlexRadarAxis",r.parentProp="axes",r.classCtor=function(){return wjcChartRadar.FlexRadarAxis},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexRadarAxis=WjFlexRadarAxisBehavior.register();var WjFlexRadarSeriesBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-flex-radar-series",r.className="wijmo.chart.radar.FlexRadarSeries",r.parentProp="series",r.siblingId="series",r.classCtor=function(){return wjcChartRadar.FlexRadarSeries},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexRadarSeries=WjFlexRadarSeriesBehavior.register();