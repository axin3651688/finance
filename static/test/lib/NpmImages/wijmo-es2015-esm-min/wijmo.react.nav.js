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

import{ComponentBase}from"wijmo/wijmo.react.base";import*as wjcNav from"wijmo/wijmo.nav";export class TreeView extends ComponentBase{constructor(e){super(e,wjcNav.TreeView,{objectProps:["childItemsPath","displayMemberPath","imageMemberPath","checkedMemberPath","itemsSource","selectedItem","selectedNode","checkedItems"]})}};