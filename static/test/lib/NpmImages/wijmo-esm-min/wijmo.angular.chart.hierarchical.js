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

var __extends=this&&this.__extends||function(){var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var e in t)t.hasOwnProperty(e)&&(r[e]=t[e])})(t,e)};return function(t,e){function a(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}}();import{_registerNgModule,MetaFactory,softRefChartHierarchical}from"wijmo/wijmo.angular.base";import{WjFlexChartBase,WjFlexPie}from"wijmo/wijmo.angular.chart";import*as mNg from"angular";import*as wjcChartHierarchical from"wijmo/wijmo.chart.hierarchical";var wjNg=mNg,wijmoChartHierarchicalName="wj.chart.hierarchical";export var ngModuleName=wijmoChartHierarchicalName;var wijmoChartHierarchical=_registerNgModule(wijmoChartHierarchicalName);softRefChartHierarchical&&(wijmoChartHierarchical.directive("wjSunburst",[function(){return new WjSunburst}]),wijmoChartHierarchical.directive("wjTreeMap",[function(){return new WjTreeMap}]));var WjSunburst=function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return __extends(t,r),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcChartHierarchical.Sunburst},enumerable:!0,configurable:!0}),t}(WjFlexPie);export{WjSunburst};var WjTreeMap=function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return __extends(t,r),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcChartHierarchical.TreeMap},enumerable:!0,configurable:!0}),t.prototype._initProps=function(){r.prototype._initProps.call(this);MetaFactory.findProp("labelContent",this._props).customHandler=function(r,t,e,a,o){null!=e&&(t.dataLabel.content=e)}},t}(WjFlexChartBase);export{WjTreeMap};