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

import{_registerNgModule,softRefGridMultirow}from"wijmo/wijmo.angular.base";import{WjFlexGrid}from"wijmo/wijmo.angular.grid";import*as mNg from"angular";import*as wjcGridMultirow from"wijmo/wijmo.grid.multirow";var wjNg=mNg;const wijmoGridMultirowName="wj.grid.multirow";export const ngModuleName="wj.grid.multirow";var wijmoGridMultirow=_registerNgModule("wj.grid.multirow");softRefGridMultirow()&&wijmoGridMultirow.directive("wjMultiRow",["$compile","$interpolate",function(r,o){return new WjMultiRow(r,o)}]);export class WjMultiRow extends WjFlexGrid{constructor(r,o){super(r,o)}get _controlConstructor(){return wjcGridMultirow.MultiRow}};