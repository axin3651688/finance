<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart bindingX="country" :itemsSource="data" :palette="palette" :tooltipContent="tooltipContent">
                <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
                <wj-flex-chart-series binding="sales" name="Sales"></wj-flex-chart-series>
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
            tooltipContent: function(hti) {
                let item = hti.item;
                return `<b>Country: </b>${item.country} <img src="resources/${item.country}.png" /></br>downloads: ${item.downloads}</br>sales: ${item.sales}`;
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
