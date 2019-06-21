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

"use strict";var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function a(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}}();Object.defineProperty(exports,"__esModule",{value:!0});var wijmo_react_base_1=require("wijmo/wijmo.react.base"),wjcChartRadar=require("wijmo/wijmo.chart.radar"),FlexRadar=function(e){function t(t){return e.call(this,t,wjcChartRadar.FlexRadar,{objectProps:["palette","plotMargin","footerStyle","headerStyle","itemsSource","options","selection"]})||this}return __extends(t,e),t}(wijmo_react_base_1.ComponentBase);exports.FlexRadar=FlexRadar;var FlexRadarAxis=function(e){function t(t){var r=e.call(this,t,wjcChartRadar.FlexRadarAxis,{objectProps:["plotArea","itemsSource"]})||this;return r._parentProp="axes",r}return __extends(t,e),t}(wijmo_react_base_1.ComponentBase);exports.FlexRadarAxis=FlexRadarAxis;var FlexRadarSeries=function(e){function t(t){var r=e.call(this,t,wjcChartRadar.FlexRadarSeries,{objectProps:["axisX","axisY","style","altStyle","symbolStyle","itemsSource","tooltipContent"]})||this;return r._parentProp="series",r._siblingId="series",r}return __extends(t,e),t}(wijmo_react_base_1.ComponentBase);exports.FlexRadarSeries=FlexRadarSeries;