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

"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const VueModule=require("vue"),wjcCore=require("wijmo/wijmo"),vue_1=require("vue");exports.Vue=vue_1.default||VueModule,exports.WjInclude=exports.Vue.component("wj-include",{render:function(e){return e("div")},props:["src"],mounted:function(){wjcCore.httpRequest(this.src,{success:e=>{this.$el.innerHTML=e.response}})}}),exports.WjFormat=exports.Vue.filter("wj-format",function(e,r){return wjcCore.Globalize.format(e,r)});