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

var __extends=this&&this.__extends||function(){var r=function(o,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,o){r.__proto__=o}||function(r,o){for(var t in o)o.hasOwnProperty(t)&&(r[t]=o[t])})(o,t)};return function(o,t){function e(){this.constructor=o}r(o,t),o.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcCore from"wijmo/wijmo";import*as wjcGrid from"wijmo/wijmo.grid";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;function softInput(){return wjcCore._getModule("wijmo.input")}function softGridDetail(){return wjcCore._getModule("wijmo.grid.detail")}var WjFlexGridBehavior=function(r){function o(){return null!==r&&r.apply(this,arguments)||this}return __extends(o,r),o.tag="wj-flex-grid",o.className="wijmo.grid.FlexGrid",o.classCtor=function(){return wjcGrid.FlexGrid},o}(WjComponentBehavior);export var WjFlexGrid=WjFlexGridBehavior.register();var WjFlexGridColumnBehavior=function(r){function o(){return null!==r&&r.apply(this,arguments)||this}return __extends(o,r),o.prototype._initParent=function(){var o=this.parent.control;o.autoGenerateColumns&&(o.autoGenerateColumns=!1,o.columns.clear()),r.prototype._initParent.call(this)},o.tag="wj-flex-grid-column",o.className="wijmo.grid.Column",o.parentProp="columns",o.classCtor=function(){return wjcGrid.Column},o}(WjComponentBehavior);export var WjFlexGridColumn=WjFlexGridColumnBehavior.register();