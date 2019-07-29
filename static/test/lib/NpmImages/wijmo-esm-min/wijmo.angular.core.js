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

var __extends=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function n(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();import{WjDirective,WjLink,_registerNgModule}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcCore from"wijmo/wijmo";var wjNg=mNg,wijmoContainersName="wj.container";export var ngModuleName=wijmoContainersName;var wijmoContainers=_registerNgModule(wijmoContainersName);wijmoContainers.directive("wjTooltip",[function(){return new WjTooltip}]),wijmoContainers.directive("wjValidationError",[function(){return new WjValidationError}]);var WjTooltip=function(t){function o(){var o=t.call(this)||this;return o.restrict="A",o.template="",o}return __extends(o,t),Object.defineProperty(o.prototype,"_controlConstructor",{get:function(){return wjcCore.Tooltip},enumerable:!0,configurable:!0}),o.prototype._initControl=function(t){return new wjcCore.Tooltip},o.prototype._createLink=function(){return new WjTooltipLink},o}(WjDirective);export{WjTooltip};var WjTooltipLink=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._link=function(){t.prototype._link.call(this);var o=this.control,r=this;this.tAttrs.$observe("wjTooltip",function(t){o.setTooltip(r.tElement[0],t)})},o}(WjLink),WjValidationError=function(t){function o(){var o=t.call(this)||this;return o.restrict="A",o.template="",o.require="ngModel",o.scope=!1,o}return __extends(o,t),o.prototype._postLinkFn=function(){return function(t,o,r,n){var e="wjValidationError";t.$watch(r[e],function(t){var r="INPUT"==o[0].tagName?o[0]:o[0].querySelector("input");"boolean"==typeof t&&(t=t?"error":""),r&&r.setCustomValidity&&r.setCustomValidity(t),n&&n.$setValidity(e,!t)})}},o.prototype._getMetaDataId=function(){return"ValidationError"},o}(WjDirective);export{WjValidationError};