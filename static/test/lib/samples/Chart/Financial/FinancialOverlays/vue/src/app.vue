<template>
    <div class="container-fluid">
        <!-- Settings -->
        <div class="panel-group" id="settingsShort">
            <div class="panel panel-default">
                <div id="settingsBody" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <!-- Overlay Selector -->
                        <ul class="list-inline">
                            <li>
                                <label>Overlay</label>
                                <wj-combo-box :itemsSource="overlays"
                                                selectedValuePath="abbreviation"
                                                displayMemberPath="name"
                                                :selectedValue="selectedOverlay"
                                                :textChanged="overlayChanged">
                                </wj-combo-box>
                            </li>
                        </ul>

                        <!-- Bollinger Bands Properties -->
                        <ul class="list-inline" v-show="selectedOverlay === 'bollinger'">
                            <li>
                                <label>Period</label>
                                <wj-input-number :valueChanged="bpChanged"
                                                    :value="20"
                                                    :min="2" 
                                                    :max="data.length > 0 ? data.length - 1 : properties.bollingerPeriod"
                                                    :step="1" format="n0">
                                </wj-input-number>
                            </li>
                            <li>
                                <label>Multiplier</label>
                                <wj-input-number :valueChanged="bmChanged"
                                                    :value="2"
                                                    :min="1" 
                                                    :max="100"
                                                    :step="1" format="n0">
                                </wj-input-number>
                            </li>
                        </ul>

                        <!-- Envelope Properties -->
                        <ul class="list-inline" v-show="selectedOverlay === 'envelopes'">
                            <li>
                                <label>Period</label>
                                <wj-input-number :valueChanged="epChanged"
                                                    :value="20"
                                                    :min="2" 
                                                    :max="data.length > 0 ? data.length - 1 : properties.envelopePeriod"
                                                    :step="1" format="n0">
                                </wj-input-number>
                            </li>
                            <li>
                                <label>Size</label>
                                <wj-input-number :valueChanged="esChanged"
                                                    :value="0.03"
                                                    :min="0" :max="1"
                                                    :step="0.01" format="p0">
                                </wj-input-number>
                            </li>
                            <li>
                                <wj-menu :header="'Type: <b>' + properties.envelopeType + '</b>'" :value="properties.envelopeType" 
                                    :itemsSource="typeData" :itemClicked="typeChanged">
                                </wj-menu>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- overlays Chart -->
        <wj-financial-chart :itemsSource="data" bindingX="date" :tooltipContent="tooltip" chartType="Candlestick" :palette="palette">
            <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
            <wj-financial-chart-series binding="high,low,open,close" name="Box Inc">
            </wj-financial-chart-series>
            <wj-flex-chart-bollinger-bands binding="close" name="Bollinger Bands"
                                        :period="properties.bollingerPeriod"
                                        :multiplier="properties.bollingerMultiplier"
                                        :visibility="selectedOverlay === 'bollinger' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-bollinger-bands>
            <wj-flex-chart-envelopes binding="close" name="Envelopes"
                                    :period="properties.envelopePeriod"
                                    :type="properties.envelopeType"
                                    :size="properties.envelopeSize"
                                    :visibility="selectedOverlay === 'envelopes' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-envelopes>
        </wj-financial-chart>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.finance';
    import '@grapecity/wijmo.vue2.chart.finance.analytics';
    import { getData, getOverlays } from './data';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                tooltip: '<b>Date:{date:MMM dd}</b><br/>' +
                    '<table>' +
                    '<tr><td>high</td><td>{high:c}</td><tr/>' +
                    '<tr><td>low</td><td>{low:c}</td><tr/>' +
                    '<tr><td>open</td><td>{open:c}</td><tr/>' +
                    '<tr><td>close</td><td>{close:c}</td><tr/>' +
                    '</table>',
                palette: this.getRandomPalette(),
                overlays: getOverlays(),
                selectedOverlay: 'bollinger',
                typeData: 'Simple,Exponential'.split(','),
                properties: {
                    // Bollinger Bands
                    bollingerPeriod: 20,
                    bollingerMultiplier: 2,

                    // Moving Average Envelopes
                    envelopePeriod: 20,
                    envelopeType: 'Simple',
                    envelopeSize: 0.03
                }
            }
        },
        methods: {
            overlayChanged: function(combo) {
                this.selectedOverlay = combo.selectedValue;
            },
            typeChanged: function(menu) {
                this.properties.envelopeType = menu.selectedValue;
            },
            bpChanged: function(input) {
                if (input.value < input.min || input.value > input.max) {
                    return;
                }
                this.properties.bollingerPeriod = input.value;
            },
            bmChanged: function(input) {
                if (input.value < input.min || input.value > input.max) {
                    return;
                }
                this.properties.bollingerMultiplier = input.value;
            },
            esChanged: function(input) {
                if (input.value < input.min || input.value > input.max) {
                    return;
                }
                this.properties.envelopeSize = input.value;
            },
            epChanged: function(input) {
                if (input.value < input.min || input.value > input.max) {
                    return;
                }
                this.properties.envelopePeriod = input.value;
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
