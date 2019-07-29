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
* {@module wijmo.knockout.input}
* KnockoutJS bindings for wijmo.input module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding, WjContext } from 'wijmo/wijmo.knockout.base';
export declare class WjDropDownBinding extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link ComboBox} control.
 *
 * Use the {@link wjComboBox} binding to add {@link ComboBox} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a ComboBox control:&lt;/p&gt;
 * &lt;div data-bind="wjComboBox: {
 *   itemsSource: countries,
 *   text: theCountry,
 *   isEditable: false,
 *   placeholder: 'country' }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjComboBox</b> binding supports all read-write properties and events of
 * the {@link ComboBox} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>isDroppedDown</b></li>
 * 	<li><b>text</b></li>
 * 	<li><b>selectedIndex</b></li>
 * 	<li><b>selectedItem</b></li>
 * 	<li><b>selectedValue</b></li>
 * </ul>
 */
export declare class wjComboBox extends WjDropDownBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link AutoComplete} control.
 *
 * Use the {@link wjAutoComplete} binding to add {@link AutoComplete} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is an AutoComplete control:&lt;/p&gt;
 * &lt;div data-bind="wjAutoComplete: {
 *   itemsSource: countries,
 *   text: theCountry,
 *   isEditable: false,
 *   placeholder: 'country' }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjAutoComplete</b> binding supports all read-write properties and events of
 * the {@link AutoComplete} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>isDroppedDown</b></li>
 * 	<li><b>text</b></li>
 * 	<li><b>selectedIndex</b></li>
 * 	<li><b>selectedItem</b></li>
 * 	<li><b>selectedValue</b></li>
 * </ul>
 */
export declare class wjAutoComplete extends wjComboBox {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link Calendar} control.
 *
 * Use the {@link wjCalendar} binding to add {@link Calendar} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a Calendar control:&lt;/p&gt;
 * &lt;div
 *   data-bind="wjCalendar: { value: theDate }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjCalendar</b> binding supports all read-write properties and events of
 * the {@link Calendar} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>value</b></li>
 * 	<li><b>displayMonth</b></li>
 * </ul>
 */
export declare class wjCalendar extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link ColorPicker} control.
 *
 * Use the {@link wjColorPicker} binding to add {@link ColorPicker} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a ColorPicker control:&lt;/p&gt;
 * &lt;div
 *   data-bind="wjColorPicker: { value: theColor }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjColorPicker</b> binding supports all read-write properties and events of
 * the {@link ColorPicker} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>value</b></li>
 * </ul>
 */
export declare class wjColorPicker extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link ListBox} control.
 *
 * Use the {@link wjListBox} binding to add {@link ListBox} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a ListBox control:&lt;/p&gt;
 * &lt;div data-bind="wjListBox: {
 *   itemsSource: countries,
 *   selectedItem: theCountry }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjListBox</b> binding supports all read-write properties and events of
 * the {@link ListBox} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>selectedIndex</b></li>
 * 	<li><b>selectedItem</b></li>
 * 	<li><b>selectedValue</b></li>
 * </ul>
 */
export declare class wjListBox extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link Menu} control.
 *
 * Use the {@link wjMenu} binding to add {@link Menu} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a Menu control used as a value picker:&lt;/p&gt;
 * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
 *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
 *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjMenu</b> binding may contain the following child bindings: {@link wjMenuItem}, {@link wjMenuSeparator}.
 *
 * The <b>wjMenu</b> binding supports all read-write properties and events of
 * the {@link Menu} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>isDroppedDown</b></li>
 * 	<li><b>text</b></li>
 * 	<li><b>selectedIndex</b></li>
 * 	<li><b>selectedItem</b></li>
 * 	<li><b>selectedValue</b></li>
 *  <li><b>value</b></li>
 * </ul>
 */
export declare class wjMenu extends wjComboBox {
    _getControlConstructor(): any;
    _createWijmoContext(): WjContext;
    _initialize(): void;
    private _updateControlValue;
}
export declare class WjMenuContext extends WjContext {
    _initControl(): void;
    _childrenInitialized(): void;
    _updateHeader(): void;
}
/**
 * KnockoutJS binding for menu items.
 *
 * Use the {@link wjMenuItem} binding to add menu items to a {@link Menu} control.
 * The {@link wjMenuItem} binding must be contained in a {@link wjMenu} binding.
 * For example:
 *
 * <pre>&lt;p&gt;Here is a Menu control with four menu items:&lt;/p&gt;
 * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
 *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjMenuItem</b> binding supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>cmd</dt>       <dd>Function to execute in the controller when the item is clicked.</dd>
 *   <dt>cmdParam</dt>  <dd>Parameter passed to the <b>cmd</b> function when the item is clicked.</dd>
 *   <dt>value</dt>     <dd>Value selected when the item is clicked (use either this or <b>cmd</b>).</dd>
 * </dl class="dl-horizontal">
 */
