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
* {@module wijmo.angular.chart.finance.analytics}
* AngularJS directives for wijmo.angular.chart.finance.analytics module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjSeriesBase } from 'wijmo/wijmo.angular.chart';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.chart.finance.analytics";
export declare class WjBaseOverlayIndicator extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
}
export declare class WjBaseSingleOverlayIndicator extends WjBaseOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link Fibonacci} object.
 *
 * The <b>wj-flex-chart-fibonacci</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
 *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                         data for this series.</dd>
 *   <dt>high</dt>         <dd><code>@</code> The high value of {@link Fibonacci} tool.</dd>
 *   <dt>labelPosition</dt> <dd><code>@</code> The label position for levels in {@link Fibonacci} tool.</dd>
 *   <dt>levels</dt>       <dd><code>@</code> The levels value of {@link Fibonacci} tool.</dd>
 *   <dt>low</dt>          <dd><code>@</code> The low value of {@link Fibonacci} tool.</dd>
 *   <dt>minX</dt>         <dd><code>@</code> The x minimum value of {@link Fibonacci} tool.</dd>
 *   <dt>maxX</dt>         <dd><code>@</code> The x maximum value of {@link Fibonacci} tool.</dd>
 *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
 *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
 *                         style object as an object. See the section on ngAttr attribute bindings in
 *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
 *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
 *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
 *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
 *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 *   <dt>uptrend</dt>      <dd><code>@</code> The value indicating whether to create uptrending {@link Fibonacci} tool.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartFibonacci extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
    _initControl(element: any): any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link FibonacciArcs} object.
 *
 * The <b>wj-flex-chart-fibonacci-arcs</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
 *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                         data for this series.</dd>
 *   <dt>labelPosition</dt> <dd><code>@</code> The {@link LabelPosition} for levels in {@link FibonacciArcs} tool.</dd>
 *   <dt>levels</dt>       <dd><code>@</code> The levels value of {@link FibonacciArcs} tool.</dd>
 *   <dt>start-x</dt>       <dd><code>@</code> The starting X value of {@link FibonacciArcs} tool.</dd>
 *   <dt>end-x</dt>         <dd><code>@</code> The ending X value of {@link FibonacciArcs} tool.</dd>
 *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
 *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
 *                         style object as an object. See the section on ngAttr attribute bindings in
 *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
 *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
 *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
 *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
 *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartFibonacciArcs extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
    _initControl(element: any): any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link FibonacciFans} object.
 *
 * The <b>wj-flex-chart-fibonacci-fans</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
 *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                         data for this series.</dd>
 *   <dt>labelPosition</dt> <dd><code>@</code> The {@link LabelPosition} for levels in {@link FibonacciFans} tool.</dd>
 *   <dt>levels</dt>       <dd><code>@</code> The levels value of {@link FibonacciFans} tool.</dd>
 *   <dt>start</dt>        <dd><code>@</code> The starting {@link DataPoint} of {@link FibonacciFans} tool.</dd>
 *   <dt>end</dt>          <dd><code>@</code> The ending {@link DataPoint} of {@link FibonacciFans} tool.</dd>
 *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
 *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
 *                         style object as an object. See the section on ngAttr attribute bindings in
 *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
 *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
 *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
 *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
 *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartFibonacciFans extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
    _initControl(element: any): any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link FibonacciTimeZones} object.
 *
 * The <b>wj-flex-chart-fibonacci-time-zones</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
 *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
 *                         data for this series.</dd>
 *   <dt>labelPosition</dt> <dd><code>@</code> The {@link LabelPosition} for levels in {@link FibonacciTimeZones} tool.</dd>
 *   <dt>levels</dt>       <dd><code>@</code> The levels value of {@link FibonacciTimeZones} tool.</dd>
 *   <dt>startX</dt>       <dd><code>@</code> The starting X value of {@link FibonacciTimeZones} tool.</dd>
 *   <dt>endX</dt>         <dd><code>@</code> The ending X value of {@link FibonacciTimeZones} tool.</dd>
 *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
 *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
 *                         style object as an object. See the section on ngAttr attribute bindings in
 *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
 *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
 *                         "http://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
 *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
 *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
 *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
 *                         display the series.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartFibonacciTimeZones extends WjSeriesBase {
    constructor();
    readonly _controlConstructor: any;
    _initControl(element: any): any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link ATR} object.
 *
 * The <b>wj-flex-chart-atr</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>period</dt>       <dd><code>@</code> The period for the average true range calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartAtr extends WjBaseSingleOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link CCI} object.
 *
 * The <b>wj-flex-chart-cci</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>period</dt>       <dd><code>@</code> The period for the commodity channel index calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartCci extends WjBaseSingleOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link RSI} object.
 *
 * The <b>wj-flex-chart-rsi</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>period</dt>       <dd><code>@</code> The period for the relative strength index calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartRsi extends WjBaseSingleOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link WilliamsR} object.
 *
 * The <b>wj-flex-chart-williams-r</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>period</dt>       <dd><code>@</code> The period for the Williams %R calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartWilliamsR extends WjBaseSingleOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
