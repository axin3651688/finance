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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcChartAnnotation from"wijmo/wijmo.chart.annotation";export class FlexChartAnnotationLayer extends ComponentBase{constructor(t){super(t,wjcChartAnnotation.AnnotationLayer),this._parentInCtor=!0}};export class FlexChartAnnotation extends ComponentBase{constructor(t){super(t,null,{objectProps:["point","offset","style","start","end"]}),this._parentProp="items"}_createControl(){return new wjcChartAnnotation[this.props.type]}};