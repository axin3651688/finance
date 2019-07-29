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
* {@module wijmo.knockout.gauge}
* KnockoutJS bindings for wijmo.gauge module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjBinding } from 'wijmo/wijmo.knockout.base';
export declare class WjGaugeBinding extends WjBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link LinearGauge} control.
 *
 * Use the {@link wjLinearGauge} binding to add {@link LinearGauge} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a LinearGauge control:&lt;/p&gt;
 * &lt;div data-bind="wjLinearGauge: {
 *         value: props.value,
 *         min: props.min,
 *         max: props.max,
 *         format: props.format,
 *         showRanges: props.showRanges }"
 *         &lt;class="linear-gauge"&gt;
 *     &lt;div data-bind="wjRange: {
 *             wjProperty: 'pointer',
 *             thickness: props.ranges.pointerThickness }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjRange: {
 *             min: props.ranges.lower.min,
 *             max: props.ranges.lower.max,
 *             color: props.ranges.lower.color }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjRange: {
 *             min: props.ranges.middle.min,
 *             max: props.ranges.middle.max,
 *             color: props.ranges.middle.color }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjRange: {
 *             min: props.ranges.upper.min,
 *             max: props.ranges.upper.max,
 *             color: props.ranges.upper.color }"&gt;
 *     &lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjLinearGauge</b> binding may contain the {@link wjRange} child binding.
 *
 * The <b>wjLinearGauge</b> binding supports all read-write properties and events of
 * the {@link LinearGauge} control. The <b>value</b> property provides two-way binding mode.
 */
export declare class wjLinearGauge extends WjGaugeBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link BulletGraph} control.
 *
 * Use the {@link wjBulletGraph} binding to add {@link BulletGraph} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a BulletGraph control:&lt;/p&gt;
 * &lt;div data-bind="wjBulletGraph: {
 *         value: props.value,
 *         min: props.min,
 *         max: props.max,
 *         format: props.format,
 *         good: props.ranges.middle.max,
 *         bad: props.ranges.middle.min,
 *         target: props.ranges.target,
 *         showRanges: props.showRanges }"
 *         class="linear-gauge"&gt;
 *     &lt;div data-bind="wjRange: {
 *             wjProperty: 'pointer',
 *             thickness: props.ranges.pointerThickness }"&gt;
 *     &lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjBulletGraph</b> binding may contain the {@link wjRange} child binding.
 *
 * The <b>wjBulletGraph</b> binding supports all read-write properties and events of
 * the {@link BulletGraph} control. The <b>value</b> property provides two-way binding mode.
 */
export declare class wjBulletGraph extends wjLinearGauge {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the {@link RadialGauge} control.
 *
 * Use the {@link wjRadialGauge} binding to add {@link RadialGauge} controls to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a RadialGauge control:&lt;/p&gt;
 * &lt;div data-bind="wjRadialGauge: {
 *         value: props.value,
 *         min: props.min,
 *         max: props.max,
 *         format: props.format,
 *         showRanges: props.showRanges }"
 *         class="radial-gauge"&gt;
 *     &lt;div data-bind="wjRange: {
 *             wjProperty: 'pointer',
 *             thickness: props.ranges.pointerThickness }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjRange: {
 *             min: props.ranges.lower.min,
 *             max: props.ranges.lower.max,
 *             color: props.ranges.lower.color }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjRange: {
 *             min: props.ranges.middle.min,
 *             max: props.ranges.middle.max,
 *             color: props.ranges.middle.color }"&gt;
 *     &lt;/div&gt;
 *     &lt;div data-bind="wjRange: {
 *             min: props.ranges.upper.min,
 *             max: props.ranges.upper.max,
 *             color: props.ranges.upper.color }"&gt;
 *     &lt;/div&gt;
 * &lt;/div&gt;</pre>
 *
 * The <b>wjRadialGauge</b> binding may contain the {@link wjRange} child binding.
 *
 * The <b>wjRadialGauge</b> binding supports all read-write properties and events of
 * the {@link RadialGauge} control. The <b>value</b> property provides two-way binding mode.
 */
export declare class wjRadialGauge extends WjGaugeBinding {
    _getControlConstructor(): any;
}
/**
 * KnockoutJS binding for the Gauge's {@link Range} object.
 *
 * The {@link wjRange} binding must be contained in one of the following bindings:
 * <ul>
 *     <li>{@link wjLinearGauge}</li>
 *     <li>{@link wjRadialGauge}</li>
 *     <li>{@link wjBulletGraph}</li>
 * </ul>
 * By default, this binding adds a <b>Range</b> object to the <b>ranges</b>
 * collection of the Chart control. The <b>wjProperty</b> attribute allows
 * you to specify another Chart property, for example the <b>pointer</b>
 * property, to initialize with the binding.
 *
 * The <b>wjRange</b> binding supports all read-write properties and events of
 * the {@link Range} class.
 */
export declare class wjRange extends WjBinding {
    _getControlConstructor(): any;
    _createControl(element: any): any;
}
