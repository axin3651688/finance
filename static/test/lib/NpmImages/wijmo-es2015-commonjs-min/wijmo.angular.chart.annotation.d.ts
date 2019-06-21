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
* {@module wijmo.angular.chart.annotation}
* AngularJS directives for wijmo.angular.chart.annotation module
*/
/**
 *
 */
export declare var ___keepComment: any;
import { WjDirective, WjLink } from 'wijmo/wijmo.angular.base';
/**
 * Angular module name, which can be used in the <b>angular.module(moduleName)</b>
 * function to obtain a reference to the module .
 */
export declare const ngModuleName = "wj.chart.annotation";
/**
 * AngularJS directive for the {@link FlexChart} {@link AnnotationLayer} object.
 *
 * The <b>wj-flex-chart-annotation-layer</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive
 * or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
 *
 */
export declare class WjFlexChartAnnotationLayer extends WjDirective {
    constructor();
    readonly _controlConstructor: any;
}
/**
 * AngularJS directive for the annotations.
 *
 * The <b>wj-flex-chart-annotation</b> directive must be contained in a
 * {@link wijmo.angular.chart.annotation.WjFlexChartAnnotationLayer} directive.
 *
 * The <b>wj-flex-chart-annotation</b> directive is used to represent all types of
 * possible annotation shapes like <b>Circle</b>, <b>Rectangle</b>, <b>Polygon</b>
 * and so on. The type of annotation shape is specified
 * in the directive's <b>type</b> attribute.
 *
 * The directive supports the following attributes:
 *
 * <dl class="dl-horizontal">
 *
 *   <dt>type</dt>                  <dd><code>@</code> The class name of the annotation shape represented by the directive.
 *                                      The possible values are {@link Circle}, {@link Ellipse}, {@link Image}, {@link Line}, {@link Polygon},
 *                                      {@link Rectangle}, {@link Square}, {@link Text}.</dd>
 *   <dt>attachment</dt>            <dd><code>@</code> An {@link AnnotationAttachment} value defining the attachment of the annotation.
 *                                      </dd>
 *   <dt>content</dt>               <dd><code>@</code> The text of the <b>Circle</b>, <b>Ellipse</b>, <b>Image</b>, <b>Line</b>,
 *                                      <b>Polygon</b>, <b>Rectangle</b> or <b>Square</b> annotation.</dd>
 *   <dt>end</dt>                   <dd><code>@</code> The end point of the <b>Line</b> annotation.</dd>
 *   <dt>height</dt>                <dd><code>@</code> The height of the <b>Ellipse</b>, <b>Image</b> or <b>Rectangle</b> annotation.</dd>
 *   <dt>href</dt>                  <dd><code>@</code> The href of the <b>Image</b> annotation.</dd>
 *   <dt>is-visible</dt>             <dd><code>@</code> The visibility of the annotation.</dd>
 *   <dt>length</dt>                <dd><code>@</code> The length of the <b>Square</b> annotation.</dd>
 *   <dt>name</dt>                  <dd><code>@</code> The name of the annotation.</dd>
 *   <dt>offset</dt>                <dd><code>@</code> The offset of the annotation.</dd>
 *   <dt>point</dt>                 <dd><code>@</code> The point of the annotation, the coordinate space of the point depends on the <b>attachment</b>  property value.
 *                                      The property works for <b>Circle</b>, <b>Ellipse</b>, <b>Image</b>, <b>Rectangle</b>, <b>Square</b>
 *                                      and <b>Text</b> annotation.</dd>
 *   <dt>point-index</dt>           <dd><code>@</code> The index of the data point in the specified series where the annotation is attached to.</dd>
 *   <dt>position</dt>              <dd><code>@</code> An {@link AnnotationPosition} value defining the position of the annotation
 *                                      relative to the <b>point</b>.</dd>
 *   <dt>radius</dt>                <dd><code>@</code> The radius of the <b>Circle</b> annotation.</dd>
 *   <dt>series-index</dt>          <dd><code>@</code> The index of the data series where the annotation is attached to.</dd>
 *   <dt>start</dt>                 <dd><code>@</code> The start point of the <b>Line</b> annotation.</dd>
 *   <dt>style</dt>                 <dd><code>@</code> The style of the annotation.</dd>
 *   <dt>text</dt>                  <dd><code>@</code> The text of the <b>Text</b> annotation.</dd>
 *   <dt>tooltip</dt>               <dd><code>@</code> The tooltip of the annotation.</dd>
 *   <dt>width</dt>                 <dd><code>@</code> The width of the <b>Ellipse</b>, <b>Image</b> or <b>Rectangle</b> annotation.</dd>
 * </dl>
 */
export declare class WjFlexChartAnnotation extends WjDirective {
    constructor();
    _createLink(): WjLink;
    _getMetaDataId(): any;
}
export declare class WjFlexChartAnnotationLink extends WjLink {
    _initControl(): any;
}
