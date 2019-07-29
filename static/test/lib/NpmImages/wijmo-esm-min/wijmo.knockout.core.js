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

var __extends=this&&this.__extends||function(){var t=function(o,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var n in o)o.hasOwnProperty(n)&&(t[n]=o[n])})(o,n)};return function(o,n){function e(){this.constructor=o}t(o,n),o.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}();import{WjBinding,WjContext}from"wijmo/wijmo.knockout.base";import{Tooltip}from"wijmo/wijmo";import*as mKo from"knockout";var wjKo=mKo,wjTooltip=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._getControlConstructor=function(){return Tooltip},o.prototype._createControl=function(o){return t.prototype._createControl.call(this,null)},o.prototype._createWijmoContext=function(){return new WjTooltipContext(this)},o}(WjBinding);export{wjTooltip};var WjTooltipContext=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype.update=function(o,n,e,r,i){t.prototype.update.call(this,o,n,e,r,i),this._updateTooltip()},o.prototype._updateTooltip=function(){this.control.setTooltip(this.element,wjKo.unwrap(this.valueAccessor()))},o}(WjContext);export{WjTooltipContext};wjKo.bindingHandlers.wjTooltip=new wjTooltip;