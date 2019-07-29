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
* {@module wijmo.angular.gauge}
* AngularJS directives for wijmo.gauge module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective } from 'wijmo/wijmo.angular.base';
import * as wjcGauge from 'wijmo/wijmo.gauge';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.gauge";
export declare class WjGauge extends WjDirective {
    constructor();
    readonly _controlConstructor: typeof wjcGauge.Gauge;
}
/**
 * AngularJS directive for the {@link LinearGauge} control.
 *
 * Use the <b>wj-linear-gauge</b> directive to add linear gauges to your AngularJS applications.
 * Note that directive and parameter names must be formatted in lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;wj-linear-gauge
 *   value="ctx.gauge.value"
 *   show-text="Value"
 *   is-read-only="false"&gt;
 *   &lt;wj-range
 *     wj-property="pointer"
 *     thickness="0.2"&gt;
 *     &lt;wj-range
 *       min="0"
 *       max="33"
 *       color="green"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range
 *       min="33"
 *       max="66"
 *       color="yellow"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range
 *       min="66"
 *       max="100"
 *       color="red"&gt;
 *     &lt;/wj-range&gt;
 *   &lt;/wj-range&gt;
 * &lt;/wj-linear-gauge&gt;</pre>
 *
 * The <b>wj-linear-gauge</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
 *                               <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>       <dd><code>=</code> A reference to the {@link LinearGauge}
 *                          control created by this directive.</dd>
 *   <dt>direction</dt>     <dd><code>@</code> The {@link GaugeDirection} value in
 *                          which the gauge fills as the value grows.</dd>
 *   <dt>format</dt>        <dd><code>@</code> The format string used for displaying
 *                          the gauge values as text.</dd>
 *   <dt>has-shadow</dt>    <dd><code>@</code> A value indicating whether the gauge
 *                          displays a shadow effect.</dd>
 *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
 *                          initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
 *                           initializing the control with attribute values. </dd>
 *   <dt>is-animated</dt>   <dd><code>@</code> A value indicating whether the gauge
 *                          animates value changes.</dd>
 *   <dt>is-read-only</dt>  <dd><code>@</code> A value indicating whether users are
 *                          prevented from editing the value.</dd>
 *   <dt>min</dt>           <dd><code>@</code> The minimum value that the gauge
 *                          can display.</dd>
 *   <dt>max</dt>           <dd><code>@</code> The maximum value that the gauge
 *                          can display.</dd>
 *   <dt>show-text</dt>     <dd><code>@</code> The {@link ShowText} value indicating
 *                          which values display as text within the gauge.</dd>
 *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the value
 *                          property when the user presses the arrow keys.</dd>
 *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the gauge, on a scale
 *                          of zero to one.</dd>
 *   <dt>value</dt>         <dd><code>=</code> The value displayed on the gauge.</dd>
 *   <dt>got-focus</dt>     <dd><code>&</code> The {@link LinearGauge.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>    <dd><code>&</code> The {@link LinearGauge.lostFocus} event handler.</dd>
 * </dl>
 *
 * The <b>wj-linear-gauge</b> directive may contain one or more {@link wijmo.angular.gauge.WjRange} directives.
 *
 * <a href="http://jsfiddle.net/Wijmo5/t842jozb/" target="_blank">Example</a>
 */
export declare class WjLinearGauge extends WjGauge {
    constructor();
    readonly _controlConstructor: typeof wjcGauge.LinearGauge;
}
/**
 * AngularJS directive for the {@link BulletGraph} control.
 *
 * Use the <b>wj-bullet-graph</b> directive to add bullet graphs to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>&lt;wj-bullet-graph
 *   value="ctx.gauge.value"
 *   min="0" max="10"
 *   target="{&#8203;{item.target}}"
 *   bad="{&#8203;{item.target * .75}}"
 *   good="{&#8203;{item.target * 1.25}}"&gt;
 * &lt;/wj-bullet-graph&gt;</pre>
 *
 * The <b>wj-bullet-graph</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>control</dt>       <dd><code>=</code> A reference to the BulletGraph control
 *                          created by this directive.</dd>
 *   <dt>direction</dt>     <dd><code>@</code> The {@link GaugeDirection} value
 *                          indicating which direction the gauge fills as the value grows.</dd>
 *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
 *                          initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
 *                           initializing the control with attribute values. </dd>
 *   <dt>target</dt>        <dd><code>@</code> The target value for the measure.</dd>
 *   <dt>good</dt>          <dd><code>@</code> A reference value considered good for the
 *                          measure.</dd>
 *   <dt>bad</dt>           <dd><code>@</code> A reference value considered bad for the
 *                          measure.</dd>
 *   <dt>value</dt>         <dd><code>=</code> The actual value of the measure.</dd>
 * </dl>
 *
 * The <b>wj-bullet-graph</b> directive may contain one or more {@link wijmo.angular.gauge.WjRange} directives.
 *
 * <a href="http://jsfiddle.net/Wijmo5/8uxb1vwf/" target="_blank">Example</a>
 */
