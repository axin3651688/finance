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
* {@module wijmo.angular.chart.radar}
* AngularJS directives for wijmo.angular.chart.radar module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective } from 'wijmo/wijmo.angular.base';
import { WjFlexChartCore, WjSeriesBase } from 'wijmo/wijmo.angular.chart';
import * as wjcChartRadar from 'wijmo/wijmo.chart.radar';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.chart.radar";
/**
 * AngularJS directive for the {@link FlexRadar} control.
 *
 * Use the <b>wj-flex-radar</b> directive to add radar charts to your AngularJS applications.
 * Note that directive and parameter names must be formatted using lower-case letters
 * with dashes instead of camel case.
 *
 * The wj-flex-radar directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>           <dd><code>@</code> The name of the property that contains Y
 *                              values for the chart. You can override this at the series level.</dd>
 *   <dt>binding-x</dt>         <dd><code>@</code> The name of the property that contains X
 *                              values for the chart. You can override this at the series level.</dd>
 *   <dt>chart-type</dt>        <dd><code>@</code> The default chart type to use in rendering series
 *                              objects. You can override this at the series level. See {@link RadarChartType}.</dd>
 *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link FlexRadar} control
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
 *   <dt>options</dt>           <dd><code>=</code> Chart {@link FlexChart.options} that only apply to certain
 *                              chart types.</dd>
 *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
 *                              displaying each series.</dd>
 *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
 *                              edges of the control and the plot area, or CSS-style margins.</dd>
 *   <dt>stacking</dt>          <dd><code>@</code> The {@link Stacking} value indicating whether or how series
 *                              objects are stacked or plotted independently.</dd>
 *   <dt>reversed</dt>          <dd><code>@</code> The {@link FlexRadar.reversed} value indicating whether angles are reversed
 *                              (counter-clockwise).</dd>
 *   <dt>startAngle</dt>        <dd><code>@</code> The {@link FlexRadar.startAngle} value indicating the starting angle for the radar in degrees.</dd>
 *   <dt>totalAngle</dt>        <dd><code>@</code> The {@link FlexRadar.totalAngle} value indicating the total angle for the radar in degrees.</dd>
 *   <dt>symbol-size</dt>       <dd><code>@</code> The size of the symbols used to render data points in Scatter,
 *                              LineSymbols, and SplineSymbols charts, in pixels. You can override
 *                              this at the series level.</dd>
 *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
 *                              {@link ChartTooltip} content property.</dd>
 *   <dt>rendering</dt>         <dd><code>&</code> The {@link FlexRadar.rendering} event handler.</dd>
 *   <dt>rendered</dt>          <dd><code>&</code> The {@link FlexRadar.rendered} event handler.</dd>
 *   <dt>series-visibility-changed</dt>
 *                              <dd><code>&</code> The {@link FlexRadar.seriesVisibilityChanged} event handler.</dd>
 * </dl>
 *
 * The wj-flex-radar directive may contain the following child directives:
 * {@link wijmo.angular.chart.WjFlexChartAxis}, {@link wijmo.angular.chart.radar.WjFlexRadarSeries}, {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexChartDataLabel}.
 */
export declare class WjFlexRadar extends WjFlexChartCore {
    readonly _controlConstructor: typeof wjcChartRadar.FlexRadar;
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
export declare class WjFlexRadarSeries extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexRadar} {@link FlexRadarAxis} {@link Axis} object.
 *
 * The <b>wj-flex-radar-axis</b> directive must be contained in a {@link wijmo.angular.chart.radar.WjFlexRadar} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>wj-property</dt>     <dd><code>@</code> Defines the {@link FlexChart} property name,
 *                            axis-x or axis-y, to initialize with the directive.</dd>
 *   <dt>axis-line</dt>       <dd><code>@</code> The value indicating whether the axis line is visible.</dd>
 *   <dt>binding</dt>         <dd><code>@</code> Gets or sets the comma-separated property names for
 *                            the {@link wijmo.chart.Axis.itemsSource} property to use in axis labels.
 *                            The first name specifies the value on the axis, the second represents
 *                            the corresponding axis label. The default value is 'value,text'.</dd>
 *   <dt>format</dt>          <dd><code>@</code> The format string used for the axis labels
 *                            (see {@link wijmo.Globalize}).</dd>
 *   <dt>item-formatter</dt>  <dd><code>=</code> The formatter function that customizes the
 *                            appearance of axis labels.</dd>
 *   <dt>items-source</dt>    <dd><code>=</code> The items source for the axis labels.</dd>
 *   <dt>labels</dt>          <dd><code>@</code> The value indicating whether the axis labels are visible.</dd>
 *   <dt>label-angle</dt>     <dd><code>@</code> The rotation angle of axis labels in degrees.</dd>
 *   <dt>label-align</dt>     <dd><code>@</code> The alignment of axis labels.</dd>
 *   <dt>label-padding</dt>   <dd><code>@</code> The padding of axis labels.</dd>
 *   <dt>major-grid</dt>      <dd><code>@</code> The value indicating whether the axis includes grid lines.</dd>
 *   <dt>major-tick-marks</dt><dd><code>@</code> Defines the appearance of tick marks on the axis
 *                            (see {@link TickMark}).</dd>
 *   <dt>major-unit</dt>      <dd><code>@</code> The number of units between axis labels.</dd>
 *   <dt>max</dt>             <dd><code>@</code> The minimum value shown on the axis.</dd>
 *   <dt>min</dt>             <dd><code>@</code> The maximum value shown on the axis.</dd>
 *   <dt>minor-grid</dt>      <dd><code>@</code> The value indicating whether the axis includes minor grid lines.</dd>
 *   <dt>minor-tick-marks</dt><dd><code>@</code> Defines the appearance of minor tick marks on the axis
 *                            (see {@link TickMark}).</dd>
 *   <dt>minor-unit</dt>      <dd><code>@</code> The number of units between minor axis ticks.</dd>
 *   <dt>origin</dt>          <dd><code>@</code> The axis origin.</dd>
 *   <dt>overlappingLabels</dt><dd><code>@</code> The {@link OverlappingLabels} value indicating how to handle the overlapping axis labels.</dd>
 *   <dt>position</dt>        <dd><code>@</code> The {@link Position} value indicating the position of the axis.</dd>
 *   <dt>title</dt>           <dd><code>@</code> The title text shown next to the axis.</dd>
 * </dl>
 */
export declare class WjFlexRadarAxis extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcChartRadar.FlexRadarAxis;
    _initControl(element: any): any;
}
