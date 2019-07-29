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

var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();import{WjDirective,_registerNgModule,softRefGridSheet}from"wijmo/wijmo.angular.base";import{WjFlexGrid}from"wijmo/wijmo.angular.grid";import*as mNg from"angular";import*as wjcGridSheet from"wijmo/wijmo.grid.sheet";var wjNg=mNg,wijmoGridSheetName="wj.grid.sheet";export var ngModuleName=wijmoGridSheetName;var wijmoGridSheet=_registerNgModule(wijmoGridSheetName);softRefGridSheet()&&(wijmoGridSheet.directive("wjFlexSheet",["$compile","$interpolate",function(e,t){return new WjFlexSheet(e,t)}]),wijmoGridSheet.directive("wjSheet",[function(){return new WjSheet}]));var WjFlexSheet=function(e){function t(t,r){return e.call(this,t,r)||this}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcGridSheet.FlexSheet},enumerable:!0,configurable:!0}),t}(WjFlexGrid),WjSheet=function(e){function t(){var t=e.call(this)||this;return t.require="^wjFlexSheet",t}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcGridSheet.Sheet},enumerable:!0,configurable:!0}),t.prototype._initControl=function(t){return e.prototype._initControl.call(this,void 0)},t}(WjDirective);