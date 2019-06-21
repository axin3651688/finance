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

"use strict";var __extends=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function e(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcCore=require("wijmo/wijmo"),wjNg=mNg,wijmoContainersName="wj.container";exports.ngModuleName=wijmoContainersName;var wijmoContainers=wijmo_angular_base_1._registerNgModule(wijmoContainersName);wijmoContainers.directive("wjTooltip",[function(){return new WjTooltip}]),wijmoContainers.directive("wjValidationError",[function(){return new WjValidationError}]);var WjTooltip=function(t){function o(){var o=t.call(this)||this;return o.restrict="A",o.template="",o}return __extends(o,t),Object.defineProperty(o.prototype,"_controlConstructor",{get:function(){return wjcCore.Tooltip},enumerable:!0,configurable:!0}),o.prototype._initControl=function(t){return new wjcCore.Tooltip},o.prototype._createLink=function(){return new WjTooltipLink},o}(wijmo_angular_base_1.WjDirective);exports.WjTooltip=WjTooltip;var WjTooltipLink=function(t){function o(){return null!==t&&t.apply(this,arguments)||this}return __extends(o,t),o.prototype._link=function(){t.prototype._link.call(this);var o=this.control,r=this;this.tAttrs.$observe("wjTooltip",function(t){o.setTooltip(r.tElement[0],t)})},o}(wijmo_angular_base_1.WjLink),WjValidationError=function(t){function o(){var o=t.call(this)||this;return o.restrict="A",o.template="",o.require="ngModel",o.scope=!1,o}return __extends(o,t),o.prototype._postLinkFn=function(){return function(t,o,r,e){var n="wjValidationError";t.$watch(r[n],function(t){var r="INPUT"==o[0].tagName?o[0]:o[0].querySelector("input");"boolean"==typeof t&&(t=t?"error":""),r&&r.setCustomValidity&&r.setCustomValidity(t),e&&e.$setValidity(n,!t)})}},o.prototype._getMetaDataId=function(){return"ValidationError"},o}(wijmo_angular_base_1.WjDirective);exports.WjValidationError=WjValidationError;