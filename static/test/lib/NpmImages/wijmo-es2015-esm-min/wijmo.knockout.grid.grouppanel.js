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

import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcGroup from"wijmo/wijmo.grid.grouppanel";var wjKo=mKo;export class wjGroupPanel extends WjBinding{_getControlConstructor(){return wjcGroup.GroupPanel}};wjKo.bindingHandlers.wjGroupPanel=new wjGroupPanel;