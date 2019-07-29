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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcGridGroup=require("wijmo/wijmo.grid.grouppanel");var wjNg=mNg;const wijmoGridGroupName="wj.grid.grouppanel";exports.ngModuleName=wijmoGridGroupName;var wijmoGridGroup=wijmo_angular_base_1._registerNgModule(wijmoGridGroupName);wijmo_angular_base_1.softRefGridGrouppanel()&&wijmoGridGroup.directive("wjGroupPanel",[function(){return new WjGroupPanel}]);class WjGroupPanel extends wijmo_angular_base_1.WjDirective{get _controlConstructor(){return wjcGridGroup.GroupPanel}}exports.WjGroupPanel=WjGroupPanel;