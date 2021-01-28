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

"use strict";var WjMultiRow_1,__decorate=this&&this.__decorate||function(e,o,t,i){var r,n=arguments.length,a=n<3?o:null===i?i=Object.getOwnPropertyDescriptor(o,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,o,t,i);else for(var d=e.length-1;d>=0;d--)(r=e[d])&&(a=(n<3?r(a):n>3?r(o,t,a):r(o,t))||a);return n>3&&a&&Object.defineProperty(o,t,a),a},__param=this&&this.__param||function(e,o){return function(t,i){o(t,i,e)}};Object.defineProperty(exports,"__esModule",{value:!0});const core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcGridMultirow=require("wijmo/wijmo.grid.multirow");exports.wjMultiRowMeta={selector:"wj-multi-row",template:"",inputs:["wjModelProperty","isDisabled","newRowAtTop","allowAddNew","allowDelete","allowDragging","allowMerging","allowResizing","allowSorting","quickAutoSize","autoScroll","autoSearch","autoSizeMode","autoGenerateColumns","childItemsPath","groupHeaderFormat","headersVisibility","showSelectedHeaders","showMarquee","itemFormatter","isReadOnly","imeEnabled","mergeManager","selectionMode","showGroups","showSort","showDropDown","showAlternatingRows","showErrors","alternatingRowStep","validateEdits","treeIndent","itemsSource","autoClipboard","frozenRows","frozenColumns","cloneFrozenCells","deferResizing","sortRowIndex","editColumnIndex","stickyHeaders","preserveSelectedState","preserveOutlineState","keyActionTab","keyActionEnter","rowHeaderPath","virtualizationThreshold","anchorCursor","layoutDefinition","centerHeadersVertically","collapsedHeaders","showHeaderCollapseButton"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","beginningEditNg: beginningEdit","cellEditEndedNg: cellEditEnded","cellEditEndingNg: cellEditEnding","prepareCellForEditNg: prepareCellForEdit","formatItemNg: formatItem","resizingColumnNg: resizingColumn","resizedColumnNg: resizedColumn","autoSizingColumnNg: autoSizingColumn","autoSizedColumnNg: autoSizedColumn","draggingColumnNg: draggingColumn","draggingColumnOverNg: draggingColumnOver","draggedColumnNg: draggedColumn","sortingColumnNg: sortingColumn","sortedColumnNg: sortedColumn","resizingRowNg: resizingRow","resizedRowNg: resizedRow","autoSizingRowNg: autoSizingRow","autoSizedRowNg: autoSizedRow","draggingRowNg: draggingRow","draggingRowOverNg: draggingRowOver","draggedRowNg: draggedRow","deletingRowNg: deletingRow","deletedRowNg: deletedRow","loadingRowsNg: loadingRows","loadedRowsNg: loadedRows","rowEditStartingNg: rowEditStarting","rowEditStartedNg: rowEditStarted","rowEditEndingNg: rowEditEnding","rowEditEndedNg: rowEditEnded","rowAddedNg: rowAdded","groupCollapsedChangedNg: groupCollapsedChanged","groupCollapsedChangingNg: groupCollapsedChanging","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged","selectionChangingNg: selectionChanging","selectionChangedNg: selectionChanged","scrollPositionChangedNg: scrollPositionChanged","updatingViewNg: updatingView","updatedViewNg: updatedView","updatingLayoutNg: updatingLayout","updatedLayoutNg: updatedLayout","pastingNg: pasting","pastedNg: pasted","pastingCellNg: pastingCell","pastedCellNg: pastedCell","copyingNg: copying","copiedNg: copied"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};let WjMultiRow=WjMultiRow_1=class extends wjcGridMultirow.MultiRow{constructor(e,o,t){super(wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(e,o)),this.isInitialized=!1;this._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(this,e,o,t);this.created()}created(){}ngOnInit(){this._wjBehaviour.ngOnInit()}ngAfterViewInit(){this._wjBehaviour.ngAfterViewInit()}ngOnDestroy(){this._wjBehaviour.ngOnDestroy()}addEventListener(e,o,t,i=!1){let r=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,n=r.ngZone;n&&r.outsideZoneEvents[o]?n.runOutsideAngular(()=>{super.addEventListener(e,o,t,i)}):super.addEventListener(e,o,t,i)}};WjMultiRow.meta={outputs:exports.wjMultiRowMeta.outputs},WjMultiRow=WjMultiRow_1=__decorate([core_1.Component({selector:exports.wjMultiRowMeta.selector,template:exports.wjMultiRowMeta.template,inputs:exports.wjMultiRowMeta.inputs,outputs:exports.wjMultiRowMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(()=>WjMultiRow_1)},...exports.wjMultiRowMeta.providers]}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],WjMultiRow),exports.WjMultiRow=WjMultiRow;let moduleExports=[WjMultiRow],WjGridMultirowModule=class{};WjGridMultirowModule=__decorate([core_1.NgModule({imports:[wijmo_angular2_directiveBase_1.WjDirectiveBaseModule,common_1.CommonModule],declarations:[...moduleExports],exports:[...moduleExports]})],WjGridMultirowModule),exports.WjGridMultirowModule=WjGridMultirowModule;