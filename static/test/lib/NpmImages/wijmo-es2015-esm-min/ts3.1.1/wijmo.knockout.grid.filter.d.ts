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
* {@module wijmo.knockout.grid.filter}
* KnockoutJS bindings for wijmo.grid.filter module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding } from 'wijmo/wijmo.knockout.base';
/**
 * KnockoutJS binding for the {@link FlexGrid} {@link FlexGridFilter} object.
 *
 * The {@link wjFlexGridFilter} binding must be contained in a {@link wjFlexGrid} binding. For example:
 *
 * <pre>&lt;p&gt;Here is a FlexGrid control with column filters:&lt;/p&gt;
 * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
 *     &lt;div data-bind="wjFlexGridFilter: { filterColumns: ['country', 'amount']  }"&gt;&lt;/div&gt;
 * &nbsp;
 *     &lt;div data-bind="wjFlexGridColumn: {
 *         header: 'Country',
 *         binding: 'country',
 *         width: '*' }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjFlexGridColumn: {
 *         header: 'Date',
 *         binding: 'date' }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjFlexGridColumn: {
 *         header: 'Revenue',
 *         binding: 'amount',
 *         format: 'n0' }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjFlexGridColumn: {
 *         header: 'Active',
 *         binding: 'active' }"&gt;
 *     &lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjFlexGridFilter</b> binding supports all read-write properties and events of
 * the {@link FlexGridFilter} class.
 *
 */
export declare class wjFlexGridFilter extends WjBinding {
    _getControlConstructor(): any;
}
