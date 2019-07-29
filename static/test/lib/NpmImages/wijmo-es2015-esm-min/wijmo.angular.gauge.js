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

import{WjDirective,_registerNgModule,softRefGauge}from"wijmo/wijmo.angular.base";import*as mNg from"angular";import*as wjcGauge from"wijmo/wijmo.gauge";var wjNg=mNg;const wijmoGaugeName="wj.gauge";export const ngModuleName="wj.gauge";var wijmoGauge=_registerNgModule("wj.gauge");softRefGauge()&&softRefGauge().LinearGauge&&(wijmoGauge.directive("wjLinearGauge",[function(){return new WjLinearGauge}]),wijmoGauge.directive("wjBulletGraph",[function(){return new WjBulletGraph}]),wijmoGauge.directive("wjRadialGauge",[function(){return new WjRadialGauge}]),wijmoGauge.directive("wjRange",[function(){return new WjRange}]));export class WjGauge extends WjDirective{constructor(){super(),this.template="<div ng-transclude />",this.transclude=!0}get _controlConstructor(){return wjcGauge.Gauge}};export class WjLinearGauge extends WjGauge{constructor(){super()}get _controlConstructor(){return wjcGauge.LinearGauge}};export class WjBulletGraph extends WjLinearGauge{constructor(){super()}get _controlConstructor(){return wjcGauge.BulletGraph}};export class WjRadialGauge extends WjGauge{constructor(){super()}get _controlConstructor(){return wjcGauge.RadialGauge}};export class WjRange extends WjDirective{constructor(){super(),this.require=["?^wjLinearGauge","?^wjRadialGauge","?^wjBulletGraph"],this.template="<div ng-transclude />",this.transclude=!0,this._property="ranges",this._isPropertyArray=!0}get _controlConstructor(){return wjcGauge.Range}_initControl(e){return new wjcGauge.Range}};