export declare class WjBulletGraph extends WjLinearGauge {
    constructor();
    readonly _controlConstructor: typeof wjcGauge.BulletGraph;
}
/**
 * AngularJS directive for the {@link RadialGauge} control.
 *
 * Use the <b>wj-radial-gauge</b> directive to add radial gauges to your AngularJS applications.
 * Note that directive and parameter names must be formatted as lower-case with dashes
 * instead of camel-case. For example:
 *
 * <pre>Here is a &lt;b&gt;RadialGauge&lt;/b&gt; control:&lt;/p&gt;
 * &lt;wj-radial-gauge
 *   style="height:300px"
 *   value="count"
 *   min="0" max="10"
 *   is-read-only="false"&gt;
 * &lt;/wj-radial-gauge&gt;</pre>
 *
 * The <b>wj-radial-gauge</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
 *                          directive. Binding the property using the ng-model directive provides standard benefits
 *                          like validation, adding the control's state to the form instance, and so on. To redefine
 *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
 *                          attribute.</dd>
 *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
 *                               <b>ng-model</b> directive.</dd>
 *   <dt>control</dt>       <dd><code>=</code> A reference to the RadialGauge
 *                          control created by this directive.</dd>
 *   <dt>auto-scale</dt>    <dd><code>@</code> A value indicating whether the gauge
 *                          scales the display to fill the host element.</dd>
 *   <dt>format</dt>        <dd><code>@</code> The format string used for displaying
 *                          gauge values as text.</dd>
 *   <dt>has-shadow</dt>    <dd><code>@</code> A value indicating whether the gauge
 *                          displays a shadow effect.</dd>
 *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
 *                          initializing the control with attribute values.</dd>
 *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
 *                           initializing the control with attribute values. </dd>
 *   <dt>is-animated</dt>   <dd><code>@</code> A value indicating whether the gauge
 *                          animates value changes.</dd>
 *   <dt>is-read-only</dt>  <dd><code>@</code> A value indicating whether users are
 *                          prevented from editing the value.</dd>
 *   <dt>min</dt>           <dd><code>@</code> The minimum value that the gauge
 *                          can display.</dd>
 *   <dt>max</dt>           <dd><code>@</code> The maximum value that the gauge
 *                          can display.</dd>
 *   <dt>show-text</dt>     <dd><code>@</code> A {@link ShowText} value indicating
 *                          which values display as text within the gauge.</dd>
 *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the
 *                          value property when the user presses the arrow keys.</dd>
 *   <dt>start-angle</dt>   <dd><code>@</code> The starting angle for the gauge, in
 *                          degreees, measured clockwise from the 9 o'clock position.</dd>
 *   <dt>sweep-angle</dt>   <dd><code>@</code> The sweeping angle for the gauge in degrees
 *                          (may be positive or negative).</dd>
 *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the gauge, on a scale
 *                          of zero to one.</dd>
 *   <dt>value</dt>         <dd><code>=</code> The value displayed on the gauge.</dd>
 *   <dt>got-focus</dt>     <dd><code>&</code> The {@link RadialGauge.gotFocus} event handler.</dd>
 *   <dt>lost-focus</dt>    <dd><code>&</code> The {@link RadialGauge.lostFocus} event handler.</dd>
 * </dl>
 *
 * The <b>wj-radial-gauge</b> directive may contain one or more {@link wijmo.angular.gauge.WjRange} directives.
 *
 * <a href="http://jsfiddle.net/Wijmo5/7ec2144u/" target="_blank">Example</a>
 */
export declare class WjRadialGauge extends WjGauge {
    constructor();
    readonly _controlConstructor: typeof wjcGauge.RadialGauge;
}
/**
 * AngularJS directive for the {@link Range} object.
 *
 * The <b>wj-range</b> directive must be contained in a {@link wijmo.angular.gauge.WjLinearGauge}, {@link wijmo.angular.gauge.WjRadialGauge}
 * or {@link wijmo.angular.gauge.WjBulletGraph} directive. It adds the Range object to the 'ranges' array property
 * of the parent directive. You may also initialize other Range type properties of the parent
 * directive by specifying the property name with the wj-property attribute.
 *
 * For example:
 * <pre>&lt;wj-radial-gauge
 *     min="0"
 *     max="200"
 *     step="20"
 *     value="theValue"
 *     is-read-only="false"&gt;
 *     &lt;wj-range
 *       min="0"
 *       max="100"
 *       color="red"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range
 *       min="100"
 *       max="200"
 *       color="green"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range
 *       wj-property="pointer"
 *       color="blue"&gt;
 *     &lt;/wj-range&gt;
 * &lt;/wj-radial-gauge&gt;</pre>
 *
 * The <b>wj-range</b> directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *   <dt>min</dt>           <dd><code>@</code> The minimum value in the range.</dd>
 *   <dt>max</dt>           <dd><code>@</code> The maximum value in the range.</dd>
 *   <dt>color</dt>         <dd><code>@</code> The color used to display the range.</dd>
 *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the range, on a scale
 *                          of zero to one.</dd>
 *   <dt>name</dt>          <dd><code>@</code> The name of the range.</dd>
 *   <dt>wj-property</dt>   <dd><code>@</code> The name of the property to initialize
 *                          with this directive.</dd>
 * </dl>
 */
export declare class WjRange extends WjDirective {
    constructor();
    readonly _controlConstructor: any;
    _initControl(element: any): any;
}
