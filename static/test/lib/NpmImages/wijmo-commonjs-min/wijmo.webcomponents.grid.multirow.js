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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(e,o)};return function(e,o){function n(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcGridMultirow=require("wijmo/wijmo.grid.multirow"),_wj_ns_exists_12=!0,WjcMultiRow=function(t){function e(){var e=t.call(this,document.createElement("div"))||this;return e._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(e),e}return __extends(e,t),Object.defineProperty(e,"observedAttributes",{get:function(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0}),e.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()},e.prototype.attributeChangedCallback=function(t,e,o){this._wjBehaviour.lhAttributeChanged(t,e,o)},e.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()},e.prototype.addEventListener=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];"string"==typeof e[0]?HTMLElement.prototype.addEventListener.apply(this,e):t.prototype.addEventListener.apply(this,e)},e}(wjcGridMultirow.MultiRow);exports.WjcMultiRow=WjcMultiRow,_wj_ns_exists_12&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-multi-row",WjcMultiRow);