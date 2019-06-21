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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcGridFilter=require("wijmo/wijmo.grid.filter");var wjNg=mNg;const wijmoGridFilterName="wj.grid.filter";exports.ngModuleName="wj.grid.filter";var wijmoGridFilter=wijmo_angular_base_1._registerNgModule("wj.grid.filter");wijmo_angular_base_1.softRefGridFilter()&&wijmoGridFilter.directive("wjFlexGridFilter",[function(){return new WjFlexGridFilter}]);class WjFlexGridFilter extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.require="^wjFlexGrid",this.template="<div />"}get _controlConstructor(){return wjcGridFilter.FlexGridFilter}}exports.WjFlexGridFilter=WjFlexGridFilter;