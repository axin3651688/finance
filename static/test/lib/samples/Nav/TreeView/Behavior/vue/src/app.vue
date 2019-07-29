<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <div id="properties"></div>
                <button id="btnCollapse" class="btn btn-default" v-on:click="onTreeCollapsedLoadedItems">Collapse
                    All</button>
                <button id="btnExpand" class="btn btn-default" v-on:click="onTreeExpandedLoadedItems">Expand All</button>
            </div>
            <div class="col-xs-6">
                <wj-tree-view :items-source="data" displayMemberPath="header" childItemsPath="items" :initialized="initTreeView">
                </wj-tree-view>
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
    
    var treeView = null;
    new Vue({
        el: '#app',
        data: function () {
            return { 
                data: getData() 
            }
        },
        methods:{
            initTreeView: function(ctl){
                treeView = ctl;
            },
            onTreeCollapsedLoadedItems: function(s, e){
                treeView.collapseToLevel(0);
            },
            onTreeExpandedLoadedItems: function(s, e){
                treeView.collapseToLevel(100000);
            }
        },
        mounted: function(){
            var props = 'allowDragging,autoCollapse,expandOnClick,isAnimated,isReadOnly,showCheckboxes'.split(','), 
            host = document.getElementById('properties'), 
            tpl = '<label><input id="{prop}" type="checkbox"> {prop}</label>';
            props.forEach(function (prop) {
                var el = wjCore.createElement(tpl.replace(/\{prop\}/g, prop), host);
                    el.querySelector('input').checked = treeView[prop];
            });
            host.addEventListener('click', function (e) {
                if (e.target instanceof HTMLInputElement) {
                    treeView[e.target.id] = e.target.checked;
                }
            });
        }
    })
</script>

<style>
    .container-fluid .wj-treeview {
        height: 350px;
        font-size: 120%;
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 6px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .container-fluid .wj-combobox {
        width: 120px;
    }

    label {
        width: 160px;
        margin-bottom: 12px;
    }
    
    body {
        margin-bottom: 24pt;
    }
</style>
