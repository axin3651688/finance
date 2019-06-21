<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="fitType">Trendline Type: </label>
            <wj-combo-box :isRequired="false" placeholder="None" :itemsSource="comboData" :textChanged="textChanged" :initialized="initializeCombo"></wj-combo-box><br />
            <label for="order">Order: </label>
            <wj-input-number :step="1" :min="1" :max="6" :value="order" :valueChanged="orderChanged" :initialized="initializeInput"></wj-input-number><br />
            <label>Equation: </label>
            <div id="equation" class="equation"></div><br />
            <label for="btnRandomize">Randomize Data</label>
            <button id="btnRandomize" class="btn btn-default" v-on:click="randomData">
                Go
            </button>
            
            <wj-flex-chart :itemsSource="data" chartType="Scatter" bindingX="x" :initialized="initializeChart">
                <wj-flex-chart-axis wjProperty="axisY" :axisLine="true"></wj-flex-chart-axis>
                <wj-flex-chart-series name="Raw Data" binding="y"></wj-flex-chart-series>
                <wj-flex-chart-trend-line binding="y" :order="order" :style="{stroke:'darkred',strokeWidth:3}"></wj-flex-chart-trend-line>
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
    import '@grapecity/wijmo.vue2.chart.analytics';
    import { getData } from './data';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                comboData: 'Linear,Exponential,Logarithmic,Power,Fourier,Polynomial,MinX,MinY,MaxX,MaxY,AverageX,AverageY'.split(','),
                order: 2
            }
        },
        mounted: function() {
            this.eqEle = document.querySelector('#equation');
            this.reset(this.combo.selectedValue);
        },
        methods: {
            initializeInput: function(flex) {
                this.orderIpt = flex;
            },
            initializeCombo: function(flex) {
                this.combo = flex;
            },
            initializeChart: function(flex) {
                this.theChart = flex;
                this.trendLine = flex.series[1];
            },
            orderChanged: function(s) {
                if (s.value >= s.min && s.value <= s.max) {
                    this.order = s.value;
                    this.showEquation();
                }
            },
            showEquation: function() {
                if(this.eqEle) {
                    this.eqEle.innerHTML = '';
                    setTimeout(() => this.eqEle.innerHTML = this.trendLine.getEquation(), 100);
                }
            },
            randomData: function() {
                this.data = getData();
                this.showEquation();
            },
            textChanged: function(s) {
                this.reset(s.text);
            },
            reset: function(text) {
                let trendLine = this.trendLine;
                if(!trendLine) {
                    return;
                }
                trendLine.name = text;
                if (text) { // show trendline
                    trendLine.fitType = text;
                    trendLine.visibility = wjChart.SeriesVisibility.Visible;
                } else { // hide trendline
                    trendLine.visibility = wjChart.SeriesVisibility.Hidden;
                }
                switch (text) { // enable/disable order input
                    case 'Polynomial':
                    case 'Fourier':
                        this.orderIpt.isDisabled = false;
                        break;
                    default:
                        this.orderIpt.isDisabled = true;
                        break;
                }
                this.showEquation();
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-flexchart {
        height: 250px;
        margin: 10px 0;
    }

    .wj-control {
        margin-bottom: 3px;
    }

    label {
        width: 120px;
        text-align: right;
    }

    .equation {
        display: inline-block;
        font-style: italic;
        font-size: 80%;
    }

    .wj-combobox, .wj-inputnumber {
        width: 120px;
        margin-right: 12px;
    }

    body {
        margin-bottom: 24pt;
    }

</style>
