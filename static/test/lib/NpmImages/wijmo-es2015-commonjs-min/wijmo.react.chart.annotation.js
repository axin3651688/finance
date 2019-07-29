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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcChartAnnotation=require("wijmo/wijmo.chart.annotation");class FlexChartAnnotationLayer extends wijmo_react_base_1.ComponentBase{constructor(t){super(t,wjcChartAnnotation.AnnotationLayer),this._parentInCtor=!0}}exports.FlexChartAnnotationLayer=FlexChartAnnotationLayer;class FlexChartAnnotation extends wijmo_react_base_1.ComponentBase{constructor(t){super(t,null,{objectProps:["point","offset","style","start","end"]}),this._parentProp="items"}_createControl(){return new wjcChartAnnotation[this.props.type]}}exports.FlexChartAnnotation=FlexChartAnnotation;