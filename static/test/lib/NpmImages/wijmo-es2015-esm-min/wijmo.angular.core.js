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

import{WjDirective,WjLink,_registerNgModule}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcCore from"wijmo/wijmo";var wjNg=mNg;const wijmoContainersName="wj.container";export const ngModuleName="wj.container";var wijmoContainers=_registerNgModule("wj.container");wijmoContainers.directive("wjTooltip",[function(){return new WjTooltip}]),wijmoContainers.directive("wjValidationError",[function(){return new WjValidationError}]);export class WjTooltip extends WjDirective{constructor(){super(),this.restrict="A",this.template=""}get _controlConstructor(){return wjcCore.Tooltip}_initControl(t){return new wjcCore.Tooltip}_createLink(){return new WjTooltipLink}};class WjTooltipLink extends WjLink{_link(){super._link();var t=this.control,r=this;this.tAttrs.$observe("wjTooltip",function(o){t.setTooltip(r.tElement[0],o)})}}export class WjValidationError extends WjDirective{constructor(){super(),this.restrict="A",this.template="",this.require="ngModel",this.scope=!1}_postLinkFn(){return function(t,r,o,e){var i="wjValidationError";t.$watch(o[i],function(t){var o="INPUT"==r[0].tagName?r[0]:r[0].querySelector("input");"boolean"==typeof t&&(t=t?"error":""),o&&o.setCustomValidity&&o.setCustomValidity(t),e&&e.$setValidity(i,!t)})}}_getMetaDataId(){return"ValidationError"}};