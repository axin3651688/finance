<template>
    <div class="container-fluid">
        <div class="form-group">
            <h4>
                Gridlines
            </h4>
            <div class="row">
                <div class="col-xs-4">
                    <label>
                        <input id="customGridlines" type="checkbox" v-on:change="customGridLine">
                        Custom CSS
                    </label><br />
                    <label>
                        <input id="customUnits" type="checkbox" checked="checked" v-on:change="customUnits">
                        Custom Units
                    </label>
                </div>
                <div class="col-xs-4">
                    <label>
                        <input id="x-major" type="checkbox" checked="checked" v-on:change="toggleXMajor">
                        X Major
                    </label><br />
                    <label>
                        <input id="x-minor" type="checkbox" checked="checked" v-on:change="toggleXMinor">
                        X Minor
                    </label>
                </div>
                <div class="col-xs-4">
                    <label>
                        <input id="y-major" type="checkbox" checked="checked" v-on:change="toggleYMajor">
                        Y Major
                    </label><br />
                    <label>
                        <input id="y-minor" type="checkbox" checked="checked" v-on:change="toggleYMinor">
                        Y Minor
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <wj-flex-chart :itemsSource="data" bindingX="date" chartType="Candlestick" :palette="palette" :initialized="chartInitialized">
                <wj-flex-chart-series binding="high,low,open,close" name="Alphabet Inc"></wj-flex-chart-series>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                <wj-flex-chart-axis wjProperty="axisX" format="MMM dd" :majorGrid="true" majorTickMarks="Cross" :axisLine="true"
                    :majorUnit="7" :minorGrid="true" minorTickMarks="None" :minorUnit="1"></wj-flex-chart-axis>
                <wj-flex-chart-axis :min="790" :max="860" wjProperty="axisY" format="c0" :majorGrid="true" majorTickMarks="Cross"
                    :majorUnit="20" :minorGrid="true" :axisLine="true" minorTickMarks="None" :minorUnit="5"></wj-flex-chart-axis>
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
    import * as wjCore from '@grapecity/wijmo';
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
            chartInitialized: function(flex) {
                this.theChart = flex;
            },
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            },
            customGridLine: function(e) {
                wjCore.toggleClass(this.theChart.hostElement, 'custom-gridlines', e.target.checked);
            },
            customUnits: function(e) {
                let theChart = this.theChart;
                if (e.target.checked) {
                    theChart.axisX.majorUnit = 7;
                    theChart.axisX.minorUnit = 1;
                    theChart.axisY.majorUnit = 20;
                    theChart.axisY.minorUnit = 5;
                } else {
                    theChart.axisX.majorUnit = null;
                    theChart.axisX.minorUnit = null;
                    theChart.axisY.majorUnit = null;
                    theChart.axisY.minorUnit = null;
                }
            },
            toggleXMajor: function(e) {
                this.theChart.axisX.majorGrid = e.target.checked
            },
            toggleXMinor: function(e) {
                this.theChart.axisX.minorGrid = e.target.checked
            },
            toggleYMajor: function(e) {
                this.theChart.axisY.majorGrid = e.target.checked
            },
            toggleYMinor: function(e) {
                this.theChart.axisY.minorGrid = e.target.checked
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-flexchart {
        height: 300px;
    }

    .custom-gridlines.wj-flexchart .wj-axis-x .wj-tick,
    .custom-gridlines.wj-flexchart .wj-axis-y .wj-tick {
        stroke: darkgreen;
    }

    .custom-gridlines.wj-flexchart .wj-axis-x .wj-gridline,
    .custom-gridlines.wj-flexchart .wj-axis-y .wj-gridline {
        opacity: .25;
        stroke: darkgreen;
        stroke-width: 1px;
    }

    .custom-gridlines.wj-flexchart .wj-axis-x .wj-gridline-minor,
    .custom-gridlines.wj-flexchart .wj-axis-y .wj-gridline-minor {
        opacity: .25;
        stroke: darkgreen;
        stroke-dasharray: 0;
        stroke-width: .25px;
    }

    .wj-control {
        margin-bottom: 6px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
