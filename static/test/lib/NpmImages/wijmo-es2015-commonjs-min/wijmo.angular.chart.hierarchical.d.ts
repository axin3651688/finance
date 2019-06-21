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
* {@module wijmo.angular.chart.hierarchical}
* AngularJS directives for wijmo.angular.chart.hierarchical module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjFlexChartBase, WjFlexPie } from 'wijmo/wijmo.angular.chart';
import * as wjcChartHierarchical from 'wijmo/wijmo.chart.hierarchical';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.chart.hierarchical";
/**
 * AngularJS directive for the {@link Sunburst} control.
 *
 * <dl class="dl-horizontal">
 *   <dt>child-items-path</dt>  <dd><code>=</code> An array or string object used to generate child items in hierarchical data.</dd>
 * </dl>
 *
 */
export declare class WjSunburst extends WjFlexPie {
    readonly _controlConstructor: typeof wjcChartHierarchical.Sunburst;
}
/**
 * AngularJS directive for the {@link TreeMap} control.
 *
 * <dl class="dl-horizontal">
 *   <dt>items-source</dt>      <dd><code>=</code> An array or {@link ICollectionView}
 *                              object that contains data for the chart.</dd>
 *   <dt>binding</dt>           <dd><code>@</code> The name of the property that
 *                              contains item values.</dd>
 *   <dt>binding-name</dt>      <dd><code>@</code> The name of the property that
 *                              contains item names. It should be an array or a string.</dd>
 *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
 *                              text).</dd>
 *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
 *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
 *                              text).</dd>
 *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
 *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
 *                              initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>    <dd><code>=</code> A value indicating whether the binding has finished
 *                              initializing the control with attribute values. </dd>
 *   <dt>type</dt>              <dd><code>@</code> The type of the TreeMap.</dd>
 *   <dt>child-items-path</dt>  <dd><code>@</code> A value indicating the name of the property (or properties) used to generate
 *                              child items in hierarchical data.</dd>
 *   <dt>max-depth</dt>         <dd><code>=</code> The maximum number of node levels to show in the current view.</dd>
 *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
 *                              displaying TreeMap items.</dd>
 *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
 *                              edges of the control and the plot area, or CSS-style margins.</dd>
 *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
 *                              {@link ChartTooltip} content property.</dd>
 *   <dt>label-content</dt>     <dd><code>@</code> The value to display in the
 *                              {@link DataLabel} content property.</dd>
 *   <dt>rendering</dt>         <dd><code>&</code> The {@link FlexPie.rendering} event handler.</dd>
 *   <dt>rendered</dt>          <dd><code>&</code> The {@link FlexPie.rendered} event handler.</dd>
 * </dl>
 *
 * The wj-tree-map directive may contain the following child directives:
 * {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexChartDataLabel}.
 */
export declare class WjTreeMap extends WjFlexChartBase {
    readonly _controlConstructor: typeof wjcChartHierarchical.TreeMap;
    _initProps(): void;
}
