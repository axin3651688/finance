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
* {@module wijmo.knockout.chart}
* KnockoutJS bindings for wijmo.chart module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding, WjContext } from 'wijmo/wijmo.knockout.base';
export declare class WjFlexChartBaseBinding extends WjBinding {
    _getControlConstructor(): any;
    _initialize(): void;
}
/**
 * KnockoutJS binding for the {@link FlexChart} control.
 *
 * Use the {@link wjFlexChart} binding to add {@link FlexChart} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a FlexChart control:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: data }"&gt;
 *     &lt;div data-bind="wjFlexChartLegend : {
 *         position: 'Top' }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartAxis: {
 *         wjProperty: 'axisX',
 *         title: chartProps.titleX }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartAxis: {
 *         wjProperty: 'axisY',
 *         majorUnit: 5000 }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: {
 *         name: 'Sales',
 *         binding: 'sales' }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: {
 *         name: 'Expenses',
 *         binding: 'expenses' }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: {
 *         name: 'Downloads',
 *         binding: 'downloads',
 *         chartType: 'LineSymbols' }"&gt;
 *     &lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChart</b> binding may contain the following child bindings:
 * {@link wjFlexChartAxis}, {@link wjFlexChartSeries}, {@link wjFlexChartLegend}.
 *
 * The <b>wjFlexChart</b> binding supports all read-write properties and events of
 * the {@link FlexChart} control, and the additional <b>tooltipContent</b> property
 * that assigns a value to the <b>FlexChart.tooltip.content</b> property.
 * The <b>selection</b> property provides two-way binding mode.
 */
export declare class wjFlexChart extends WjFlexChartBaseBinding {
    _getControlConstructor(): any;
    _initialize(): void;
}
/**
 * KnockoutJS binding for the {@link FlexPie} control.
 *
 * Use the {@link wjFlexPie} binding to add {@link FlexPie} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a FlexPie control:&lt;/p&gt;
 * &lt;div data-bind="wjFlexPie: {
 *         itemsSource: data,
 *         binding: 'value',
 *         bindingName: 'name',
 *         header: 'Fruit By Value' }"&gt;
 *     &lt;div data-bind="wjFlexChartLegend : { position: 'Top' }"&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexPie</b> binding may contain the {@link wjFlexChartLegend} child binding.
 *
 * The <b>wjFlexPie</b> binding supports all read-write properties and events of
 * the {@link FlexPie} control.
 */
export declare class wjFlexPie extends WjFlexChartBaseBinding {
    _getControlConstructor(): any;
    _initialize(): void;
}
/**
 * KnockoutJS binding for the {@link FlexChart} {@link Axis} object.
 *
 * The {@link wjFlexChartAxis} binding must be contained in a {@link wjFlexChart} binding. Use the <b>wjProperty</b>
 * attribute to specify the property (<b>axisX</b> or <b>axisY</b>) to initialize with this binding.
 *
 * The <b>wjFlexChartAxis</b> binding supports all read-write properties and events of
 * the {@link Axis} class.
 */
export declare class wjFlexChartAxis extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the Charts' {@link Legend} object.
 *
 * The {@link wjFlexChartLegend} binding must be contained in one the following bindings:
 *  {@link wjFlexChart}, {@link wjFlexPie}.
 *
 * The <b>wjFlexChartLegend</b> binding supports all read-write properties and events of
 * the {@link Legend} class.
 */
export declare class wjFlexChartLegend extends WjBinding {
    _getControlConstructor(): any;
}
export declare class WjSeriesBase extends WjBinding {
    _getControlConstructor(): any;
    _createControl(element: any): any;
}
/**
 * KnockoutJS binding for the {@link FlexChart} {@link Series} object.
 *
 * The {@link wjFlexChartSeries} binding must be contained in a {@link wjFlexChart} binding.
 *
 * The <b>wjFlexChartSeries</b> binding supports all read-write properties and events of
 * the {@link Series} class. The <b>visibility</b> property provides two-way binding mode.
 */
export declare class wjFlexChartSeries extends WjSeriesBase {
    _getControlConstructor(): any;
    _createWijmoContext(): WjContext;
}
export declare class WjFlexChartSeriesContext extends WjContext {
    _initControl(): void;
}
/**
 * KnockoutJS binding for the {@link LineMarker} control.
 *
 * Use the {@link wjFlexChartLineMarker} binding to add {@link LineMarker} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a LineMarker:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Expenses', binding: 'expenses' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Downloads', binding: 'downloads' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartLineMarker: { interaction: 'Move', lines: 'Both' }"&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 *
 * The <b>wjFlexChartLineMarker</b> binding supports all read-write properties and events of
 * the {@link LineMarker} class.
 */
export declare class wjFlexChartLineMarker extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link PlotArea} object.
 *
 * Use the {@link wjFlexChartPlotArea} binding to add {@link PlotArea} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a PlotArea:&lt;/p&gt;
 * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartPlotArea: { row:0, name:'plot1', style:{ fill: 'rgba(136,189,230,0.2)'} }  "&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartPlotArea</b> binding supports all read-write properties and events of
 * the {@link PlotArea} class.
 */
export declare class wjFlexChartPlotArea extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link DataPoint} object.

    * The <b>wjFlexChartDataPoint</b> must be contained in a
    * {@link wjFlexChartAnnotation}. The property of the parent object
    * where <b>wjFlexChartDataPoint</b> should assign a value is specified in the
    * <b>wjProperty</b> attribute.
    *
    * Use the {@link wjFlexChartDataPoint} binding to add {@link DataPoint} object to your
    * KnockoutJS applications. For example:
    *
    * <pre>&lt;p&gt;Here is a DataPoint:&lt;/p&gt;
    *   &lt;div data-bind="wjFlexChartDataPoint: { wjProperty: 'point', x: 0.9, y:0.4}" &gt;&lt;/div&gt;
    *  </pre>
    *
    * The <b>wjFlexChartDataPoint</b> binding supports all read-write properties and events of
    * the {@link DataPoint} class.
    */
export declare class wjFlexChartDataPoint extends WjBinding {
    _getControlConstructor(): any;
}
