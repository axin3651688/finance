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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_grid_1=require("wijmo/wijmo.angular.grid"),mNg=require("angular"),wjcGridSheet=require("wijmo/wijmo.grid.sheet");var wjNg=mNg;const wijmoGridSheetName="wj.grid.sheet";exports.ngModuleName="wj.grid.sheet";var wijmoGridSheet=wijmo_angular_base_1._registerNgModule("wj.grid.sheet");wijmo_angular_base_1.softRefGridSheet()&&(wijmoGridSheet.directive("wjFlexSheet",["$compile","$interpolate",function(e,r){return new WjFlexSheet(e,r)}]),wijmoGridSheet.directive("wjSheet",[function(){return new WjSheet}]));class WjFlexSheet extends wijmo_angular_grid_1.WjFlexGrid{constructor(e,r){super(e,r)}get _controlConstructor(){return wjcGridSheet.FlexSheet}}class WjSheet extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.require="^wjFlexSheet"}get _controlConstructor(){return wjcGridSheet.Sheet}_initControl(e){return super._initControl(void 0)}}