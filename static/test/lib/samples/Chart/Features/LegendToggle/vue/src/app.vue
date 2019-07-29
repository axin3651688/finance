<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="legendToggle">Legend Toggle: </label>
            <input id="legendToggle" type="checkbox" v-model="legendToggle">

            <wj-flex-chart :itemsSource="data" bindingX="country" :palette="palette" :legendToggle="legendToggle">
                <wj-flex-chart-series binding="2014" name="2014"></wj-flex-chart-series>
                <wj-flex-chart-series binding="2015" name="2015"></wj-flex-chart-series>
                <wj-flex-chart-series binding="2016" name="2016"></wj-flex-chart-series>
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
                legendToggle: true,
                palette: this.getRandomPalette()
            }
        },
        methods: {
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
