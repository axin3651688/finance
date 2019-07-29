<template>
    <div class="container-fluid">
        <button id="btnShow" class="btn btn-primary" v-on:click="onShowNode">
            Show 'Work Table' Node
        </button>
        <button id="btnSelect" class="btn btn-primary" v-on:click="onSelectNode">
            Select 'Work Table' Node
        </button>
        <wj-tree-view :items-source="data" display-member-path="header" child-items-path="items" :initialized="initTreeView"></wj-tree-view>
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
                data: getData(),
                theItem: null,
                theNode: null
            }
        },
        methods:{
            initTreeView: function(ctl){
                this.wjTreeViewControl = ctl;
            },
            onShowNode() {
                this.theNode.ensureVisible();
            },
            onSelectNode() {
                this.theNode.select();
            },
            _findItem(items, text) {
                var node = null;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.header == text) {
                        return item;
                    }
                    if (item.items) {
                        item = this._findItem(item.items, text);
                        if (item) {
                        return item;
                        }
                    }
                }
                return null; //  not found
            }
        },
        mounted: function(){
            this.theItem =this._findItem(this.wjTreeViewControl.itemsSource, 'Work Table');
            this.theNode =this.wjTreeViewControl.getNode(this.theItem);
        }
    })
</script>

<style>
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
