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
* {@module wijmo.knockout.chart.animation}
* KnockoutJS bindings for wijmo.chart.animation module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding } from 'wijmo/wijmo.knockout.base';
/**
 * KnockoutJS binding for the {@link ChartAnimation} object.
 *
 * Use the {@link wjFlexChartAnimation} binding to add {@link ChartAnimation} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a ChartAnimation:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country',chartType:'Column' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartAnimation: { animationMode: 'Series',easing:'Swing',duration:2000 }  "&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartAnimation</b> binding supports all read-write properties and events of
 * the {@link ChartAnimation} class.
 */
export declare class wjFlexChartAnimation extends WjBinding {
    _getControlConstructor(): any;
}
