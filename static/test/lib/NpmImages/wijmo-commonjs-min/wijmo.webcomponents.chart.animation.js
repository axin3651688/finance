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

"use strict";var __extends=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_webcomponents_base_1=require("wijmo/wijmo.webcomponents.base"),wjcChartAnimation=require("wijmo/wijmo.chart.animation"),_wj_ns_exists_2=!0,WjcFlexChartAnimation=function(t){function e(){var e=t.call(this)||this;return e._wjBehaviour=wijmo_webcomponents_base_1.WjComponentBehavior._attach(e),e}return __extends(e,t),Object.defineProperty(e,"observedAttributes",{get:function(){return wijmo_webcomponents_base_1.WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0}),e.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()},e.prototype.attributeChangedCallback=function(t,e,n){this._wjBehaviour.lhAttributeChanged(t,e,n)},e.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()},e.wrappedClass=function(){return wjcChartAnimation.ChartAnimation},e.parentInCtor=!0,e}(HTMLElement);exports.WjcFlexChartAnimation=WjcFlexChartAnimation,_wj_ns_exists_2&&wijmo_webcomponents_base_1.WjComponentBehavior.register("wjc-flex-chart-animation",WjcFlexChartAnimation);