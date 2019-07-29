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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),__decorate=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,l=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(l=(n<3?i(l):n>3?i(t,o,l):i(t,o))||l);return n>3&&l&&Object.defineProperty(t,o,l),l},__param=this&&this.__param||function(e,t){return function(o,r){t(o,r,e)}};Object.defineProperty(exports,"__esModule",{value:!0});var core_1=require("@angular/core"),common_1=require("@angular/common"),forms_1=require("@angular/forms"),wijmo_angular2_directiveBase_1=require("wijmo/wijmo.angular2.directiveBase"),wjcCore=require("wijmo/wijmo"),wjcGrid=require("wijmo/wijmo.grid");function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}exports.wjFlexGridMeta={selector:"wj-flex-grid",template:"<div><ng-content></ng-content></div>",inputs:["wjModelProperty","isDisabled","newRowAtTop","allowAddNew","allowDelete","allowDragging","allowMerging","allowResizing","allowSorting","quickAutoSize","autoScroll","autoSearch","autoSizeMode","autoGenerateColumns","childItemsPath","groupHeaderFormat","headersVisibility","showSelectedHeaders","showMarquee","itemFormatter","isReadOnly","imeEnabled","mergeManager","selectionMode","showGroups","showSort","showDropDown","showAlternatingRows","showErrors","alternatingRowStep","validateEdits","treeIndent","itemsSource","autoClipboard","frozenRows","frozenColumns","cloneFrozenCells","deferResizing","sortRowIndex","editColumnIndex","stickyHeaders","preserveSelectedState","preserveOutlineState","keyActionTab","keyActionEnter","rowHeaderPath","virtualizationThreshold","anchorCursor"],outputs:["initialized","gotFocusNg: gotFocus","lostFocusNg: lostFocus","beginningEditNg: beginningEdit","cellEditEndedNg: cellEditEnded","cellEditEndingNg: cellEditEnding","prepareCellForEditNg: prepareCellForEdit","formatItemNg: formatItem","resizingColumnNg: resizingColumn","resizedColumnNg: resizedColumn","autoSizingColumnNg: autoSizingColumn","autoSizedColumnNg: autoSizedColumn","draggingColumnNg: draggingColumn","draggingColumnOverNg: draggingColumnOver","draggedColumnNg: draggedColumn","sortingColumnNg: sortingColumn","sortedColumnNg: sortedColumn","resizingRowNg: resizingRow","resizedRowNg: resizedRow","autoSizingRowNg: autoSizingRow","autoSizedRowNg: autoSizedRow","draggingRowNg: draggingRow","draggingRowOverNg: draggingRowOver","draggedRowNg: draggedRow","deletingRowNg: deletingRow","deletedRowNg: deletedRow","loadingRowsNg: loadingRows","loadedRowsNg: loadedRows","rowEditStartingNg: rowEditStarting","rowEditStartedNg: rowEditStarted","rowEditEndingNg: rowEditEnding","rowEditEndedNg: rowEditEnded","rowAddedNg: rowAdded","groupCollapsedChangedNg: groupCollapsedChanged","groupCollapsedChangingNg: groupCollapsedChanging","itemsSourceChangingNg: itemsSourceChanging","itemsSourceChangedNg: itemsSourceChanged","selectionChangingNg: selectionChanging","selectionChangedNg: selectionChanged","scrollPositionChangedNg: scrollPositionChanged","updatingViewNg: updatingView","updatedViewNg: updatedView","updatingLayoutNg: updatingLayout","updatedLayoutNg: updatedLayout","pastingNg: pasting","pastedNg: pasted","pastingCellNg: pastingCell","pastedCellNg: pastedCell","copyingNg: copying","copiedNg: copied"],providers:[{provide:forms_1.NG_VALUE_ACCESSOR,useFactory:wijmo_angular2_directiveBase_1.WjValueAccessorFactory,multi:!0,deps:["WjComponent"]}]};var WjFlexGrid=function(e){function t(t,o,r,i){var n=e.call(this,wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getHostElement(t,o))||this;n.isInitialized=!1;n._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(n,t,o,r);return new DirectiveCellFactory(n,i),n.deferUpdate(function(){if(n.rows.defaultSize<10){var e=n.hostElement,t=getComputedStyle(e),o=getComputedStyle(document.body),r=2*parseInt(t.fontSize&&wjcCore.contains(document.body,e)?t.fontSize:o.fontSize);n.rows.defaultSize=r,n.columns.defaultSize=4*r,n.columnHeaders.rows.defaultSize=r,n.rowHeaders.columns.defaultSize=Math.round(1.25*r)}}),n.created(),n}var o;return __extends(t,e),o=t,t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.prototype.addEventListener=function(t,o,r,i){var n=this;void 0===i&&(i=!1);var l=wijmo_angular2_directiveBase_1.WjDirectiveBehavior,a=l.ngZone;a&&l.outsideZoneEvents[o]?a.runOutsideAngular(function(){e.prototype.addEventListener.call(n,t,o,r,i)}):e.prototype.addEventListener.call(this,t,o,r,i)},t.prototype.startEditing=function(t,o,r,i){void 0===t&&(t=!0),this._edtFocus=null;var n=e.prototype.startEditing.call(this,t,o,r,i);return n&&(this._edtFocus=i||null==i),n},t.prototype.onCellEditEnding=function(t){return this._edtFocus=null,e.prototype.onCellEditEnding.call(this,t)},t.meta={outputs:exports.wjFlexGridMeta.outputs},t=o=__decorate([core_1.Component({selector:exports.wjFlexGridMeta.selector,template:exports.wjFlexGridMeta.template,inputs:exports.wjFlexGridMeta.inputs,outputs:exports.wjFlexGridMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(function(){return o})}].concat(exports.wjFlexGridMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional()),__param(3,core_1.Inject(core_1.ChangeDetectorRef))],t)}(wjcGrid.FlexGrid);exports.WjFlexGrid=WjFlexGrid,exports.wjFlexGridColumnMeta={selector:"wj-flex-grid-column",template:"<div><ng-content></ng-content></div>",inputs:["asyncBindings","wjProperty","name","dataMap","dataType","binding","sortMemberPath","format","header","width","maxLength","minWidth","maxWidth","align","allowDragging","allowSorting","allowResizing","allowMerging","aggregate","isReadOnly","cssClass","isContentHtml","isSelected","visible","wordWrap","multiLine","mask","inputType","isRequired","showDropDown","dropDownCssClass","quickAutoSize"],outputs:["initialized","isSelectedChangePC: isSelectedChange"],providers:[]};var WjFlexGridColumn=function(e){function t(t,o,r){var i=e.call(this)||this;i.isInitialized=!1,i.wjProperty="columns";var n=(i._wjBehaviour=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.attach(i,t,o,r)).parentBehavior.directive;return n.autoGenerateColumns&&(n.autoGenerateColumns=!1,n.columns.clear()),i.created(),i}var o;return __extends(t,e),o=t,t.prototype.created=function(){},t.prototype.ngOnInit=function(){this._wjBehaviour.ngOnInit()},t.prototype.ngAfterViewInit=function(){this._wjBehaviour.ngAfterViewInit()},t.prototype.ngOnDestroy=function(){this._wjBehaviour.ngOnDestroy()},t.meta={outputs:exports.wjFlexGridColumnMeta.outputs,changeEvents:{"grid.selectionChanged":["isSelected"]}},t=o=__decorate([core_1.Component({selector:exports.wjFlexGridColumnMeta.selector,template:exports.wjFlexGridColumnMeta.template,inputs:exports.wjFlexGridColumnMeta.inputs,outputs:exports.wjFlexGridColumnMeta.outputs,providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(function(){return o})}].concat(exports.wjFlexGridColumnMeta.providers)}),__param(0,core_1.Inject(core_1.ElementRef)),__param(1,core_1.Inject(core_1.Injector)),__param(2,core_1.Inject("WjComponent")),__param(2,core_1.SkipSelf()),__param(2,core_1.Optional())],t)}(wjcGrid.Column);exports.WjFlexGridColumn=WjFlexGridColumn;var CellTemplateType,WjFlexGridCellTemplate=function(){function e(e,t,o,r,i,n,l){this.viewContainerRef=e,this.templateRef=t,this.elRef=o,this.domRenderer=i,this.cdRef=l,this.autoSizeRows=!0,this.forceFullEdit=!0,r instanceof WjFlexGrid?this.grid=r:r instanceof WjFlexGridColumn&&(this.column=r,this.grid=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getBehavior(r).parentBehavior.directive)}var t;return t=e,e._getTemplContextProp=function(e){return"$__cellTempl"+CellTemplateType[e]},e.prototype.ngOnInit=function(){this.ownerControl=this.column&&this.column.grid===this.grid?this.column:this.grid,this._attachToControl()},e.prototype.ngOnDestroy=function(){this.cellTypeStr&&(this.viewContainerRef.clear(),this.ownerControl[t._getTemplContextProp(this.cellType)]=null,this.grid.invalidate())},e.prototype._instantiateTemplate=function(e,t){return wijmo_angular2_directiveBase_1.WjDirectiveBehavior.instantiateTemplate(e,this.viewContainerRef,this.templateRef,this.domRenderer,!1,t)},e.prototype._attachToControl=function(){if(this.cellTypeStr){var e=this.cellType=wjcCore.asEnum(this.cellTypeStr,CellTemplateType),o=this.ownerControl;o[t._getTemplContextProp(e)]=this,o instanceof wjcGrid.Column&&(e===CellTemplateType.Cell||e===CellTemplateType.ColumnHeader||e===CellTemplateType.ColumnFooter)&&o._setFlag(wjcGrid.RowColFlags.HasTemplate,!0),this.grid.invalidate()}},e=t=__decorate([core_1.Directive({selector:"[wjFlexGridCellTemplate]",inputs:["wjFlexGridCellTemplate","cellTypeStr: cellType","cellOverflow","valuePaths","autoSizeRows","forceFullEdit"],exportAs:"wjFlexGridCellTemplate",providers:[{provide:"WjComponent",useExisting:core_1.forwardRef(function(){return t})}]}),__param(0,core_1.Inject(core_1.ViewContainerRef)),__param(1,core_1.Inject(core_1.TemplateRef)),__param(1,core_1.Optional()),__param(2,core_1.Inject(core_1.ElementRef)),__param(3,core_1.Inject("WjComponent")),__param(3,core_1.SkipSelf()),__param(3,core_1.Optional()),__param(4,core_1.Inject(core_1.Renderer)),__param(5,core_1.Inject(core_1.Injector)),__param(6,core_1.Inject(core_1.ChangeDetectorRef))],e)}();exports.WjFlexGridCellTemplate=WjFlexGridCellTemplate,function(e){e[e.Cell=0]="Cell",e[e.CellEdit=1]="CellEdit",e[e.ColumnHeader=2]="ColumnHeader",e[e.RowHeader=3]="RowHeader",e[e.RowHeaderEdit=4]="RowHeaderEdit",e[e.TopLeft=5]="TopLeft",e[e.GroupHeader=6]="GroupHeader",e[e.Group=7]="Group",e[e.NewCellTemplate=8]="NewCellTemplate",e[e.ColumnFooter=9]="ColumnFooter",e[e.BottomLeft=10]="BottomLeft"}(CellTemplateType=exports.CellTemplateType||(exports.CellTemplateType={}));var DirectiveCellFactory=function(e){function t(o,r){var i=e.call(this)||this;if(i._needsCdCheck=!1,i._lastApplyTimeStamp=0,i._noApplyLag=!1,i._startingEditing=!1,i._cellStampCounter=0,i._composing=!1,i.grid=o,i._gridCdRef=r,!t._templateTypes)for(var n in t._templateTypes=[],CellTemplateType)isNaN(n)&&t._templateTypes.push(n);var l=i;return i._baseCf=o.cellFactory,o.cellFactory=i,i._evtInput=document.createEvent("HTMLEvents"),i._evtInput.initEvent("input",!0,!1),i._evtBlur=document.createEvent("HTMLEvents"),i._evtBlur.initEvent("blur",!1,!1),o.prepareCellForEdit.addHandler(function(e,t){l._noApplyLag=!0}),o.cellEditEnded.addHandler(function(e,t){(t.range.col<0||t.range.col<o.columns.length&&!o.columns[t.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)])&&(l._editChar=null),setTimeout(function(){l._noApplyLag=!1},300)}),o.beginningEdit.addHandler(function(e,t){l._startingEditing=!0}),o.hostElement.addEventListener("keydown",function(e){l._startingEditing=!1},!0),o.hostElement.addEventListener("keypress",function(e){var t=e.charCode>32?String.fromCharCode(e.charCode):null;t&&wjcCore.closest(e.target,".wj-flexgrid")===o.hostElement&&(!o.activeEditor||l._startingEditing?(l._editChar=t,setTimeout(function(){o.activeEditor||(l._editChar=null)},0)):l._editChar&&(l._editChar+=t))},!0),o.hostElement.addEventListener("compositionstart",function(e){l._composing=!0},!0),o.hostElement.addEventListener("compositionend",function(e){l._composing=!1},!0),o.updatedView.addHandler(function(){i._needsCdCheck&&(i._needsCdCheck=!1,i._gridCdRef.markForCheck())},i),i}return __extends(t,e),t.prototype.updateCell=function(e,o,r,i,n){var l=this;this._cellStampCounter=(this._cellStampCounter+1)%1e7;var a=i[t._cellStampProp]=this._cellStampCounter;i.style.overflow&&(i.style.overflow="");var d=o,s=r;n&&!n.isSingleCell&&(o=n.row,r=n.col);var c,p=this,u=e.grid,g=u.editRange,m=e.rows[o],C=m.dataItem,_=!1,w=!1,f=!1,v=!1;switch(e.cellType){case wjcGrid.CellType.Cell:if(g&&g.row===o&&g.col===r)c=CellTemplateType.CellEdit,w=f=!0;else if(m instanceof wjcGrid.GroupRow){var h=!((v=C instanceof wjcCore.CollectionViewGroup)||m.hasChildren);r==e.columns.firstVisibleIndex?c=h?CellTemplateType.Cell:CellTemplateType.GroupHeader:(c=h?CellTemplateType.Cell:CellTemplateType.Group,w=!0)}else m instanceof wjcGrid._NewRowTemplate?c=CellTemplateType.NewCellTemplate:softGridDetail()&&softGridDetail().DetailRow&&m instanceof softGridDetail().DetailRow||(c=CellTemplateType.Cell);break;case wjcGrid.CellType.ColumnHeader:c=CellTemplateType.ColumnHeader;break;case wjcGrid.CellType.RowHeader:c=u.collectionView&&u.collectionView.currentEditItem===C?CellTemplateType.RowHeaderEdit:CellTemplateType.RowHeader,_=!0;break;case wjcGrid.CellType.TopLeft:c=CellTemplateType.TopLeft,_=!0;break;case wjcGrid.CellType.ColumnFooter:c=CellTemplateType.ColumnFooter,w=!0;break;case wjcGrid.CellType.BottomLeft:c=CellTemplateType.BottomLeft,_=!0}var y=!1;if(null!=c){var j=v&&c==CellTemplateType.GroupHeader?u.columns.getColumn(C.groupDescription.propertyName):r>=0&&r<e.columns.length?e.columns[r]:null;if(j){var E=WjFlexGridCellTemplate._getTemplContextProp(c),T=(_?u:j)[E];if(T||(c===CellTemplateType.RowHeaderEdit?(c=CellTemplateType.RowHeader,E=WjFlexGridCellTemplate._getTemplContextProp(c),T=u[E]):c!==CellTemplateType.Group&&c!==CellTemplateType.GroupHeader||v||(c=CellTemplateType.Cell,E=WjFlexGridCellTemplate._getTemplContextProp(c),T=j[E])),T){var x;w&&(x=e.getCellData(o,r,!1)),y=!0;var R=i.getAttribute(wjcGrid.FlexGrid._WJS_MEASURE),S=R&&"true"===R.toLowerCase();f&&this._baseCf.updateCell(e,d,s,i,n,!0);var F,G=i[E]||{},I=G.column!==j||!G.viewRef||G.templateContextProperty!==E||i.firstChild!=G.rootElement,N=f&&this._composing&&u.imeEnabled;if(I){if(f){var H=i.firstElementChild;H&&(N||i.focus(),H.style.display="none")}else i.textContent="";this._doDisposeCell(i);var b={};F=this._setViewRefContext(b,m,j,C,x,T.valuePaths);var D=T._instantiateTemplate(i,b);G.column=j,G.viewRef=D.viewRef,G.rootElement=D.rootElement,G.templateContextProperty=E,i[E]=G}else F=this._setViewRefContext(G.viewRef.context,m,j,C,x,T.valuePaths);if(T.cellOverflow&&(i.style.overflow=T.cellOverflow),S?T.cdRef.detectChanges():T.autoSizeRows&&!N?setTimeout(function(){if(a===i[t._cellStampProp]){var r=i.scrollHeight,d=e.rows,s=n&&n.rowSpan||1;if(o<d.length&&d[o].renderHeight*s<r-1){if(d.defaultSize=r/s,f){var c=p._isFullEdit();return u.refresh(),void u.startEditing(c)}}else f&&l._initEditInput(G,T,null)}},0):f&&setTimeout(function(){N?l._initImeEditInput(G,T):l._initEditInput(G,T,null)},0),f){p._cellEditorVars=F.localVars;var z=function(e,t){if(u.cellEditEnding.removeHandler(z),!t.stayInEditMode){var o=wjcCore.getActiveElement();o&&o.dispatchEvent(p._evtBlur),wjcCore.contains(i,wjcCore.getActiveElement())&&i.focus()}if(p._triggerEditorEvents(i),!t.cancel&&!t.stayInEditMode)for(var r=F.localVars,n=0,l=Object.getOwnPropertyNames(F.bindings);n<l.length;n++){var a=l[n];F.bindings[a].setValue(r,F.localVars.values[a])}var d=i.querySelectorAll(".wj-dropdown");[].forEach.call(d,function(e){var t=wjcCore.Control.getControl(e);t&&softInput()&&t instanceof softInput().DropDown&&(t.isDroppedDown=!1)})},B=function(e,t){u.cellEditEnded.removeHandler(B),p._cellEditorVars=null};u.cellEditEnding.addHandler(z),u.cellEditEnded.addHandler(B)}else this._baseCf.updateCell(e,d,s,i,n,!1)}}}y||(this._doDisposeCell(i),this._baseCf.updateCell(e,d,s,i,n))},t.prototype.getEditorValue=function(t){if(this._cellEditorVars){var o=t.editRange;return o&&o.isValid&&this._triggerEditorEvents(t.cells.getCellElement(o.row,o.col)),this._cellEditorVars.value}return e.prototype.getEditorValue.call(this,t)},t.prototype.disposeCell=function(e){this._doDisposeCell(e)},t.prototype._doDisposeCell=function(e){for(var o=t._templateTypes,r=0;r<o.length;r++){var i=WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[o[r]]),n=e[i];if(n&&n.viewRef){var l=(n.column||this.grid)[i];if(l){var a=l.viewContainerRef.indexOf(n.viewRef);a>-1&&l.viewContainerRef.remove(a)}n.viewRef=null,n.rootElement=null,n.column=null,n.templateContextProperty=null,e[i]=null}}},t.prototype._setViewRefContext=function(e,t,o,r,i,n){this._needsCdCheck=!0,e.row=t,e.col=o,e.item=r;var l={},a=e.cell||{},d={},s={localVars:a,bindings:d};if(a.row=t,a.col=o,a.item=r,a.value=i,a.values=l,n)for(var c=0,p=Object.getOwnPropertyNames(n);c<p.length;c++){var u=p[c],g=new wjcCore.Binding(n[u]);d[u]=g,l[u]=g.getValue(a)}return e.cell!==a&&(e.cell=a),s},t.prototype._initEditInput=function(e,o,r){var i=this,n=!1!==this.grid._edtFocus;if(this.grid._edtFocus=null,this._setFullEdit(o),n){var l=this._findInitialInput(e);if(l){var a=function(){l.removeEventListener("focus",a),setTimeout(function(){var e=null!=r?r:i._editChar;e&&(l.value=e,i._editChar=null,t._setSelectionRange(l,e.length,e.length),l.dispatchEvent(i._evtInput))},t._FOCUS_INTERVAL)};l.addEventListener("focus",a),l.focus()}}},t.prototype._initImeEditInput=function(e,t){var o=this,r=wjcCore.getActiveElement();if(r&&r instanceof HTMLInputElement&&wjcCore.hasClass(r,"wj-grid-ime")){var i=function(n){r.removeEventListener("compositionend",i),wjcCore.setCss(r,wjcGrid._ImeHandler._cssHidden),o._initEditInput(e,t,r.value)};r.addEventListener("compositionend",i);var n=this._findInitialInput(e);if(n){var l=n.getBoundingClientRect(),a=r.getBoundingClientRect(),d=window.getComputedStyle(r),s=parseFloat(d.left),c=parseFloat(d.top);wjcCore.setCss(r,{left:s+l.left-a.left+"px",top:c+l.top-a.top+"px",width:l.width+"px",height:l.height+"px"})}}},t.prototype._findInitialInput=function(e){var t=e&&e.rootElement&&e.rootElement.querySelectorAll("input,textarea");if(t)for(var o=0;o<t.length;o++){var r=t[o],i=window.getComputedStyle(r);if("none"!==i.display&&"visible"===i.visibility)return r}return null},t._setSelectionRange=function(e,t,o){if(void 0===o&&(o=t),wjcCore.contains(document.body,e)&&!e.disabled&&"none"!=e.style.display)try{e.setSelectionRange(wjcCore.asNumber(t),wjcCore.asNumber(o),wjcCore.isIE()?null:"backward"),e.focus()}catch(e){}},t.prototype._triggerEditorEvents=function(e){if(e)for(var t=e.querySelectorAll(".wj-control"),o=0;o<t.length;o++){var r=t[o],i=wjcCore.Control.getControl(r);if(i){var n=wijmo_angular2_directiveBase_1.WjDirectiveBehavior.getBehavior(i);n&&n.flushPendingEvents()}}},t.prototype._isFullEdit=function(){var e=this.grid;return!e.activeEditor||e._edtHdl._fullEdit},t.prototype._setFullEdit=function(e){var t=this.grid;e.forceFullEdit&&t.activeEditor&&(t._edtHdl._fullEdit=!0)},t._cellStampProp="__wjCellStamp",t._FOCUS_INTERVAL=wjcCore.Control._FOCUS_INTERVAL+20,t}(wjcGrid.CellFactory),moduleExports=[WjFlexGrid,WjFlexGridColumn,WjFlexGridCellTemplate],WjGridModule=function(){function e(){}return e=__decorate([core_1.NgModule({imports:[wijmo_angular2_directiveBase_1.WjDirectiveBaseModule,common_1.CommonModule],declarations:moduleExports.slice(),exports:moduleExports.slice()})],e)}();exports.WjGridModule=WjGridModule;