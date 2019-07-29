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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcCore=require("wijmo/wijmo");var wjNg=mNg;const wijmoContainersName="wj.container";exports.ngModuleName="wj.container";var wijmoContainers=wijmo_angular_base_1._registerNgModule("wj.container");wijmoContainers.directive("wjTooltip",[function(){return new WjTooltip}]),wijmoContainers.directive("wjValidationError",[function(){return new WjValidationError}]);class WjTooltip extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.restrict="A",this.template=""}get _controlConstructor(){return wjcCore.Tooltip}_initControl(t){return new wjcCore.Tooltip}_createLink(){return new WjTooltipLink}}exports.WjTooltip=WjTooltip;class WjTooltipLink extends wijmo_angular_base_1.WjLink{_link(){super._link();var t=this.control,r=this;this.tAttrs.$observe("wjTooltip",function(e){t.setTooltip(r.tElement[0],e)})}}class WjValidationError extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.restrict="A",this.template="",this.require="ngModel",this.scope=!1}_postLinkFn(){return function(t,r,e,o){var i="wjValidationError";t.$watch(e[i],function(t){var e="INPUT"==r[0].tagName?r[0]:r[0].querySelector("input");"boolean"==typeof t&&(t=t?"error":""),e&&e.setCustomValidity&&e.setCustomValidity(t),o&&o.$setValidity(i,!t)})}}_getMetaDataId(){return"ValidationError"}}exports.WjValidationError=WjValidationError;