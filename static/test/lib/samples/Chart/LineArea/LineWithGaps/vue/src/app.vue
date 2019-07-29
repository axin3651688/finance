<template>
    <div class="container-fluid">
        <div class="form-check">
            <label for="interpolateNulls" class="form-check-label">interpolateNulls:</label>
            <input id="interpolateNulls" type="checkbox" class="form-check-input" :checked="interpolateNulls" @click="onCheckboxClick">
        </div>

        <wj-flex-chart :itemsSource="data" header="24 Hours CPU Utilization and Temperature" bindingX="time"
            chartType="Line" :interpolateNulls="interpolateNulls" :palette="palette">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-series binding="utilization" name="Utilization(%)"></wj-flex-chart-series>
            <wj-flex-chart-series binding="temperature" name="Temperature(°C)"></wj-flex-chart-series>
            <wj-flex-chart-animation animationMode="Point"></wj-flex-chart-animation>
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
            interpolateNulls: false,
            // Get random palette
            palette: this.palette = (() => {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            })()
        },
        methods: {
            onCheckboxClick(e) {
                this.interpolateNulls = e.target.checked;
            }
        }
    });
</script>

<style>
    label {
        margin-right: 3px;
    }

    body {
        margin-bottom: 24px;
    }
</style>