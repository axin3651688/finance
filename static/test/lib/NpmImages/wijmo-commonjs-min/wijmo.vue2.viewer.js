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

"use strict";var __extends=this&&this.__extends||function(){var e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(r,t)};return function(r,t){function o(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcViewer=require("wijmo/wijmo.viewer"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjReportViewerBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-report-viewer",r.className="wijmo.viewer.ReportViewer",r.classCtor=function(){return wjcViewer.ReportViewer},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjReportViewer=WjReportViewerBehavior.register();var WjPdfViewerBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-pdf-viewer",r.className="wijmo.viewer.PdfViewer",r.classCtor=function(){return wjcViewer.PdfViewer},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjPdfViewer=WjPdfViewerBehavior.register();