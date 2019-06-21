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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const wijmo_angular_base_1=require("wijmo/wijmo.angular.base"),mNg=require("angular"),wjcGauge=require("wijmo/wijmo.gauge");var wjNg=mNg;const wijmoGaugeName="wj.gauge";exports.ngModuleName="wj.gauge";var wijmoGauge=wijmo_angular_base_1._registerNgModule("wj.gauge");wijmo_angular_base_1.softRefGauge()&&wijmo_angular_base_1.softRefGauge().LinearGauge&&(wijmoGauge.directive("wjLinearGauge",[function(){return new WjLinearGauge}]),wijmoGauge.directive("wjBulletGraph",[function(){return new WjBulletGraph}]),wijmoGauge.directive("wjRadialGauge",[function(){return new WjRadialGauge}]),wijmoGauge.directive("wjRange",[function(){return new WjRange}]));class WjGauge extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.template="<div ng-transclude />",this.transclude=!0}get _controlConstructor(){return wjcGauge.Gauge}}exports.WjGauge=WjGauge;class WjLinearGauge extends WjGauge{constructor(){super()}get _controlConstructor(){return wjcGauge.LinearGauge}}exports.WjLinearGauge=WjLinearGauge;class WjBulletGraph extends WjLinearGauge{constructor(){super()}get _controlConstructor(){return wjcGauge.BulletGraph}}exports.WjBulletGraph=WjBulletGraph;class WjRadialGauge extends WjGauge{constructor(){super()}get _controlConstructor(){return wjcGauge.RadialGauge}}exports.WjRadialGauge=WjRadialGauge;class WjRange extends wijmo_angular_base_1.WjDirective{constructor(){super(),this.require=["?^wjLinearGauge","?^wjRadialGauge","?^wjBulletGraph"],this.template="<div ng-transclude />",this.transclude=!0,this._property="ranges",this._isPropertyArray=!0}get _controlConstructor(){return wjcGauge.Range}_initControl(e){return new wjcGauge.Range}}exports.WjRange=WjRange;