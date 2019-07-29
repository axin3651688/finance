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
 * {@module wijmo.knockout.base}
 * Contains KnockoutJS bindings for the Wijmo controls.
 *
 * The bindings allow you to add Wijmo controls to
 * <a href="http://knockoutjs.com/" target="_blank">KnockoutJS</a>
 * applications using simple markup in HTML pages.
 *
 * To add a Wijmo control to a certain place in a page's markup, add the <b>&lt;div&gt;</b>
 * element and define a binding for the control in the <b>data-bind</b> attribute.
 * The binding name corresponds to the control name with a wj prefix. For example, the {@link wjInputNumber}
 * binding represents the Wijmo {@link InputNumber} control. The binding value is an object literal containing
 * properties corresponding to the control's read-write property and event names, with their values defining
 * the corresponding control property values and event handlers.
 *
 * The following markup creates a Wijmo <b>InputNumber</b> control with the <b>value</b> property bound to the
 * view model's <b>theValue</b> property, the <b>step</b> property set to 1 and the <b>inputType</b> property set to 'text':
 *
 * <pre>&lt;div data-bind="wjInputNumber: { value: theValue, step: 1, inputType: 'text' }"&gt;&lt;/div&gt;</pre>
 *
 * <h3>Custom elements</h3>
 * As an alternative to the standard Knockout binding syntax, the Wijmo for Knockout provides a possibility to declare controls
 * in the page markup as custom elements, where the tag name corresponds to the control binding name and the attribute names
 * correspond to the control property names. The element and parameter names must be formatted as lower-case with dashes instead
 * of camel-case. The control in the example above can be defined as follows using the custom element syntax:
 *
 * <pre>&lt;wj-input-number value="theValue" step="1" input-type="'text'"&gt;&lt;/wj-input-number&gt;</pre>
 *
 * Note that attribute values should be defined using exactly the same JavaScript expressions syntax as you use in
 * data-bind definitions. The Wijmo for Knockout preprocessor converts such elements to the conventional data-bind form,
 * see the <b>Custom elements preprocessor</b> topic for more details.
 *
 * <h3>Binding to control properties</h3>
 * Wijmo binding for KnockoutJS supports binding to any read-write properties on the control. You can assign any
 * valid KnockoutJS expressions (e.g. constants, view model observable properties, or complex expressions) to the
 * property.
 *
 * Note that binding expression should resolve (after calling <b>ko.unwrap(expression)</b> on it) to a pure
 * JavaScript value understandable by the corresponding Wijmo JavaScript control. This in particular means
 * that you can’t bind the <b>itemsSource</b> property of Wijmo controls to a Knockout <b>observableArray</b>,
 * or to array whose items’ properties are Knockout <b>observable</b>(s).
 *
 * Most of the properties provide one-way binding, which means that changes in the bound observable view model
 * property cause changes in the control property that the observable is bound to, but not vice versa.
 * But some properties support two-way binding, which means that changes made in the control property are
 * propagated back to an observable bound to the control property as well. Two-way bindings are used for properties
 * that can be changed by the control itself, by user interaction with the control,
 * or by other occurences. For example, the InputNumber control provides two-way binding for the
 * <b>value</b> and <b>text</b> properties, which are changed by the control while a user is typing a new value.
 * The rest of the InputNumber properties operate in the one-way binding mode.
 *
 * <h3>Binding to control events</h3>
 * To attach a handler to a control event, specify the event name as a property of the object literal defining
 * the control binding, and the function to call on this event as a value of this property.
 * Wijmo bindings follow the same rules for defining an event handler as used for the intrinsic KnockoutJS bindings
 * like <b>click</b> and <b>event</b>. The event handler receives the following set of parameters, in the specified order:
 * <ul>
 * 	<li><b>data:</b> The current model value, the same as for native KnockoutJS bindings like <b>click</b> and <b>event</b>. </li>
 * 	<li><b>sender:</b> The sender of the event. </li>
 * 	<li><b>args:</b> The event arguments. </li>
 * </ul>
 *
 * The following example creates an <b>InputNumber</b> control and adds an event handler for the <b>valueChanged</b>
 * event showing a dialog with a new control value.
 *
 * <pre>&lt;!-- HTML --&gt;
 * &lt;div data-bind="wjInputNumber: { value: theValue, step: 1, valueChanged: valueChangedEH }"&gt;&lt;/div&gt;
 * &nbsp;
 * //View Model
 * this.valueChangedEH = function (data, sender, args) {
 *     alert('The new value is: ' + sender.value);
 * }</pre>
 *
 * The same control defined using the custom element syntax:
 *
 * <pre>&lt;wj-input-number value="theValue" step="1" value-changed="valueChangedEH"&gt;&lt;/wj-input-number&gt;</pre>
 *
 * <h3>Binding to undefined observables</h3>
 * View model observable properties assigned to an <i>undefined</i> value get special treatment by Wijmo
 * bindings during the initialization phase. For example, if you create an observable as ko.observable(undefined)
 * or ko.observable() and bind it to a control property, Wijmo does not assign a value to the control. Instead,
 * for properties supporting two-way bindings, this is the way to initialize the observable with the control's
 * default value, because after initialization the control binding updates bound observables with the control
 * values of such properties. Note that an observable with a <i>null</i> value, e.g. ko.observable(null), gets
 * the usual treatment and assigns null to the control property that it is bound to. After the primary
 * initialization has finished, observables with undefined values go back to getting the usual treatment from
 * Wijmo, and assign the control property with undefined.
 *
 * In the example below, the <b>value</b> property of the <b>InputNumber</b> control has its default value of 0
 * after initialization, and this same value is assigned to the view model <b>theValue</b> property:
 * <pre>&lt;!-- HTML --&gt;
 * &lt;div data-bind="wjInputNumber: { value: theValue }"&gt;&lt;/div&gt;
 * &nbsp;
 * //View Model
 * this.theValue = ko.observable();</pre>
 *
 * <h3>Defining complex and array properties</h3>
 * Some Wijmo controls have properties that contain an array or a complex object. For example, the
 * {@link FlexChart} control exposes <b>axisX</b> and <b>axisY</b> properties that represent an {@link Axis} object;
 * and the <b>series</b> property is an array of {@link Series} objects. Wijmo provides special
 * bindings for such types that we add to child elements of the control element. If the control exposes
 * multiple properties of the same complex type, then the <b>wjProperty</b> property of the complex
 * type binding specifies which control property it defines.
 *
 * The following example shows the markup used to create a <b>FlexChart</b> with <b>axisX</b> and <b>axisY</b>
 * properties and two series objects defined:
 *
 * <pre>&lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: chartProps.titleX }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisY', title: chartProps.titleY }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
 *     &lt;div data-bind="wjFlexChartSeries: { name: 'Downloads', binding: 'downloads' }"&gt;&lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The same control defined using the custom element syntax:
 *
 * <pre>&lt;wj-flex-chart items-source="data" binding-x="'country'"&gt;
 *     &lt;wj-flex-chart-axis wj-property="'axisX'" title="chartProps.titleX"&gt;&lt;/wj-flex-chart-axis&gt;
 *     &lt;wj-flex-chart-axis wj-property="'axisY'" title="chartProps.titleY"&gt;&lt;/wj-flex-chart-axis&gt;
 *     &lt;wj-flex-chart-series name="'Sales'" binding"'sales'"&gt;&lt;/wj-flex-chart-series&gt;
 *     &lt;wj-flex-chart-series name="'Downloads'" binding"'downloads'"&gt;&lt;/wj-flex-chart-series&gt;
 * &lt;/wj-flex-chart&gt;</pre>
 *
 * <h3>The <b>control</b> property </h3>
 * Each Wijmo control binding exposes a <b>control</b> property that references the Wijmo control instance created
 * by the binding. This allows you to reference the control in view model code or in other bindings.
 *
 * For example, the following markup creates a {@link FlexGrid} control whose reference is stored in the <b>flex</b>
 * observable property of a view model and is used in the button click event handler to move to the next grid record:
 *
 * <pre>&lt;!-- HTML --&gt;
 * &lt;div data-bind="'wjFlexGrid': { itemsSource: data, control: flex }"&gt;&lt;/div&gt;
 * &lt;button data-bind="click: moveToNext"&gt;Next&lt;/button&gt;
 * &nbsp;
 * //View Model
 * this.flex = ko.observable();
 * this.moveToNext = function () {
 *     this.flex().collectionView.moveCurrentToNext();
 * }</pre>
 *
 * <h3>The <b>initialized</b> event</h3>
 * Each Wijmo control binding exposes an <b>initialized</b> event and a Boolean <b>isInitialized</b>
 * property. The event occurs right after the binding creates the control and fully initializes it
 * with the values specified in the binding attributes. For bindings containing child bindings, for
 * example, a <b>wjFlexGrid</b> with child <b>wjFlexGridColumn</b> bindings, this also means that
 * child bindings have fully initialized and have been applied to the control represented by the
 * parent binding. The isInitialized property is set to true right before triggering the initialized
 * event. You can bind a view model observable property to the binding’s <b>isInitialized</b> property
 * to access its value.
 *
 * The following example adjusts FlexGridColumn formatting after the control fully initializes with its
 * bindings, which guarantees that these formats are not overwritten with formats defined in the bindings:
 *
 * <pre>&lt;!-- HTML --&gt;
 * &lt;div data-bind="'wjFlexGrid': { itemsSource: dataArray, initialized: flexInitialized }"&gt;
 *      &lt;div data-bind="wjFlexGridColumn: { binding: 'sales', format: 'n2' }"&gt;&lt;/div&gt;
 *      &lt;div data-bind="wjFlexGridColumn: { binding: 'downloads', format: 'n2' }"&gt;&lt;/div&gt;
 * &lt;/div&gt;
 * &nbsp;
 * //View Model
 * this.flexInitialized = function (data, sender, args) {
 *     var columns = sender.columns;
 *     for (var i = 0; i &lt; columns.length; i++) {
 *         if (columns[i].dataType = wijmo.DataType.Number) {
 *             columns[i].format = 'n0’;
 *         }
 *     }
 * }</pre>
 *
 * <h3 id="custom_elem_preproc">Custom elements preprocessor</h3>
 * The Wijmo Knockout preprocessor uses the standard Knockout <a target="_blank"
 * href="http://knockoutjs.com/documentation/binding-preprocessing.html">ko.bindingProvider.instance.preprocessNode</a>
 * API. This may cause problems in cases where other custom preprocessors are used on the same page, because Knockout
 * offers a single instance property for attaching a preprocessor function, and the next registering preprocessor
 * removes the registration of the previous one.
 *
 * To honor another attached preprocessor, the Wijmo Knockout preprocessor stores the currently registered preprocessor
 * during initialization and delegates the work to it in cases where another processing node is not recognized
 * as a Wijmo control element, thus organizing a preprocessor stack. But if you register another preprocessor
 * after the Wijmo for Knockout preprocessor (that is, after the &lt;script&gt; reference to the <b>wijmo.knockout.js</b>
 * module is executed) then you need to ensure that the other preprocessor behaves in a similar way;
 * otherwise, the Wijmo Knockout preprocessor is disabled.
 *
 * If you prefer to disable the Wijmo Knockout preprocessor, set the <b>wijmo.disableKnockoutTags</b> property
 * to false before the <b>wijmo.knockout.js</b> module reference and after the references to the core Wijmo
 * modules, for example:
 *
 * <pre>&lt;script src="scripts/wijmo.js"&gt;&lt;/script&gt;
 * &lt;script src="scripts/wijmo.input.js"&gt;&lt;/script&gt;
 * &lt;script&gt;
 *     wijmo.disableKnockoutTags = true;
 * &lt;/script&gt;
 * &lt;script src="scripts/wijmo.knockout.js"&gt;&lt;/script&gt;</pre>
 *
 * Note that in this case you can use only the conventional data-bind syntax for adding Wijmo controls to the page
 * markup; the Wijmo custom elements are not recognized.
 */
