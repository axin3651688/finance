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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcViewer=require("wijmo/wijmo.viewer"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjReportViewerBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjReportViewerBehavior.tag="wj-report-viewer",WjReportViewerBehavior.className="wijmo.viewer.ReportViewer",WjReportViewerBehavior.classCtor=function(){return wjcViewer.ReportViewer},exports.WjReportViewer=WjReportViewerBehavior.register();class WjPdfViewerBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjPdfViewerBehavior.tag="wj-pdf-viewer",WjPdfViewerBehavior.className="wijmo.viewer.PdfViewer",WjPdfViewerBehavior.classCtor=function(){return wjcViewer.PdfViewer},exports.WjPdfViewer=WjPdfViewerBehavior.register();