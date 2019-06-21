<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" bindingX="stage" chartType="Funnel"
            :options="{ funnel: { type: 'rectangle' } }" labelContent="{item.count}" :palette="palette">
            <wj-flex-chart-series binding="count" name="Sales Pipeline"></wj-flex-chart-series>
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
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
       height: 300px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>