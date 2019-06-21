<template>
    <div class="container-fluid">
        <wj-flex-chart chartType="Scatter" bindingX="x" :itemsSource="data">
            <wj-flex-chart-series name="Raw Data" binding="y">
            </wj-flex-chart-series>
            <wj-flex-chart-trend-line name="TrendLine" binding="y" fitType="Polynomial" :order=2
                :style="{ stroke: 'darkred', strokeWidth: 3 }"></wj-flex-chart-trend-line>
            <wj-flex-chart-moving-average name="MovingAverage" binding="y" :period=6
                :style="{ stroke: 'orange', strokeWidth: 3 }"></wj-flex-chart-moving-average>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.analytics';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData()
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 250px;
        margin: 10px 0;
    }

    body {
        margin-bottom: 24pt;
    }
</style>