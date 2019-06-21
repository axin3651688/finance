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

"use strict";var __extends=this&&this.__extends||function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function r(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcChartAnnotation=require("wijmo/wijmo.chart.annotation"),wjNg=mNg,wijmoChartAnnotationName="wj.chart.annotation";exports.ngModuleName=wijmoChartAnnotationName;var wijmoChartAnnotation=wijmo_angular_base_1._registerNgModule(wijmoChartAnnotationName);wijmo_angular_base_1.softRefChartAnnotation()&&(wijmoChartAnnotation.directive("wjFlexChartAnnotationLayer",[function(){return new WjFlexChartAnnotationLayer}]),wijmoChartAnnotation.directive("wjFlexChartAnnotation",[function(){return new WjFlexChartAnnotation}]));var WjFlexChartAnnotationLayer=function(t){function n(){var n=t.call(this)||this;return n.require=["?^wjFlexChart","?^wjFinancialChart"],n.template='<div class="wjFlexChartAnnotationLayer" ng-transclude />',n.transclude=!0,n}return __extends(n,t),Object.defineProperty(n.prototype,"_controlConstructor",{get:function(){return wjcChartAnnotation.AnnotationLayer},enumerable:!0,configurable:!0}),n}(wijmo_angular_base_1.WjDirective);exports.WjFlexChartAnnotationLayer=WjFlexChartAnnotationLayer;var WjFlexChartAnnotation=function(t){function n(){var n=t.call(this)||this;return n.require="^wjFlexChartAnnotationLayer",n.template='<div class="wjFlexChartAnnotation" ng-transclude />',n.transclude=!0,n}return __extends(n,t),n.prototype._createLink=function(){return new WjFlexChartAnnotationLink},n.prototype._getMetaDataId=function(){return"FlexChartAnnotation"},n}(wijmo_angular_base_1.WjDirective);exports.WjFlexChartAnnotation=WjFlexChartAnnotation;var WjFlexChartAnnotationLink=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._initControl=function(){return new wjcChartAnnotation[this.scope.type]},n}(wijmo_angular_base_1.WjLink);exports.WjFlexChartAnnotationLink=WjFlexChartAnnotationLink;