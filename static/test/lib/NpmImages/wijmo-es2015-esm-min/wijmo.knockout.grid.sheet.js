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

import{WjBinding,WjContext}from"wijmo/wijmo.knockout.base";import{wjFlexGrid}from"wijmo/wijmo.knockout.grid";import*as mKo from"knockout";import*as wjcSheet from"wijmo/wijmo.grid.sheet";var wjKo=mKo;export class wjFlexSheet extends wjFlexGrid{_getControlConstructor(){return wjcSheet.FlexSheet}};export class wjSheet extends WjBinding{_getControlConstructor(){return wjcSheet.Sheet}_createWijmoContext(){return new WjSheetContext(this)}};export class WjSheetContext extends WjContext{_initControl(){super._initControl();var e=this.valueAccessor(),t=this.parentWjContext.control,o=wjKo.unwrap(e.itemsSource),n=wjKo.unwrap(e.name);return o?t.addBoundSheet(n,o):t.addUnboundSheet(n,+wjKo.unwrap(e.rowCount),+wjKo.unwrap(e.columnCount))}};wjKo.bindingHandlers.wjFlexSheet=new wjFlexSheet,wjKo.bindingHandlers.wjSheet=new wjSheet;