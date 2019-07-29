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
* {@module wijmo.angular.chart}
* AngularJS directives for wijmo.chart module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective } from 'wijmo/wijmo.angular.base';
import * as wjcChart from 'wijmo/wijmo.chart';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.chart";
export declare class WjFlexChartBase extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcChart.FlexChartBase;
    _initProps(): void;
}
export declare class WjFlexChartCore extends WjFlexChartBase {
    readonly _controlConstructor: typeof wjcChart.FlexChartCore;
    _initProps(): void;
}
/**
 * AngularJS directive for the {@link FlexChart} control.
 *
 * Use the <b>wj-flex-chart</b> directive to add charts to your AngularJS applications.
 * Note that directive and parameter names must be formatted using lower-case letters
 * with dashes instead of camel case. For example:
 *
 * <pre>&lt;p&gt;Here is a FlexChart control:&lt;/p&gt;
 * &lt;wj-flex-chart
 *   style="height:300px"
 *   items-source="data"
 *   binding-x="country"&gt;
 *   &lt;wj-flex-chart-axis
 *     wj-property="axisY"
 *     major-unit="5000"&gt;
 *   &lt;/wj-flex-chart-axis&gt;
 *   &lt;wj-flex-chart-series
 *     binding="sales"
 *     name="Sales"&gt;
 *   &lt;/wj-flex-chart-series&gt;
 *   &lt;wj-flex-chart-series
 *     binding="expenses"
 *     name="Expenses"&gt;
 *   &lt;/wj-flex-chart-series&gt;
 *   &lt;wj-flex-chart-series
 *     binding="downloads"
 *     name="Downloads"
 *     chart-type="LineSymbols"&gt;
 *   &lt;/wj-flex-chart-series&gt;
 * &lt;/wj-flex-chart&gt;</pre>
 *
 * The example below creates a {@link FlexChart} control and binds it to a 'data' array
 * exposed by the controller. The chart has three series objects, each corresponding to
 * a property in the objects contained in the source array. The last series in the
 * example uses the 'chart-type' attribute to override the default chart type used
 * for the other series objects.
 *
 * <a href="http://jsfiddle.net/Wijmo5/QNb9X/" target="_blank">Example</a>
 *
 * The wj-flex-chart directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>           <dd><code>@</code> The name of the property that contains Y
 *                              values for the chart. You can override this at the series level.</dd>
 *   <dt>binding-x</dt>         <dd><code>@</code> The name of the property that contains X
 *                              values for the chart. You can override this at the series level.</dd>
 *   <dt>chart-type</dt>        <dd><code>@</code> The default chart type to use in rendering series
 *                              objects. You can override this at the series level. See {@link ChartType}.</dd>
 *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link FlexChart} control
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
 *                              See <b>options</b> under {@link FlexChart} for details.</dd>
 *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
 *                              displaying each series.</dd>
 *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
 *                              edges of the control and the plot area, or CSS-style margins.</dd>
 *   <dt>rotated</dt>           <dd><code>@</code> The value indicating whether to flip the axes so that
 *                              X is vertical and Y is horizontal.</dd>
 *   <dt>selection</dt>         <dd><code>=</code> The series object that is selected.</dd>
 *   <dt>selection-mode</dt>    <dd><code>@</code> The {@link SelectionMode} value indicating whether or what is
 *                              selected when the user clicks a series.</dd>
 *   <dt>stacking</dt>          <dd><code>@</code> The {@link Stacking} value indicating whether or how series
 *                              objects are stacked or plotted independently.</dd>
 *   <dt>symbol-size</dt>       <dd><code>@</code> The size of the symbols used to render data points in Scatter,
 *                              LineSymbols, and SplineSymbols charts, in pixels. You can override
 *                              this at the series level.</dd>
 *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
 *                              {@link ChartTooltip} content property.</dd>
 *   <dt>got-focus</dt>         <dd><code>&</code> The {@link FlexChart.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link FlexChart.lostFocus} event handler.</dd>
 *   <dt>rendering</dt>         <dd><code>&</code> The {@link FlexChart.rendering} event handler.</dd>
 *   <dt>rendered</dt>          <dd><code>&</code> The {@link FlexChart.rendered} event handler.</dd>
 *   <dt>series-visibility-changed</dt>
 *                              <dd><code>&</code> The {@link FlexChart.seriesVisibilityChanged} event handler.</dd>
 *   <dt>selection-changed</dt> <dd><code>&</code> The {@link FlexChart.selectionChanged} event handler.</dd>
 * </dl>
 *
 * The wj-flex-chart directive may contain the following child directives:
 * {@link wijmo.angular.chart.WjFlexChartAxis}, {@link wijmo.angular.chart.WjFlexChartSeries}, {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexChartDataLabel}.
 */
