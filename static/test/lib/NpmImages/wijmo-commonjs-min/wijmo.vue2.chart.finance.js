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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcChartFinance=require("wijmo/wijmo.chart.finance"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;var WjFinancialChartBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype._updateControl=function(t,n){switch(t){case"tooltipContent":this.control.tooltip.content=n;break;case"labelContent":this.control.dataLabel.content=n;break;default:e.prototype._updateControl.call(this,t,n)}},t.tag="wj-financial-chart",t.className="wijmo.chart.finance.FinancialChart",t.extraProps=["tooltipContent","labelContent"],t.classCtor=function(){return wjcChartFinance.FinancialChart},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFinancialChart=WjFinancialChartBehavior.register();var WjFinancialChartSeriesBehavior=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.tag="wj-financial-chart-series",t.className="wijmo.chart.finance.FinancialSeries",t.parentProp="series",t.siblingId="series",t.classCtor=function(){return wjcChartFinance.FinancialSeries},t}(wijmo_vue2_base_1.WjComponentBehavior);exports.WjFinancialChartSeries=WjFinancialChartSeriesBehavior.register();