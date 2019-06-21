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

"use strict";var __extends=this&&this.__extends||function(){var t=function(n,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i])})(n,i)};return function(n,i){function r(){this.constructor=n}t(n,i),n.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),wijmo_knockout_chart_1=require("wijmo/wijmo.knockout.chart"),mKo=require("knockout"),wjcChartFin=require("wijmo/wijmo.chart.finance"),wjKo=mKo,wjFinancialChart=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcChartFin.FinancialChart},n.prototype._initialize=function(){t.prototype._initialize.call(this),wijmo_knockout_base_1.MetaFactory.findProp("labelContent",this._metaData.props).updateControl=function(t,n,i,r,e){return null!=e&&(i.dataLabel.content=e),!0}},n}(wijmo_knockout_chart_1.WjFlexChartBaseBinding);exports.wjFinancialChart=wjFinancialChart;var wjFinancialChartSeries=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcChartFin.FinancialSeries},n.prototype._createWijmoContext=function(){return new WjFinancialChartSeriesContext(this)},n}(wijmo_knockout_base_1.WjBinding);exports.wjFinancialChartSeries=wjFinancialChartSeries;var WjFinancialChartSeriesContext=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._initControl=function(){var n=this;t.prototype._initControl.call(this);var i=this.parentWjContext.control;i instanceof wjcChartFin.FinancialChart&&i.seriesVisibilityChanged.addHandler(function(t,i){n._updateSource()})},n}(wijmo_knockout_base_1.WjContext);exports.WjFinancialChartSeriesContext=WjFinancialChartSeriesContext,wjKo.bindingHandlers.wjFinancialChart=new wjFinancialChart,wjKo.bindingHandlers.wjFinancialChartSeries=new wjFinancialChartSeries;