<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart :itemsSource="data" bindingX="date" chartType="Candlestick" :tooltipContent="tooltip" :palette="palette">
                <wj-flex-chart-series binding="high,low,open,close" name="Box Inc"></wj-flex-chart-series>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
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
    import '@grapecity/wijmo.vue2.chart.finance';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                tooltip: `<b>{date:MMM dd}</b><br/>
                    <table>
                    <tr><td>high</td><td>{high:c}</td><tr/>
                    <tr><td>low</td><td>{low:c}</td><tr/>
                    <tr><td>open</td><td>{open:c}</td><tr/>
                    <tr><td>close</td><td>{close:c}</td><tr/>
                    </table>`,
                palette: ['rgba(70,107,176,1)', 'rgba(200,180,34,1)', 'rgba(20,136,110,1)', 'rgba(181,72,54,1)', 
                    'rgba(110,89,68,1)', 'rgba(139,56,114,1)', 'rgba(115,178,43,1)', 'rgba(184,115,32,1)', 'rgba(20,20,20,1)']
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
