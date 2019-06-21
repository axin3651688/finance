<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="innerPoints">Show Inner Points:</label>
            <input id="innerPoints" type="checkbox" v-model="showInnerPoints" />

            <label for="outliers">Show Outliers:</label>
            <input id="outliers" type="checkbox" v-model="showOutliers" />
        </div>
        <div class="form-group">
            <label for="meanline">Show Mean Line:</label>
            <input id="meanline" type="checkbox" v-model="showMeanLine" />

            <label for="meanmarker">Show Mean Marker:</label>
            <input id="meanmarker" type="checkbox" v-model="showMeanMarker" />
        </div>
        <div class="form-group">
            <label for="rotated">Rotated:</label>
            <input id="rotated" type="checkbox" v-model="rotated" />

            <label for="btnRandomize">Randomize Data</label>
            <button id="btnRandomize" class="btn btn-default" @click="randomizeData">
                Go
            </button>
        </div>

        <wj-flex-chart bindingX="country" tooltipContent="{seriesName}: <b>{x}</b>" :itemsSource="data"
            :palette="palette"  :rotated="rotated">
            <wj-flex-chart-box-whisker binding="sales" name="Sales" :groupWidth=0.7 :gapWidth=0.2
                :showMeanLine="showMeanLine" :showMeanMarker="showMeanMarker" :showInnerPoints="showInnerPoints"
                :showOutliers="showOutliers">
            </wj-flex-chart-box-whisker>
            <wj-flex-chart-box-whisker binding="expenses" name="Expenses" :groupWidth=0.7 :gapWidth=0.2
                :showMeanLine="showMeanLine" :showMeanMarker="showMeanMarker" :showInnerPoints="showInnerPoints"
                :showOutliers="showOutliers">
            </wj-flex-chart-box-whisker>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.analytics';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            rotated: false,
            showMeanLine: false,
            showMeanMarker: false,
            showInnerPoints: false,
            showOutliers: false,
            palette: (() => {
                // Get random palette
                let palettes = Object.getOwnPropertyNames(chart.Palettes)
                    .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return chart.Palettes[palettes[rand]];
            })()
        },
        methods: {
            randomizeData() {
                this.data = getData();
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 300px;
    }

    label {
        width: 160px;
        text-align: right;
    }

    body {
        margin-bottom: 24px;
    }
</style>