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

var __extends=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function r(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();import{WjBinding}from"wijmo/wijmo.knockout.base";import{wjFlexGrid}from"wijmo/wijmo.knockout.grid";import*as mKo from"knockout";import*as wjcOlap from"wijmo/wijmo.olap";var wjKo=mKo,wjPivotGrid=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcOlap.PivotGrid},n}(wjFlexGrid);export{wjPivotGrid};var wjPivotChart=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcOlap.PivotChart},n}(WjBinding);export{wjPivotChart};var wjPivotPanel=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcOlap.PivotPanel},n}(WjBinding);export{wjPivotPanel};var wjSlicer=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcOlap.Slicer},n}(WjBinding);export{wjSlicer};wjKo.bindingHandlers.wjPivotGrid=new wjPivotGrid,wjKo.bindingHandlers.wjPivotChart=new wjPivotChart,wjKo.bindingHandlers.wjPivotPanel=new wjPivotPanel,wjKo.bindingHandlers.wjSlicer=new wjSlicer;