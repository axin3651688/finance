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
 * {@module wijmo.vue2.chart}
 * Wijmo interop module for
 * <a href="https://vuejs.org/2016/04/27/announcing-2.0/" target="_blank">Vue 2</a>.
 *
 * This module provides Vue 2 components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the Vue 2
 * framework (RC6 or later), as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to Vue pages, include the appropriate
 * tags in your HTML files. For example, the code below adds
 * an {@link InputNumber} control to a Vue page:
 *
 * ```html
 * <wj-input-number
 *   format="c2"
 *   placeholder="Sales"
 *   :value="sales"
 *   :value-changed="salesChanged"
 *   :min="0"
 *   :max="10000"
 *   :step="100"
 *   :is-required="false">
 * </wj-input-number>
 * ```
 *
 * ```typescript
 * // Wijmo event handler
 * // update "sales" value to match the InputNumber value
 * function salesChanged(sender, eventArgs) {
 *   this.sales = sender.value;
 * }
 * ```
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "wj" prefix, followed by
 *      the control name using lower-case and hyphen separators.</li>
 *   <li>
 *      The tag attribute names match the control's properties and events.</li>
 *   <li>
 *      Colons before attribute names indicate the attribute value should be
 *      interpreted as JavaScript expressions (e.g. <code>:min="0"</code>).</li>
 *   <li>
 *      Event handlers are specified the same way as regular properties
 *      (e.g. <code>:value-changed="salesChanged"</code>).</li>
 *   <li>
 *      In Vue2, all bindings are one-way. In the example above, the "salesChanged"
 *      event handler is responsible for updating the value of the "sales"
 *      property in the model. This is a change from Vue 1, where two-way bindings
 *      could be created by adding the ".sync" suffix to any attribute.</li>
 * </ol>
 *
 * All Wijmo Vue components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;wj-flex-grid :initialized="initGrid"&gt;
 * &lt;/wj-flex-grid&gt;</pre>

 * <pre>// Vue application
 * var app = new Vue({
 *   el: '#app',
 *   methods: {
 *     initGrid: function(s, e) {
 *       // assign a custom MergeManager to the grid
 *       s.mergeManager = new CustomMergeManager(s);
 *     }
 *   }
 * });</pre>
 */
/**
 *
 */
export declare var ___keepComment: any;
export declare var Vue: any;
/**
 * Vue component that encapsulates the {@link wijmo.chart.FlexChart} control.
 *
 * The example below shows how to instantiate and initialize a
 * {@link wijmo.chart.FlexChart} control using Vue markup:
 *
 * <pre>&lt;wj-flex-chart
 *     :items-source="data"
 *     binding-x="country"
 *     :header="props.header"
 *     :footer="props.footer"&gt;
 *
 *     &lt;wj-flex-chart-legend :position="props.legendPosition"&gt;
 *     &lt;/wj-flex-chart-legend&gt;
 *     &lt;wj-flex-chart-axis wj-property="axisX" :title="props.titleX"&gt;
 *     &lt;/wj-flex-chart-axis&gt;
 *     &lt;wj-flex-chart-axis wj-property="axisY" :title="props.titleY"&gt;
 *     &lt;/wj-flex-chart-axis&gt;
 *
 *     &lt;wj-flex-chart-series name="Sales" binding="sales"&gt;
 *     &lt;/wj-flex-chart-series&gt;
 *     &lt;wj-flex-chart-series name="Expenses" binding="expenses"&gt;
 *     &lt;/wj-flex-chart-series&gt;
 *     &lt;wj-flex-chart-series name="Downloads" binding="downloads"&gt;
 *     &lt;/wj-flex-chart-series&gt;
 * &lt;/wj-flex-chart&gt;</pre>
 *
 * The code sets the <b>itemsSource</b> property to a collection that contains the chart
 * data and the <b>bindingX</b> property to the data property that contains the chart X values.
 * It also sets the chart's <b>header</b> and <b>footer</b> properties to define titles to
 * show above and below the chart.
 *
 * The <b>wj-flex-chart-legend</b> and <b>wj-flex-chart-axis</b> components are used to
 * customize the chart's legend and axes.
 *
 * Finally, three <b>wj-flex-chart-series</b> components are used to specify the data
 * properties to be shown on the chart.
 */
export declare var WjFlexChart: any;
/**
 * Vue component that encapsulates the {@link wijmo.chart.FlexPie} control.
 */
export declare var WjFlexPie: any;
/**
 * Vue component that represents a {@link wijmo.chart.Axis} in one of the following components:
 * {@link wijmo.vue2.chart.WjFlexChart}
 * , {@link wijmo.vue2.chart.WjFlexChartSeries}
 * , {@link wijmo.vue2.chart.finance.WjFinancialChart}
 *  or {@link wijmo.vue2.chart.finance.WjFinancialChartSeries}.
 */
export declare var WjFlexChartAxis: any;
/**
 * Vue component that represents a {@link wijmo.chart.Legend} in one of the following components:
 * {@link wijmo.vue2.chart.WjFlexChart}
 * , {@link wijmo.vue2.chart.WjFlexPie}
 * , {@link wijmo.vue2.chart.finance.WjFinancialChart}
 * , {@link wijmo.vue2.chart.radar.WjFlexRadar}
 *  or {@link wijmo.vue2.chart.hierarchical.WjSunburst}.
 */
export declare var WjFlexChartLegend: any;
/**
 * Vue component that represents a {@link wijmo.chart.DataLabel} in a {@link wijmo.vue2.chart.WjFlexChart}.
 */
export declare var WjFlexChartDataLabel: any;
/**
 * Vue component that represents a {@link wijmo.chart.PieDataLabel} in a {@link wijmo.vue2.chart.WjFlexPie}.
 */
export declare var WjFlexPieDataLabel: any;
/**
 * Vue component that represents a {@link wijmo.chart.Series} in a {@link wijmo.vue2.chart.WjFlexChart}.
 */
export declare var WjFlexChartSeries: any;
/**
 * Vue component that represents a {@link wijmo.chart.LineMarker} in one of the following components:
 * {@link wijmo.vue2.chart.WjFlexChart}
 *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
 */
export declare var WjFlexChartLineMarker: any;
/**
 * Vue component that represents a {@link wijmo.chart.DataPoint} in one of the following components:
 * {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationText}
 * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationEllipse}
 * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationRectangle}
 * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLine}
 * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationPolygon}
 * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationCircle}
 * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationSquare}
 *  or {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationImage}.
 */
export declare var WjFlexChartDataPoint: any;
/**
 * Vue component that represents a {@link wijmo.chart.PlotArea} in one of the following components:
 * {@link wijmo.vue2.chart.WjFlexChart}
 *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
 */
export declare var WjFlexChartPlotArea: any;
