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

"use strict";var __decorate=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,p=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(e,t,o,r);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(p=(n<3?i(p):n>3?i(t,o,p):i(t,o))||p);return n>3&&p&&Object.defineProperty(t,o,p),p},__param=this&&this.__param||function(e,t){return function(o,r){t(o,r,e)}};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),common_1=require("@angular/common"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),ngCore=require("@angular/core"),wjcCore=require("wijmo/wijmo");exports.wjTooltipMeta={selector:"[wjTooltip]",inputs:[],outputs:["initialized"],exportAs:"wjTooltip",providers:[]};var WjTooltip=function(){function e(e,o,r){this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,r);this._elRef=e,t._toolTip||(t._toolTip=new wjcCore.Tooltip),this.created()}var t;return t=e,e.prototype.created=function(){},e.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},e.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},e.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy(),this.wjTooltip=null},Object.defineProperty(e.prototype,"wjTooltip",{get:function(){return this._toolTipText},set:function(e){this._toolTipText!=e&&(this._toolTipText,t._toolTip.setTooltip(this._elRef.nativeElement,e))},enumerable:!0,configurable:!0}),e.meta={outputs:exports.wjTooltipMeta.outputs},__decorate([core_1.Input()],e.prototype,"wjTooltip",null),e=t=__decorate([core_1.Directive({selector:exports.wjTooltipMeta.selector,inputs:exports.wjTooltipMeta.inputs,outputs:exports.wjTooltipMeta.outputs,exportAs:exports.wjTooltipMeta.exportAs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(function(){return t})}].concat(exports.wjTooltipMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],e)}();exports.WjTooltip=WjTooltip;var WjComponentLoader=function(){function e(e,t){this._cmpResolver=e,this._elementRef=t,this._isInit=!1,this.propertiesChange=new ngCore.EventEmitter}return Object.defineProperty(e.prototype,"component",{get:function(){return this._component},set:function(e){this._component!==e&&(this._component=e,this._createComponent())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"properties",{get:function(){return this._properties},set:function(e){this._properties=e,this._updateProperties()},enumerable:!0,configurable:!0}),e.prototype.ngOnInit=function(){this._isInit=!0,this._createComponent()},e.prototype._createComponent=function(){if(this._isInit){this._cmpRef&&(this._cmpRef.destroy(),this._cmpRef=null);var e=this._component;e&&this._anchor&&(this._cmpRef=this._anchor.createComponent(this._cmpResolver.resolveComponentFactory(e)),this._updateProperties())}},e.prototype._updateProperties=function(){var e=this._cmpRef&&this._cmpRef.instance,t=this.properties;if(e&&t)for(var o=0,r=Object.getOwnPropertyNames(t);o<r.length;o++){var i=r[o];e[i]=t[i];var n=e[i+"Change"];n instanceof core_1.EventEmitter&&this._addPropListener(e,i,n)}},e.prototype._addPropListener=function(e,t,o){var r=this;o.subscribe(function(o){r.properties[t]=r.properties[t]=e[t],r.propertiesChange.next(r.properties)})},__decorate([core_1.ViewChild("anchor",{read:core_1.ViewContainerRef})],e.prototype,"_anchor",void 0),e=__decorate([core_1.Component({selector:"wj-component-loader",template:"<div #anchor></div>",inputs:["component","properties"],outputs:["propertiesChange"]}),__param(0,core_1.Inject(core_1.ComponentFactoryResolver)),__param(1,core_1.Inject(core_1.ElementRef))],e)}();exports.WjComponentLoader=WjComponentLoader;var moduleExports=[WjTooltip,WjComponentLoader],WjCoreModule=function(){function e(){}return e=__decorate([core_1.NgModule({imports:[wijmo_angular2_directiveBase_1.WjDirectiveBaseModule,common_1.CommonModule],declarations:moduleExports.slice(),exports:moduleExports.slice()})],e)}();exports.WjCoreModule=WjCoreModule;