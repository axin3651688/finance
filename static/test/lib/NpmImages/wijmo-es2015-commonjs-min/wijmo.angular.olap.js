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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_angular_grid_1=require("wijmo/wijmo.angular.grid"),mNg=require("angular"),wjcOlap=require("wijmo/wijmo.olap");var wjNg=mNg;const wijmoOlapName="wj.olap";exports.ngModuleName="wj.olap";var wijmoOlap=wijmo_angular_base_1._registerNgModule("wj.olap");wijmo_angular_base_1.softRefOlap()&&wijmo_angular_base_1.softRefOlap().PivotGrid&&(wijmoOlap.directive("wjPivotGrid",["$compile","$interpolate",function(r,e){return new WjPivotGrid(r,e)}]),wijmoOlap.directive("wjPivotChart",[function(){return new WjPivotChart}]),wijmoOlap.directive("wjPivotPanel",[function(){return new WjPivotPanel}]),wijmoOlap.directive("wjSlicer",[function(){return new WjSlicer}]));class WjPivotGrid extends wijmo_angular_grid_1.WjFlexGrid{constructor(r,e){super(r,e)}get _controlConstructor(){return wjcOlap.PivotGrid}}exports.WjPivotGrid=WjPivotGrid;class WjPivotChart extends wijmo_angular_base_1.WjDirective{get _controlConstructor(){return wjcOlap.PivotChart}}exports.WjPivotChart=WjPivotChart;class WjPivotPanel extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.transclude=!0,this.template="<div ng-transclude />"}get _controlConstructor(){return wjcOlap.PivotPanel}}exports.WjPivotPanel=WjPivotPanel;class WjSlicer extends wijmo_angular_base_1.WjDirective{get _controlConstructor(){return wjcOlap.Slicer}}exports.WjSlicer=WjSlicer;