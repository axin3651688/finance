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

import{WjDirective,_registerNgModule,softRefGridFilter}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcGridFilter from"wijmo/wijmo.grid.filter";var wjNg=mNg;const wijmoGridFilterName="wj.grid.filter";export const ngModuleName="wj.grid.filter";var wijmoGridFilter=_registerNgModule("wj.grid.filter");softRefGridFilter()&&wijmoGridFilter.directive("wjFlexGridFilter",[function(){return new WjFlexGridFilter}]);export class WjFlexGridFilter extends WjDirective{constructor(){super(),this.require="^wjFlexGrid",this.template="<div />"}get _controlConstructor(){return wjcGridFilter.FlexGridFilter}};