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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcViewer from"wijmo/wijmo.viewer";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjReportViewerBehavior extends WjComponentBehavior{}WjReportViewerBehavior.tag="wj-report-viewer",WjReportViewerBehavior.className="wijmo.viewer.ReportViewer",WjReportViewerBehavior.classCtor=function(){return wjcViewer.ReportViewer};export var WjReportViewer=WjReportViewerBehavior.register();class WjPdfViewerBehavior extends WjComponentBehavior{}WjPdfViewerBehavior.tag="wj-pdf-viewer",WjPdfViewerBehavior.className="wijmo.viewer.PdfViewer",WjPdfViewerBehavior.classCtor=function(){return wjcViewer.PdfViewer};export var WjPdfViewer=WjPdfViewerBehavior.register();