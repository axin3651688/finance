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

var WjTreeView_1,WjTabPanel_1,WjTab_1,__decorate=this&&this.__decorate||function(e,t,a,n){var i,o=arguments.length,r=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,a,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(r=(o<3?i(r):o>3?i(t,a,r):i(t,a))||r);return o>3&&r&&Object.defineProperty(t,a,r),r},__param=this&&this.__param||function(e,t){return function(a,n){t(a,n,e)}};import{Component,NgModule,ElementRef,Injector,Optional,forwardRef,Inject,SkipSelf}from"@angular/core";import{CommonModule}from"@angular/common";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{WjDirectiveBehavior,WjDirectiveBaseModule,WjValueAccessorFactory}from"wijmo/wijmo.angular2.directiveBase";import*as wjcCore from"wijmo/wijmo";import*as wjcNav from"wijmo/wijmo.nav";export var wjTreeViewMeta={selector:"wj-tree-view",template:"",inputs:["asyncBindings","wjModelProperty","isDisabled","childItemsPath","displayMemberPath","imageMemberPath","checkedMemberPath","isContentHtml","showCheckboxes","autoCollapse","isAnimated","isReadOnly","allowDragging","checkOnClick","expandOnClick","expandOnLoad","lazyLoadFunction","itemsSource","selectedItem","selectedNode","checkedItems"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","itemsSourceChangedNg: itemsSourceChanged","loadingItemsNg: loadingItems","loadedItemsNg: loadedItems","itemClickedNg: itemClicked","selectedItemChangedNg: selectedItemChanged","selectedItemChangePC: selectedItemChange","selectedNodeChangePC: selectedNodeChange","checkedItemsChangedNg: checkedItemsChanged","checkedItemsChangePC: checkedItemsChange","isCollapsedChangingNg: isCollapsedChanging","isCollapsedChangedNg: isCollapsedChanged","isCheckedChangingNg: isCheckedChanging","isCheckedChangedNg: isCheckedChanged","formatItemNg: formatItem","dragStartNg: dragStart","dragOverNg: dragOver","dropNg: drop","dragEndNg: dragEnd","nodeEditStartingNg: nodeEditStarting","nodeEditStartedNg: nodeEditStarted","nodeEditEndingNg: nodeEditEnding","nodeEditEndedNg: nodeEditEnded"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjTreeView=WjTreeView_1=class extends wjcNav.TreeView{constructor(e,t,a){super(WjDirectiveBehavior.getHostElement(e,t)),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,a);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,a,n=!1){let i=WjDirectiveBehavior,o=i.ngZone;o&&i.outsideZoneEvents[t]?o.runOutsideAngular(()=>{super.addEventListener(e,t,a,n)}):super.addEventListener(e,t,a,n)}};WjTreeView.meta={outputs:wjTreeViewMeta.outputs,changeEvents:{selectedItemChanged:["selectedItem","selectedNode"],checkedItemsChanged:["checkedItems"]}},WjTreeView=WjTreeView_1=__decorate([Component({selector:wjTreeViewMeta.selector,template:wjTreeViewMeta.template,inputs:wjTreeViewMeta.inputs,outputs:wjTreeViewMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjTreeView_1)},...wjTreeViewMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjTreeView);export{WjTreeView};export var wjTabPanelMeta={selector:"wj-tab-panel",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjModelProperty","isDisabled","isAnimated","autoSwitch","selectedIndex","selectedTab"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","selectedIndexChangedNg: selectedIndexChanged","selectedIndexChangePC: selectedIndexChange","selectedTabChangePC: selectedTabChange"],providers:[{provide:NG_VALUE_ACCESSOR,useFactory:WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjTabPanel=WjTabPanel_1=class extends wjcNav.TabPanel{constructor(e,t,a){super(WjDirectiveBehavior.getHostElement(e,t)),this.isInitialized=!1;this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,a);this.created()}created(){}ngOnInit(){this.tabs.beginUpdate(),this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this.selectedIndex<0&&this.tabs.length&&(this.selectedIndex=0),this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,t,a,n=!1){let i=WjDirectiveBehavior,o=i.ngZone;o&&i.outsideZoneEvents[t]?o.runOutsideAngular(()=>{super.addEventListener(e,t,a,n)}):super.addEventListener(e,t,a,n)}ngAfterContentInit(){let e=this.selectedIndex,t=this.tabs;e>-1&&e<t.length&&wjcCore.addClass(t[e].header,"wj-state-active"),t.endUpdate()}};WjTabPanel.meta={outputs:wjTabPanelMeta.outputs,changeEvents:{selectedIndexChanged:["selectedIndex","selectedTab"]}},WjTabPanel=WjTabPanel_1=__decorate([Component({selector:wjTabPanelMeta.selector,template:wjTabPanelMeta.template,inputs:wjTabPanelMeta.inputs,outputs:wjTabPanelMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjTabPanel_1)},...wjTabPanelMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjTabPanel);export{WjTabPanel};export var wjTabMeta={selector:"wj-tab",template:"<ng-content></ng-content>",inputs:["wjProperty","isDisabled","isVisible"],outputs:["initialized"],providers:[]};let WjTab=WjTab_1=class extends wjcNav.Tab{constructor(e,t,a){super(document.createElement("div"),document.createElement("div")),this.isInitialized=!1,this.wjProperty="tabs";this._wjBehaviour=WjDirectiveBehavior.attach(this,e,t,a);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}ngAfterContentInit(){let e=this._wjBehaviour.elementRef.nativeElement;this._setParts(e.children[0],e.children[1])}};WjTab.meta={outputs:wjTabMeta.outputs},WjTab=WjTab_1=__decorate([Component({selector:wjTabMeta.selector,template:wjTabMeta.template,inputs:wjTabMeta.inputs,outputs:wjTabMeta.outputs,providers:[{provide:"WjComponent",useExisting:forwardRef(()=>WjTab_1)},...wjTabMeta.providers]}),__param(0,Inject(ElementRef)),__param(1,Inject(Injector)),__param(2,Inject("WjComponent")),__param(2,SkipSelf()),__param(2,Optional())],WjTab);export{WjTab};let moduleExports=[WjTreeView,WjTabPanel,WjTab],WjNavModule=class{};WjNavModule=__decorate([NgModule({imports:[WjDirectiveBaseModule,CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjNavModule);export{WjNavModule};