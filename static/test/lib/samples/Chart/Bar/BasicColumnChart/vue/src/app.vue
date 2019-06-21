<template>
    <div class="container-fluid">
        <wj-flex-chart header="Country GDP" bindingX="country" selectionMode="Point" :itemsSource="data"
            :palette="['rgba(42,159,214,1)', 'rgba(119,179,0,1)', 'rgba(153,51,204,1)', 'rgba(255,136,0,1)', 'rgba(204,0,0,1)', 'rgba(0,204,163,1)', 'rgba(61,109,204,1)', 'rgba(82,82,82,1)', 'rgba(0,0,0,1)']">
            <wj-flex-chart-legend position="Bottom">
            </wj-flex-chart-legend>

            <wj-flex-chart-series name="2014" binding="2014">
            </wj-flex-chart-series>
            <wj-flex-chart-series name="2015" binding="2015">
            </wj-flex-chart-series>
            <wj-flex-chart-series name="2016" binding="2016">
            </wj-flex-chart-series>

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
