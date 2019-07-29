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
 * {@module wijmo.react.gauge}
 * Wijmo interop module for
 * <a href="https://facebook.github.io/react/" target="_blank">React</a>.
 *
 * This module provides React components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the React and
 * ReactDOM libraries, as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to React components, include the appropriate
 * tags in your JSX (or TSX) files. For example, the code below adds
 * an {@link InputNumber} control to a React component:
 *
 * <pre>&lt;label htmlFor="inputnumber"&gt;Here's an InputNumber control:&lt;/label&gt;
 * &lt;Wj.InputNumber
 *   id="inputNumber"
 *   format="c2"
 *   min={ 0 } max={ 10 } step={ .5 }
 *   value={ this.state.value }
 *   valueChanged={ this.valueChanged }/&gt;</pre>
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "Wj" prefix, followed by
 *      the control name. The "Wj" is a shorthand for the full module name
 *      "wijmo.react" which can also be used.</li>
 * <li>
 *      The tag attribute names match the control's properties and events.</li>
 * <li>
 *      Attribute values enclosed in quotes are interpreted as strings, and
 *      values enclosed in curly braces are interpreted as JavaScript expressions.</li>
 * <li>
 *      React components do not have implicit two-way bindings, so controls that
 *      modify values typically use event handlers to explicitly apply changes to
 *      the parent component's state.</li>
 * </ol>
 *
 * To illustrate this last point, the component that contains the markup given above
 * would typically implement a "valueChanged" event handler as follows:
 *
 * <pre>valueChanged: function(s, e) {
 *   this.setState({ value, s.value });
 * }</pre>
 *
 * The event handler calls React's
 * <a href="https://facebook.github.io/react/docs/component-api.html">setState</a>
 * method to update the component state, automatically triggering a UI update.
 * Notice that the method does not write directly into the "state" object, which
 * should be treated as immutable in React applications.
 *
 * All Wijmo React components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;Wj.FlexGrid
 *   initialized={ function(s,e) {
 *
 *     // assign a custom MergeManager to the grid
 *     s.mergeManager = new CustomMergeManager(s);
 *
 *   }}
 * /&gt;</pre>
 */
/**
 *
 */
export declare var ___keepComment: any;
import { ComponentBase } from 'wijmo/wijmo.react.base';
/**
 * React component that encapsulates the {@link wijmo.gauge.LinearGauge} control.
 *
 * The example below shows how to instantiate and initialize a
 * {@link wijmo.gauge.LinearGauge} control in JSX:
 *
 * <pre>&lt;Wj.LinearGauge
 *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
 *   value={ this.state.view.currentItem.sales }
 *   valueChanged={ this.salesChanged }
 *   format="c0" thumbSize={ 20 } showRanges={ false }
 *   face={&#8203;{ thickness:0.5 }}
 *   pointer={&#8203;{ thickness:0.5 }}
 *   ranges={[
 *       { min: 0, max: 333, color: 'red' },
 *       { min: 333, max: 666, color: 'gold' },
 *       { min: 666, max: 1000, color: 'green' }
 *   ]} /&gt;</pre>
 *
 * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
 * to define the range of the gauge and to allow users to edit its value.
 * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
 * a two-way binding for the gauge's value.
 *
 * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
 * properties to define the appearance of the gauge. Finally, the markup sets
 * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
 * that will control the color of the <b>value</b> range depending on the gauge's
 * current value.
 */
export declare class LinearGauge extends ComponentBase {
    constructor(props: any);
}
/**
 * React component that encapsulates the {@link wijmo.gauge.BulletGraph} control.
 *
 * The example below shows how to instantiate and initialize a
 * {@link wijmo.gauge.BulletGraph} control in JSX:
 *
 * <pre>&lt;Wj.BulletGraph
 *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
 *   value={ this.state.view.currentItem.sales }
 *   valueChanged={ this.salesChanged }
 *   format="c0" thumbSize={ 20 } showRanges={ false }
 *   face={&#8203;{ thickness:0.5 }}
 *   pointer={&#8203;{ thickness:0.5 }}
 *   ranges={[
 *       { min: 0, max: 333, color: 'red' },
 *       { min: 333, max: 666, color: 'gold' },
 *       { min: 666, max: 1000, color: 'green' }
 *   ]} /&gt;</pre>
 *
 * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
 * to define the range of the gauge and to allow users to edit its value.
 * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
 * a two-way binding for the gauge's value.
 *
 * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
 * properties to define the appearance of the gauge. Finally, the markup sets
 * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
 * that will control the color of the <b>value</b> range depending on the gauge's
 * current value.
 */
export declare class BulletGraph extends ComponentBase {
    constructor(props: any);
}
/**
 * React component that encapsulates the {@link wijmo.gauge.RadialGauge} control.
 *
 * The example below shows how to instantiate and initialize a
 * {@link wijmo.gauge.RadialGauge} control in JSX:
 *
 * <pre>&lt;Wj.RadialGauge
 *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
 *   value={ this.state.view.currentItem.sales }
 *   valueChanged={ this.salesChanged }
 *   format="c0" thumbSize={ 20 } showRanges={ false }
 *   face={&#8203;{ thickness:0.5 }}
 *   pointer={&#8203;{ thickness:0.5 }}
 *   ranges={[
 *       { min: 0, max: 333, color: 'red' },
 *       { min: 333, max: 666, color: 'gold' },
 *       { min: 666, max: 1000, color: 'green' }
 *   ]} /&gt;</pre>
 *
 * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
 * to define the range of the gauge and to allow users to edit its value.
 * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
 * a two-way binding for the gauge's value.
 *
 * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
 * properties to define the appearance of the gauge. Finally, the markup sets
 * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
 * that will control the color of the <b>value</b> range depending on the gauge's
 * current value.
 */
export declare class RadialGauge extends ComponentBase {
    constructor(props: any);
}
/**
 * React component that represents a {@link wijmo.gauge.Range} in one of the following components:
 * {@link wijmo.react.gauge.LinearGauge}
 * , {@link wijmo.react.gauge.BulletGraph}
 *  or {@link wijmo.react.gauge.RadialGauge}.
 */
export declare class Range extends ComponentBase {
    _parentProp: string;
    constructor(props: any);
}
