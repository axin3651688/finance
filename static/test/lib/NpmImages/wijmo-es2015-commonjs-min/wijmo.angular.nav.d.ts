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
* {@module wijmo.angular.nav}
* AngularJS directives for wijmo.nav module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective, WjLink } from 'wijmo/wijmo.angular.base';
import * as wjcNav from 'wijmo/wijmo.nav';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.nav";
/**
 * AngularJS directive for the {@link TreeView} control.
 *
 * Use the <b>wj-tree-view</b> directive to add TreeView to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;wj-tree-view  items-source="items"
 *   display-member-path="ctx.displayMemberPath"
 *   child-items-path="ctx.childItemsPath"
 *   is-animated="ctx.isAnimated"&gt;
 * &lt;/wj-tree-view&gt;</pre>
 *
 * The <b>wj-tree-view</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>items-source</dt>          <dd><code>=</code>An array that contains the {@link TreeView} items. </dd>
 *   <dt>child-items-path</dt>      <dd><code>@</code> A value indicating the name of the property (or properties)
 *                                  that contains the child items for each node.</dd>
 *   <dt>control</dt>               <dd><code>=</code> A reference to the {@link TreeView}
 *                                  control created by this directive. </dd>
 *   <dt>display-member-path</dt>   <dd><code>@</code> A value indicating the name of the property (or properties)
 *                                  to use as the visual representation of the nodes. </dd>
 *   <dt>image-member-path</dt>     <dd><code>@</code> A value indicating the name of the property (or properties) to
 *                                  use as a source of images for the nodes. </dd>
 *   <dt>is-content-html</dt>       <dd><code>@</code> A value indicating whether whether items
 *                                  are bound to plain text or HTML. </dd>
 *   <dt>initialized</dt>           <dd><code>&</code> This event occurs after the binding has finished
 *                                  initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>        <dd><code>=</code> A value indicating whether the binding has finished
 *                                  initializing the control with attribute values. </dd>
 *   <dt>show-checkboxes</dt>       <dd><code>@</code> A value determines whether the {@link TreeView} should
 *                                  add checkboxes to nodes and manage their state.</dd>
 *   <dt>auto-collapse</dt>         <dd><code>@</code> A value determines if sibling nodes should be collapsed
 *                                  when a node is expanded.</dd>
 *   <dt>is-animated</dt>           <dd><code>@</code> A value indicating whether to use animations when expanding
 *                                  or collapsing nodes.</dd>
 *   <dt>is-readOnly</dt>           <dd><code>@</code> A value determines whether users can edit the text in the
 *                                  nodes.</dd>
 *   <dt>allow-dragging</dt>        <dd><code>@</code> A value determines whether users can drag and drop nodes
 *                                  within the {@link TreeView}.</dd>
 *   <dt>expand-on-click</dt>       <dd><code>@</code> A value determines whether to expand collapsed nodes when
 *                                  the user clicks the node header.</dd>
 *   <dt>selected-item</dt>         <dd><code>@</code> A value indicating the data item that is currently
 *                                  selected.</dd>
 *   <dt>selected-node</dt>         <dd><code>@</code> A value indicating {@link TreeNode} that is currently
 *                                  selected.</dd>
 *   <dt>checked-items</dt>         <dd><code>@</code> An array containing the items that are currently
 *                                  checked.</dd>
 *   <dt>lazy-load-function</dt>   <dd><code>=</code> A function that loads child nodes on demand.</dd>
 *   <dt>items-source-changed</dt>  <dd><code>&</code> The {@link TreeView.itemsSourceChanged} event handler.</dd>
 *   <dt>loading-items</dt>         <dd><code>&</code> The {@link TreeView.loadingItems} event handler.</dd>
 *   <dt>loaded-items</dt>          <dd><code>&</code> The {@link TreeView.loadedItems} event handler.</dd>
 *   <dt>item-clicked</dt>          <dd><code>&</code> The {@link TreeView.itemClicked} event handler.</dd>
 *   <dt>selected-item-changed</dt> <dd><code>&</code> The {@link TreeView.selectedItemChanged} event handler.</dd>
 *   <dt>checked-items-Changed</dt> <dd><code>&</code> The {@link TreeView.checkedItemsChanged} event handler.</dd>
 *   <dt>is-collapsed-changing</dt> <dd><code>&</code> The {@link TreeView.isCollapsedChanging} event handler.</dd>
 *   <dt>is-collapsed-changed</dt>  <dd><code>&</code> The {@link TreeView.isCollapsedChanged} event handler.</dd>
 *   <dt>is-checked-changing</dt>   <dd><code>&</code> The {@link TreeView.isCheckedChanging} event handler.</dd>
 *   <dt>is-checked-changed</dt>    <dd><code>&</code> The {@link TreeView.isCheckedChanged} event handler.</dd>
 *   <dt>format-item</dt>           <dd><code>&</code> The {@link TreeView.formatItem} event handler.</dd>
 *   <dt>drag-start</dt>            <dd><code>&</code> The {@link TreeView.dragStart} event handler.</dd>
 *   <dt>drag-over</dt>             <dd><code>&</code> The {@link TreeView.dragOver} event handler.</dd>
 *   <dt>drop</dt>                  <dd><code>&</code> The {@link TreeView.drop} event handler.</dd>
 *   <dt>drag-end</dt>              <dd><code>&</code> The {@link TreeView.dragEnd} event handler.</dd>
 *   <dt>node-edit-starting</dt>    <dd><code>&</code> The {@link TreeView.nodeEditStarting} event handler.</dd>
 *   <dt>node-edit-started</dt>     <dd><code>&</code> The {@link TreeView.nodeEditStarted} event handler.</dd>
 *   <dt>node-edit-ending</dt>      <dd><code>&</code> The {@link TreeView.nodeEditEnding} event handler.</dd>
 *   <dt>node-edit-ended</dt>       <dd><code>&</code> The {@link TreeView.nodeEditEnded} event handler.</dd>
 * </dl>
 */
