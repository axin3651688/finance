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
* {@module wijmo.angular.input}
* AngularJS directives for wijmo.input module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { Control } from 'wijmo/wijmo';
import { WjDirective, WjLink } from 'wijmo/wijmo.angular.base';
import * as wjcInput from 'wijmo/wijmo.input';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.input";
export declare class WjDropDown extends WjDirective {
    readonly _controlConstructor: typeof wjcInput.DropDown;
}
/**
 * AngularJS directive for the {@link ComboBox} control.
 *
 * Use the <b>wj-combo-box</b> directive to add <b>ComboBox</b> controls to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is a ComboBox control:&lt;/p&gt;
 * &lt;wj-combo-box
 *   text="theCountry"
 *   items-source="countries"
 *   is-editable="false"
 *   placeholder="country"&gt;
 * &lt;/wj-combo-box&gt;</pre>
 *
 * The example below creates a <b>ComboBox</b> control and binds it to a 'countries' array
 * exposed by the controller. The <b>ComboBox</b> searches for the country as the user
 * types. The <b>isEditable</b> property is set to false, so the user is forced to
 * select one of the items in the list.
 *
 * <a href="http://jsfiddle.net/Wijmo5/37GHw/" target="_blank">Example</a>
 *
 * The <b>wj-combo-box</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>selectedValue</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
 *                               <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>              <dd><code>=</code> A reference to the {@link ComboBox} control created by this directive.</dd>
 *   <dt>display-member-path</dt>  <dd><code>@</code> The name of the property to use as the visual representation of the items.</dd>
 *   <dt>is-content-html</dt>      <dd><code>@</code> A value indicating whether the drop-down list displays the items as plain text or as HTML.</dd>
 *   <dt>is-dropped-down</dt>      <dd><code>@</code> A value indicating whether the drop down list is currently visible.</dd>
 *   <dt>is-editable</dt>          <dd><code>@</code> A value indicating whether the user can enter values not present on the list.</dd>
 *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values.</dd>
 *   <dt>item-formatter</dt>       <dd><code>=</code> A function used to customize the values shown in the drop-down list.</dd>
 *   <dt>items-source</dt>         <dd><code>=</code> An array or {@link ICollectionView} that contains items to show in the list.</dd>
 *   <dt>max-drop-down-height</dt> <dd><code>@</code> The maximum height of the drop-down list.</dd>
 *   <dt>max-drop-down-width</dt>  <dd><code>@</code> The maximum width of the drop-down list.</dd>
 *   <dt>placeholder</dt>          <dd><code>@</code> A string shown as a hint when the control is empty.</dd>
 *   <dt>is-required</dt>          <dd><code>@</code> A value indicating whether to prevent null values.</dd>
 *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
 *   <dt>selected-index</dt>       <dd><code>=</code> The index of the currently selected item in the drop-down list.</dd>
 *   <dt>selected-item</dt>        <dd><code>=</code> The currently selected item in the drop-down list.</dd>
 *   <dt>selected-value</dt>       <dd><code>=</code> The value of the selected item, obtained using the <b>selected-value-path</b>.</dd>
 *   <dt>selected-value-path</dt>  <dd><code>@</code> The name of the property used to get the <b>selected-value</b> from the <b>selected-item</b>.</dd>
 *   <dt>text</dt>                 <dd><code>=</code> The text to show in the control.</dd>
 *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The {@link ComboBox.isDroppedDownChanging} event handler.</dd>
 *   <dt>is-dropped-down-changed</dt>  <dd><code>&</code> The {@link ComboBox.isDroppedDownChanged} event handler.</dd>
 *   <dt>selected-index-changed</dt>   <dd><code>&</code> The {@link ComboBox.selectedIndexChanged} event handler.</dd>
 *   <dt>got-focus</dt>            <dd><code>&</code> The {@link ComboBox.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>           <dd><code>&</code> The {@link ComboBox.lostFocus} event handler.</dd>
 *   <dt>text-changed</dt>         <dd><code>&</code> The {@link ComboBox.textChanged} event handler.</dd>
 * </dl>
 */
export declare class WjComboBox extends WjDropDown {
    _$compile: any;
    constructor($compile: any);
    readonly _controlConstructor: typeof wjcInput.ComboBox;
}
/**
 * AngularJS directive for the {@link AutoComplete} control.
 *
 * Use the <b>wj-auto-complete</b> directive to add <b>AutoComplete</b> controls to your
 * AngularJS applications. Note that directive and parameter names must be
 * formatted as lower-case with dashes instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is an AutoComplete control:&lt;/p&gt;
 * &lt;wj-auto-complete
 *   text="theCountry"
 *   items-source="countries"
 *   is-editable="false"
 *   placeholder="country"&gt;
 * &lt;/wj-auto-complete&gt;</pre>
 *
 * The example below creates an <b>AutoComplete</b> control and binds it to a 'countries' array
 * exposed by the controller. The <b>AutoComplete</b> searches for the country as the user
 * types, and narrows down the list of countries that match the current input.
 *
 * <a href="http://jsfiddle.net/Wijmo5/37GHw/" target="_blank">Example</a>
 *
 * The <b>wj-auto-complete</b> directive extends {@link wijmo.angular.input.WjComboBox} with the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>css-match</dt>            <dd><code>@</code> The name of the CSS class used to highlight
 *                                 parts of the content that match the search terms.</dd>
 *   <dt>delay</dt>                <dd><code>@</code> The amount of delay in milliseconds between
 *                                 when a keystroke occurs and when the search is performed.</dd>
 *   <dt>items-source-function</dt><dd><code>=</code> A function that provides the items
 *                                 dynamically as the user types.</dd>
 *   <dt>max-items</dt>            <dd><code>@</code> The maximum number of items to display
 *                                 in the dropdown.</dd>
 *   <dt>min-length</dt>           <dd><code>@</code> The minimum input length to require before
 *                                 triggering autocomplete suggestions.</dd>
 * </dl>
 */
