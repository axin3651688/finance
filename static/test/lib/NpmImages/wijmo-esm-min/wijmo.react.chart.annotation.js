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

var __extends=this&&this.__extends||function(){var t=function(n,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(n,o)};return function(n,o){function r(){this.constructor=n}t(n,o),n.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcChartAnnotation from"wijmo/wijmo.chart.annotation";var FlexChartAnnotationLayer=function(t){function n(n){var o=t.call(this,n,wjcChartAnnotation.AnnotationLayer)||this;return o._parentInCtor=!0,o}return __extends(n,t),n}(ComponentBase);export{FlexChartAnnotationLayer};var FlexChartAnnotation=function(t){function n(n){var o=t.call(this,n,null,{objectProps:["point","offset","style","start","end"]})||this;return o._parentProp="items",o}return __extends(n,t),n.prototype._createControl=function(){return new wjcChartAnnotation[this.props.type]},n}(ComponentBase);export{FlexChartAnnotation};