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

"use strict";var __extends=this&&this.__extends||function(){var e=function(r,t){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r}||function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t])})(r,t)};return function(r,t){function o(){this.constructor=r}e(r,t),r.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcCore=require("wijmo/wijmo"),wjcGrid=require("wijmo/wijmo.grid"),vue_1=require("vue");function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}exports.Vue=vue_1.default||VueModule;var WjFlexGridBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.tag="wj-flex-grid",r.className="wijmo.grid.FlexGrid",r.classCtor=function(){return wjcGrid.FlexGrid},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexGrid=WjFlexGridBehavior.register();var WjFlexGridColumnBehavior=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return __extends(r,e),r.prototype._initParent=function(){var r=this.parent.control;r.autoGenerateColumns&&(r.autoGenerateColumns=!1,r.columns.clear()),e.prototype._initParent.call(this)},r.tag="wj-flex-grid-column",r.className="wijmo.grid.Column",r.parentProp="columns",r.classCtor=function(){return wjcGrid.Column},r}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFlexGridColumn=WjFlexGridColumnBehavior.register();