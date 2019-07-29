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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_grid_1=require("wijmo/wijmo.grid"),wijmo_1=require("wijmo/wijmo"),input=require("wijmo/wijmo.input"),selfModule=require("wijmo/wijmo.grid.filter");class FilterCondition{constructor(t){this._op=null,this._filter=t}get operator(){return this._op}set operator(t){this._op=wijmo_1.asEnum(t,Operator,!0)}get value(){return this._val}set value(t){if(this._val=t,this._strVal=wijmo_1.isString(t)?t.toString().toLowerCase():null,this._mapVal=null,this._filter){let e=this._filter.dataMap||this._filter.column.dataMap;e&&(this._mapVal=e.getDisplayValue(t),wijmo_1.isString(this._mapVal)&&(this._strVal=this._mapVal=this._mapVal.toLowerCase()))}}get isActive(){switch(this._op){case null:return!1;case Operator.EQ:case Operator.NE:return!0;default:return null!=this._val||null!=this._strVal}}clear(){this.operator=null,this.value=null}apply(t,e,i){let l=this._mapVal||this._strVal||this._val;wijmo_1.isString(t)&&(t=t.toLowerCase()),wijmo_1.isString(l)&&null==t&&(t=""),wijmo_1.isDate(l)&&(e?l=wijmo_1.DateTime.fromDateTime(l,FilterCondition._refDateTime):i&&(l=wijmo_1.DateTime.fromDateTime(FilterCondition._refDateTime,l)));let s=Operator;switch(this._op){case null:return!0;case s.EQ:return null!=t&&null!=l?t.valueOf()==l.valueOf():t==l;case s.NE:return null!=t&&null!=l?t.valueOf()!=l.valueOf():t!=l;case s.GT:return t>l;case s.GE:return t>=l;case s.LT:return t<l;case s.LE:return t<=l;case s.BW:return!(null==this._strVal||!wijmo_1.isString(t))&&0==t.indexOf(this._strVal);case s.EW:return!!(null!=this._strVal&&wijmo_1.isString(t)&&t.length>=this._strVal.length)&&t.substr(t.length-this._strVal.length)==l;case s.CT:return!(null==this._strVal||!wijmo_1.isString(t))&&t.indexOf(this._strVal)>-1;case s.NC:return!(null==this._strVal||!wijmo_1.isString(t))&&t.indexOf(this._strVal)<0}throw"Unknown operator"}}var Operator,FilterType;FilterCondition._refDateTime=new Date(2e3,0,1,0,0,0),exports.FilterCondition=FilterCondition,function(t){t[t.EQ=0]="EQ",t[t.NE=1]="NE",t[t.GT=2]="GT",t[t.GE=3]="GE",t[t.LT=4]="LT",t[t.LE=5]="LE",t[t.BW=6]="BW",t[t.EW=7]="EW",t[t.CT=8]="CT",t[t.NC=9]="NC"}(Operator=exports.Operator||(exports.Operator={}));class ConditionFilter{constructor(t){this._c1=new FilterCondition(this),this._c2=new FilterCondition(this),this._and=!0,this._col=t}get condition1(){return this._c1}get condition2(){return this._c2}get and(){return this._and}set and(t){this._and=wijmo_1.asBoolean(t)}get dataMap(){return this._map}set dataMap(t){this._map=wijmo_1.asType(t,wijmo_grid_1.DataMap,!0)}get column(){return this._col}get isActive(){return this._c1.isActive||this._c2.isActive}apply(t){let e=this._col,i=this._c1,l=this._c2,s=!1,a=!1;if(!e||!e._binding||!this.isActive)return!0;if(t=e._binding.getValue(t),this.dataMap)t=this.dataMap.getDisplayValue(t);else if(e.dataMap)t=e.dataMap.getDisplayValue(t);else if(wijmo_1.isDate(t))if(s=!this._hasTimePart(),a=!this._hasDatePart(),wijmo_1.assert(!s||!a,"Filter should have either date or time."),s){Date();t=wijmo_1.DateTime.fromDateTime(t,FilterCondition._refDateTime)}else a&&(t=wijmo_1.DateTime.fromDateTime(FilterCondition._refDateTime,t));else wijmo_1.isNumber(t)&&(t=wijmo_1.Globalize.parseFloat(wijmo_1.Globalize.format(t,e.format)));let r=i.apply(t,s,a),n=l.apply(t,s,a);return i.isActive&&l.isActive?this._and?r&&n:r||n:i.isActive?r:!l.isActive||n}clear(){this._c1.clear(),this._c2.clear(),this.and=!0}_hasDatePart(){let t=this._col.format;return!t||(t=wijmo_1.culture.Globalize.calendar.patterns[t]||t,/[yMd]+/.test(t))}_hasTimePart(){let t=this._col.format;return!!t&&(t=wijmo_1.culture.Globalize.calendar.patterns[t]||t,/[Hmst]+/.test(t))}implementsInterface(t){return"IColumnFilter"==t}}exports.ConditionFilter=ConditionFilter;class ConditionFilterEditor extends wijmo_1.Control{constructor(t,e){super(t),this._filter=wijmo_1.asType(e,ConditionFilter,!1);let i=this.getTemplate();this.applyTemplate("wj-control wj-conditionfilter-editor",i,{_divHdr:"div-hdr",_divCmb1:"div-cmb1",_divVal1:"div-val1",_btnAnd:"btn-and",_btnOr:"btn-or",_spAnd:"sp-and",_spOr:"sp-or",_divCmb2:"div-cmb2",_divVal2:"div-val2"});let l=wijmo_1.culture.FlexGridFilter,s=l.ariaLabels;wijmo_1.setAriaLabel(this._btnAnd,s.and),wijmo_1.setAriaLabel(this._btnOr,s.or),wijmo_1.setText(this._divHdr,l.header),wijmo_1.setText(this._spAnd,l.and),wijmo_1.setText(this._spOr,l.or),this._cmb1=this._createOperatorCombo(this._divCmb1,s.op1),this._cmb2=this._createOperatorCombo(this._divCmb2,s.op2),this._val1=this._createValueInput(this._divVal1,s.val1),this._val2=this._createValueInput(this._divVal2,s.val2),this._val1.isDisabled=!0,this._cmb1.selectedIndexChanged.addHandler((t,e)=>{this._val1.isDisabled=null==t.selectedValue}),this._val2.isDisabled=!0,this._cmb2.selectedIndexChanged.addHandler((t,e)=>{this._val2.isDisabled=null==t.selectedValue});let a=this.hostElement;this.addEventListener(a,"change",this._btnAndOrChanged.bind(this)),this.addEventListener(a,"keydown",this._keydown.bind(this)),this.updateEditor()}get filter(){return this._filter}updateEditor(){let t=this._filter.condition1,e=this._filter.condition2;this._cmb1.selectedValue=t.operator,this._cmb2.selectedValue=e.operator,this._val1 instanceof input.ComboBox&&!(this._val1 instanceof input.InputTime)?(this._val1.text=wijmo_1.changeType(t.value,wijmo_1.DataType.String),this._val2.text=wijmo_1.changeType(e.value,wijmo_1.DataType.String)):(this._val1.value=t.value,this._val2.value=e.value);let i=this._filter.and;this._checkRadio(this._btnAnd,i),this._checkRadio(this._btnOr,!i)}clearEditor(){this._cmb1.selectedValue=this._cmb2.selectedValue=null,this._val1.text=this._val2.text=null,this._checkRadio(this._btnAnd,!0),this._checkRadio(this._btnOr,!1)}get isEditorClear(){return null==this._cmb1.selectedValue&&!this._val1.text&&null==this._cmb2.selectedValue&&!this._val2.text}updateFilter(){let t=this._filter.condition1,e=this._filter.condition2;t.operator=this._cmb1.selectedValue,e.operator=this._cmb2.selectedValue,"value"in this._val1?(t.value=this._val1.value,e.value=this._val2.value):(t.value=this._val1.selectedValue,e.value=this._val2.selectedValue),this._filter.and=this._btnAnd.checked}_createOperatorCombo(t,e){let i=this._filter.column,l=wijmo_1.culture.FlexGridFilter,s=l.stringOperators,a=this._filter.dataMap||i.dataMap,r=wijmo_1.DataType;i.dataType==r.Date?s=l.dateOperators:i.dataType!=r.Number||a?i.dataType!=r.Boolean||a||(s=l.booleanOperators):s=l.numberOperators;let n=new input.ComboBox(t,{itemsSource:s,displayMemberPath:"name",selectedValuePath:"op"});return wijmo_1.setAriaLabel(n.inputElement,e),n}_createValueInput(t,e){let i=this._filter,l=i.column,s=i.dataMap||l.dataMap,a=null,r=wijmo_1.DataType;return l.dataType==r.Date?(a=i._hasDatePart()?i._hasTimePart()?new input.InputDateTime(t):new input.InputDate(t):new input.InputTime(t)).format=l.format:l.dataType!=r.Number||s?(a=new input.ComboBox(t),s?(a.itemsSource=s.getDisplayValues(),a.isEditable=!0):l.dataType==r.Boolean&&(a.itemsSource=[!0,!1])):(a=new input.InputNumber(t)).format=l.format,a.isRequired=!1,wijmo_1.setAriaLabel(a.inputElement,e),a}_btnAndOrChanged(t){let e=t.target==this._btnAnd,i=t.target==this._btnOr;(e||i)&&(this._checkRadio(this._btnAnd,e),this._checkRadio(this._btnOr,i))}_checkRadio(t,e){t.checked=e,t.setAttribute("aria-checked",e.toString()),t.setAttribute("tabindex",e?"1":"-1")}_keydown(t){let e=t.target==this._btnAnd,i=t.target==this._btnOr;if(e||i)switch(t.keyCode){case wijmo_1.Key.Left:case wijmo_1.Key.Right:case wijmo_1.Key.Up:case wijmo_1.Key.Down:let i=e?this._btnOr:this._btnAnd;i.click(),i.focus(),t.preventDefault()}}}ConditionFilterEditor.controlTemplate='<div><div wj-part="div-hdr"></div><div wj-part="div-cmb1"></div><br/><div wj-part="div-val1"></div><br/><div role="radiogroup" style="text-align:center"><label><input wj-part="btn-and" type="radio" role="radio"> <span wj-part="sp-and"></span> </label>&nbsp;&nbsp;&nbsp;<label><input wj-part="btn-or" type="radio" role="radio"> <span wj-part="sp-or"></span> </label></div><div wj-part="div-cmb2"></div><br/><div wj-part="div-val2"></div><br/></div>',exports.ConditionFilterEditor=ConditionFilterEditor;class ValueFilter{constructor(t){this._xValueSearch=!0,this._maxValues=250,this._sortValues=!0,this._col=t}get showValues(){return this._values}set showValues(t){this._values=t}get filterText(){return this._filterText}set filterText(t){this._filterText=wijmo_1.asString(t)}get exclusiveValueSearch(){return this._xValueSearch}set exclusiveValueSearch(t){this._xValueSearch=wijmo_1.asBoolean(t)}get maxValues(){return this._maxValues}set maxValues(t){this._maxValues=wijmo_1.asNumber(t,!1,!0)}get uniqueValues(){return this._uniqueValues}set uniqueValues(t){this._uniqueValues=wijmo_1.asArray(t)}get sortValues(){return this._sortValues}set sortValues(t){this._sortValues=wijmo_1.asBoolean(t)}get dataMap(){return this._map}set dataMap(t){this._map=wijmo_1.asType(t,wijmo_grid_1.DataMap,!0)}get column(){return this._col}get isActive(){return null!=this._values&&Object.keys(this._values).length>0}apply(t){let e=this.column;return!(e&&e._binding&&this._values&&Object.keys(this._values).length)||(t=e._binding.getValue(t),t=this.dataMap?this.dataMap.getDisplayValue(t):e.dataMap?e.dataMap.getDisplayValue(t):wijmo_1.Globalize.format(t,e.format),void 0!=this._values[t])}clear(){this.showValues=null,this.filterText=null}implementsInterface(t){return"IColumnFilter"==t}_getUniqueValues(t,e){let i=[];if(this.uniqueValues){let t=this.uniqueValues;for(let e=0;e<t.length;e++){let l=t[e];i.push({value:l,text:l.toString()})}return i}let l={},s=t.collectionView,a=s?s.sourceCollection:[];if(e&&s&&s.sourceCollection&&s.filter){let t=this.showValues;this.showValues=null;let e=[];for(let t=0;t<a.length;t++)s.filter(a[t])&&e.push(a[t]);a=e,this.showValues=t}for(let e=0;e<a.length;e++){let s=t._binding.getValue(a[e]),r=this.dataMap?this.dataMap.getDisplayValue(s):t.dataMap?t.dataMap.getDisplayValue(s):wijmo_1.Globalize.format(s,t.format);l[r]||(l[r]=!0,i.push({value:s,text:r}))}return i}}exports.ValueFilter=ValueFilter;class ValueFilterEditor extends wijmo_1.Control{constructor(t,e){super(t),this._filter=wijmo_1.asType(e,ValueFilter,!1);let i=this.getTemplate();this.applyTemplate("wj-control wj-valuefilter-editor",i,{_divFilter:"div-filter",_cbSelectAll:"cb-select-all",_spSelectAll:"sp-select-all",_divValues:"div-values"}),this._cbSelectAll.tabIndex=0;let l=wijmo_1.culture.FlexGridFilter;wijmo_1.setText(this._spSelectAll,l.selectAll);let s=this._view=new wijmo_1.CollectionView;if(s.sortNullsFirst=!0,e.sortValues){let t=e.column.dataMap||e.dataMap?"text":"value",i=e.column.dataType!=wijmo_1.DataType.Boolean;s.sortDescriptions.push(new wijmo_1.SortDescription(t,i))}s.filter=this._filterValues.bind(this),s.collectionChanged.addHandler(this._updateSelectAllCheck,this),this._filterText="",this._cmbFilter=new input.ComboBox(this._divFilter,{placeholder:l.search}),this._lbValues=new input.ListBox(this._divValues,{displayMemberPath:"text",checkedMemberPath:"show",itemsSource:this._view,itemFormatter:(t,e)=>e||l.null}),wijmo_1.setAriaLabel(this._cmbFilter.inputElement,l.ariaLabels.search),this._cmbFilter.textChanged.addHandler(this._filterTextChanged,this),this._cbSelectAll.addEventListener("click",this._cbSelectAllClicked.bind(this)),this.updateEditor()}get filter(){return this._filter}updateEditor(){let t=this._filter.column,e=this._filter._getUniqueValues(t,!0);this._lbValues.isContentHtml=t.isContentHtml;let i=this._filter.showValues;if(i&&0!=Object.keys(i).length){for(let t in i)for(let i=0;i<e.length;i++)if(e[i].text==t){e[i].show=!0;break}}else for(let t=0;t<e.length;t++)e[t].show=!0;this._view.pageSize=20,this._view.sourceCollection=e,setTimeout(()=>{this._view.pageSize=this._filter.maxValues,this._cmbFilter.text=this._filter.filterText||"",this._filterText=this._cmbFilter.text.toLowerCase()})}clearEditor(t=!0){this._cmbFilter.text="",this._filterText="",this._view.pageSize=0,this._view.refresh(),this._view.items.forEach(e=>{e.show=t}),this._view.pageSize=this._filter.maxValues}get isEditorClear(){return!this._filterText&&!this._cbSelectAll.indeterminate}updateFilter(){let t=null,e=this._getItems();if(this._filterText||this._cbSelectAll.indeterminate){t={};for(let i=0;i<e.length;i++){let l=e[i];l.show&&(t[l.text]=!0)}}let i=this._filter;i.showValues=t,i.filterText=""}_getItems(){return this._filter.exclusiveValueSearch?this._view.items:this._view.sourceCollection}_filterTextChanged(){this._toText&&clearTimeout(this._toText),this._toText=setTimeout(()=>{let t=this._cmbFilter.text.toLowerCase(),e=t!=this._filterText;this._filterText=t,this._view.refresh(),e&&(this._filter.exclusiveValueSearch?(this._cbSelectAll.checked=!0,this._cbSelectAllClicked()):this._updateSelectAllCheck())},300)}_filterValues(t){return!this._filterText||!(!t||!t.text)&&t.text.toLowerCase().indexOf(this._filterText)>-1}_cbSelectAllClicked(){let t=this._cbSelectAll.checked,e=this._divValues.scrollTop,i=this._getItems();for(let e=0;e<i.length;e++)i[e].show=t;this._view.refresh(),this._divValues.scrollTop=e}_updateSelectAllCheck(){let t=0,e=this._getItems();for(let i=0;i<e.length;i++)e[i].show&&t++;let i=this._cbSelectAll;0==t?(i.checked=!1,i.indeterminate=!1):t==e.length?(i.checked=!0,i.indeterminate=!1):i.indeterminate=!0}}ValueFilterEditor.controlTemplate='<div><div wj-part="div-filter"></div><div class="wj-listbox-item"><label><input wj-part="cb-select-all" type="checkbox"> <span wj-part="sp-select-all"></span></label></div><div wj-part="div-values"></div></div>',exports.ValueFilterEditor=ValueFilterEditor;class ColumnFilter{constructor(t,e){this._owner=t,this._col=e,this._valueFilter=new ValueFilter(e),this._valueFilter.exclusiveValueSearch=t.exclusiveValueSearch,this._conditionFilter=new ConditionFilter(e)}get filterType(){return null!=this._filterType?this._filterType:this._owner.defaultFilterType}set filterType(t){if((t=wijmo_1.asEnum(t,FilterType,!0))!=this._filterType){let e=this.isActive;this.clear(),this._filterType=t,e?this._owner.apply():this._col.grid&&this._col.grid.invalidate()}}get dataMap(){return this.conditionFilter.dataMap||this.valueFilter.dataMap}set dataMap(t){this.conditionFilter.dataMap=t,this.valueFilter.dataMap=t}get valueFilter(){return this._valueFilter}get conditionFilter(){return this._conditionFilter}get column(){return this._col}get isActive(){return this._conditionFilter.isActive||this._valueFilter.isActive}apply(t){return this._conditionFilter.apply(t)&&this._valueFilter.apply(t)}clear(){this._valueFilter.clear(),this._conditionFilter.clear()}implementsInterface(t){return"IColumnFilter"==t}}exports.ColumnFilter=ColumnFilter,function(t){t[t.None=0]="None",t[t.Condition=1]="Condition",t[t.Value=2]="Value",t[t.Both=3]="Both"}(FilterType=exports.FilterType||(exports.FilterType={}));class FlexGridFilter{constructor(t,e){this._showIcons=!0,this._showSort=!0,this._defFilterType=FilterType.Both,this._xValueSearch=!0,this.filterApplied=new wijmo_1.Event,this.filterChanging=new wijmo_1.Event,this.filterChanged=new wijmo_1.Event,this._filters=[],this._g=wijmo_1.asType(t,wijmo_grid_1.FlexGrid,!1),this._g.formatItem.addHandler(this._formatItem.bind(this)),this._g.itemsSourceChanged.addHandler(this.clear.bind(this));let i=this._g.hostElement;t.addEventListener(i,"mousedown",this._mousedown.bind(this),!0),t.addEventListener(i,"click",this._click.bind(this),!0),t.addEventListener(i,"keydown",this._keydown.bind(this),!0),this._g.invalidate(),e&&wijmo_1.copy(this,e)}get grid(){return this._g}get filterColumns(){return this._filterColumns}set filterColumns(t){this._filterColumns=wijmo_1.asArray(t),this.clear()}get showFilterIcons(){return this._showIcons}set showFilterIcons(t){t!=this.showFilterIcons&&(this._showIcons=wijmo_1.asBoolean(t),this._g&&this._g.invalidate())}get showSortButtons(){return this._showSort}set showSortButtons(t){this._showSort=wijmo_1.asBoolean(t)}getColumnFilter(t,e=!0){t=this._asColumn(t);for(let e=0;e<this._filters.length;e++)if(this._filters[e].column==t)return this._filters[e];if(e&&t.binding){let e=new ColumnFilter(this,t);return this._filters.push(e),e}return null}get defaultFilterType(){return this._defFilterType}set defaultFilterType(t){(t=wijmo_1.asEnum(t,FilterType,!1))!=this.defaultFilterType&&(this._defFilterType=t,this._g.invalidate(),this.clear())}get exclusiveValueSearch(){return this._xValueSearch}set exclusiveValueSearch(t){this._xValueSearch=wijmo_1.asBoolean(t)}get filterDefinition(){let t={defaultFilterType:this.defaultFilterType,filters:[]};return this._filters.forEach(e=>{let i=e.conditionFilter,l=e.valueFilter,s=l.uniqueValues&&l.uniqueValues.length;if(e&&e.column&&e.column.binding&&(e.isActive||s||e.filterType!=this.defaultFilterType)){let a={binding:e.column.binding};if(i.isActive){let t=i.condition1,l=i.condition2;a={binding:e.column.binding,type:"condition",condition1:{operator:t.operator,value:t.value},and:i.and,condition2:{operator:l.operator,value:l.value}}}else(l.isActive||s)&&(a={binding:e.column.binding,type:"value",uniqueValues:l.uniqueValues,sortValues:l.sortValues,maxValues:l.maxValues,exclusiveValueSearch:l.exclusiveValueSearch,showValues:l.showValues});e.filterType!=this.defaultFilterType&&(a.filterType=e.filterType),t.filters.push(a)}}),JSON.stringify(t)}set filterDefinition(t){if(t=wijmo_1.asString(t),this.clear(),t){let e=JSON.parse(t);this.defaultFilterType=e.defaultFilterType;for(let t=0;t<e.filters.length;t++){let i=e.filters[t],l=this._g.getColumn(i.binding),s=this.getColumnFilter(l,!0);if(s)switch(null!=i.filterType&&(s.filterType=wijmo_1.asEnum(i.filterType,FilterType)),i.type){case"condition":let t=s.conditionFilter;t.condition1.value=l.dataType==wijmo_1.DataType.Date?wijmo_1.changeType(i.condition1.value,l.dataType,null):i.condition1.value,t.condition1.operator=i.condition1.operator,t.and=i.and,t.condition2.value=l.dataType==wijmo_1.DataType.Date?wijmo_1.changeType(i.condition2.value,l.dataType,null):i.condition2.value,t.condition2.operator=i.condition2.operator;break;case"value":let e=s.valueFilter;e.uniqueValues=i.uniqueValues,["sortValues","maxValues","exclusiveValueSearch"].forEach(t=>{null!=i[t]&&(e[t]=i[t])}),e.showValues=i.showValues}}}this.apply()}get activeEditor(){return wijmo_1.Control.getControl(this._divEdt)}editColumnFilter(t,e,i){this.closeEditor(),t=this._asColumn(t);let l=this._g,s=new wijmo_grid_1.CellRangeEventArgs(l.cells,new wijmo_grid_1.CellRange(-1,t.index));if(!this.onFilterChanging(s))return void(this._divEdt=this._edtCol=null);s.cancel=!0;let a=wijmo_1.createElement('<div class="wj-dropdown-panel"></div>'),r=this.getColumnFilter(t),n=new ColumnFilterEditor(a,r,this.showSortButtons);this._divEdt=a,this._edtCol=t,l.rightToLeft&&(a.dir="rtl"),n.filterChanged.addHandler(()=>{s.cancel=!1,setTimeout(()=>{s.cancel||this.apply()})}),n.buttonClicked.addHandler(()=>{this.closeEditor(),l.focus(),this.onFilterChanged(s)}),n.lostFocus.addHandler(()=>{setTimeout(()=>{let t=wijmo_1.Control.getControl(this._divEdt);t&&!t.containsFocus()&&this.closeEditor()},10)});let o=e?e.col:t.index;e||l.columns[o].binding==t.binding||(o=l.selection.leftCol),l._edtHdl._commitRowEdits(),l.scrollIntoView(-1,o,!0);let d=l.columnHeaders,h=e&&e.panel==d?e.row:d.rows.length-1,u=o,_=d.getCellBoundingRect(h,u),c=i||d.getCellElement(h,u);c?wijmo_1.showPopup(a,c,!1,!1,!1):wijmo_1.showPopup(a,_),this._setAriaExpanded(c,!0),this._setAriaExpanded(l.cells.getCellElement(-1,u),!0);let p=n.hostElement.querySelectorAll("input");for(let t=0;t<p.length;t++){let e=p[t];if(e.offsetHeight>0&&e.tabIndex>-1&&!e.disabled){e.focus();break}}n.containsFocus()||n.focus()}_setAriaExpanded(t,e){if(t){var i=t.querySelector("."+FlexGridFilter._WJC_FILTER);wijmo_1.setAttribute(i,"aria-expanded",e)}}closeEditor(){let t=this._g,e=wijmo_1.Control.getControl(this._divEdt),i=this._edtCol;if(e&&wijmo_1.hidePopup(e.hostElement,()=>{e.dispose()}),i){let e=t.columnHeaders,l=e.rows.length?e.getCellElement(e.rows.length-1,i.index):null;this._setAriaExpanded(l,!1),l=t.cells.getCellElement(-1,i.index),this._setAriaExpanded(l,!1)}this._divEdt=null,this._edtCol=null}apply(){let t=this._g.collectionView;if(t){let e=this._g.editableCollectionView;e&&(e.commitEdit(),e.commitNew()),t.filter=this._filter.bind(this)}let e=t?t.updateFilterDefinition:null;wijmo_1.isFunction(e)&&e.call(t,this),this.onFilterApplied()}clear(){this._filters.length&&(this._filters=[],this.apply())}onFilterApplied(t){this.filterApplied.raise(this,t)}onFilterChanging(t){return this.filterChanging.raise(this,t),!t.cancel}onFilterChanged(t){this.filterChanged.raise(this,t)}_asColumn(t){return wijmo_1.isString(t)?this._g.getColumn(t):wijmo_1.isNumber(t)?this._g.columns[t]:wijmo_1.asType(t,wijmo_grid_1.Column,!1)}_filter(t){for(let e=0;e<this._filters.length;e++)if(!this._filters[e].apply(t))return!1;return!0}_formatItem(t,e){if(e.panel==t.columnHeaders){let t=this._g,i=t.getMergedRange(e.panel,e.row,e.col)||new wijmo_grid_1.CellRange(e.row,e.col),l=t.columns[i.col],s=t._getBindingColumn(e.panel,e.row,l),a=e.cell;if(i.row2==e.panel.rows.length-1||l!=s){let i=this.getColumnFilter(s,this.defaultFilterType!=FilterType.None);this._filterColumns&&this._filterColumns.indexOf(s.binding)<0&&(i=null),i?(wijmo_1.toggleClass(a,"wj-filter-on",i.isActive),wijmo_1.toggleClass(a,"wj-filter-off",!i.isActive)):(wijmo_1.removeClass(a,"wj-filter-on"),wijmo_1.removeClass(a,"wj-filter-off")),i&&i.filterType!=FilterType.None&&(this._showIcons&&this._addFilterButton(s,i,a),0==e.row&&(a=t.cells.getCellElement(-1,e.col))&&this._addFilterButton(l,i,a))}}}_addFilterButton(t,e,i){let l=FlexGridFilter._WJC_FILTER,s=wijmo_1.createElement('<button class="wj-btn wj-btn-glyph wj-right '+l+'" type="button" tabindex="-1"><span class="wj-glyph-filter"></span></button>');wijmo_1.setAriaLabel(s,wijmo_1.culture.FlexGridFilter.ariaLabels.edit+" "+t.header),wijmo_1.setAttribute(s,"aria-haspopup","dialog"),wijmo_1.setAttribute(s,"aria-expanded",!1),wijmo_1.setAttribute(s,"aria-describedby",t.describedById),wijmo_1.setAttribute(s,"aria-pressed",e.isActive),i.querySelector("."+l)||(1==i.children.length&&(i=i.querySelector("div")||i),i.appendChild(s))}_mousedown(t){this._toggleEditor(t)&&(this._tmd=!0,t.stopPropagation(),t.preventDefault())}_click(t){(this._tmd||this._toggleEditor(t))&&(t.stopPropagation(),t.preventDefault()),this._tmd=!1}_toggleEditor(t){if(this._tmd=!1,!t.defaultPrevented&&0==t.button)if(wijmo_1.closestClass(t.target,FlexGridFilter._WJC_FILTER)){let e=this._g,i=e.hitTest(t.target);if(i.panel||(i=e.hitTest(t)),i.panel==e.columnHeaders||i.panel==e.cells&&-1==i.row){let t=e.columns[i.col],l=e._getBindingColumn(i.panel,i.row,t);return this._divEdt&&this._edtCol==l?(this.closeEditor(),e.focus()):setTimeout(()=>{this.editColumnFilter(l,i)},this._divEdt?100:0),!0}}else this.closeEditor();return!1}_keydown(t){if(!t.defaultPrevented&&!t.ctrlKey&&t.altKey&&(t.keyCode==wijmo_1.Key.Down||t.keyCode==wijmo_1.Key.Up)){let e=this.grid,i=e.selection,l=i.col>-1?e.columns[i.col]:null,s=l?e._getBindingColumn(e.cells,i.row,l):null;s&&!s.dataMap&&this.getColumnFilter(s,!0)&&(this.editColumnFilter(s),t.preventDefault(),t.stopPropagation())}}}FlexGridFilter._WJC_FILTER="wj-elem-filter",exports.FlexGridFilter=FlexGridFilter,wijmo_1._addCultureInfo("FlexGridFilter",{ariaLabels:{edit:"Edit Filter for Column",dialog:"Filter Editor for Column",asc:"Sort Column in Ascending Order",dsc:"Sort Column in Descending Order",search:"Search Item List",op1:"First Condition Operator",val1:"First Condition Value",and:"Require both Conditions",or:"Require either Condition",op2:"Second Condition Operator",val2:"Second Condition Value"},ascending:"↑ Ascending",descending:"↓ Descending",apply:"Apply",cancel:"Cancel",clear:"Clear",conditions:"Filter by Condition",values:"Filter by Value",search:"Search",selectAll:"Select All",null:"(nothing)",header:"Show items where the value",and:"And",or:"Or",stringOperators:[{name:"(not set)",op:null},{name:"Equals",op:Operator.EQ},{name:"Does not equal",op:Operator.NE},{name:"Begins with",op:Operator.BW},{name:"Ends with",op:Operator.EW},{name:"Contains",op:Operator.CT},{name:"Does not contain",op:Operator.NC}],numberOperators:[{name:"(not set)",op:null},{name:"Equals",op:Operator.EQ},{name:"Does not equal",op:Operator.NE},{name:"Is Greater than",op:Operator.GT},{name:"Is Greater than or equal to",op:Operator.GE},{name:"Is Less than",op:Operator.LT},{name:"Is Less than or equal to",op:Operator.LE}],dateOperators:[{name:"(not set)",op:null},{name:"Equals",op:Operator.EQ},{name:"Is Before",op:Operator.LT},{name:"Is After",op:Operator.GT}],booleanOperators:[{name:"(not set)",op:null},{name:"Equals",op:Operator.EQ},{name:"Does not equal",op:Operator.NE}]});class ColumnFilterEditor extends wijmo_1.Control{constructor(t,e,i=!0){super(t,null,!0),this.filterChanged=new wijmo_1.Event,this.buttonClicked=new wijmo_1.Event,this._filter=wijmo_1.asType(e,ColumnFilter);let l=this.getTemplate();this.applyTemplate("wj-control wj-content wj-columnfiltereditor",l,{_divSort:"div-sort",_btnAsc:"btn-asc",_btnDsc:"btn-dsc",_divType:"div-type",_aVal:"a-val",_aCnd:"a-cnd",_divEdtVal:"div-edt-val",_divEdtCnd:"div-edt-cnd",_btnApply:"btn-apply",_btnCancel:"btn-cancel",_btnClear:"btn-clear"});let s=wijmo_1.culture.FlexGridFilter,a=s.ariaLabels,r=this.hostElement,n=this.filter.column,o=n.grid.collectionView;wijmo_1.setAttribute(r,"role","dialog"),wijmo_1.setAriaLabel(r,a.dialog+" "+n.header),wijmo_1.setAriaLabel(this._btnAsc,a.asc),wijmo_1.setAriaLabel(this._btnDsc,a.dsc),wijmo_1.setText(this._btnAsc,s.ascending),wijmo_1.setText(this._btnDsc,s.descending),wijmo_1.setText(this._aVal,s.values),wijmo_1.setText(this._aCnd,s.conditions),wijmo_1.setText(this._btnApply,s.apply),wijmo_1.setText(this._btnCancel,s.cancel),wijmo_1.setText(this._btnClear,s.clear);let d=this.filter.conditionFilter.isActive||0==(e.filterType&FilterType.Value)?FilterType.Condition:FilterType.Value;this._showFilter(d),i&&o&&o.canSort||(this._divSort.style.display="none");let h=this._btnClicked.bind(this);this._btnApply.addEventListener("click",h),this._btnCancel.addEventListener("click",h),this._btnClear.addEventListener("click",h),this._btnAsc.addEventListener("click",h),this._btnDsc.addEventListener("click",h),this._aVal.addEventListener("click",h),this._aCnd.addEventListener("click",h),this.addEventListener(r,"keydown",t=>{if(!t.defaultPrevented){let e=t.target.tagName.match(/^(a|button)$/i);switch(t.keyCode){case wijmo_1.Key.Space:e&&(this._btnClicked(t),t.preventDefault());break;case wijmo_1.Key.Enter:e?this._btnClicked(t):(this.updateFilter(),this.onFilterChanged(),this.onButtonClicked()),t.preventDefault();break;case wijmo_1.Key.Escape:this.onButtonClicked(),t.preventDefault();break;case wijmo_1.Key.Tab:wijmo_1.moveFocus(this.hostElement,t.shiftKey?-1:1),t.preventDefault()}}}),this.addEventListener(window,"resize",()=>{this.isTouching||this._wasTouching||this.onButtonClicked()})}get filter(){return this._filter}updateEditor(){this._edtVal&&this._edtVal.updateEditor(),this._edtCnd&&this._edtCnd.updateEditor()}updateFilter(){switch(this._getFilterType()){case FilterType.Value:this._edtVal.updateFilter(),this.filter.conditionFilter.clear();break;case FilterType.Condition:this._edtCnd.updateFilter(),this.filter.valueFilter.clear()}}onFilterChanged(t){this.filterChanged.raise(this,t)}onButtonClicked(t){this.buttonClicked.raise(this,t)}_showFilter(t){this._wasTouching=this.isTouching,t==FilterType.Value&&null==this._edtVal&&(this._edtVal=new ValueFilterEditor(this._divEdtVal,this.filter.valueFilter)),t==FilterType.Condition&&null==this._edtCnd&&(this._edtCnd=new ConditionFilterEditor(this._divEdtCnd,this.filter.conditionFilter)),0!=(t&this.filter.filterType)&&(t==FilterType.Value?(this._divEdtVal.style.display="",this._divEdtCnd.style.display="none",this._enableLink(this._aVal,!1),this._enableLink(this._aCnd,!0),this._edtVal.focus()):(this._divEdtVal.style.display="none",this._divEdtCnd.style.display="",this._enableLink(this._aVal,!0),this._enableLink(this._aCnd,!1),this._edtCnd.focus()));let e=this._divType.style;switch(this.filter.filterType){case FilterType.None:case FilterType.Condition:case FilterType.Value:e.display="none";break;default:e.display=""}}_enableLink(t,e){wijmo_1.toggleClass(t,"wj-state-disabled",!e),wijmo_1.setAttribute(t,"href",e?"":null),wijmo_1.setAttribute(t,"disabled",e?null:"disabled")}_getFilterType(){let t=FilterType;return"none"!=this._divEdtVal.style.display?t.Value:t.Condition}_btnClicked(t){let e=t.target;if(t.preventDefault(),t.stopPropagation(),!wijmo_1.hasClass(e,"wj-state-disabled")){if(e==this._aVal)return this._showFilter(FilterType.Value),void wijmo_1.moveFocus(this._edtVal.hostElement,0);if(e==this._aCnd)return this._showFilter(FilterType.Condition),void wijmo_1.moveFocus(this._edtCnd.hostElement,0);if(e==this._btnAsc||e==this._btnDsc){let e=this.filter.column,i=e.sortMemberPath?e.sortMemberPath:e.binding,l=e.grid.collectionView,s=new wijmo_1.SortDescription(i,t.target==this._btnAsc);l.sortDescriptions.deferUpdate(()=>{l.sortDescriptions.clear(),l.sortDescriptions.push(s)})}e==this._btnApply?(this.updateFilter(),this.onFilterChanged()):e==this._btnClear?this.filter.isActive&&(this.filter.clear(),this.onFilterChanged()):this.updateEditor(),this.onButtonClicked()}}}ColumnFilterEditor.controlTemplate='<div><div wj-part="div-sort"><button wj-part="btn-asc" class="wj-btn" style="min-width:95px"></button>&nbsp;&nbsp;&nbsp;<button wj-part="btn-dsc" class="wj-btn" style="min-width:95px"></button></div><div wj-part="div-type" class="wj-filtertype"><a wj-part="a-cnd" href="" draggable="false"></a>&nbsp;|&nbsp;<a wj-part="a-val" href="" draggable="false"></a></div><div wj-part="div-edt-val" tabindex="-1"></div><div wj-part="div-edt-cnd" tabindex="-1"></div><div style="text-align:right;margin-top:10px"><button wj-part="btn-apply" class="wj-btn"></button>&nbsp;&nbsp;<button wj-part="btn-cancel" class="wj-btn"></button>&nbsp;&nbsp;<button wj-part="btn-clear" class="wj-btn"></button></div>',exports.ColumnFilterEditor=ColumnFilterEditor,wijmo_1._registerModule("wijmo.grid.filter",selfModule);