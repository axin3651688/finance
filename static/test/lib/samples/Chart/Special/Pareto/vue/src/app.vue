<template>
    <div class="container-fluid">
        <div class="form-group">
            <button id="btnUpdate" class="btn btn-default" @click="updateData">Update</button>
        </div>
        <wj-flex-chart :itemsSource="data" chartType="Column" binding="make" :palette="palette">
            <wj-flex-chart-axis wjProperty="axisY" format="n0" title="Sales (thousands)" :axisLine=true>
            </wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisX" :labelAngle=-90></wj-flex-chart-axis>
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-series binding="sales" name="Sales (thousands)"></wj-flex-chart-series>
            <wj-flex-chart-series binding="cumSales" name="Cumulative Sales" chartType="Line"
                :style="{'stroke':'orange', 'strokeWidth': 4}">
                <wj-flex-chart-axis wjProperty="axisY" position="Right" title="Cumulative Sales" format="p0" :min=0
                    :axisLine=true></wj-flex-chart-axis>
            </wj-flex-chart-series>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            palette: (() => {
                // Get random palette
                let palettes = Object.getOwnPropertyNames(chart.Palettes)
                    .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return chart.Palettes[palettes[rand]];
            })()
        },
        methods: {
            updateData() {
                let view = this.data;
                //
                view.deferUpdate(() => {
                    view.items.forEach(item => {
                        item.sales += (Math.random() - .5) * .5 * item.sales;
                    });
                });
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
       margin: 0 auto;
        border: none;
    }

    body {
        margin-bottom: 24pt;
    }
</style>