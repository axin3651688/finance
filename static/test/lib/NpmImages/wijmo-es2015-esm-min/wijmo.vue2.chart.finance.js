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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChartFinance from"wijmo/wijmo.chart.finance";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjFinancialChartBehavior extends WjComponentBehavior{_updateControl(a,e){switch(a){case"tooltipContent":this.control.tooltip.content=e;break;case"labelContent":this.control.dataLabel.content=e;break;default:super._updateControl(a,e)}}}WjFinancialChartBehavior.tag="wj-financial-chart",WjFinancialChartBehavior.className="wijmo.chart.finance.FinancialChart",WjFinancialChartBehavior.extraProps=["tooltipContent","labelContent"],WjFinancialChartBehavior.classCtor=function(){return wjcChartFinance.FinancialChart};export var WjFinancialChart=WjFinancialChartBehavior.register();class WjFinancialChartSeriesBehavior extends WjComponentBehavior{}WjFinancialChartSeriesBehavior.tag="wj-financial-chart-series",WjFinancialChartSeriesBehavior.className="wijmo.chart.finance.FinancialSeries",WjFinancialChartSeriesBehavior.parentProp="series",WjFinancialChartSeriesBehavior.siblingId="series",WjFinancialChartSeriesBehavior.classCtor=function(){return wjcChartFinance.FinancialSeries};export var WjFinancialChartSeries=WjFinancialChartSeriesBehavior.register();