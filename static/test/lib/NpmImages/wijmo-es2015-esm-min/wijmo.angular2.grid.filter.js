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

var WjFlexGridFilter_1,__decorate=this&&this.__decorate||function(e,t,r,i){var l,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(l=e[a])&&(n=(o<3?l(n):o>3?l(t,r,n):l(t,r))||n);return o>3&&n&&Object.defineProperty(t,r,n),n},__param=this&&this.__param||function(e,t){return function(r,i){t(r,i,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{WjDirectiveBehavior,WjDirectiveBaseModule}from"wijmo/wijmo.angular2.directiveBase";import*as wjcGridFilter from"wijmo/wijmo.grid.filter";export var wjFlexGridFilterMeta={selector:"wj-flex-grid-filter",template:"",inputs:["wjProperty","showFilterIcons","showSortButtons","defaultFilterType","filterColumns"],outputs:["initialized","filterChangingNg: filterChanging","filterChangedNg: filterChanged","filterAppliedNg: filterApplied"],providers:[]};let WjFlexGridFilter=WjFlexGridFilter_1=class extends wjcGridFilter.FlexGridFilter{constructor(e,t,r){super(r),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexGridFilter.meta={outputs:wjFlexGridFilterMeta.outputs},WjFlexGridFilter=WjFlexGridFilter_1=__decorate([Component({selector:wjFlexGridFilterMeta.selector,template:wjFlexGridFilterMeta.template,inputs:wjFlexGridFilterMeta.inputs,outputs:wjFlexGridFilterMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexGridFilter_1)},...wjFlexGridFilterMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexGridFilter);export{WjFlexGridFilter};let moduleExports=[WjFlexGridFilter],WjGridFilterModule=class{};WjGridFilterModule=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjGridFilterModule);export{WjGridFilterModule};