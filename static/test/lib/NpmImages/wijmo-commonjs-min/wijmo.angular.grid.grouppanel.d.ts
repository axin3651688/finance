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
* {@module wijmo.angular.grid.grouppanel}
* AngularJS directives for wijmo.angular.grid.grouppanel module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective } from 'wijmo/wijmo.angular.base';
import * as wjcGridGroup from 'wijmo/wijmo.grid.grouppanel';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.grid.grouppanel";
/**
 * AngularJS directive for the {@link GroupPanel} control.
 *
 * The <b>wj-group-panel</b> directive connects to the <b>FlexGrid</b> control via the <b>grid</b> property.
 * For example:
 *
 * <pre>&lt;p&gt;Here is a FlexGrid control with GroupPanel:&lt;/p&gt;
 * &nbsp;
 * &lt;wj-group-panel grid="flex" placeholder="Drag columns here to create groups."&gt;&lt;/wj-group-panel&gt;
 * &nbsp;
 * &lt;wj-flex-grid control="flex" items-source="data"&gt;
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
 * The <b>wj-group-panel</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>grid</dt>                      <dd><code>@</code>The <b>FlexGrid</b> that is connected to this <b>GroupPanel</b>.</dd>
 *   <dt>hide-grouped-columns</dt>      <dd><code>@</code>A value indicating whether the panel hides grouped columns
 *                                      in the owner grid.</dd>
 *   <dt>max-groups</dt>                <dd><code>@</code>The maximum number of groups allowed.</dd>
 *   <dt>placeholder</dt>               <dd><code>@</code>A string to display in the control when it
 *                                      contains no groups.</dd>
 *   <dt>got-focus</dt>                 <dd><code>&</code> Handler for the {@link GroupPanel.gotFocus} event.</dd>
 *   <dt>lost-focus</dt>                <dd><code>&</code> Handler for the {@link GroupPanel.lostFocus} event.</dd>
 * </dl>
 *
 */
export declare class WjGroupPanel extends WjDirective {
    readonly _controlConstructor: typeof wjcGridGroup.GroupPanel;
}
