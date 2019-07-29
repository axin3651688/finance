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

var __extends=this&&this.__extends||function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function o(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();import{WjComponentBehavior}from"wijmo/wijmo.webcomponents.base";import*as wjcChartAnimation from"wijmo/wijmo.chart.animation";var _wj_ns_exists_2=!0,WjcFlexChartAnimation=function(t){function n(){var n=t.call(this)||this;return n._wjBehaviour=WjComponentBehavior._attach(n),n}return __extends(n,t),Object.defineProperty(n,"observedAttributes",{get:function(){return WjComponentBehavior.getProps(this)},enumerable:!0,configurable:!0}),n.prototype.connectedCallback=function(){this._wjBehaviour.lhConnected()},n.prototype.attributeChangedCallback=function(t,n,e){this._wjBehaviour.lhAttributeChanged(t,n,e)},n.prototype.disconnectedCallback=function(){this._wjBehaviour.lhDisconnected()},n.wrappedClass=function(){return wjcChartAnimation.ChartAnimation},n.parentInCtor=!0,n}(HTMLElement);export{WjcFlexChartAnimation};_wj_ns_exists_2&&WjComponentBehavior.register("wjc-flex-chart-animation",WjcFlexChartAnimation);