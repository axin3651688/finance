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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcCore from"wijmo/wijmo";import*as wjcGrid from"wijmo/wijmo.grid";function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}export class FlexGrid extends ComponentBase{constructor(o){super(o,wjcGrid.FlexGrid,{objectProps:["childItemsPath","mergeManager","itemsSource","virtualizationThreshold"]})}};export class FlexGridColumn extends ComponentBase{constructor(o){super(o,wjcGrid.Column,{objectProps:["dataMap"]}),this._parentProp="columns"}_initParent(){var o=this.parent.control;o.autoGenerateColumns&&(o.autoGenerateColumns=!1,o.columns.clear()),super._initParent()}};