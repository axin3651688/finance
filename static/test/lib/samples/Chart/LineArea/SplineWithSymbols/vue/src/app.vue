<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" header="Temperature of New York"
            tooltipContent="" bindingX="month" chartType="SplineSymbols" :palette="palette">
            <wj-flex-chart-legend position="Right"></wj-flex-chart-legend>
            <wj-flex-chart-data-label content="{y}"></wj-flex-chart-data-label>
            <wj-flex-chart-axis wjProperty="axisY" title="Temperature(°C)"></wj-flex-chart-axis>
            <wj-flex-chart-series binding="low" name="Average Low"></wj-flex-chart-series>
            <wj-flex-chart-series binding="high" name="Average High"></wj-flex-chart-series>
            <wj-flex-chart-series binding="mean" name="Daily Mean"></wj-flex-chart-series>
            <wj-flex-chart-animation animationMode="Series"></wj-flex-chart-animation>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjChart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
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