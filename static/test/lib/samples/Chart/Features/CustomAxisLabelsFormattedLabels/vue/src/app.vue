<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart header="Country GDP" bindingX="country" :itemsSource="data" :palette="palette">
                <wj-flex-chart-axis wjProperty="axisY" :itemFormatter="itemFormatter"></wj-flex-chart-axis>
                <wj-flex-chart-series name="2014" binding="2014"></wj-flex-chart-series>
                <wj-flex-chart-series name="2015" binding="2015"></wj-flex-chart-series>
                <wj-flex-chart-series name="2016" binding="2016"></wj-flex-chart-series>
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
            itemFormatter: function(_, label) {
                if (label.val >= 10000000) {
                    label.cls = 'high-value';
                } else if (label.val < 5000000) {
                    label.cls = 'low-value';
                }
                return label;
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

    .high-value {
        fill: darkgreen;
        font-weight: bold;
    }

    .low-value {
        fill: darkred;
    }
</style>
