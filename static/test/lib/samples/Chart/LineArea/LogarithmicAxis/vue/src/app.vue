<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" header="Logarithmic Axis" bindingX="x" chartType="Scatter"
            :palette="palette">
            <wj-flex-chart-series binding="y"></wj-flex-chart-series>
            <wj-flex-chart-trend-line name="Trendline" binding="y" :sampleCount=100></wj-flex-chart-trend-line>
            <wj-flex-chart-axis wjProperty="axisX" :logBase=10></wj-flex-chart-axis>
            <wj-flex-chart-animation></wj-flex-chart-animation>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjChart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.analytics';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            // Get random palette
            palette: (() => {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            })()
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>