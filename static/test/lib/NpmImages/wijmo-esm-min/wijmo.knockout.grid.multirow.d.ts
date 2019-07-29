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
* {@module wijmo.knockout.grid.multirow}
* KnockoutJS bindings for wijmo.grid.multirow module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { wjFlexGrid } from 'wijmo/wijmo.knockout.grid';
/**
 * KnockoutJS binding for the {@link MultiRow} object.
 * Use the {@link wjMultiRow} binding to add {@link MultiRow} controls to your
 * KnockoutJS applications. For example:
 *  &lt;div data-bind="wjMultiRow:
 *      {
 *          itemsSource: orders,
 *          layoutDefinition: ldThreeLines
 *      }"&gt;
 *  &lt;/div&gt;
 *
 * The <b>wjMultiRow</b> binding supports all read-write properties and events of
 * the {@link MultiRow} class.
 *
 */
export declare class wjMultiRow extends wjFlexGrid {
    _getControlConstructor(): any;
}
