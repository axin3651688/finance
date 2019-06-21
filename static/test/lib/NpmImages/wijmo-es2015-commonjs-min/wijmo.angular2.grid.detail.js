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

"use strict";var WjFlexGridDetail_1,__decorate=this&&this.__decorate||function(e,t,i,r){var a,o=arguments.length,l=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,r);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(l=(o<3?a(l):o>3?a(t,i,l):a(t,i))||l);return o>3&&l&&Object.defineProperty(t,i,l),l},__param=this&&this.__param||function(e,t){return function(i,r){t(i,r,e)}};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcGridDetail=require("wijmo/wijmo.grid.detail");exports.wjFlexGridDetailMeta={selector:"[wjFlexGridDetail]",inputs:["wjFlexGridDetail","maxHeight","keyActionEnter","detailVisibilityMode","rowHasDetail","isAnimated"],outputs:["initialized"],exportAs:"wjFlexGridDetail",providers:[]};let WjFlexGridDetail=WjFlexGridDetail_1=class extends wjcGridDetail.FlexGridDetailProvider{constructor(e,t,i,r,a,o){super(i),this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,i);this._viewContainerRef=r,this._templateRef=a,this._domRenderer=o,this._init(),this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}_init(){this.createDetailCell=((e,t)=>{let i=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(this.grid.hostElement,this._viewContainerRef,this._templateRef,this._domRenderer,!1,{row:e,col:t,item:e.dataItem}),r=i.viewRef,a=i.rootElement;return r.detectChanges(),a.parentElement.removeChild(a),a[WjFlexGridDetail_1._viewRefProp]=r,a}),this.disposeDetailCell=(e=>{let t;if(e.detail&&(t=e.detail[WjFlexGridDetail_1._viewRefProp])){e.detail[WjFlexGridDetail_1._viewRefProp]=null;let i=this._viewContainerRef.indexOf(t);i>-1&&this._viewContainerRef.remove(i)}})}};WjFlexGridDetail._viewRefProp="__wj_viewRef",WjFlexGridDetail.meta={outputs:exports.wjFlexGridDetailMeta.outputs},WjFlexGridDetail=WjFlexGridDetail_1=__decorate([core_1.Directive({selector:exports.wjFlexGridDetailMeta.selector,inputs:exports.wjFlexGridDetailMeta.inputs,outputs:exports.wjFlexGridDetailMeta.outputs,exportAs:exports.wjFlexGridDetailMeta.exportAs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexGridDetail_1)},...exports.wjFlexGridDetailMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional()),__param(3,core_1.Inject(core_1.ViewContainerRef)),__param(4,core_1.Inject(core_1.TemplateRef)),__param(5,core_1.Inject(core_1.Renderer))],WjFlexGridDetail),exports.WjFlexGridDetail=WjFlexGridDetail;let moduleExports=[WjFlexGridDetail],WjGridDetailModule=class{};WjGridDetailModule=__decorate([core_1.NgModule({imports:[wijmo_angular2_directiveBase_1.WjDirectiveBaseModule,common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjGridDetailModule),exports.WjGridDetailModule=WjGridDetailModule;