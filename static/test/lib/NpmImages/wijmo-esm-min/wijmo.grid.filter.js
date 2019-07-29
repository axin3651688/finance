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

var __extends=this&&this.__extends||function(){var e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i])})(t,i)};return function(t,i){function n(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}();import{Column,DataMap,FlexGrid,CellRange,CellRangeEventArgs}from"wijmo/wijmo.grid";import{Globalize,asString,asNumber,asArray,asBoolean,asType,asEnum,isString,isDate,DateTime,culture,assert,isNumber,Control,Event,DataType,Key,copy,changeType,createElement,setAttribute,showPopup,hidePopup,isFunction,toggleClass,removeClass,closestClass,setAriaLabel,setText,CollectionView,SortDescription,_addCultureInfo,moveFocus,hasClass,_registerModule}from"wijmo/wijmo";import*as input from"wijmo/wijmo.input";import*as selfModule from"wijmo/wijmo.grid.filter";var FilterCondition=function(){function e(e){this._op=null,this._filter=e}return Object.defineProperty(e.prototype,"operator",{get:function(){return this._op},set:function(e){this._op=asEnum(e,Operator,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this._val},set:function(e){if(this._val=e,this._strVal=isString(e)?e.toString().toLowerCase():null,this._mapVal=null,this._filter){var t=this._filter.dataMap||this._filter.column.dataMap;t&&(this._mapVal=t.getDisplayValue(e),isString(this._mapVal)&&(this._strVal=this._mapVal=this._mapVal.toLowerCase()))}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isActive",{get:function(){switch(this._op){case null:return!1;case Operator.EQ:case Operator.NE:return!0;default:return null!=this._val||null!=this._strVal}},enumerable:!0,configurable:!0}),e.prototype.clear=function(){this.operator=null,this.value=null},e.prototype.apply=function(t,i,n){var r=this._mapVal||this._strVal||this._val;isString(t)&&(t=t.toLowerCase()),isString(r)&&null==t&&(t=""),isDate(r)&&(i?r=DateTime.fromDateTime(r,e._refDateTime):n&&(r=DateTime.fromDateTime(e._refDateTime,r)));var l=Operator;switch(this._op){case null:return!0;case l.EQ:return null!=t&&null!=r?t.valueOf()==r.valueOf():t==r;case l.NE:return null!=t&&null!=r?t.valueOf()!=r.valueOf():t!=r;case l.GT:return t>r;case l.GE:return t>=r;case l.LT:return t<r;case l.LE:return t<=r;case l.BW:return!(null==this._strVal||!isString(t))&&0==t.indexOf(this._strVal);case l.EW:return!!(null!=this._strVal&&isString(t)&&t.length>=this._strVal.length)&&t.substr(t.length-this._strVal.length)==r;case l.CT:return!(null==this._strVal||!isString(t))&&t.indexOf(this._strVal)>-1;case l.NC:return!(null==this._strVal||!isString(t))&&t.indexOf(this._strVal)<0}throw"Unknown operator"},e._refDateTime=new Date(2e3,0,1,0,0,0),e}();export{FilterCondition};export var Operator;!function(e){e[e.EQ=0]="EQ",e[e.NE=1]="NE",e[e.GT=2]="GT",e[e.GE=3]="GE",e[e.LT=4]="LT",e[e.LE=5]="LE",e[e.BW=6]="BW",e[e.EW=7]="EW",e[e.CT=8]="CT",e[e.NC=9]="NC"}(Operator||(Operator={}));var ConditionFilter=function(){function e(e){this._c1=new FilterCondition(this),this._c2=new FilterCondition(this),this._and=!0,this._col=e}return Object.defineProperty(e.prototype,"condition1",{get:function(){return this._c1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"condition2",{get:function(){return this._c2},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"and",{get:function(){return this._and},set:function(e){this._and=asBoolean(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dataMap",{get:function(){return this._map},set:function(e){this._map=asType(e,DataMap,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"column",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isActive",{get:function(){return this._c1.isActive||this._c2.isActive},enumerable:!0,configurable:!0}),e.prototype.apply=function(e){var t=this._col,i=this._c1,n=this._c2,r=!1,l=!1;if(!t||!t._binding||!this.isActive)return!0;if(e=t._binding.getValue(e),this.dataMap)e=this.dataMap.getDisplayValue(e);else if(t.dataMap)e=t.dataMap.getDisplayValue(e);else if(isDate(e))if(r=!this._hasTimePart(),l=!this._hasDatePart(),assert(!r||!l,"Filter should have either date or time."),r){Date();e=DateTime.fromDateTime(e,FilterCondition._refDateTime)}else l&&(e=DateTime.fromDateTime(FilterCondition._refDateTime,e));else isNumber(e)&&(e=Globalize.parseFloat(Globalize.format(e,t.format)));var a=i.apply(e,r,l),o=n.apply(e,r,l);return i.isActive&&n.isActive?this._and?a&&o:a||o:i.isActive?a:!n.isActive||o},e.prototype.clear=function(){this._c1.clear(),this._c2.clear(),this.and=!0},e.prototype._hasDatePart=function(){var e=this._col.format;return!e||(e=culture.Globalize.calendar.patterns[e]||e,/[yMd]+/.test(e))},e.prototype._hasTimePart=function(){var e=this._col.format;return!!e&&(e=culture.Globalize.calendar.patterns[e]||e,/[Hmst]+/.test(e))},e.prototype.implementsInterface=function(e){return"IColumnFilter"==e},e}();export{ConditionFilter};var ConditionFilterEditor=function(e){function t(t,i){var n=e.call(this,t)||this;n._filter=asType(i,ConditionFilter,!1);var r=n.getTemplate();n.applyTemplate("wj-control wj-conditionfilter-editor",r,{_divHdr:"div-hdr",_divCmb1:"div-cmb1",_divVal1:"div-val1",_btnAnd:"btn-and",_btnOr:"btn-or",_spAnd:"sp-and",_spOr:"sp-or",_divCmb2:"div-cmb2",_divVal2:"div-val2"});var l=culture.FlexGridFilter,a=l.ariaLabels;setAriaLabel(n._btnAnd,a.and),setAriaLabel(n._btnOr,a.or),setText(n._divHdr,l.header),setText(n._spAnd,l.and),setText(n._spOr,l.or),n._cmb1=n._createOperatorCombo(n._divCmb1,a.op1),n._cmb2=n._createOperatorCombo(n._divCmb2,a.op2),n._val1=n._createValueInput(n._divVal1,a.val1),n._val2=n._createValueInput(n._divVal2,a.val2),n._val1.isDisabled=!0,n._cmb1.selectedIndexChanged.addHandler(function(e,t){n._val1.isDisabled=null==e.selectedValue}),n._val2.isDisabled=!0,n._cmb2.selectedIndexChanged.addHandler(function(e,t){n._val2.isDisabled=null==e.selectedValue});var o=n.hostElement;return n.addEventListener(o,"change",n._btnAndOrChanged.bind(n)),n.addEventListener(o,"keydown",n._keydown.bind(n)),n.updateEditor(),n}return __extends(t,e),Object.defineProperty(t.prototype,"filter",{get:function(){return this._filter},enumerable:!0,configurable:!0}),t.prototype.updateEditor=function(){var e=this._filter.condition1,t=this._filter.condition2;this._cmb1.selectedValue=e.operator,this._cmb2.selectedValue=t.operator,this._val1 instanceof input.ComboBox&&!(this._val1 instanceof input.InputTime)?(this._val1.text=changeType(e.value,DataType.String),this._val2.text=changeType(t.value,DataType.String)):(this._val1.value=e.value,this._val2.value=t.value);var i=this._filter.and;this._checkRadio(this._btnAnd,i),this._checkRadio(this._btnOr,!i)},t.prototype.clearEditor=function(){this._cmb1.selectedValue=this._cmb2.selectedValue=null,this._val1.text=this._val2.text=null,this._checkRadio(this._btnAnd,!0),this._checkRadio(this._btnOr,!1)},Object.defineProperty(t.prototype,"isEditorClear",{get:function(){return null==this._cmb1.selectedValue&&!this._val1.text&&null==this._cmb2.selectedValue&&!this._val2.text},enumerable:!0,configurable:!0}),t.prototype.updateFilter=function(){var e=this._filter.condition1,t=this._filter.condition2;e.operator=this._cmb1.selectedValue,t.operator=this._cmb2.selectedValue,"value"in this._val1?(e.value=this._val1.value,t.value=this._val2.value):(e.value=this._val1.selectedValue,t.value=this._val2.selectedValue),this._filter.and=this._btnAnd.checked},t.prototype._createOperatorCombo=function(e,t){var i=this._filter.column,n=culture.FlexGridFilter,r=n.stringOperators,l=this._filter.dataMap||i.dataMap,a=DataType;i.dataType==a.Date?r=n.dateOperators:i.dataType!=a.Number||l?i.dataType!=a.Boolean||l||(r=n.booleanOperators):r=n.numberOperators;var o=new input.ComboBox(e,{itemsSource:r,displayMemberPath:"name",selectedValuePath:"op"});return setAriaLabel(o.inputElement,t),o},t.prototype._createValueInput=function(e,t){var i=this._filter,n=i.column,r=i.dataMap||n.dataMap,l=null,a=DataType;return n.dataType==a.Date?(l=i._hasDatePart()?i._hasTimePart()?new input.InputDateTime(e):new input.InputDate(e):new input.InputTime(e)).format=n.format:n.dataType!=a.Number||r?(l=new input.ComboBox(e),r?(l.itemsSource=r.getDisplayValues(),l.isEditable=!0):n.dataType==a.Boolean&&(l.itemsSource=[!0,!1])):(l=new input.InputNumber(e)).format=n.format,l.isRequired=!1,setAriaLabel(l.inputElement,t),l},t.prototype._btnAndOrChanged=function(e){var t=e.target==this._btnAnd,i=e.target==this._btnOr;(t||i)&&(this._checkRadio(this._btnAnd,t),this._checkRadio(this._btnOr,i))},t.prototype._checkRadio=function(e,t){e.checked=t,e.setAttribute("aria-checked",t.toString()),e.setAttribute("tabindex",t?"1":"-1")},t.prototype._keydown=function(e){var t=e.target==this._btnAnd,i=e.target==this._btnOr;if(t||i)switch(e.keyCode){case Key.Left:case Key.Right:case Key.Up:case Key.Down:var n=t?this._btnOr:this._btnAnd;n.click(),n.focus(),e.preventDefault()}},t.controlTemplate='<div><div wj-part="div-hdr"></div><div wj-part="div-cmb1"></div><br/><div wj-part="div-val1"></div><br/><div role="radiogroup" style="text-align:center"><label><input wj-part="btn-and" type="radio" role="radio"> <span wj-part="sp-and"></span> </label>&nbsp;&nbsp;&nbsp;<label><input wj-part="btn-or" type="radio" role="radio"> <span wj-part="sp-or"></span> </label></div><div wj-part="div-cmb2"></div><br/><div wj-part="div-val2"></div><br/></div>',t}(Control);export{ConditionFilterEditor};var ValueFilter=function(){function e(e){this._xValueSearch=!0,this._maxValues=250,this._sortValues=!0,this._col=e}return Object.defineProperty(e.prototype,"showValues",{get:function(){return this._values},set:function(e){this._values=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"filterText",{get:function(){return this._filterText},set:function(e){this._filterText=asString(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"exclusiveValueSearch",{get:function(){return this._xValueSearch},set:function(e){this._xValueSearch=asBoolean(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxValues",{get:function(){return this._maxValues},set:function(e){this._maxValues=asNumber(e,!1,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"uniqueValues",{get:function(){return this._uniqueValues},set:function(e){this._uniqueValues=asArray(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"sortValues",{get:function(){return this._sortValues},set:function(e){this._sortValues=asBoolean(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dataMap",{get:function(){return this._map},set:function(e){this._map=asType(e,DataMap,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"column",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isActive",{get:function(){return null!=this._values&&Object.keys(this._values).length>0},enumerable:!0,configurable:!0}),e.prototype.apply=function(e){var t=this.column;return!(t&&t._binding&&this._values&&Object.keys(this._values).length)||(e=t._binding.getValue(e),e=this.dataMap?this.dataMap.getDisplayValue(e):t.dataMap?t.dataMap.getDisplayValue(e):Globalize.format(e,t.format),void 0!=this._values[e])},e.prototype.clear=function(){this.showValues=null,this.filterText=null},e.prototype.implementsInterface=function(e){return"IColumnFilter"==e},e.prototype._getUniqueValues=function(e,t){var i=[];if(this.uniqueValues){for(var n=this.uniqueValues,r=0;r<n.length;r++){var l=n[r];i.push({value:l,text:l.toString()})}return i}var a={},o=e.collectionView,s=o?o.sourceCollection:[];if(t&&o&&o.sourceCollection&&o.filter){var u=this.showValues;this.showValues=null;var c=[];for(r=0;r<s.length;r++)o.filter(s[r])&&c.push(s[r]);s=c,this.showValues=u}for(r=0;r<s.length;r++){l=e._binding.getValue(s[r]);var d=this.dataMap?this.dataMap.getDisplayValue(l):e.dataMap?e.dataMap.getDisplayValue(l):Globalize.format(l,e.format);a[d]||(a[d]=!0,i.push({value:l,text:d}))}return i},e}();export{ValueFilter};var ValueFilterEditor=function(e){function t(t,i){var n=e.call(this,t)||this;n._filter=asType(i,ValueFilter,!1);var r=n.getTemplate();n.applyTemplate("wj-control wj-valuefilter-editor",r,{_divFilter:"div-filter",_cbSelectAll:"cb-select-all",_spSelectAll:"sp-select-all",_divValues:"div-values"}),n._cbSelectAll.tabIndex=0;var l=culture.FlexGridFilter;setText(n._spSelectAll,l.selectAll);var a=n._view=new CollectionView;if(a.sortNullsFirst=!0,i.sortValues){var o=i.column.dataMap||i.dataMap?"text":"value",s=i.column.dataType!=DataType.Boolean;a.sortDescriptions.push(new SortDescription(o,s))}return a.filter=n._filterValues.bind(n),a.collectionChanged.addHandler(n._updateSelectAllCheck,n),n._filterText="",n._cmbFilter=new input.ComboBox(n._divFilter,{placeholder:l.search}),n._lbValues=new input.ListBox(n._divValues,{displayMemberPath:"text",checkedMemberPath:"show",itemsSource:n._view,itemFormatter:function(e,t){return t||l.null}}),setAriaLabel(n._cmbFilter.inputElement,l.ariaLabels.search),n._cmbFilter.textChanged.addHandler(n._filterTextChanged,n),n._cbSelectAll.addEventListener("click",n._cbSelectAllClicked.bind(n)),n.updateEditor(),n}return __extends(t,e),Object.defineProperty(t.prototype,"filter",{get:function(){return this._filter},enumerable:!0,configurable:!0}),t.prototype.updateEditor=function(){var e=this,t=this._filter.column,i=this._filter._getUniqueValues(t,!0);this._lbValues.isContentHtml=t.isContentHtml;var n=this._filter.showValues;if(n&&0!=Object.keys(n).length){for(var r in n)for(l=0;l<i.length;l++)if(i[l].text==r){i[l].show=!0;break}}else for(var l=0;l<i.length;l++)i[l].show=!0;this._view.pageSize=20,this._view.sourceCollection=i,setTimeout(function(){e._view.pageSize=e._filter.maxValues,e._cmbFilter.text=e._filter.filterText||"",e._filterText=e._cmbFilter.text.toLowerCase()})},t.prototype.clearEditor=function(e){void 0===e&&(e=!0),this._cmbFilter.text="",this._filterText="",this._view.pageSize=0,this._view.refresh(),this._view.items.forEach(function(t){t.show=e}),this._view.pageSize=this._filter.maxValues},Object.defineProperty(t.prototype,"isEditorClear",{get:function(){return!this._filterText&&!this._cbSelectAll.indeterminate},enumerable:!0,configurable:!0}),t.prototype.updateFilter=function(){var e=null,t=this._getItems();if(this._filterText||this._cbSelectAll.indeterminate){e={};for(var i=0;i<t.length;i++){var n=t[i];n.show&&(e[n.text]=!0)}}var r=this._filter;r.showValues=e,r.filterText=""},t.prototype._getItems=function(){return this._filter.exclusiveValueSearch?this._view.items:this._view.sourceCollection},t.prototype._filterTextChanged=function(){var e=this;this._toText&&clearTimeout(this._toText),this._toText=setTimeout(function(){var t=e._cmbFilter.text.toLowerCase(),i=t!=e._filterText;e._filterText=t,e._view.refresh(),i&&(e._filter.exclusiveValueSearch?(e._cbSelectAll.checked=!0,e._cbSelectAllClicked()):e._updateSelectAllCheck())},300)},t.prototype._filterValues=function(e){return!this._filterText||!(!e||!e.text)&&e.text.toLowerCase().indexOf(this._filterText)>-1},t.prototype._cbSelectAllClicked=function(){for(var e=this._cbSelectAll.checked,t=this._divValues.scrollTop,i=this._getItems(),n=0;n<i.length;n++)i[n].show=e;this._view.refresh(),this._divValues.scrollTop=t},t.prototype._updateSelectAllCheck=function(){for(var e=0,t=this._getItems(),i=0;i<t.length;i++)t[i].show&&e++;var n=this._cbSelectAll;0==e?(n.checked=!1,n.indeterminate=!1):e==t.length?(n.checked=!0,n.indeterminate=!1):n.indeterminate=!0},t.controlTemplate='<div><div wj-part="div-filter"></div><div class="wj-listbox-item"><label><input wj-part="cb-select-all" type="checkbox"> <span wj-part="sp-select-all"></span></label></div><div wj-part="div-values"></div></div>',t}(Control);export{ValueFilterEditor};var ColumnFilter=function(){function e(e,t){this._owner=e,this._col=t,this._valueFilter=new ValueFilter(t),this._valueFilter.exclusiveValueSearch=e.exclusiveValueSearch,this._conditionFilter=new ConditionFilter(t)}return Object.defineProperty(e.prototype,"filterType",{get:function(){return null!=this._filterType?this._filterType:this._owner.defaultFilterType},set:function(e){if((e=asEnum(e,FilterType,!0))!=this._filterType){var t=this.isActive;this.clear(),this._filterType=e,t?this._owner.apply():this._col.grid&&this._col.grid.invalidate()}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dataMap",{get:function(){return this.conditionFilter.dataMap||this.valueFilter.dataMap},set:function(e){this.conditionFilter.dataMap=e,this.valueFilter.dataMap=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"valueFilter",{get:function(){return this._valueFilter},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"conditionFilter",{get:function(){return this._conditionFilter},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"column",{get:function(){return this._col},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isActive",{get:function(){return this._conditionFilter.isActive||this._valueFilter.isActive},enumerable:!0,configurable:!0}),e.prototype.apply=function(e){return this._conditionFilter.apply(e)&&this._valueFilter.apply(e)},e.prototype.clear=function(){this._valueFilter.clear(),this._conditionFilter.clear()},e.prototype.implementsInterface=function(e){return"IColumnFilter"==e},e}();export{ColumnFilter};export var FilterType;!function(e){e[e.None=0]="None",e[e.Condition=1]="Condition",e[e.Value=2]="Value",e[e.Both=3]="Both"}(FilterType||(FilterType={}));var FlexGridFilter=function(){function e(e,t){this._showIcons=!0,this._showSort=!0,this._defFilterType=FilterType.Both,this._xValueSearch=!0,this.filterApplied=new Event,this.filterChanging=new Event,this.filterChanged=new Event,this._filters=[],this._g=asType(e,FlexGrid,!1),this._g.formatItem.addHandler(this._formatItem.bind(this)),this._g.itemsSourceChanged.addHandler(this.clear.bind(this));var i=this._g.hostElement;e.addEventListener(i,"mousedown",this._mousedown.bind(this),!0),e.addEventListener(i,"click",this._click.bind(this),!0),e.addEventListener(i,"keydown",this._keydown.bind(this),!0),this._g.invalidate(),t&&copy(this,t)}return Object.defineProperty(e.prototype,"grid",{get:function(){return this._g},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"filterColumns",{get:function(){return this._filterColumns},set:function(e){this._filterColumns=asArray(e),this.clear()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"showFilterIcons",{get:function(){return this._showIcons},set:function(e){e!=this.showFilterIcons&&(this._showIcons=asBoolean(e),this._g&&this._g.invalidate())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"showSortButtons",{get:function(){return this._showSort},set:function(e){this._showSort=asBoolean(e)},enumerable:!0,configurable:!0}),e.prototype.getColumnFilter=function(e,t){void 0===t&&(t=!0),e=this._asColumn(e);for(var i=0;i<this._filters.length;i++)if(this._filters[i].column==e)return this._filters[i];if(t&&e.binding){var n=new ColumnFilter(this,e);return this._filters.push(n),n}return null},Object.defineProperty(e.prototype,"defaultFilterType",{get:function(){return this._defFilterType},set:function(e){(e=asEnum(e,FilterType,!1))!=this.defaultFilterType&&(this._defFilterType=e,this._g.invalidate(),this.clear())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"exclusiveValueSearch",{get:function(){return this._xValueSearch},set:function(e){this._xValueSearch=asBoolean(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"filterDefinition",{get:function(){var e=this,t={defaultFilterType:this.defaultFilterType,filters:[]};return this._filters.forEach(function(i){var n=i.conditionFilter,r=i.valueFilter,l=r.uniqueValues&&r.uniqueValues.length;if(i&&i.column&&i.column.binding&&(i.isActive||l||i.filterType!=e.defaultFilterType)){var a={binding:i.column.binding};if(n.isActive){var o=n.condition1,s=n.condition2;a={binding:i.column.binding,type:"condition",condition1:{operator:o.operator,value:o.value},and:n.and,condition2:{operator:s.operator,value:s.value}}}else(r.isActive||l)&&(a={binding:i.column.binding,type:"value",uniqueValues:r.uniqueValues,sortValues:r.sortValues,maxValues:r.maxValues,exclusiveValueSearch:r.exclusiveValueSearch,showValues:r.showValues});i.filterType!=e.defaultFilterType&&(a.filterType=i.filterType),t.filters.push(a)}}),JSON.stringify(t)},set:function(e){if(e=asString(e),this.clear(),e){var t=JSON.parse(e);this.defaultFilterType=t.defaultFilterType;for(var i=function(e){var i=t.filters[e],r=n._g.getColumn(i.binding),l=n.getColumnFilter(r,!0);if(l)switch(null!=i.filterType&&(l.filterType=asEnum(i.filterType,FilterType)),i.type){case"condition":var a=l.conditionFilter;a.condition1.value=r.dataType==DataType.Date?changeType(i.condition1.value,r.dataType,null):i.condition1.value,a.condition1.operator=i.condition1.operator,a.and=i.and,a.condition2.value=r.dataType==DataType.Date?changeType(i.condition2.value,r.dataType,null):i.condition2.value,a.condition2.operator=i.condition2.operator;break;case"value":var o=l.valueFilter;o.uniqueValues=i.uniqueValues,["sortValues","maxValues","exclusiveValueSearch"].forEach(function(e){null!=i[e]&&(o[e]=i[e])}),o.showValues=i.showValues}},n=this,r=0;r<t.filters.length;r++)i(r)}this.apply()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"activeEditor",{get:function(){return Control.getControl(this._divEdt)},enumerable:!0,configurable:!0}),e.prototype.editColumnFilter=function(e,t,i){var n=this;this.closeEditor(),e=this._asColumn(e);var r=this._g,l=new CellRangeEventArgs(r.cells,new CellRange(-1,e.index));if(this.onFilterChanging(l)){l.cancel=!0;var a=createElement('<div class="wj-dropdown-panel"></div>'),o=this.getColumnFilter(e),s=new ColumnFilterEditor(a,o,this.showSortButtons);this._divEdt=a,this._edtCol=e,r.rightToLeft&&(a.dir="rtl"),s.filterChanged.addHandler(function(){l.cancel=!1,setTimeout(function(){l.cancel||n.apply()})}),s.buttonClicked.addHandler(function(){n.closeEditor(),r.focus(),n.onFilterChanged(l)}),s.lostFocus.addHandler(function(){setTimeout(function(){var e=Control.getControl(n._divEdt);e&&!e.containsFocus()&&n.closeEditor()},10)});var u=t?t.col:e.index;t||r.columns[u].binding==e.binding||(u=r.selection.leftCol),r._edtHdl._commitRowEdits(),r.scrollIntoView(-1,u,!0);var c=r.columnHeaders,d=t&&t.panel==c?t.row:c.rows.length-1,p=u,h=c.getCellBoundingRect(d,p),f=i||c.getCellElement(d,p);f?showPopup(a,f,!1,!1,!1):showPopup(a,h),this._setAriaExpanded(f,!0),this._setAriaExpanded(r.cells.getCellElement(-1,p),!0);for(var _=s.hostElement.querySelectorAll("input"),v=0;v<_.length;v++){var b=_[v];if(b.offsetHeight>0&&b.tabIndex>-1&&!b.disabled){b.focus();break}}s.containsFocus()||s.focus()}else this._divEdt=this._edtCol=null},e.prototype._setAriaExpanded=function(t,i){if(t){var n=t.querySelector("."+e._WJC_FILTER);setAttribute(n,"aria-expanded",i)}},e.prototype.closeEditor=function(){var e=this._g,t=Control.getControl(this._divEdt),i=this._edtCol;if(t&&hidePopup(t.hostElement,function(){t.dispose()}),i){var n=e.columnHeaders,r=n.rows.length?n.getCellElement(n.rows.length-1,i.index):null;this._setAriaExpanded(r,!1),r=e.cells.getCellElement(-1,i.index),this._setAriaExpanded(r,!1)}this._divEdt=null,this._edtCol=null},e.prototype.apply=function(){var e=this._g.collectionView;if(e){var t=this._g.editableCollectionView;t&&(t.commitEdit(),t.commitNew()),e.filter=this._filter.bind(this)}var i=e?e.updateFilterDefinition:null;isFunction(i)&&i.call(e,this),this.onFilterApplied()},e.prototype.clear=function(){this._filters.length&&(this._filters=[],this.apply())},e.prototype.onFilterApplied=function(e){this.filterApplied.raise(this,e)},e.prototype.onFilterChanging=function(e){return this.filterChanging.raise(this,e),!e.cancel},e.prototype.onFilterChanged=function(e){this.filterChanged.raise(this,e)},e.prototype._asColumn=function(e){return isString(e)?this._g.getColumn(e):isNumber(e)?this._g.columns[e]:asType(e,Column,!1)},e.prototype._filter=function(e){for(var t=0;t<this._filters.length;t++)if(!this._filters[t].apply(e))return!1;return!0},e.prototype._formatItem=function(e,t){if(t.panel==e.columnHeaders){var i=this._g,n=i.getMergedRange(t.panel,t.row,t.col)||new CellRange(t.row,t.col),r=i.columns[n.col],l=i._getBindingColumn(t.panel,t.row,r),a=t.cell;if(n.row2==t.panel.rows.length-1||r!=l){var o=this.getColumnFilter(l,this.defaultFilterType!=FilterType.None);this._filterColumns&&this._filterColumns.indexOf(l.binding)<0&&(o=null),o?(toggleClass(a,"wj-filter-on",o.isActive),toggleClass(a,"wj-filter-off",!o.isActive)):(removeClass(a,"wj-filter-on"),removeClass(a,"wj-filter-off")),o&&o.filterType!=FilterType.None&&(this._showIcons&&this._addFilterButton(l,o,a),0==t.row&&(a=i.cells.getCellElement(-1,t.col))&&this._addFilterButton(r,o,a))}}},e.prototype._addFilterButton=function(t,i,n){var r=e._WJC_FILTER,l=createElement('<button class="wj-btn wj-btn-glyph wj-right '+r+'" type="button" tabindex="-1"><span class="wj-glyph-filter"></span></button>');setAriaLabel(l,culture.FlexGridFilter.ariaLabels.edit+" "+t.header),setAttribute(l,"aria-haspopup","dialog"),setAttribute(l,"aria-expanded",!1),setAttribute(l,"aria-describedby",t.describedById),setAttribute(l,"aria-pressed",i.isActive),n.querySelector("."+r)||(1==n.children.length&&(n=n.querySelector("div")||n),n.appendChild(l))},e.prototype._mousedown=function(e){this._toggleEditor(e)&&(this._tmd=!0,e.stopPropagation(),e.preventDefault())},e.prototype._click=function(e){(this._tmd||this._toggleEditor(e))&&(e.stopPropagation(),e.preventDefault()),this._tmd=!1},e.prototype._toggleEditor=function(t){var i=this;if(this._tmd=!1,!t.defaultPrevented&&0==t.button)if(closestClass(t.target,e._WJC_FILTER)){var n=this._g,r=n.hitTest(t.target);if(r.panel||(r=n.hitTest(t)),r.panel==n.columnHeaders||r.panel==n.cells&&-1==r.row){var l=n.columns[r.col],a=n._getBindingColumn(r.panel,r.row,l);return this._divEdt&&this._edtCol==a?(this.closeEditor(),n.focus()):setTimeout(function(){i.editColumnFilter(a,r)},this._divEdt?100:0),!0}}else this.closeEditor();return!1},e.prototype._keydown=function(e){if(!e.defaultPrevented&&!e.ctrlKey&&e.altKey&&(e.keyCode==Key.Down||e.keyCode==Key.Up)){var t=this.grid,i=t.selection,n=i.col>-1?t.columns[i.col]:null,r=n?t._getBindingColumn(t.cells,i.row,n):null;r&&!r.dataMap&&this.getColumnFilter(r,!0)&&(this.editColumnFilter(r),e.preventDefault(),e.stopPropagation())}},e._WJC_FILTER="wj-elem-filter",e}();export{FlexGridFilter};_addCultureInfo("FlexGridFilter",{ariaLabels:{edit:"Edit Filter for Column",dialog:"Filter Editor for Column",asc:"Sort Column in Ascending Order",dsc:"Sort Column in Descending Order",search:"Search Item List",op1:"First Condition Operator",val1:"First Condition Value",and:"Require both Conditions",or:"Require either Condition",op2:"Second Condition Operator",val2:"Second Condition Value"},ascending:"↑ Ascending",descending:"↓ Descending",apply:"Apply",cancel:"Cancel",clear:"Clear",conditions:"Filter by Condition",values:"Filter by Value",search:"Search",selectAll:"Select All",null:"(nothing)",header:"Show items where the value",and:"And",or:"Or",stringOperators:[{name:"(not set)",op:null},{name:"Equals",op:Operator.EQ},{name:"Does not equal",op:Operator.NE},{name:"Begins with",op:Operator.BW},{name:"Ends with",op:Operator.EW},{name:"Contains",op:Operator.CT},{name:"Does not contain",op:Operator.NC}],numberOperators:[{name:"(not set)",op:null},{name:"Equals",op:Operator.EQ},{name:"Does not equal",op:Operator.NE},{name:"Is Greater than",op:Operator.GT},{name:"Is Greater than or equal to",op:Operator.GE},{name:"Is Less than",op:Operator.LT},{name:"Is Less than or equal to",op:Operator.LE}],dateOperators:[{name:"(not set)",op:null},{name:"Equals",op:Operator.EQ},{name:"Is Before",op:Operator.LT},{name:"Is After",op:Operator.GT}],booleanOperators:[{name:"(not set)",op:null},{name:"Equals",op:Operator.EQ},{name:"Does not equal",op:Operator.NE}]});var ColumnFilterEditor=function(e){function t(t,i,n){void 0===n&&(n=!0);var r=e.call(this,t,null,!0)||this;r.filterChanged=new Event,r.buttonClicked=new Event,r._filter=asType(i,ColumnFilter);var l=r.getTemplate();r.applyTemplate("wj-control wj-content wj-columnfiltereditor",l,{_divSort:"div-sort",_btnAsc:"btn-asc",_btnDsc:"btn-dsc",_divType:"div-type",_aVal:"a-val",_aCnd:"a-cnd",_divEdtVal:"div-edt-val",_divEdtCnd:"div-edt-cnd",_btnApply:"btn-apply",_btnCancel:"btn-cancel",_btnClear:"btn-clear"});var a=culture.FlexGridFilter,o=a.ariaLabels,s=r.hostElement,u=r.filter.column,c=u.grid.collectionView;setAttribute(s,"role","dialog"),setAriaLabel(s,o.dialog+" "+u.header),setAriaLabel(r._btnAsc,o.asc),setAriaLabel(r._btnDsc,o.dsc),setText(r._btnAsc,a.ascending),setText(r._btnDsc,a.descending),setText(r._aVal,a.values),setText(r._aCnd,a.conditions),setText(r._btnApply,a.apply),setText(r._btnCancel,a.cancel),setText(r._btnClear,a.clear);var d=r.filter.conditionFilter.isActive||0==(i.filterType&FilterType.Value)?FilterType.Condition:FilterType.Value;r._showFilter(d),n&&c&&c.canSort||(r._divSort.style.display="none");var p=r._btnClicked.bind(r);return r._btnApply.addEventListener("click",p),r._btnCancel.addEventListener("click",p),r._btnClear.addEventListener("click",p),r._btnAsc.addEventListener("click",p),r._btnDsc.addEventListener("click",p),r._aVal.addEventListener("click",p),r._aCnd.addEventListener("click",p),r.addEventListener(s,"keydown",function(e){if(!e.defaultPrevented){var t=e.target.tagName.match(/^(a|button)$/i);switch(e.keyCode){case Key.Space:t&&(r._btnClicked(e),e.preventDefault());break;case Key.Enter:t?r._btnClicked(e):(r.updateFilter(),r.onFilterChanged(),r.onButtonClicked()),e.preventDefault();break;case Key.Escape:r.onButtonClicked(),e.preventDefault();break;case Key.Tab:moveFocus(r.hostElement,e.shiftKey?-1:1),e.preventDefault()}}}),r.addEventListener(window,"resize",function(){r.isTouching||r._wasTouching||r.onButtonClicked()}),r}return __extends(t,e),Object.defineProperty(t.prototype,"filter",{get:function(){return this._filter},enumerable:!0,configurable:!0}),t.prototype.updateEditor=function(){this._edtVal&&this._edtVal.updateEditor(),this._edtCnd&&this._edtCnd.updateEditor()},t.prototype.updateFilter=function(){switch(this._getFilterType()){case FilterType.Value:this._edtVal.updateFilter(),this.filter.conditionFilter.clear();break;case FilterType.Condition:this._edtCnd.updateFilter(),this.filter.valueFilter.clear()}},t.prototype.onFilterChanged=function(e){this.filterChanged.raise(this,e)},t.prototype.onButtonClicked=function(e){this.buttonClicked.raise(this,e)},t.prototype._showFilter=function(e){this._wasTouching=this.isTouching,e==FilterType.Value&&null==this._edtVal&&(this._edtVal=new ValueFilterEditor(this._divEdtVal,this.filter.valueFilter)),e==FilterType.Condition&&null==this._edtCnd&&(this._edtCnd=new ConditionFilterEditor(this._divEdtCnd,this.filter.conditionFilter)),0!=(e&this.filter.filterType)&&(e==FilterType.Value?(this._divEdtVal.style.display="",this._divEdtCnd.style.display="none",this._enableLink(this._aVal,!1),this._enableLink(this._aCnd,!0),this._edtVal.focus()):(this._divEdtVal.style.display="none",this._divEdtCnd.style.display="",this._enableLink(this._aVal,!0),this._enableLink(this._aCnd,!1),this._edtCnd.focus()));var t=this._divType.style;switch(this.filter.filterType){case FilterType.None:case FilterType.Condition:case FilterType.Value:t.display="none";break;default:t.display=""}},t.prototype._enableLink=function(e,t){toggleClass(e,"wj-state-disabled",!t),setAttribute(e,"href",t?"":null),setAttribute(e,"disabled",t?null:"disabled")},t.prototype._getFilterType=function(){var e=FilterType;return"none"!=this._divEdtVal.style.display?e.Value:e.Condition},t.prototype._btnClicked=function(e){var t=e.target;if(e.preventDefault(),e.stopPropagation(),!hasClass(t,"wj-state-disabled")){if(t==this._aVal)return this._showFilter(FilterType.Value),void moveFocus(this._edtVal.hostElement,0);if(t==this._aCnd)return this._showFilter(FilterType.Condition),void moveFocus(this._edtCnd.hostElement,0);if(t==this._btnAsc||t==this._btnDsc){var i=this.filter.column,n=i.sortMemberPath?i.sortMemberPath:i.binding,r=i.grid.collectionView,l=new SortDescription(n,e.target==this._btnAsc);r.sortDescriptions.deferUpdate(function(){r.sortDescriptions.clear(),r.sortDescriptions.push(l)})}t==this._btnApply?(this.updateFilter(),this.onFilterChanged()):t==this._btnClear?this.filter.isActive&&(this.filter.clear(),this.onFilterChanged()):this.updateEditor(),this.onButtonClicked()}},t.controlTemplate='<div><div wj-part="div-sort"><button wj-part="btn-asc" class="wj-btn" style="min-width:95px"></button>&nbsp;&nbsp;&nbsp;<button wj-part="btn-dsc" class="wj-btn" style="min-width:95px"></button></div><div wj-part="div-type" class="wj-filtertype"><a wj-part="a-cnd" href="" draggable="false"></a>&nbsp;|&nbsp;<a wj-part="a-val" href="" draggable="false"></a></div><div wj-part="div-edt-val" tabindex="-1"></div><div wj-part="div-edt-cnd" tabindex="-1"></div><div style="text-align:right;margin-top:10px"><button wj-part="btn-apply" class="wj-btn"></button>&nbsp;&nbsp;<button wj-part="btn-cancel" class="wj-btn"></button>&nbsp;&nbsp;<button wj-part="btn-clear" class="wj-btn"></button></div>',t}(Control);export{ColumnFilterEditor};_registerModule("wijmo.grid.filter",selfModule);