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

var __extends=this&&this.__extends||function(){var o=function(r,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,r){o.__proto__=r}||function(o,r){for(var e in r)r.hasOwnProperty(e)&&(o[e]=r[e])})(r,e)};return function(r,e){function t(){this.constructor=r}o(r,e),r.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGridGrouppanel from"wijmo/wijmo.grid.grouppanel";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjGroupPanelBehavior=function(o){function r(){return null!==o&&o.apply(this,arguments)||this}return __extends(r,o),r.tag="wj-group-panel",r.className="wijmo.grid.grouppanel.GroupPanel",r.classCtor=function(){return wjcGridGrouppanel.GroupPanel},r}(WjComponentBehavior);export var WjGroupPanel=WjGroupPanelBehavior.register();