<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="secondaryAxis">Secondary Y Axis</label>
            <input id="secondaryAxis" type="checkbox" checked="checked" v-on:change="saChange">
            <wj-flex-chart bindingX="country" :itemsSource="data" :palette="palette" :initialized="initializeChart">
                <wj-flex-chart-series binding="sales" name="Sales"></wj-flex-chart-series>
                <wj-flex-chart-series binding="expenses" name="Expenses"></wj-flex-chart-series>
                <wj-flex-chart-series binding="downloads" name="Downloads" chartType="LineSymbols">
                    <wj-flex-chart-axis wjProperty="axisY" position="Right" title="Downloads (k)" format="n0," :min="0" :axisLine="true"></wj-flex-chart-axis>
                </wj-flex-chart-series>
                <wj-flex-chart-axis wjProperty="axisY" format="n0," title="Sales/Expenses (US$ k)" :axisLine="true"></wj-flex-chart-axis>
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
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette()
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.ser = flex.series[2];
                this.axisY = this.ser.axisY;
            },
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            },
            saChange: function(sa) {
                this.ser.axisY = sa.target.checked ? this.axisY : null;
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
