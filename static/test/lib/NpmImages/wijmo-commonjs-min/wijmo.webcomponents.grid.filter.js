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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,o){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(t,o)};return function(t,o){function r(){this.constructor=t}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcGridFilter=require("wijmo/wijmo.grid.filter"),_wj_ns_exists_10=!0,WjcFlexGridFilter=function(e){function t(){var t=e.call(this)||this;return t._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(t),t}return __extends(t,e),Object.defineProperty(t,"observedAttributes",{get:function(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0}),t.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()},t.prototype.attributeChangedCallback=function(e,t,o){this._wjBehaviour.lhAttributeChanged(e,t,o)},t.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()},t.wrappedClass=function(){return wjcGridFilter.FlexGridFilter},t.parentInCtor=!0,t}(HTMLElement);exports.WjcFlexGridFilter=WjcFlexGridFilter,_wj_ns_exists_10&&(wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-grid-filter",WjcFlexGridFilter),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridFilter.ColumnFilterEditor),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridFilter.ConditionFilterEditor),wijmo_webcomponents_base_1.WjComponentBehavior.register("",wjcGridFilter.ValueFilterEditor));