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

"use strict";var WjFlexChartRangeSelector_1,WjFlexChartGestures_1,__decorate=this&&this.__decorate||function(e,t,r,a){var o,s=arguments.length,n=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,r):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,a);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(n=(s<3?o(n):s>3?o(t,r,n):o(t,r))||n);return s>3&&n&&Object.defineProperty(t,r,n),n},__param=this&&this.__param||function(e,t){return function(r,a){t(r,a,e)}};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcChartInteraction=require("wijmo/wijmo.chart.interaction");exports.wjFlexChartRangeSelectorMeta={selector:"wj-flex-chart-range-selector",template:"",inputs:["wjProperty","isVisible","min","max","orientation","seamless","minScale","maxScale"],outputs:["initialized","rangeChangedNg: rangeChanged"],providers:[]};let WjFlexChartRangeSelector=WjFlexChartRangeSelector_1=class extends wjcChartInteraction.RangeSelector{constructor(e,t,r){super(r),this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartRangeSelector.meta={outputs:exports.wjFlexChartRangeSelectorMeta.outputs},WjFlexChartRangeSelector=WjFlexChartRangeSelector_1=__decorate([core_1.Component({selector:exports.wjFlexChartRangeSelectorMeta.selector,template:exports.wjFlexChartRangeSelectorMeta.template,inputs:exports.wjFlexChartRangeSelectorMeta.inputs,outputs:exports.wjFlexChartRangeSelectorMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartRangeSelector_1)},...exports.wjFlexChartRangeSelectorMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartRangeSelector),exports.WjFlexChartRangeSelector=WjFlexChartRangeSelector,exports.wjFlexChartGesturesMeta={selector:"wj-flex-chart-gestures",template:"",inputs:["wjProperty","mouseAction","interactiveAxes","enable","scaleX","scaleY","posX","posY"],outputs:["initialized"],providers:[]};let WjFlexChartGestures=WjFlexChartGestures_1=class extends wjcChartInteraction.ChartGestures{constructor(e,t,r){super(r),this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,t,r);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}};WjFlexChartGestures.meta={outputs:exports.wjFlexChartGesturesMeta.outputs},WjFlexChartGestures=WjFlexChartGestures_1=__decorate([core_1.Component({selector:exports.wjFlexChartGesturesMeta.selector,template:exports.wjFlexChartGesturesMeta.template,inputs:exports.wjFlexChartGesturesMeta.inputs,outputs:exports.wjFlexChartGesturesMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjFlexChartGestures_1)},...exports.wjFlexChartGesturesMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjFlexChartGestures),exports.WjFlexChartGestures=WjFlexChartGestures;let moduleExports=[WjFlexChartRangeSelector,WjFlexChartGestures],WjChartInteractionModule=class{};WjChartInteractionModule=__decorate([core_1.NgModule({imports:[wijmo_angular2_directiveBase_1.WjDirectiveBaseModule,common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjChartInteractionModule),exports.WjChartInteractionModule=WjChartInteractionModule;