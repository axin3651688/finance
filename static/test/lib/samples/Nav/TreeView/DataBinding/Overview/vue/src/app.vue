<template>
    <div class="container-fluid">
    <wj-tree-view :items-source="data" display-member-path="header" child-items-path="items" :item-clicked="onItemClicked" :selected-item-changed="onSelectedItemChanged">
    </wj-tree-view>
    <div id="selection" v-html="selectionMsg"></div>
    <div id="click" v-html="clickMsg"></div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    
    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData() ,
                selectionMsg: null,
                clickMsg: null
            }
        },
        methods:{
            onSelectedItemChanged: function(s, e){
                this.clickMsg = wjCore.format('You selected item <b>{header}</b>.', s.selectedItem);
            },

            onItemClicked: function(s, e){
                this.selectionMsg = wjCore.format('You clicked item <b>{header}</b>.', s.selectedItem);
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>

/* default trees on this sample */
    .container-fluid .wj-treeview {
        display:block;
        font-size: 120%;
        margin-bottom: 8px;
        padding: 6px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    body {
        margin-bottom: 24pt;
    }
</style>
