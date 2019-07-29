<template>
    <div class="container-fluid">
        <wj-tree-view :items-source="data" display-member-path="header" child-items-path="items"
            :show-checkboxes=true :checked-items-changed="onCheckedItemsChanged" :initialized="initTreeView"></wj-tree-view>

        <button id="btnCheckAll" class="btn btn-default" v-on:click="onCheckAllClick">
            Check All
        </button>
        <button id="btnUncheckAll" class="btn btn-default" v-on:click="onUncheckAllClick">
            Uncheck All
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button id="btnSaveState" class="btn btn-default" v-on:click="onSaveStateClick">
            Save State
        </button>
        <button id="btnRestoreState" class="btn btn-default" v-on:click="onRestoreStateClick">
            Restore State
        </button>
        <div id="tvChkStatus" v-html="tvChkStatus"></div>
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
                tvChkStatus: null,
                checkedItems: []
            }
        },
        methods:{
            initTreeView(ctl){
                this.wjTreeViewControl = ctl;
            },
            onCheckedItemsChanged() {
                var items = this.wjTreeViewControl.checkedItems,
                msg = '';
                if (items.length) {
                msg = '<p><b>Checked Items:</b></p><ol>\r\n';
                for (var i = 0; i < items.length; i++) {
                    msg += '<li>' + items[i].header + '</li>\r\n';
                }
                msg += '</ol>';
                }
                this.tvChkStatus = msg;
            },
            onCheckAllClick() {
                this.wjTreeViewControl.checkAllItems(true);
            },
            onUncheckAllClick() {
                this.wjTreeViewControl.checkAllItems(false);
            },
            onSaveStateClick() {
                this.checkedItems = this.wjTreeViewControl.checkedItems || [];
            },
            onRestoreStateClick() {
                this.wjTreeViewControl.checkedItems = this.checkedItems;
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
