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

"use strict";var __extends=this&&this.__extends||function(){var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(e,t)};return function(e,t){function a(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_chart_1=require("wijmo/wijmo.angular.chart"),mNg=require("angular"),wjcChartHierarchical=require("wijmo/wijmo.chart.hierarchical"),wjNg=mNg,wijmoChartHierarchicalName="wj.chart.hierarchical";exports.ngModuleName=wijmoChartHierarchicalName;var wijmoChartHierarchical=wijmo_angular_base_1._registerNgModule(wijmoChartHierarchicalName);wijmo_angular_base_1.softRefChartHierarchical&&(wijmoChartHierarchical.directive("wjSunburst",[function(){return new WjSunburst}]),wijmoChartHierarchical.directive("wjTreeMap",[function(){return new WjTreeMap}]));var WjSunburst=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartHierarchical.Sunburst},enumerable:!0,configurable:!0}),e}(wijmo_angular_chart_1.WjFlexPie);exports.WjSunburst=WjSunburst;var WjTreeMap=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcChartHierarchical.TreeMap},enumerable:!0,configurable:!0}),e.prototype._initProps=function(){r.prototype._initProps.call(this);wijmo_angular_base_1.MetaFactory.findProp("labelContent",this._props).customHandler=function(r,e,t,a,n){null!=t&&(e.dataLabel.content=t)}},e}(wijmo_angular_chart_1.WjFlexChartBase);exports.WjTreeMap=WjTreeMap;