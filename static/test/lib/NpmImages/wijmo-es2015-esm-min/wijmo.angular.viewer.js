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

import{WjDirective,_registerNgModule,softRefViewer}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcViewer from"wijmo/wijmo.viewer";var wjNg=mNg;const wijmoViewerName="wj.viewer";export const ngModuleName="wj.viewer";var wijmoOlap=_registerNgModule("wj.viewer"),wijmoViewer=window.angular.module("wj.viewer",[]);softRefViewer()&&softRefViewer().ReportViewer&&wijmoViewer.directive("wjReportViewer",[function(){return new WjReportViewer}]),wjcViewer&&wjcViewer.PdfViewer&&wijmoViewer.directive("wjPdfViewer",[function(){return new WjPdfViewer}]);class WjViewerBase extends WjDirective{constructor(){super(),this.template="<div ng-transclude />",this.transclude=!0}get _controlConstructor(){return wjcViewer.ViewerBase}}class WjReportViewer extends WjViewerBase{constructor(){super()}get _controlConstructor(){return wjcViewer.ReportViewer}}class WjPdfViewer extends WjViewerBase{constructor(){super()}get _controlConstructor(){return wjcViewer.PdfViewer}}