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

var __extends=this&&this.__extends||function(){var r=function(o,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,o){r.__proto__=o}||function(r,o){for(var e in o)o.hasOwnProperty(e)&&(r[e]=o[e])})(o,e)};return function(o,e){function t(){this.constructor=o}r(o,e),o.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}}();import{WjDirective,_registerNgModule,softRefGridGrouppanel}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcGridGroup from"wijmo/wijmo.grid.grouppanel";var wjNg=mNg,wijmoGridGroupName="wj.grid.grouppanel";export var ngModuleName=wijmoGridGroupName;var wijmoGridGroup=_registerNgModule(wijmoGridGroupName);softRefGridGrouppanel()&&wijmoGridGroup.directive("wjGroupPanel",[function(){return new WjGroupPanel}]);var WjGroupPanel=function(r){function o(){return null!==r&&r.apply(this,arguments)||this}return __extends(o,r),Object.defineProperty(o.prototype,"_controlConstructor",{get:function(){return wjcGridGroup.GroupPanel},enumerable:!0,configurable:!0}),o}(WjDirective);export{WjGroupPanel};