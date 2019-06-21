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
* {@module wijmo.knockout.chart.finance.analytics}
* KnockoutJS bindings for wijmo.chart.finance.analytics module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjSeriesBase } from 'wijmo/wijmo.knockout.chart';
/**
 * KnockoutJS binding for the {@link Fibonacci} object.
 *
 * Use the {@link wjFlexChartFibonacci} binding to add {@link Fibonacci} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a Fibonacci:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
 *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
 *         &lt;div data-bind="wjFlexChartFibonacci: { binding:'close', symbolSize:1, labelPosition: 'Left',  uptrend: true}"&gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartFibonacci</b> binding supports all read-write properties and events of
 * the {@link Fibonacci} class.
 */
export declare class wjFlexChartFibonacci extends WjSeriesBase {
    _getControlConstructor(): any;
    _createControl(element: any): any;
}
/**
 * KnockoutJS binding for the {@link FibonacciArcs} object.
 *
 * Use the {@link wjFlexChartFibonacciArcs} binding to add {@link FibonacciArcs} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a FibonacciArcs:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
 *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
 *         &lt;div data-bind="wjFlexChartFibonacciArcs: { binding:'close', start:start, end: end,  labelPosition: 'Top'}"&gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartFibonacciArcs</b> binding supports all read-write properties and events of
 * the {@link FibonacciArcs} class.
 */
export declare class wjFlexChartFibonacciArcs extends WjSeriesBase {
    _getControlConstructor(): any;
    _createControl(element: any): any;
}
/**
 * KnockoutJS binding for the {@link FibonacciFans} object.
 *
 * Use the {@link wjFlexChartFibonacciFans} binding to add {@link FibonacciFans} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a FibonacciFans:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
 *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
 *         &lt;div data-bind="wjFlexChartFibonacciFans: { binding:'close', start:start, end: end,  labelPosition: 'Top'}"&gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartFibonacciFans</b> binding supports all read-write properties and events of
 * the {@link FibonacciFans} class.
 */
export declare class wjFlexChartFibonacciFans extends WjSeriesBase {
    _getControlConstructor(): any;
    _createControl(element: any): any;
}
/**
* KnockoutJS binding for the {@link FibonacciTimeZones} object.
*
* Use the {@link wjFlexChartFibonacciTimeZones} binding to add {@link FibonacciTimeZones} object to your
* KnockoutJS applications. For example:
*
* <pre>&lt;p&gt;Here is a FibonacciTimeZones:&lt;/p&gt;
*    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
*         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
*         &lt;div data-bind="wjFlexChartFibonacciTimeZones: { binding:'close', startX:zStart, endX: zEnd,  labelPosition: 'Right'}"&gt;&lt;/div&gt;
*   &lt;/div&gt;</pre>
*
* The <b>wjFlexChartFibonacciTimeZones</b> binding supports all read-write properties and events of
* the {@link FibonacciTimeZones} class.
*/
export declare class wjFlexChartFibonacciTimeZones extends WjSeriesBase {
    _getControlConstructor(): any;
    _createControl(element: any): any;
}
export declare class WjBaseOverlayIndicator extends WjSeriesBase {
    _getControlConstructor(): any;
}
export declare class WjBaseSingleOverlayIndicator extends WjBaseOverlayIndicator {
    _getControlConstructor(): any;
}
/**
* KnockoutJS binding for the {@link ATR} object.
*
* Use the {@link wjFlexChartAtr} binding to add {@link ATR} object to your
* KnockoutJS applications. For example:
*
* <pre>&lt;p&gt;Here is a ATR:&lt;/p&gt;
*    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
*         &lt;div data-bind="wjFlexChartAtr: { binding: 'high,low,open,close',period:'14' }"&gt;&lt;/div&gt;
*   &lt;/div&gt;</pre>
*
* The <b>wjFlexChartAtr</b> binding supports all read-write properties and events of
* the {@link ATR} class.
*/
export declare class wjFlexChartAtr extends WjBaseSingleOverlayIndicator {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link CCI} object.
 *
 * Use the {@link wjFlexChartCci} binding to add {@link CCI} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a CCI:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
 *         &lt;div data-bind="wjFlexChartCci: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartCci</b> binding supports all read-write properties and events of
 * the {@link CCI} class.
 */
