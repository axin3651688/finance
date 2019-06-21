<template>
    <div class="container-fluid">
        <div class="form-group">
            <div style="position:relative">
                <wj-flex-chart :itemsSource="data" bindingX="country" :palette="palette" :initialized="initializeChart"></wj-flex-chart>
                <div id="pickerButton" v-on:click="pickerClick">
                    <span class="column-picker-icon glyphicon glyphicon-cog"></span>
                </div>
            </div>
            <div style="display:none">
                <wj-list-box :initialized="initializeLB" :itemsSource="lbData" checkedMemberPath="visible" displayMemberPath="name"
                    :lostFocus="lostFocus" :checkedItemsChanged="checkedItemsChanged"></wj-list-box>
            </div>
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
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette(),
                lbData: null
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                // auto-generate series
                let item = this.data[0];
                for (let k in item) {
                    if (wjCore.isNumber(item[k])) {
                        let series = new wjChart.Series();
                        series.binding = k;
                        series.name = wjCore.toHeaderCase(k);
                        series['visible'] = true; // add 'visible' property for binding
                        this.theChart.series.push(series);
                    }
                }
                this.lbData = flex.series;
            },
            initializeLB: function(flex) {
                this.theSeriesPicker = flex;
            },
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            },
            pickerClick: function(e) {
                wjCore.showPopup(this.theSeriesPicker.hostElement, e.target, false, true, false);
                this.theSeriesPicker.focus();
                e.preventDefault();
            },
            lostFocus: function() {
                wjCore.hidePopup(this.theSeriesPicker.hostElement);
            },
            checkedItemsChanged: function(s) {
                // map extra 'visible' property to 'Series.visibility' values
                this.theChart.series.forEach(series => {
                    series.visibility = s.checkedItems.indexOf(series) > -1
                        ? wjChart.SeriesVisibility.Visible
                        : wjChart.SeriesVisibility.Hidden;
                });
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

    .series-picker {
        columns: 2;
        padding: 12px;
        margin-left: 12px;
        margin-top: 26px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    #pickerButton {
        cursor: pointer;
        color: #FF8754;
        padding: 6px;
        position: absolute;
        left: 0;
        top: 0
    }
</style>
