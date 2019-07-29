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
* {@module wijmo.angular.grid}
* AngularJS directives for wijmo.grid module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective, WjLink } from 'wijmo/wijmo.angular.base';
import * as wjcGrid from 'wijmo/wijmo.grid';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.grid";
/**
    * AngularJS directive for the {@link FlexGrid} control.
    *
    * Use the <b>wj-flex-grid</b> directive to add grids to your AngularJS applications.
    * Note that directive and parameter names must be formatted as lower-case with dashes
    * instead of camel-case. For example:
    *
    * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
    * &lt;wj-flex-grid items-source="data"&gt;
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
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * The example below creates a FlexGrid control and binds it to a 'data' array
    * exposed by the controller. The grid has three columns, each corresponding to
    * a property of the objects contained in the source array.
    *
    * <a href="http://jsfiddle.net/Wijmo5/QNb9X/" target="_blank">Example</a>
    *
    * The <b>wj-flex-grid</b> directive supports the following attributes:
    *
    * <dl class="dl-horizontal">
    *   <dt>allow-add-new</dt>              <dd><code>@</code> A value indicating whether to show a new row
    *                                     template so users can add items to the source collection.</dd>
    *   <dt>allow-delete</dt>             <dd><code>@</code> A value indicating whether the grid deletes the
    *                                     selected rows when the Delete key is pressed.</dd>
    *   <dt>allow-dragging</dt>           <dd><code>@</code> An {@link AllowDragging} value indicating
    *                                     whether and how the user can drag rows and columns with the mouse.</dd>
    *   <dt>allow-merging</dt>            <dd><code>@</code> An {@link AllowMerging} value indicating
    *                                     which parts of the grid provide cell merging.</dd>
    *   <dt>allow-resizing</dt>           <dd><code>@</code> An {@link AllowResizing} value indicating
    *                                     whether users are allowed to resize rows and columns with the mouse.</dd>
    *   <dt>allow-sorting</dt>            <dd><code>@</code> A boolean value indicating whether users can sort
    *                                     columns by clicking the column headers.</dd>
    *   <dt>auto-generate-columns</dt>    <dd><code>@</code> A boolean value indicating whether the grid generates
    *                                     columns automatically based on the <b>items-source</b>.</dd>
    *   <dt>child-items-path</dt>         <dd><code>@</code> The name of the property used to generate
    *                                     child rows in hierarchical grids (or an array of property names if items
    *                                     at different hierarchical levels use different names for their child items).</dd>
    *   <dt>control</dt>                  <dd><code>=</code> A reference to the {@link FlexGrid} control
    *                                     created by this directive.</dd>
    *   <dt>defer-resizing</dt>           <dd><code>=</code> A boolean value indicating whether row and column
    *                                     resizing should be deferred until the user releases the mouse button.</dd>
    *   <dt>frozen-columns</dt>           <dd><code>@</code> The number of frozen (non-scrollable) columns in the grid.</dd>
    *   <dt>frozen-rows</dt>              <dd><code>@</code> The number of frozen (non-scrollable) rows in the grid.</dd>
    *   <dt>group-header-format</dt>      <dd><code>@</code> The format string used to create the group
    *                                     header content.</dd>
    *   <dt>headers-visibility</dt>       <dd><code>=</code> A {@link HeadersVisibility} value
    *                                     indicating whether the row and column headers are visible. </dd>
    *   <dt>ime-enabled</dt>              <dd><code>@</code> Gets or sets a value that determines whether the grid should
    *                                     support Input Method Editors (IME) while not in edit mode.</dd>
    *   <dt>initialized</dt>              <dd><code>&</code> This event occurs after the binding has finished
    *                                     initializing the control with attribute values.</dd>
    *   <dt>is-initialized</dt>           <dd><code>=</code> A value indicating whether the binding has finished
    *                                     initializing the control with attribute values. </dd>
    *   <dt>item-formatter</dt>           <dd><code>=</code> A function that customizes
    *                                     cells on this grid.</dd>
    *   <dt>items-source</dt>             <dd><code>=</code> An array or {@link ICollectionView} object that
    *                                     contains the items shown on the grid.</dd>
    *   <dt>is-read-only</dt>             <dd><code>@</code> A boolean value indicating whether the user is
    *                                     prevented from editing grid cells by typing into them.</dd>
    *   <dt>merge-manager</dt>            <dd><code>=</code> A {@link MergeManager} object that specifies
    *                                     the merged extent of the specified cell.</dd>
    *   <dt>selection-mode</dt>           <dd><code>@</code> A {@link SelectionMode} value
    *                                     indicating whether and how the user can select cells.</dd>
    *   <dt>show-groups</dt>              <dd><code>@</code> A boolean value indicating whether to insert group
    *                                     rows to delimit data groups.</dd>
    *   <dt>show-sort</dt>                <dd><code>@</code> A boolean value indicating whether to display sort
    *                                     indicators in the column headers.</dd>
    *   <dt>sort-row-index</dt>           <dd><code>@</code> A number specifying the index of row in the column
    *                                     header panel that shows and changes the current sort.</dd>
    *   <dt>tree-indent</dt>              <dd><code>@</code> The indentation, in pixels, used to offset row
    *                                     groups of different levels.</dd>
    *   <dt>beginning-edit</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.beginningEdit} event.</dd>
    *   <dt>cell-edit-ended</dt>          <dd><code>&</code> Handler for the {@link FlexGrid.cellEditEnded} event.</dd>
    *   <dt>cell-edit-ending</dt>         <dd><code>&</code> Handler for the {@link FlexGrid.cellEditEnding} event.</dd>
    *   <dt>prepare-cell-for-edit</dt>    <dd><code>&</code> Handler for the {@link FlexGrid.prepareCellForEdit} event.</dd>
    *   <dt>resizing-column</dt>          <dd><code>&</code> Handler for the {@link FlexGrid.resizingColumn} event.</dd>
    *   <dt>resized-column</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.resizedColumn} event.</dd>
    *   <dt>dragged-column</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.draggedColumn} event.</dd>
    *   <dt>dragging-column</dt>          <dd><code>&</code> Handler for the {@link FlexGrid.draggingColumn} event.</dd>
    *   <dt>sorted-column</dt>            <dd><code>&</code> Handler for the {@link FlexGrid.sortedColumn} event.</dd>
    *   <dt>sorting-column</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.sortingColumn} event.</dd>
    *   <dt>deleting-row</dt>             <dd><code>&</code> Handler for the {@link FlexGrid.deletingRow} event.</dd>
    *   <dt>dragging-row</dt>             <dd><code>&</code> Handler for the {@link FlexGrid.draggingRow} event.</dd>
    *   <dt>dragged-row</dt>              <dd><code>&</code> Handler for the {@link FlexGrid.draggedRow} event.</dd>
    *   <dt>resizing-row</dt>             <dd><code>&</code> Handler for the {@link FlexGrid.resizingRow} event.</dd>
    *   <dt>resized-row</dt>              <dd><code>&</code> Handler for the {@link FlexGrid.resizedRow} event.</dd>
    *   <dt>row-added</dt>                <dd><code>&</code> Handler for the {@link FlexGrid.rowAdded} event.</dd>
    *   <dt>row-edit-ended</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.rowEditEnded} event.</dd>
    *   <dt>row-edit-ending</dt>          <dd><code>&</code> Handler for the {@link FlexGrid.rowEditEnding} event.</dd>
    *   <dt>loaded-rows</dt>              <dd><code>&</code> Handler for the {@link FlexGrid.loadedRows} event.</dd>
    *   <dt>loading-rows</dt>             <dd><code>&</code> Handler for the {@link FlexGrid.loadingRows} event.</dd>
    *   <dt>group-collapsed-changed</dt>  <dd><code>&</code> Handler for the {@link FlexGrid.groupCollapsedChanged} event.</dd>
    *   <dt>group-collapsed-changing</dt> <dd><code>&</code> Handler for the {@link FlexGrid.groupCollapsedChanging} event.</dd>
    *   <dt>items-source-changed</dt>     <dd><code>&</code> Handler for the {@link FlexGrid.itemsSourceChanged} event.</dd>
    *   <dt>selection-changing</dt>       <dd><code>&</code> Handler for the {@link FlexGrid.selectionChanging} event.</dd>
    *   <dt>selection-changed</dt>        <dd><code>&</code> Handler for the {@link FlexGrid.selectionChanged} event.</dd>
    *   <dt>got-focus</dt>                <dd><code>&</code> Handler for the {@link FlexGrid.gotFocus} event.</dd>
    *   <dt>lost-focus</dt>               <dd><code>&</code> Handler for the {@link FlexGrid.lostFocus} event.</dd>
    *   <dt>scroll-position-changed</dt>  <dd><code>&</code> Handler for the {@link FlexGrid.scrollPositionChanged} event.</dd>
    * </dl>
    *
    * The <b>wj-flex-grid</b> directive may contain {@link wijmo.angular.grid.WjFlexGridColumn}, {@link wijmo.angular.grid.WjFlexGridCellTemplate} and
    * {@link wijmo.angular.grid.detail.WjFlexGridDetail} child directives.
    */
