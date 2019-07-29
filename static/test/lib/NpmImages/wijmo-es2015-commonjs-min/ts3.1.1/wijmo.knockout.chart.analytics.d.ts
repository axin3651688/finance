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
* {@module wijmo.knockout.chart.analytics}
* KnockoutJS bindings for wijmo.chart.analytics module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjSeriesBase } from 'wijmo/wijmo.knockout.chart';
export declare class WjTrendLineBase extends WjSeriesBase {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link TrendLine} object.
 *
 * Use the {@link wjFlexChartTrendLine} binding to add {@link TrendLine} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a TrendLine:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country',chartType:'Column' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartAnimation: { animationMode: 'Series',easing:'Swing',duration:2000 }  "&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartTrendLine</b> binding supports all read-write properties and events of
 * the {@link TrendLine} class.
 */
export declare class wjFlexChartTrendLine extends WjTrendLineBase {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link MovingAverage} object.
 *
 * Use the {@link wjFlexChartMovingAverage} binding to add {@link MovingAverage} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a MovingAverage:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { chartType: 'Scatter', name: 'Base Data', binding: 'y' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartMovingAverage: { binding: 'y', bindingX: 'x', period:2 }  "&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartMovingAverage</b> binding supports all read-write properties and events of
 * the {@link MovingAverage} class.
 */
export declare class wjFlexChartMovingAverage extends WjTrendLineBase {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link YFunctionSeries} object.
 *
 * Use the {@link wjFlexChartYFunctionSeries} binding to add {@link YFunctionSeries} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a YFunctionSeries:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
 *     &lt;div data-bind="wjFlexChartYFunctionSeries: {  min: 10, max: -10, sampleCount:100,func:func }"&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartYFunctionSeries</b> binding supports all read-write properties and events of
 * the {@link YFunctionSeries} class.
 */
export declare class wjFlexChartYFunctionSeries extends WjTrendLineBase {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link ParametricFunctionSeries} object.
 *
 * Use the {@link wjFlexChartParametricFunctionSeries} binding to add {@link ParametricFunctionSeries} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a ParametricFunctionSeries:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartParametricFunctionSeries: {  sampleCount:1000, max: max,xFunc:xFunc,yFunc:yFunc  }"&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartParametricFunctionSeries</b> binding supports all read-write properties and events of
 * the {@link ParametricFunctionSeries} class.
 */
export declare class wjFlexChartParametricFunctionSeries extends WjTrendLineBase {
    _getControlConstructor(): any;
    _initialize(): void;
}
/**
 * KnockoutJS binding for the {@link Waterfall} object.
 *
 * Use the {@link wjFlexChartWaterfall} binding to add {@link Waterfall} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a Waterfall:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource,  binding:'value',bindingX: 'name' }"&gt;
 *     &lt;div data-bind="wjFlexChartWaterfall: {  relativeData:true, connectorLines: true, start:1000,showIntermediateTotal: true,
 *                       intermediateTotalPositions: [3, 6, 9, 12], intermediateTotalLabels: ['Q1', 'Q2', 'Q3', 'Q4'],name:'Increase,Decrease,Total'}"&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartWaterfall</b> binding supports all read-write properties and events of
 * the {@link Waterfall} class.
 */
export declare class wjFlexChartWaterfall extends WjSeriesBase {
    _getControlConstructor(): any;
}