export declare class WjAutoComplete extends WjComboBox {
    constructor($compile: any);
    readonly _controlConstructor: typeof wjcInput.AutoComplete;
}
/**
 * AngularJS directive for the {@link Calendar} control.
 *
 * Use the <b>wj-calendar</b> directive to add <b>Calendar</b> controls to your
 * AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is a Calendar control:&lt;/p&gt;
 * &lt;wj-calendar
 *   value="theDate"&gt;
 * &lt;/wj-calendar&gt;</pre>
 *
 * <a href="http://jsfiddle.net/Wijmo5/46PhD/" target="_blank">Example</a>
 *
 * This example creates a <b>Calendar</b> control and binds it to a 'date' variable
 * exposed by the controller. The range of dates that may be selected is limited
 * by the <b>min</b> and <b>max</b> properties.
 *
 * The <b>wj-calendar</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
 *                               <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>        <dd><code>=</code> A reference to the {@link Calendar} control
 *                           created by this directive.</dd>
 *   <dt>display-month</dt>  <dd><code>=</code> The month being displayed in the calendar.</dd>
 *   <dt>first-day-of-week</dt> <dd><code>@</code> The first day of the week.</dd>
 *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
 *                                 initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
 *                                 initializing the control with attribute values. </dd>
 *   <dt>item-formatter</dt> <dd><code>=</code> The function used to customize the dates
 *                           shown in the calendar.</dd>
 *   <dt>max</dt>            <dd><code>@</code> The latest valid date (string in the
 *                           format "yyyy-MM-dd").</dd>
 *   <dt>min</dt>            <dd><code>@</code> The earliest valid date (string in the
 *                           format "yyyy-MM-dd").</dd>
 *   <dt>month-view</dt>     <dd><code>@</code> A value indicating whether the control displays
 *                           a month or the entire year.</dd>
 *   <dt>show-header</dt>    <dd><code>@</code> A value indicating whether the control displays
 *                           the header area.</dd>
 *   <dt>value</dt>          <dd><code>=</code> The date being edited.</dd>
 *   <dt>got-focus</dt>      <dd><code>&</code> The {@link Calendar.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>     <dd><code>&</code> The {@link Calendar.lostFocus} event handler.</dd>
 *   <dt>value-changed</dt>  <dd><code>&</code> The {@link Calendar.valueChanged} event handler.</dd>
 * </dl>
 *
 * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
 * "yyyy-MM-dd." Technically, you can use any full date as defined in the W3C
 * <a href="http://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>,
 * which is also the format used with regular HTML5 input elements.
 */
export declare class WjCalendar extends WjDirective {
    readonly _controlConstructor: new (elem: HTMLElement) => Control;
}
/**
 * AngularJS directive for the {@link ColorPicker} control.
 *
 * Use the <b>wj-color-picker</b> directive to add <b>ColorPicker</b> controls to your
 * AngularJS applications. Note that directive and parameter names must be
 * formatted as lower-case with dashes instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is a ColorPicker control:&lt;/p&gt;
 * &lt;wj-color-picker
 *   value="theColor"
 *   show-alpha-channel="false"&gt;
 * &lt;/wj-color-picker&gt;</pre>
 *
 * The <b>wj-color-picker</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
 *                               <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link ColorPicker}
 *                              control created by this directive.</dd>
 *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
 *                                 initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
 *                                 initializing the control with attribute values. </dd>
 *   <dt>show-alpha-channel</dt><dd><code>@</code> A value indicating whether the control
 *                              displays the alpha channel (transparency) editor.</dd>
 *   <dt>show-color-string</dt> <dd><code>@</code> A value indicating whether the control
 *                              displays a string representation of the color being edited.</dd>
 *   <dt>palette</dt>           <dd><code>=</code> An array with ten color values to use
 *                              as the palette.</dd>
 *   <dt>value</dt>             <dd><code>=</code> The color being edited.</dd>
 *   <dt>got-focus</dt>         <dd><code>&</code> The {@link ColorPicker.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link ColorPicker.lostFocus} event handler.</dd>
 *   <dt>value-changed</dt>     <dd><code>&</code> The {@link ColorPicker.valueChanged} event handler.</dd>
 * </dl>
 */
