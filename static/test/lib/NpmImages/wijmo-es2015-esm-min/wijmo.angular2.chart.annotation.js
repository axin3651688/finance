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

var WjFlexChartAnnotationLayer_1,WjFlexChartAnnotationText_1,WjFlexChartAnnotationEllipse_1,WjFlexChartAnnotationRectangle_1,WjFlexChartAnnotationLine_1,WjFlexChartAnnotationPolygon_1,WjFlexChartAnnotationCircle_1,WjFlexChartAnnotationSquare_1,WjFlexChartAnnotationImage_1,__decorate=this&&this.__decorate||function(t,e,n,o){var a,i=arguments.length,r=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,n,o);else for(var l=t.length-1;l>=0;l--)(a=t[l])&&(r=(i<3?a(r):i>3?a(e,n,r):a(e,n))||r);return i>3&&r&&Object.defineProperty(e,n,r),r},__param=this&&this.__param||function(t,e){return function(n,o){e(n,o,t)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{WjDirectiveBehavior,WjDirectiveBaseModule}from"wijmo/wijmo.angular2.directiveBase";import*as wjcChartAnnotation from"wijmo/wijmo.chart.annotation";export var wjFlexChartAnnotationLayerMeta={selector:"wj-flex-chart-annotation-layer",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationLayer=WjFlexChartAnnotationLayer_1=class extends wjcChartAnnotation.AnnotationLayer{constructor(t,e,n){super(n),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationLayer.meta={outputs:wjFlexChartAnnotationLayerMeta.outputs},WjFlexChartAnnotationLayer=WjFlexChartAnnotationLayer_1=__decorate([Component({selector:wjFlexChartAnnotationLayerMeta.selector,template:wjFlexChartAnnotationLayerMeta.template,inputs:wjFlexChartAnnotationLayerMeta.inputs,outputs:wjFlexChartAnnotationLayerMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationLayer_1)},...wjFlexChartAnnotationLayerMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationLayer);export{WjFlexChartAnnotationLayer};export var wjFlexChartAnnotationTextMeta={selector:"wj-flex-chart-annotation-text",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationText=WjFlexChartAnnotationText_1=class extends wjcChartAnnotation.Text{constructor(t,e,n){super(),this.isInitialized=!1,this.wjProperty="items";this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationText.meta={outputs:wjFlexChartAnnotationTextMeta.outputs,siblingId:"annotation"},WjFlexChartAnnotationText=WjFlexChartAnnotationText_1=__decorate([Component({selector:wjFlexChartAnnotationTextMeta.selector,template:wjFlexChartAnnotationTextMeta.template,inputs:wjFlexChartAnnotationTextMeta.inputs,outputs:wjFlexChartAnnotationTextMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationText_1)},...wjFlexChartAnnotationTextMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationText);export{WjFlexChartAnnotationText};export var wjFlexChartAnnotationEllipseMeta={selector:"wj-flex-chart-annotation-ellipse",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationEllipse=WjFlexChartAnnotationEllipse_1=class extends wjcChartAnnotation.Ellipse{constructor(t,e,n){super(),this.isInitialized=!1,this.wjProperty="items";this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationEllipse.meta={outputs:wjFlexChartAnnotationEllipseMeta.outputs,siblingId:"annotation"},WjFlexChartAnnotationEllipse=WjFlexChartAnnotationEllipse_1=__decorate([Component({selector:wjFlexChartAnnotationEllipseMeta.selector,template:wjFlexChartAnnotationEllipseMeta.template,inputs:wjFlexChartAnnotationEllipseMeta.inputs,outputs:wjFlexChartAnnotationEllipseMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationEllipse_1)},...wjFlexChartAnnotationEllipseMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationEllipse);export{WjFlexChartAnnotationEllipse};export var wjFlexChartAnnotationRectangleMeta={selector:"wj-flex-chart-annotation-rectangle",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationRectangle=WjFlexChartAnnotationRectangle_1=class extends wjcChartAnnotation.Rectangle{constructor(t,e,n){super(),this.isInitialized=!1,this.wjProperty="items";this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationRectangle.meta={outputs:wjFlexChartAnnotationRectangleMeta.outputs,siblingId:"annotation"},WjFlexChartAnnotationRectangle=WjFlexChartAnnotationRectangle_1=__decorate([Component({selector:wjFlexChartAnnotationRectangleMeta.selector,template:wjFlexChartAnnotationRectangleMeta.template,inputs:wjFlexChartAnnotationRectangleMeta.inputs,outputs:wjFlexChartAnnotationRectangleMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationRectangle_1)},...wjFlexChartAnnotationRectangleMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationRectangle);export{WjFlexChartAnnotationRectangle};export var wjFlexChartAnnotationLineMeta={selector:"wj-flex-chart-annotation-line",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationLine=WjFlexChartAnnotationLine_1=class extends wjcChartAnnotation.Line{constructor(t,e,n){super(),this.isInitialized=!1,this.wjProperty="items";this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationLine.meta={outputs:wjFlexChartAnnotationLineMeta.outputs,siblingId:"annotation"},WjFlexChartAnnotationLine=WjFlexChartAnnotationLine_1=__decorate([Component({selector:wjFlexChartAnnotationLineMeta.selector,template:wjFlexChartAnnotationLineMeta.template,inputs:wjFlexChartAnnotationLineMeta.inputs,outputs:wjFlexChartAnnotationLineMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationLine_1)},...wjFlexChartAnnotationLineMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationLine);export{WjFlexChartAnnotationLine};export var wjFlexChartAnnotationPolygonMeta={selector:"wj-flex-chart-annotation-polygon",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationPolygon=WjFlexChartAnnotationPolygon_1=class extends wjcChartAnnotation.Polygon{constructor(t,e,n){super(),this.isInitialized=!1,this.wjProperty="items";this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationPolygon.meta={outputs:wjFlexChartAnnotationPolygonMeta.outputs,siblingId:"annotation"},WjFlexChartAnnotationPolygon=WjFlexChartAnnotationPolygon_1=__decorate([Component({selector:wjFlexChartAnnotationPolygonMeta.selector,template:wjFlexChartAnnotationPolygonMeta.template,inputs:wjFlexChartAnnotationPolygonMeta.inputs,outputs:wjFlexChartAnnotationPolygonMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationPolygon_1)},...wjFlexChartAnnotationPolygonMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationPolygon);export{WjFlexChartAnnotationPolygon};export var wjFlexChartAnnotationCircleMeta={selector:"wj-flex-chart-annotation-circle",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationCircle=WjFlexChartAnnotationCircle_1=class extends wjcChartAnnotation.Circle{constructor(t,e,n){super(),this.isInitialized=!1,this.wjProperty="items";this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationCircle.meta={outputs:wjFlexChartAnnotationCircleMeta.outputs,siblingId:"annotation"},WjFlexChartAnnotationCircle=WjFlexChartAnnotationCircle_1=__decorate([Component({selector:wjFlexChartAnnotationCircleMeta.selector,template:wjFlexChartAnnotationCircleMeta.template,inputs:wjFlexChartAnnotationCircleMeta.inputs,outputs:wjFlexChartAnnotationCircleMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationCircle_1)},...wjFlexChartAnnotationCircleMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationCircle);export{WjFlexChartAnnotationCircle};export var wjFlexChartAnnotationSquareMeta={selector:"wj-flex-chart-annotation-square",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationSquare=WjFlexChartAnnotationSquare_1=class extends wjcChartAnnotation.Square{constructor(t,e,n){super(),this.isInitialized=!1,this.wjProperty="items";this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationSquare.meta={outputs:wjFlexChartAnnotationSquareMeta.outputs,siblingId:"annotation"},WjFlexChartAnnotationSquare=WjFlexChartAnnotationSquare_1=__decorate([Component({selector:wjFlexChartAnnotationSquareMeta.selector,template:wjFlexChartAnnotationSquareMeta.template,inputs:wjFlexChartAnnotationSquareMeta.inputs,outputs:wjFlexChartAnnotationSquareMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationSquare_1)},...wjFlexChartAnnotationSquareMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationSquare);export{WjFlexChartAnnotationSquare};export var wjFlexChartAnnotationImageMeta={selector:"wj-flex-chart-annotation-image",template:"<div><ng-content></ng-content></div>",inputs:["wjProperty","type","attachment","position","point","seriesIndex","pointIndex","offset","style","isVisible","tooltip","text","content","name","width","height","start","end","radius","length","href"],outputs:["initialized"],providers:[]};let WjFlexChartAnnotationImage=WjFlexChartAnnotationImage_1=class extends wjcChartAnnotation.Image{constructor(t,e,n){super(),this.isInitialized=!1,this.wjProperty="items";this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,n);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnnotationImage.meta={outputs:wjFlexChartAnnotationImageMeta.outputs,siblingId:"annotation"},WjFlexChartAnnotationImage=WjFlexChartAnnotationImage_1=__decorate([Component({selector:wjFlexChartAnnotationImageMeta.selector,template:wjFlexChartAnnotationImageMeta.template,inputs:wjFlexChartAnnotationImageMeta.inputs,outputs:wjFlexChartAnnotationImageMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnnotationImage_1)},...wjFlexChartAnnotationImageMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnnotationImage);export{WjFlexChartAnnotationImage};let moduleExports=[WjFlexChartAnnotationLayer,WjFlexChartAnnotationText,WjFlexChartAnnotationEllipse,WjFlexChartAnnotationRectangle,WjFlexChartAnnotationLine,WjFlexChartAnnotationPolygon,WjFlexChartAnnotationCircle,WjFlexChartAnnotationSquare,WjFlexChartAnnotationImage],WjChartAnnotationModule=class{};WjChartAnnotationModule=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartAnnotationModule);export{WjChartAnnotationModule};