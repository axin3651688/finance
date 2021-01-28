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

var WjFlexRadar_1,WjFlexRadarAxis_1,WjFlexRadarSeries_1,__decorate=this&&this.__decorate||function(e,t,a,r){var i,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,r);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(o<3?i(n):o>3?i(t,a,n):i(t,a))||n);return o>3&&n&&Object.defineProperty(t,a,n),n},__param=this&&this.__param||function(e,t){return function(a,r){t(a,r,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjDirectiveBaseModule,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcChartRadar from"wijmo/wijmo.chart.radar";export var wjFlexRadarMeta={selector:"wj-flex-radar",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingX","interpolateNulls","legendToggle","symbolSize","options","selection","itemFormatter","labelContent","chartType","startAngle","totalAngle","reversed","stacking"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged","selectionChangePC: selectionChange","seriesVisibilityChangedNg: seriesVisibilityChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjFlexRadar=WjFlexRadar_1=class extends wjcChartRadar.FlexRadar{constructor(e,t,a){super(WjDirectiveBehavior.getHostElement(e,t)),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,a);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,a,r=!1){let i=WjDirectiveBehavior,o=i.ngZone;o&&i.outsideZoneEvents[t]?o.runOutsideAngular(()=>{super.addEventListener(e,t,a,r)}):super.addEventListener(e,t,a,r)}get tooltipContent(){return this.tooltip.content}set tooltipContent(e){this.tooltip.content=e}get labelContent(){return this.dataLabel.content}set labelContent(e){this.dataLabel.content=e}};WjFlexRadar.meta={outputs:wjFlexRadarMeta.outputs,changeEvents:{selectionChanged:["selection"]}},WjFlexRadar=WjFlexRadar_1=__decorate([Component({selector:wjFlexRadarMeta.selector,template:wjFlexRadarMeta.template,inputs:wjFlexRadarMeta.inputs,outputs:wjFlexRadarMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexRadar_1)},...wjFlexRadarMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexRadar);export{WjFlexRadar};export var wjFlexRadarAxisMeta={selector:"wj-flex-radar-axis",template:"",inputs:["wjProperty","axisLine","format","labels","majorGrid","majorTickMarks","majorUnit","max","min","position","reversed","title","labelAngle","minorGrid","minorTickMarks","minorUnit","origin","logBase","plotArea","labelAlign","name","overlappingLabels","labelPadding","itemFormatter","itemsSource","binding"],outputs:["initialized","rangeChangedNg: rangeChanged"],providers:[]};let WjFlexRadarAxis=WjFlexRadarAxis_1=class extends wjcChartRadar.FlexRadarAxis{constructor(e,t,a){super(),this.isInitialized=!1,this.wjProperty="axes";this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,a);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexRadarAxis.meta={outputs:wjFlexRadarAxisMeta.outputs},WjFlexRadarAxis=WjFlexRadarAxis_1=__decorate([Component({selector:wjFlexRadarAxisMeta.selector,template:wjFlexRadarAxisMeta.template,inputs:wjFlexRadarAxisMeta.inputs,outputs:wjFlexRadarAxisMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexRadarAxis_1)},...wjFlexRadarAxisMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexRadarAxis);export{WjFlexRadarAxis};export var wjFlexRadarSeriesMeta={selector:"wj-flex-radar-series",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","axisX","axisY","binding","bindingX","cssClass","name","style","altStyle","symbolMarker","symbolSize","symbolStyle","visibility","itemsSource","interpolateNulls","tooltipContent","itemFormatter","chartType"],outputs:["initialized","renderingNg: rendering","renderedNg: rendered","visibilityChangePC: visibilityChange"],providers:[]};let WjFlexRadarSeries=WjFlexRadarSeries_1=class extends wjcChartRadar.FlexRadarSeries{constructor(e,t,a){super(),this.isInitialized=!1,this.wjProperty="series";this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,a);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexRadarSeries.meta={outputs:wjFlexRadarSeriesMeta.outputs,changeEvents:{"chart.seriesVisibilityChanged":["visibility"]},siblingId:"series"},WjFlexRadarSeries=WjFlexRadarSeries_1=__decorate([Component({selector:wjFlexRadarSeriesMeta.selector,template:wjFlexRadarSeriesMeta.template,inputs:wjFlexRadarSeriesMeta.inputs,outputs:wjFlexRadarSeriesMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexRadarSeries_1)},...wjFlexRadarSeriesMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexRadarSeries);export{WjFlexRadarSeries};let moduleExports=[WjFlexRadar,WjFlexRadarAxis,WjFlexRadarSeries],WjChartRadarModule=class{};WjChartRadarModule=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartRadarModule);export{WjChartRadarModule};