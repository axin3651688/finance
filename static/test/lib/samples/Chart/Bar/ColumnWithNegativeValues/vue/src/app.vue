<template>
    <div class="container-fluid">
        <wj-flex-chart header="Balance of trade in 2015 ($Billions) of the United States" bindingX="product" :itemsSource="data">
            <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
            <wj-flex-chart-series name="Exports" binding="exports"></wj-flex-chart-series>
            <wj-flex-chart-series name="Imports" binding="imports"></wj-flex-chart-series>
            <wj-flex-chart-series name="Difference" binding="difference"></wj-flex-chart-series>
            <wj-flex-chart-animation></wj-flex-chart-animation>
        </wj-flex-chart>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.animation';
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
