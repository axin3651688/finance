<template>
    <div class="container-fluid">
        <div class="form-group">
            <p>
                Sort by:
                <button id="btnNone" class="btn btn-default" v-on:click="sortOnClick(null)">None</button>
                <button id="btnCountry" class="btn btn-default" v-on:click="sortOnClick('country')">Country</button>
                <button id="btnSales" class="btn btn-default" v-on:click="sortOnClick('sales')">Sales</button>
                <button id="btnExpenses" class="btn btn-default" v-on:click="sortOnClick('expenses')">Expenses</button>
                <button id="btnDownloads" class="btn btn-default" v-on:click="sortOnClick('downloads')">Downloads</button>
            </p>
            <wj-flex-chart :itemsSource="data" bindingX="country" :initialized="initializeChart">
                <wj-flex-chart-series binding="sales" name="Sales"></wj-flex-chart-series>
                <wj-flex-chart-series binding="expenses" name="Expenses"></wj-flex-chart-series>
                <wj-flex-chart-series binding="downloads" name="Downloads"></wj-flex-chart-series>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    import * as wjCore from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData() 
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
            },
            sortOnClick: function(prop) {
                let sd = this.theChart.collectionView.sortDescriptions;
                //
                sd.clear();
                sd.push(new wjCore.SortDescription(prop, true))
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
