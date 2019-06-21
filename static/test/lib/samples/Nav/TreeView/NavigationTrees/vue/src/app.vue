<template>
    <div class="container-fluid">
        <div id="msg" class="msg" v-html="msg"></div>
        <wj-tree-view :items-source="data" display-member-path="header" child-items-path="items" :item-clicked="onItemClicked"></wj-tree-view>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    
    new Vue({
        el: '#app',
        data: function () {
            return { 
                data: getData() ,
                msg: "Ready"
            }
        },
        methods:{
            onItemClicked: function(s, e){
                 this.msg = wjCore.format('Navigating to <b>** {header} **</b>', s.selectedItem);
            }
        }
    })
</script>

<style>
    .msg {
        text-align: right;
        color: orange;
    }

    .container-fluid .wj-treeview {
        display:block;
        height: 350px;
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