export declare class WjColorPicker extends WjDirective {
    readonly _controlConstructor: new (elem: HTMLElement) => Control;
}
/**
 * AngularJS directive for the {@link ListBox} control.
 *
 * Use the <b>wj-list-box</b> directive to add {@link ListBox} controls to your
 * AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>b&gt;Here is a ListBox control:&lt;/p&gt;
 * &lt;wj-list-box
 *   selected-item="theCountry"
 *   items-source="countries"
 *   placeholder="country"&gt;
 * &lt;/wj-list-box&gt;</pre>
 *
 * The example below creates a <b>ListBox</b> control and binds it to a 'countries' array
 * exposed by the controller. The value selected is bound to the 'theCountry'
 * controller property using the <b>selected-item</b> attribute.
 *
 * <a href="http://jsfiddle.net/Wijmo5/37GHw/" target="_blank">Example</a>
 *
 * The <b>wj-list-box</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>selectedValue</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
 *                               <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>              <dd><code>=</code> A reference to the {@link ListBox}
 *                                 control created by this directive.</dd>
 *   <dt>display-member-path</dt>  <dd><code>@</code> The property to use as the visual
 *                                 representation of the items.</dd>
 *   <dt>is-content-html</dt>      <dd><code>@</code> A value indicating whether items
 *                                 contain plain text or HTML.</dd>
 *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
 *                                 initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
 *                                 initializing the control with attribute values. </dd>
 *   <dt>item-formatter</dt>       <dd><code>=</code> A function used to customize the
 *                                 values to show in the list.</dd>
 *   <dt>items-source</dt>         <dd><code>=</code> An array or {@link ICollectionView}
 *                                 that contains the list items.</dd>
 *   <dt>max-height</dt>           <dd><code>@</code> The maximum height of the list.</dd>
 *   <dt>selected-index</dt>       <dd><code>=</code> The index of the currently selected
 *                                 item.</dd>
 *   <dt>selected-item</dt>        <dd><code>=</code> The item that is currently selected.</dd>
 *   <dt>selected-value</dt>       <dd><code>=</code> The value of the <b>selected-item</b>
 *                                 obtained using the <b>selected-value-path</b>.</dd>
 *   <dt>selected-value-path</dt>  <dd><code>@</code> The property used to get the
 *                                 <b>selected-value</b> from the <b>selected-item</b>.</dd>
 *   <dt>got-focus</dt>            <dd><code>&</code> The {@link ListBox.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>           <dd><code>&</code> The {@link ListBox.lostFocus} event handler.</dd>
 *   <dt>items-changed</dt>        <dd><code>&</code> The {@link ListBox.itemsChanged} event handler.</dd>
 *   <dt>selected-index-changed</dt> <dd><code>&</code> The {@link ListBox.selectedIndexChanged} event handler.</dd>
 * </dl>
 *
 * The <b>wj-list-box</b> directive may contain {@link wijmo.angular.input.WjItemTemplate} child directive.
 */
export declare class WjListBox extends WjDirective {
    constructor();
    readonly _controlConstructor: new (elem: HTMLElement) => Control;
}
/**
 * AngularJS directive for {@link ListBox} and {@link Menu} item templates.
 *
 * The <b>wj-item-template</b> directive must be contained in a {@link wijmo.angular.input.WjListBox}
 * or {@link wijmo.angular.input.WjMenu} directives.
 *
 * The <b>wj-item-template</b> directive defines a template for items of <b>ListBox</b>
 * and data-bound <b>Menu</b> controls.
 * The template may contain an arbitrary HTML fragment with AngularJS bindings and directives.
 * In addition to any properties available in a controller, the local <b>$item</b>,
 * <b>$itemIndex</b> and <b>$control</b> template variables can be used in AngularJS bindings
 * that refer to the data item, its index, and the owner control.
 *
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is a ListBox control with an item template:&lt;/p&gt;
 * &lt;wj-list-box items-source="musicians"&gt;
 *     &lt;wj-item-template&gt;
 *         {&#8203;{$itemIndex}}. &lt;b&gt;{&#8203;{$item.name}}&lt;/b&gt;
 *         &lt;br /&gt;
 *         &lt;img ng-src="{&#8203;{$item.photo}}"/&gt;
 *     &lt;/wj-item-template&gt;
 * &lt;/wj-list-box&gt;</pre>
 */
export declare class WjItemTemplate extends WjDirective {
    static _itemTemplateProp: string;
    static _itemScopeProp: string;
    _$compile: any;
    constructor($compile: any);
    _initControl(element: any): any;
    _createLink(): WjLink;
    _getMetaDataId(): any;
}
/**
 * AngularJS directive for the {@link Menu} control.
 *
 * Use the <b>wj-menu</b> directive to add drop-down menus to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is a Menu control used as a value picker:&lt;/p&gt;
 * &lt;wj-menu header="Tax" value="tax"&gt;
 *   &lt;wj-menu-item value="0"&gt;Exempt&lt;/wj-menu-item&gt;
 *   &lt;wj-menu-item value=".05"&gt;5%&lt;/wj-menu-item&gt;
 *   &lt;wj-menu-item value=".1"&gt;10%&lt;/wj-menu-item&gt;
 *   &lt;wj-menu-item value=".15"&gt;15%&lt;/wj-menu-item&gt;
 * &lt;/wj-menu&gt;</pre>
 *
 * <a href="http://jsfiddle.net/Wijmo5/Wc5Mq/" target="_blank">Example</a>
 *
 * This example creates three <b>Menu</b> controls. The first is used as a value picker,
 * the second uses a list of commands with parameters, and the third is a group of
 * three menus handled by an <b>itemClicked</b> function in the controller.
 *
 * The <b>wj-menu</b> directive extends {@link wijmo.angular.input.WjComboBox} with the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>command-path</dt>          <dd><code>@</code> The command to be executed when the item is clicked.</dd>
 *   <dt>command-parameter-path</dt><dd><code>@</code> The name of the property that contains command parameters.</dd>
 *   <dt>header</dt>                <dd><code>@</code> The text shown on the control.</dd>
 *   <dt>is-button</dt>             <dd><code>@</code> Whether the menu should react to clicks on its header area.</dd>
 *   <dt>value</dt>                 <dd><code>@</code> The value of the selected <b>wj-menu-item</b> value property. </dd>
 *   <dt>item-clicked</dt>          <dd><code>&</code> The {@link Menu.itemClicked} event handler.</dd>
 *   <dt>got-focus</dt>             <dd><code>&</code> The {@link Menu.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>            <dd><code>&</code> The {@link Menu.lostFocus} event handler.</dd>
 * </dl>
 *
 *The <b>wj-menu</b> directive may contain the following child directives:
    *{@link wijmo.angular.input.WjMenuItem}, {@link wijmo.angular.input.WjMenuSeparator} and {@link wijmo.angular.input.WjItemTemplate}(in case of data-bound Menu control).
    */
