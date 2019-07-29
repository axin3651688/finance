<template>
    <div class="container-fluid">
        <label for="search">Search: </label>
        <wj-auto-complete :items-source="autoCompleteData" :selected-index=-1 display-member-path="path"
            search-member-path="keywords" :selected-index-changed="onSelectedIndexChanged"></wj-auto-complete>
        <wj-tree-view :items-source="data" display-member-path="header" child-items-path="items" :initialized="initTreeView"></wj-tree-view>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.nav';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';
    
    var wjTreeViewControl = null;
    var treeViewData= getData();
    new Vue({
        el: '#app',
        data: function () {
            return { 
                data: treeViewData,
                autoCompleteData: _getSearchList(treeViewData)
            }
        },
        methods:{
            initTreeView: function(ctl){
                wjTreeViewControl = ctl;
            },
            onSelectedIndexChanged: function(s) {
                if (s.selectedItem) {
                    wjTreeViewControl.selectedItem = s.selectedItem.item;
                }
            }
        }
    })

 function _getSearchList(items, searchList, path){
    // set defaults
    if (searchList == null) searchList = [];
    if (path == null) path = '';

    // add items and sub-items
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        searchList.push({
            item: item,
            path: path + item.header,
            keywords: item.keywords
        });
        if (item.items) {
            _getSearchList(item.items, searchList, path + item.header + ' / ');
        }
    }
    return searchList;
  }
</script>

<style>
    .container-fluid .wj-control {
        margin-bottom: 6px;
    }

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
