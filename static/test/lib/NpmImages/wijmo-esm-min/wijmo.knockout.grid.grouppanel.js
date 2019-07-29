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

var __extends=this&&this.__extends||function(){var o=function(n,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,n){o.__proto__=n}||function(o,n){for(var t in n)n.hasOwnProperty(t)&&(o[t]=n[t])})(n,t)};return function(n,t){function r(){this.constructor=n}o(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcGroup from"wijmo/wijmo.grid.grouppanel";var wjKo=mKo,wjGroupPanel=function(o){function n(){return null!==o&&o.apply(this,arguments)||this}return __extends(n,o),n.prototype._getControlConstructor=function(){return wjcGroup.GroupPanel},n}(WjBinding);export{wjGroupPanel};wjKo.bindingHandlers.wjGroupPanel=new wjGroupPanel;