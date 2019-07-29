<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="labelPosition">Label Position: </label>
            <wj-combo-box :itemsSource="comboData" :textChanged="textChanged" text="Top"></wj-combo-box><br />
            <label for="linesAndBorders">Lines/Borders: </label>
            <input id="linesAndBorders" type="checkbox" v-on:click="lbClick" /><br />
            <label for="downloadsOnly">2016 Only: </label>
            <input id="downloadsOnly" type="checkbox" v-model="downloadsOnly" v-on:click="doClick" />
        </div>
        <div class="form-group">
            <wj-flex-chart :itemsSource="data" bindingX="country" tooltipContent="" header="Country GDP" :palette="palette" :initialized="chartInitialized">
                <wj-flex-chart-series binding="2014" name="2014"></wj-flex-chart-series>
                <wj-flex-chart-series binding="2015" name="2015"></wj-flex-chart-series>
                <wj-flex-chart-series binding="2016" name="2016"></wj-flex-chart-series>
                <wj-flex-chart-data-label content="{value:n0,,}T" position="Top"></wj-flex-chart-data-label>
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
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                comboData: getComboData(),
                palette: this.getRandomPalette(),
                downloadsOnly: false
            }
        },
        methods: {
            chartInitialized(flex) {
                this.theChart = flex;
                flex.dataLabel.rendering.addHandler(function(_, e) {
                    if (this.downloadsOnly && e.hitTestInfo.series.binding != '2016') {
                        e.cancel = true; // labels only for the "downloads" series
                    }
                }, this);
            },
            textChanged(s) {
                this.theChart.dataLabel.position = s.text;
            },
            getRandomPalette() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            },
            lbClick(cb) {
                let dl = this.theChart.dataLabel;
                dl.connectingLine = dl.border = cb.target.checked;
            },
            doClick() {
                this.theChart.invalidate();
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