export declare class WjMenu extends WjComboBox {
    constructor($compile: any);
    readonly _controlConstructor: typeof wjcInput.Menu;
    _createLink(): WjLink;
    _initProps(): void;
    updateControlValue(scope: any, control: any, link: WjLink): void;
    updateHeader(scope: any, control: any, link: WjLink): void;
}
/**
 * AngularJS directive for menu items.
 *
 * The <b>wj-menu-item</b> directive must be contained in a {@link wijmo.angular.input.WjMenu} directive.
 * It supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>cmd</dt>       <dd><code>=</code> The function to execute in the controller
 *                      when the item is clicked.</dd>
 *   <dt>cmd-param</dt>  <dd><code>=</code> The parameter passed to the <b>cmd</b> function
 *                      when the item is clicked.</dd>
 *   <dt>value</dt>     <dd><code>=</code> The value to select when the item is clicked
 *                      (use either this or <b>cmd</b>).</dd>
 * </dl>
 *
 * The content displayed by the item may contain an arbitrary HTML fragment with AngularJS bindings and directives.
 * You can also use <b>ng-repeat</b> and <b>ng-if</b> directives to populate the items in the Menu control.
 * In addition to any properties available in a controller, the local <b>$item</b>,
 * <b>$itemIndex</b> and <b>$control</b> template variables can be used in AngularJS bindings
 * that refer to the data item, its index, and the owner control.
 */
export declare class WjMenuItem extends WjDirective {
    static _itemTemplateProp: string;
    static _itemScopeProp: string;
    static _itemLinkProp: string;
    static _directiveId: string;
    constructor();
    _createLink(): WjLink;
    _getMetaDataId(): any;
    _getId(): string;
}
/**
 * AngularJS directive for menu separators.
 *
 * The <b>wj-menu-item-separator</b> directive must be contained in a {@link wijmo.angular.input.WjMenu} directive.
 * It adds a non-selectable separator to the menu, and has no attributes.
 */
export declare class WjMenuSeparator extends WjDirective {
    constructor();
    _getMetaDataId(): any;
    _createLink(): WjLink;
    _getId(): string;
}
/**
 * AngularJS directive for context menus.
 *
 * Use the <b>wj-context-menu</b> directive to add context menus to elements
 * on the page. The wj-context-menu directive is based on the <b>wj-menu</b>
 * directive; it displays a popup menu when the user performs a context menu
 * request on an element (usually a right-click).
 *
 * The wj-context-menu directive is specified as a parameter added to the
 * element that the context menu applies to. The parameter value is a
 * CSS selector for the element that contains the menu. For example:
 *
 * <pre>&lt;!-- paragraph with a context menu --&gt;
 *&lt;p wj-context-menu="#idMenu" &gt;
    *  This paragraph has a context menu.&lt;/p&gt;
    *
    *&lt;!-- define the context menu (hidden and with an id) --&gt;
    *&lt;wj-menu id="idMenu" ng-show="false"&gt;
    *  &lt;wj-menu-item cmd="cmdOpen" cmd-param ="1"&gt;Open...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item cmd="cmdSave" cmd-param="2"&gt;Save &lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item cmd="cmdSave" cmd-param="3"&gt;Save As...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-item cmd="cmdNew" cmd-param ="4"&gt;New...&lt;/wj-menu-item&gt;
    *  &lt;wj-menu-separator&gt;&lt;/wj-menu-separator&gt;
    *  &lt;wj-menu-item cmd="cmdExit" cmd-param="5"&gt;Exit&lt;/wj-menu-item&gt;
    *&lt;/wj-menu &gt;</pre>
    */
