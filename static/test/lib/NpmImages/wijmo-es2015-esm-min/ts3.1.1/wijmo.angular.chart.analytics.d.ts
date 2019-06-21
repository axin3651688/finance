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
* {@module wijmo.angular.chart.analytics}
* AngularJS directives for wijmo.angular.chart.analytics module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjSeriesBase, WjFlexChartSeries } from 'wijmo/wijmo.angular.chart';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.chart.analytics";
export declare class WjTrendLineBase extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link TrendLine} object.
 *
 * The <b>wj-flex-chart-trend-line</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
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
 *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
 *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
 *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
 *                         This value overrides any setting at the chart level.</dd>
 *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
 *                         This value overrides any setting at the chart level.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
 *   <dt>fit-type</dt>     <dd><code>@</code> The {@link TrendLineFitType} value for the trend line.</dd>
 *   <dt>order</dt>        <dd><code>@</code> The number of terms in a polynomial or fourier equation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartTrendLine extends WjTrendLineBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link MovingAverage} object.
 *
 * The <b>wj-flex-chart-moving-average</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
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
 *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
 *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
 *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
 *                         This value overrides any set at the chart level.</dd>
 *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
 *                         This value overrides any setting at the chart level.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 *   <dt>type</dt>         <dd><code>@</code> The {@link MovingAverageType} value for the moving average series.</dd>
 *   <dt>period</dt>       <dd><code>@</code> The period for the moving average calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartMovingAverage extends WjTrendLineBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link YFunctionSeries} object.
 *
 * The <b>wj-flex-chart-y-function-series</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
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
 *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
 *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
 *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
 *                         This value overrides any set at the chart level.</dd>
 *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
 *                         This value overrides any setting at the chart level.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
 *   <dt>min</dt>       <dd><code>@</code> The minimum value of the parameter for calculating a function.</dd>
 *   <dt>max</dt>       <dd><code>@</code> The maximum value of the parameter for calculating a function.</dd>
 *   <dt>func</dt>       <dd><code>@</code> The function used to calculate Y value.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartYFunctionSeries extends WjTrendLineBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link wijmo.angular.chart.analytics.WjFlexChartParametricFunctionSeries} object.
 *
 * The <b>wj-flex-chart-parametric-function-series</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
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
 *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
 *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
 *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
 *                         This value overrides any set at the chart level.</dd>
 *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
 *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
 *                         This value overrides any setting at the chart level.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
 *   <dt>min</dt>       <dd><code>@</code> The minimum value of the parameter for calculating a function.</dd>
 *   <dt>max</dt>       <dd><code>@</code> The maximum value of the parameter for calculating a function.</dd>
 *   <dt>x-func</dt>       <dd><code>@</code> The function used to calculate the x value.</dd>
 *   <dt>y-func</dt>       <dd><code>@</code> The function used to calculate the y value.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartParametricFunctionSeries extends WjTrendLineBase {
    constructor();
    readonly _controlConstructor: any;
    _initProps(): void;
}
/**
 * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link Waterfall} object.
 *
 * The <b>wj-flex-chart-waterfall</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                         data for this series.</dd>
 *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 *   <dt>relative-data</dt> <dd><code>@</code> The value that determines whether the given data is relative.</dd>
 *   <dt>start</dt>        <dd><code>@</code> The value of the start bar.</dd>
 *   <dt>start-label</dt>  <dd><code>@</code> The label of the start bar.</dd>
 *   <dt>show-total</dt>   <dd><code>@</code> The value that determines whether the show the total bar.</dd>
 *   <dt>total-label</dt>  <dd><code>@</code> The label of the total bar.</dd>
 *   <dt>show-intermediate-total</dt>      <dd><code>@</code> The value that determines whether to show the intermediate total bar.</dd>
 *   <dt>intermediate-total-positions</dt> <dd><code>@</code> The value that contains the index for positions of the intermediate total bar.</dd>
 *   <dt>intermediate-total-labels</dt>    <dd><code>@</code> The value that contains the label of the intermediate total bar.</dd>
 *   <dt>connector-lines</dt>  <dd><code>@</code> The value that determines whether to show connector lines.</dd>
 *   <dt>styles</dt>       <dd><code>@</code> The value of the waterfall styles.</dd>
 * </dl>
 */
export declare class WjFlexChartWaterfall extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link BoxWhisker} object.
 *
 * The <b>wj-flex-chart-box-whisker</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                         data for this series.</dd>
 *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 *   <dt>quartile-calculation</dt> <dd><code>@</code> The value that specifies the quartile calculation for the Box&Whisker chart.</dd>
 *   <dt>group-width</dt>        <dd><code>@</code> The value that determines the group width as a percentage for the Box&Whisker chart.</dd>
 *   <dt>gap-width</dt>  <dd><code>@</code> The value that determines the gap width as a percentage for the Box&Whisker chart.</dd>
 *   <dt>show-mean-line</dt>   <dd><code>@</code> The value that determines whether to show the mean line for the Box&Whisker chart.</dd>
 *   <dt>mean-line-style</dt>  <dd><code>@</code> The value that specifies the style for the mean line.</dd>
 *   <dt>show-mean-marker</dt>      <dd><code>@</code> The value that determines whether to show the mean marker for the Box&Whisker chart.</dd>
 *   <dt>mean-marker-style</dt> <dd><code>@</code> The value that specifies the style for the mean marker.</dd>
 *   <dt>show-inner-points</dt>    <dd><code>@</code> The value that determines whether to show the inner points for the Box&Whisker chart.</dd>
 *   <dt>show-outliers</dt>  <dd><code>@</code> The value that determines whether to show the outliers for the Box&Whisker chart.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartBoxWhisker extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FlexChart} {@link ErrorBar} object.
 *
 * The <b>wj-flex-chart-error-bar</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                         data for this series.</dd>
 *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 *   <dt>error-bar-style</dt> <dd><code>@</code> The value that specifies the ErrorBar style.</dd>
 *   <dt>value</dt>        <dd><code>@</code> The value that specifies the error value of the series.</dd>
 *   <dt>error-amount</dt>  <dd><code>@</code> The value that specifies the error amount of the series.</dd>
 *   <dt>end-style</dt>   <dd><code>@</code> The value that specifies the end style of the series.</dd>
 *   <dt>direction</dt>  <dd><code>@</code> The value that specifies the direction of the series.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartErrorBar extends WjFlexChartSeries {
    constructor();
    readonly _controlConstructor: any;
}
