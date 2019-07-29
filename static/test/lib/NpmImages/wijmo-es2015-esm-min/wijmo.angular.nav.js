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

import{WjDirective,WjLink,_registerNgModule,softRefNav}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcNav from"wijmo/wijmo.nav";var wjNg=mNg;const wijmoNavName="wj.nav";export const ngModuleName="wj.nav";var wijmoNav=_registerNgModule("wj.nav");softRefNav()&&(wijmoNav.directive("wjTreeView",[function(){return new WjTreeView}]),wijmoNav.directive("wjTabPanel",[function(){return new WjTabPanel}]),wijmoNav.directive("wjTab",[function(){return new WjTab}]));export class WjTreeView extends WjDirective{constructor(){super(),this.transclude=!0,this.template="<div ng-transclude />"}get _controlConstructor(){return wjcNav.TreeView}};export class WjTabPanel extends WjDirective{constructor(){super(),this.transclude=!0,this.template="<div ng-transclude />"}get _controlConstructor(){return wjcNav.TabPanel}_initControl(e){let t=new wjcNav.TabPanel(e,null,!0);return t.tabs.beginUpdate(),t}_createLink(){return new WjTabPanelLink}};class WjTabPanelLink extends WjLink{_onChildrenReady(){super._onChildrenReady();let e=this.control;e.tabs.endUpdate(),e.selectedIndex<0&&e.tabs.length&&(e.selectedIndex=0)}}export class WjTab extends WjDirective{constructor(){super(),this.transclude=!0,this.template="<div ng-transclude />",this.require="^wjTabPanel"}get _controlConstructor(){return wjcNav.Tab}_initControl(e){return new wjcNav.Tab(e.children[0],e.children[1])}};