export declare class WjFlexChart extends WjFlexChartCore {
    readonly _controlConstructor: typeof wjcChart.FlexChart;
}
/**
 * AngularJS directive for the {@link FlexChart} {@link Axis} object.
 *
 * The <b>wj-flex-chart-axis</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
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
 *                            (see {@link Globalize}).</dd>
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
 *   <dt>reversed</dt>        <dd><code>@</code> The value indicating whether the axis is reversed (top to
 *                            bottom or right to left).</dd>
 *   <dt>title</dt>           <dd><code>@</code> The title text shown next to the axis.</dd>
 * </dl>
 */
export declare class WjFlexChartAxis extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcChart.Axis;
    _initControl(element: any): any;
}
/**
 * AngularJS directive for the {@link FlexChart} {@link Legend} object.
 *
 * The <b>wj-flex-chart-legend</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive, {@link wijmo.angular.chart.WjFlexPie} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>position</dt>       <dd><code>@</code> The {@link Position} value indicating the position of the
 *                           legend.</dd>
 * </dl>
 *
 * The example below shows how you can use the wj-flex-chart-legend directive
 * to change the position of the chart legend:
 *
 * <pre>&lt;wj-flex-chart
 *   items-source="data"
 *   binding-x="country"&gt;
 *   &lt;wj-flex-chart-axis
 *       wj-property="axisY"
 *       major-unit="5000"&gt;
 *     &lt;/wj-flex-chart-axis&gt;
 *     &lt;wj-flex-chart-series
 *       binding="sales"
 *       name="Sales"&gt;
 *     &lt;/wj-flex-chart-series&gt;
 *   &lt;wj-flex-chart-legend
 *     position="Bottom"&gt;
 *   &lt;/wj-flex-chart-legend&gt;
 * &lt;/wj-flex-chart&gt;</pre>
 */
export declare class WjFlexChartLegend extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcChart.Legend;
}
export declare class WjFlexChartDataLabelBase extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcChart.DataLabelBase;
}
/**
 * AngularJS directive for the {@link FlexChart} {@link DataLabel} object.
 *
 * The <b>wj-flex-chart-data-label</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>content</dt>       <dd><code>=</code> A string or function that gets or sets the content of the data labels.</dd>
 *   <dt>border</dt>        <dd><code>@</code> Gets or sets a value indicating whether the data labels have borders.</dd>
 *   <dt>position</dt>      <dd><code>@</code> The {@link LabelPosition} value indicating the position of the data labels.</dd>
 * </dl>
 */
export declare class WjFlexChartDataLabel extends WjFlexChartDataLabelBase {
    constructor();
    readonly _controlConstructor: typeof wjcChart.DataLabel;
}
/**
 * AngularJS directive for the {@link FlexPie} {@link PieDataLabel} object.
 *
 * The <b>wj-flex-pie-data-label</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexPie} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>content</dt>       <dd><code>=</code> A string or function that gets or sets the content of the data labels.</dd>
 *   <dt>border</dt>        <dd><code>@</code> Gets or sets a value indicating whether the data labels have borders.</dd>
 *   <dt>position</dt>      <dd><code>@</code> The {@link PieLabelPosition} value indicating the position of the data labels.</dd>
 * </dl>
 */
export declare class WjFlexPieDataLabel extends WjFlexChartDataLabelBase {
    constructor();
    readonly _controlConstructor: typeof wjcChart.PieDataLabel;
}
export declare class WjSeriesBase extends WjDirective {
    constructor();
    readonly _controlConstructor: any;
    _initControl(element: any): any;
    _getId(): string;
}
/**
 * AngularJS directive for the {@link FlexChart} {@link Series} object.
 *
 * The <b>wj-flex-chart-series</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive.
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
 *                         {@link ChartType}.</dd>
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
 *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data points in this series
 *                         for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
 *                         This value overrides any settings at the chart level.</dd>
 *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
 *                         This value overrides any settings at the chart level.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 * </dl>
 *
 * In most cases, the <b>wj-flex-chart-series</b> specifies only the <b>name</b> and <b>binding</b> properties.
 * The remaining values are inherited from the parent <b>wj-flex-chart</b> directive.
 */
