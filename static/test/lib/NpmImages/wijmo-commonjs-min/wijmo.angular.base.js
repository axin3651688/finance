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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_1=require("wijmo/wijmo"),wijmo_meta_1=require("wijmo/wijmo.meta"),mNg=require("angular"),MetaFactory=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.CreateProp=function(t,e,i,r,o,n){return new PropDesc(t,e,i,r,o,n)},e.CreateEvent=function(t,e){return new EventDesc(t,e)},e.CreateComplexProp=function(t,e,i){return new ComplexPropDesc(t,e,i)},e.findProp=function(t,e){return wijmo_meta_1.ControlMetaFactory.findProp(t,e)},e.findEvent=function(t,e){return wijmo_meta_1.ControlMetaFactory.findEvent(t,e)},e.findComplexProp=function(t,e){return wijmo_meta_1.ControlMetaFactory.findComplexProp(t,e)},e}(wijmo_meta_1.ControlMetaFactory);exports.MetaFactory=MetaFactory;var PropDesc=function(t){function e(e,i,r,o,n,s){var p=t.call(this,e,i,r,o,n,s)||this;return p._scopeBindingMode=p.propertyType===wijmo_meta_1.PropertyType.EventHandler?"&":p.bindingMode==wijmo_meta_1.BindingMode.OneWay&&wijmo_meta_1.isSimpleType(p.propertyType)?"@":"=",p}return __extends(e,t),Object.defineProperty(e.prototype,"scopeBindingMode",{get:function(){return this._scopeBindingMode},set:function(t){this._scopeBindingMode=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"customHandler",{get:function(){return this._customHandler},set:function(t){this._customHandler=t},enumerable:!0,configurable:!0}),e}(wijmo_meta_1.PropDescBase);exports.PropDesc=PropDesc;var EventDesc=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e}(wijmo_meta_1.EventDescBase);exports.EventDesc=EventDesc;var ComplexPropDesc=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e}(wijmo_meta_1.ComplexPropDescBase);exports.ComplexPropDesc=ComplexPropDesc;var wjNg=mNg,_ngModules=[];function _registerNgModule(t){var e=wjNg.module(t,[]);return _ngModules.push(t),e}function getNgModules(){return _ngModules.slice()}exports._registerNgModule=_registerNgModule,exports.getNgModules=getNgModules;var WjDirective=function(){function t(){this.replace=!0,this.restrict="E",this.template="<div />",this.transclude=!1,this._props=[],this._events=[],this._complexProps=[];var e=this;this._dirId=++t._dirIdCounter+"",this.link=this._postLinkFn(),this.controller=["$scope","$parse","$element",function(i,r,o){e._$parse=r,o[0][t._elemScopeProp]=i,this[t._cntrlScopeProp]=i,i[t._scopeChildrenProp]=[],e._controllerImpl(this,i,o)}],this._initDirective()}return t._versionOk=function(t){var e=wjNg.version,i=[e.major,e.minor,e.dot],r=t.split(".");if(r.length!==i.length)throw"Unrecognizable version number.";for(var o=0;o<r.length;o++){if(i[o]<r[o])return!1;if(i[o]>r[o])return!0}return!0},Object.defineProperty(t.prototype,"_controlConstructor",{get:function(){throw"Abstract method call"},enumerable:!0,configurable:!0}),t.prototype._getMetaDataId=function(){return this._controlConstructor},t.prototype._getMetaData=function(){return MetaFactory.getMetaData(this._getMetaDataId())},t.prototype._initDirective=function(){this._initSharedMeta(),this._prepareProps(),this._initEvents(),this._initScopeEvents(),this._initScopeDescription()},t.prototype._initSharedMeta=function(){var t=this._getMetaData();this._props=t.props,this._events=t.events,this._complexProps=t.complexProps,this._property=t.parentProperty,this._isPropertyArray=t.isParentPropertyArray,this._ownObject=t.ownsObject,this._parentReferenceProperty=t.parentReferenceProperty,this._ngModelProperty=t.ngModelProperty},t.prototype._initProps=function(){},t.prototype._initEvents=function(){},t.prototype._createLink=function(){return new WjLink},t.prototype._controllerImpl=function(t,e,i){},t.prototype._initControl=function(t){try{return new(0,this._controlConstructor)(t)}catch(t){return}},t.prototype._isChild=function(){return this._isParentInitializer()||this._isParentReferencer()},t.prototype._isParentInitializer=function(){return void 0!=this._property},t.prototype._isParentReferencer=function(){return void 0!=this._parentReferenceProperty},t.prototype._scopeToAttrName=function(t){var e=this.scope[t];if(e){var i=1,r=e.length;return r<2?t:("?"===e.charAt(1)&&(i=2),r===i?t:e.substr(i))}return t},t.prototype._getComplexPropDesc=function(t){return MetaFactory.findComplexProp(t,this._complexProps)},t.prototype._initScopeEvents=function(){for(var t in this._events){var e=this._events[t];this._props.push(new PropDesc(e.eventName,wijmo_meta_1.PropertyType.EventHandler))}},t.prototype._initScopeDescription=function(){var e=this._props,i={},r=t._optionalAttr?"=?":"=";if(null!=e)for(var o,n=0;n<e.length;n++)i[(o=e[n]).propertyName]=o.scopeBindingMode,t._optionalAttr&&"="==o.scopeBindingMode&&(i[o.propertyName]="=?");i.control=r,i[t._initPropAttr]=r,i[t._initEventAttr]="&",i[t._parPropAttr]="@",i[t._wjModelPropAttr]="@",this.scope=i},t.prototype._postLinkFn=function(){var e=this;return function(i,r,o,n){var s=e._createLink();if(s.directive=e,s.scope=i,s.tElement=r,s.tAttrs=o,wijmo_1.isArray(n)){var p=r.parent()[0][t._elemScopeProp];for(var a in n){var c=n[a];if(void 0!=c&&(c[t._cntrlScopeProp]===i&&(c=r.parent().controller(e._stripRequire(+a))),c&&c[t._cntrlScopeProp]===p)){s.controller=c;break}}}else s.controller=n;s.ngModel=r.controller("ngModel"),s._link()}},t.prototype._prepareProps=function(){this._initProps();var t=[].concat(this._props);this._props.sort(function(e,i){var r=e.priority-i.priority;return r||(r=t.indexOf(e)-t.indexOf(i)),r})},t.prototype._stripRequire=function(t){if(this._stripReq||(this._stripReq=[],this._stripReq.length=this.require.length),!this._stripReq[t]){var e=/^[^A-Za-z]*(.*)/.exec(this.require[t]);this._stripReq[t]=e?e[1]:""}return this._stripReq[t]},t.prototype._getId=function(){return this._dirId},t._removeTransclude=function(t){if(!t)return t;var e=document.createElement("div");e.innerHTML=t;var i=e.querySelectorAll("[ng-transclude]");return[].forEach.call(i,function(t,e){t.removeAttribute("ng-transclude")}),e.innerHTML},t._parPropAttr="wjProperty",t._wjModelPropAttr="wjModelProperty",t._initPropAttr="isInitialized",t._initEventAttr="initialized",t._cntrlScopeProp="_cntrlScope",t._elemScopeProp="_elemCntrl",t._cntrlLinkProp="$_thisLink",t._scopeChildrenProp="$_childLinks",t._dirIdAttr="wj-directive-id",t._optionalAttr=t._versionOk("1.1.4"),t._dynaTemplates=t._optionalAttr,t._angStripPrefixes=["data","x"],t._dirIdCounter=0,t}();exports.WjDirective=WjDirective;var WjLink=function(){function t(){this._nonAssignable={},this._definedProps={},this._definedEvents={},this._oldValues={},this._isInitialized=!1,this._hasTriggeredInitialized=!1,this._isNgModelInitialized=!1,this._scopeSuspend=0,this._suspendedEvents=[],this._areChlildrenReady=!1,this._isDestroyed=!1,this._isAppliedToParent=!1}return t.prototype._link=function(){var t=this.directive,e=this;if(this.tElement[0].setAttribute(WjDirective._dirIdAttr,t._getId()),this.directiveTemplateElement=t.replace?this.tElement:wjNg.element(this.tElement.children()[0]),this._initNonAssignable(),this._isChild()){this._parentPropDesc=new ComplexPropDesc(t._property,t._isPropertyArray,t._ownObject),this.controller[WjDirective._cntrlScopeProp][WjDirective._scopeChildrenProp].push(this);var i=this.controller[WjDirective._cntrlScopeProp][WjDirective._cntrlLinkProp];i&&i._areChlildrenReady&&this._parentReady(i)}else this._createInstance(),this._notifyReady(),this._prepareControl();this._destroyEhUnreg=this.scope.$on("$destroy",function(t){for(var i=[],r=1;r<arguments.length;r++)i[r-1]=arguments[r];e._destroy()})},t.prototype._onChildrenReady=function(){},t.prototype._createInstance=function(){this.control=this._initControl(),this._safeApply(this.scope,"control",this.control)},t.prototype._parentReady=function(t){if(this._isChild()){var e=this;if(!this._isAttrDefined(WjDirective._parPropAttr)||this.scope[WjDirective._parPropAttr]){var i=this._getParentProp(),r=t.directive._getComplexPropDesc(i);r?this._parentPropDesc=r:this._parentPropDesc.propertyName=i,this.parent=t,this._useParentObj()?(this.control=t.control[i],this._safeApply(this.scope,"control",this.control)):this._createInstance(),this._notifyReady(),this._prepareControl(),this._initParent(),this.directiveTemplateElement[0].style.display="none",this._appliedToParent()}else this.scope.$watch(WjDirective._parPropAttr,function(){e._parentReady(t)})}},t.prototype._initParent=function(){if(!this._useParentObj()){this.directive;var t=this._getParentProp(),e=this.parent.control,i=this.control;if(this._isParentInitializer())if(this._isParentArray()){var r=e[t],o=this._getIndex();(o<0||o>=r.length)&&(o=r.length),r.splice(o,0,i);this._siblingInsertedEH=this._siblingInserted.bind(this),this.tElement[0].addEventListener("DOMNodeInserted",this._siblingInsertedEH)}else e[t]=i;this._isParentReferencer()&&!this._parentInCtor()&&(i[this._getParentReferenceProperty()]=e)}},t.prototype._destroy=function(){if(!this._isDestroyed){this._isDestroyed=!0;var t=this.control;if(this._destroyEhUnreg&&(this._destroyEhUnreg=null),this._siblingInsertedEH&&this.tElement[0].removeEventListener("DOMNodeInserted",this._siblingInsertedEH),this._isParentArray()&&!this.parent._isDestroyed){var e=this.parent.control,i=this._getParentProp();if(e&&i&&t){var r=e[i];if(r){var o=r.indexOf(t);o>=0&&r.splice(o,1)}}}this.tElement[0][WjDirective._elemScopeProp]=null,t instanceof wijmo_1.Control&&setTimeout(function(){t.hostElement&&t.dispose()},0)}},t.prototype._siblingInserted=function(t){if(t.target===this.tElement[0]){var e=this._getIndex(),i=this.parent.control[this._getParentProp()],r=this.control,o=i.indexOf(r);e>=0&&o>=0&&e!==o&&(i.splice(o,1),e=Math.min(e,i.length),i.splice(e,0,r))}},t.prototype._notifyReady=function(){this.scope[WjDirective._cntrlLinkProp]=this;for(var t=[].concat(this.scope[WjDirective._scopeChildrenProp]),e=0;e<t.length;e++)t[e]._parentReady(this);this._areChlildrenReady=!0,this._onChildrenReady()},t.prototype._initControl=function(){return this.directive._initControl(this._parentInCtor()?this.parent.control:this.directiveTemplateElement[0])},t.prototype._prepareControl=function(){this._addEventHandlers(),this._addWatchers()},t.prototype._setupScopeWithControlProperties=function(){for(var t,e,i,r,o=this.control,n=this.scope,s=this.directive._props,p=0;p<s.length;p++)if("="===(t=s[p]).scopeBindingMode&&t.isNativeControlProperty&&t.shouldUpdateSource){i=n[e=t.propertyName],r=o[e];var a=t.propertyType==wijmo_meta_1.PropertyType.Function,c=t.propertyType==wijmo_meta_1.PropertyType.EventHandler;!this._canApply(n,t.propertyName)||r==i||a||c||(n[t.propertyName]=r)}n.$root.$$phase||n.$apply()},t.prototype._initNonAssignable=function(){var t,e=this.directive._$parse,i=this.directive.scope;for(var r in i)"="===i[r].charAt(0)&&(void 0!==(t=this.tAttrs[this.directive._scopeToAttrName(r)])&&void 0!=e(t).assign||(this._nonAssignable[r]=!0))},t.prototype._suspendScope=function(){this._scopeSuspend++},t.prototype._resumeScope=function(){this._scopeSuspend>0&&0==--this._scopeSuspend&&this._suspendedEvents.length>0&&this._updateScope()},t.prototype._isScopeSuspended=function(){return this._scopeSuspend>0},t.prototype._isAttrDefined=function(t){return null!=this.tAttrs.$attr[this.directive._scopeToAttrName(t)]},t.prototype._childInitialized=function(t){var e=this.scope[WjDirective._scopeChildrenProp],i=e.indexOf(t);i>=0&&(e.splice(i,1),this._checkRaiseInitialized())},t.prototype._thisInitialized=function(){this._checkRaiseInitialized()},t.prototype._initialized=function(){},t.prototype._appliedToParent=function(){this._isAppliedToParent=!0,this._checkRaiseInitialized()},t.prototype._checkRaiseInitialized=function(){if(!this._hasTriggeredInitialized&&0===this.scope[WjDirective._scopeChildrenProp].length&&this._isInitialized&&(!this._isChild()||this._isAppliedToParent)){this._hasTriggeredInitialized=!0,this._initialized(),this._safeApply(this.scope,WjDirective._initPropAttr,!0);var t=this.scope[WjDirective._initEventAttr],e=this;t&&setTimeout(function(){t({s:e.control,e:void 0})},0),this._isChild()&&this.parent&&this.parent._childInitialized(this)}},t.prototype._addWatchers=function(){var t=this,e=this.directive._props,i=this.scope;if(e){if(this.ngModel){var r=this.ngModel;r.$pristine&&wijmo_1.addClass(this.tElement[0],"ng-pristine"),r.$valid&&wijmo_1.addClass(this.tElement[0],"ng-valid"),r.$untouched&&wijmo_1.addClass(this.tElement[0],"ng-untouched"),r.$render=this._ngModelRender.bind(this),this._updateNgModelPropDesc(),this._isAttrDefined(WjDirective._wjModelPropAttr)&&i.$watch(WjDirective._wjModelPropAttr,function(){t._updateNgModelPropDesc(),t._ngModelRender()})}var o,n,s;for(o=0;o<e.length;o++)n=(s=e[o]).propertyName,s.propertyType!==wijmo_meta_1.PropertyType.EventHandler&&this._isAttrDefined(n)&&(this._definedProps[n]=s);var p=this.control;i.$watch(function(e){if(!t._isDestroyed)try{var i={};for(var r in t._definedProps)e[r]!==t._oldValues[r]&&(i[r]=e[r]);for(var r in i){var o=i[r];if(o!==t._oldValues[r]&&(t._oldValues[r]=o,t._isInitialized||void 0!==o)){var n=t._definedProps[r],s=t._nullOrValue(t._castValueToType(o,n)),a=p[r];if(a!=s){var c=!1;null!=n.customHandler&&(c=n.customHandler(e,p,s,a,t)),n.isNativeControlProperty&&!0!==c&&(p[r]=s)}}}}finally{t._isInitialized||(t._isNgModelInitialized=!0,t.ngModel&&(void 0!==t.ngModel.$viewValue?t._ngModelRender():t._ngModelPropDesc&&(t.ngModel.$setViewValue(p[t._ngModelPropDesc.propertyName]),t.ngModel.$setPristine())),t._isInitialized=!0,t._setupScopeWithControlProperties(),t._thisInitialized())}})}},t.prototype._addEventHandlers=function(){var t,e,i=this.directive._events;for(t=0;t<i.length;t++)e=i[t],this._addEventHandler(e)},t.prototype._addEventHandler=function(t){var e=this,i=t.eventName,r=this.control[i];if(null==r)throw'Event "'+i+'" not found in '+e.constructor.name;if(this._isAttrDefined(i))this._definedEvents[i]=t;else if(!t.isPropChanged)return;this.scope,this.directive._props;var o=this.control;r.addHandler(function(i,r){var o={eventDesc:t,s:i,e:r};e._isScopeSuspended()?e._suspendedEvents.push(o):e._updateScope(o)},o)},t.prototype._updateScope=function(t){if(void 0===t&&(t=null),!this._isDestroyed){var e=t?t.eventDesc.isPropChanged:this._suspendedEvents.some(function(t){return t.eventDesc.isPropChanged}),i=this;if(e)for(var r=this.directive._props,o=0;o<r.length;o++){var n=r[o];if("="==n.scopeBindingMode&&n.isNativeControlProperty&&n.shouldUpdateSource){var s=n.propertyName,p=this.control[s];this._shouldApply(this.scope,s,p)&&(this.scope[s]=p,this.directive._$parse(this.tAttrs[this.directive._scopeToAttrName(s)]).assign(this.scope.$parent,p)),this._ngModelPropDesc&&this._isInitialized&&this._ngModelPropDesc.propertyName==s&&this.ngModel.$viewValue!==p&&this.ngModel.$setViewValue(p)}}var a=function(){for(var e=t?[t]:this._suspendedEvents,r=0;r<e.length;r++){var o=e[r],n=o.eventDesc.eventName,s=this.scope[n];i._definedEvents[n]&&s&&s({s:o.s,e:o.e})}t||(this._suspendedEvents.length=0)}.bind(this);if(e)if(this.scope.$root.$$phase)var c=this.scope.$watch("value",function(){c()});else this.scope.$apply();a()}},t.prototype._ngModelRender=function(){if(this._isNgModelInitialized){var t=this.ngModel.$viewValue,e=this._ngModelPropDesc;if(e&&(void 0!==t||this._isInitialized)){this._nullOrValue(this._castValueToType(t,e));t!==this.control[e.propertyName]&&(this.control[e.propertyName]=t)}}},t.prototype._castValueToType=function(t,e){return e.castValueToType(t)},t.prototype._isChild=function(){return this.directive._isChild()},t.prototype._isParentInitializer=function(){return this.directive._isParentInitializer()},t.prototype._isParentReferencer=function(){return this.directive._isParentReferencer()},t.prototype._getParentProp=function(){return this._isParentInitializer()?this.scope[WjDirective._parPropAttr]||this.directive._property:void 0},t.prototype._getParentReferenceProperty=function(){return this.directive._parentReferenceProperty},t.prototype._useParentObj=function(){return!this._isParentReferencer()&&this._isParentInitializer()&&!this._parentPropDesc.isArray&&!this._parentPropDesc.ownsObject},t.prototype._isParentArray=function(){return this._isParentInitializer()&&this._parentPropDesc.isArray},t.prototype._parentInCtor=function(){return this._isParentReferencer()&&""==this._getParentReferenceProperty()},t.prototype._getNgModelProperty=function(){return this.scope[WjDirective._wjModelPropAttr]||this.directive._ngModelProperty},t.prototype._updateNgModelPropDesc=function(){var t=this._getNgModelProperty();this._ngModelPropDesc=wijmo_1.isNullOrWhiteSpace(t)?null:MetaFactory.findProp(t,this.directive._props)},t.prototype._safeApply=function(t,e,i){return!!this._shouldApply(t,e,i)&&(t[e]=i,t.$root.$$phase||t.$apply(),!0)},t.prototype._shouldApply=function(t,e,i){return this._canApply(t,e)&&i!=t[e]},t.prototype._canApply=function(t,e){return!this._nonAssignable[e]},t.prototype._nullOrValue=function(t){return void 0!=t?t:null},t.prototype._getIndex=function(){var t=this.tElement[0],e=t.parentElement;if(!e)return-1;for(var i=e.childNodes,r=-1,o=this.directive._getId(),n=0;n<i.length;n++){var s=i[n];if(1==s.nodeType&&s.getAttribute(WjDirective._dirIdAttr)==o&&(++r,s===t))return r}return-1},t}();function softRefChart(){return wijmo_1._getModule("wijmo.chart")}function softRefChartAnalytics(){return wijmo_1._getModule("wijmo.chart.analytics")}function softRefChartAnimation(){return wijmo_1._getModule("wijmo.chart.animation")}function softRefChartAnnotation(){return wijmo_1._getModule("wijmo.chart.annotation")}function softRefChartFinance(){return wijmo_1._getModule("wijmo.chart.finance")}function softRefChartFinanceAnalytics(){return wijmo_1._getModule("wijmo.chart.finance.analytics")}function softRefChartHierarchical(){return wijmo_1._getModule("wijmo.chart.hierarchical")}function softRefChartInteraction(){return wijmo_1._getModule("wijmo.chart.interaction")}function softRefChartRadar(){return wijmo_1._getModule("wijmo.chart.radar")}function softRefGauge(){return wijmo_1._getModule("wijmo.gauge")}function softRefGrid(){return wijmo_1._getModule("wijmo.grid")}function softRefGridDetail(){return wijmo_1._getModule("wijmo.grid.detail")}function softRefGridFilter(){return wijmo_1._getModule("wijmo.grid.filter")}function softRefGridGrouppanel(){return wijmo_1._getModule("wijmo.grid.grouppanel")}function softRefGridMultirow(){return wijmo_1._getModule("wijmo.grid.multirow")}function softRefGridSheet(){return wijmo_1._getModule("wijmo.grid.sheet")}function softRefNav(){return wijmo_1._getModule("wijmo.nav")}function softRefOlap(){return wijmo_1._getModule("wijmo.olap")}function softRefViewer(){return wijmo_1._getModule("wijmo.viewer")}function softRefInput(){return wijmo_1._getModule("wijmo.input")}exports.WjLink=WjLink,exports.softRefChart=softRefChart,exports.softRefChartAnalytics=softRefChartAnalytics,exports.softRefChartAnimation=softRefChartAnimation,exports.softRefChartAnnotation=softRefChartAnnotation,exports.softRefChartFinance=softRefChartFinance,exports.softRefChartFinanceAnalytics=softRefChartFinanceAnalytics,exports.softRefChartHierarchical=softRefChartHierarchical,exports.softRefChartInteraction=softRefChartInteraction,exports.softRefChartRadar=softRefChartRadar,exports.softRefGauge=softRefGauge,exports.softRefGrid=softRefGrid,exports.softRefGridDetail=softRefGridDetail,exports.softRefGridFilter=softRefGridFilter,exports.softRefGridGrouppanel=softRefGridGrouppanel,exports.softRefGridMultirow=softRefGridMultirow,exports.softRefGridSheet=softRefGridSheet,exports.softRefNav=softRefNav,exports.softRefOlap=softRefOlap,exports.softRefViewer=softRefViewer,exports.softRefInput=softRefInput;