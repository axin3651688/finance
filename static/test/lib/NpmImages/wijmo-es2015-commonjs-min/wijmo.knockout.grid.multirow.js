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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_grid_1=require("wijmo/wijmo.knockout.grid"),mKo=require("knockout"),wjcMultirow=require("wijmo/wijmo.grid.multirow");var wjKo=mKo;class wjMultiRow extends wijmo_knockout_grid_1.wjFlexGrid{_getControlConstructor(){return wjcMultirow.MultiRow}}exports.wjMultiRow=wjMultiRow,wjKo.bindingHandlers.wjMultiRow=new wjMultiRow;