export declare class WjContextMenu extends WjDirective {
    constructor();
    _getMetaDataId(): any;
    _postLinkFn(): (scope: any, tElement: any, tAttrs: any) => void;
}
/**
 * AngularJS directive for the {@link InputDate} control.
 *
 * Use the <b>wj-input-date</b> directive to add {@link InputDate} controls to your
 * AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is an InputDate control:&lt;/p&gt;
 * &lt;wj-input-date
 *   value="theDate"
 *   format="M/d/yyyy"&gt;
 * &lt;/wj-input-date&gt;</pre>
 *
 * The example below shows a <b>Date</b> value (that includes date and time information)
 * using an {@link InputDate} and an {@link InputTime} control. Notice how both controls
 * are bound to the same controller variable, and each edits the appropriate information
 * (either date or time). The example also shows a {@link Calendar} control that can be
 * used to select the date with a single click.
 *
 * <a href="http://jsfiddle.net/Wijmo5/46PhD/" target="_blank">Example</a>
 *
 * The <b>wj-input-date</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>            <dd><code>=</code> A reference to the {@link InputDate} control created by this directive.</dd>
 *   <dt>format</dt>             <dd><code>@</code> The format used to display the date being edited (see {@link Globalize}).</dd>
 *   <dt>mask</dt>               <dd><code>@</code> The mask used to validate the input as the user types (see {@link wijmo.input.InputMask}).</dd>
 *   <dt>is-dropped-down</dt>    <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
 *   <dt>initialized</dt>        <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>     <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
 *   <dt>max</dt>                <dd><code>@</code> The latest valid date (a string in the format "yyyy-MM-dd").</dd>
 *   <dt>min</dt>                <dd><code>@</code> The earliest valid date (a string in the format "yyyy-MM-dd").</dd>
 *   <dt>placeholder</dt>        <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
 *   <dt>is-required</dt>        <dd><code>@</code> A value indicating whether to prevent null values.</dd>
 *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
 *   <dt>text</dt>               <dd><code>=</code> The text to show in the control.</dd>
 *   <dt>value</dt>              <dd><code>=</code> The date being edited.</dd>
 *   <dt>got-focus</dt>          <dd><code>&</code> The {@link InputDate.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>         <dd><code>&</code> The {@link InputDate.lostFocus} event handler.</dd>
 *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The {@link InputDate.isDroppedDownChanging} event handler.</dd>
 *   <dt>is-dropped-down-changed </dt> <dd><code>&</code> The {@link InputDate.isDroppedDownChanged} event handler.</dd>
 *   <dt>text-changed</dt>       <dd><code>&</code> The {@link InputDate.textChanged} event handler.</dd>
 *   <dt>value-changed</dt>      <dd><code>&</code> The {@link InputDate.valueChanged} event handler.</dd>
 * </dl>
 *
 * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
 * "yyyy-MM-dd". Technically, you can use any full date as defined in the W3C
 * <a href="http://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>, which is also
 * the format used with regular HTML5 input elements.
 */
export declare class WjInputDate extends WjDropDown {
    readonly _controlConstructor: typeof wjcInput.InputDate;
}
/**
 * AngularJS directive for the {@link InputDateTime} control.
 *
 * Use the <b>wj-input-date-time</b> directive to add {@link InputDateTime} controls to your
 * AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is an InputDateTime control:&lt;/p&gt;
 * &lt;wj-input-date-time
 *   value="theDate"
 *   format="M/d/yyyy"&gt;
 * &lt;/wj-input-date-time&gt;</pre>
 *
 * The <b>wj-input-date-time</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>            <dd><code>=</code> A reference to the {@link InputDate} control created by this directive.</dd>
 *   <dt>format</dt>             <dd><code>@</code> The format used to display the date being edited (see {@link Globalize}).</dd>
 *   <dt>mask</dt>               <dd><code>@</code> The mask used to validate the input as the user types (see {@link wijmo.input.InputMask}).</dd>
 *   <dt>is-dropped-down</dt>    <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
 *   <dt>initialized</dt>        <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>     <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
 *   <dt>max</dt>                <dd><code>@</code> The latest valid date (a string in the format "yyyy-MM-dd").</dd>
 *   <dt>min</dt>                <dd><code>@</code> The earliest valid date (a string in the format "yyyy-MM-dd").</dd>
 *   <dt>placeholder</dt>        <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
 *   <dt>is-required</dt>        <dd><code>@</code> A value indicating whether to prevent null values.</dd>
 *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
 *   <dt>text</dt>               <dd><code>=</code> The text to show in the control.</dd>
 *   <dt>timeMax</dt>            <dd><code>@</code> The earliest valid time (a string in the format "hh:mm").</dd>
 *   <dt>timeMin</dt>            <dd><code>@</code> The latest valid time (a string in the format "hh:mm").</dd>
 *   <dt>timeStep</dt>           <dd><code>@</code> The number of minutes between entries in the drop-down list.</dd>
 *   <dt>timeFormat</dt>         <dd><code>@</code> The format sting used to show values in the time drop-down list.</dd>
 *   <dt>value</dt>              <dd><code>=</code> The date being edited.</dd>
 *   <dt>got-focus</dt>          <dd><code>&</code> The {@link InputDateTime.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>         <dd><code>&</code> The {@link InputDateTime.lostFocus} event handler.</dd>
 *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The {@link InputDateTime.isDroppedDownChanging} event handler.</dd>
 *   <dt>is-dropped-down-changed </dt> <dd><code>&</code> The {@link InputDateTime.isDroppedDownChanged} event handler.</dd>
 *   <dt>text-changed</dt>       <dd><code>&</code> The {@link InputDateTime.textChanged} event handler.</dd>
 *   <dt>value-changed</dt>      <dd><code>&</code> The {@link InputDateTime.valueChanged} event handler.</dd>
 * </dl>
 */
