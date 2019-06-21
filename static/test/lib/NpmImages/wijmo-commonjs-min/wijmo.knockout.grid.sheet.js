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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_grid_1=require("wijmo/wijmo.knockout.grid"),mKo=require("knockout"),wjcSheet=require("wijmo/wijmo.grid.sheet"),wjKo=mKo,wjFlexSheet=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._getControlConstructor=function(){return wjcSheet.FlexSheet},e}(wijmo_knockout_grid_1.wjFlexGrid);exports.wjFlexSheet=wjFlexSheet;var wjSheet=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._getControlConstructor=function(){return wjcSheet.Sheet},e.prototype._createWijmoContext=function(){return new WjSheetContext(this)},e}(wijmo_knockout_base_1.WjBinding);exports.wjSheet=wjSheet;var WjSheetContext=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._initControl=function(){t.prototype._initControl.call(this);var e=this.valueAccessor(),o=this.parentWjContext.control,n=wjKo.unwrap(e.itemsSource),r=wjKo.unwrap(e.name);return n?o.addBoundSheet(r,n):o.addUnboundSheet(r,+wjKo.unwrap(e.rowCount),+wjKo.unwrap(e.columnCount))},e}(wijmo_knockout_base_1.WjContext);exports.WjSheetContext=WjSheetContext,wjKo.bindingHandlers.wjFlexSheet=new wjFlexSheet,wjKo.bindingHandlers.wjSheet=new wjSheet;