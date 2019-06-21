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

"use strict";var __extends=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function e(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(e.prototype=o.prototype,new e)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=require("knockout"),wjcChartAnno=require("wijmo/wijmo.chart.annotation"),wjKo=mKo,wjFlexChartAnnotationLayer=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcChartAnno.AnnotationLayer},n}(wijmo_knockout_base_1.WjBinding);exports.wjFlexChartAnnotationLayer=wjFlexChartAnnotationLayer;var wjFlexChartAnnotation=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._createControl=function(t){return this._context._createAnnotation()},n.prototype._getMetaDataId=function(){return"FlexChartAnnotation"},n.prototype._createWijmoContext=function(){return this._context=new wjFlexChartAnnotationContext(this),this._context},n}(wijmo_knockout_base_1.WjBinding);exports.wjFlexChartAnnotation=wjFlexChartAnnotation;var wjFlexChartAnnotationContext=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._createAnnotation=function(){var t=this.valueAccessor(),n=wjKo.unwrap(t.type);return new wjcChartAnno[n]},n}(wijmo_knockout_base_1.WjContext);exports.wjFlexChartAnnotationContext=wjFlexChartAnnotationContext,wjKo.bindingHandlers.wjFlexChartAnnotationLayer=new wjFlexChartAnnotationLayer,wjKo.bindingHandlers.wjFlexChartAnnotation=new wjFlexChartAnnotation;