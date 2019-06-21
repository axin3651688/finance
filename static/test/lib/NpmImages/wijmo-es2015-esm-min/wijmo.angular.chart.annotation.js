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

import{WjDirective,WjLink,_registerNgModule,softRefChartAnnotation}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcChartAnnotation from"wijmo/wijmo.chart.annotation";var wjNg=mNg;const wijmoChartAnnotationName="wj.chart.annotation";export const ngModuleName="wj.chart.annotation";var wijmoChartAnnotation=_registerNgModule("wj.chart.annotation");softRefChartAnnotation()&&(wijmoChartAnnotation.directive("wjFlexChartAnnotationLayer",[function(){return new WjFlexChartAnnotationLayer}]),wijmoChartAnnotation.directive("wjFlexChartAnnotation",[function(){return new WjFlexChartAnnotation}]));export class WjFlexChartAnnotationLayer extends WjDirective{constructor(){super(),this.require=["?^wjFlexChart","?^wjFinancialChart"],this.template='<div class="wjFlexChartAnnotationLayer" ng-transclude />',this.transclude=!0}get _controlConstructor(){return wjcChartAnnotation.AnnotationLayer}};export class WjFlexChartAnnotation extends WjDirective{constructor(){super(),this.require="^wjFlexChartAnnotationLayer",this.template='<div class="wjFlexChartAnnotation" ng-transclude />',this.transclude=!0}_createLink(){return new WjFlexChartAnnotationLink}_getMetaDataId(){return"FlexChartAnnotation"}};export class WjFlexChartAnnotationLink extends WjLink{_initControl(){return new wjcChartAnnotation[this.scope.type]}};