export declare class WjTreeView extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcNav.TreeView;
}
/**
 * AngularJS directive for the {@link TabPanel} control.
 *
 * Use the <b>wj-tab-panel</b> directive to add TabPanel to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;wj-tab-panel&gt;
 *    &lt;wj-tab&gt;
 *      &lt;a&gt;Tab1 Header&lt;/a&gt;
 *      &lt;div&gt;
 *          Tab1 content
 *      &lt;/div&gt;
 *    &lt;/wj-tab&gt;
 *    &lt;wj-tab is-disabled="true"&gt;
 *      &lt;a&gt;Tab2 Header&lt;/a&gt;
 *      &lt;div&gt;
 *          Tab2 content
 *      &lt;/div&gt;
 *    &lt;/wj-tab&gt;
 * &lt;/wj-tab-panel&gt;</pre>
 *
 * The <b>wj-tab-panel</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>is-animated</dt>           <dd><code>@</code>A value that determines whether tab changes should be animated
 *                                  with a fade-in effect. </dd>
 *   <dt>auto-switch</dt>           <dd><code>@</code> A value that determines whether the control should switch
 *                                  tabs automatically when the user selects a tab using the arrow keys.</dd>
 *   <dt>control</dt>               <dd><code>=</code> A reference to the {@link TabPanel}
 *                                  control created by this directive. </dd>
 *   <dt>selected-index</dt>        <dd><code>=</code> The index of the currently selected (active) tab. </dd>
 *   <dt>selected-tab</dt>        <dd><code>=</code> The {@link Tab} object that is currently selected. </dd>
 *   <dt>initialized</dt>           <dd><code>&</code> This event occurs after the binding has finished
 *                                  initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>        <dd><code>=</code> A value indicating whether the binding has finished
 *                                  initializing the control with attribute values. </dd>
 *   <dt>selected-index-changed</dt>  <dd><code>&</code> The {@link TabPanel.selectedIndexChanged} event handler.</dd>
 * </dl>
 *
 * The <b>wj-tab-panel</b> directive may contain one or more {@link wijmo.angular.nav.WjTab} directives.
 *
 */
export declare class WjTabPanel extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcNav.TabPanel;
    _initControl(element: any): any;
    _createLink(): WjLink;
}
/**
 * AngularJS directive for the {@link Tab} object.
 *
 * The <b>wj-tab</b> directive must be contained in a {@link TabPanel} directive.
 * It adds the Tab object to the 'tabs' array property of the parent directive.
 *
 * For example:
 * <pre>&lt;wj-tab-panel&gt;
 *    &lt;wj-tab&gt;
 *      &lt;a&gt;Tab1 Header&lt;/a&gt;
 *      &lt;div&gt;
 *          Tab1 content
 *      &lt;/div&gt;
 *    &lt;/wj-tab&gt;
 *    &lt;wj-tab is-disabled="true"&gt;
 *      &lt;a&gt;Tab2 Header&lt;/a&gt;
 *      &lt;div&gt;
 *          Tab2 content
 *      &lt;/div&gt;
 *    &lt;/wj-tab&gt;
 * &lt;/wj-tab-panel&gt;</pre>
 *
 * The <b>wj-tab</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>is-disabled</dt>   <dd><code>@</code> A value that determines whether this {@link Tab} is disabled.</dd>
 *   <dt>is-visible</dt>    <dd><code>@</code> A value that determines whether this {@link Tab} is visible.</dd>
 * </dl>
 */
export declare class WjTab extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcNav.Tab;
    _initControl(element: any): any;
}
