<template>
    <div class="container-fluid">
        <wj-flex-chart header="Climate of New York" bindingX="month" :itemsSource="data"
            :palette="['rgba(136,189,230,1)', 'rgba(251,178,88,1)', 'rgba(144,205,151,1)', 'rgba(246,170,201,1)', 
            'rgba(191,165,84,1)', 'rgba(188,153,199,1)', 'rgba(237,221,70,1)', 'rgba(240,126,110,1)', 'rgba(140,140,140,1)']">
            <wj-flex-chart-legend position="None">
            </wj-flex-chart-legend>
            <wj-flex-chart-series name="Mean Temperature" binding="temperature">
            </wj-flex-chart-series>
            <wj-flex-chart-series name="Average Precipitation" binding="precipitation" chartType="Line">
                <wj-flex-chart-axis wjProperty="axisY" position="Right" title="Average Precipitation (mm)"
                    :axisLine="true" :min="0">
                </wj-flex-chart-axis>
            </wj-flex-chart-series>
            <wj-flex-chart-axis wjProperty="axisY" :axisLine="true" :origin="-10" title="Mean Temperature (°C)">
            </wj-flex-chart-axis>

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
