<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-menu :value="selectionMode" :header="header" :itemClicked="selectionModeChanged" :itemsSource="menuData">
            </wj-menu>
            <wj-flex-chart header="Country GDP" bindingX="country" :selectionMode="selectionMode" :itemsSource="data" :palette="palette">
                <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
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
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                menuData: 'Point,Series,None'.split(','),
                palette: this.getRandomPalette(),
                selectionMode: 'Point',
                header: 'Selection Mode'
            }
        },
        methods: {
            selectionModeChanged: function(menu) {
                if (!menu.selectedValue) {
                    return;
                }
                this.selectionMode = menu.selectedValue;
                this.header = 'Selection Mode:<b>' + menu.text + '</b>';
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
