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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcChartHierarchical from"wijmo/wijmo.chart.hierarchical";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjSunburstBehavior extends WjComponentBehavior{_updateControl(e,t){switch(e){case"tooltipContent":this.control.tooltip.content=t;break;case"labelContent":this.control.dataLabel.content=t;break;default:super._updateControl(e,t)}}}WjSunburstBehavior.tag="wj-sunburst",WjSunburstBehavior.className="wijmo.chart.hierarchical.Sunburst",WjSunburstBehavior.extraProps=["tooltipContent","labelContent"],WjSunburstBehavior.classCtor=function(){return wjcChartHierarchical.Sunburst};export var WjSunburst=WjSunburstBehavior.register();class WjTreeMapBehavior extends WjComponentBehavior{_updateControl(e,t){switch(e){case"tooltipContent":this.control.tooltip.content=t;break;case"labelContent":this.control.dataLabel.content=t;break;default:super._updateControl(e,t)}}}WjTreeMapBehavior.tag="wj-tree-map",WjTreeMapBehavior.className="wijmo.chart.hierarchical.TreeMap",WjTreeMapBehavior.extraProps=["tooltipContent","labelContent"],WjTreeMapBehavior.classCtor=function(){return wjcChartHierarchical.TreeMap};export var WjTreeMap=WjTreeMapBehavior.register();