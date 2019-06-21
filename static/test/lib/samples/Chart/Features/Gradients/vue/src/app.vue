<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart chartType="Area" stacking="Stacked" bindingX="country" :itemsSource="data" :initialized="chartInitialized">
                <wj-flex-chart-series binding="expenses" name="Expenses"></wj-flex-chart-series>
                <wj-flex-chart-series binding="sales" name="Sales"></wj-flex-chart-series>
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
        },
        methods: {
            chartInitialized: function(flex) {
                flex.series[0].style = {fill: 'l(0, 0, 0, 1)#ff0000-#ff0000:1:0.5',stroke: 'darkred', strokeWidth: 1};
                flex.series[1].style = {fill: 'l(0, 0, 0, 1)#00b050-#00b050:1:0.5',stroke: 'darkgreen', strokeWidth: 1};
                flex.invalidate();
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
