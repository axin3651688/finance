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
* {@module wijmo.angular.grid.multirow}
* AngularJS directives for wijmo.angular.grid.multirow module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjFlexGrid } from 'wijmo/wijmo.angular.grid';
import * as wjcGridMultirow from 'wijmo/wijmo.grid.multirow';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.grid.multirow";
/**
 * AngularJS directive for the {@link MultiRow} control.
 *
 * Use the <b>wj-multi-row</b> directive to add <b>MultiRow</b> controls to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case.
 *
 * The <b>wj-multi-row</b> directive extends {@link wijmo.angular.grid.WjFlexGrid} with the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>control</dt>                    <dd><code>=</code> A reference to the {@link MultiRow} control created by this directive.</dd>
 *   <dt>layout-definition</dt>          <dd><code>@</code> A value defines the layout of the rows used to display each data item.</dd>
 *   <dt>collapsed-headers</dt>          <dd><code>@</code> Gets or sets a value that determines whether column headers should be
 *                                       collapsed and displayed as a single row displaying the group headers.</dd>
 *   <dt>center-headers-vertically</dt>  <dd><code>@</code> Gets or sets a value that determines whether the content of cells
 *                                       that span multiple rows should be vertically centered.</dd>
 *   <dt>show-header-collapse-button</dt><dd><code>@</code> Gets or sets a value that determines whether the grid should
 *                                       display a button in the column header panel to allow users to collapse and expand the column headers.</dd>
 * </dl>
 */
export declare class WjMultiRow extends WjFlexGrid {
    constructor($compile: any, $interpolate: any);
    readonly _controlConstructor: typeof wjcGridMultirow.MultiRow;
}
