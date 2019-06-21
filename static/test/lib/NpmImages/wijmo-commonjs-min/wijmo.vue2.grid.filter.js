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

"use strict";var __extends=this&&this.__extends||function(){var e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(r,t)};return function(r,t){function i(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcGridFilter=require("wijmo/wijmo.grid.filter"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjFlexGridFilterBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-flex-grid-filter",r.className="wijmo.grid.filter.FlexGridFilter",r.parentInCtor=!0,r.classCtor=function(){return wjcGridFilter.FlexGridFilter},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexGridFilter=WjFlexGridFilterBehavior.register();