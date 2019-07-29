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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=require("knockout"),wjcGroup=require("wijmo/wijmo.grid.grouppanel");var wjKo=mKo;class wjGroupPanel extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcGroup.GroupPanel}}exports.wjGroupPanel=wjGroupPanel,wjKo.bindingHandlers.wjGroupPanel=new wjGroupPanel;