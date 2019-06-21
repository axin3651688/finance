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

"use strict";var __extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var n in t)t.hasOwnProperty(n)&&(o[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=require("knockout"),wjcGroup=require("wijmo/wijmo.grid.grouppanel"),wjKo=mKo,wjGroupPanel=function(o){function t(){return null!==o&&o.apply(this,arguments)||this}return __extends(t,o),t.prototype._getControlConstructor=function(){return wjcGroup.GroupPanel},t}(wijmo_knockout_base_1.WjBinding);exports.wjGroupPanel=wjGroupPanel,wjKo.bindingHandlers.wjGroupPanel=new wjGroupPanel;