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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcCore=require("wijmo/wijmo"),wjcGrid=require("wijmo/wijmo.grid");function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}var FlexGrid=function(t){function e(e){return t.call(this,e,wjcGrid.FlexGrid,{objectProps:["childItemsPath","mergeManager","itemsSource","virtualizationThreshold"]})||this}return __extends(e,t),e}(wijmo_react_base_1.ComponentBase);exports.FlexGrid=FlexGrid;var FlexGridColumn=function(t){function e(e){var r=t.call(this,e,wjcGrid.Column,{objectProps:["dataMap"]})||this;return r._parentProp="columns",r}return __extends(e,t),e.prototype._initParent=function(){var e=this.parent.control;e.autoGenerateColumns&&(e.autoGenerateColumns=!1,e.columns.clear()),t.prototype._initParent.call(this)},e}(wijmo_react_base_1.ComponentBase);exports.FlexGridColumn=FlexGridColumn;