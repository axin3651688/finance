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

var __extends=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),__decorate=this&&this.__decorate||function(e,t,o,r){var n,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,r);else for(var p=e.length-1;p>=0;p--)(n=e[p])&&(a=(i<3?n(a):i>3?n(t,o,a):n(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},__param=this&&this.__param||function(e,t){return function(o,r){t(o,r,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjDirectiveBaseModule,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcGridGrouppanel from"wijmo/wijmo.grid.grouppanel";export var wjGroupPanelMeta={selector:"wj-group-panel",template:"",inputs:["wjModelProperty","isDisabled","hideGroupedColumns","showDragGlyphs","maxGroups","placeholder","filter","grid"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};var WjGroupPanel=function(e){function t(t,o,r){var n=e.call(this,WjDirectiveBehavior.getHostElement(t,o))||this;n.isInitialized=!1;n._wjBehaviour=WjDirectiveBehavior.attach(n,t,o,r);return n.created(),n}var o;return __extends(t,e),o=t,t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.prototype.addEventListener=function(t,o,r,n){var i=this;void 0===n&&(n=!1);var a=WjDirectiveBehavior,p=a.ngZone;p&&a.outsideZoneEvents[o]?p.runOutsideAngular(function(){e.prototype.addEventListener.call(i,t,o,r,n)}):e.prototype.addEventListener.call(this,t,o,r,n)},t.meta={outputs:wjGroupPanelMeta.outputs},t=o=__decorate([Component({selector:wjGroupPanelMeta.selector,template:wjGroupPanelMeta.template,inputs:wjGroupPanelMeta.inputs,outputs:wjGroupPanelMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(function(){return o})}].concat(wjGroupPanelMeta.providers)}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],t)}(wjcGridGrouppanel.GroupPanel);export{WjGroupPanel};var moduleExports=[WjGroupPanel],WjGridGrouppanelModule=function(){function e(){}return e=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:moduleExports.slice(),exports:moduleExports.slice()})],e)}();export{WjGridGrouppanelModule};