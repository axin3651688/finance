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

"use strict";var __extends=this&&this.__extends||function(){var e=function(r,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var o in r)r.hasOwnProperty(o)&&(e[o]=r[o])})(r,o)};return function(r,o){function t(){this.constructor=r}e(r,o),r.prototype=null===o?Object.create(o):(t.prototype=o.prototype,new t)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcGridGrouppanel=require("wijmo/wijmo.grid.grouppanel"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjGroupPanelBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-group-panel",r.className="wijmo.grid.grouppanel.GroupPanel",r.classCtor=function(){return wjcGridGrouppanel.GroupPanel},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjGroupPanel=WjGroupPanelBehavior.register();