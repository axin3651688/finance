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
 * {@module wijmo.vue2.gauge}
 * Wijmo interop module for
 * <a href="https://vuejs.org/2016/04/27/announcing-2.0/" target="_blank">Vue 2</a>.
 *
 * This module provides Vue 2 components that encapsulate Wijmo controls.
 *
 * To use it, your application must include references to the Vue 2
 * framework (RC6 or later), as well as the regular Wijmo CSS and js files.
 *
 * To add Wijmo controls to Vue pages, include the appropriate
 * tags in your HTML files. For example, the code below adds
 * an {@link InputNumber} control to a Vue page:
 *
 * ```html
 * <wj-input-number
 *   format="c2"
 *   placeholder="Sales"
 *   :value="sales"
 *   :value-changed="salesChanged"
 *   :min="0"
 *   :max="10000"
 *   :step="100"
 *   :is-required="false">
 * </wj-input-number>
 * ```
 *
 * ```typescript
 * // Wijmo event handler
 * // update "sales" value to match the InputNumber value
 * function salesChanged(sender, eventArgs) {
 *   this.sales = sender.value;
 * }
 * ```
 *
 * The example illustrates the following important points:
 *
 * <ol>
 *   <li>
 *      Wijmo controls have tag names that start with the "wj" prefix, followed by
 *      the control name using lower-case and hyphen separators.</li>
 *   <li>
 *      The tag attribute names match the control's properties and events.</li>
 *   <li>
 *      Colons before attribute names indicate the attribute value should be
 *      interpreted as JavaScript expressions (e.g. <code>:min="0"</code>).</li>
 *   <li>
 *      Event handlers are specified the same way as regular properties
 *      (e.g. <code>:value-changed="salesChanged"</code>).</li>
 *   <li>
 *      In Vue2, all bindings are one-way. In the example above, the "salesChanged"
 *      event handler is responsible for updating the value of the "sales"
 *      property in the model. This is a change from Vue 1, where two-way bindings
 *      could be created by adding the ".sync" suffix to any attribute.</li>
 * </ol>
 *
 * All Wijmo Vue components include an "initialized" event that is
 * raised after the control has been added to the page and initialized.
 * You can use this event to perform additional initialization in addition
 * to setting properties in markup. For example:
 *
 * <pre>&lt;wj-flex-grid :initialized="initGrid"&gt;
 * &lt;/wj-flex-grid&gt;</pre>

 * <pre>// Vue application
 * var app = new Vue({
 *   el: '#app',
 *   methods: {
 *     initGrid: function(s, e) {
 *       // assign a custom MergeManager to the grid
 *       s.mergeManager = new CustomMergeManager(s);
 *     }
 *   }
 * });</pre>
 */
/**
 *
 */
export declare var ___keepComment: any;
export declare var Vue: any;
/**
 * Vue component that encapsulates the {@link wijmo.gauge.LinearGauge} control.
 *
 * The example below shows how to instantiate and initialize a
 * {@link wijmo.gauge.LinearGauge} control using Vue markup:
 *
 * <pre>&lt;wj-linear-gauge
 *     :min="0" :max="1000" :step="50" :is-read-only="false"
 *     format="c0" :thumb-size="20"
 *     :show-ranges="false"
 *     :value="sales"
 *     :value-changed="salesChanged"&gt;
 *     &lt;wj-range wj-property="face" :thickness="0.5"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range wj-property="pointer" :thickness="0.5"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range :min="0" :max="333" color="red"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range :min="333" :max="666" color="gold"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range :min="666" :max="1000" color="green"&gt;
 *     &lt;/wj-range&gt;
 * &lt;/wj-linear-gauge&gt;</pre>
 *
 * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
 * to define the range of the gauge and to allow users to edit its value.
 * Next, it binds the gauge's <b>value</b> property to a <b>sales</b> variable
 * in the controller.
 *
 * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
 * properties to define the appearance of the gauge. Finally, the markup sets
 * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
 * that will control the color of the <b>value</b> range depending on the gauge's
 * current value.
 */
export declare var WjLinearGauge: any;
/**
 * Vue component that encapsulates the {@link wijmo.gauge.BulletGraph} control.
 */
export declare var WjBulletGraph: any;
/**
 * Vue component that encapsulates the {@link wijmo.gauge.RadialGauge} control.
 *
 * The example below shows how to instantiate and initialize a
 * {@link wijmo.gauge.RadialGauge} control using Vue markup:
 *
 * <pre>&lt;wj-radial-gauge
 *     :min="0" :max="1000" :step="50" :is-read-only="false"
 *     format="c0" :thumb-size="12" :show-text="Value"
 *     :show-ranges="false"
 *     :value="sales"
 *     :value-changed="salesChanged"&gt;
 *     &lt;wj-range wj-property="face" :thickness="0.5"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range wj-property="pointer" :thickness="0.5"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range :min="0" :max="333" color="red"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range :min="333" :max="666" color="gold"&gt;
 *     &lt;/wj-range&gt;
 *     &lt;wj-range :min="666" :max="1000" color="green"&gt;
 *     &lt;/wj-range&gt;
 * &lt;/wj-radial-gauge&gt;</pre>
 *
 * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
 * to define the range of the gauge and to allow users to edit its value.
 * Next, it binds the gauge's <b>value</b> property to a <b>sales</b> variable
 * in the controller.
 *
 * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
 * properties to define the appearance of the gauge. Finally, the markup sets
 * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
 * that will control the color of the <b>value</b> range depending on the gauge's
 * current value.
 */
export declare var WjRadialGauge: any;
/**
 * Vue component that represents a {@link wijmo.gauge.Range} in one of the following components:
 * {@link wijmo.vue2.gauge.WjLinearGauge}
 * , {@link wijmo.vue2.gauge.WjBulletGraph}
 *  or {@link wijmo.vue2.gauge.WjRadialGauge}.
 */
export declare var WjRange: any;
