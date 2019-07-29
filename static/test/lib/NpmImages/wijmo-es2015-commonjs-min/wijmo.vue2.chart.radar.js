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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_vue2_base_1=require("wijmo/wijmo.vue2.base"),VueModule=require("vue"),wjcChartRadar=require("wijmo/wijmo.chart.radar"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule;class WjFlexRadarBehavior extends wijmo_vue2_base_1.WjComponentBehavior{_updateControl(e,a){switch(e){case"tooltipContent":this.control.tooltip.content=a;break;case"labelContent":this.control.dataLabel.content=a;break;default:super._updateControl(e,a)}}}WjFlexRadarBehavior.tag="wj-flex-radar",WjFlexRadarBehavior.className="wijmo.chart.radar.FlexRadar",WjFlexRadarBehavior.extraProps=["tooltipContent","labelContent"],WjFlexRadarBehavior.classCtor=function(){return wjcChartRadar.FlexRadar},exports.WjFlexRadar=WjFlexRadarBehavior.register();class WjFlexRadarAxisBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexRadarAxisBehavior.tag="wj-flex-radar-axis",WjFlexRadarAxisBehavior.className="wijmo.chart.radar.FlexRadarAxis",WjFlexRadarAxisBehavior.parentProp="axes",WjFlexRadarAxisBehavior.classCtor=function(){return wjcChartRadar.FlexRadarAxis},exports.WjFlexRadarAxis=WjFlexRadarAxisBehavior.register();class WjFlexRadarSeriesBehavior extends wijmo_vue2_base_1.WjComponentBehavior{}WjFlexRadarSeriesBehavior.tag="wj-flex-radar-series",WjFlexRadarSeriesBehavior.className="wijmo.chart.radar.FlexRadarSeries",WjFlexRadarSeriesBehavior.parentProp="series",WjFlexRadarSeriesBehavior.siblingId="series",WjFlexRadarSeriesBehavior.classCtor=function(){return wjcChartRadar.FlexRadarSeries},exports.WjFlexRadarSeries=WjFlexRadarSeriesBehavior.register();