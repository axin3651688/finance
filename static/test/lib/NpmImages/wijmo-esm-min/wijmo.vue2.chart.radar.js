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

var __extends=this&&this.__extends||function(){var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(e,t)};return function(e,t){function a(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChartRadar from"wijmo/wijmo.chart.radar";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjFlexRadarBehavior=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),e.prototype._updateControl=function(e,t){switch(e){case"tooltipContent":this.control.tooltip.content=t;break;case"labelContent":this.control.dataLabel.content=t;break;default:r.prototype._updateControl.call(this,e,t)}},e.tag="wj-flex-radar",e.className="wijmo.chart.radar.FlexRadar",e.extraProps=["tooltipContent","labelContent"],e.classCtor=function(){return wjcChartRadar.FlexRadar},e}(WjComponentBehavior);export var WjFlexRadar=WjFlexRadarBehavior.register();var WjFlexRadarAxisBehavior=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),e.tag="wj-flex-radar-axis",e.className="wijmo.chart.radar.FlexRadarAxis",e.parentProp="axes",e.classCtor=function(){return wjcChartRadar.FlexRadarAxis},e}(WjComponentBehavior);export var WjFlexRadarAxis=WjFlexRadarAxisBehavior.register();var WjFlexRadarSeriesBehavior=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),e.tag="wj-flex-radar-series",e.className="wijmo.chart.radar.FlexRadarSeries",e.parentProp="series",e.siblingId="series",e.classCtor=function(){return wjcChartRadar.FlexRadarSeries},e}(WjComponentBehavior);export var WjFlexRadarSeries=WjFlexRadarSeriesBehavior.register();