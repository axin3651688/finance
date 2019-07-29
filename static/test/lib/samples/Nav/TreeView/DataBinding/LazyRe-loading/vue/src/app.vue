<template>
    <div class="container-fluid">
        <wj-tree-view :itemsSource="data" displayMemberPath="header" childItemsPath="items"
            :isContentHtml=true :allowDragging=true :expandOnClick=false :autoCollapse=false
            :lazyLoadFunction="lazyLoadFunction" :isCollapsedChanging="onIsCollapsedChanging">
        </wj-tree-view>
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
            lazyLoadFunction: function(node, callback) {
                let self = this;
                setTimeout(function() {
                    let result = self.$_getLazyData();
                    callback(result);
                }, 1000);
            },
            onIsCollapsedChanging: (s, e) => {
                let node = e.node,
                    tree = node.treeView;
                //
                if (!node.isCollapsed && node.dataItem.reload) {
                    // remove previous lazy-loaded items from data source
                    node.dataItem.items = [];
                    //
                    // re-bind the tree to remove the old nodes
                    tree.loadTree();
                }
            },
            $_getLazyData: function() {
                let creationTime = wjCore.Globalize.format(new Date(), 'hh:mm:ss');
                let emptyArray = [];

                return [
                    { header: 'Empty Node at: ' + creationTime },
                    {
                        header: 'Node with child nodes at: ' + creationTime,
                        items: [
                            { header: 'hello' },
                            { header: 'world' }
                        ]
                    },
                    {
                        header: 'Lazy node <i>(reload when opening)</i>',
                        items: emptyArray,
                        reload: true
                    }
                ];
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-treeview {
        background-color: rgba(0, 0, 0, 0.1);
        padding: 12px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        height: 400px;
    }
</style>
