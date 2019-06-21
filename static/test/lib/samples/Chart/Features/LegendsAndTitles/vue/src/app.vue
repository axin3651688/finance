<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="header">Header: </label>
            <wj-combo-box :text="header" :textChanged="headerChanged"></wj-combo-box><br>
            <label for="footer">Footer: </label>
            <wj-combo-box :text="footer" :textChanged="footerChanged"></wj-combo-box><br>
            <label for="xTitle">X-Axis Title: </label>
            <wj-combo-box :text="xTitle" :textChanged="xTitleChanged"></wj-combo-box><br>
            <label for="yTitle">Y-Axis Title: </label>
            <wj-combo-box :text="yTitle" :textChanged="yTitleChanged"></wj-combo-box><br>
            <label for="customTitles">Custom Titles: </label>
            <input id="customTitles" type="checkbox" v-model="customTitles" v-on:change="customTitleChange"><br>
            <label for="customLegend">Custom Legend: </label>
            <input id="customLegend" type="checkbox" v-model="customLegend" v-on:change="customLegendChange"><br>
            <label for="legendPosition">Legend Position: </label>
            <wj-combo-box :text="legendPosition" :textChanged="legendPositionChanged" :itemsSource="comboData"></wj-combo-box><br>
            <wj-flex-chart class="custom-titles custom-legend" bindingX="country" :header="header" :footer="footer" :itemsSource="data" 
                    :palette="palette" :initialized="initializeChart">
                <wj-flex-chart-legend :position="legendPosition"></wj-flex-chart-legend>
                <wj-flex-chart-axis wjProperty="axisX" :title="xTitle"></wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" :title="yTitle"></wj-flex-chart-axis>
                <wj-flex-chart-series binding="sales" name="Sales"></wj-flex-chart-series>
                <wj-flex-chart-series binding="expenses" name="Expenses"></wj-flex-chart-series>
                <wj-flex-chart-series binding="downloads" name="Downloads"></wj-flex-chart-series>
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
    import { getData, getComboData } from './data';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                comboData: getComboData(),
                header: "My Great Chart",
                footer: "powered by Wijmo's FlexChart",
                xTitle: "country",
                yTitle: "values/units",
                legendPosition: 'Left',
                customTitles: true,
                customLegend: true,
                palette: this.getRandomPalette()
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
            },
            customTitleChange: function(input) {
                wjCore.toggleClass(this.theChart.hostElement, 'custom-titles', input.checked);
            },
            customLegendChange: function(input) {
                wjCore.toggleClass(this.theChart.hostElement, 'custom-legend', input.checked);
            },
            legendPositionChanged: function(combo) {
                this.legendPosition = combo.text;
            },
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            },
            headerChanged: function(combo) {
                this.header = combo.text;
            },
            footerChanged: function(combo) {
                this.footer = combo.text;
            },
            xTitleChanged: function(combo) {
                this.xTitle = combo.text;
            },
            yTitleChanged: function(combo) {
                this.yTitle = combo.text;
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
        width: 150px;
        text-align: right;
    }

    /* custom color for all titles */
    .custom-titles.wj-flexchart .wj-title {
        fill: #42357C;
    }

    /* custom size/weight for header */
    .custom-titles.wj-flexchart .wj-header .wj-title {
        font-size: 120%;
        font-weight: bold;
    }

    /* custom size/weight for footer */
    .custom-titles.wj-flexchart .wj-footer .wj-title {
        font-size: 90%;
        font-weight: bold;
    }

    /* custom style for axis-x/y titles */
    .custom-titles.wj-flexchart .wj-axis-x .wj-title,
    .custom-titles.wj-flexchart .wj-axis-y .wj-title{
        font-size: 75%;
        font-style: normal;
        opacity: .5;
    }
    
    .wj-flexchart .wj-legend .wj-label {
        opacity: .9;
        font-size: 80%;
    }
    /* custom color for legend box */
    .custom-legend.wj-flexchart .wj-legend > rect {
        fill: #003000;
    }

    /* custom color for legend labels */
    .custom-legend.wj-flexchart .wj-legend .wj-label {
        fill: white;
        font-style: italic;
    }
</style>
