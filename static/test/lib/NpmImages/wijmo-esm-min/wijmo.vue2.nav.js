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

var __extends=this&&this.__extends||function(){var e=function(o,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var t in o)o.hasOwnProperty(t)&&(e[t]=o[t])})(o,t)};return function(o,t){function r(){this.constructor=o}e(o,t),o.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcNav from"wijmo/wijmo.nav";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjTreeViewBehavior=function(e){function o(){return null!==e&&e.apply(this,arguments)||this}return __extends(o,e),o.tag="wj-tree-view",o.className="wijmo.nav.TreeView",o.classCtor=function(){return wjcNav.TreeView},o}(WjComponentBehavior);export var WjTreeView=WjTreeViewBehavior.register();