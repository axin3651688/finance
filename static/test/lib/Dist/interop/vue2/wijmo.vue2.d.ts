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
declare module wijmo.vue2 {
    var WjVueBase: any;
    class WjComponentBehavior {
        static tag: string;
        static render: (createElement: () => any) => any;
        static className: string;
        static classCtor: () => any;
        static parentProp: string;
        static parentInCtor: boolean;
        static siblingId: string;
        static data: any;
        static extraProps: string[];
        private static readonly _typeSiblingIdAttr;
        static readonly _behClassProp = "_wjBehCl";
        static readonly _behProp = "__wjBeh";
        private static _siblingDirId;
        private _siblingId;
        private _isMounted;
        private _mountedCBs;
        private _siblingInsertedEH;
        readonly component: any;
        control: any;
        parent: WjComponentBehavior;
        ['constructor']: typeof WjComponentBehavior;
        static _attach(component: any): WjComponentBehavior;
        static register(): any;
        constructor(component: any);
        lhMounted(): void;
        lhDestroyed(): void;
        protected _createControl(): any;
        protected _initParent(): void;
        protected _updateControl(property: string, newValue: any): void;
        private _prepareControl;
        private _isChild;
        private _isParentInCtor;
        private _getParentProp;
        private _getSiblingIndex;
        private _siblingInserted;
        private _getElement;
        private static _getControlType;
        _mountedCB(cb: () => void): void;
    }
    function _getProps(ctlClass: string, extraProps?: string[]): string[];
    function _initialize(component: any, ctl: any): any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that represents a {@link wijmo.chart.analytics.TrendLine} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartTrendLine: any;
    /**
     * Vue component that represents a {@link wijmo.chart.analytics.MovingAverage} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartMovingAverage: any;
    /**
     * Vue component that represents a {@link wijmo.chart.analytics.YFunctionSeries} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartYFunctionSeries: any;
    /**
     * Vue component that represents a {@link wijmo.chart.analytics.ParametricFunctionSeries} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartParametricFunctionSeries: any;
    /**
     * Vue component that represents a {@link wijmo.chart.analytics.Waterfall} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartWaterfall: any;
    /**
     * Vue component that represents a {@link wijmo.chart.analytics.BoxWhisker} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartBoxWhisker: any;
    /**
     * Vue component that represents a {@link wijmo.chart.analytics.ErrorBar} in a {@link wijmo.vue2.chart.WjFlexChart}.
     */
    var WjFlexChartErrorBar: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that represents a {@link wijmo.chart.animation.ChartAnimation} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     * , {@link wijmo.vue2.chart.WjFlexPie}
     * , {@link wijmo.vue2.chart.finance.WjFinancialChart}
     *  or {@link wijmo.vue2.chart.radar.WjFlexRadar}.
     */
    var WjFlexChartAnimation: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.AnnotationLayer} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartAnnotationLayer: any;
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.Text} in a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}.
     */
    var WjFlexChartAnnotationText: any;
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.Ellipse} in a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}.
     */
    var WjFlexChartAnnotationEllipse: any;
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.Rectangle} in a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}.
     */
    var WjFlexChartAnnotationRectangle: any;
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.Line} in a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}.
     */
    var WjFlexChartAnnotationLine: any;
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.Polygon} in a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}.
     */
    var WjFlexChartAnnotationPolygon: any;
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.Circle} in a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}.
     */
    var WjFlexChartAnnotationCircle: any;
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.Square} in a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}.
     */
    var WjFlexChartAnnotationSquare: any;
    /**
     * Vue component that represents a {@link wijmo.chart.annotation.Image} in a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}.
     */
    var WjFlexChartAnnotationImage: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.Fibonacci} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartFibonacci: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.FibonacciArcs} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartFibonacciArcs: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.FibonacciFans} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartFibonacciFans: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.FibonacciTimeZones} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartFibonacciTimeZones: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.ATR} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartAtr: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.CCI} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartCci: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.RSI} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartRsi: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.WilliamsR} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartWilliamsR: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.Macd} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartMacd: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.MacdHistogram} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartMacdHistogram: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.Stochastic} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartStochastic: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.BollingerBands} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartBollingerBands: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.analytics.Envelopes} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartEnvelopes: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.chart.finance.FinancialChart} control.
     */
    var WjFinancialChart: any;
    /**
     * Vue component that represents a {@link wijmo.chart.finance.FinancialSeries} in a {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFinancialChartSeries: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.chart.hierarchical.Sunburst} control.
     */
    var WjSunburst: any;
    /**
     * Vue component that encapsulates the {@link wijmo.chart.hierarchical.TreeMap} control.
     */
    var WjTreeMap: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that represents a {@link wijmo.chart.interaction.RangeSelector} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartRangeSelector: any;
    /**
     * Vue component that represents a {@link wijmo.chart.interaction.ChartGestures} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartGestures: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.chart.radar.FlexRadar} control.
     */
    var WjFlexRadar: any;
    /**
     * Vue component that represents a {@link wijmo.chart.radar.FlexRadarAxis} in one of the following components:
     * {@link wijmo.vue2.chart.radar.WjFlexRadar}
     *  or {@link wijmo.vue2.chart.radar.WjFlexRadarSeries}.
     */
    var WjFlexRadarAxis: any;
    /**
     * Vue component that represents a {@link wijmo.chart.radar.FlexRadarSeries} in a {@link wijmo.vue2.chart.radar.WjFlexRadar}.
     */
    var WjFlexRadarSeries: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
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
    var WjFlexChart: any;
    /**
     * Vue component that encapsulates the {@link wijmo.chart.FlexPie} control.
     */
    var WjFlexPie: any;
    /**
     * Vue component that represents a {@link wijmo.chart.Axis} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     * , {@link wijmo.vue2.chart.WjFlexChartSeries}
     * , {@link wijmo.vue2.chart.finance.WjFinancialChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChartSeries}.
     */
    var WjFlexChartAxis: any;
    /**
     * Vue component that represents a {@link wijmo.chart.Legend} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     * , {@link wijmo.vue2.chart.WjFlexPie}
     * , {@link wijmo.vue2.chart.finance.WjFinancialChart}
     * , {@link wijmo.vue2.chart.radar.WjFlexRadar}
     *  or {@link wijmo.vue2.chart.hierarchical.WjSunburst}.
     */
    var WjFlexChartLegend: any;
    /**
     * Vue component that represents a {@link wijmo.chart.DataLabel} in a {@link wijmo.vue2.chart.WjFlexChart}.
     */
    var WjFlexChartDataLabel: any;
    /**
     * Vue component that represents a {@link wijmo.chart.PieDataLabel} in a {@link wijmo.vue2.chart.WjFlexPie}.
     */
    var WjFlexPieDataLabel: any;
    /**
     * Vue component that represents a {@link wijmo.chart.Series} in a {@link wijmo.vue2.chart.WjFlexChart}.
     */
    var WjFlexChartSeries: any;
    /**
     * Vue component that represents a {@link wijmo.chart.LineMarker} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartLineMarker: any;
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
    var WjFlexChartDataPoint: any;
    /**
     * Vue component that represents a {@link wijmo.chart.PlotArea} in one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     */
    var WjFlexChartPlotArea: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that includes a given HTML fragment into the document.
     *
     * The <b>wj-include</b> component takes a <b>src</b> attribute that
     * specifies a file to load and include into the document. For example:
     *
     * <pre>&lt;wj-popup control="modalDialog" :modal="true" :hide-trigger="None"&gt;
     *   &lt;wj-include src="includes/dialog.htm"&gt;&lt;/wj-include&gt;
     * &lt;/wj-popup&gt;</pre>
     */
    var WjInclude: any;
    /**
     * Vue filter that applies globalized formatting to dates and numbers.
     *
     * For example, the code below uses the <b>wj-format</b> filter to format
     * a number as a currency value and a date as a short date using the
     * current Wijmo culture:
     *
     * <pre>&lt;p&gt;value: {&#8203;{ theAmount | wj-format('c') }}&lt;/p&gt;
     * &lt;p&gt;date: {&#8203;{ theDate | wj-format('d') }}&lt;/p&gt;</pre>
     */
    var WjFormat: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.gauge.LinearGauge} control.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.LinearGauge} control using Vue markup:
     *
     * <pre>&lt;wj-linear-gauge
     *     :min="0" :max="1000" :step="50" :is-read-only="false"
     *     format="c0" :thumb-size="20"
     *     :show-ranges="false"
     *     :value="sales"
     *     :value-changed="salesChanged"&gt;
     *     &lt;wj-range wj-property="face" :thickness="0.5"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range wj-property="pointer" :thickness="0.5"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="0" :max="333" color="red"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="333" :max="666" color="gold"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="666" :max="1000" color="green"&gt;
     *     &lt;/wj-range&gt;
     * &lt;/wj-linear-gauge&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it binds the gauge's <b>value</b> property to a <b>sales</b> variable
     * in the controller.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    var WjLinearGauge: any;
    /**
     * Vue component that encapsulates the {@link wijmo.gauge.BulletGraph} control.
     */
    var WjBulletGraph: any;
    /**
     * Vue component that encapsulates the {@link wijmo.gauge.RadialGauge} control.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.RadialGauge} control using Vue markup:
     *
     * <pre>&lt;wj-radial-gauge
     *     :min="0" :max="1000" :step="50" :is-read-only="false"
     *     format="c0" :thumb-size="12" :show-text="Value"
     *     :show-ranges="false"
     *     :value="sales"
     *     :value-changed="salesChanged"&gt;
     *     &lt;wj-range wj-property="face" :thickness="0.5"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range wj-property="pointer" :thickness="0.5"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="0" :max="333" color="red"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="333" :max="666" color="gold"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="666" :max="1000" color="green"&gt;
     *     &lt;/wj-range&gt;
     * &lt;/wj-radial-gauge&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it binds the gauge's <b>value</b> property to a <b>sales</b> variable
     * in the controller.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    var WjRadialGauge: any;
    /**
     * Vue component that represents a {@link wijmo.gauge.Range} in one of the following components:
     * {@link wijmo.vue2.gauge.WjLinearGauge}
     * , {@link wijmo.vue2.gauge.WjBulletGraph}
     *  or {@link wijmo.vue2.gauge.WjRadialGauge}.
     */
    var WjRange: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that represents a {@link wijmo.grid.detail.FlexGridDetailProvider} in a {@link wijmo.vue2.grid.WjFlexGrid}.
     */
    var WjFlexGridDetail: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that represents a {@link wijmo.grid.filter.FlexGridFilter} in a {@link wijmo.vue2.grid.WjFlexGrid}.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.grid.filter.FlexGridFilter} control with a filter using Vue markup:
     *
     * <pre>&lt;wj-flex-grid
     *   :items-source="data"&gt;
     *   &lt;wj-flex-grid-filter&gt;&lt;/wj-flex-grid-filter&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     */
    var WjFlexGridFilter: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.grid.grouppanel.GroupPanel} control.
     *
     * The example below shows how to instantiate and connect a
     * {@link wijmo.grid.grouppanel.GroupPanel} and a {@link wijmo.grid.FlexGrid}
     * in Vue:
     *
     * <pre>&lt;wj-group-panel
     *   id="thePanel"
     *   placeholder="Drag columns here to create Groups"&gt;
     * &lt;/wj-group-panel&gt;
     * &lt;wj-flex-grid
     *   id="theGrid"
     *   :items-source="data"&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
     * <pre>var app = new Vue({
     *   el: '#app',
     *   // connect group panel and grid
     *   mounted: function () {
     *     var panel = wijmo.Control.getControl(document.getElementById('thePanel'));
     *     var grid = wijmo.Control.getControl(document.getElementById('theGrid'));
     *     panel.grid = grid;
     *   }
     * });</pre>
     */
    var WjGroupPanel: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.grid.multirow.MultiRow} control.
     */
    var WjMultiRow: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.grid.sheet.FlexSheet} control.
     */
    var WjFlexSheet: any;
    /**
     * Vue component that represents a {@link wijmo.grid.sheet.Sheet} in a {@link wijmo.vue2.grid.sheet.WjFlexSheet}.
     */
    var WjSheet: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.grid.FlexGrid} control.
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.grid.FlexGrid} control using Vue markup:
     *
     * <pre>&lt;wj-flex-grid
     *   :items-source="data"&gt;
     *   &lt;wj-flex-grid-column binding="name" header="Name"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column binding="sales" header="Sales" format="c0"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column binding="expenses" header="Expenses" format="c0"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column binding="active" header="Active"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column binding="date" header="Date"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
     * The code sets the <b>itemsSource</b> property to a collection that contains the grid
     * data, then specifies the columns to display using <b>wj-flex-grid-column</b>
     * components.
     */
    var WjFlexGrid: any;
    /**
     * Vue component that represents a {@link wijmo.grid.Column} in a {@link wijmo.vue2.grid.WjFlexGrid}.
     */
    var WjFlexGridColumn: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.input.ListBox} control.
     */
    var WjListBox: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.ComboBox} control.
     */
    var WjComboBox: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.AutoComplete} control.
     */
    var WjAutoComplete: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.Calendar} control.
     */
    var WjCalendar: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.ColorPicker} control.
     */
    var WjColorPicker: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.InputMask} control.
     */
    var WjInputMask: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.InputColor} control.
     */
    var WjInputColor: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.MultiSelect} control.
     */
    var WjMultiSelect: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.MultiAutoComplete} control.
     */
    var WjMultiAutoComplete: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.InputNumber} control.
     */
    var WjInputNumber: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.InputDate} control.
     */
    var WjInputDate: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.InputTime} control.
     */
    var WjInputTime: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.InputDateTime} control.
     */
    var WjInputDateTime: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.Menu} control.
     */
    var WjMenu: any;
    /**
     * Vue component that encapsulates the {@link wijmo.input.Popup} control.
     */
    var WjPopup: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.olap.PivotGrid} control.
     */
    var WjPivotGrid: any;
    /**
     * Vue component that encapsulates the {@link wijmo.olap.PivotChart} control.
     */
    var WjPivotChart: any;
    /**
     * Vue component that encapsulates the {@link wijmo.olap.PivotPanel} control.
     */
    var WjPivotPanel: any;
    /**
     * Vue component that encapsulates the {@link wijmo.olap.Slicer} control.
     */
    var WjSlicer: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.viewer.ReportViewer} control.
     */
    var WjReportViewer: any;
    /**
     * Vue component that encapsulates the {@link wijmo.viewer.PdfViewer} control.
     */
    var WjPdfViewer: any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that encapsulates the {@link wijmo.nav.TreeView} control.
     */
    var WjTreeView: any;
}
declare module wijmo.vue2 {
}
