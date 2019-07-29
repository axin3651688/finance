<template>
    <div class="container-fluid">
        <wj-flex-chart chartType="Scatter" tooltipContent="" bindingX="x" :itemsSource="data" :palette="palette">
            <wj-flex-chart-axis wjProperty="axisY" :axisLine="true" :majorGrid="false" :origin="0" 
                :majorUnit="1" :max="1" :min="-1" :labels="false"></wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisX" :origin="0" :axisLine="true"
                :majorUnit="1" :max="1" :min="-1" :labels="false"></wj-flex-chart-axis>
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-series name="data1" binding="y1"></wj-flex-chart-series>
            <wj-flex-chart-series name="data2" binding="y2"></wj-flex-chart-series>
        </wj-flex-chart>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(750),
                palette: this.getRandomPalette()
            }
        },
        methods: {
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container .wj-flexchart {
        height: 600px;
        width: 600px;
        margin: 10px 0;
    }

    body {
        margin-bottom: 24px;
    }
</style>
