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

var __extends=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function a(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(a.prototype=n.prototype,new a)}}(),__decorate=this&&this.__decorate||function(e,t,n,a){var o,r=arguments.length,i=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,a);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(i=(r<3?o(i):r>3?o(t,n,i):o(t,n))||i);return r>3&&i&&Object.defineProperty(t,n,i),i},__param=this&&this.__param||function(e,t){return function(n,a){t(n,a,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjDirectiveBaseModule,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcGauge from"wijmo/wijmo.gauge";export var wjLinearGaugeMeta={selector:"wj-linear-gauge",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","isDisabled","value","min","max","origin","isReadOnly","step","format","thickness","hasShadow","isAnimated","showText","showTicks","showRanges","stackRanges","thumbSize","tickSpacing","getText","direction"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","valueChangedNg: valueChanged","valueChangePC: valueChange"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};var WjLinearGauge=function(e){function t(t,n,a){var o=e.call(this,WjDirectiveBehavior.getHostElement(t,n))||this;o.isInitialized=!1,o.wjModelProperty="value";o._wjBehaviour=WjDirectiveBehavior.attach(o,t,n,a);return o.created(),o}var n;return __extends(t,e),n=t,t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.prototype.addEventListener=function(t,n,a,o){var r=this;void 0===o&&(o=!1);var i=WjDirectiveBehavior,u=i.ngZone;u&&i.outsideZoneEvents[n]?u.runOutsideAngular(function(){e.prototype.addEventListener.call(r,t,n,a,o)}):e.prototype.addEventListener.call(this,t,n,a,o)},t.meta={outputs:wjLinearGaugeMeta.outputs,changeEvents:{valueChanged:["value"]}},t=n=__decorate([Component({selector:wjLinearGaugeMeta.selector,template:wjLinearGaugeMeta.template,inputs:wjLinearGaugeMeta.inputs,outputs:wjLinearGaugeMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(function(){return n})}].concat(wjLinearGaugeMeta.providers)}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],t)}(wjcGauge.LinearGauge);export{WjLinearGauge};export var wjBulletGraphMeta={selector:"wj-bullet-graph",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","isDisabled","value","min","max","origin","isReadOnly","step","format","thickness","hasShadow","isAnimated","showText","showTicks","showRanges","stackRanges","thumbSize","tickSpacing","getText","direction","target","good","bad"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","valueChangedNg: valueChanged","valueChangePC: valueChange"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};var WjBulletGraph=function(e){function t(t,n,a){var o=e.call(this,WjDirectiveBehavior.getHostElement(t,n))||this;o.isInitialized=!1,o.wjModelProperty="value";o._wjBehaviour=WjDirectiveBehavior.attach(o,t,n,a);return o.created(),o}var n;return __extends(t,e),n=t,t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.prototype.addEventListener=function(t,n,a,o){var r=this;void 0===o&&(o=!1);var i=WjDirectiveBehavior,u=i.ngZone;u&&i.outsideZoneEvents[n]?u.runOutsideAngular(function(){e.prototype.addEventListener.call(r,t,n,a,o)}):e.prototype.addEventListener.call(this,t,n,a,o)},t.meta={outputs:wjBulletGraphMeta.outputs,changeEvents:{valueChanged:["value"]}},t=n=__decorate([Component({selector:wjBulletGraphMeta.selector,template:wjBulletGraphMeta.template,inputs:wjBulletGraphMeta.inputs,outputs:wjBulletGraphMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(function(){return n})}].concat(wjBulletGraphMeta.providers)}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],t)}(wjcGauge.BulletGraph);export{WjBulletGraph};export var wjRadialGaugeMeta={selector:"wj-radial-gauge",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","isDisabled","value","min","max","origin","isReadOnly","step","format","thickness","hasShadow","isAnimated","showText","showTicks","showRanges","stackRanges","thumbSize","tickSpacing","getText","autoScale","startAngle","sweepAngle"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","valueChangedNg: valueChanged","valueChangePC: valueChange"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};var WjRadialGauge=function(e){function t(t,n,a){var o=e.call(this,WjDirectiveBehavior.getHostElement(t,n))||this;o.isInitialized=!1,o.wjModelProperty="value";o._wjBehaviour=WjDirectiveBehavior.attach(o,t,n,a);return o.created(),o}var n;return __extends(t,e),n=t,t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.prototype.addEventListener=function(t,n,a,o){var r=this;void 0===o&&(o=!1);var i=WjDirectiveBehavior,u=i.ngZone;u&&i.outsideZoneEvents[n]?u.runOutsideAngular(function(){e.prototype.addEventListener.call(r,t,n,a,o)}):e.prototype.addEventListener.call(this,t,n,a,o)},t.meta={outputs:wjRadialGaugeMeta.outputs,changeEvents:{valueChanged:["value"]}},t=n=__decorate([Component({selector:wjRadialGaugeMeta.selector,template:wjRadialGaugeMeta.template,inputs:wjRadialGaugeMeta.inputs,outputs:wjRadialGaugeMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(function(){return n})}].concat(wjRadialGaugeMeta.providers)}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],t)}(wjcGauge.RadialGauge);export{WjRadialGauge};export var wjRangeMeta={selector:"wj-range",template:"",inputs:["wjProperty","color","min","max","name","thickness"],outputs:["initialized"],providers:[]};var WjRange=function(e){function t(t,n,a){var o=e.call(this)||this;o.isInitialized=!1,o.wjProperty="ranges";o._wjBehaviour=WjDirectiveBehavior.attach(o,t,n,a);return o.created(),o}var n;return __extends(t,e),n=t,t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.meta={outputs:wjRangeMeta.outputs},t=n=__decorate([Component({selector:wjRangeMeta.selector,template:wjRangeMeta.template,inputs:wjRangeMeta.inputs,outputs:wjRangeMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(function(){return n})}].concat(wjRangeMeta.providers)}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],t)}(wjcGauge.Range);export{WjRange};var moduleExports=[WjLinearGauge,WjBulletGraph,WjRadialGauge,WjRange],WjGaugeModule=function(){function e(){}return e=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:moduleExports.slice(),exports:moduleExports.slice()})],e)}();export{WjGaugeModule};