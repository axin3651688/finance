<template>
    <div class="container-fluid">
        <wj-flex-chart header="Country GDP(B$)" bindingX="country" :itemsSource="data" tooltipContent=""
            :palette="['rgba(24,188,156,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(108,193,190,1)', 'rgba(153,165,73,1)', 'rgba(143,84,181,1)', 'rgba(231,76,60,1)', 'rgba(138,152,153,1)', 'rgba(44,62,80,1)']">
            <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
            <wj-flex-chart-series name="2016" binding="2016"></wj-flex-chart-series>
            <wj-flex-chart-data-label content="{y}"></wj-flex-chart-data-label>
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
