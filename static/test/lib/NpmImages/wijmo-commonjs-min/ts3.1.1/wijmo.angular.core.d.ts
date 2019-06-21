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
* {@module wijmo.angular.core}
* AngularJS directives for wijmo module
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
export declare const ngModuleName = "wj.container";
/**
 * AngularJS directive for the {@link Tooltip} class.
 *
 * Use the <b>wj-tooltip</b> directive to add tooltips to elements on the page.
 * The wj-tooltip directive supports HTML content, smart positioning, and touch.
 *
 * The wj-tooltip directive is specified as a parameter added to the
 * element that the tooltip applies to. The parameter value is the tooltip
 * text or the id of an element that contains the text. For example:
 *
 * <pre>&lt;p wj-tooltip="#fineprint" &gt;
 *     Regular paragraph content...&lt;/p&gt;
 * ...
 * &lt;div id="fineprint" style="display:none"&gt;
 *   &lt;h3&gt;Important Note&lt;/h3&gt;
 *   &lt;p&gt;
 *     Data for the current quarter is estimated
 *     by pro-rating etc.&lt;/p&gt;
 * &lt;/div&gt;</pre>
 */
export declare class WjTooltip extends WjDirective {
    constructor();
    readonly _controlConstructor: any;
    _initControl(element: any): any;
    _createLink(): WjLink;
}
/**
 * AngularJS directive for custom validations based on expressions.
 *
 * The <b>wj-validation-error</b> directive supports both AngularJS and native HTML5
 * validation mechanisms. It accepts an arbitrary AngularJS expression that should return
 * an error message string in case of the invalid input and an empty string if the input is valid.
 *
 * For AngularJS validation it should be used together with the <b>ng-model</b> directive.
 * In this case the <b>wj-validation-error</b> directive reports an error using a call
 * to the <b>NgModelController.$setValidity</b> method with the <b>wjValidationError</b> error key ,
 * in the same way as it happens with AngularJS native and custom validation directives.
 *
 * For HTML5 validation, the <b>wj-validation-error</b> directive sets the error state to the
 * element using the <b>setCustomValidity</b> method from the HTML5 validation API. For example:
 *
 * <pre>&lt;p&gt;HTML5 validation:&lt;/p&gt;
 * &lt;form&gt;
 *     &lt;input type="password"
 *         placeholder="Password"
 *         name="pwd" ng-model="thePwd"
 *         required minlength="2" /&gt;
 *     &lt;input type="password"
 *         placeholder="Check Password"
 *         name="chk" ng-model="chkPwd"
 *         wj-validation-error="chkPwd != thePwd ? 'Passwords don\'t match' : ''" /&gt;
 * &lt;/form&gt;
 *
 * &lt;p&gt;AngularJS validation:&lt;/p&gt;
 * &lt;form name="ngForm" novalidate&gt;
 *     &lt;input type="password"
 *         placeholder="Password"
 *         name="pwd" ng-model="thePwd"
 *         required minlength="2" /&gt;
 *     &lt;input type="password"
 *         placeholder="Check Password"
 *         name="chk" ng-model="chkPwd"
 *         wj-validation-error="chkPwd != thePwd" /&gt;
 *     &lt;div
 *         ng-show="ngForm.chk.$error.wjValidationError && !ngForm.chk.$pristine"&gt;
 *         Sorry, the passwords don't match.
 *     &lt;/div&gt;
 * &lt;/form&gt;</pre>
 *
 */
export declare class WjValidationError extends WjDirective {
    constructor();
    _postLinkFn(): (scope: any, tElement: any, tAttrs: any, controller: any) => void;
    _getMetaDataId(): any;
}