export declare class wjMenuItem extends WjBinding {
    _getMetaDataId(): any;
    _createWijmoContext(): WjContext;
    _initialize(): void;
}
export declare class WjMenuItemContext extends WjContext {
    _createControl(): any;
}
/**
 * KnockoutJS binding for menu separators.
 *
 * The the {@link wjMenuSeparator} adds a non-selectable separator to a {@link Menu} control, and has no attributes.
 * It must be contained in a {@link wjMenu} binding. For example:
 *
 * <pre>&lt;p&gt;Here is a Menu control with four menu items and one separator:&lt;/p&gt;
 * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
 *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
 *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
 *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
 * &lt;/div&gt;</pre>
 */
export declare class wjMenuSeparator extends WjBinding {
    _getMetaDataId(): any;
    _initialize(): void;
    _createControl(element: any): any;
}
/**
 * KnockoutJS binding for context menus.
 *
 * Use the {@link wjContextMenu} binding to add context menus to elements
 * on the page. The {@link wjContextMenu} binding is based on the  {@link wjMenu};
 * it displays a popup menu when the user performs a context menu
 * request on an element (usually a right-click).
 *
 * The wjContextMenu binding is specified as a parameter added to the
 * element that the context menu applies to. The parameter value is a
 * CSS selector for the element that contains the menu. For example:
 *
 * <pre>&lt;!-- paragraph with a context menu --&gt;
 *&lt;p data-bind="wjContextMenu: { id: '#idMenu'}" &gt;
    *  This paragraph has a context menu.&lt;/p&gt;
    *
    *&lt;!-- define the context menu (hidden and with an id) --&gt;
    * &lt;div id="contextmenu" data-bind="wjMenu: { header: 'File', itemClicked: menuItemClicked}"&gt;
    *     &lt;span data-bind="wjMenuItem: {}"&gt;New&lt;/span&gt;
    *     &lt;span data-bind="wjMenuItem: {}"&gt;open an existing file or folder&lt;/span&gt;
    *     &lt;span data-bind="wjMenuItem: {}"&gt;save the current file&lt;/span&gt;
    *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
    *     &lt;span data-bind="wjMenuItem: {}"&gt;exit the application&lt;/span&gt;
    * &lt;/div&gt;</pre>
    */
export declare class wjContextMenu extends WjBinding {
    _getMetaDataId(): any;
    _createControl(element: any): any;
    _createWijmoContext(): WjContext;
}
export declare class WjContextMenuContext extends WjContext {
    _initControl(): void;
}
/**
 * KnockoutJS binding for the {@link InputDate} control.
 *
 * Use the {@link wjInputDate} binding to add {@link InputDate} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is an InputDate control:&lt;/p&gt;
 * &lt;div data-bind="wjInputDate: {
 *   value: theDate,
 *   format: 'M/d/yyyy' }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjInputDate</b> binding supports all read-write properties and events of
 * the {@link InputDate} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>isDroppedDown</b></li>
 * 	<li><b>text</b></li>
 * 	<li><b>value</b></li>
 * </ul>
 */
export declare class wjInputDate extends WjDropDownBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link InputDateTime} control.
 *
 * Use the {@link wjInputDateTime} binding to add {@link InputDateTime} controls to your
 * KnockoutJS applications.
 *
 * The <b>wjInputDateTime</b> binding supports all read-write properties and events of
 * the {@link InputDateTime} control.
 */
export declare class wjInputDateTime extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link InputNumber} control.
 *
 * Use the {@link wjInputNumber} binding to add {@link InputNumber} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is an InputNumber control:&lt;/p&gt;
 * &lt;div data-bind="wjInputNumber: {
 *   value: theNumber,
 *   min: 0,
 *   max: 10,
 *   format: 'n0',
 *   placeholder: 'number between zero and ten' }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjInputNumber</b> binding supports all read-write properties and events of
 * the {@link InputNumber} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>value</b></li>
 * 	<li><b>text</b></li>
 * </ul>
 */
export declare class wjInputNumber extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link InputMask} control.
 *
 * Use the {@link wjInputMask} binding to add {@link InputMask} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is an InputMask control:&lt;/p&gt;
 * &lt;div data-bind="wjInputMask: {
 *   mask: '99/99/99',
 *   promptChar: '*' }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjInputMask</b> binding supports all read-write properties and events of
 * the {@link InputMask} control. The <b>value</b> property provides two-way binding mode.
 */
export declare class wjInputMask extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link InputTime} control.
 *
 * Use the {@link wjInputTime} binding to add {@link InputTime} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is an InputTime control:&lt;/p&gt;
 * &lt;div data-bind="wjInputTime: {
 *   min: new Date(2014, 8, 1, 9, 0),
 *   max: new Date(2014, 8, 1, 17, 0),
 *   step: 15,
 *   format: 'h:mm tt',
 *   value: theDate }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjInputTime</b> binding supports all read-write properties and events of
 * the {@link InputTime} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>isDroppedDown</b></li>
 * 	<li><b>text</b></li>
 * 	<li><b>selectedIndex</b></li>
 * 	<li><b>selectedItem</b></li>
 * 	<li><b>selectedValue</b></li>
 *  <li><b>value</b></li>
 * </ul>
 */
