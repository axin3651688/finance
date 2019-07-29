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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcChartFinance=require("wijmo/wijmo.chart.finance"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjFinancialChartBehavior extends wijmo_vue2_base_1.WjComponentBehavior{_updateControl(a,e){switch(a){case"tooltipContent":this.control.tooltip.content=e;break;case"labelContent":this.control.dataLabel.content=e;break;default:super._updateControl(a,e)}}}WjFinancialChartBehavior.tag="wj-financial-chart",WjFinancialChartBehavior.className="wijmo.chart.finance.FinancialChart",WjFinancialChartBehavior.extraProps=["tooltipContent","labelContent"],WjFinancialChartBehavior.classCtor=function(){return wjcChartFinance.FinancialChart},exports.WjFinancialChart=WjFinancialChartBehavior.register();class WjFinancialChartSeriesBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFinancialChartSeriesBehavior.tag="wj-financial-chart-series",WjFinancialChartSeriesBehavior.className="wijmo.chart.finance.FinancialSeries",WjFinancialChartSeriesBehavior.parentProp="series",WjFinancialChartSeriesBehavior.siblingId="series",WjFinancialChartSeriesBehavior.classCtor=function(){return wjcChartFinance.FinancialSeries},exports.WjFinancialChartSeries=WjFinancialChartSeriesBehavior.register();