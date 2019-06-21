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
* {@module wijmo.knockout.grid.grouppanel}
* KnockoutJS bindings for wijmo.grid.grouppanel module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding } from 'wijmo/wijmo.knockout.base';
/**
 * KnockoutJS binding for the {@link FlexGrid} {@link GroupPanel} control.
 *
 * The <b>wjGroupPanel</b> binding should be connected to the <b>FlexGrid</b> control using the <b>grid</b> property.
 * For example:
 *
 * <pre>&lt;p&gt;Here is a FlexGrid control with GroupPanel:&lt;/p&gt;
 * &nbsp;
 * &lt;div data-bind="wjGroupPanel: { grid: flex(), placeholder: 'Drag columns here to create groups.' }"&gt;&lt;/div&gt;
 * &nbsp;
 * &lt;div data-bind="wjFlexGrid: { control: flex, itemsSource: data }"&gt;
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
 * The <b>wjGroupPanel</b> binding supports all read-write properties and events of
 * the {@link GroupPanel} class.
 *
 */
export declare class wjGroupPanel extends WjBinding {
    _getControlConstructor(): any;
}
