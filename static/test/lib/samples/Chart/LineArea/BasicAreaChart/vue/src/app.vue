<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" bindingX="Date" chartType="Area" :palette="palette">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisX" :labelAngle=-45></wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisY" title="Temperature(°C)"></wj-flex-chart-axis>
            <wj-flex-chart-series binding="MeanTemp" name="Mean Temperature"></wj-flex-chart-series>

            <wj-flex-chart-animation animationMode="Point"></wj-flex-chart-animation>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            palette: chart.Palettes.cyborg,
            data: getData()
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>