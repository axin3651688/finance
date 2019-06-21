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

var __extends=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcChartRadar from"wijmo/wijmo.chart.radar";var FlexRadar=function(t){function e(e){return t.call(this,e,wjcChartRadar.FlexRadar,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","options","selection"]})||this}return __extends(e,t),e}(ComponentBase);export{FlexRadar};var FlexRadarAxis=function(t){function e(e){var r=t.call(this,e,wjcChartRadar.FlexRadarAxis,{objectProps:["plotArea","itemsSource"]})||this;return r._parentProp="axes",r}return __extends(e,t),e}(ComponentBase);export{FlexRadarAxis};var FlexRadarSeries=function(t){function e(e){var r=t.call(this,e,wjcChartRadar.FlexRadarSeries,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]})||this;return r._parentProp="series",r._siblingId="series",r}return __extends(e,t),e}(ComponentBase);export{FlexRadarSeries};