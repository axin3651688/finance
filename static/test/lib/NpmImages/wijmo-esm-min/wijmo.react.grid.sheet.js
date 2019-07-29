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

var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcGridSheet from"wijmo/wijmo.grid.sheet";var FlexSheet=function(t){function e(e){return t.call(this,e,wjcGridSheet.FlexSheet,{objectProps:["childItemsPath","mergeManager","itemsSource","virtualizationThreshold"]})||this}return __extends(e,t),e}(ComponentBase);export{FlexSheet};var Sheet=function(t){function e(e){var r=t.call(this,e,wjcGridSheet.Sheet,{objectProps:["itemsSource"]})||this;return r._parentProp="sheets",r._parentInCtor=!0,r}return __extends(e,t),e}(ComponentBase);export{Sheet};