<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" bindingX="date" chartType="HighLowOpenClose" :palette="palette" tooltipContent="" :initialized="initializeChart">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-series binding="high,low,open,close" name="Box Inc"></wj-flex-chart-series>
            <wj-flex-chart-line-marker lines="Both" interaction="Move" :isVisible="lmVisible" :content="markerContent"></wj-flex-chart-line-marker>
        </wj-flex-chart>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.finance';
    import { getData } from './data';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette(),
                lmVisible: false
            }
        },
        methods: {
            initializeChart: function(flex) {
                // show the marker when the mouse is over the chart
                flex.addEventListener(flex.hostElement, 'mouseenter', () => {
                    this.lmVisible = true;
                });
                flex.addEventListener(flex.hostElement, 'mouseleave', () => {
                    this.lmVisible = false;
                });
            },
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            },
            markerContent: function(ht) {
                if(ht.item) {
                    let s = `<b>Date</b>: ${wjCore.Globalize.formatDate(ht.item.date, 'yyyy-MM-dd')}`;
                    for(let key in ht.item) {
                        if(key !== 'date') {
                            s += `</br> ${key}: ${ht.item[key]}`;
                        }
                    }
                    return s;
                } else {
                    return 'No items here...';
                }
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
