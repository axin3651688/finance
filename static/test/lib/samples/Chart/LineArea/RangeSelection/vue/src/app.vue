<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" plotMargin="NaN 60 NaN 60" bindingX="date" chartType="Area"
            :palette="palette" :initialized="onChartInitialized">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-series binding="low,high,open,close" name="Alphabet Inc"></wj-flex-chart-series>
        </wj-flex-chart>

        <wj-flex-chart class="chart-selector" :itemsSource="data" plotMargin="NaN 60 NaN 60" tooltipContent=""
            bindingX="date" chartType="Area" :palette="palette">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisX" position="None"></wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisY" position="None"></wj-flex-chart-axis>
            <wj-flex-chart-series binding="close" name="Alphabet Inc"></wj-flex-chart-series>

            <wj-flex-chart-range-selector :minScale=0.05 :maxScale=0.75 :rangeChanged="rangeChanged">
            </wj-flex-chart-range-selector>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjChart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.interaction';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            palette: ['rgba(3,62,118,1)', 'rgba(135,192,72,1)', 'rgba(89,130,44,1)', 'rgba(83,179,235,1)', 'rgba(252,101,6,1)', 'rgba(212,35,35,1)', 'rgba(227,187,0,1)', 'rgba(204,204,204,1)', 'rgba(34,34,34,1)']
        },
        methods: {
            onChartInitialized(sender) {
                this.chart = sender;
            },
            rangeChanged(sender) {
                this.chart.axisX.min = sender.min;
                this.chart.axisX.max = sender.max;
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 300px;
    }

    .container-fluid .chart-selector {
        border: none;
        height: 60px;
    }

    .container-fluid .wj-flexchart .wj-chart-rangeslider .wj-rangeslider-rangehandle {
        background: gold;
        opacity: .14
    }

    body {
        margin-bottom: 24pt;
    }
</style>