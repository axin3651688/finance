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
* {@module wijmo.knockout.chart.annotation}
* KnockoutJS bindings for wijmo.chart.annotation module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding, WjContext } from 'wijmo/wijmo.knockout.base';
/**
 * KnockoutJS binding for the {@link AnnotationLayer} object.
 *
 * Use the {@link wjFlexChartAnnotationLayer} binding to add {@link AnnotationLayer} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a AnnotationLayer:&lt;/p&gt;
 *&lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
    *    &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
    *    &lt;div data-bind="wjFlexChartAnnotationLayer: {}"&gt;
    *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Rectangle', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 10}"&gt;&lt;/div&gt;
    *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Ellipse', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 30}"&gt;&lt;/div&gt;
    *    &lt;/div&gt;
    &lt;/div&gt;</pre>
    *
    * The <b>wjFlexChartAnnotationLayer</b> binding supports all read-write properties and events of
    * the {@link AnnotationLayer} class.
    */
export declare class wjFlexChartAnnotationLayer extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for annotations.
 *
 * The <b>wjFlexChartAnnotation</b> must be contained in a
 * {@link wjFlexChartAnnotationLayer} binding.For example:
 * <pre>&lt;p&gt;Here is a AnnotationLayer:&lt;/p&gt;
 *&lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
    *    &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
    *    &lt;div data-bind="wjFlexChartAnnotationLayer: {}"&gt;
    *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Rectangle', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 10}"&gt;&lt;/div&gt;
    *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Ellipse', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 30}"&gt;&lt;/div&gt;
    *    &lt;/div&gt;
    &lt;/div&gt;</pre>
    *
    * The <b>wjFlexChartAnnotation</b> is used to represent all types of
    * possible annotation shapes like <b>Circle</b>, <b>Rectangle</b>, <b>Polygon</b>
    * and so on. The type of annotation shape is specified
    * in the <b>type</b> attribute.
    */
export declare class wjFlexChartAnnotation extends WjBinding {
    _context: any;
    _createControl(element: any): any;
    _getMetaDataId(): any;
    _createWijmoContext(): WjContext;
}
export declare class wjFlexChartAnnotationContext extends WjContext {
    _createAnnotation(): any;
}
