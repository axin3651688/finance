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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_grid_1=require("wijmo/wijmo.knockout.grid"),mKo=require("knockout"),wjcSheet=require("wijmo/wijmo.grid.sheet");var wjKo=mKo;class wjFlexSheet extends wijmo_knockout_grid_1.wjFlexGrid{_getControlConstructor(){return wjcSheet.FlexSheet}}exports.wjFlexSheet=wjFlexSheet;class wjSheet extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcSheet.Sheet}_createWijmoContext(){return new WjSheetContext(this)}}exports.wjSheet=wjSheet;class WjSheetContext extends wijmo_knockout_base_1.WjContext{_initControl(){super._initControl();var e=this.valueAccessor(),t=this.parentWjContext.control,o=wjKo.unwrap(e.itemsSource),n=wjKo.unwrap(e.name);return o?t.addBoundSheet(n,o):t.addUnboundSheet(n,+wjKo.unwrap(e.rowCount),+wjKo.unwrap(e.columnCount))}}exports.WjSheetContext=WjSheetContext,wjKo.bindingHandlers.wjFlexSheet=new wjFlexSheet,wjKo.bindingHandlers.wjSheet=new wjSheet;