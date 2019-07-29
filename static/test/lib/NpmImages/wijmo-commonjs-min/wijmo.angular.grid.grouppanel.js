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

"use strict";var __extends=this&&this.__extends||function(){var r=function(e,o){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var o in e)e.hasOwnProperty(o)&&(r[o]=e[o])})(e,o)};return function(e,o){function t(){this.constructor=e}r(e,o),e.prototype=null===o?Object.create(o):(t.prototype=o.prototype,new t)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcGridGroup=require("wijmo/wijmo.grid.grouppanel"),wjNg=mNg,wijmoGridGroupName="wj.grid.grouppanel";exports.ngModuleName=wijmoGridGroupName;var wijmoGridGroup=wijmo_angular_base_1._registerNgModule(wijmoGridGroupName);wijmo_angular_base_1.softRefGridGrouppanel()&&wijmoGridGroup.directive("wjGroupPanel",[function(){return new WjGroupPanel}]);var WjGroupPanel=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return __extends(e,r),Object.defineProperty(e.prototype,"_controlConstructor",{get:function(){return wjcGridGroup.GroupPanel},enumerable:!0,configurable:!0}),e}(wijmo_angular_base_1.WjDirective);exports.WjGroupPanel=WjGroupPanel;