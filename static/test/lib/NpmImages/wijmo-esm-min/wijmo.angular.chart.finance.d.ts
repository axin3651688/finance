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
* {@module wijmo.angular.chart.finance}
* AngularJS directives for wijmo.angular.chart.finance module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjSeriesBase, WjFlexChartCore } from 'wijmo/wijmo.angular.chart';
import * as wjcChartFinance from 'wijmo/wijmo.chart.finance';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.chart.finance";
/**
 * AngularJS directive for the {@link FinancialChart} control.
 *
 * Use the <b>wj-financial-chart</b> directive to add financial charts to your AngularJS applications.
 * Note that directive and parameter names must be formatted using lower-case letters
 * with dashes instead of camel case.
 *
 * The wj-financial-chart directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>           <dd><code>@</code> The name of the property that contains Y
 *                              values for the chart. You can override this at the series level.</dd>
 *   <dt>binding-x</dt>         <dd><code>@</code> The name of the property that contains X
 *                              values for the chart. You can override this at the series level.</dd>
 *   <dt>chart-type</dt>        <dd><code>@</code> The default chart type to use in rendering series
 *                              objects. You can override this at the series level. See {@link FinancialChartType}.</dd>
 *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link FinancialChart} control
 *                              that this directive creates.</dd>
 *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
 *                              text).</dd>
 *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
 *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
 *                              text).</dd>
 *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
 *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
 *                              initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished
 *                              initializing the control with attribute values. </dd>
 *   <dt>interpolate-nulls</dt> <dd><code>@</code> The value indicating whether to interpolate or
 *                              leave gaps when there are null values in the data.</dd>
 *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
 *                              appearance of data points.</dd>
 *   <dt>items-source</dt>      <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                              the data used to create the chart.</dd>
 *   <dt>legend-toggle</dt>     <dd><code>@</code> The value indicating whether clicking legend items
 *                              toggles series visibility.</dd>
 *   <dt>options</dt>           <dd><code>=</code> Chart options that only apply to certain chart types.
 *                              See <b>options</b> under {@link FinancialChart} for details.</dd>
 *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
 *                              displaying each series.</dd>
 *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
 *                              edges of the control and the plot area, or CSS-style margins.</dd>
 *   <dt>selection</dt>         <dd><code>=</code> The series object that is selected.</dd>
 *   <dt>selection-mode</dt>    <dd><code>@</code> The {@link SelectionMode} value indicating whether or what is
 *                              selected when the user clicks a series.</dd>
 *   <dt>symbol-size</dt>       <dd><code>@</code> The size of the symbols used to render data
 *                              points in Scatter, LineSymbols, and SplineSymbols charts, in pixels. You can override
 *                              this at the series level.</dd>
 *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
 *                              {@link ChartTooltip} content property.</dd>
 *   <dt>got-focus</dt>         <dd><code>&</code> The {@link FinancialChart.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link FinancialChart.lostFocus} event handler.</dd>
 *   <dt>rendering</dt>         <dd><code>&</code> The {@link FinancialChart.rendering} event handler.</dd>
 *   <dt>rendered</dt>          <dd><code>&</code> The {@link FinancialChart.rendered} event handler.</dd>
 *   <dt>series-visibility-changed</dt>
 *                              <dd><code>&</code> The {@link FinancialChart.seriesVisibilityChanged} event handler.</dd>
 *   <dt>selection-changed</dt> <dd><code>&</code> The {@link FinancialChart.selectionChanged} event handler.</dd>
 * </dl>
 *
 * The wj-financial-chart directive may contain the following child directives:
 * {@link wijmo.angular.chart.WjFlexChartAxis}, {@link wijmo.angular.chart.WjFlexChartSeries}, {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexChartDataLabel}.
 */
export declare class WjFinancialChart extends WjFlexChartCore {
    readonly _controlConstructor: typeof wjcChartFinance.FinancialChart;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link FinancialSeries} object.
 *
 * The <b>wj-financial-chart-series</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>axis-x</dt>       <dd><code>@</code> X-axis for the series.</dd>
 *   <dt>axis-y</dt>       <dd><code>@</code> Y-axis for the series.</dd>
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
 *                         objects. This value overrides the default chart type set on the chart. See
 *                         {@link FinancialChartType}.</dd>
 *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
 *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                         data for this series.</dd>
 *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
 *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
 *                         style object as an object. See the section on ngAttr attribute bindings in
 *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
 *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
 *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
 *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
 *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
 *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
 *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
 *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data points in this
 *                         series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
 *                         This value overrides any setting at the chart level.</dd>
 *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
 *                         This value overrides any setting at the chart level.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 * </dl>
 *
 * In most cases, the <b>wj-financial-chart-series</b> specifies the <b>name</b> and <b>binding</b> properties only.
 * The remaining values are inherited from the parent <b>wj-financial-chart</b> directive.
 */
export declare class WjFinancialChartSeries extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
}
