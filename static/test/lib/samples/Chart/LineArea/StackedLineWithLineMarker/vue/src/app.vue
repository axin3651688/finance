<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" tooltipContent="" bindingX="year"
            :palette="palette" chartType="LineSymbols" stacking="Stacked" :initialized="onChartInitialized">
            <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisY" title="Populations(in millions)"></wj-flex-chart-axis>
            <wj-flex-chart-series binding="africa" name="Africa"></wj-flex-chart-series>
            <wj-flex-chart-series binding="asia" name="Asia"></wj-flex-chart-series>
            <wj-flex-chart-series binding="europe" name="Europe"></wj-flex-chart-series>
            <wj-flex-chart-series binding="southAmerica" name="South America"></wj-flex-chart-series>
            <wj-flex-chart-series binding="northAmerica" name="North America"></wj-flex-chart-series>
            <wj-flex-chart-series binding="oceania" name="Oceania"></wj-flex-chart-series>

            <wj-flex-chart-line-marker :isVisible="showMarker" lines="Both" interaction="Move" :content="getMarkerContent">
            </wj-flex-chart-line-marker>

            <wj-flex-chart-animation></wj-flex-chart-animation>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjChart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            showMarker: false,
            // Get random palette
            palette: this.palette = (() => {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            })()
        },
        methods: {
            onChartInitialized(sender) {
                 sender.hostElement.addEventListener('mouseenter', () => this.showMarker = true);
                 sender.hostElement.addEventListener('mouseleave', () => this.showMarker = false);
            },
            getMarkerContent(ht) {
                if (ht.item) {
                    let s = `<b>Poplations(in millions)</b></br>Year: ${ht.item.year}`;
                    for (let key in ht.item) {
                        if (key !== 'year') {
                            s += `</br> ${key}: ${ht.item[key]}`;
                        }
                    }
                    return s;
                } else {
                    return 'No items here...';
                }
            }
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .container-fluid .wj-flexchart .wj-chart-linemarker {
        background: transparent;
    }

    .container-fluid .wj-chart-linemarker-content {
        padding: 12px;
        margin: 6px;
        background: white;
        border-radius: 3px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .container-fluid .wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-hline,
    .container-fluid .wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-vline {
        height: 1px;
        width: 1px;
        opacity: .5;
        background: navy;
    }
</style>