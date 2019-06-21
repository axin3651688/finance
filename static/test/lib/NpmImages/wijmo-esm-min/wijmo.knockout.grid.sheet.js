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

var __extends=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();import{WjBinding,WjContext}from"wijmo/wijmo.knockout.base";import{wjFlexGrid}from"wijmo/wijmo.knockout.grid";import*as mKo from"knockout";import*as wjcSheet from"wijmo/wijmo.grid.sheet";var wjKo=mKo,wjFlexSheet=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._getControlConstructor=function(){return wjcSheet.FlexSheet},e}(wjFlexGrid);export{wjFlexSheet};var wjSheet=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._getControlConstructor=function(){return wjcSheet.Sheet},e.prototype._createWijmoContext=function(){return new WjSheetContext(this)},e}(WjBinding);export{wjSheet};var WjSheetContext=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype._initControl=function(){t.prototype._initControl.call(this);var e=this.valueAccessor(),o=this.parentWjContext.control,n=wjKo.unwrap(e.itemsSource),r=wjKo.unwrap(e.name);return n?o.addBoundSheet(r,n):o.addUnboundSheet(r,+wjKo.unwrap(e.rowCount),+wjKo.unwrap(e.columnCount))},e}(WjContext);export{WjSheetContext};wjKo.bindingHandlers.wjFlexSheet=new wjFlexSheet,wjKo.bindingHandlers.wjSheet=new wjSheet;