/**
 *
 */
export declare var ___keepComment: any;
import { ControlMetaFactory, PropertyType, EventDescBase, ComplexPropDescBase, PropDescBase, MetaDataBase } from 'wijmo/wijmo.meta';
export declare class MetaFactory extends ControlMetaFactory {
    static CreateProp(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDesc;
    static CreateEvent(eventName: string, isPropChanged?: boolean): EventDesc;
    static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDesc;
    static findProp(propName: string, props: PropDesc[]): PropDesc;
    static findEvent(eventName: string, events: EventDesc[]): EventDesc;
    static findComplexProp(propName: string, props: ComplexPropDesc[]): ComplexPropDesc;
}
export interface IUpdateControlHandler {
    (link: any, propDesc: PropDesc, control: any, unconvertedValue: any, convertedValue: any): boolean;
}
export declare class PropDesc extends PropDescBase {
    updateControl: IUpdateControlHandler;
}
export declare class EventDesc extends EventDescBase {
}
export declare class ComplexPropDesc extends ComplexPropDescBase {
}
export declare class WjBinding {
    static _wjContextProp: string;
    static _parPropAttr: string;
    static _controlPropAttr: string;
    static _initPropAttr: string;
    static _initEventAttr: string;
    _metaData: MetaDataBase;
    init: any;
    update: any;
    ensureMetaData(): void;
    _initialize(): void;
    _getControlConstructor(): any;
    _getMetaDataId(): any;
    _createControl(element: any): any;
    _createWijmoContext(): WjContext;
    _isChild(): boolean;
    _isParentInitializer(): boolean;
    _isParentReferencer(): boolean;
    private _initImpl;
    private _updateImpl;
}
export declare class WjContext {
    element: any;
    valueAccessor: any;
    allBindings: any;
    viewModel: any;
    bindingContext: any;
    control: any;
    wjBinding: WjBinding;
    parentWjContext: WjContext;
    private _parentPropDesc;
    private _isInitialized;
    private static _debugId;
    constructor(wjBinding: WjBinding);
    init(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): any;
    update(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): void;
    _createControl(): any;
    _initControl(): void;
    _childrenInitialized(): void;
    private _addEventHandler;
    private static _isUpdatingSource;
    private static _pendingSourceUpdates;
    _updateSource(): void;
    private _isUpdatingControl;
    private _isSourceDirty;
    private _oldSourceValues;
    private _updateControl;
    private _castValueToType;
    _safeUpdateSrcAttr(attrName: string, value: any): void;
    _safeNotifySrcAttr(attrName: string): void;
    private _isChild;
    private _isParentInitializer;
    private _isParentReferencer;
    private _getParentProp;
    private _getParentReferenceProperty;
    private _useParentObj;
    private _isParentArray;
    private _parentInCtor;
}
export declare class WjTagsPreprocessor {
    private static _getSpecialProps;
    private static _specialProps;
    private static _dataBindAttr;
    private static _wjTagPrefix;
    private _foreignProc;
    register(): void;
    preprocessNode(node: any): any;
    private _delegate;
    private _isWjTag;
    private _isWjProp;
}
