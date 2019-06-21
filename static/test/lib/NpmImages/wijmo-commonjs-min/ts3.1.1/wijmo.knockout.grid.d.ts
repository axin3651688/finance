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
* {@module wijmo.knockout.grid}
* KnockoutJS bindings for wijmo.grid module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding, WjContext } from 'wijmo/wijmo.knockout.base';
/**
 * KnockoutJS binding for the {@link FlexGrid} control.
 *
 * Use the {@link wjFlexGrid} binding to add {@link FlexGrid} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
 * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
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
 * The <b>wjFlexGrid</b> binding may contain {@link wjFlexGridColumn} child bindings.
 *
 * The <b>wjFlexGrid</b> binding supports all read-write properties and events of
 * the {@link FlexGrid} control, except for the <b>scrollPosition</b>,
 * <b>selection</b> and <b>columnLayout</b> properties.
 */
export declare class wjFlexGrid extends WjBinding {
    static _columnTemplateProp: string;
    static _cellClonedTemplateProp: string;
    static _cellVMProp: string;
    static _templColIdx: string;
    static _columnStyleBinding: string;
    static _columnStyleProp: string;
    _getControlConstructor(): any;
    _createWijmoContext(): WjContext;
    _initialize(): void;
    private _formatterPropHandler;
}
export declare class WjFlexGridContext extends WjContext {
    _wrapperFormatter: any;
    _userFormatter: Function;
    _initControl(): void;
    private _itemFormatter;
}
/**
 * KnockoutJS binding for the {@link FlexGrid} {@link Column} object.
 *
 * The {@link wjFlexGridColumn} binding must be contained in a {@link wjFlexGrid} binding. For example:
 *
 * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
 * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
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
 * The <b>wjFlexGridColumn</b> binding supports all read-write properties and events of
 * the {@link Column} class. The <b>isSelected</b> property provides two-way binding mode.
 *
 * In addition to regular attributes that match properties in the <b>Column</b> class,
 * an element with the {@link wjFlexGridColumn} binding may contain a {@link wjStyle} binding that
 * provides conditional formatting and an HTML fragment that is used as a cell template. Grid
 * rows automatically stretch vertically to fit custom cell contents.
 *
 * Both the <b>wjStyle</b> binding and the HTML fragment can use the <b>$item</b> observable variable in
 * KnockoutJS bindings to refer to the item that is bound to the current row. Also available are the
 * <b>$row</b> and <b>$col</b> observable variables containing cell row and column indexes. For example:
 *
 * <pre>&lt;div data-bind="wjFlexGridColumn: {
 *         header: 'Symbol',
 *         binding: 'symbol',
 *         readOnly: true,
 *         width: '*' }"&gt;
 *   &lt;a data-bind="attr: {
 *         href: 'https://finance.yahoo.com/q?s=' + $item().symbol() },
 *         text: $item().symbol"&gt;
 *   &lt;/a&gt;
 * &lt;/div&gt;
 * &lt;div data-bind="wjFlexGridColumn: {
 *      header: 'Change',
 *         binding: 'changePercent',
 *         format: 'p2',
 *         width: '*'
 *         },
 *         wjStyle: {
 *         color: getAmountColor($item().change) }"&gt;
 * &lt;/div&gt;</pre>
 *
 * These bindings create two columns.
 * The first has a template that produces a hyperlink based on the bound item's "symbol" property.
 * The second has a conditional style that renders values with a color determined by a function
 * implemented in the controller.
 */
export declare class wjFlexGridColumn extends WjBinding {
    _getControlConstructor(): any;
    _createControl(element: any): any;
    _createWijmoContext(): WjContext;
}
export declare class WjFlexGridColumnContext extends WjContext {
    _initControl(): void;
}
/**
 * KnockoutJS binding for conditional formatting of {@link FlexGrid} {@link Column} cells.
 *
 * Use the {@link wjStyle} binding together with the {@link wjFlexGridColumn} binding to provide
 * conditional formatting to column cells.
 * For example:
 *
 * <pre>&lt;div data-bind="wjFlexGridColumn: {
 *         header: 'Change',
 *         binding: 'changePercent',
 *         format: 'p2',
 *         width: '*'
 *         },
 *         wjStyle: { color: getAmountColor($item().change) }"&gt;&lt;/div&gt;</pre>
 *
 *
 * The <b>wjStyle</b> uses the same syntax as the native KnockoutJS
 * <a href="http://knockoutjs.com/documentation/style-binding.html" target="_blank">style</a> binding.
 * In addition to the view model properties, the following observable variables are available in binding
 * expressions:
 *
 * <dl class="dl-horizontal">
 *   <dt>$item</dt>  <dd>References the item that is bound to the current row.</dd>
 *   <dt>$row</dt>  <dd>The row index.</dd>
 *   <dt>$col</dt>  <dd>The column index.</dd>
 * </dl>
 */
export declare class wjStyle {
    preprocess: (value: string, name: string, addBinding: (name: string, value: string) => string) => string;
    init: () => void;
    static quoteString(s: string): string;
    static unquoteString(s: string): string;
}
