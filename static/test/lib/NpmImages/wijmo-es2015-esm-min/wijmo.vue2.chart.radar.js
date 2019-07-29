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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChartRadar from"wijmo/wijmo.chart.radar";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjFlexRadarBehavior extends WjComponentBehavior{_updateControl(a,e){switch(a){case"tooltipContent":this.control.tooltip.content=e;break;case"labelContent":this.control.dataLabel.content=e;break;default:super._updateControl(a,e)}}}WjFlexRadarBehavior.tag="wj-flex-radar",WjFlexRadarBehavior.className="wijmo.chart.radar.FlexRadar",WjFlexRadarBehavior.extraProps=["tooltipContent","labelContent"],WjFlexRadarBehavior.classCtor=function(){return wjcChartRadar.FlexRadar};export var WjFlexRadar=WjFlexRadarBehavior.register();class WjFlexRadarAxisBehavior extends WjComponentBehavior{}WjFlexRadarAxisBehavior.tag="wj-flex-radar-axis",WjFlexRadarAxisBehavior.className="wijmo.chart.radar.FlexRadarAxis",WjFlexRadarAxisBehavior.parentProp="axes",WjFlexRadarAxisBehavior.classCtor=function(){return wjcChartRadar.FlexRadarAxis};export var WjFlexRadarAxis=WjFlexRadarAxisBehavior.register();class WjFlexRadarSeriesBehavior extends WjComponentBehavior{}WjFlexRadarSeriesBehavior.tag="wj-flex-radar-series",WjFlexRadarSeriesBehavior.className="wijmo.chart.radar.FlexRadarSeries",WjFlexRadarSeriesBehavior.parentProp="series",WjFlexRadarSeriesBehavior.siblingId="series",WjFlexRadarSeriesBehavior.classCtor=function(){return wjcChartRadar.FlexRadarSeries};export var WjFlexRadarSeries=WjFlexRadarSeriesBehavior.register();