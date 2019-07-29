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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcViewer from"wijmo/wijmo.viewer";export class ReportViewer extends ComponentBase{constructor(e){super(e,wjcViewer.ReportViewer,{objectProps:["requestHeaders","parameters"]})}};export class PdfViewer extends ComponentBase{constructor(e){super(e,wjcViewer.PdfViewer,{objectProps:["requestHeaders"]})}};