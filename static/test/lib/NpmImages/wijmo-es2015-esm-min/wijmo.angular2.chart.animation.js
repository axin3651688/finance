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

var WjFlexChartAnimation_1,__decorate=this&&this.__decorate||function(t,e,i,a){var o,n=arguments.length,r=n<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,a);else for(var m=t.length-1;m>=0;m--)(o=t[m])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},__param=this&&this.__param||function(t,e){return function(i,a){e(i,a,t)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{WjDirectiveBehavior,WjDirectiveBaseModule}from"wijmo/wijmo.angular2.directiveBase";import*as wjcChartAnimation from"wijmo/wijmo.chart.animation";export var wjFlexChartAnimationMeta={selector:"wj-flex-chart-animation",template:"",inputs:["wjProperty","animationMode","easing","duration","axisAnimation"],outputs:["initialized"],providers:[]};let WjFlexChartAnimation=WjFlexChartAnimation_1=class extends wjcChartAnimation.ChartAnimation{constructor(t,e,i){super(i),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,t,e,i);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartAnimation.meta={outputs:wjFlexChartAnimationMeta.outputs},WjFlexChartAnimation=WjFlexChartAnimation_1=__decorate([Component({selector:wjFlexChartAnimationMeta.selector,template:wjFlexChartAnimationMeta.template,inputs:wjFlexChartAnimationMeta.inputs,outputs:wjFlexChartAnimationMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjFlexChartAnimation_1)},...wjFlexChartAnimationMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjFlexChartAnimation);export{WjFlexChartAnimation};let moduleExports=[WjFlexChartAnimation],WjChartAnimationModule=class{};WjChartAnimationModule=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartAnimationModule);export{WjChartAnimationModule};