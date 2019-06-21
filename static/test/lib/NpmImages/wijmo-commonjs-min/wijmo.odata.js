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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function i(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_1=require("wijmo/wijmo"),selfModule=require("wijmo/wijmo.odata");function softGrid(){return wijmo_1._getModule("wijmo.grid")}function softFilter(){return wijmo_1._getModule("wijmo.grid.filter")}exports.softGrid=softGrid,exports.softFilter=softFilter;var ODataCollectionView=function(t){function e(e,r,i){var o=t.call(this)||this;return o._count=0,o._sortOnServer=!0,o._pageOnServer=!0,o._filterOnServer=!0,o._showDatesAsGmt=!1,o._inferDataTypes=!0,o._reviverBnd=o._reviver.bind(o),o.loading=new wijmo_1.Event,o.loaded=new wijmo_1.Event,o.error=new wijmo_1.Event,o._url=wijmo_1.asString(e,!1),o._tbl=wijmo_1.asString(r),i&&wijmo_1.copy(o,i),o.sortDescriptions.collectionChanged.addHandler(function(){o.sortOnServer&&o._getData()}),o._getData(),o}return __extends(e,t),Object.defineProperty(e.prototype,"tableName",{get:function(){return this._tbl},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"fields",{get:function(){return this._fields},set:function(t){this._fields!=t&&(this._fields=wijmo_1.asArray(t),this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"requestHeaders",{get:function(){return this._requestHeaders},set:function(t){this._requestHeaders=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"keys",{get:function(){return this._keys},set:function(t){this._keys=wijmo_1.asArray(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"expand",{get:function(){return this._expand},set:function(t){this._expand=wijmo_1.asString(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"jsonReviver",{get:function(){return this._jsonReviver},set:function(t){this._jsonReviver=wijmo_1.asFunction(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"dataTypes",{get:function(){return this._dataTypes},set:function(t){this._dataTypes=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"inferDataTypes",{get:function(){return this._inferDataTypes},set:function(t){t!=this.inferDataTypes&&(this._inferDataTypes=wijmo_1.asBoolean(t),this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"showDatesAsGmt",{get:function(){return this._showDatesAsGmt},set:function(t){t!=this.showDatesAsGmt&&(this._showDatesAsGmt=wijmo_1.asBoolean(t),this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"sortOnServer",{get:function(){return this._sortOnServer},set:function(t){t!=this._sortOnServer&&(this._sortOnServer=wijmo_1.asBoolean(t),this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageOnServer",{get:function(){return this._pageOnServer},set:function(t){t!=this._pageOnServer&&(this._pageOnServer=wijmo_1.asBoolean(t),this.pageSize&&this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"filterOnServer",{get:function(){return this._filterOnServer},set:function(t){t!=this._filterOnServer&&(this._filterOnServer=wijmo_1.asBoolean(t),this._getData())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"filterDefinition",{get:function(){return this._filterDef},set:function(t){t!=this._filterDef&&(this._filterDef=wijmo_1.asString(t),this._getData())},enumerable:!0,configurable:!0}),e.prototype.updateFilterDefinition=function(t){this.filterOnServer&&softGrid()&&softFilter()&&t instanceof softFilter().FlexGridFilter&&(this.filterDefinition=this._asODataFilter(t))},Object.defineProperty(e.prototype,"oDataVersion",{get:function(){return this._odv},set:function(t){this._odv=wijmo_1.asNumber(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isLoading",{get:function(){return this._loading},enumerable:!0,configurable:!0}),e.prototype.onLoading=function(t){this.loading.raise(this,t)},e.prototype.onLoaded=function(t){this.loaded.raise(this,t)},e.prototype.load=function(){this._getData()},e.prototype.onError=function(t){return this.error.raise(this,t),!t.cancel},e.prototype.commitNew=function(){var e=this,r={Accept:"application/json"};if(this.requestHeaders)for(var i in this.requestHeaders)r[i]=this.requestHeaders[i];var o=this.currentAddItem;if(o){var n=this._getWriteUrl();wijmo_1.httpRequest(n,{method:"POST",requestHeaders:r,data:this._convertToDbFormat(o),success:function(t){var r=JSON.parse(t.responseText,e._reviverBnd);e.keys.forEach(function(t){o[t]=r[t]}),e.refresh()},error:this._error.bind(this)})}t.prototype.commitNew.call(this)},e.prototype.commitEdit=function(){var e=this.currentEditItem;if(e&&!this.currentAddItem&&this._getChangedFields(e,this._edtClone)){var r=this._getWriteUrl(this._edtClone);wijmo_1.httpRequest(r,{method:"PUT",requestHeaders:this.requestHeaders,data:this._convertToDbFormat(e),error:this._error.bind(this)})}t.prototype.commitEdit.call(this)},e.prototype.remove=function(e){if(e&&e!=this.currentAddItem&&this.items.indexOf(e)>-1){var r=this._getWriteUrl(e);wijmo_1.httpRequest(r,{method:"DELETE",requestHeaders:this.requestHeaders,error:this._error.bind(this)})}t.prototype.remove.call(this,e)},Object.defineProperty(e.prototype,"totalItemCount",{get:function(){return this._count},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageCount",{get:function(){return this.pageSize?Math.ceil(this.totalItemCount/this.pageSize):1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pageSize",{get:function(){return this._pgSz},set:function(t){t!=this._pgSz&&(this._pgSz=wijmo_1.asInt(t),this.pageOnServer?(this._pgIdx=wijmo_1.clamp(this._pgIdx,0,this.pageCount-1),this._getData()):this.refresh())},enumerable:!0,configurable:!0}),e.prototype.onPageChanging=function(e){return t.prototype.onPageChanging.call(this,e),!e.cancel&&this.pageOnServer&&this._getData(),!e.cancel},e.prototype._getPageView=function(){return this.pageOnServer?this._view:t.prototype._getPageView.call(this)},e.prototype._performRefresh=function(){var e=this._canFilter,r=this._canSort;this._canFilter=!this._filterOnServer,this._canSort=!this._sortOnServer,t.prototype._performRefresh.call(this),this._canFilter=e,this._canSort=r},e.prototype._storeItems=function(t,e){e?Array.prototype.push.apply(this.sourceCollection,t):this.sourceCollection=t},e.prototype._getReadUrl=function(t){var e=this._url;return"/"!=e[e.length-1]&&(e+="/"),t?e=0==t.indexOf("http")?t:e+t:this._tbl&&(e+=this._tbl),e},e.prototype._getReadParams=function(t){var e={$format:"json"};if(this._tbl&&!t){if(this._odv<4?e.$inlinecount="allpages":e.$count=!0,this.fields&&(e.$select=this.fields.join(",")),this.expand&&(e.$expand=this.expand),this.sortOnServer&&this.sortDescriptions.length){for(var r="",i=0;i<this.sortDescriptions.length;i++){var o=this.sortDescriptions[i];r&&(r+=","),r+=o.property,o.ascending||(r+=" desc")}e.$orderby=r}this.pageOnServer&&this.pageSize>0&&(e.$skip=this.pageIndex*this.pageSize,e.$top=this.pageSize),this.filterDefinition&&(e.$filter=this.filterDefinition)}return e},e.prototype._getData=function(t,e){var r=this;this._toGetData&&clearTimeout(this._toGetData),this._toGetData=setTimeout(function(){if(null!=r._odv){r._loading=!0,r.onLoading();var i=wijmo_1.httpRequest(r._getReadUrl(t),{requestHeaders:r.requestHeaders,data:r._getReadParams(t),success:function(e){var i=JSON.parse(e.responseText,r._reviverBnd),o=i.d?i.d.results:i.value,n=i.d?i.d.__count:i["odata.count"]||i["@odata.count"];if(null!=n&&(r._count=parseInt(n)),r.pageIndex>0&&r.pageIndex>=r.pageCount){var a=r.pageIndex;if(r.moveToLastPage(),r.pageIndex!=a)return}t||r.inferDataTypes&&!r._dataTypesInferred&&(r._dataTypesInferred=r._getInferredDataTypes(o));var s=r.dataTypes?r.dataTypes:r._dataTypesInferred;if(s)for(var u=0;u<o.length;u++)r._convertItem(s,o[u]);r._storeItems(o,null!=t),r.refresh(),(t=i.d?i.d.__next:i["odata.nextLink"]||i["@odata.nextLink"])?r._getData(t):(r._loading=!1,r.onLoaded())},error:function(t){if(r._loading=!1,r.onLoaded(),r.onError(new wijmo_1.RequestErrorEventArgs(t)))throw"HttpRequest Error: "+t.status+" "+t.statusText}});wijmo_1.isFunction(e)&&e(i)}else r._getSchema()},100)},e.prototype._convertToDbFormat=function(t){var e={};for(var r in t){var i=t[r];wijmo_1.isDate(i)&&this._showDatesAsGmt?i=new Date(i.getTime()-6e4*i.getTimezoneOffset()):wijmo_1.isNumber(i)&&this._odv<4&&(i=i.toString()),e[r]=i}return e},e.prototype._reviver=function(t,r){return"string"==typeof r&&e._rxDate.test(r)&&(r=0==r.indexOf("/Date(")?new Date(parseInt(r.substr(6))):new Date(r),wijmo_1.isDate(r)&&this._showDatesAsGmt&&(r=new Date(r.getTime()+6e4*r.getTimezoneOffset()))),this._jsonReviver?this._jsonReviver(t,r):r},e.prototype._convertItem=function(t,e){for(var r in t){var i=t[r],o=e[r];null!=o&&(o=i==wijmo_1.DataType.Date&&wijmo_1.isString(o)&&0==o.indexOf("/Date(")?new Date(parseInt(o.substr(6))):wijmo_1.changeType(o,i,null),wijmo_1.isDate(o)&&this._showDatesAsGmt&&(o=new Date(o.getTime()+6e4*o.getTimezoneOffset())),e[r]=o)}},e.prototype._getInferredDataTypes=function(t){var r=null;if(t.length>0){for(var i={},o=0;o<t.length&&o<10;o++)this._extend(i,t[o]);for(var n in i){var a=i[n];wijmo_1.isString(a)&&e._rxDate.test(a)&&(r||(r={}),r[n]=wijmo_1.DataType.Date)}}return r},e.prototype._getServiceUrl=function(){var t=this._url;return"/"!=t[t.length-1]&&(t+="/"),t},e.prototype._getSchema=function(){var t=this,r=this._getServiceUrl()+"$metadata",i=e._odvCache;this._odv=i[r],this._odv?this._getData():wijmo_1.httpRequest(r,{requestHeaders:this.requestHeaders,success:function(e){var o=e.responseText.match(/<.*Version\s*=\s*"([0-9.]+)"/),n=o?parseFloat(o[1]):4;i[r]=t._odv=n},error:function(e){i[r]=t._odv=4},complete:function(e){t._getData()}})},e.prototype._getWriteUrl=function(t){var e=this._getServiceUrl();if(e+=this._tbl,t){wijmo_1.assert(this.keys&&this.keys.length>0,"write operations require keys.");var r=[];this.keys.forEach(function(e){wijmo_1.assert(null!=t[e],"key values cannot be null."),r.push(e+"="+t[e])}),e+="("+r.join(",")+")"}return e},e.prototype._asODataFilter=function(t){for(var e="",r=0;r<t.grid.columns.length;r++){var i=t.grid.columns[r],o=t.getColumnFilter(i,!1);o&&o.isActive&&(e&&(e+=" and "),o.conditionFilter&&o.conditionFilter.isActive?e+=this._asODataConditionFilter(o.conditionFilter):o.valueFilter&&o.valueFilter.isActive&&(e+=this._asODataValueFilter(o.valueFilter)))}return e},e.prototype._asODataValueFilter=function(t){var e=t.column,r=e.binding,i=e.dataMap,o=(t._getUniqueValues(e,!1),"");for(var n in t.showValues){var a=wijmo_1.changeType(n,e.dataType,e.format);i&&wijmo_1.isString(a)&&(a=i.getKeyValue(a)),o&&(o+=" or "),o+=this._asEquals(r,a,e.dataType)}return o.length&&(o="("+o+")"),o},e.prototype._asEquals=function(t,e,r){return r==wijmo_1.DataType.Date?"("+t+" ge "+this._asODataValue(e,r)+" and "+t+" lt "+this._asODataValue(wijmo_1.DateTime.addDays(e,1),r)+")":"("+t+" eq "+this._asODataValue(e,r)+")"},e.prototype._asODataConditionFilter=function(t){var e=this._asODataCondition(t,t.condition1),r=this._asODataCondition(t,t.condition2);return e&&r?"("+e+(t.and?" and ":" or ")+r+")":e?"("+e+")":r?"("+r+")":null},e.prototype._asODataCondition=function(t,e){var r=t.column.binding,i=this._asODataValue(e.value,t.column.dataType);switch(e.operator){case 0:return this._asEquals(r,e.value,t.column.dataType);case 1:return r+" ne "+i;case 2:return r+" gt "+i;case 3:return r+" ge "+i;case 4:return r+" lt "+i;case 5:return r+" le "+i;case 6:return"startswith("+r+","+i+")";case 7:return"endswith("+r+","+i+")";case 8:return this._odv>=4?"contains("+r+","+i+")":"substringof("+i.toLowerCase()+", tolower("+r+"))";case 9:return this._odv>=4?"not contains("+r+","+i+")":"not substringof("+i.toLowerCase()+", tolower("+r+"))"}},e.prototype._asODataValue=function(t,e){return wijmo_1.isDate(t)?(this._showDatesAsGmt&&(t=new Date(t.getTime()-6e4*t.getTimezoneOffset())),t=t.toJSON(),this._odv<4&&(t="datetime'"+t.substr(0,10)+"'"),t):wijmo_1.isString(t)?"'"+t.replace(/'/g,"''")+"'":null!=t?t.toString():e==wijmo_1.DataType.String?"''":null},e.prototype._error=function(t){if(this.onError(new wijmo_1.RequestErrorEventArgs(t)))throw this._getData(),"HttpRequest Error: "+t.status+" "+t.statusText},e._odvCache={},e._rxDate=/^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}|\/Date\([\d\-]*?\)/,e}(wijmo_1.CollectionView);exports.ODataCollectionView=ODataCollectionView;var ODataVirtualCollectionView=function(t){function e(e,r,i){var o=this;return null==i&&(i={}),i.pageOnServer=!0,i.sortOnServer=!0,i.canGroup=!1,i.pageSize||(i.pageSize=100),(o=t.call(this,e,r,i)||this)._data=[],o.sourceCollection=o._data,o._skip=0,o.setWindow(0,o.pageSize),o}return __extends(e,t),e.prototype.setWindow=function(t,e){var r=this;this._toSetWindow&&clearTimeout(this._toSetWindow),this._toSetWindow=setTimeout(function(){r._toSetWindow=null,r._performSetWindow(t,e)},50)},Object.defineProperty(e.prototype,"pageOnServer",{get:function(){return!0},set:function(t){if(!t)throw"ODataVirtualCollectionView requires pageOnServer = true."},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"sortOnServer",{get:function(){return!0},set:function(t){if(!wijmo_1.asBoolean(t))throw"ODataVirtualCollectionView requires sortOnServer = true."},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"filterOnServer",{get:function(){return!0},set:function(t){if(!wijmo_1.asBoolean(t))throw"ODataVirtualCollectionView requires filterOnServer = true."},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"canGroup",{get:function(){return this._canGroup},set:function(t){if(wijmo_1.asBoolean(t))throw"ODataVirtualCollectionView does not support grouping."},enumerable:!0,configurable:!0}),e.prototype._performRefresh=function(){this.isLoading||(this._refresh=!0),t.prototype._performRefresh.call(this)},e.prototype._getReadParams=function(e){var r=t.prototype._getReadParams.call(this,e);return e||(r.$skip=this._skip||0,r.$top=this.pageSize),r},e.prototype._storeItems=function(t,e){if(this._refresh||this._data.length!=this.totalItemCount){this._data.length=this.totalItemCount;for(var r=0;r<this._data.length;r++)this._data[r]=null;this._refresh=!1}e||(this.currentPosition<0&&this.moveCurrentToFirst(),this._loadOffset=0);var i=this._loadOffset+(this._skip||0);for(r=0;r<t.length;r++)this._data[r+i]=t[r];this._loadOffset+=t.length},e.prototype._performSetWindow=function(t,e){var r=this;this._pendingRequest&&(this._pendingRequest.abort(),this._pendingRequest=null),t=wijmo_1.asInt(t),e=wijmo_1.asInt(e),wijmo_1.assert(e>=t,"Start must be smaller than end.");var i=wijmo_1.isNumber(this._start)&&t>this._start;this._start=t,this._end=e;for(var o=!1,n=t;n<e&&n<this._data.length&&!o;n++)o=null==this._data[n];if(o){var a=Math.max(0,i?t:e-this.pageSize);for(n=a;n<this._data.length&&null!=this._data[n];n++)a++;this._skip=a,this._getData(null,function(t){r._pendingRequest=t})}},e}(ODataCollectionView);exports.ODataVirtualCollectionView=ODataVirtualCollectionView,wijmo_1._registerModule("wijmo.odata",selfModule);