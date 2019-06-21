<template>
    <div class="container-fluid">
        <div>
            <label>
                Bottom Border
                <input id="customCSS" type="checkbox" checked="true" v-on:click="onCustomCSSClick($event)">
            </label>
        </div>
        <wj-tree-view class="custom-tree" :items-source="data" display-member-path="header" child-items-path="items" :initialized="initTreeView"></wj-tree-view>
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
                data: getData()
            }
        },
        methods:{
            initTreeView: function(ctl){
                this.wjTreeViewControl = ctl;
            },
            onCustomCSSClick(e) {
                wjCore.toggleClass(this.wjTreeViewControl.hostElement, 'custom-tree', (e.target).checked);
            }
        }
    })
</script>

<style>
    .custom-tree.wj-treeview .wj-node {
        border-bottom: 1px solid #a0a0a0;
        padding-left: 110px;
        margin-left: -100px;
        margin-right: -10px;
    }

    .container-fluid .wj-treeview {
        width: 300px;
        height: 350px;
        font-size: 120%;
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 6px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    body {
        margin-bottom: 24pt;
    }
</style>
