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

var __extends=this&&this.__extends||function(){var t=function(n,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var i in n)n.hasOwnProperty(i)&&(t[i]=n[i])})(n,i)};return function(n,i){function r(){this.constructor=n}t(n,i),n.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}();import{WjBinding,WjContext,MetaFactory}from"wijmo/wijmo.knockout.base";import{WjFlexChartBaseBinding}from"wijmo/wijmo.knockout.chart";import*as mKo from"knockout";import*as wjcChartFin from"wijmo/wijmo.chart.finance";var wjKo=mKo,wjFinancialChart=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcChartFin.FinancialChart},n.prototype._initialize=function(){t.prototype._initialize.call(this),MetaFactory.findProp("labelContent",this._metaData.props).updateControl=function(t,n,i,r,o){return null!=o&&(i.dataLabel.content=o),!0}},n}(WjFlexChartBaseBinding);export{wjFinancialChart};var wjFinancialChartSeries=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._getControlConstructor=function(){return wjcChartFin.FinancialSeries},n.prototype._createWijmoContext=function(){return new WjFinancialChartSeriesContext(this)},n}(WjBinding);export{wjFinancialChartSeries};var WjFinancialChartSeriesContext=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return __extends(n,t),n.prototype._initControl=function(){var n=this;t.prototype._initControl.call(this);var i=this.parentWjContext.control;i instanceof wjcChartFin.FinancialChart&&i.seriesVisibilityChanged.addHandler(function(t,i){n._updateSource()})},n}(WjContext);export{WjFinancialChartSeriesContext};wjKo.bindingHandlers.wjFinancialChart=new wjFinancialChart,wjKo.bindingHandlers.wjFinancialChartSeries=new wjFinancialChartSeries;