export declare class wjInputTime extends wjComboBox {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link InputColor} control.
 *
 * Use the {@link wjInputColor} binding to add {@link InputColor} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a InputColor control:&lt;/p&gt;
 * &lt;div
 *   data-bind="wjInputColor: { value: theColor }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjInputColor</b> binding supports all read-write properties and events of
 * the {@link InputColor} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>isDroppedDown</b></li>
 * 	<li><b>text</b></li>
 * 	<li><b>value</b></li>
 * </ul>
 */
export declare class wjInputColor extends WjDropDownBinding {
    _getControlConstructor(): any;
}
export declare class WjCollectionViewBaseBinding extends WjBinding {
    _createControl(element: any): any;
    _createWijmoContext(): WjContext;
    _getTemplate(): string;
}
export declare class WjCollectionViewContext extends WjContext {
    private _localVM;
    private _emptyCV;
    init(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): any;
    update(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): void;
    private _subscribeToCV;
    private _unsubscribeFromCV;
    private _forceBindingsUpdate;
}
/**
 * KnockoutJS binding for an {@link ICollectionView} pager element.
 *
 * Use the {@link wjCollectionViewPager} directive to add an element that allows users to
 * navigate through the pages in a paged {@link ICollectionView}. For example:
 *
 * <pre>Here is a CollectionViewPager:&lt;/p&gt;
 * &lt;div
 *   data-bind="wjCollectionViewPager: { cv: myCollectionView }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The {@link wjCollectionViewPager} directive has a single attribute:
 *
 * <dl class="dl-horizontal">
 *   <dt>cv</dt>  <dd>Reference to the paged {@link ICollectionView} object to navigate.</dd>
 * </dl>
 */
export declare class wjCollectionViewPager extends WjCollectionViewBaseBinding {
    _getMetaDataId(): any;
    _getTemplate(): string;
}
/**
 * KnockoutJS binding for an {@link ICollectionView} navigator element.
 *
 * Use the {@link wjCollectionViewNavigator} directive to add an element that allows users to
 * navigate through the items in an {@link ICollectionView}. For example:
 *
 * <pre>Here is a CollectionViewNavigator:&lt;/p&gt;
 * &lt;div
 *   data-bind="wjCollectionViewNavigator: { cv: myCollectionView }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The {@link wjCollectionViewNavigator} directive has a single attribute:
 *
 * <dl class="dl-horizontal">
 *   <dt>cv</dt>  <dd>Reference to the {@link ICollectionView} object to navigate.</dd>
 * </dl>
 */
export declare class wjCollectionViewNavigator extends WjCollectionViewBaseBinding {
    _getMetaDataId(): any;
    _getTemplate(): string;
}
/**
 * KnockoutJS binding for the {@link MultiSelect} control.
 *
 * Use the {@link wjMultiSelect} binding to add {@link MultiSelect} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a MultiSelect control:&lt;/p&gt;
 * &lt;div data-bind="MultiSelect: {
 *   itemsSource: countries,
 *   isEditable: false,
 *   headerFormat: '{count} countries selected' }"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjMultiSelect</b> binding supports all read-write properties and events of
 * the {@link MultiSelect} control. The following properties provide two-way binding mode:
 * <ul>
 * 	<li><b>isDroppedDown</b></li>
 * 	<li><b>text</b></li>
 * 	<li><b>selectedIndex</b></li>
 * 	<li><b>selectedItem</b></li>
 * 	<li><b>selectedValue</b></li>
 * </ul>
 */
export declare class wjMultiSelect extends wjComboBox {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link MultiAutoComplete} control.
 *
 * Use the {@link wjMultiAutoComplete} binding to add {@link MultiAutoComplete} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a MultiAutoComplete control:&lt;/p&gt;
 * &lt;div data-bind="MultiAutoComplete: {
 *   itemsSource: countries,
 *   maxSelectedItems: 4,}"&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjMultiAutoComplete</b> binding supports all read-write properties and events of
 * the {@link MultiAutoComplete} control.
 */
export declare class wjMultiAutoComplete extends wjAutoComplete {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link Popup} control.
 *
 * Use the {@link wjPopup} binding to add {@link Popup} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a Popup control triggered by a button:&lt;/p&gt;
 * &lt;button id="btn2" type="button"&gt;
 *     Click to show Popup
 * &lt;/button&gt;
 *  &lt;div class="popover" data-bind="wjPopup: {
 *       control: popup,
 *       owner: '#btn2',
 *       showTrigger: 'Click',
 *       hideTrigger: 'Click'}"
 *  &gt;
 *	&lt;h3&gt;
    *		 Salutation
    *	&lt;/h3&gt;
    *	 &lt;div class="popover-content"&gt;
    *	 	    Hello {&#8203;{firstName}} {&#8203;{lastName}}
    *	 &lt;/div&gt;
    * &lt;/div&gt;</pre>
    */
export declare class wjPopup extends WjBinding {
    _getControlConstructor(): any;
    _createWijmoContext(): WjContext;
    _initialize(): void;
}
export declare class WjPopupContext extends WjContext {
    _initControl(): void;
    _updateModal(convertedValue: any): void;
}
