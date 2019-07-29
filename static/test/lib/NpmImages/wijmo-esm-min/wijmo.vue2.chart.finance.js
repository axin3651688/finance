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

var __extends=this&&this.__extends||function(){var t=function(n,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(n,e)};return function(n,e){function r(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}}();import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChartFinance from"wijmo/wijmo.chart.finance";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;var WjFinancialChartBehavior=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._updateControl=function(n,e){switch(n){case"tooltipContent":this.control.tooltip.content=e;break;case"labelContent":this.control.dataLabel.content=e;break;default:t.prototype._updateControl.call(this,n,e)}},n.tag="wj-financial-chart",n.className="wijmo.chart.finance.FinancialChart",n.extraProps=["tooltipContent","labelContent"],n.classCtor=function(){return wjcChartFinance.FinancialChart},n}(WjComponentBehavior);export var WjFinancialChart=WjFinancialChartBehavior.register();var WjFinancialChartSeriesBehavior=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.tag="wj-financial-chart-series",n.className="wijmo.chart.finance.FinancialSeries",n.parentProp="series",n.siblingId="series",n.classCtor=function(){return wjcChartFinance.FinancialSeries},n}(WjComponentBehavior);export var WjFinancialChartSeries=WjFinancialChartSeriesBehavior.register();