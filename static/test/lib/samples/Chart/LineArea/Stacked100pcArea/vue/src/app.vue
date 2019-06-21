<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" bindingX="year" chartType="Area" stacking="Stacked100pc" :palette="palette">
            <wj-flex-chart-axis wjProperty="axisY" title="Populations"></wj-flex-chart-axis>
            <wj-flex-chart-series binding="africa" name="Africa"></wj-flex-chart-series>
            <wj-flex-chart-series binding="oceania" name="Oceania"></wj-flex-chart-series>
            <wj-flex-chart-series binding="asia" name="Asia"></wj-flex-chart-series>
            <wj-flex-chart-series binding="europe" name="Europe"></wj-flex-chart-series>
            <wj-flex-chart-series binding="southAmerica" name="South America"></wj-flex-chart-series>
            <wj-flex-chart-series binding="northAmerica" name="North America"></wj-flex-chart-series>
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
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            // Get random palette
            palette: this.palette = (() => {
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

    .container-fluid .wj-flexchart .wj-chart-linemarker {
        background: transparent;
    }

    .container-fluid .wj-chart-linemarker-content {
        padding: 12px;
        margin: 6px;
        background: white;
        border-radius: 3px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .container-fluid .wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-hline,
    .container-fluid .wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-vline {
        height: 1px;
        width: 1px;
        opacity: 0.5;
        background: navy;
    }
</style>