<template>
    <div class="container-fluid">
        <wj-tree-view :items-source="data" display-member-path="header" child-items-path="items" :format-item="onFormatItem"></wj-tree-view>
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
            onFormatItem(s, e){
                if (e.dataItem.newItem) {
                    var imgUrl = 'https://demos.wijmo.com/5/PureJS/TreeViewIntro/TreeViewIntro/resources/new.png';
                    e.element.innerHTML += '<img class="new-icon" src="' + imgUrl + '">';
                }
            }
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
