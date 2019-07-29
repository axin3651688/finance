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

"use strict";var __extends=this&&this.__extends||function(){var t=function(o,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var n in o)o.hasOwnProperty(n)&&(t[n]=o[n])})(o,n)};return function(o,n){function r(){this.constructor=o}t(o,n),o.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_grid_1=require("wijmo/wijmo.knockout.grid"),mKo=require("knockout"),wjcOlap=require("wijmo/wijmo.olap"),wjKo=mKo,wjPivotGrid=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._getControlConstructor=function(){return wjcOlap.PivotGrid},o}(wijmo_knockout_grid_1.wjFlexGrid);exports.wjPivotGrid=wjPivotGrid;var wjPivotChart=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._getControlConstructor=function(){return wjcOlap.PivotChart},o}(wijmo_knockout_base_1.WjBinding);exports.wjPivotChart=wjPivotChart;var wjPivotPanel=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._getControlConstructor=function(){return wjcOlap.PivotPanel},o}(wijmo_knockout_base_1.WjBinding);exports.wjPivotPanel=wjPivotPanel;var wjSlicer=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._getControlConstructor=function(){return wjcOlap.Slicer},o}(wijmo_knockout_base_1.WjBinding);exports.wjSlicer=wjSlicer,wjKo.bindingHandlers.wjPivotGrid=new wjPivotGrid,wjKo.bindingHandlers.wjPivotChart=new wjPivotChart,wjKo.bindingHandlers.wjPivotPanel=new wjPivotPanel,wjKo.bindingHandlers.wjSlicer=new wjSlicer;