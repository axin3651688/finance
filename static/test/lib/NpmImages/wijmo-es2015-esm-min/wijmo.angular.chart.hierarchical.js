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

import{_registerNgModule,MetaFactory,softRefChartHierarchical}from"wijmo/wijmo.angular.base";import{WjFlexChartBase,WjFlexPie}from"wijmo/wijmo.angular.chart";import*as mNg from"angular";import*as wjcChartHierarchical from"wijmo/wijmo.chart.hierarchical";var wjNg=mNg;const wijmoChartHierarchicalName="wj.chart.hierarchical";export const ngModuleName="wj.chart.hierarchical";var wijmoChartHierarchical=_registerNgModule("wj.chart.hierarchical");softRefChartHierarchical&&(wijmoChartHierarchical.directive("wjSunburst",[function(){return new WjSunburst}]),wijmoChartHierarchical.directive("wjTreeMap",[function(){return new WjTreeMap}]));export class WjSunburst extends WjFlexPie{get _controlConstructor(){return wjcChartHierarchical.Sunburst}};export class WjTreeMap extends WjFlexChartBase{get _controlConstructor(){return wjcChartHierarchical.TreeMap}_initProps(){super._initProps();MetaFactory.findProp("labelContent",this._props).customHandler=function(r,a,e,t,i){null!=e&&(a.dataLabel.content=e)}}};