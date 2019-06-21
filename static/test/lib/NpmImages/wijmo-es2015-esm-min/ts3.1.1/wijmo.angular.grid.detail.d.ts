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
* {@module wijmo.angular.grid.detail}
* AngularJS directives for wijmo.angular.grid.detail module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective, WjLink } from 'wijmo/wijmo.angular.base';
import * as wjcGridDetail from 'wijmo/wijmo.grid.detail';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.grid.detail";
/**
 * AngularJS directive for {@link FlexGrid} {@link DetailRow} templates.
 *
 * The <b>wj-flex-grid-detail</b> directive must be contained in a
 * <b>wj-flex-grid</b> directive.
 *
 * The <b>wj-flex-grid-detail</b> directive represents a {@link FlexGridDetailProvider}
 * object that maintains detail rows visibility, with detail rows content defined as
 * an arbitrary HTML fragment within the directive tag. The fragment may contain
 * AngularJS bindings and directives.
 * In addition to any properties available in a controller, the local <b>$row</b> and
 * <b>$item</b> template variables can be used in AngularJS bindings that refer to
 * the detail row's parent {@link Row} and <b>Row.dataItem</b> objects. For example:
 *
 * <pre>&lt;p&gt;Here is a detail row with a nested FlexGrid:&lt;/p&gt;
 * &nbsp;
 * &lt;wj-flex-grid
 *   items-source="categories"&gt;
 *   &lt;wj-flex-grid-column header="Name" binding="CategoryName"&gt;&lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column header="Description" binding="Description" width="*"&gt;&lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-detail max-height="250" detail-visibility-mode="detailMode"&gt;
 *     &lt;wj-flex-grid
 *       items-source="getProducts($item.CategoryID)"
 *       headers-visibility="Column"&gt;
 *     &lt;/wj-flex-grid&gt;
 *   &lt;/wj-flex-grid-detail&gt;
 * &lt;/wj-flex-grid&gt;</pre>
 *
 * A reference to a <b>FlexGridDetailProvider</b> object represented by the
 * <b>wj-flex-grid-detail</b> directive can be retrieved in a usual way by binding
 * to the directive's <b>control</b> property. This makes all the API provided by
 * <b>FlexGridDetailProvider</b> available for usage in the template, giving you total
 * control over the user experience. The following example adds a custom show/hide toggle
 * to the Name column cells, and a Hide Detail button to the detail row. These elements call
 * the <b>FlexGridDetailProvider</b>, <b>hideDetail</b> and <b>showDetail</b> methods in
 * their <b>ng-click</b> bindings to implement the custom show/hide logic:
 *
 * <pre>&lt;p&gt;Here is a FlexGrid with custom show/hide detail elements:&lt;/p&gt;
 * &nbsp;
 * &lt;wj-flex-grid
 *   items-source="categories"
 *   headers-visibility="Column"
 *   selection-mode="Row"&gt;
 *   &lt;wj-flex-grid-column header="Name" binding="CategoryName" is-read-only="true" width="200"&gt;
 *     &lt;img ng-show="dp.isDetailVisible($row)" ng-click="dp.hideDetail($row)" src="resources/hide.png" /&gt;
 *     &lt;img ng-hide="dp.isDetailVisible($row)" ng-click="dp.showDetail($row, true)" src="resources/show.png" /&gt;
 *     {&#8203;{$item.CategoryName}}
 *   &lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-column header="Description" binding="Description" width="2*"&gt;&lt;/wj-flex-grid-column&gt;
 *   &lt;wj-flex-grid-detail control="dp" detail-visibility-mode="Code"&gt;
 *     &lt;div style="padding:12px;background-color:#cee6f7"&gt;
 *       ID: &lt;b&gt;{&#8203;{$item.CategoryID}}&lt;/b&gt;&lt;br /&gt;
 *       Name: &lt;b&gt;{&#8203;{$item.CategoryName}}&lt;/b&gt;&lt;br /&gt;
 *       Description: &lt;b&gt;{&#8203;{$item.Description}}&lt;/b&gt;&lt;br /&gt;
 *       &lt;button class="btn btn-default" ng-click="dp.hideDetail($row)"&gt;Hide Detail&lt;/button&gt;
 *     &lt;/div&gt;
 *   &lt;/wj-flex-grid-detail&gt;
 * &lt;/wj-flex-grid&gt;</pre>
 *
 * The <b>wj-flex-grid-detail</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>control</dt>                <dd><code>=</code> A reference to the {@link FlexGridDetailProvider} object
 *                                   created by this directive.</dd>
 *   <dt>detail-visibility-mode</dt> <dd><code>@</code>A {@link DetailVisibilityMode} value that determines when
 *                                   to display the row details.</dd>
 *   <dt>max-height</dt>             <dd><code>@</code>The maximum height of the detail rows, in pixels.</dd>
 *   <dt>row-has-detail</dt>         <dd><code>=</code>The callback function that determines whether a row
 *                                       has details.</dd>
 * </dl>
 *
 */
export declare class WjFlexGridDetail extends WjDirective {
    static _detailTemplateProp: string;
    static _detailScopeProp: string;
    _$compile: any;
    constructor($compile: any);
    readonly _controlConstructor: typeof wjcGridDetail.FlexGridDetailProvider;
    _createLink(): WjLink;
}
