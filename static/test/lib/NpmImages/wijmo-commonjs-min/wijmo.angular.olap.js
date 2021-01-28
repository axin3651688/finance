﻿/*!
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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_grid_1=require("wijmo/wijmo.angular.grid"),mNg=require("angular"),wjcOlap=require("wijmo/wijmo.olap"),wjNg=mNg,wijmoOlapName="wj.olap";exports.ngModuleName=wijmoOlapName;var wijmoOlap=wijmo_angular_base_1._registerNgModule(wijmoOlapName);wijmo_angular_base_1.softRefOlap()&&wijmo_angular_base_1.softRefOlap().PivotGrid&&(wijmoOlap.directive("wjPivotGrid",["$compile","$interpolate",function(e,t){return new WjPivotGrid(e,t)}]),wijmoOlap.directive("wjPivotChart",[function(){return new WjPivotChart}]),wijmoOlap.directive("wjPivotPanel",[function(){return new WjPivotPanel}]),wijmoOlap.directive("wjSlicer",[function(){return new WjSlicer}]));var WjPivotGrid=function(e){function t(t,r){return e.call(this,t,r)||this}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcOlap.PivotGrid},enumerable:!0,configurable:!0}),t}(wijmo_angular_grid_1.WjFlexGrid);exports.WjPivotGrid=WjPivotGrid;var WjPivotChart=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcOlap.PivotChart},enumerable:!0,configurable:!0}),t}(wijmo_angular_base_1.WjDirective);exports.WjPivotChart=WjPivotChart;var WjPivotPanel=function(e){function t(){var t=e.call(this)||this;return t.transclude=!0,t.template="<div ng-transclude />",t}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcOlap.PivotPanel},enumerable:!0,configurable:!0}),t}(wijmo_angular_base_1.WjDirective);exports.WjPivotPanel=WjPivotPanel;var WjSlicer=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcOlap.Slicer},enumerable:!0,configurable:!0}),t}(wijmo_angular_base_1.WjDirective);exports.WjSlicer=WjSlicer;