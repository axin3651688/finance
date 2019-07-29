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

import{WjBinding,WjContext}from"wijmo/wijmo.knockout.base";import{Tooltip}from"wijmo/wijmo";import*as mKo from"knockout";var wjKo=mKo;export class wjTooltip extends WjBinding{_getControlConstructor(){return Tooltip}_createControl(o){return super._createControl(null)}_createWijmoContext(){return new WjTooltipContext(this)}};export class WjTooltipContext extends WjContext{update(o,t,e,i,n){super.update(o,t,e,i,n),this._updateTooltip()}_updateTooltip(){this.control.setTooltip(this.element,wjKo.unwrap(this.valueAccessor()))}};wjKo.bindingHandlers.wjTooltip=new wjTooltip;