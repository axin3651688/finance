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

var __extends=this&&this.__extends||function(){var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(e,t)};return function(e,t){function i(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}}();import{WjDirective,_registerNgModule,softRefGridFilter}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcGridFilter from"wijmo/wijmo.grid.filter";var wjNg=mNg,wijmoGridFilterName="wj.grid.filter";export var ngModuleName=wijmoGridFilterName;var wijmoGridFilter=_registerNgModule(wijmoGridFilterName);softRefGridFilter()&&wijmoGridFilter.directive("wjFlexGridFilter",[function(){return new WjFlexGridFilter}]);var WjFlexGridFilter=function(r){function e(){var e=r.call(this)||this;return e.require="^wjFlexGrid",e.template="<div />",e}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcGridFilter.FlexGridFilter},enumerable:!0,configurable:!0}),e}(WjDirective);export{WjFlexGridFilter};