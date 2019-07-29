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

var __extends=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChartHierarchical from"wijmo/wijmo.chart.hierarchical";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjSunburstBehavior=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._updateControl=function(e,o){switch(e){case"tooltipContent":this.control.tooltip.content=o;break;case"labelContent":this.control.dataLabel.content=o;break;default:t.prototype._updateControl.call(this,e,o)}},e.tag="wj-sunburst",e.className="wijmo.chart.hierarchical.Sunburst",e.extraProps=["tooltipContent","labelContent"],e.classCtor=function(){return wjcChartHierarchical.Sunburst},e}(WjComponentBehavior);export var WjSunburst=WjSunburstBehavior.register();var WjTreeMapBehavior=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._updateControl=function(e,o){switch(e){case"tooltipContent":this.control.tooltip.content=o;break;case"labelContent":this.control.dataLabel.content=o;break;default:t.prototype._updateControl.call(this,e,o)}},e.tag="wj-tree-map",e.className="wijmo.chart.hierarchical.TreeMap",e.extraProps=["tooltipContent","labelContent"],e.classCtor=function(){return wjcChartHierarchical.TreeMap},e}(WjComponentBehavior);export var WjTreeMap=WjTreeMapBehavior.register();