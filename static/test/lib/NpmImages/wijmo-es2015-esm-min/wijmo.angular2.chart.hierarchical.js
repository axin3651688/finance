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

var WjSunburst_1,WjTreeMap_1,__decorate=this&&this.__decorate||function(e,t,r,o){var n,a=arguments.length,i=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(i=(a<3?n(i):a>3?n(t,r,i):n(t,r))||i);return a>3&&i&&Object.defineProperty(t,r,i),i},__param=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjDirectiveBaseModule,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcChartHierarchical from"wijmo/wijmo.chart.hierarchical";export var wjSunburstMeta={selector:"wj-sunburst",template:"<div><ng-content></ng-content></div>",inputs:["wjModelProperty","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingName","innerRadius","isAnimated","offset","reversed","startAngle","selectedIndex","selectedItemPosition","selectedItemOffset","itemFormatter","labelContent","childItemsPath"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjSunburst=WjSunburst_1=class extends wjcChartHierarchical.Sunburst{constructor(e,t,r){super(WjDirectiveBehavior.getHostElement(e,t)),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,r,o=!1){let n=WjDirectiveBehavior,a=n.ngZone;a&&n.outsideZoneEvents[t]?a.runOutsideAngular(()=>{super.addEventListener(e,t,r,o)}):super.addEventListener(e,t,r,o)}get tooltipContent(){return this.tooltip.content}set tooltipContent(e){this.tooltip.content=e}get labelContent(){return this.dataLabel.content}set labelContent(e){this.dataLabel.content=e}};WjSunburst.meta={outputs:wjSunburstMeta.outputs},WjSunburst=WjSunburst_1=__decorate([Component({selector:wjSunburstMeta.selector,template:wjSunburstMeta.template,inputs:wjSunburstMeta.inputs,outputs:wjSunburstMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjSunburst_1)},...wjSunburstMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjSunburst);export{WjSunburst};export var wjTreeMapMeta={selector:"wj-tree-map",template:"",inputs:["wjModelProperty","isDisabled","binding","footer","header","selectionMode","palette","plotMargin","footerStyle","headerStyle","tooltipContent","itemsSource","bindingName","maxDepth","type","labelContent","childItemsPath"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","renderingNg: rendering","renderedNg: rendered","selectionChangedNg: selectionChanged"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjTreeMap=WjTreeMap_1=class extends wjcChartHierarchical.TreeMap{constructor(e,t,r){super(WjDirectiveBehavior.getHostElement(e,t)),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,r,o=!1){let n=WjDirectiveBehavior,a=n.ngZone;a&&n.outsideZoneEvents[t]?a.runOutsideAngular(()=>{super.addEventListener(e,t,r,o)}):super.addEventListener(e,t,r,o)}get tooltipContent(){return this.tooltip.content}set tooltipContent(e){this.tooltip.content=e}get labelContent(){return this.dataLabel.content}set labelContent(e){this.dataLabel.content=e}};WjTreeMap.meta={outputs:wjTreeMapMeta.outputs},WjTreeMap=WjTreeMap_1=__decorate([Component({selector:wjTreeMapMeta.selector,template:wjTreeMapMeta.template,inputs:wjTreeMapMeta.inputs,outputs:wjTreeMapMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjTreeMap_1)},...wjTreeMapMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjTreeMap);export{WjTreeMap};let moduleExports=[WjSunburst,WjTreeMap],WjChartHierarchicalModule=class{};WjChartHierarchicalModule=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartHierarchicalModule);export{WjChartHierarchicalModule};