export declare class WjFlexGrid extends WjDirective {
    _$compile: any;
    _$interpolate: any;
    constructor($compile: any, $interpolate: any);
    readonly _controlConstructor: typeof wjcGrid.FlexGrid;
    _createLink(): WjLink;
    _initProps(): void;
}
/**
 * AngularJS directive for the {@link Column} object.
 *
 * The <b>wj-flex-grid-column</b> directive must be contained in a {@link wijmo.angular.grid.WjFlexGrid} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>aggregate</dt>         <dd><code>@</code> The {@link Aggregate} object to display in
 *                              the group header rows for this column.</dd>
 *   <dt>align</dt>             <dd><code>@</code> The string value that sets the horizontal
 *                              alignment of items in the column to left, right, or center.</dd>
 *   <dt>allow-dragging</dt>    <dd><code>@</code> The value indicating whether the user can move
 *                              the column to a new position with the mouse.</dd>
 *   <dt>allow-sorting</dt>     <dd><code>@</code> The value indicating whether the user can sort
 *                              the column by clicking its header.</dd>
 *   <dt>allow-resizing</dt>    <dd><code>@</code> The value indicating whether the user can
 *                              resize the column with the mouse.</dd>
 *   <dt>allow-merging</dt>     <dd><code>@</code> The value indicating whether the user can merge
 *                              cells in the column.</dd>
 *   <dt>binding</dt>           <dd><code>@</code> The name of the property to which the column is
 *                              bound.</dd>
 *   <dt>css-class</dt>         <dd><code>@</code> The name of a CSS class to use when
 *                              rendering the column.</dd>
 *   <dt>data-map</dt>          <dd><code>=</code> The {@link DataMap} object to use to convert raw
 *                              values into display values for the column.</dd>
 *   <dt>data-type</dt>         <dd><code>@</code> The enumerated {@link DataType} value that indicates
 *                              the type of value stored in the column.</dd>
 *   <dt>format</dt>            <dd><code>@</code> The format string to use to convert raw values
 *                              into display values for the column (see {@link Globalize}).</dd>
 *   <dt>header</dt>            <dd><code>@</code> The string to display in the column header.</dd>
 *   <dt>input-type</dt>        <dd><code>@</code> The type attribute to specify the input element
 *                              used to edit values in the column. The default is "tel" for numeric
 *                              columns, and "text" for all other non-Boolean columns.</dd>
 *   <dt>is-content-html</dt>   <dd><code>@</code> The value indicating whether cells in the column
 *                              contain HTML content rather than plain text.</dd>
 *   <dt>is-read-only</dt>      <dd><code>@</code> The value indicating whether the user is prevented
 *                              from editing values in the column.</dd>
 *   <dt>is-selected</dt>       <dd><code>@</code> The value indicating whether the column is selected.</dd>
 *   <dt>mask</dt>              <dd><code>@</code> The mask string used to edit values in the
 *                              column.</dd>
 *   <dt>max-width</dt>         <dd><code>@</code> The maximum width for the column.</dd>
 *   <dt>min-width</dt>         <dd><code>@</code> The minimum width for the column.</dd>
 *   <dt>name</dt>              <dd><code>@</code> The column name. You can use it to retrieve the
 *                              column.</dd>
 *   <dt>is-required</dt>       <dd><code>@</code> The value indicating whether the column must contain
 *                              non-null values.</dd>
 *   <dt>show-drop-down</dt>    <dd><code>@</code> The value indicating whether to show drop-down buttons
 *                              for editing based on the column's {@link DataMap}.</dd>
 *   <dt>visible</dt>           <dd><code>@</code> The value indicating whether the column is visible.</dd>
 *   <dt>width</dt>             <dd><code>@</code> The width of the column in pixels or as a
 *                              star value.</dd>
 *   <dt>word-wrap</dt>         <dd><code>@</code> The value indicating whether cells in the column wrap
 *                              their content.</dd>
 * </dl>
 *
 * Any html content within the <b>wj-flex-grid-column</b> directive is treated as a template for the cells in that column.
 * The template is applied only to regular cells. If you wish to apply templates to specific cell types such as
 * column or group headers, then please see the {@link wijmo.angular.grid.WjFlexGridCellTemplate} directive.
 *
 * The following example creates two columns with a template and a conditional style:
 *
 * <a href="http://jsfiddle.net/Wijmo5/5L423/" target="_blank">Example</a>
 *
 * The <b>wj-flex-grid-column</b> directive may contain {@link wijmo.angular.grid.WjFlexGridCellTemplate} child directives.
 */
