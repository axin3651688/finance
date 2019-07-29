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

import*as VueModule from"vue";import*as wjcCore from"wijmo/wijmo";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;export var WjInclude=Vue.component("wj-include",{render:function(e){return e("div")},props:["src"],mounted:function(){var e=this;wjcCore.httpRequest(this.src,{success:function(o){e.$el.innerHTML=o.response}})}});export var WjFormat=Vue.filter("wj-format",function(e,o){return wjcCore.Globalize.format(e,o)});