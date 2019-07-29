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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGridMultirow from"wijmo/wijmo.grid.multirow";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjMultiRowBehavior extends WjComponentBehavior{}WjMultiRowBehavior.tag="wj-multi-row",WjMultiRowBehavior.className="wijmo.grid.multirow.MultiRow",WjMultiRowBehavior.classCtor=function(){return wjcGridMultirow.MultiRow};export var WjMultiRow=WjMultiRowBehavior.register();