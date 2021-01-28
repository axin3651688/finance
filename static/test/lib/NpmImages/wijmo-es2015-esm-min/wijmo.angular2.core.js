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

var WjTooltip_1,__decorate=this&&this.__decorate||function(e,t,o,i){var r,p=arguments.length,n=p<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(p<3?r(n):p>3?r(t,o,n):r(t,o))||n);return p>3&&n&&Object.defineProperty(t,o,n),n},__param=this&&this.__param||function(e,t){return function(o,i){t(o,i,e)}};import{Component,EventEmitter,NgModule,ViewChild,ComponentFactoryResolver,ElementRef,Injector,Directive,ViewContainerRef,Optional,forwardRef,Input,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{WjDirectiveBehavior,WjDirectiveBaseModule}from"wijmo/wijmo.angular2.directiveBase";import*as ngCore from"@angular/core";import*as wjcCore from"wijmo/wijmo";export var wjTooltipMeta={selector:"[wjTooltip]",inputs:[],outputs:["initialized"],exportAs:"wjTooltip",providers:[]};let WjTooltip=WjTooltip_1=class{constructor(e,t,o){this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,o);this._elRef=e,WjTooltip_1._toolTip||(WjTooltip_1._toolTip=new wjcCore.Tooltip),this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy(),this.wjTooltip=null}get wjTooltip(){return this._toolTipText}set wjTooltip(e){this._toolTipText!=e&&(this._toolTipText,WjTooltip_1._toolTip.setTooltip(this._elRef.nativeElement,e))}};WjTooltip.meta={outputs:wjTooltipMeta.outputs},__decorate([Input()],WjTooltip.prototype,"wjTooltip",null),WjTooltip=WjTooltip_1=__decorate([Directive({selector:wjTooltipMeta.selector,inputs:wjTooltipMeta.inputs,outputs:wjTooltipMeta.outputs,exportAs:wjTooltipMeta.exportAs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjTooltip_1)},...wjTooltipMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjTooltip);export{WjTooltip};let WjComponentLoader=class{constructor(e,t){this._cmpResolver=e,this._elementRef=t,this._isInit=!1,this.propertiesChange=new ngCore.EventEmitter}get component(){return this._component}set component(e){this._component!==e&&(this._component=e,this._createComponent())}get properties(){return this._properties}set properties(e){this._properties=e,this._updateProperties()}ngOnInit(){this._isInit=!0,this._createComponent()}_createComponent(){if(this._isInit){this._cmpRef&&(this._cmpRef.destroy(),this._cmpRef=null);let e=this._component;e&&this._anchor&&(this._cmpRef=this._anchor.createComponent(this._cmpResolver.resolveComponentFactory(e)),this._updateProperties())}}_updateProperties(){let e=this._cmpRef&&this._cmpRef.instance,t=this.properties;if(e&&t){let o=Object.getOwnPropertyNames(t);for(let i of o){e[i]=t[i];let o=e[i+"Change"];o instanceof EventEmitter&&this._addPropListener(e,i,o)}}}_addPropListener(e,t,o){o.subscribe(o=>{this.properties[t]=this.properties[t]=e[t],this.propertiesChange.next(this.properties)})}};__decorate([ViewChild("anchor",{read:ViewContainerRef})],WjComponentLoader.prototype,"_anchor",void 0),WjComponentLoader=__decorate([Component({selector:"wj-component-loader",template:"<div #anchor></div>",inputs:["component","properties"],outputs:["propertiesChange"]}),__param(0,Inject(ComponentFactoryResolver)),__param(1,Inject(ElementRef))],WjComponentLoader);export{WjComponentLoader};let moduleExports=[WjTooltip,WjComponentLoader],WjCoreModule=class{};WjCoreModule=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjCoreModule);export{WjCoreModule};