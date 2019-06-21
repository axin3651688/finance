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
* {@module wijmo.angular.grid.filter}
* AngularJS directives for wijmo.angular.grid.filter module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective } from 'wijmo/wijmo.angular.base';
import * as wjcGridFilter from 'wijmo/wijmo.grid.filter';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.grid.filter";
/**
 * AngularJS directive for the {@link FlexGridFilter} object.
 *
 * The <b>wj-flex-grid-filter</b> directive must be contained in a {@link wijmo.angular.grid.WjFlexGrid} directive. For example:
 *
 * <pre>&lt;p&gt;Here is a FlexGrid control with column filters:&lt;/p&gt;
 * &lt;wj-flex-grid items-source="data"&gt;
 *   &lt;wj-flex-grid-filter filter-columns="['country', 'expenses']"&gt;&lt;/wj-flex-grid-filter&gt;
 * &nbsp;
 *   &lt;wj-flex-grid-column
 *     header="Country"
 *     binding="country"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column
 *     header="Sales"
 *     binding="sales"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column
 *     header="Expenses"
 *     binding="expenses"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column
 *     header="Downloads"
 *     binding="downloads"&gt;
 *   &lt;/wj-flex-grid-column&gt;
 *  &lt;/wj-flex-grid&gt;</pre>
 *
 * The <b>wj-flex-grid-filter</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>filter-columns</dt>    <dd><code>=</code> An array containing the names or bindings of the columns
 *                              to filter.</dd>
 *   <dt>show-filter-icons</dt> <dd><code>@</code>  The value indicating whether filter editing buttons
 *                              appear in the grid's column headers.</dd>
 *   <dt>filter-changing</dt>   <dd><code>&</code> Handler for the {@link FlexGridFilter.filterChanging} event.</dd>
 *   <dt>filter-changed</dt>    <dd><code>&</code> Handler for the {@link FlexGridFilter.filterChanged} event.</dd>
 *   <dt>filter-applied</dt>    <dd><code>&</code> Handler for the {@link FlexGridFilter.filterApplied} event.</dd>
 * </dl>
 */
export declare class WjFlexGridFilter extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcGridFilter.FlexGridFilter;
}
