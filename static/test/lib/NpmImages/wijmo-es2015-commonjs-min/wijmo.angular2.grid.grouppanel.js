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

"use strict";var WjGroupPanel_1,__decorate=this&&this.__decorate||function(e,r,o,t){var a,i=arguments.length,n=i<3?r:null===t?t=Object.getOwnPropertyDescriptor(r,o):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,r,o,t);else for(var u=e.length-1;u>=0;u--)(a=e[u])&&(n=(i<3?a(n):i>3?a(r,o,n):a(r,o))||n);return i>3&&n&&Object.defineProperty(r,o,n),n},__param=this&&this.__param||function(e,r){return function(o,t){r(o,t,e)}};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcGridGrouppanel=require("wijmo/wijmo.grid.grouppanel");exports.wjGroupPanelMeta={selector:"wj-group-panel",template:"",inputs:["wjModelProperty","isDisabled","hideGroupedColumns","showDragGlyphs","maxGroups","placeholder","filter","grid"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjGroupPanel=WjGroupPanel_1=class extends wjcGridGrouppanel.GroupPanel{constructor(e,r,o){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,r)),this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,r,o);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,r,o,t=!1){let a=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,i=a.ngZone;i&&a.outsideZoneEvents[r]?i.runOutsideAngular(()=>{super.addEventListener(e,r,o,t)}):super.addEventListener(e,r,o,t)}};WjGroupPanel.meta={outputs:exports.wjGroupPanelMeta.outputs},WjGroupPanel=WjGroupPanel_1=__decorate([core_1.Component({selector:exports.wjGroupPanelMeta.selector,template:exports.wjGroupPanelMeta.template,inputs:exports.wjGroupPanelMeta.inputs,outputs:exports.wjGroupPanelMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjGroupPanel_1)},...exports.wjGroupPanelMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjGroupPanel),exports.WjGroupPanel=WjGroupPanel;let moduleExports=[WjGroupPanel],WjGridGrouppanelModule=class{};WjGridGrouppanelModule=__decorate([core_1.NgModule({imports:[wijmo_angular2_directiveBase_1.WjDirectiveBaseModule,common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjGridGrouppanelModule),exports.WjGridGrouppanelModule=WjGridGrouppanelModule;