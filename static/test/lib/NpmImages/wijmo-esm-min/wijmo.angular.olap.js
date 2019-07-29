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

var __extends=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function o(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();import{WjDirective,_registerNgModule,softRefOlap}from"wijmo/wijmo.angular.base";import{WjFlexGrid}from"wijmo/wijmo.angular.grid";import*as mNg from"angular";import*as wjcOlap from"wijmo/wijmo.olap";var wjNg=mNg,wijmoOlapName="wj.olap";export var ngModuleName=wijmoOlapName;var wijmoOlap=_registerNgModule(wijmoOlapName);softRefOlap()&&softRefOlap().PivotGrid&&(wijmoOlap.directive("wjPivotGrid",["$compile","$interpolate",function(t,r){return new WjPivotGrid(t,r)}]),wijmoOlap.directive("wjPivotChart",[function(){return new WjPivotChart}]),wijmoOlap.directive("wjPivotPanel",[function(){return new WjPivotPanel}]),wijmoOlap.directive("wjSlicer",[function(){return new WjSlicer}]));var WjPivotGrid=function(t){function r(r,e){return t.call(this,r,e)||this}return __extends(r,t),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcOlap.PivotGrid},enumerable:!0,configurable:!0}),r}(WjFlexGrid);export{WjPivotGrid};var WjPivotChart=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return __extends(r,t),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcOlap.PivotChart},enumerable:!0,configurable:!0}),r}(WjDirective);export{WjPivotChart};var WjPivotPanel=function(t){function r(){var r=t.call(this)||this;return r.transclude=!0,r.template="<div ng-transclude />",r}return __extends(r,t),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcOlap.PivotPanel},enumerable:!0,configurable:!0}),r}(WjDirective);export{WjPivotPanel};var WjSlicer=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return __extends(r,t),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcOlap.Slicer},enumerable:!0,configurable:!0}),r}(WjDirective);export{WjSlicer};