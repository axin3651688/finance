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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_knockout_base_1=require("wijmo/wijmo.knockout.base"),mKo=require("knockout"),wjcChartAnno=require("wijmo/wijmo.chart.annotation");var wjKo=mKo;class wjFlexChartAnnotationLayer extends wijmo_knockout_base_1.WjBinding{_getControlConstructor(){return wjcChartAnno.AnnotationLayer}}exports.wjFlexChartAnnotationLayer=wjFlexChartAnnotationLayer;class wjFlexChartAnnotation extends wijmo_knockout_base_1.WjBinding{_createControl(t){return this._context._createAnnotation()}_getMetaDataId(){return"FlexChartAnnotation"}_createWijmoContext(){return this._context=new wjFlexChartAnnotationContext(this),this._context}}exports.wjFlexChartAnnotation=wjFlexChartAnnotation;class wjFlexChartAnnotationContext extends wijmo_knockout_base_1.WjContext{_createAnnotation(){var t=this.valueAccessor(),n=wjKo.unwrap(t.type);return new wjcChartAnno[n]}}exports.wjFlexChartAnnotationContext=wjFlexChartAnnotationContext,wjKo.bindingHandlers.wjFlexChartAnnotationLayer=new wjFlexChartAnnotationLayer,wjKo.bindingHandlers.wjFlexChartAnnotation=new wjFlexChartAnnotation;