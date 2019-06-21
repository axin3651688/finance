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

var __extends=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}(),__decorate=this&&this.__decorate||function(t,e,o,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(a=(i<3?r(a):i>3?r(e,o,a):r(e,o))||a);return i>3&&a&&Object.defineProperty(e,o,a),a},__param=this&&this.__param||function(t,e){return function(o,n){e(o,n,t)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{WjDirectiveBehavior,WjDirectiveBaseModule}from"wijmo/wijmo.angular2.directiveBase";import*as wjcChartAnimation from"wijmo/wijmo.chart.animation";export var wjFlexChartAnimationMeta={selector:"wj-flex-chart-animation",template:"",inputs:["wjProperty","animationMode","easing","duration","axisAnimation"],outputs:["initialized"],providers:[]};var WjFlexChartAnimation=function(t){function e(e,o,n){var r=t.call(this,n)||this;r.isInitialized=!1;r._wjBehaviour=WjDirectiveBehavior.attach(r,e,o,n);return r.created(),r}var o;return __extends(e,t),o=e,e.prototype.created=function(){},e.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},e.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},e.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},e.meta={outputs:wjFlexChartAnimationMeta.outputs},e=o=__decorate([Component({selector:wjFlexChartAnimationMeta.selector,template:wjFlexChartAnimationMeta.template,inputs:wjFlexChartAnimationMeta.inputs,outputs:wjFlexChartAnimationMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(function(){return o})}].concat(wjFlexChartAnimationMeta.providers)}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],e)}(wjcChartAnimation.ChartAnimation);export{WjFlexChartAnimation};var moduleExports=[WjFlexChartAnimation],WjChartAnimationModule=function(){function t(){}return t=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:moduleExports.slice(),exports:moduleExports.slice()})],t)}();export{WjChartAnimationModule};