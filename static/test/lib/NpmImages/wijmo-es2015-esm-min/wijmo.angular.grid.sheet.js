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

import{WjDirective,_registerNgModule,softRefGridSheet}from"wijmo/wijmo.angular.base";import{WjFlexGrid}from"wijmo/wijmo.angular.grid";import*as mNg from"angular";import*as wjcGridSheet from"wijmo/wijmo.grid.sheet";var wjNg=mNg;const wijmoGridSheetName="wj.grid.sheet";export const ngModuleName="wj.grid.sheet";var wijmoGridSheet=_registerNgModule("wj.grid.sheet");softRefGridSheet()&&(wijmoGridSheet.directive("wjFlexSheet",["$compile","$interpolate",function(e,r){return new WjFlexSheet(e,r)}]),wijmoGridSheet.directive("wjSheet",[function(){return new WjSheet}]));class WjFlexSheet extends WjFlexGrid{constructor(e,r){super(e,r)}get _controlConstructor(){return wjcGridSheet.FlexSheet}}class WjSheet extends WjDirective{constructor(){super(),this.require="^wjFlexSheet"}get _controlConstructor(){return wjcGridSheet.Sheet}_initControl(e){return super._initControl(void 0)}}