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

var __extends=this&&this.__extends||function(){var e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(r,t)};return function(r,t){function i(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}}();import{WjDirective,_registerNgModule,softRefViewer}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcViewer from"wijmo/wijmo.viewer";var wjNg=mNg,wijmoViewerName="wj.viewer";export var ngModuleName=wijmoViewerName;var wijmoOlap=_registerNgModule(wijmoViewerName),wijmoViewer=window.angular.module("wj.viewer",[]);softRefViewer()&&softRefViewer().ReportViewer&&wijmoViewer.directive("wjReportViewer",[function(){return new WjReportViewer}]),wjcViewer&&wjcViewer.PdfViewer&&wijmoViewer.directive("wjPdfViewer",[function(){return new WjPdfViewer}]);var WjViewerBase=function(e){function r(){var r=e.call(this)||this;return r.template="<div ng-transclude />",r.transclude=!0,r}return __extends(r,e),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcViewer.ViewerBase},enumerable:!0,configurable:!0}),r}(WjDirective),WjReportViewer=function(e){function r(){return e.call(this)||this}return __extends(r,e),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcViewer.ReportViewer},enumerable:!0,configurable:!0}),r}(WjViewerBase),WjPdfViewer=function(e){function r(){return e.call(this)||this}return __extends(r,e),Object.defineProperty(r.prototype,"_controlConstructor",{get:function(){return wjcViewer.PdfViewer},enumerable:!0,configurable:!0}),r}(WjViewerBase);