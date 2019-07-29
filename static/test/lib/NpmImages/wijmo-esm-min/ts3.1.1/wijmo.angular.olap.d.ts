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
* {@module wijmo.angular.olap}
* AngularJS directives for wijmo.olap module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective } from 'wijmo/wijmo.angular.base';
import { WjFlexGrid } from 'wijmo/wijmo.angular.grid';
import * as wjcOlap from 'wijmo/wijmo.olap';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.olap";
/**
 * AngularJS directive for the {@link PivotGrid} control.
 *
 * Use the <b>wj-pivot-grid</b> and <b>wj-pivot-panel</b> directives
 * to add pivot tables to your AngularJS applications.
 *
 * Directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;wj-pivot-panel
 *     control="thePanel"
 *     items-source="rawData"&gt;
 * &lt;/wj-pivot-panel&gt;
 * &lt;wj-pivot-grid
 *     items-source="thePanel"
 *     show-detail-on-double-click="false"
 *     custom-context-menu="true"&gt;
 * &lt;/wj-pivot-grid&gt;</pre>
 *
 * The <b>wj-pivot-grid</b> directive extends the <b>wj-flex-grid</b> directive
 * and adds support for the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>items-source</dt>                  <dd>Gets or sets the {@link PivotPanel} that defines the view
 *                                              displayed by this {@link PivotGrid}.</dd>
 *   <dt>show-detail-on-double-click</dt>   <dd>Gets or sets whether the grid should show a popup containing the
 *                                              detail records when the user double-clicks a cell.</dd>
 *   <dt>custom-context-menu</dt>           <dd>Gets or sets whether the grid should provide a custom context menu
 *                                              with commands for changing field settings and showing detail records.</dd>
 *   <dt>collapsible-subtotals</dt>         <dd>Gets or sets whether the grid should allow users to collapse and
 *                                              expand subtotal groups of rows and columns.</dd>
 *   <dt>center-headers-vertically</dt>     <dd>Gets or sets whether the content of header cells should be vertically centered.</dd>
 * </dl>
 */
export declare class WjPivotGrid extends WjFlexGrid {
    constructor($compile: any, $interpolate: any);
    readonly _controlConstructor: typeof wjcOlap.PivotGrid;
}
/**
 * AngularJS directive for the {@link PivotChart} control.
 *
 * Use the <b>wj-pivot-chart</b> and <b>wj-pivot-panel</b> directives
 * to add pivot charts to your AngularJS applications.
 *
 * Directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;wj-pivot-panel
 *     control="thePanel"
 *     items-source="rawData"&gt;
 * &lt;/wj-pivot-panel&gt;
 * &lt;wj-pivot-chart
 *     items-source="thePanel"
 *     chart-type="Bar"
 *     max-series="10"
 *     max-points="100"&gt;
 * &lt;/wj-pivot-chart&gt;</pre>
 *
 * The <b>wj-pivot-chart</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>items-source</dt>                  <dd>Gets or sets the {@link PivotPanel} that defines the view
 *                                              displayed by this {@link PivotChart}.</dd>
 *   <dt>chart-type</dt>                    <dd>Gets or sets a {@link PivotChartType} value that defines
 *                                              the type of chart to display.</dd>
 *   <dt>show-hierarchical-axes</dt>        <dd>Gets or sets whether the chart should group axis annotations for grouped data.</dd>
 *   <dt>stacking</dt>                      <dd>Gets or sets a {@link Stacking} value that determines whether and how the series
 *                                              objects are stacked.</dd>
 *   <dt>show-totals</dt>                   <dd>Gets or sets a whether the chart should include only totals.</dd>
 *   <dt>max-series</dt>                    <dd>Gets or sets the maximum number of data series to be shown in the chart.</dd>
 *   <dt>max-points</dt>                    <dd>Gets or sets the maximum number of points to be shown in each series.</dd>
 * </dl>
 */
export declare class WjPivotChart extends WjDirective {
    readonly _controlConstructor: typeof wjcOlap.PivotChart;
}
/**
 * AngularJS directive for the {@link PivotPanel} control.
 *
 * Use the <b>wj-pivot-panel</b> directive as a data source for
 * <b>wj-pivot-grid</b> and <b>wj-pivot-chart</b> directives
 * to add pivot tables and charts to your AngularJS applications.
 *
 * Directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;wj-pivot-panel
 *     control="thePanel"
 *     items-source="rawData"&gt;
 * &lt;/wj-pivot-panel&gt;
 * &lt;wj-pivot-grid
 *     items-source="thePanel"
 *     show-detail-on-double-click="false"
 *     custom-context-menu="true"&gt;
 * &lt;/wj-pivot-grid&gt;</pre>
 *
 * The <b>wj-pivot-panel</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>items-source</dt>                  <dd>Gets or sets the raw data used to generate pivot views.</dd>
 *   <dt>auto-generate-fields</dt>          <dd>Gets or sets whether the panel should populate its fields
 *                                              collection automatically based on the {@link PivotPanel.itemsSource}.</dd>
 *   <dt>view-definition</dt>               <dd>Gets or sets the current pivot view definition as a JSON string.</dd>
 *   <dt>engine</dt>                        <dd>Gets a reference to the {@link PivotEngine} that summarizes the data.</dd>
 * </dl>
 */
export declare class WjPivotPanel extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcOlap.PivotPanel;
}
/**
 * AngularJS directive for the {@link Slicer} control.
 *
 * Use the <b>wj-slicer</b> directive provides a quick way to edit filters
 * applied to {@link PivotField} objects.
 *
 * Directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;wj-slicer
 *     field="theField"
 *     header="theHeader"
 *     show-header="true"&gt;
 * &lt;/wj-slicer&gt;</pre>
 *
 * The <b>wj-slicer</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>field</dt>           <dd>Gets or sets the PivotField being filtered by the Slicer.</dd>
 *   <dt>header</dt>          <dd>Gets or sets the header string shown at the top of the {@link Slicer}.</dd>
 *   <dt>showHeader</dt>      <dd>Gets or sets a value indicating whether the control displays the
 *                                header area with the header string and multi-select/clear buttons.</dd>
 *   <dt>showCheckboxes</dt>  <dd>Gets or sets a value indicating whether the control displays
 *                                checkboxes next to each item.</dd>
 *   <dt>multiSelect</dt>     <dd>Gets or sets a value that determines whether users should be allowed to
 *                                select multiple values from the list.</dd>
 * </dl>
 */
export declare class WjSlicer extends WjDirective {
    readonly _controlConstructor: typeof wjcOlap.Slicer;
}
