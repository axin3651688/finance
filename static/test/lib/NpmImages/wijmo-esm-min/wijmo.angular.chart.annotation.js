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

var __extends=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function r(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();import{WjDirective,WjLink,_registerNgModule,softRefChartAnnotation}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcChartAnnotation from"wijmo/wijmo.chart.annotation";var wjNg=mNg,wijmoChartAnnotationName="wj.chart.annotation";export var ngModuleName=wijmoChartAnnotationName;var wijmoChartAnnotation=_registerNgModule(wijmoChartAnnotationName);softRefChartAnnotation()&&(wijmoChartAnnotation.directive("wjFlexChartAnnotationLayer",[function(){return new WjFlexChartAnnotationLayer}]),wijmoChartAnnotation.directive("wjFlexChartAnnotation",[function(){return new WjFlexChartAnnotation}]));var WjFlexChartAnnotationLayer=function(t){function n(){var n=t.call(this)||this;return n.require=["?^wjFlexChart","?^wjFinancialChart"],n.template='<div class="wjFlexChartAnnotationLayer" ng-transclude />',n.transclude=!0,n}return __extends(n,t),Object.defineProperty(n.prototype,"_controlConstructor",{get:function(){return wjcChartAnnotation.AnnotationLayer},enumerable:!0,configurable:!0}),n}(WjDirective);export{WjFlexChartAnnotationLayer};var WjFlexChartAnnotation=function(t){function n(){var n=t.call(this)||this;return n.require="^wjFlexChartAnnotationLayer",n.template='<div class="wjFlexChartAnnotation" ng-transclude />',n.transclude=!0,n}return __extends(n,t),n.prototype._createLink=function(){return new WjFlexChartAnnotationLink},n.prototype._getMetaDataId=function(){return"FlexChartAnnotation"},n}(WjDirective);export{WjFlexChartAnnotation};var WjFlexChartAnnotationLink=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._initControl=function(){return new wjcChartAnnotation[this.scope.type]},n}(WjLink);export{WjFlexChartAnnotationLink};