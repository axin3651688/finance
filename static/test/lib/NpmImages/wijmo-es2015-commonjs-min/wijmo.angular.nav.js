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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcNav=require("wijmo/wijmo.nav");var wjNg=mNg;const wijmoNavName="wj.nav";exports.ngModuleName="wj.nav";var wijmoNav=wijmo_angular_base_1._registerNgModule("wj.nav");wijmo_angular_base_1.softRefNav()&&(wijmoNav.directive("wjTreeView",[function(){return new WjTreeView}]),wijmoNav.directive("wjTabPanel",[function(){return new WjTabPanel}]),wijmoNav.directive("wjTab",[function(){return new WjTab}]));class WjTreeView extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.transclude=!0,this.template="<div ng-transclude />"}get _controlConstructor(){return wjcNav.TreeView}}exports.WjTreeView=WjTreeView;class WjTabPanel extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.transclude=!0,this.template="<div ng-transclude />"}get _controlConstructor(){return wjcNav.TabPanel}_initControl(e){let a=new wjcNav.TabPanel(e,null,!0);return a.tabs.beginUpdate(),a}_createLink(){return new WjTabPanelLink}}exports.WjTabPanel=WjTabPanel;class WjTabPanelLink extends wijmo_angular_base_1.WjLink{_onChildrenReady(){super._onChildrenReady();let e=this.control;e.tabs.endUpdate(),e.selectedIndex<0&&e.tabs.length&&(e.selectedIndex=0)}}class WjTab extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.transclude=!0,this.template="<div ng-transclude />",this.require="^wjTabPanel"}get _controlConstructor(){return wjcNav.Tab}_initControl(e){return new wjcNav.Tab(e.children[0],e.children[1])}}exports.WjTab=WjTab;