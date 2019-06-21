<template>
    <div class="container-fluid">
        <wj-tree-view :itemsSource="data"></wj-tree-view>

        <h2>Selecting a default item</h2>
        <p>
            If you select an item when the tree loads, it will
            automatically ensure the selected node is visible,
            expanding the tree and scrolling as needed.
            In this case, we selected the 'Solar Panel' item:
        </p>
        <wj-tree-view :itemsSource="data" :loadedItems="onTreeSelectedLoadedItems"></wj-tree-view>

        <h2>Collapsing to a given Level</h2>
        <p>
            Use the
            <b>collapseToLevel</b> method to collapse or expand
            the tree to a given level when it loads. For example, the
            trees below start totally collapsed and totally expanded:
        </p>
        <wj-tree-view :itemsSource="data" :loadedItems="onTreeCollapsedLoadedItems"></wj-tree-view>
        <wj-tree-view :itemsSource="data" :loadedItems="onTreeExpandedLoadedItems"></wj-tree-view>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                data: getData()
            };
        },
        methods: {
            onTreeSelectedLoadedItems: function(s, e) {
                s.selectedItem = this.findItem(s.itemsSource, 'Solar Panel');
            },
            onTreeCollapsedLoadedItems: function(s, e) {
                s.collapseToLevel(0);
            },
            onTreeExpandedLoadedItems: function(s, e) {
                s.collapseToLevel(10);
            },
            findItem:function(items,str){
                for (let i = 0; items && i < items.length; i++) {
                    if (items[i].header.indexOf(str) !== -1) {
                        return items[i];
                    }
                    let result = this.findItem(items[i].items, str);
                    if (result) {
                        return result;
                    }
                }
                return null;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-treeview {
        display: block;
        font-size: 120%;
        margin-bottom: 8px;
        padding: 6px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    body {
        margin-bottom: 24pt;
    }
</style>