export declare class WjInputDateTime extends WjInputDate {
    readonly _controlConstructor: typeof wjcInput.InputDateTime;
}
/**
 * AngularJS directive for the {@link InputNumber} control.
 *
 * Use the <b>wj-input-number</b> directive to add <b>InputNumber</b> controls to your
 * AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is an InputNumber control:&lt;/p&gt;
 * &lt;wj-input-number
 *   value="theNumber"
 *   min="0"
 *   max="10"
 *   format="n0"
 *   placeholder="number between zero and ten"&gt;
 * &lt;/wj-input-number&gt;</pre>
 *
 * The example below creates several <b>InputNumber</b> controls and shows the effect
 * of using different formats, ranges, and step values.
 *
 * <a href="http://jsfiddle.net/Wijmo5/u7HpD/" target="_blank">Example</a>
 *
 * The <b>wj-input-number</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>       <dd><code>=</code> A reference to the {@link InputNumber} control created by this directive.</dd>
 *   <dt>format</dt>        <dd><code>@</code> The format used to display the number (see {@link Globalize}).</dd>
 *   <dt>input-type</dt>    <dd><code>@</code> The "type" attribute of the HTML input element hosted by the control.</dd>
 *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
 *   <dt>max</dt>           <dd><code>@</code> The largest valid number.</dd>
 *   <dt>min</dt>           <dd><code>@</code> The smallest valid number.</dd>
 *   <dt>place-holder</dt>  <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
 *   <dt>is-required</dt>   <dd><code>@</code> A value indicating whether to prevent null values.</dd>
 *   <dt>show-spinner</dt>  <dd><code>@</code> A value indicating whether to display spinner buttons to change the value by <b>step</b> units.</dd>
 *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the value when the user clicks the spinner buttons.</dd>
 *   <dt>text</dt>          <dd><code>=</code> The text to show in the control.</dd>
 *   <dt>value</dt>         <dd><code>=</code> The number being edited.</dd>
 *   <dt>got-focus</dt>     <dd><code>&</code> The {@link InputNumber.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>    <dd><code>&</code> The {@link InputNumber.lostFocus} event handler.</dd>
 *   <dt>text-changed</dt>  <dd><code>&</code> The {@link InputNumber.textChanged} event handler.</dd>
 *   <dt>value-changed</dt> <dd><code>&</code> The {@link InputNumber.valueChanged} event handler.</dd>
 * </dl>
 */
export declare class WjInputNumber extends WjDirective {
    readonly _controlConstructor: new (elem: HTMLElement) => Control;
}
/**
 * AngularJS directive for the {@link InputMask} control.
 *
 * Use the <b>wj-input-mask</b> directive to add {@link InputMask} controls to your
 * AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is an InputMask control:&lt;/p&gt;
 * &lt;wj-input-mask
 *   mask="99/99/99"
 *   mask-placeholder="*"&gt;
 * &lt;/wj-input-mask&gt;</pre>
 *
 * The <b>wj-input-mask</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt> <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link InputNumber} control created by this directive.</dd>
 *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>    <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
 *   <dt>mask</dt>              <dd><code>@</code> The string mask used to format the value as the user types.</dd>
 *   <dt>prompt-char</dt>       <dd><code>@</code> A character used to show input locations within the mask.</dd>
 *   <dt>place-holder</dt>      <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
 *   <dt>value</dt>             <dd><code>=</code> The string being edited.</dd>
 *   <dt>raw-value</dt>         <dd><code>=</code> The string being edited, excluding literal and prompt characters.</dd>
 *   <dt>got-focus</dt>         <dd><code>&</code> The {@link InputMask.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link InputMask.lostFocus} event handler.</dd>
 *   <dt>value-changed</dt>     <dd><code>&</code> The {@link InputMask.valueChanged} event handler.</dd>
 * </dl>
 */
export declare class WjInputMask extends WjDirective {
    readonly _controlConstructor: new (elem: HTMLElement) => Control;
}
/**
 * AngularJS directive for the {@link InputTime} control.
 *
 * Use the <b>wj-input-time</b> directive to add <b>InputTime</b> controls to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is an InputTime control:&lt;/p&gt;
 * &lt;wj-input-time
 *   value="theDate"
 *   format="h:mm tt"
 *   min="09:00" max="17:00"
 *   step="15"&gt;
 * &lt;/wj-input-time&gt;</pre>
 *
 * <a href="http://jsfiddle.net/Wijmo5/46PhD/" target="_blank">Example</a>
 *
 * This example edits a <b>Date</b> value (that includes date and time information)
 * using an {@link InputDate} and an InputTime control. Notice how both controls
 * are bound to the same controller variable, and each edits the appropriate information
 * (either date or time). The example also shows a {@link Calendar} control that can be
 * used to select the date with a single click.
 *
 * The <b>wj-input-time</b> directive extends {@link wijmo.angular.input.WjComboBox} with the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt><dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>       <dd><code>=</code> A reference to the {@link InputDate} control created by this directive.</dd>
 *   <dt>format</dt>        <dd><code>@</code> The format used to display the selected time.</dd>
 *   <dt>mask</dt>          <dd><code>@</code> A mask used to validate the input as the user types (see {@link InputMask}).</dd>
 *   <dt>max</dt>           <dd><code>@</code> The earliest valid time (a string in the format "hh:mm").</dd>
 *   <dt>min</dt>           <dd><code>@</code> The latest valid time (a string in the format "hh:mm").</dd>
 *   <dt>step</dt>          <dd><code>@</code> The number of minutes between entries in the drop-down list.</dd>
 *   <dt>value</dt>         <dd><code>=</code> The time being edited (as a Date object).</dd>
 *   <dt>value-changed</dt> <dd><code>&</code> The!@see: valueChanged event handler.</dd>
 * </dl>
 *
 * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
 * "hh:mm". Technically, you can use any full date as defined in the W3C
 * <a href="http://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>, which is also the format
 * used with regular HTML5 input elements.
 */
