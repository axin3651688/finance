<template>
    <div class="container-fluid">
        <wj-multi-row :itemsSource="pagedOrders" :layoutDefinition="layoutDefinition"></wj-multi-row>
        <div class="btn-group">
            <button type="button" class="btn" @click="onGotoPageClick('first')" >
                <span class="glyphicon glyphicon-fast-backward"></span>
            </button>
            <button type="button" class="btn" @click="onGotoPageClick('previous')" >
                <span class="glyphicon glyphicon-step-backward"></span>
            </button>
            <button type="button" class="btn" v-html="pageText" disabled style="width:100px"></button>
            <button type="button" class="btn" @click="onGotoPageClick('next')" >
                <span class="glyphicon glyphicon-step-forward"></span>
            </button>
            <button type="button" class="btn" @click="onGotoPageClick('last')" >
                <span class="glyphicon glyphicon-fast-forward"></span>
            </button>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjCore from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid.multirow';
    import { generateAppData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            let data = generateAppData();
            return {
                pagedOrders: data.pagedOrders,
                layoutDefinition: data.ldThreeLines,
                pageText: ''
            }
        },
        methods: {
            initSlip: function(ordersSlip){
                this.ordersSlip = ordersSlip;
            },
            _updatePageText: function() {
                this.pageText = wjCore.format('{index:n0} / {count:n0}', {
                    index: this.pagedOrders.pageIndex + 1,
                    count: this.pagedOrders.pageCount
                });
            },
            onGotoPageClick: function(command) {
                if (command === 'first') {
                    this.pagedOrders.moveToFirstPage();
                } else if (command === 'previous') {
                    this.pagedOrders.moveToPreviousPage();
                } else if (command === 'next') {
                    this.pagedOrders.moveToNextPage();
                } else if (command === 'last') {
                    this.pagedOrders.moveToLastPage();
                }
            }
        },
        mounted: function(){
            this._updatePageText();
            this.pagedOrders.collectionChanged.addHandler(() => {
                this._updatePageText();
            });
            this.pagedOrders.pageChanged.addHandler(() => {
                this._updatePageText();
            });
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-multirow {
  margin: 6px 0;
  max-height:800px
}
</style>
