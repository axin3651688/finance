<template>
    <div class="container-fluid">
        <div class="row">
        <div class="col-xs-6">
            <wj-tree-view :itemsSource="data" displayMemberPath="header" childItemsPath="items" :initialized="initialized">
            </wj-tree-view>
        </div>
        <div class="col-xs-6">
            <button class="btn btn-default" @click="onItemDataClick">Refresh with given item data</button>
            <br>
            <button class="btn btn-default" @click="onItemSourceClick">Refresh with changed itemsSource</button>
            <br>
            <button class="btn btn-default" @click="onReloadClick">Re-load the TreeView</button>
        </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData()
        },
        methods: {
            initialized(sender) {
                this.control = sender;
                this.control.selectedItem = this.control.itemsSource[0];
            },
            onItemDataClick() {
                this.control.selectedNode.refresh({
                    header: 'given itemData ' + Date.now(),
                    items: [
                        { header: 'first child' },
                        { header: 'second child' }
                    ]
                });
            },
            onItemSourceClick() {
                let node = this.control.selectedNode,
                    arr = node.itemsSource;
                //
                arr[node.index] = {
                    header: 'updated itemData ' + Date.now(),
                    items: [
                        { header: 'first child' },
                        { header: 'second child' }
                    ]
                };
                //
                node.refresh();
            },
            onReloadClick() {
                this.control.loadTree(true);
                this.control.selectedItem = this.control.itemsSource[0];
            }
        }
    });
</script>

<style>
    .container-fluid .wj-treeview {
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
