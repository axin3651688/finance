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

var __extends=this&&this.__extends||function(){var t=function(r,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var o in r)r.hasOwnProperty(o)&&(t[o]=r[o])})(r,o)};return function(r,o){function n(){this.constructor=r}t(r,o),r.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcFilter from"wijmo/wijmo.grid.filter";var wjKo=mKo,wjFlexGridFilter=function(t){function r(){return null!==t&&t.apply(this,arguments)||this}return __extends(r,t),r.prototype._getControlConstructor=function(){return wjcFilter.FlexGridFilter},r}(WjBinding);export{wjFlexGridFilter};wjKo.bindingHandlers.wjFlexGridFilter=new wjFlexGridFilter;