export declare class WjFlexChartSeries extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} {@link LineMarker} object.
 *
 * The <b>wj-flex-line-marker</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>is-visible</dt>             <dd><code>@</code> The value indicating whether the LineMarker is visible.</dd>
 *   <dt>series-index</dt>           <dd><code>@</code> The index of the series in the chart in which the LineMarker appears.</dd>
 *   <dt>horizontal-position</dt>    <dd><code>@</code> The horizontal position of the LineMarker relative to the plot area.</dd>
 *   <dt>content</dt>               <dd><code>@</code> The function that allows you to customize the text content of the LineMarker.</dd>
 *   <dt>vertical-position</dt>      <dd><code>@</code> The vertical position of the LineMarker relative to the plot area.</dd>
 *   <dt>alignment</dt>             <dd><code>@</code> The {@link LineMarkerAlignment} value indicating the alignment of the LineMarker content.</dd>
 *   <dt>lines</dt>                 <dd><code>@</code> The {@link LineMarkerLines} value indicating the appearance of the LineMarker's lines.</dd>
 *   <dt>interaction</dt>           <dd><code>@</code> The {@link LineMarkerInteraction} value indicating the interaction mode of the LineMarker.</dd>
 *   <dt>drag-threshold</dt>         <dd><code>@</code> The maximum distance from the horizontal or vertical line that you can drag the marker.</dd>
 *   <dt>drag-content</dt>           <dd><code>@</code> The value indicating whether you can drag the content of the marker when the interaction mode is "Drag".</dd>
 *   <dt>drag-lines</dt>             <dd><code>@</code> The value indicating whether the lines are linked when you drag the horizontal or vertical line when the interaction mode is "Drag".</dd>
 * </dl>
 */
export declare class WjFlexChartLineMarker extends WjDirective {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} {@link DataPoint} object.
 *
 * The <b>wj-flex-chart-data-point</b> directive must be contained in a
 * {@link:wijmo.angular.chart.annotation.WjFlexChartAnnotation} directive.
 * The property of the parent directive's object
 * where <b>wj-flex-data-point</b> should assign a value is specified in the
 * <b>wj-property</b> attribute.
 *
 * The directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *
 *   <dt>wj-property</dt>        <dd><code>@</code> The name of the parent directive object's property where the
 *                                <b>DataPoint</b> will be assigned.</dd>
 *   <dt>x</dt>                  <dd><code>@</code> x coordinate, can be a numeric or date value.</dd>
 *   <dt>y</dt>                  <dd><code>@</code> y coordinate, can be a numeric or date value.</dd>
 * </dl>
 */
export declare class WjFlexChartDataPoint extends WjDirective {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexPie} control.
 *
 * <dl class="dl-horizontal">
 *   <dt>items-source</dt>      <dd><code>=</code> An array or {@link ICollectionView}
 *                              object that contains data for the chart.</dd>
 *   <dt>binding</dt>           <dd><code>@</code> The name of the property that
 *                              contains item values.</dd>
 *   <dt>binding-name</dt>      <dd><code>@</code> The name of the property that
 *                              contains item names.</dd>
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
 *   <dt>inner-radius</dt>      <dd><code>@</code> The size of the hole inside the
 *                              pie, measured as a fraction of the pie radius.</dd>
 *   <dt>is-animated</dt>       <dd><code>@</code> A value indicating whether to use animation
 *                              to move selected items to the selectedItemPosition.</dd>
 *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
 *                              appearance of data points.</dd>
 *   <dt>offset</dt>            <dd><code>@</code> The extent to which pie slices are pulled
 *                              out from the center, as a fraction of the pie radius.</dd>
 *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
 *                              displaying pie slices.</dd>
 *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
 *                              edges of the control and the plot area, or CSS-style margins.</dd>
 *   <dt>reversed</dt>          <dd><code>@</code> A value indicating whether to draw pie
 *                              slices in a counter-clockwise direction.</dd>
 *   <dt>start-angle</dt>       <dd><code>@</code> The starting angle for pie slices,
 *                              measured clockwise from the 9 o'clock position.</dd>
 *   <dt>selected-item-offset</dt>
 *                              <dd><code>@</code> The extent to which the selected pie slice is
 *                              pulled out from the center, as a fraction of the pie radius.</dd>
 *   <dt>selected-item-position</dt>
 *                              <dd><code>@</code> The {@link Position} value indicating where to display
 *                              the selected slice.</dd>
 *   <dt>selection-mode</dt>    <dd><code>@</code> The {@link SelectionMode} value indicating whether or what is
 *                              selected when the user clicks a series.</dd>
 *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
 *                              {@link ChartTooltip} content property.</dd>
 *   <dt>got-focus</dt>         <dd><code>&</code> The {@link FlexPie.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link FlexPie.lostFocus} event handler.</dd>
 *   <dt>rendering</dt>         <dd><code>&</code> The {@link FlexPie.rendering} event handler.</dd>
 *   <dt>rendered</dt>          <dd><code>&</code> The {@link FlexPie.rendered} event handler.</dd>
 * </dl>
 *
 * The wj-flex-pie directive may contain the following child directives:
 * {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexPieDataLabel}.
 */
export declare class WjFlexPie extends WjFlexChartBase {
    readonly _controlConstructor: typeof wjcChart.FlexPie;
    _initProps(): void;
}
export declare class WjFlexChartPlotArea extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcChart.PlotArea;
    _initControl(element: any): any;
}
