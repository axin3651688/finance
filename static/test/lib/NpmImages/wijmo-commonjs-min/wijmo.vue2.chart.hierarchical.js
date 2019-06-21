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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcChartHierarchical=require("wijmo/wijmo.chart.hierarchical"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjSunburstBehavior=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._updateControl=function(e,r){switch(e){case"tooltipContent":this.control.tooltip.content=r;break;case"labelContent":this.control.dataLabel.content=r;break;default:t.prototype._updateControl.call(this,e,r)}},e.tag="wj-sunburst",e.className="wijmo.chart.hierarchical.Sunburst",e.extraProps=["tooltipContent","labelContent"],e.classCtor=function(){return wjcChartHierarchical.Sunburst},e}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjSunburst=WjSunburstBehavior.register();var WjTreeMapBehavior=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._updateControl=function(e,r){switch(e){case"tooltipContent":this.control.tooltip.content=r;break;case"labelContent":this.control.dataLabel.content=r;break;default:t.prototype._updateControl.call(this,e,r)}},e.tag="wj-tree-map",e.className="wijmo.chart.hierarchical.TreeMap",e.extraProps=["tooltipContent","labelContent"],e.classCtor=function(){return wjcChartHierarchical.TreeMap},e}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjTreeMap=WjTreeMapBehavior.register();