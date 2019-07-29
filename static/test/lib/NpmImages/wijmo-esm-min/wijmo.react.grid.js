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

var __extends=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function e(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}}();import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcCore from"wijmo/wijmo";import*as wjcGrid from"wijmo/wijmo.grid";function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}var FlexGrid=function(t){function o(o){return t.call(this,o,wjcGrid.FlexGrid,{objectProps:["childItemsPath","mergeManager","itemsSource","virtualizationThreshold"]})||this}return __extends(o,t),o}(ComponentBase);export{FlexGrid};var FlexGridColumn=function(t){function o(o){var r=t.call(this,o,wjcGrid.Column,{objectProps:["dataMap"]})||this;return r._parentProp="columns",r}return __extends(o,t),o.prototype._initParent=function(){var o=this.parent.control;o.autoGenerateColumns&&(o.autoGenerateColumns=!1,o.columns.clear()),t.prototype._initParent.call(this)},o}(ComponentBase);export{FlexGridColumn};