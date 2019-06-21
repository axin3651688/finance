/*!
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

var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function o(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGridDetail from"wijmo/wijmo.grid.detail";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjFlexGridDetailBehavior=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._openedComponents=[],t}return __extends(t,e),t.render=function(e){return e("div")},t.prototype._createControl=function(){var t=this,r=e.prototype._createControl.call(this);return r.createDetailCell=function(e){var r=new(Vue.extend({data:function(){return{childVN:null}},render:function(e){return e("div",[this.childVN])}}));return r.childVN=t.component.$scopedSlots.default({row:e,item:e.dataItem}),r.$mount(),t._openedComponents.push(r),r.$el},r.disposeDetailCell=function(e){var r=e.detail,o=t._openedComponents;if(r)for(var n=0;n<o.length;n++)if(r===o[n].$el){o[n].$destroy(),o.splice(n,1);break}},r},t.tag="wj-flex-grid-detail",t.className="wijmo.grid.detail.FlexGridDetailProvider",t.parentInCtor=!0,t.classCtor=function(){return wjcGridDetail.FlexGridDetailProvider},t}(WjComponentBehavior);export var WjFlexGridDetail=WjFlexGridDetailBehavior.register();