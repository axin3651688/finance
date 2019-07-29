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
 * {@module wijmo.react.chart}
 * Wijmo interop module for
 * <a href="https://facebook.github.io/react/" target="_blank">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an {@link InputNumber} control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
/**
 *
 */
export declare var ___keepComment: any;
import { ComponentBase } from 'wijmo/wijmo.react.base';
/**
 * React component that encapsulates the {@link wijmo.chart.FlexChart} control.
 *
 * The example below shows how to instantiate and initialize a
 * {@link wijmo.chart.FlexChart} control in JSX:
 *
 * <pre>&lt;Wj.FlexChart
 *   itemsSource={ this.state.data }
 *   bindingX="name"
 *   header={ this.state.header }
 *   footer={ this.state.footer }
 *   axisX={&#8203;{ title: this.state.titleX }}
 *   axisY={&#8203;{ title: this.state.titleY }}
 *   legend={&#8203;{ position: this.state.legendPosition }}
 *   series={[
 *       { name: 'Sales', binding: 'sales' },
 *       { name: 'Expenses', binding: 'expenses' },
 *       { name: 'Downloads', binding: 'downloads', chartType: 'LineSymbols' }
 *   ]} /&gt;</pre>
 *

 * The code sets the <b>itemsSource</b> property to a collection that contains
 * the data to chart and the <b>bindingX</b> property to specify the name of the
 * data property to use for the chart's X values.
 *
 * It sets the <b>header</b> and <b>footer</b> properties to specify the
 * chart titles, and customizes the chart's axes and legend.
 *
 * Finally, it sets the <b>series</b> property to an array that specifies the
 * data items that the chart should display.
 */
export declare class FlexChart extends ComponentBase {
    constructor(props: any);
}
/**
 * React component that encapsulates the {@link wijmo.chart.FlexPie} control.
 */
export declare class FlexPie extends ComponentBase {
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.chart.Axis} in one of the following components:
 * {@link wijmo.react.chart.FlexChart}
 * , {@link wijmo.react.chart.FlexChartSeries}
 * , {@link wijmo.react.chart.finance.FinancialChart}
 *  or {@link wijmo.react.chart.finance.FinancialChartSeries}.
 */
export declare class FlexChartAxis extends ComponentBase {
    _parentProp: string;
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.chart.Legend} in one of the following components:
 * {@link wijmo.react.chart.FlexChart}
 * , {@link wijmo.react.chart.FlexPie}
 * , {@link wijmo.react.chart.finance.FinancialChart}
 * , {@link wijmo.react.chart.radar.FlexRadar}
 *  or {@link wijmo.react.chart.hierarchical.Sunburst}.
 */
export declare class FlexChartLegend extends ComponentBase {
    _parentProp: string;
    _parentInCtor: boolean;
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.chart.DataLabel} in a {@link wijmo.react.chart.FlexChart}.
 */
export declare class FlexChartDataLabel extends ComponentBase {
    _parentProp: string;
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.chart.PieDataLabel} in a {@link wijmo.react.chart.FlexPie}.
 */
export declare class FlexPieDataLabel extends ComponentBase {
    _parentProp: string;
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.chart.Series} in a {@link wijmo.react.chart.FlexChart}.
 */
export declare class FlexChartSeries extends ComponentBase {
    _parentProp: string;
    _siblingId: string;
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.chart.LineMarker} in one of the following components:
 * {@link wijmo.react.chart.FlexChart}
 *  or {@link wijmo.react.chart.finance.FinancialChart}.
 */
export declare class FlexChartLineMarker extends ComponentBase {
    _parentInCtor: boolean;
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.chart.DataPoint} in a {@link wijmo.react.chart.annotation.FlexChartAnnotation}.
 */
export declare class FlexChartDataPoint extends ComponentBase {
    _parentProp: string;
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.chart.PlotArea} in one of the following components:
 * {@link wijmo.react.chart.FlexChart}
 *  or {@link wijmo.react.chart.finance.FinancialChart}.
 */
export declare class FlexChartPlotArea extends ComponentBase {
    _parentProp: string;
    constructor(props: any);
}
