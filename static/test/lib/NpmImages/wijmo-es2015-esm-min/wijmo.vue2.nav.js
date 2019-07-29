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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcNav from"wijmo/wijmo.nav";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjTreeViewBehavior extends WjComponentBehavior{}WjTreeViewBehavior.tag="wj-tree-view",WjTreeViewBehavior.className="wijmo.nav.TreeView",WjTreeViewBehavior.classCtor=function(){return wjcNav.TreeView};export var WjTreeView=WjTreeViewBehavior.register();