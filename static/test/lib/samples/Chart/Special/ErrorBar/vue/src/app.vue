<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="chartType">Chart Type:</label>
            <wj-combo-box id="chartType" :itemsSource="chartTypes" :selectedIndexChanged="onChartTypeChanged">
            </wj-combo-box>
        </div>
        <div class="form-group">
            <label for="error">Error:</label>
            <wj-combo-box id="error" displayMemberPath="hdr" :itemsSource="comboData" :selectedIndexChanged="onErrorChanged">
            </wj-combo-box>
        </div>
        <div class="form-group">
            <label for="btnRandomize">Randomize Data</label>
            <button id="btnRandomize" class="btn btn-default" @click="randomizeData">
                Go
            </button>
        </div>

        <wj-flex-chart :itemsSource="data" bindingX="date" :chartType="chartType" :palette="palette">
            <wj-flex-chart-error-bar :binding="errorValue ? 'amount' : 'amount,errorPlus,errorMinus'"
                :errorBarStyle="{ stroke: 'darkred', strokeWidth: 3 }" :value="errorValue"
                :errorAmount="errorMode">
            </wj-flex-chart-error-bar>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.analytics';
    import { getData, getComboData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            comboData: getComboData(),
            chartTypes: ['Column', 'Bar', 'Scatter', 'Line', 'LineSymbols', 'Area', 'Spline', 'SplineSymbols', 'SplineArea'],
            chartType: 'Column',
            errorValue: null,
            errorMode:  'Custom',
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
            onChartTypeChanged(sender) {
                this.chartType = sender.selectedValue;

            },
            onErrorChanged(sender) {
                this.errorValue = sender.selectedItem.value;
                this.errorMode = sender.selectedItem.mode;
            },
            randomizeData() {
                this.data = getData();
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 250px;
        margin: 10px 0;
    }

    label {
        width: 150px;
        text-align: right;
    }

    body {
        margin-bottom: 24pt;
    }
</style>