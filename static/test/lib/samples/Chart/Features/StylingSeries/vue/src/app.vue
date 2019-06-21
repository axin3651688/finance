<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart header="Country GDP" :itemsSource="data" bindingX="country">
                <wj-flex-chart-series binding="2014" name="2014" :style="{fill:'green',stroke:'darkgreen',strokeWidth:1}"></wj-flex-chart-series>
                <wj-flex-chart-series binding="2015" name="2015" :style="{fill:'red',stroke:'darkred',strokeWidth:1}"></wj-flex-chart-series>
                <wj-flex-chart-series binding="2016" name="2016" chartType="LineSymbols" 
                    :style="{stroke:'orange',strokeWidth:5}" :symbolStyle="{fill:'gold',stroke:'gold'}"></wj-flex-chart-series>
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

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData() 
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
