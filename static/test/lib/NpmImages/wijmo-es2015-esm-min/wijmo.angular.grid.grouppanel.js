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

import{WjDirective,_registerNgModule,softRefGridGrouppanel}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcGridGroup from"wijmo/wijmo.grid.grouppanel";var wjNg=mNg;const wijmoGridGroupName="wj.grid.grouppanel";export const ngModuleName=wijmoGridGroupName;var wijmoGridGroup=_registerNgModule(wijmoGridGroupName);softRefGridGrouppanel()&&wijmoGridGroup.directive("wjGroupPanel",[function(){return new WjGroupPanel}]);export class WjGroupPanel extends WjDirective{get _controlConstructor(){return wjcGridGroup.GroupPanel}};