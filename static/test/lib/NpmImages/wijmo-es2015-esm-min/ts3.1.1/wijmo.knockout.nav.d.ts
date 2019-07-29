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
* {@module wijmo.knockout.nav}
* KnockoutJS bindings for wijmo.nav module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding } from 'wijmo/wijmo.knockout.base';
/**
     * KnockoutJS binding for the {@link TreeView} object.
     * Use the {@link wjTreeView} binding to add {@link TreeView} controls to your
     * KnockoutJS applications. For example:
     *  &lt;div data-bind="wjTreeView:
     *      {
     *          itemsSource: data
     *          displayMemberPath:'header'
     *          childItemsPath:'items'
     *      }"&gt;
     *  &lt;/div&gt;
     *
     * The <b>wjTreeView</b> binding supports all read-write properties and events of
     * the {@link TreeView} class.
     *
     */
export declare class wjTreeView extends WjBinding {
    _getControlConstructor(): any;
}
