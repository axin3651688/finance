<template>
    <div class="container-fluid">
        <div class="form-group">
            <label>
                Please select a Palette:
                <wj-combo-box :itemsSource="paletteData" :selectedIndexChanged="selectedIndexChanged"></wj-combo-box>
            </label>
            <wj-flex-chart header="Country GDP" :itemsSource="data" bindingX="country" :palette="palette">
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
                palette: null,
                paletteData: 'Standard,Cocoa,Coral,Dark,HighContrast,Light,Midnight,Modern,Organic,Slate,Zen,Cyborg,Superhero,Flatly,Darkly,Cerulan'.split(',')
            }
        },
        methods: {
            selectedIndexChanged: function(s) {
                let pal = s.text.toLowerCase();
                this.palette = wjChart.Palettes[pal];
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
