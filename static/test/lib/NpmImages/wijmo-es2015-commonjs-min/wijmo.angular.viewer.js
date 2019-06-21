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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcViewer=require("wijmo/wijmo.viewer");var wjNg=mNg;const wijmoViewerName="wj.viewer";exports.ngModuleName="wj.viewer";var wijmoOlap=wijmo_angular_base_1._registerNgModule("wj.viewer"),wijmoViewer=window.angular.module("wj.viewer",[]);wijmo_angular_base_1.softRefViewer()&&wijmo_angular_base_1.softRefViewer().ReportViewer&&wijmoViewer.directive("wjReportViewer",[function(){return new WjReportViewer}]),wjcViewer&&wjcViewer.PdfViewer&&wijmoViewer.directive("wjPdfViewer",[function(){return new WjPdfViewer}]);class WjViewerBase extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.template="<div ng-transclude />",this.transclude=!0}get _controlConstructor(){return wjcViewer.ViewerBase}}class WjReportViewer extends WjViewerBase{constructor(){super()}get _controlConstructor(){return wjcViewer.ReportViewer}}class WjPdfViewer extends WjViewerBase{constructor(){super()}get _controlConstructor(){return wjcViewer.PdfViewer}}