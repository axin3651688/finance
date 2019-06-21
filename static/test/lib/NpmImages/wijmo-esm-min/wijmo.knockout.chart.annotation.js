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

var __extends=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function r(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();import{WjBinding,WjContext}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcChartAnno from"wijmo/wijmo.chart.annotation";var wjKo=mKo,wjFlexChartAnnotationLayer=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcChartAnno.AnnotationLayer},n}(WjBinding);export{wjFlexChartAnnotationLayer};var wjFlexChartAnnotation=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._createControl=function(t){return this._context._createAnnotation()},n.prototype._getMetaDataId=function(){return"FlexChartAnnotation"},n.prototype._createWijmoContext=function(){return this._context=new wjFlexChartAnnotationContext(this),this._context},n}(WjBinding);export{wjFlexChartAnnotation};var wjFlexChartAnnotationContext=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._createAnnotation=function(){var t=this.valueAccessor(),n=wjKo.unwrap(t.type);return new wjcChartAnno[n]},n}(WjContext);export{wjFlexChartAnnotationContext};wjKo.bindingHandlers.wjFlexChartAnnotationLayer=new wjFlexChartAnnotationLayer,wjKo.bindingHandlers.wjFlexChartAnnotation=new wjFlexChartAnnotation;