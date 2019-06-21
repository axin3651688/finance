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

import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcFilter from"wijmo/wijmo.grid.filter";var wjKo=mKo;export class wjFlexGridFilter extends WjBinding{_getControlConstructor(){return wjcFilter.FlexGridFilter}};wjKo.bindingHandlers.wjFlexGridFilter=new wjFlexGridFilter;