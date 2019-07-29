﻿/*!
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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcNav=require("wijmo/wijmo.nav"),wjNg=mNg,wijmoNavName="wj.nav";exports.ngModuleName=wijmoNavName;var wijmoNav=wijmo_angular_base_1._registerNgModule(wijmoNavName);wijmo_angular_base_1.softRefNav()&&(wijmoNav.directive("wjTreeView",[function(){return new WjTreeView}]),wijmoNav.directive("wjTabPanel",[function(){return new WjTabPanel}]),wijmoNav.directive("wjTab",[function(){return new WjTab}]));var WjTreeView=function(e){function t(){var t=e.call(this)||this;return t.transclude=!0,t.template="<div ng-transclude />",t}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcNav.TreeView},enumerable:!0,configurable:!0}),t}(wijmo_angular_base_1.WjDirective);exports.WjTreeView=WjTreeView;var WjTabPanel=function(e){function t(){var t=e.call(this)||this;return t.transclude=!0,t.template="<div ng-transclude />",t}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcNav.TabPanel},enumerable:!0,configurable:!0}),t.prototype._initControl=function(e){var t=new wjcNav.TabPanel(e,null,!0);return t.tabs.beginUpdate(),t},t.prototype._createLink=function(){return new WjTabPanelLink},t}(wijmo_angular_base_1.WjDirective);exports.WjTabPanel=WjTabPanel;var WjTabPanelLink=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype._onChildrenReady=function(){e.prototype._onChildrenReady.call(this);var t=this.control;t.tabs.endUpdate(),t.selectedIndex<0&&t.tabs.length&&(t.selectedIndex=0)},t}(wijmo_angular_base_1.WjLink),WjTab=function(e){function t(){var t=e.call(this)||this;return t.transclude=!0,t.template="<div ng-transclude />",t.require="^wjTabPanel",t}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcNav.Tab},enumerable:!0,configurable:!0}),t.prototype._initControl=function(e){return new wjcNav.Tab(e.children[0],e.children[1])},t}(wijmo_angular_base_1.WjDirective);exports.WjTab=WjTab;