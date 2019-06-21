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

import{WjBinding}from"wijmo/wijmo.knockout.base";import*as mKo from"knockout";import*as wjcNav from"wijmo/wijmo.nav";var wjKo=mKo;export class wjTreeView extends WjBinding{_getControlConstructor(){return wjcNav.TreeView}};wjKo.bindingHandlers.wjTreeView=new wjTreeView;