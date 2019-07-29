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

import{wjFlexGrid}from"wijmo/wijmo.knockout.grid";import*as mKo from"knockout";import*as wjcMultirow from"wijmo/wijmo.grid.multirow";var wjKo=mKo;export class wjMultiRow extends wjFlexGrid{_getControlConstructor(){return wjcMultirow.MultiRow}};wjKo.bindingHandlers.wjMultiRow=new wjMultiRow;