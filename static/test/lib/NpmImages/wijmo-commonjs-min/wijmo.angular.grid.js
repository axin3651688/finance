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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,l){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var l in t)t.hasOwnProperty(l)&&(e[l]=t[l])})(t,l)};return function(t,l){function i(){this.constructor=t}e(t,l),t.prototype=null===l?Object.create(l):(i.prototype=l.prototype,new i)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),wijmo_1=require("wijmo/wijmo"),mNg=require("angular"),wjcGrid=require("wijmo/wijmo.grid"),wjNg=mNg,wijmoGridName="wj.grid";exports.ngModuleName=wijmoGridName;var wijmoGrid=wijmo_angular_base_1._registerNgModule(wijmoGridName);wijmo_angular_base_1.softRefGrid()&&wijmo_angular_base_1.softRefGrid().FlexGrid&&(wijmoGrid.directive("wjFlexGrid",["$compile","$interpolate",function(e,t){return new WjFlexGrid(e,t)}]),wijmoGrid.directive("wjFlexGridColumn",["$compile",function(e){return new WjFlexGridColumn(e)}]),wijmoGrid.directive("wjFlexGridCellTemplate",[function(){return new WjFlexGridCellTemplate}]));var WjFlexGrid=function(e){function t(t,l){var i=e.call(this)||this;i._$compile=t,i._$interpolate=l;return i.transclude=!0,i.template="<div ng-transclude />",i}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcGrid.FlexGrid},enumerable:!0,configurable:!0}),t.prototype._createLink=function(){return new WjFlexGridLink},t.prototype._initProps=function(){var e=wijmo_angular_base_1.MetaFactory.findProp("childItemsPath",this._props);e.scopeBindingMode="@",e.customHandler=function(e,t,l,i,o){if(l&&(l=l.trim())&&"["===l[0]){var r=e.$parent.$eval(l);return t.childItemsPath=r,!0}return!1}},t}(wijmo_angular_base_1.WjDirective);exports.WjFlexGrid=WjFlexGrid;var WjFlexGridLink=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype._initControl=function(){var t=e.prototype._initControl.call(this);return new DirectiveCellFactory(t,this),t},t}(wijmo_angular_base_1.WjLink),gridModule=wjcGrid&&wjcGrid.CellFactory;gridModule||(window.wijmo.grid={},window.wijmo.grid.CellFactory=function(){});var DirectiveCellFactory=function(e){function t(l,i){var o=e.call(this)||this;if(o._lastApplyTimeStamp=0,o._noApplyLag=!1,o._startingEditing=!1,o._cellStampCounter=0,o._composing=!1,o._grid=l,o._gridLink=i,o._rowHeightUpdates=new _RowHeightUpdateQueue(o),!t._templateTypes)for(var r in t._templateTypes=[],CellTemplateType)isNaN(r)&&t._templateTypes.push(r);var n=o;return o._baseCf=l.cellFactory,l.cellFactory=o,o._evtInput=document.createEvent("HTMLEvents"),o._evtInput.initEvent("input",!0,!1),o._evtChange=document.createEvent("HTMLEvents"),o._evtChange.initEvent("change",!0,!1),o._evtBlur=document.createEvent("HTMLEvents"),o._evtBlur.initEvent("blur",!1,!1),l.prepareCellForEdit.addHandler(function(e,t){n._noApplyLag=!0}),l.cellEditEnded.addHandler(function(e,t){(t.range.col<0||!l.columns[t.range.col][WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.CellEdit)])&&(n._editChar=null),setTimeout(function(){n._noApplyLag=!1},300)}),l.beginningEdit.addHandler(function(e,t){!t.data||t.data instanceof KeyboardEvent&&!(t.data.charCode<=32)||(n._editChar=null),n._startingEditing=!0}),l.hostElement.addEventListener("keydown",function(e){n._startingEditing=!1},!0),l.hostElement.addEventListener("keypress",function(e){var t=e.charCode>32?String.fromCharCode(e.charCode):null;t&&wijmo_1.closest(e.target,".wj-flexgrid")===l.hostElement&&(!l.activeEditor||n._startingEditing?n._editChar=t:n._editChar&&(n._editChar+=t))},!0),l.hostElement.addEventListener("compositionstart",function(e){n._composing=!0},!0),l.hostElement.addEventListener("compositionend",function(e){n._composing=!1},!0),o}return __extends(t,e),t.prototype.updateCell=function(e,l,i,o,r){var n=this;this._cellStampCounter=(this._cellStampCounter+1)%1e7;var a=o[t._cellStampProp]=this._cellStampCounter;o.style.overflow&&(o.style.overflow="");var p=l,s=i;r&&!r.isSingleCell&&(l=r.row,i=r.col);var c,u=this,d=e.grid,m=d.editRange,_=e.rows[l],f=_.dataItem,C=!1,h=!1,w=!1,v=!1;switch(e.cellType){case wjcGrid.CellType.Cell:if(m&&m.row===l&&m.col===i)c=CellTemplateType.CellEdit,h=w=!0;else if(_ instanceof wjcGrid.GroupRow){var g=!((v=f instanceof wijmo_1.CollectionViewGroup)||_.hasChildren);i==e.columns.firstVisibleIndex?c=g?CellTemplateType.Cell:CellTemplateType.GroupHeader:(c=g?CellTemplateType.Cell:CellTemplateType.Group,h=!0)}else wijmo_angular_base_1.softRefGridDetail()&&wijmo_angular_base_1.softRefGridDetail().DetailRow&&_ instanceof wijmo_angular_base_1.softRefGridDetail().DetailRow||(c=CellTemplateType.Cell);break;case wjcGrid.CellType.ColumnHeader:c=CellTemplateType.ColumnHeader;break;case wjcGrid.CellType.RowHeader:c=d.collectionView&&d.collectionView.currentEditItem===f?CellTemplateType.RowHeaderEdit:CellTemplateType.RowHeader,C=!0;break;case wjcGrid.CellType.TopLeft:c=CellTemplateType.TopLeft,C=!0;break;case wjcGrid.CellType.ColumnFooter:c=CellTemplateType.ColumnFooter,h=!0;break;case wjcGrid.CellType.BottomLeft:c=CellTemplateType.BottomLeft,C=!0}var y=!1;if(null!=c){var T=v&&c==CellTemplateType.GroupHeader?d.getColumn(f.groupDescription.propertyName):i>=0&&i<e.columns.length?e.columns[i]:null;if(T){var j=WjFlexGridCellTemplate._getTemplContextProp(c),E=(C?d:T)[j];if(E||(c===CellTemplateType.RowHeaderEdit?(c=CellTemplateType.RowHeader,j=WjFlexGridCellTemplate._getTemplContextProp(c),E=d[j]):c!==CellTemplateType.Group&&c!==CellTemplateType.GroupHeader||v||(c=CellTemplateType.Cell,j=WjFlexGridCellTemplate._getTemplContextProp(c),E=T[j])),E){var G,x=u._getCellTemplate(E.cellTemplate),F=E.cellStyle,L=E.cellClass,S=!wijmo_1.isNullOrWhiteSpace(x),W=!wijmo_1.isNullOrWhiteSpace(F),b=!wijmo_1.isNullOrWhiteSpace(L);if(h&&(G=e.getCellData(l,i,!1)),S){var H=o.getAttribute(wjcGrid.FlexGrid._WJS_MEASURE),$=H&&"true"===H.toLowerCase();y=!0,w&&this._baseCf.updateCell(e,p,s,o,r,!0);var R=o[j]||{},P=R.column!==T||!R.cellScope||!R.cellScope.$root,A=w&&this._composing&&d.imeEnabled,I=R.cellScope;P&&(this._doDisposeCell(o),R.cellScope=I=E.templLink.scope.$parent.$new(),R.column=T,o[j]=R);var k=I.$row!==_||I.$col!==T||I.$item!==f||I.$value!==G;k&&u._initCellScope(I,_,T,f,G);var O=E.cellLink;O||(O=E.cellLink=this._gridLink.directive._$compile('<div style="display:none"'+(W?' ng-style="'+F+'"':"")+(b?' ng-class="'+L+'"':"")+">"+x+"</div>"));var N=R.clonedElement;if(P){var D=I.$watch(function(t){if(N&&(D(),N[0].style.display="",e.cellType===wjcGrid.CellType.ColumnHeader||e.cellType===wjcGrid.CellType.TopLeft)){var l=N[0].style,i=l.outlineColor,o=l.outlineWidth;l.outlineColor="white",l.outlineWidth="0px",setTimeout(function(){l.outlineColor=i,l.outlineWidth=o},0)}});R.clonedElement=N=O(I,function(e,t){})}$&&(N[0].style.display="");var M=!1;if(w){var q=o.firstElementChild;q&&(A||o.focus(),q.style.display="none")}else(M=1==o.childNodes.length)||(o.textContent="");M?N[0]!==o.firstChild&&o.replaceChild(N[0],o.firstChild):o.appendChild(N[0]),E.cellOverflow&&(o.style.overflow=E.cellOverflow);if(this._closingApplyTimeOut&&clearTimeout(this._closingApplyTimeOut),u._rowHeightUpdates.add({panel:e,cell:o,rng:r,cellStamp:a,templateContext:E}),$||m||this._noApplyLag||k&&Date.now()-this._lastApplyTimeStamp>40?(clearTimeout(this._closingApplyTimeOut),I.$root&&!I.$root.$$phase&&I.$apply(),m||$||u._rowHeightUpdates.execute(),this._lastApplyTimeStamp=Date.now()):(clearTimeout(this._closingApplyTimeOut),this._closingApplyTimeOut=setTimeout(function(){clearTimeout(this._closingApplyTimeOut),I.$root&&!I.$root.$$phase&&I.$apply(),u._rowHeightUpdates.execute()},10)),A?w&&setTimeout(function(){A?n._initImeEditInput(R,E):n._initEditInput(R,E,null)},0):setTimeout(function(){if(u._updateRowHeight(e,o,r,a,E)){if(w){u._rowHeightUpdates.clear();var t=u._isFullEdit();return d.refresh(),void d.startEditing(t)}}else w&&u._initEditInput(R,E,null)},0),w){u._cellEditorScope=I;var U=function(t,r){if(d.cellEditEnding.removeHandler(U),!r.stayInEditMode){var n=wijmo_1.getActiveElement();n&&n.dispatchEvent(u._evtBlur),wijmo_1.contains(o,wijmo_1.getActiveElement())&&o.focus()}r.cancel||r.stayInEditMode||(r.cancel=!0,e.grid.setCellData(l,i,I.$value));var a=o.querySelectorAll(".wj-dropdown");[].forEach.call(a,function(e){var t=wijmo_1.Control.getControl(e);t&&wijmo_angular_base_1.softRefInput()&&t instanceof wijmo_angular_base_1.softRefInput().DropDown&&(t.isDroppedDown=!1)})};d.cellEditEnding.addHandler(U),d.cellEditEnded.addHandler(function(){u._cellEditorScope=null})}else this._baseCf.updateCell(e,p,s,o,r,!1)}}}}if(y||(this._doDisposeCell(o),this._baseCf.updateCell(e,p,s,o,r)),!S&&(W||b)){var B=u._initCellScope({},_,T,f,G),V=W?this._gridLink.scope.$parent.$eval(F,B):null,z=b?this._gridLink.scope.$parent.$eval(L,B):null;if(V||z){for(var Q=document.createElement("div");o.firstChild;)Q.appendChild(o.firstChild);if(o.appendChild(Q),V)for(var J in V)Q.style[J]=V[J];if(z){for(var K=wijmo_1.isArray(z)?z:[z],X="",Y=0;Y<K.length;Y++){var Z=K[Y];if(Z)if(wijmo_1.isString(Z))X+=" "+Z;else for(var ee in Z)Z[ee]&&(X+=" "+ee)}Q.className=X}}}},t.prototype.getEditorValue=function(t){return this._cellEditorScope?this._cellEditorScope.$value:e.prototype.getEditorValue.call(this,t)},t.prototype.disposeCell=function(e){this._doDisposeCell(e)},t.prototype._doDisposeCell=function(e){for(var l=t._templateTypes,i=0;i<l.length;i++){var o=WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[l[i]]),r=e[o];r&&r.cellScope&&r.cellScope.$root&&(r.cellScope.$destroy(),r.clonedElement&&(r.clonedElement.remove(),r.clonedElement=null),e[o]=null)}},t.prototype._updateRowHeight=function(e,l,i,o,r){if(r.autoSizeRows){var n=l.scrollHeight,a=e.rows,p=i&&i.rowSpan||1;if(o===l[t._cellStampProp]&&a.defaultSize*p<n)return a.defaultSize=n/p,!0}return!1},t.prototype._initCellScope=function(e,t,l,i,o){return e.$row=t,e.$col=l,e.$item=i,e.$value=o,e},t.prototype._getCellTemplate=function(e){return e&&(e=(e=(e=e.replace(/ class\=\"ng\-scope\"( \"ng\-binding\")?/g,"")).replace(/<span>\s*<\/span>/g,"")).trim()),e},t.prototype._isFullEdit=function(){var e=this._grid;return!e.activeEditor||e._edtHdl._fullEdit},t.prototype._setFullEdit=function(e){var t=this._grid;e.forceFullEdit&&t.activeEditor&&(t._edtHdl._fullEdit=!0)},t.prototype._initEditInput=function(e,l,i){var o=this;this._setFullEdit(l);var r=this._findInitialInput(e);if(r){var n=function(){r.removeEventListener("focus",n),setTimeout(function(){var e=null!=i?i:o._editChar;e&&(r.value=e,o._editChar=null,t._setSelectionRange(r,e.length,e.length),!t.isNgIE||wijmo_1.hasClass(r,"wj-form-control")||r.getAttribute("wj-part")?r.dispatchEvent(o._evtInput):r.dispatchEvent(o._evtChange))},t._FOCUS_INTERVAL)};r.addEventListener("focus",n),r.focus()}},t.prototype._initImeEditInput=function(e,t){var l=this,i=wijmo_1.getActiveElement();if(i&&i instanceof HTMLInputElement&&wijmo_1.hasClass(i,"wj-grid-ime")){var o=function(r){i.removeEventListener("compositionend",o),wijmo_1.setCss(i,wjcGrid._ImeHandler._cssHidden),l._initEditInput(e,t,i.value)};i.addEventListener("compositionend",o);var r=this._findInitialInput(e);if(r){var n=r.getBoundingClientRect(),a=i.getBoundingClientRect(),p=window.getComputedStyle(i),s=parseFloat(p.left),c=parseFloat(p.top);wijmo_1.setCss(i,{left:s+n.left-a.left+"px",top:c+n.top-a.top+"px",width:n.width+"px",height:n.height+"px"})}}},t.prototype._findInitialInput=function(e){var t=e.clonedElement[0].querySelectorAll("input,textarea");if(t)for(var l=0;l<t.length;l++){var i=t[l],o=window.getComputedStyle(i);if("none"!==o.display&&"visible"===o.visibility)return i}return null},t._setSelectionRange=function(e,t,l){if(void 0===l&&(l=t),wijmo_1.contains(document.body,e)&&!e.disabled&&"none"!=e.style.display)try{e.setSelectionRange(wijmo_1.asNumber(t),wijmo_1.asNumber(l),wijmo_1.isIE()?null:"backward"),e.focus()}catch(e){}},t._cellStampProp="__wjCellStamp",t._FOCUS_INTERVAL=wijmo_1.Control._FOCUS_INTERVAL+20,t.isNgIE=!!document.documentMode,t}(wjcGrid.CellFactory),_RowHeightUpdateQueue=function(){function e(e){this._requests=[],this._timeOuts=[],this._cellFactory=e}return e.prototype.add=function(e){this._requests.push(e)},e.prototype.execute=function(){for(var e=this._requests;e.length>0;){var t=this,l=function(e){return setTimeout(function(){if(t._cellFactory._updateRowHeight(e.panel,e.cell,e.rng,e.cellStamp,e.templateContext))t.clear();else{var i=t._timeOuts.indexOf(l);i>-1&&t._timeOuts.splice(i,1)}},0)}(this._requests.shift());this._timeOuts.push(l)}},e.prototype.clear=function(){this._requests.splice(0,this._requests.length),this._clearTimeouts()},e.prototype._clearTimeouts=function(){for(var e=this._timeOuts,t=0;t<e.length;t++)clearTimeout(e[t]);e.splice(0,e.length)},e}();gridModule||(window.wijmo.grid=null);var WjFlexGridColumn=function(e){function t(l){var i=e.call(this)||this;return i._$compile=l,i.scope.dataMap+="map",i.scope.dataType+="type",i.require="^wjFlexGrid",i.terminal=!0,wijmo_angular_base_1.WjDirective._dynaTemplates?(i.transclude=!1,i.priority=100,i.template=function(e,l){return l[t._colTemplateProp]=e[0].innerHTML,'<div class="wjGridColumn"/>'}):(i.transclude=!0,i.template='<div class="wjGridColumn" ng-transclude/>'),i}return __extends(t,e),Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){return wjcGrid.Column},enumerable:!0,configurable:!0}),t.prototype._initControl=function(e){return new wjcGrid.Column},t.prototype._createLink=function(){return new WjFlexGridColumnLink},t._colTemplateProp="$__wjColTemplate",t._colWjLinkProp="$__wjLink",t._cellCtxProp="$_cellCtxProp",t}(wijmo_angular_base_1.WjDirective);exports.WjFlexGridColumn=WjFlexGridColumn;var CellTemplateType,WjFlexGridColumnLink=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype._initParent=function(){var t=this.parent.control;t.autoGenerateColumns&&(t.autoGenerateColumns=!1,this._safeApply(this.scope,"autoGenerateColumns",!1),t.columns.clear()),e.prototype._initParent.call(this);var l=WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType.Cell),i=this.control[l],o=this[WjFlexGridColumn._cellCtxProp];!i&&o&&(this.control[l]=o),this.control[WjFlexGridColumn._colWjLinkProp]=this},t.prototype._link=function(){var t=this.tElement[0],l=this.tAttrs[WjFlexGridColumn._colTemplateProp],i=null!=l?l:wijmo_angular_base_1.WjDirective._removeTransclude(t.innerHTML),o={};if(!wijmo_1.isNullOrWhiteSpace(i)){var r=document.createElement("div");r.innerHTML=i;var n,a=[];[].forEach.call(r.children,function(e){a.push(e)});for(var p=0;p<a.length;p++){var s=a[p];s.tagName.toLocaleLowerCase()===WjFlexGridCellTemplate._tagName&&(n||(n=this.scope.$parent.$new()),r.removeChild(s),t.appendChild(s),this.directive._$compile(s)(n))}var c=r.innerHTML;wijmo_1.isNullOrWhiteSpace(c)||(o.cellTemplate=c)}var u=this.tAttrs.ngStyle,d=this.tAttrs.ngClass;u&&(o.cellStyle=u),d&&(o.cellClass=d),(o.cellTemplate||o.cellStyle||o.cellClass)&&(o.templLink=this,this[WjFlexGridColumn._cellCtxProp]=o),e.prototype._link.call(this)},t}(wijmo_angular_base_1.WjLink);!function(e){e[e.Cell=0]="Cell",e[e.CellEdit=1]="CellEdit",e[e.ColumnHeader=2]="ColumnHeader",e[e.RowHeader=3]="RowHeader",e[e.RowHeaderEdit=4]="RowHeaderEdit",e[e.TopLeft=5]="TopLeft",e[e.GroupHeader=6]="GroupHeader",e[e.Group=7]="Group",e[e.ColumnFooter=8]="ColumnFooter",e[e.BottomLeft=9]="BottomLeft"}(CellTemplateType=exports.CellTemplateType||(exports.CellTemplateType={}));var WjFlexGridCellTemplate=function(e){function t(){var t=e.call(this)||this;return t.require=["?^wjFlexGridColumn","?^wjFlexGrid"],t.terminal=!0,wijmo_angular_base_1.WjDirective._dynaTemplates?(t.transclude=!1,t.priority=100,t.template=function(e,t){return t[WjFlexGridColumn._colTemplateProp]=e[0].innerHTML,"<div />"}):(t.transclude=!0,t.template="<div ng-transclude/>"),t}return __extends(t,e),t._getTemplContextProp=function(e){return"$__cellTempl"+CellTemplateType[e]},t.prototype._initControl=function(e){return{}},t.prototype._createLink=function(){return new WjFlexGridCellTemplateLink},t.prototype._getMetaDataId=function(){return"FlexGridCellTemplate"},t._tagName="wj-flex-grid-cell-template",t}(wijmo_angular_base_1.WjDirective);exports.WjFlexGridCellTemplate=WjFlexGridCellTemplate;var WjFlexGridCellTemplateLink=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype._initParent=function(){e.prototype._initParent.call(this);var l,i=this.scope.cellType;if(i){l=CellTemplateType[i];var o=this.tAttrs[WjFlexGridColumn._colTemplateProp],r=null!=o?o:wijmo_angular_base_1.WjDirective._removeTransclude(this.tElement[0].innerHTML),n=this.control;wijmo_1.isNullOrWhiteSpace(r)||(n.cellTemplate=r);var a=this.tAttrs.ngStyle,p=this.tAttrs.ngClass;a&&(n.cellStyle=a),p&&(n.cellClass=p),this.tAttrs.forceFullEdit||(n.forceFullEdit=!0);var s=this.tAttrs.autoSizeRows;if(n.autoSizeRows=null==s||"true"===s,n.cellTemplate||n.cellStyle||n.cellClass){n.templLink=this;var c=this.parent.control;c[WjFlexGridCellTemplate._getTemplContextProp(l)]=n,c instanceof wjcGrid.Column&&c._setFlag(wjcGrid.RowColFlags.HasTemplate,!0)}t._invalidateGrid(this.parent.control)}},t.prototype._destroy=function(){var l=this.parent&&this.parent.control,i=this.scope.cellType;e.prototype._destroy.call(this),i&&(l[WjFlexGridCellTemplate._getTemplContextProp(CellTemplateType[i])]=void 0,t._invalidateGrid(l))},t._invalidateGrid=function(e){var t=e;t&&(t instanceof wjcGrid.Column&&(t=t.grid),t&&t.invalidate())},t}(wijmo_angular_base_1.WjLink);