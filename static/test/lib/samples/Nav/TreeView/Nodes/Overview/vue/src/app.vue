<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <wj-tree-view :items-source="data" displayMemberPath="header" childItemsPath="items" :initialized="initTreeView" :loadedItems="itemsLoaded">
                </wj-tree-view>
            </div>
            <div class="col-xs-7">
                <div id="scan" class="btn btn-primary" @click="scanNode">
                    Scan Visible Nodes
                </div>
                <h4>
                    Visible Nodes:
                </h4>
                <div id="result" v-html="scanResult"></div>
            </div>
        </div>
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
                scanResult: null
            }
        },
        methods:{
            initTreeView: function(ctl){
                this.wjTreeViewControl = ctl;
            },
            scanNode(s) {
                this.$_scan(true);
            },
            $_scan(visible) {
                let result = '';
                for (let node = this.wjTreeViewControl.nodes[0]; node; node = node.next(visible)) {
                    result +=
                        wjCore.format('{header}', node.dataItem) +
                        wjCore.format(' <span class="node-info">(level: {level}, index: {index}, isCollapsed: {isCollapsed})</span><br/>', node);
                }
                this.scanResult = result;
            },
            itemsLoaded(){
                this.$_scan(true);
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
