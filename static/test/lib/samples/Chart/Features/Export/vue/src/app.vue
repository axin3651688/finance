<template>
    <div class="container-fluid">
        <div class="form-group">
            <p>
                Save as:
                <button class="btn btn-default" v-on:click="exportChart('png')">PNG</button>
                <button class="btn btn-default" v-on:click="exportChart('jpeg')">JPEG</button>
                <button class="btn btn-default" v-on:click="exportChart('svg')">SVG</button>
            </p>
            <wj-flex-chart header="Phase II Test Results" chartType="Scatter" :initialized="chartInitialized">
                <wj-flex-chart-series name="Experiment 1" :itemsSource="data1" bindingX="x" binding="y"></wj-flex-chart-series>
                <wj-flex-chart-series name="Experiment 2" :itemsSource="data2" bindingX="x" binding="y"></wj-flex-chart-series>
                <wj-flex-chart-series name="Experiment 3" :itemsSource="data3" bindingX="x" binding="y"></wj-flex-chart-series>
                <wj-flex-chart-axis wjProperty="axisY" :axisLine="true"></wj-flex-chart-axis>
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
    import '@grapecity/wijmo.chart.render';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data1: getData(50, 0, 3),
                data2: getData(40, 100, 12),
                data3: getData(30, -100, 24)
            }
        },
        methods: {
            chartInitialized: function(flex) {
                this.theChart = flex;
            },
            exportChart(type) {
                this.theChart.saveImageToFile('FlexChart.' + type);
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .wj-flexchart {
        height: 300px;
        margin: 10px 0;
        background: white;
    }

    label {
        margin-right: 3px;
    }
</style>
