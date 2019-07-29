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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_1=require("wijmo/wijmo"),wijmo_grid_1=require("wijmo/wijmo.grid"),selfModule=require("wijmo/wijmo.grid.detail");class DetailRow extends wijmo_grid_1.Row{constructor(e){super(),this.isReadOnly=!0}get detail(){return this._detail}set detail(e){this._detail=e}}exports.DetailRow=DetailRow;class DetailMergeManager extends wijmo_grid_1.MergeManager{constructor(e){super(e)}getMergedRange(e,t,i,l=!0){switch(e.cellType){case wijmo_grid_1.CellType.Cell:if(e.rows[t]instanceof DetailRow){let l=e.columns,o=Math.min(l.length,l.frozen);return i<o?new wijmo_grid_1.CellRange(t,0,t,o-1):new wijmo_grid_1.CellRange(t,o,t,l.length-1)}break;case wijmo_grid_1.CellType.RowHeader:if(e.rows[t]instanceof DetailRow)return new wijmo_grid_1.CellRange(t-1,i,t,i);if(t<e.rows.length-1&&e.rows[t+1]instanceof DetailRow)return new wijmo_grid_1.CellRange(t,i,t+1,i)}return super.getMergedRange(e,t,i,l)}}var KeyAction,DetailVisibilityMode;exports.DetailMergeManager=DetailMergeManager,wijmo_1._addCultureInfo("FlexGridDetailProvider",{ariaLabels:{toggleDetail:"Toggle Row Detail"}}),function(e){e[e.None=0]="None",e[e.ToggleDetail=1]="ToggleDetail"}(KeyAction=exports.KeyAction||(exports.KeyAction={})),function(e){e[e.Code=0]="Code",e[e.Selection=1]="Selection",e[e.ExpandSingle=2]="ExpandSingle",e[e.ExpandMulti=3]="ExpandMulti"}(DetailVisibilityMode=exports.DetailVisibilityMode||(exports.DetailVisibilityMode={}));class FlexGridDetailProvider{constructor(e,t){this._mode=DetailVisibilityMode.ExpandSingle,this._animated=!1,this._keyActionEnter=KeyAction.None,this._g=e,e.mergeManager=new DetailMergeManager(e),e.rowHeaders.hostElement.addEventListener("click",this._hdrClick.bind(this)),e.rowHeaders.hostElement.addEventListener("mousedown",t=>{let i=e.editableCollectionView;(e.activeEditor||i&&i.currentEditItem)&&(this._hdrClick(t),t.preventDefault())}),e.formatItem.addHandler(this._formatItem,this),e.selectionChanged.addHandler(this._selectionChanged,this),e.resizedRow.addHandler(this._resizedRow,this),e.loadingRows.addHandler(()=>{this.hideDetail()}),e.updatedView.addHandler(()=>{this._handleFixedCells()}),e.draggingRow.addHandler((e,t)=>{t.row<e.rows.length-1&&e.rows[t.row+1]instanceof DetailRow&&(t.cancel=!0,this.hideDetail(t.row))}),e.hostElement.addEventListener("keydown",e=>{if(e.keyCode==wijmo_1.Key.Enter&&this._keyActionEnter==KeyAction.ToggleDetail){let t=this._g.selection.row;this._toggleRowDetail(t)&&e.preventDefault()}},!0),e._root.addEventListener("scroll",()=>{wijmo_1.Control.refreshAll(e._root)}),t&&wijmo_1.copy(this,t)}get grid(){return this._g}get detailVisibilityMode(){return this._mode}set detailVisibilityMode(e){(e=wijmo_1.asEnum(e,DetailVisibilityMode))!=this._mode&&(this._mode=e,this.hideDetail(),this._g.invalidate())}get maxHeight(){return this._maxHeight}set maxHeight(e){this._maxHeight=wijmo_1.asNumber(e,!0)}get isAnimated(){return this._animated}set isAnimated(e){e!=this._animated&&(this._animated=wijmo_1.asBoolean(e))}get keyActionEnter(){return this._keyActionEnter}set keyActionEnter(e){this._keyActionEnter=wijmo_1.asEnum(e,KeyAction)}get createDetailCell(){return this._createDetailCellFn}set createDetailCell(e){this._createDetailCellFn=wijmo_1.asFunction(e,!0)}get disposeDetailCell(){return this._disposeDetailCellFn}set disposeDetailCell(e){this._disposeDetailCellFn=wijmo_1.asFunction(e,!0)}get rowHasDetail(){return this._rowHasDetailFn}set rowHasDetail(e){this._rowHasDetailFn=wijmo_1.asFunction(e,!0)}getDetailRow(e){let t=this._g.rows;return t[e=this._toIndex(e)]instanceof DetailRow?t[e]:e<t.length-1&&t[e+1]instanceof DetailRow?t[e+1]:null}isDetailVisible(e){return null!=this.getDetailRow(e)}isDetailAvailable(e){return e=this._toIndex(e),this._hasDetail(e)}hideDetail(e){let t=this._g.rows;if(null==e){for(let e=0;e<t.length;e++)t[e]instanceof DetailRow&&this.hideDetail(e);return}!(t[e=this._toIndex(e)]instanceof DetailRow)&&e<t.length-1&&t[e+1]instanceof DetailRow&&e++;let i=t[e];i instanceof DetailRow&&(this.disposeDetailCell&&this.disposeDetailCell(i),wijmo_1.Control.disposeAll(i.detail),t.removeAt(e))}showDetail(e,t=!1){let i=this._g,l=i.rows;if((e=this._toIndex(e))>0&&l[e]instanceof DetailRow&&e--,t){let t=i.selection,o=!1;for(let i=0;i<l.length-1;i++)i!=e&&l[i+1]instanceof DetailRow&&(this.hideDetail(i),i<e&&e--,i<t.row&&(t.row--,t.row2--,o=!0));o&&i.select(t,!1)}if(!this.isDetailVisible(e)&&this._hasDetail(e)){let t=new DetailRow(l[e]),o=this._createDetailCell(l[e]);if(t.detail=o,o){l.insert(e+1,t);let s=i.containsFocus();if(this._animated){let t=o.style;t.transform="translateY(-100%)",t.opacity="0",wijmo_1.animate(l=>{l<1?(t.transform="translateY("+(100*-(1-l)).toFixed(0)+"%)",t.opacity=(l*l).toString()):(t.transform="",t.opacity="",wijmo_1.Control.invalidateAll(o),s&&i.scrollIntoView(e+1,-1))})}else s&&i.scrollIntoView(e+1,-1,!0)}}}_sizeDetailRow(e){let t=this._g,i=e.detail;wijmo_1.Control.refreshAll(i);let l=i.scrollHeight+t._cellPadVert,o=this._maxHeight;wijmo_1.isNumber(o)&&o>0&&l>o&&(l=o),e.height=l,i.style.height||(i.style.height="100%");let s=i.querySelector(".wj-flexgrid");s&&!s.style.height&&(s.style.height="100%")}_handleFixedCells(){let e=this._g,t=e.hostElement;if(e.frozenRows||e.frozenColumns){let i=".wj-flexgrid",l=wijmo_1.Control.getControl(t.querySelector(i));if(l instanceof wijmo_grid_1.FlexGrid&&(l.frozenRows||l.frozenColumns)){wijmo_1.setCss([e._eTL,e._eBL,e._eCHdr,e._eCFtr,e._eRHdr,e._eMarquee],{zIndex:"6"});let t=e.hostElement.querySelectorAll(".wj-frozen");for(let l=0;l<t.length;l++){let o=t[l];if(wijmo_1.closest(o,i)==e.hostElement){let e=parseInt(o.style.zIndex);o.style.zIndex=(e%3+3).toString()}}}}}_toIndex(e){return e instanceof wijmo_grid_1.Row&&(e=e.index),wijmo_1.asNumber(e,!1,!0)}_hdrClick(e){if(!e.defaultPrevented&&0==e.button&&wijmo_1.closestClass(e.target,FlexGridDetailProvider._WJC_DETAIL))switch(this._mode){case DetailVisibilityMode.ExpandMulti:case DetailVisibilityMode.ExpandSingle:let t=this._g,i=t.hitTest(e.target);i.panel||(i=t.hitTest(e)),i.panel&&this._toggleRowDetail(i.row)&&e.preventDefault()}}_toggleRowDetail(e){if(e>-1){if(this.isDetailVisible(e))return this.hideDetail(e),!0;if(this._hasDetail(e)){let t=this._g;return t.select(new wijmo_grid_1.CellRange(e,0,e,t.columns.length-1)),this.showDetail(e,this._mode==DetailVisibilityMode.ExpandSingle),!0}}return!1}_selectionChanged(e,t){this._mode==DetailVisibilityMode.Selection&&(this._toSel&&clearTimeout(this._toSel),this._toSel=setTimeout(()=>{e.selection.row>-1?this.showDetail(e.selection.row,!0):this.hideDetail()},300))}_formatItem(e,t){let i=this._g,l=t.cell,o=t.panel.rows[t.row];if(t.panel==i.cells&&o instanceof DetailRow&&null!=o.detail&&t.col==i.cells.columns.frozen&&(wijmo_1.addClass(l,"wj-detail"),l.textContent="",l.style.textAlign="",l.className=l.className.replace(/wj\-align\-[\S]+/g,""),l.appendChild(o.detail),null==o.height&&this._sizeDetailRow(o)),t.panel==i.rowHeaders&&0==t.col&&this._hasDetail(t.row))switch(l.style.cursor="",this._mode){case DetailVisibilityMode.ExpandMulti:case DetailVisibilityMode.ExpandSingle:let e=i.rows[t.row+1]instanceof DetailRow,o=e?"minus":"plus",s=FlexGridDetailProvider._WJC_DETAIL;l.innerHTML='<div class="wj-btn wj-btn-glyph '+s+'" role="button" tabindex="-1"><span class="wj-glyph-'+o+'"></span></div>';let a=l.children[0],r=wijmo_1.culture.FlexGridDetailProvider.ariaLabels.toggleDetail;wijmo_1.setAriaLabel(a,r),wijmo_1.setAttribute(a,"aria-expanded",e)}}_resizedRow(e,t){let i=t.panel.rows[t.row];i instanceof DetailRow&&i.detail&&wijmo_1.Control.refreshAll(i.detail)}_hasDetail(e){let t=this._g.rows[e];return wijmo_1.isFunction(this._rowHasDetailFn)?this._rowHasDetailFn(t):this._isRegularRow(t)}_isRegularRow(e){return!(e instanceof wijmo_grid_1.GroupRow||e instanceof wijmo_grid_1._NewRowTemplate)}_createDetailCell(e,t){return this.createDetailCell?this.createDetailCell(e,t):null}}FlexGridDetailProvider._WJC_DETAIL="wj-elem-detail",exports.FlexGridDetailProvider=FlexGridDetailProvider,wijmo_1._registerModule("wijmo.grid.detail",selfModule);