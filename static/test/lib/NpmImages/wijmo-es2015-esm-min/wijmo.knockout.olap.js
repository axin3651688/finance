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

import{WjBinding}from"wijmo/wijmo.knockout.base";import{wjFlexGrid}from"wijmo/wijmo.knockout.grid";import*as mKo from"knockout";import*as wjcOlap from"wijmo/wijmo.olap";var wjKo=mKo;export class wjPivotGrid extends wjFlexGrid{_getControlConstructor(){return wjcOlap.PivotGrid}};export class wjPivotChart extends WjBinding{_getControlConstructor(){return wjcOlap.PivotChart}};export class wjPivotPanel extends WjBinding{_getControlConstructor(){return wjcOlap.PivotPanel}};export class wjSlicer extends WjBinding{_getControlConstructor(){return wjcOlap.Slicer}};wjKo.bindingHandlers.wjPivotGrid=new wjPivotGrid,wjKo.bindingHandlers.wjPivotChart=new wjPivotChart,wjKo.bindingHandlers.wjPivotPanel=new wjPivotPanel,wjKo.bindingHandlers.wjSlicer=new wjSlicer;