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

"use strict";var __extends=this&&this.__extends||function(){var r=function(t,o){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,t){r.__proto__=t}||function(r,t){for(var o in t)t.hasOwnProperty(o)&&(r[o]=t[o])})(t,o)};return function(t,o){function i(){this.constructor=t}r(t,o),t.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_grid_1=require("wijmo/wijmo.angular.grid"),mNg=require("angular"),wjcGridMultirow=require("wijmo/wijmo.grid.multirow"),wjNg=mNg,wijmoGridMultirowName="wj.grid.multirow";exports.ngModuleName=wijmoGridMultirowName;var wijmoGridMultirow=wijmo_angular_base_1._registerNgModule(wijmoGridMultirowName);wijmo_angular_base_1.softRefGridMultirow()&&wijmoGridMultirow.directive("wjMultiRow",["$compile","$interpolate",function(r,t){return new WjMultiRow(r,t)}]);var WjMultiRow=function(r){function t(t,o){return r.call(this,t,o)||this}return __extends(t,r),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcGridMultirow.MultiRow},enumerable:!0,configurable:!0}),t}(wijmo_angular_grid_1.WjFlexGrid);exports.WjMultiRow=WjMultiRow;