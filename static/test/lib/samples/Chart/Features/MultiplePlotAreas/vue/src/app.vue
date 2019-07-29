<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart :itemsSource="data" header="Sales, Expenses, and Downloads" bindingX="country" :palette="palette" :initialized="initializeChart">
                <wj-flex-chart-series binding="sales" name="Sales"></wj-flex-chart-series>
                <wj-flex-chart-series binding="expenses" name="Expenses"></wj-flex-chart-series>
                <wj-flex-chart-series binding="downloads" name="Downloads" chartType="LineSymbols">
                    <wj-flex-chart-axis wjProperty="axisY" position="Left" :plotArea="plot"></wj-flex-chart-axis>
                </wj-flex-chart-series>
                <wj-flex-chart-plot-area :row="0" name="amounts" height="2*"></wj-flex-chart-plot-area>
                <wj-flex-chart-plot-area :row="1" name="spacer" :height="25"></wj-flex-chart-plot-area>
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
                palette: this.getRandomPalette(),
                plot: null
            }
        },
        methods: {
            initializeChart: function(flex) {
                let p = new wjChart.PlotArea();
                p.row = flex.plotAreas.length;
                p.name = 'quantities';
                p.height = '*';
                flex.plotAreas.push(p);
                this.plot = p;
            },
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
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
