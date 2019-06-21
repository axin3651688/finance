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
/**
* {@module wijmo.angular.chart.interaction}
* AngularJS directives for wijmo.angular.chart.interaction module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective } from 'wijmo/wijmo.angular.base';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.chart.interaction";
/**
 * AngularJS directive for the {@link FlexChart} {@link wijmo.chart.interaction.RangeSelector} object.
 *
 * The <b>wj-flex-chart-range-selector</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>is-visible</dt>     <dd><code>@</code> The value indicating whether the RangeSelector is visible.</dd>
 *   <dt>min</dt>           <dd><code>@</code> The minimum value of the range.</dd>
 *   <dt>max</dt>           <dd><code>@</code> The maximum value of the range.</dd>
 *   <dt>orientation</dt>   <dd><code>@</code> The orientation of the RangeSelector.</dd>
 *   <dt>seamless</dt>      <dd><code>@</code> The value indicating whether the minimal and maximal handler will move seamlessly.</dd>
 *   <dt>min-scale</dt>      <dd><code>@</code> the valid minimum range of the RangeSelector.</dd>
 *   <dt>max-scale</dt>      <dd><code>@</code> the valid maximum range of the RangeSelector.</dd>
 * </dl>
 */
export declare class WjFlexChartRangeSelector extends WjDirective {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} {@link wijmo.chart.interaction.ChartGestures} object.
 *
 * The <b>wj-flex-chart-gestures</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>mouse-action</dt>     <dd><code>@</code> The value indicating mouse action is zooming or panning.</dd>
 *   <dt>interactive-axes</dt> <dd><code>@</code> The value indicating which axis is interactive.</dd>
 *   <dt>enable</dt>          <dd><code>@</code> The value indicating the gestures action is enabled or not.</dd>
 *   <dt>scale-x</dt>          <dd><code>@</code> The value indicating axisX initial range between Min and Max.</dd>
 *   <dt>scale-y</dt>          <dd><code>@</code> The value indicating axisY initial range between Min and Max.</dd>
 *   <dt>pos-x</dt>            <dd><code>@</code> The value indicating initial position on the axisX.</dd>
 *   <dt>pos-y</dt>            <dd><code>@</code> The value indicating initial position on the axisY.</dd>
 * </dl>
 */
export declare class WjFlexChartChartGestures extends WjDirective {
    constructor();
    readonly _controlConstructor: any;
}
