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

import{WjDirective,_registerNgModule,softRefOlap}from"wijmo/wijmo.angular.base";import{WjFlexGrid}from"wijmo/wijmo.angular.grid";import*as mNg from"angular";import*as wjcOlap from"wijmo/wijmo.olap";var wjNg=mNg;const wijmoOlapName="wj.olap";export const ngModuleName="wj.olap";var wijmoOlap=_registerNgModule("wj.olap");softRefOlap()&&softRefOlap().PivotGrid&&(wijmoOlap.directive("wjPivotGrid",["$compile","$interpolate",function(t,r){return new WjPivotGrid(t,r)}]),wijmoOlap.directive("wjPivotChart",[function(){return new WjPivotChart}]),wijmoOlap.directive("wjPivotPanel",[function(){return new WjPivotPanel}]),wijmoOlap.directive("wjSlicer",[function(){return new WjSlicer}]));export class WjPivotGrid extends WjFlexGrid{constructor(t,r){super(t,r)}get _controlConstructor(){return wjcOlap.PivotGrid}};export class WjPivotChart extends WjDirective{get _controlConstructor(){return wjcOlap.PivotChart}};export class WjPivotPanel extends WjDirective{constructor(){super(),this.transclude=!0,this.template="<div ng-transclude />"}get _controlConstructor(){return wjcOlap.PivotPanel}};export class WjSlicer extends WjDirective{get _controlConstructor(){return wjcOlap.Slicer}};