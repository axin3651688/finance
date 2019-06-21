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

var __extends=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function n(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();import{wjFlexGrid}from"wijmo/wijmo.knockout.grid";import*as mKo from"knockout";import*as wjcMultirow from"wijmo/wijmo.grid.multirow";var wjKo=mKo,wjMultiRow=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._getControlConstructor=function(){return wjcMultirow.MultiRow},o}(wjFlexGrid);export{wjMultiRow};wjKo.bindingHandlers.wjMultiRow=new wjMultiRow;