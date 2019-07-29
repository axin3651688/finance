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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcViewer=require("wijmo/wijmo.viewer");class ReportViewer extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcViewer.ReportViewer,{objectProps:["requestHeaders","parameters"]})}}exports.ReportViewer=ReportViewer;class PdfViewer extends wijmo_react_base_1.ComponentBase{constructor(e){super(e,wjcViewer.PdfViewer,{objectProps:["requestHeaders"]})}}exports.PdfViewer=PdfViewer;