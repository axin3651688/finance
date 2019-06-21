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

"use strict";var __extends=this&&this.__extends||function(){var t=function(o,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var e in o)o.hasOwnProperty(e)&&(t[e]=o[e])})(o,e)};return function(o,e){function n(){this.constructor=o}t(o,e),o.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_1=require("wijmo/wijmo"),mKo=require("knockout"),wjKo=mKo,wjTooltip=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._getControlConstructor=function(){return wijmo_1.Tooltip},o.prototype._createControl=function(o){return t.prototype._createControl.call(this,null)},o.prototype._createWijmoContext=function(){return new WjTooltipContext(this)},o}(wijmo_knockout_base_1.WjBinding);exports.wjTooltip=wjTooltip;var WjTooltipContext=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype.update=function(o,e,n,r,i){t.prototype.update.call(this,o,e,n,r,i),this._updateTooltip()},o.prototype._updateTooltip=function(){this.control.setTooltip(this.element,wjKo.unwrap(this.valueAccessor()))},o}(wijmo_knockout_base_1.WjContext);exports.WjTooltipContext=WjTooltipContext,wjKo.bindingHandlers.wjTooltip=new wjTooltip;