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
* {@module wijmo.knockout.chart.interaction}
* KnockoutJS bindings for wijmo.chart.interaction module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding } from 'wijmo/wijmo.knockout.base';
/**
 * KnockoutJS binding for the {@link RangeSelector} control.
 *
 * Use the {@link wjFlexChartRangeSelector} binding to add {@link RangeSelector} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a RangeSelector control:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Expenses', binding: 'expenses' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Downloads', binding: 'downloads' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartRangeSelector: { seamless: 'true',rangeChanged: rangeChanged }"&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartRangeSelector</b> binding supports all read-write properties and events of
 * the {@link RangeSelector} class.
 */
export declare class wjFlexChartRangeSelector extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link ChartGestures} object.
 *
 * Use the {@link wjFlexChartGestures} binding to add {@link ChartGestures} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a ChartGestures:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartGestures: { scaleX:0.5, posX:0.1 } "&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartGestures</b> binding supports all read-write properties and events of
 * the {@link ChartGestures} class.
 */
export declare class wjFlexChartGestures extends WjBinding {
    _getControlConstructor(): any;
}
