﻿/*!
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

var WjReportViewer_1,WjPdfViewer_1,__decorate=this&&this.__decorate||function(e,o,t,r){var a,n=arguments.length,i=n<3?o:null===r?r=Object.getOwnPropertyDescriptor(o,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,o,t,r);else for(var d=e.length-1;d>=0;d--)(a=e[d])&&(i=(n<3?a(i):n>3?a(o,t,i):a(o,t))||i);return n>3&&i&&Object.defineProperty(o,t,i),i},__param=this&&this.__param||function(e,o){return function(t,r){o(t,r,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjDirectiveBaseModule,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcCore from"wijmo/wijmo";import*as wjcViewer from"wijmo/wijmo.viewer";export var wjReportViewerMeta={selector:"wj-report-viewer",template:"",inputs:["asyncBindings","wjModelProperty","serviceUrl","filePath","fullScreen","zoomFactor","mouseMode","selectMouseMode","viewMode","requestHeaders","parameters","paginated","reportName"],outputs:["initialized","pageIndexChangedNg: pageIndexChanged","viewModeChangedNg: viewModeChanged","viewModeChangePC: viewModeChange","mouseModeChangedNg: mouseModeChanged","mouseModeChangePC: mouseModeChange","selectMouseModeChangedNg: selectMouseModeChanged","selectMouseModeChangePC: selectMouseModeChange","fullScreenChangedNg: fullScreenChanged","fullScreenChangePC: fullScreenChange","zoomFactorChangedNg: zoomFactorChanged","zoomFactorChangePC: zoomFactorChange","queryLoadingDataNg: queryLoadingData","beforeSendRequestNg: beforeSendRequest"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjReportViewer=WjReportViewer_1=class extends wjcViewer.ReportViewer{constructor(e,o,t){super(WjDirectiveBehavior.getHostElement(e,o)),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,o,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,t,r=!1){let a=WjDirectiveBehavior,n=a.ngZone;n&&a.outsideZoneEvents[o]?n.runOutsideAngular(()=>{super.addEventListener(e,o,t,r)}):super.addEventListener(e,o,t,r)}onSelectMouseModeChanged(e){(this.selectMouseModeChanged._handlers.length>1||this.selectMouseModeChangedNg.observers.length>0)&&wjcCore._deprecated("selectMouseModeChanged","mouseModeChanged"),this.selectMouseModeChanged.raise(this,e)}};WjReportViewer.meta={outputs:wjReportViewerMeta.outputs,changeEvents:{viewModeChanged:["viewMode"],mouseModeChanged:["mouseMode"],selectMouseModeChanged:["selectMouseMode"],fullScreenChanged:["fullScreen"],zoomFactorChanged:["zoomFactor"]}},WjReportViewer=WjReportViewer_1=__decorate([Component({selector:wjReportViewerMeta.selector,template:wjReportViewerMeta.template,inputs:wjReportViewerMeta.inputs,outputs:wjReportViewerMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjReportViewer_1)},...wjReportViewerMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjReportViewer);export{WjReportViewer};export var wjPdfViewerMeta={selector:"wj-pdf-viewer",template:"",inputs:["asyncBindings","wjModelProperty","serviceUrl","filePath","fullScreen","zoomFactor","mouseMode","selectMouseMode","viewMode","requestHeaders"],outputs:["initialized","pageIndexChangedNg: pageIndexChanged","viewModeChangedNg: viewModeChanged","viewModeChangePC: viewModeChange","mouseModeChangedNg: mouseModeChanged","mouseModeChangePC: mouseModeChange","selectMouseModeChangedNg: selectMouseModeChanged","selectMouseModeChangePC: selectMouseModeChange","fullScreenChangedNg: fullScreenChanged","fullScreenChangePC: fullScreenChange","zoomFactorChangedNg: zoomFactorChanged","zoomFactorChangePC: zoomFactorChange","queryLoadingDataNg: queryLoadingData","beforeSendRequestNg: beforeSendRequest"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjPdfViewer=WjPdfViewer_1=class extends wjcViewer.PdfViewer{constructor(e,o,t){super(WjDirectiveBehavior.getHostElement(e,o)),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,o,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,t,r=!1){let a=WjDirectiveBehavior,n=a.ngZone;n&&a.outsideZoneEvents[o]?n.runOutsideAngular(()=>{super.addEventListener(e,o,t,r)}):super.addEventListener(e,o,t,r)}onSelectMouseModeChanged(e){(this.selectMouseModeChanged._handlers.length>1||this.selectMouseModeChangedNg.observers.length>0)&&wjcCore._deprecated("selectMouseModeChanged","mouseModeChanged"),this.selectMouseModeChanged.raise(this,e)}};WjPdfViewer.meta={outputs:wjPdfViewerMeta.outputs,changeEvents:{viewModeChanged:["viewMode"],mouseModeChanged:["mouseMode"],selectMouseModeChanged:["selectMouseMode"],fullScreenChanged:["fullScreen"],zoomFactorChanged:["zoomFactor"]}},WjPdfViewer=WjPdfViewer_1=__decorate([Component({selector:wjPdfViewerMeta.selector,template:wjPdfViewerMeta.template,inputs:wjPdfViewerMeta.inputs,outputs:wjPdfViewerMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjPdfViewer_1)},...wjPdfViewerMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjPdfViewer);export{WjPdfViewer};let moduleExports=[WjReportViewer,WjPdfViewer],WjViewerModule=class{};WjViewerModule=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjViewerModule);export{WjViewerModule};