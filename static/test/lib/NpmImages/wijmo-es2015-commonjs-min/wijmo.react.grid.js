﻿/*!
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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcCore=require("wijmo/wijmo"),wjcGrid=require("wijmo/wijmo.grid");function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}class FlexGrid extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcGrid.FlexGrid,{objectProps:["childItemsPath","mergeManager","itemsSource","virtualizationThreshold"]})}}exports.FlexGrid=FlexGrid;class FlexGridColumn extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcGrid.Column,{objectProps:["dataMap"]}),this._parentProp="columns"}_initParent(){var e=this.parent.control;e.autoGenerateColumns&&(e.autoGenerateColumns=!1,e.columns.clear()),super._initParent()}}exports.FlexGridColumn=FlexGridColumn;