export declare class wjFlexChartCci extends WjBaseSingleOverlayIndicator {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link RSI} object.
 *
 * Use the {@link wjFlexChartRsi} binding to add {@link RSI} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a RSI:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
 *         &lt;div data-bind="wjFlexChartRsi: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartRsi</b> binding supports all read-write properties and events of
 * the {@link RSI} class.
 */
export declare class wjFlexChartRsi extends WjBaseSingleOverlayIndicator {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link WilliamsR} object.
 *
 * Use the {@link wjFlexChartWilliamsR} binding to add {@link WilliamsR} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a WilliamsR:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
 *         &lt;div data-bind="wjFlexChartWilliamsR: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartWilliamsR</b> binding supports all read-write properties and events of
 * the {@link WilliamsR} class.
 */
export declare class wjFlexChartWilliamsR extends WjBaseSingleOverlayIndicator {
    _getControlConstructor(): any;
}
export declare class WjFlexChartMacdBase extends WjBaseOverlayIndicator {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link Macd} object.
 *
 * Use the {@link wjFlexChartMacd} binding to add {@link Macd} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a Macd:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
 *         &lt;div data-bind="wjFlexChartMacd: { binding: 'close',fastPeriod:12, slowPeriod: 26,smoothingPeriod: 9 }" &gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartMacd</b> binding supports all read-write properties and events of
 * the {@link Macd} class.
 */
export declare class wjFlexChartMacd extends WjFlexChartMacdBase {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link MacdHistogram} object.
 *
 * Use the {@link wjFlexChartMacdHistogram} binding to add {@link MacdHistogram} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a MacdHistogram:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
 *         &lt;div data-bind="WjFlexChartMacdHistogram: { binding: 'close',fastPeriod:12, slowPeriod: 26,smoothingPeriod: 9 }" &gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartMacdHistogram</b> binding supports all read-write properties and events of
 * the {@link MacdHistogram} class.
 */
export declare class wjFlexChartMacdHistogram extends WjFlexChartMacdBase {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link Stochastic} object.
 *
 * Use the {@link wjFlexChartStochastic} binding to add {@link Stochastic} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a Stochastic:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
 *         &lt;div data-bind="wjFlexChartStochastic: { binding: 'high,low,open,close',kPeriod:14,dPeriod:3,smoothingPeriod: 1 }" &gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartStochastic</b> binding supports all read-write properties and events of
 * the {@link Stochastic} class.
 */
export declare class wjFlexChartStochastic extends WjBaseOverlayIndicator {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link BollingerBands} object.
 *
 * Use the {@link wjFlexChartBollingerBands} binding to add {@link BollingerBands} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a BollingerBands:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
 *         &lt;div data-bind="wjFlexChartStochastic: { binding: 'high,low,open,close',kPeriod:14,dPeriod:3,smoothingPeriod: 1 }" &gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartBollingerBands</b> binding supports all read-write properties and events of
 * the {@link BollingerBands} class.
 */
export declare class wjFlexChartBollingerBands extends WjBaseOverlayIndicator {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link Envelopes} object.
 *
 * Use the {@link wjFlexChartEnvelopes} binding to add {@link Envelopes} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a Envelopes:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
 *         &lt;div data-bind="wjFlexChartEnvelopes: { binding:'close', type:'Simple', size: 0.03, period:20}" &gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartEnvelopes</b> binding supports all read-write properties and events of
 * the {@link Envelopes} class.
 */
export declare class wjFlexChartEnvelopes extends WjBaseOverlayIndicator {
    _getControlConstructor(): any;
}
