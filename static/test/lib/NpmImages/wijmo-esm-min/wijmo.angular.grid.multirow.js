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

var __extends=this&&this.__extends||function(){var r=function(o,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,o){r.__proto__=o}||function(r,o){for(var t in o)o.hasOwnProperty(t)&&(r[t]=o[t])})(o,t)};return function(o,t){function i(){this.constructor=o}r(o,t),o.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}}();import{_registerNgModule,softRefGridMultirow}from"wijmo/wijmo.angular.base";import{WjFlexGrid}from"wijmo/wijmo.angular.grid";import*as mNg from"angular";import*as wjcGridMultirow from"wijmo/wijmo.grid.multirow";var wjNg=mNg,wijmoGridMultirowName="wj.grid.multirow";export var ngModuleName=wijmoGridMultirowName;var wijmoGridMultirow=_registerNgModule(wijmoGridMultirowName);softRefGridMultirow()&&wijmoGridMultirow.directive("wjMultiRow",["$compile","$interpolate",function(r,o){return new WjMultiRow(r,o)}]);var WjMultiRow=function(r){function o(o,t){return r.call(this,o,t)||this}return __extends(o,r),Object.defineProperty(o.prototype,"_controlConstructor",{get:function(){return wjcGridMultirow.MultiRow},enumerable:!0,configurable:!0}),o}(WjFlexGrid);export{WjMultiRow};