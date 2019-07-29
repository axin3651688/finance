<template>
    <div class="container-fluid">
        <div class="form-group">
            <p>
                <b>Filter: </b>
                <wj-input-date placeholder="Select Month" selectionMode="Month" format="MMMM yyyy" :isRequired="false"
                    :valueChanged="dateChanged" :min="min" :max="max" :initialized="inputInitialized">
                </wj-input-date>
                <button id="btnResetFilter" class="btn btn-default" v-on:click="resetFilter">Reset</button>
            </p>
            <p>
                <b>Zoom: </b>
                <button id="btnZoomIn" class="btn btn-default" v-on:click="applyZoom(0.9)">In</button>
                <button id="btnZoomOut" class="btn btn-default" v-on:click="applyZoom(1.1)">Out</button>
                <button id="btnResetZoom" class="btn btn-default" v-on:click="applyZoom(null)">Reset</button>
                <span>You can also zoom with ctrl+mouse wheel.</span>
            </p>
            <wj-flex-chart chartType="Candlestick" bindingX="date" :itemsSource="data" :palette="palette" :initialized="chartInitialized">
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                <wj-flex-chart-series binding="high,low,open,close" name="Alphabet Inc"></wj-flex-chart-series>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            let d = getData(),
                minD = d[d.length - 1].date,
                maxD = d[0].date;
            return { 
                data: d,
                minDate: minD,
                maxDate: maxD,
                min: new Date(minD.getFullYear(), minD.getMonth(), 1),
                max: new Date(maxD.getFullYear(), maxD.getMonth() + 1, 0),
                palette: this.getRandomPalette()
            }
        },
        mounted: function() {
            this.theMonth.value = this.maxDate;
        },
        methods: {
            inputInitialized: function(flex) {
                this.theMonth = flex;
            },
            chartInitialized: function(flex) {
                this.theChart = flex;
                // zoom with the mouse wheel
                flex.hostElement.addEventListener('wheel', e => {
                    if (e.ctrlKey) {
                        let center = this.theChart.pointToData(e.clientX, e.clientY);
                        this.applyZoom(e.deltaY > 0 ? 1.1 : .9, center);
                        e.preventDefault();
                    }
                })

            },
            dateChanged: function(s) {
                // reset the chart zoom
                this.applyZoom(null);
                //
                // apply filter to chart data
                this.theChart.collectionView.filter = item => {
                    if (this.theMonth.value == null) {
                        return true; // no filter
                    }
                    //
                    return wjCore.Globalize.format(item.date, this.theMonth.format) == this.theMonth.text;
                }
            },
            resetFilter: function() {
                this.theMonth.value = null;
            },
            // apply a zoom factor to the chart (keeping the center constant)
            applyZoom: function(factor, center) {
                let chart = this.theChart;
                this.applyZoomAxis(chart.axisX, factor, center ? center.x : null);
                this.applyZoomAxis(chart.axisY, factor, center ? center.y : null);
            },
            applyZoomAxis: function(axis, factor, center) {
                if (!factor) { // reset
                    axis.min = axis.max = null;
                } else {
                    let min = (axis.min != null ? axis.min : axis.actualMin).valueOf(),
                        max = (axis.max != null ? axis.max : axis.actualMax).valueOf();
                    //
                    if (center == null) {
                        center = (min + max) / 2;
                    }
                    //
                    axis.min = center - (center - min) * factor;
                    axis.max = center + (max - center) * factor;
                }
            },
            getRandomPalette() {
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

    .zoom-box {
        position: absolute;
        display: none;
        background-color: rgba(85, 85, 85, 0.05);
        border: 2px dashed #808080;
        pointer-events: none;
    }

    label {
        margin-right: 3px;
    }
</style>