export declare class WjInputTime extends WjComboBox {
    constructor($compile: any);
    readonly _controlConstructor: typeof wjcInput.InputTime;
}
/**
 * AngularJS directive for the {@link InputColor} control.
 *
 * Use the <b>wj-input-color</b> directive to add {@link InputColor} controls to your
 * AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is an InputColor control:&lt;/p&gt;
 * &lt;wj-input-color
 *   value="theColor"
 *   show-alpha-channel="false"&gt;
 * &lt;/wj-input-color&gt;</pre>
 *
 * The <b>wj-input-color</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>     <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>               <dd><code>=</code> A reference to the InputColor control created by this directive.</dd>
 *   <dt>is-dropped-down</dt>       <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
 *   <dt>initialized</dt>           <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>        <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
 *   <dt>show-alpha-channel</dt>    <dd><code>@</code> A value indicating whether the drop-down displays the alpha channel (transparency) editor.</dd>
 *   <dt>placeholder</dt>           <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
 *   <dt>is-required</dt>           <dd><code>@</code> A value indicating whether to prevent null values.</dd>
 *   <dt>show-drop-down-button</dt> <dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
 *   <dt>text</dt>                  <dd><code>=</code> The text to show in the control.</dd>
 *   <dt>value</dt>                 <dd><code>=</code> The color being edited.</dd>
 *   <dt>got-focus</dt>             <dd><code>&</code> The {@link InputColor.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>            <dd><code>&</code> The {@link InputColor.lostFocus} event handler.</dd>
 *   <dt>is-dropped-down-changing</dt><dd><code>&</code> The {@link InputColor.isDroppedDownChanging} event handler.</dd>
 *   <dt>is-dropped-down-changed</dt><dd><code>&</code> The {@link InputColor.isDroppedDownChanged} event handler.</dd>
 *   <dt>text-changed</dt>          <dd><code>&</code> The {@link InputColor.textChanged} event handler.</dd>
 *   <dt>value-changed</dt>         <dd><code>&</code> The {@link InputColor.valueChanged} event handler.</dd>
 * </dl>
 */
export declare class WjInputColor extends WjDropDown {
    readonly _controlConstructor: typeof wjcInput.InputColor;
}
/**
 * AngularJS directive for the {@link Popup} control.
 *
 * Use the <b>wj-popup</b> directive to add {@link Popup} controls to your
 * AngularJS applications.
 *
 * The popup content may be specified inside the <b>wj-popup</b> tag, and can
 * contain an arbitrary HTML fragment with AngularJS bindings and directives.
 *
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is a Popup control triggered by a button:&lt;/p&gt;
 * &lt;button id="btn2" type="button"&gt;
 *     Click to show Popup
 * &lt;/button&gt;
 * &lt;wj-popup owner="#btn2" show-trigger="Click" hide-trigger="Blur"&gt;
 *     &lt;h3&gt;
 *         Salutation
 *     &lt;/h3&gt;
 *     &lt;div class="popover-content"&gt;
 *         Hello {&#8203;{firstName}} {&#8203;{lastName}}
 *     &lt;/div&gt;
 * &lt;/wj-popup&gt;</pre>
 *
 * The <b>wj-popup</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>control</dt>         <dd><code>=</code> A reference to the Popup control created by this directive.</dd>
 *   <dt>fade-in</dt>         <dd><code>@</code> A boolean value that determines whether popups should be shown using a fade-in animation.</dd>
 *   <dt>fade-out</dt>        <dd><code>@</code> A boolean value that determines whether popups should be hidden using a fade-out animation.</dd>
 *   <dt>hide-trigger</dt>    <dd><code>@</code> A {@link PopupTrigger} value defining the action that hides the {@link Popup}.</dd>
 *   <dt>initialized</dt>     <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt>  <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
 *   <dt>owner</dt>           <dd><code>@</code> A CSS selector referencing an element that controls the popup visibility.</dd>
 *   <dt>show-trigger</dt>    <dd><code>@</code> A {@link PopupTrigger} value defining the action that shows the {@link Popup}.</dd>
 *   <dt>modal</dt>           <dd><code>@</code> A boolean value that determines whether the {@link Popup} should be displayed as a modal dialog.</dd>
 *   <dt>got-focus</dt>       <dd><code>&</code> The {@link Popup.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>      <dd><code>&</code> The {@link Popup.lostFocus} event handler.</dd>
 *   <dt>showing</dt>         <dd><code>&</code> The {@link Popup.showing} event handler.</dd>
 *   <dt>shown</dt>           <dd><code>&</code> The {@link Popup.shown} event handler.</dd>
 *   <dt>hiding</dt>          <dd><code>&</code> The {@link Popup.hiding} event handler.</dd>
 *   <dt>hidden</dt>          <dd><code>&</code> The {@link Popup.hidden} event handler.</dd>
 * </dl>
 */