export declare class WjFlexGridColumn extends WjDirective {
    static _colTemplateProp: string;
    static _colWjLinkProp: string;
    static _cellCtxProp: string;
    _$compile: any;
    constructor($compile: any);
    readonly _controlConstructor: typeof wjcGrid.Column;
    _initControl(element: any): any;
    _createLink(): WjLink;
}
/**
 * Defines the type of cell to which the template applies.
 * This value is specified in the <b>cell-type</b> attribute
 * of the {@link wijmo.angular.grid.WjFlexGridCellTemplate} directive.
 */
export declare enum CellTemplateType {
    /** Defines a regular (data) cell. */
    Cell = 0,
    /** Defines a cell in edit mode. */
    CellEdit = 1,
    /** Defines a column header cell. */
    ColumnHeader = 2,
    /** Defines a row header cell. */
    RowHeader = 3,
    /** Defines a row header cell in edit mode. */
    RowHeaderEdit = 4,
    /** Defines a top left cell. */
    TopLeft = 5,
    /** Defines a group header cell in a group row. */
    GroupHeader = 6,
    /** Defines a regular cell in a group row. */
    Group = 7,
    /** Defines a column footer cell. */
    ColumnFooter = 8,
    /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
    BottomLeft = 9
}
/**
 * AngularJS directive for the {@link FlexGrid} cell templates.
 *
 * The <b>wj-flex-grid-cell-template</b> directive defines a template for a certain
 * cell type in {@link FlexGrid}, and must contain a <b>cell-type</b> attribute that
 * specifies the {@link CellTemplateType}. Depending on the template's cell type,
 * the <b>wj-flex-grid-cell-template</b> directive must be a child of either {@link wijmo.angular.grid.WjFlexGrid}
 * or {@link wijmo.angular.grid.WjFlexGridColumn} directives.
 *
 * Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
 * directives, and cells that are not column-specific (like row header or top left cells)
 * must be contained in the <b>wj-flex-grid directive</b>.
 *
 * In addition to an HTML fragment, <b>wj-flex-grid-cell-template</b> directives may
 * contain an <b>ng-style</b> or <b>ng-class</b> attribute that provides conditional formatting for cells.
 *
 * Both the <b>ng-style/ng-class</b> attributes and the HTML fragment can use the <b>$col</b>,
 * <b>$row</b> and <b>$item</b> template variables that refer to the {@link Column},
 * {@link Row} and <b>Row.dataItem</b> objects pertaining to the cell.
 *
 * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>$value</b>
 * variable containing an unformatted cell value is provided. For example, here is a
 * FlexGrid control with templates for row headers and for the Country column's regular
 * and column header cells:
 *
 * <pre>&lt;wj-flex-grid items-source="data"&gt;
 *   &lt;wj-flex-grid-cell-template cell-type="RowHeader"&gt;
 *     {&#8203;{$row.index}}
 *   &lt;/wj-flex-grid-cell-template&gt;
 *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
 *     ...
 *   &lt;/wj-flex-grid-cell-template&gt;
 * &nbsp;
 *   &lt;wj-flex-grid-column header="Country" binding="country"&gt;
 *     &lt;wj-flex-grid-cell-template cell-type="ColumnHeader"&gt;
 *       &lt;img ng-src="resources/globe.png" /&gt;
 *         {&#8203;{$col.header}}
 *       &lt;/wj-flex-grid-cell-template&gt;
 *       &lt;wj-flex-grid-cell-template cell-type="Cell"&gt;
 *         &lt;img ng-src="resources/{&#8203;{$item.country}}.png" /&gt;
 *         {&#8203;{$item.country}}
 *       &lt;/wj-flex-grid-cell-template&gt;
 *     &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column header="Sales" binding="sales"&gt;&lt;/wj-flex-grid-column&gt;
 * &lt;/wj-flex-grid&gt;</pre>
 *
 * For more detailed information on specific cell type templates refer to the
 * documentation for the {@link CellTemplateType} enumeration.
 *
 * Note that the <b>wj-flex-grid-column</b> directive may also contain arbitrary content
 * that is treated as a template for a regular data cell (<i>cell-type="Cell"</i>). But if
 * a <b>wj-flex-grid-cell-template</b> directive exists and is set to <i>cell-type="Cell"</i>
 * under the <b>wj-flex-grid-column</b> directive, it takes priority and overrides the
 * arbitrary content.
 *
 * The <b>wj-flex-grid-cell-template</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>cell-type</dt>
 *   <dd><code>@</code>
 *     The {@link CellTemplateType} value defining the type of cell the template applies to.
 *   </dd>
 *   <dt>auto-size-rows</dt>
 *   <dd><code>@</code>
 *     Indicates whether the cell template will increase grid's default row height to accommodate
 *     cells content. Defaults to true.
 *   </dd>
 *   <dt>cell-overflow</dt>
 *   <dd><code>@</code>
 *     Defines the <b>style.overflow</b> property value for cells.
 *   </dd>
 *   <dt>force-full-edit</dt>
 *   <dd><code>@</code>
 *     For cell edit templates, indicates whether cell editing forcibly starts in full edit mode,
 *     regardless of how the editing was initiated. In full edit mode pressing cursor keys don't finish editing.
 *     Defaults to true.
 *   </dd>
 * </dl>
 *
 * The <b>cell-type</b> attribute takes any of the following enumerated values:
 *
 * <b>Cell</b>
 *
 * Defines a regular (data) cell template. Must be a child of the {@link wijmo.angular.grid.WjFlexGridColumn} directive.
 * For example, this cell template shows flags in the Country column's cells:
 *
 * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
 *   &lt;wj-flex-grid-cell-template cell-type="Cell"&gt;
 *     &lt;img ng-src="resources/{&#8203;{$item.country}}.png" /&gt;
 *     {&#8203;{$item.country}}
 *   &lt;/wj-flex-grid-cell-template&gt;
 * &lt;/wj-flex-grid-column&gt;</pre>
 *
 * For a hierarchical {@link FlexGrid} (that is, one with the <b>childItemsPath</b> property
 * specified), if no <b>Group</b> template is provided, non-header cells in group rows in
 * this {@link Column} also use this template.
 *
 * <b>CellEdit</b>
 *
 * Defines a template for a cell in edit mode. Must be a child of the {@link wijmo.angular.grid.WjFlexGridColumn} directive.
 * This cell type has an additional <b>$value</b> property available for binding. It contains the
 * original cell value before editing, and the updated value after editing.
 
    * For example, here is a template that uses the Wijmo {@link InputNumber} control as an editor
    * for the "Sales" column:
    *
    * <pre>&lt;wj-flex-grid-column header="Sales" binding="sales"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="CellEdit"&gt;
    *     &lt;wj-input-number value="$value" step="1"&gt;&lt;/wj-input-number&gt;
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>ColumnHeader</b>
    *
    * Defines a template for a column header cell. Must be a child of the {@link wijmo.angular.grid.WjFlexGridColumn} directive.
    * For example, this template adds an image to the header of the "Country" column:
    *
    * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="ColumnHeader"&gt;
    *     &lt;img ng-src="resources/globe.png" /&gt;
    *     {&#8203;{$col.header}}
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>RowHeader</b>
    *
    * Defines a template for a row header cell. Must be a child of the {@link wijmo.angular.grid.WjFlexGrid} directive.
    * For example, this template shows row indices in the row headers:
    *
    * <pre>&lt;wj-flex-grid items-source="data"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="RowHeader"&gt;
    *     {&#8203;{$row.index}}
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * Note that this template is applied to a row header cell, even if it is in a row that is
    * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
    * content, define the <b>RowHeaderEdit</b> template.
    *
    * <b>RowHeaderEdit</b>
    *
    * Defines a template for a row header cell in edit mode. Must be a child of the
    * {@link wijmo.angular.grid.WjFlexGrid} directive. For example, this template shows dots in the header
    * of rows being edited:
    *
    * <pre>&lt;wj-flex-grid items-source="data"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
    *       ...
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * To add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
    * applies, use the following <b>RowHeaderEdit</b> template:
    *
    * <pre>&lt;wj-flex-grid items-source="data"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
    *     {&#8203;{&amp;#x270e;}}
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * <b>TopLeft</b>
    *
    * Defines a template for the top left cell. Must be a child of the {@link wijmo.angular.grid.WjFlexGrid} directive.
    * For example, this template shows a down/right glyph in the top-left cell of the grid:
    *
    * <pre>&lt;wj-flex-grid items-source="data"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="TopLeft"&gt;
    *     &lt;span class="wj-glyph-down-right"&gt;&lt;/span&gt;
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
    *
    * <p><b>GroupHeader</b></p>
    *
    * Defines a template for a group header cell in a {@link GroupRow}, Must be a child of the {@link wijmo.angular.grid.WjFlexGridColumn} directive.
    *
    * The <b>$row</b> variable contains an instance of the <b>GroupRow</b> class. If the grouping comes
    * from the a {@link CollectionView}, the <b>$item</b> variable references the {@link CollectionViewGroup} object.
    *
    * For example, this template uses a checkbox element as an expand/collapse toggle:
    *
    * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="GroupHeader"&gt;
    *     &lt;input type="checkbox" ng-model="$row.isCollapsed"/&gt;
    *     {&#8203;{$item.name}} ({&#8203;{$item.items.length}} items)
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>Group</b>
    *
    * Defines a template for a regular cell (not a group header) in a {@link GroupRow}. Must be a child of the
    * {@link wijmo.angular.grid.WjFlexGridColumn} directive. This cell type has an additional <b>$value</b> varible available for
    * binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
    * aggregate value.
    *
    * For example, this template shows an aggregate's value and kind for group row cells in the "Sales"
    * column:
    *
    * <pre>&lt;wj-flex-grid-column header="Sales" binding="sales" aggregate="Avg"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="Group"&gt;
    *     Average: {&#8203;{$value | number:2}}
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>ColumnFooter</b>
*
* Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
* {@link wijmo.angular.grid.WjFlexGridColumn} directive. This cell type has an additional <b>$value</b>
* property available for binding that contains a cell value.
*
* For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
* column:
*
* <pre>&lt;wj-flex-grid-column header="Sales" binding="sales" aggregate="Avg"&gt;
*   &lt;wj-flex-grid-cell-template cell-type="ColumnFooter"&gt;
*     Average: {&#8203;{$value | number:2}}
*   &lt;/wj-flex-grid-cell-template&gt;
* &lt;/wj-flex-grid-column&gt;</pre>
*
* <b>BottomLeft</b>
*
* Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
* Must be a child of the {@link wijmo.angular.grid.WjFlexGrid} directive.
* For example, this template shows a sigma glyph in the bottom-left cell of the grid:
*
* <pre>&lt;wj-flex-grid items-source="data"&gt;
*   &lt;wj-flex-grid-cell-template cell-type="BottomLeft"&gt;
*    &amp;#931;
*   &lt;/wj-flex-grid-cell-template&gt;
* &lt;/wj-flex-grid&gt;</pre>
    */
export declare class WjFlexGridCellTemplate extends WjDirective {
    static _tagName: string;
    static _getTemplContextProp(templateType: CellTemplateType): string;
    constructor();
    _initControl(element: any): any;
    _createLink(): WjLink;
    _getMetaDataId(): any;
}