export declare class WjFlexChartMacdBase extends WjBaseOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link Macd} object.
 *
 * The <b>wj-flex-chart-macd</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>styles/dt>        <dd><code></code> The styles for the MACD and Signal lines.</dd>
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
 *   <dt>fast-period</dt>  <dd><code>@</code>  The fast moving average period for the MACD calculation.</dd>
 *   <dt>slow-period</dt>  <dd><code>@</code> The slow moving average period for the MACD calculation.</dd>
 *   <dt>signal-smoothing-period/dt>    <dd><code>@</code> The smoothing period for the MACD calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartMacd extends WjFlexChartMacdBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link MacdHistogram} object.
 *
 * The <b>wj-flex-chart-macd-histogram</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>fast-period</dt>  <dd><code>@</code>  The fast moving average period for the MACD calculation.</dd>
 *   <dt>slow-period</dt>  <dd><code>@</code> The slow moving average period for the MACD calculation.</dd>
 *   <dt>signal-smoothing-period/dt>    <dd><code>@</code> The smoothing period for the MACD calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartMacdHistogram extends WjFlexChartMacdBase {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link Stochastic} object.
 *
 * The <b>wj-flex-chart-stochastic</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>styles/dt>        <dd><code></code> The styles for the %K and %D lines.</dd>
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
 *   <dt>k-period</dt>     <dd><code>@</code>  The period for the %K calculation.</dd>
 *   <dt>d-period</dt>     <dd><code>@</code>  The period for the %D calculation.</dd>
 *   <dt>smoothing-period</dt>     <dd><code>@</code>  The smoothing period for the %K calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartStochastic extends WjBaseOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link BollingerBands} object.
 *
 * The <b>wj-flex-chart-bollinger-bands</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>period</dt>       <dd><code>@</code>  The period for the Bollinger Bands calculation.</dd>
 *   <dt>multiplier/dt>    <dd><code>@</code> The standard deviation multiplier for the Bollinger Bands calculation.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartBollingerBands extends WjBaseOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the {@link FinancialChart} {@link Envelopes} object.
 *
 * The <b>wj-flex-chart-envelopes</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
 *                         series. This value overrides any binding set for the chart.</dd>
 *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
 *                         series. This value overrides any binding set for the chart.</dd>
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
 *   <dt>period</dt>       <dd><code>@</code>  The period for the moving average envelopes calculation.</dd>
 *   <dt>size/dt>          <dd><code>@</code> The size of the moving average envelopes.</dd>
 *   <dt>type/dt>          <dd><code>@</code> The {@link MovingAverageType} of the moving average to be used for the envelopes.</dd>
 * </dl>
 *
 */
export declare class WjFlexChartEnvelopes extends WjBaseOverlayIndicator {
    constructor();
    readonly _controlConstructor: any;
}