export declare class WjPopup extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcInput.Popup;
    _initProps(): void;
}
/**
 * AngularJS directive for the {@link MultiSelect} control.
 *
 * Use the <b>wj-multi-select</b> directive to add <b>MultiSelect</b> controls to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is a MultiSelect bound to a collection of objects:&lt;/p&gt;
 * &lt;wj-multi-select
 *     placeholder="Select Countries"
 *     items-source="ctx.items"
 *     header-format="{count} countries selected"
 *     display-Member-path="country"
 *     checked-Member-path="selected"&gt;
 * &lt;/wj-multi-select&gt;</pre>
 *
 * The <b>wj-multi-select</b> directive extends {@link wijmo.angular.input.WjComboBox} with the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>checked-member-path</dt>  <dd><code>@</code> The name of the property used to control the checkboxes placed next to each item.</dd>
 *   <dt>header-format</dt>        <dd><code>@</code> The format string used to create the header content when the control has more than <b>maxHeaderItems</b> items checked.</dd>
 *   <dt>header-formatter</dt>     <dd><code>=</code> A function that gets the HTML in the control header.</dd>
 *   <dt>max-header-items</dt>     <dd><code>@</code> The maximum number of items to display on the control header.</dd>
 *   <dt>checked-items-changed</dt><dd><code>&</code> The {@link MultiSelect.checkedItemsChanged} event handler.</dd>
 * </dl>
 */
export declare class WjMultiSelect extends WjComboBox {
    constructor($compile: any);
    readonly _controlConstructor: typeof wjcInput.MultiSelect;
}
/**
 * AngularJS directive for the {@link MultiAutoComplete} control.
 *
 * Use the <b>wj-multi-auto-complete</b> directive to add <b>MultiAutoComplete</b> controls to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;p&gt;Here is a InputTags bound to a collection of objects:&lt;/p&gt;
 * &lt;wj-multi-auto-complete
 *     max-selected-items="8"
 *     items-source="ctx.items"
 *     selected-Member-path="selected"&gt;
 * &lt;/wj-multi-auto-complete&gt;</pre>

    * The <b>wj-multi-auto-complete</b> directive extends {@link wijmo.angular.input.WjAutoComplete} with the following attributes:
    *
    * <dl class="dl-horizontal">
    *   <dt>max-selected-items</dt>   <dd><code>@</code> The maximum number of items that can be selected.</dd>
    *   <dt>selected-member-path</dt> <dd><code>@</code> The name of the property used to control which
    *                                 item will be selected.</dd>
    *   <dt>selected-items</dt>       <dd><code>@</code> An array containing the items that are currently selected.
    *   <dt>selected-items-changed</dt> <dd><code>&</code> The {@link MultiAutoComplete.selectedItemsChanged} event handler.</dd>
    * </dl>
    */
export declare class WjMultiAutoComplete extends WjAutoComplete {
    constructor($compile: any);
    readonly _controlConstructor: typeof wjcInput.MultiAutoComplete;
}
/**
 * AngularJS directive for an {@link ICollectionView} navigator element.
 *
 * Use the <b>wj-collection-view-navigator</b> directive to add an element that allows users to
 * navigate through the items in an {@link ICollectionView}.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>Here is a CollectionViewNavigator:&lt;/p&gt;
 * &lt;wj-collection-view-navigator
 *   cv="myCollectionView"&gt;
 * &lt;/wj-collection-view-navigator&gt;</pre>
 *
 * <a href="http://jsfiddle.net/Wijmo5/s8tT4/" target="_blank">Example</a>
 *
 * This example creates a CollectionView with 100,000 items and 20 items per page.
 * It defines a navigator to select the current page, another to select the current item,
 * and shows the data in a {@link FlexGrid}.
 *
 * The <b>wj-collection-view-navigator</b> directive has a single attribute:
 *
 * <dl class="dl-horizontal">
 *   <dt>cv</dt>  <dd><code>=</code> A reference to the {@link ICollectionView} object to navigate.</dd>
 * </dl>
 */
export declare class WjCollectionViewNavigator extends WjDirective {
    constructor();
    _getMetaDataId(): any;
    _postLinkFn(): (scope: any, tElement: any, tAttrs: any, dropDownController: any) => void;
}
/**
 * AngularJS directive for an {@link ICollectionView} pager element.
 *
 * Use the <b>wj-collection-view-pager</b> directive to add an element that allows users to
 * navigate through the pages in a paged {@link ICollectionView}.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>Here is a CollectionViewPager:&lt;/p&gt;
 * &lt;wj-collection-view-pager
 *   cv="myCollectionView"&gt;
 * &lt;/wj-collection-view-pager&gt;</pre>
 *
 * <a href="http://jsfiddle.net/Wijmo5/s8tT4/" target="_blank">Example</a>
 *
 * This example creates a CollectionView with 100,000 items and 20 items per page.
 * It defines a navigator to select the current page, another to select the current item,
 * and shows the data in a {@link FlexGrid}.
 *
 * The <b>wj-collection-view-pager</b> directive has a single attribute:
 *
 * <dl class="dl-horizontal">
 *   <dt>cv</dt>  <dd><code>=</code> A reference to the paged {@link ICollectionView} object to navigate.</dd>
 * </dl>
 */
export declare class WjCollectionViewPager extends WjDirective {
    constructor();
    _getMetaDataId(): any;
    _postLinkFn(): (scope: any, tElement: any, tAttrs: any, dropDownController: any) => void;
}
