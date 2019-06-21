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

import{WjComponentBehavior}from"wijmo/wijmo.vue2.base";import*as VueModule from"vue";import*as wjcGridDetail from"wijmo/wijmo.grid.detail";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;class WjFlexGridDetailBehavior extends WjComponentBehavior{constructor(){super(...arguments),this._openedComponents=[]}static render(e){return e("div")}_createControl(){let e=super._createControl();return e.createDetailCell=(e=>{let t=new(Vue.extend({data:function(){return{childVN:null}},render:function(e){return e("div",[this.childVN])}}));return t.childVN=this.component.$scopedSlots.default({row:e,item:e.dataItem}),t.$mount(),this._openedComponents.push(t),t.$el}),e.disposeDetailCell=(e=>{let t=e.detail,r=this._openedComponents;if(t)for(let e=0;e<r.length;e++)if(t===r[e].$el){r[e].$destroy(),r.splice(e,1);break}}),e}}WjFlexGridDetailBehavior.tag="wj-flex-grid-detail",WjFlexGridDetailBehavior.className="wijmo.grid.detail.FlexGridDetailProvider",WjFlexGridDetailBehavior.parentInCtor=!0,WjFlexGridDetailBehavior.classCtor=function(){return wjcGridDetail.FlexGridDetailProvider};export var WjFlexGridDetail=WjFlexGridDetailBehavior.register();