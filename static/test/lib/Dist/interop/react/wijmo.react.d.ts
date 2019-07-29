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

declare module wijmo.react {
    /**
     * Base class for all Wijmo components for React.
     */
    class ComponentBase extends React.Component<any, any> {
        static readonly _propsParent = "$parent";
        static readonly _typeSiblingIdProp = "_wjSiblingIdProp";
        static _siblingDirId: number;
        private _objPropHash;
        private _isMounted;
        private _mountedCBs;
        private _siblingInsertedEH;
        controlType: any;
        props: any;
        control: any;
        parent: ComponentBase;
        protected _parentProp: string;
        protected _parentInCtor: boolean;
        protected _siblingId: string;
        constructor(props: any, controlType: any, meta?: any);
        render(): any;
        componentDidMount(): any;
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: any): boolean;
        _mountedCB(cb: () => void): void;
        protected _createControl(): any;
        private _prepareControl;
        protected _initParent(): void;
        private _setParent;
        private _isChild;
        private _isParentInCtor;
        private _getParentProp;
        private _getSiblingIndex;
        private _siblingInserted;
        private _copy;
        private _sameValue;
        private _isEvent;
        private _getElement;
        private _ignoreProp;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that represents a {@link wijmo.chart.analytics.TrendLine} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartTrendLine extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.analytics.MovingAverage} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartMovingAverage extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.analytics.YFunctionSeries} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartYFunctionSeries extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.analytics.ParametricFunctionSeries} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartParametricFunctionSeries extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.analytics.Waterfall} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartWaterfall extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.analytics.BoxWhisker} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartBoxWhisker extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.analytics.ErrorBar} in a {@link wijmo.react.chart.FlexChart}.
     */
    class FlexChartErrorBar extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that represents a {@link wijmo.chart.animation.ChartAnimation} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     * , {@link wijmo.react.chart.FlexPie}
     * , {@link wijmo.react.chart.finance.FinancialChart}
     *  or {@link wijmo.react.chart.radar.FlexRadar}.
     */
    class FlexChartAnimation extends ComponentBase {
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that represents a {@link wijmo.chart.annotation.AnnotationLayer} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartAnnotationLayer extends ComponentBase {
        _parentInCtor: boolean;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link } in a {@link wijmo.react.chart.annotation.FlexChartAnnotationLayer}.
     */
    class FlexChartAnnotation extends ComponentBase {
        _parentProp: string;
        constructor(props: any);
        protected _createControl(): any;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.Fibonacci} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartFibonacci extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.FibonacciArcs} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartFibonacciArcs extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.FibonacciFans} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartFibonacciFans extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.FibonacciTimeZones} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartFibonacciTimeZones extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.ATR} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartAtr extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.CCI} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartCci extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.RSI} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartRsi extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.WilliamsR} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartWilliamsR extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.Macd} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartMacd extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.MacdHistogram} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartMacdHistogram extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.Stochastic} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartStochastic extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.BollingerBands} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartBollingerBands extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.analytics.Envelopes} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartEnvelopes extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.chart.finance.FinancialChart} control.
     */
    class FinancialChart extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.finance.FinancialSeries} in a {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FinancialChartSeries extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.chart.hierarchical.Sunburst} control.
     */
    class Sunburst extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.chart.hierarchical.TreeMap} control.
     */
    class TreeMap extends ComponentBase {
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that represents a {@link wijmo.chart.interaction.RangeSelector} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartRangeSelector extends ComponentBase {
        _parentInCtor: boolean;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.interaction.ChartGestures} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartGestures extends ComponentBase {
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.chart.radar.FlexRadar} control.
     */
    class FlexRadar extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.radar.FlexRadarAxis} in one of the following components:
     * {@link wijmo.react.chart.radar.FlexRadar}
     *  or {@link wijmo.react.chart.radar.FlexRadarSeries}.
     */
    class FlexRadarAxis extends ComponentBase {
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.radar.FlexRadarSeries} in a {@link wijmo.react.chart.radar.FlexRadar}.
     */
    class FlexRadarSeries extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
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
    class FlexChart extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.chart.FlexPie} control.
     */
    class FlexPie extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.Axis} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     * , {@link wijmo.react.chart.FlexChartSeries}
     * , {@link wijmo.react.chart.finance.FinancialChart}
     *  or {@link wijmo.react.chart.finance.FinancialChartSeries}.
     */
    class FlexChartAxis extends ComponentBase {
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
    class FlexChartLegend extends ComponentBase {
        _parentProp: string;
        _parentInCtor: boolean;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.DataLabel} in a {@link wijmo.react.chart.FlexChart}.
     */
    class FlexChartDataLabel extends ComponentBase {
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.PieDataLabel} in a {@link wijmo.react.chart.FlexPie}.
     */
    class FlexPieDataLabel extends ComponentBase {
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.Series} in a {@link wijmo.react.chart.FlexChart}.
     */
    class FlexChartSeries extends ComponentBase {
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.LineMarker} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartLineMarker extends ComponentBase {
        _parentInCtor: boolean;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.DataPoint} in a {@link wijmo.react.chart.annotation.FlexChartAnnotation}.
     */
    class FlexChartDataPoint extends ComponentBase {
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.chart.PlotArea} in one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     */
    class FlexChartPlotArea extends ComponentBase {
        _parentProp: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.gauge.LinearGauge} control.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.LinearGauge} control in JSX:
     *
     * <pre>&lt;Wj.LinearGauge
     *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
     *   value={ this.state.view.currentItem.sales }
     *   valueChanged={ this.salesChanged }
     *   format="c0" thumbSize={ 20 } showRanges={ false }
     *   face={&#8203;{ thickness:0.5 }}
     *   pointer={&#8203;{ thickness:0.5 }}
     *   ranges={[
     *       { min: 0, max: 333, color: 'red' },
     *       { min: 333, max: 666, color: 'gold' },
     *       { min: 666, max: 1000, color: 'green' }
     *   ]} /&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
     * a two-way binding for the gauge's value.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    class LinearGauge extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.gauge.BulletGraph} control.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.BulletGraph} control in JSX:
     *
     * <pre>&lt;Wj.BulletGraph
     *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
     *   value={ this.state.view.currentItem.sales }
     *   valueChanged={ this.salesChanged }
     *   format="c0" thumbSize={ 20 } showRanges={ false }
     *   face={&#8203;{ thickness:0.5 }}
     *   pointer={&#8203;{ thickness:0.5 }}
     *   ranges={[
     *       { min: 0, max: 333, color: 'red' },
     *       { min: 333, max: 666, color: 'gold' },
     *       { min: 666, max: 1000, color: 'green' }
     *   ]} /&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
     * a two-way binding for the gauge's value.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    class BulletGraph extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.gauge.RadialGauge} control.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.RadialGauge} control in JSX:
     *
     * <pre>&lt;Wj.RadialGauge
     *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
     *   value={ this.state.view.currentItem.sales }
     *   valueChanged={ this.salesChanged }
     *   format="c0" thumbSize={ 20 } showRanges={ false }
     *   face={&#8203;{ thickness:0.5 }}
     *   pointer={&#8203;{ thickness:0.5 }}
     *   ranges={[
     *       { min: 0, max: 333, color: 'red' },
     *       { min: 333, max: 666, color: 'gold' },
     *       { min: 666, max: 1000, color: 'green' }
     *   ]} /&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
     * a two-way binding for the gauge's value.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    class RadialGauge extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.gauge.Range} in one of the following components:
     * {@link wijmo.react.gauge.LinearGauge}
     * , {@link wijmo.react.gauge.BulletGraph}
     *  or {@link wijmo.react.gauge.RadialGauge}.
     */
    class Range extends ComponentBase {
        _parentProp: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that represents a {@link wijmo.grid.filter.FlexGridFilter} in a {@link wijmo.react.grid.FlexGrid}.
     */
    class FlexGridFilter extends ComponentBase {
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.grid.grouppanel.GroupPanel} control.
     */
    class GroupPanel extends ComponentBase {
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.grid.multirow.MultiRow} control.
     */
    class MultiRow extends ComponentBase {
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.grid.sheet.FlexSheet} control.
     */
    class FlexSheet extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.grid.sheet.Sheet} in a {@link wijmo.react.grid.sheet.FlexSheet}.
     */
    class Sheet extends ComponentBase {
        _parentProp: string;
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.grid.FlexGrid} control.
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.grid.FlexGrid} control in JSX:
     *
     * <pre>&lt;Wj.FlexGrid
     *   autoGenerateColumns={ false }
     *   columns={[
     *     { binding: 'name', header: 'Name' },
     *     { binding: 'sales', header: 'Sales', format: 'c0' },
     *     { binding: 'expenses', header: 'Expenses', format: 'c0' },
     *     { binding: 'active', header: 'Active' },
     *     { binding: 'date', header: 'Date' }
     *   ]}
     *   itemsSource={ this.state.data } /&gt;</pre>
     *
     * The code sets the <b>autoGenerateColumns</b> property to false, then
     * sets the <b>columns</b> property, and finally sets the <b>itemsSource</b>
     * property. This order is important, it prevents the grid from automatically
     * generating the columns.
     */
    class FlexGrid extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that represents a {@link wijmo.grid.Column} in a {@link wijmo.react.grid.FlexGrid}.
     */
    class FlexGridColumn extends ComponentBase {
        _parentProp: string;
        constructor(props: any);
        protected _initParent(): void;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.input.ListBox} control.
     */
    class ListBox extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.ComboBox} control.
     */
    class ComboBox extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.AutoComplete} control.
     */
    class AutoComplete extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.Calendar} control.
     */
    class Calendar extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.ColorPicker} control.
     */
    class ColorPicker extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.InputMask} control.
     */
    class InputMask extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.InputColor} control.
     */
    class InputColor extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.MultiSelect} control.
     */
    class MultiSelect extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.MultiAutoComplete} control.
     */
    class MultiAutoComplete extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.InputNumber} control.
     */
    class InputNumber extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.InputDate} control.
     */
    class InputDate extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.InputTime} control.
     */
    class InputTime extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.InputDateTime} control.
     */
    class InputDateTime extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.Menu} control.
     */
    class Menu extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.input.Popup} control.
     */
    class Popup extends ComponentBase {
        constructor(props: any);
        render(): any;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.olap.PivotGrid} control.
     */
    class PivotGrid extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.olap.PivotChart} control.
     */
    class PivotChart extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.olap.PivotPanel} control.
     */
    class PivotPanel extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.olap.Slicer} control.
     */
    class Slicer extends ComponentBase {
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.viewer.ReportViewer} control.
     */
    class ReportViewer extends ComponentBase {
        constructor(props: any);
    }
    /**
     * React component that encapsulates the {@link wijmo.viewer.PdfViewer} control.
     */
    class PdfViewer extends ComponentBase {
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that encapsulates the {@link wijmo.nav.TreeView} control.
     */
    class TreeView extends ComponentBase {
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare var Wj: typeof wijmo.react;
