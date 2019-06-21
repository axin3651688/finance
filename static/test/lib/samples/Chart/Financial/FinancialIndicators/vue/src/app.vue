<template>
    <div class="container-fluid">
        <div id="settingsBody" class="panel-collapse collapse in">
            <div class="panel-body">
                <!-- Indicator Selector -->
                <ul class="list-inline">
                    <li>
                        <label>Indicator Type</label>
                        <wj-combo-box :itemsSource="indicators" 
                                :textChanged="typeChanged"
                                selectedValuePath="abbreviation"
                                displayMemberPath="name"
                                :selectedValue="selectedIndicator">
                        </wj-combo-box>
                    </li>
                </ul>

                <!-- ATR Properties -->
                <ul class="list-inline" v-show="selectedIndicator === 'atr'">
                    <li>
                        <label>Period</label>
                        <wj-input-number :valueChanged="atrPeriodChanged"
                                            :value="14"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.atrPeriod"
                                            :step="1" format="n0">
                        </wj-input-number>
                    </li>
                </ul>

                <!-- RSI Properties -->
                <ul class="list-inline" v-show="selectedIndicator === 'rsi'">
                    <li>
                        <label>Period</label>
                        <wj-input-number :valueChanged="rsiPeriodChanged"
                                            :value="14"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.rsiPeriod"
                                            :step="1" format="n0">
                        </wj-input-number>
                    </li>
                </ul>

                <!-- CCI Properties -->
                <ul class="list-inline" v-show="selectedIndicator === 'cci'">
                    <li>
                        <label>Period</label>
                        <wj-input-number :valueChanged="cciPeriodChanged"
                                            :value="20"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.cciPeriod"
                                            :step="1" format="n0">
                        </wj-input-number>
                    </li>
                </ul>

                <!-- Williams %R Properties -->
                <ul class="list-inline" v-show="selectedIndicator === 'williamsR'">
                    <li>
                        <label>Period</label>
                        <wj-input-number :valueChanged="wrPeriodChanged"
                                            :value="14"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.williamsRPeriod"
                                            :step="1" format="n0">
                        </wj-input-number>
                    </li>
                </ul>

                <!-- MACD & MACD Histogram Properties -->
                <ul class="list-inline" v-show="selectedIndicator === 'macd'">
                    <li>
                        <label>Fast Period</label>
                        <wj-input-number :value="properties.fastPeriod"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.fastPeriod"
                                            :step="1" format="n0"
                                            :valueChanged="fastPeriodChanged">
                        </wj-input-number>
                    </li>
                    <li>
                        <label>Slow Period</label>
                        <wj-input-number :value="properties.slowPeriod"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.slowPeriod"
                                            :step="1" format="n0"
                                            :valueChanged="slowPeriodChanged">
                        </wj-input-number>
                    </li>
                    <li>
                        <label>Signal Smoothing Period</label>
                        <wj-input-number :value="properties.smoothingPeriod"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.smoothingPeriod"
                                            :step="1" format="n0"
                                            :valueChanged="smoothingPeriodChanged">
                        </wj-input-number>
                    </li>
                </ul>

                <!-- Fast Stochastic Properties -->
                <ul class="list-inline" v-show="selectedIndicator === 'stoch'">
                    <li>
                        <label>K Period</label>
                        <wj-input-number :value="properties.stochKPeriod"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.stochKPeriod"
                                            :step="1" format="n0"
                                            :valueChanged="stochKPeriodChanged">
                        </wj-input-number>
                    </li>
                    <li>
                        <label>D Period</label>
                        <wj-input-number :value="properties.stochDPeriod"
                                            :min="2" 
                                            :max="data.length > 0 ? data.length - 1 : properties.stochDPeriod"
                                            :step="1" format="n0"
                                            :valueChanged="stochDPeriodChanged">
                        </wj-input-number>
                    </li>
                    <li>
                        <label>Smoothing Period</label>
                        <wj-input-number :value="1"
                                            :min="1" 
                                            :max="data.length > 0 ? data.length - 1 : properties.stochSmoothingPeriod"
                                            :step="1" format="n0"
                                            :valueChanged="stochSmoothingPeriodChanged">
                        </wj-input-number>
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- FinancialChart -->
        <wj-financial-chart :itemsSource="data" bindingX="date" :palette="palette" :tooltipContent="tooltip" :initialized="initializeChart">
            <wj-financial-chart-series binding="close" name="Box Inc"></wj-financial-chart-series>
            <wj-flex-chart-legend position="Top"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisX" :labelAngle="0" :axisLine="true"></wj-flex-chart-axis>
        </wj-financial-chart>
        <!-- Indicators Chart -->
        <wj-financial-chart :itemsSource="data" style="height: 200px" bindingX="date" :palette="palette" 
                :tooltipContent="tooltip" :rendered="chartRendered" :initialized="initializeIChart">
            <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisX" :labelAngle="0" :axisLine="true"></wj-flex-chart-axis>
            <wj-flex-chart-atr binding="high,low,open,close" name="ATR"
                            :period="properties.atrPeriod"
                            :visibility="selectedIndicator === 'atr' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-atr>
            <wj-flex-chart-rsi binding="close" name="RSI"
                            :period="properties.rsiPeriod"
                            :visibility="selectedIndicator === 'rsi' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-rsi>
            <wj-flex-chart-cci binding="high,low,open,close" name="CCI"
                            :period="properties.cciPeriod"
                            :visibility="selectedIndicator === 'cci' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-cci>
            <wj-flex-chart-williams-r binding="high,low,open,close" name="Williams %R"
                                :period="properties.williamsRPeriod"
                                :visibility="selectedIndicator === 'williamsR' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-williams-r>
            <wj-flex-chart-macd binding="close" name="MACD,Signal"
                                :styles="properties.macdStyles"
                                :fastPeriod="properties.fastPeriod"
                                :slowPeriod="properties.slowPeriod"
                                :smoothingPeriod="properties.smoothingPeriod"
                                :visibility="selectedIndicator === 'macd' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-macd>
            <wj-flex-chart-macd-histogram binding="close" name="MACD Histogram"
                                :fastPeriod="properties.fastPeriod"
                                :slowPeriod="properties.slowPeriod"
                                :smoothingPeriod="properties.smoothingPeriod"
                                :visibility="selectedIndicator === 'macd' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-macd-histogram>
            <wj-flex-chart-stochastic binding="high,low,open,close" name="%K,%D"
                                :kPeriod="properties.stochKPeriod"
                                :dPeriod="properties.stochDPeriod"
                                :smoothingPeriod="properties.stochSmoothingPeriod"
                                :visibility="selectedIndicator === 'stoch' ? 'Visible' : 'Hidden'"
                                :styles="properties.stochStyles">
            </wj-flex-chart-stochastic>
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
    import { getData, getIndicatorList } from './data';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette(),
                tooltip: '<b>Date:{date:MMM dd}</b><br/>' +
                    '<table>' +
                    '<tr><td>high</td><td>{high:c}</td><tr/>' +
                    '<tr><td>low</td><td>{low:c}</td><tr/>' +
                    '<tr><td>open</td><td>{open:c}</td><tr/>' +
                    '<tr><td>close</td><td>{close:c}</td><tr/>' +
                    '</table>',
                indicators: getIndicatorList(),
                selectedIndicator: 'atr',
                properties: {
                    // ATR, CCI, RSI, Williams %R
                    atrPeriod: 14,
                    cciPeriod: 20,
                    rsiPeriod: 14,
                    williamsRPeriod: 14,

                    // MACD
                    fastPeriod: 12,
                    slowPeriod: 26,
                    smoothingPeriod: 9,
                    macdStyles: {   // named styles
                        macdLine: {
                            stroke: '#bfa554'
                        },
                        signalLine: {
                            stroke: '#bf8c54'
                        }
                    },

                    // Fast Stochastic
                    stochKPeriod: 14,
                    stochDPeriod: 3,
                    stochSmoothingPeriod: 1,
                    stochStyles: {   // named styles
                        kLine: {
                            stroke: '#eddd46'
                        },
                        dLine: {
                            stroke: '#edb747'
                        }
                    }
                }
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
            },
            initializeIChart: function(flex) {
                this.iChart = flex;
            },
            typeChanged: function(combo) {
                this.selectedIndicator = combo.selectedValue;
            },
            chartRendered: function() {
                this.iChart.axisX.min = this.theChart.axisX.actualMin;
                this.iChart.axisX.max = this.theChart.axisX.actualMax;
            },
            fastPeriodChanged: function(input) {
                var data = this.data,
                    props = this.properties,
                    len, smoothing;

                if (data.length <= 0) {
                    return;
                }
                len = data.length;
                smoothing = props.smoothingPeriod;

                props.fastPeriod = wjCore.clamp(input.value, 2, Math.abs(len - smoothing));
            },
            slowPeriodChanged: function(input) {
                var data = this.data,
                    props = this.properties,
                    len, smoothing;

                if (data.length <= 0) {
                    return;
                }
                len = data.length;
                smoothing = props.smoothingPeriod;

                props.slowPeriod = wjCore.clamp(input.value, 2, Math.abs(len - smoothing));
            },
            smoothingPeriodChanged: function(input) {
                var data = this.data,
                    props = this.properties,
                    len, max;

                if (data.length <= 0) {
                    return;
                }
                len = data.length;
                max = Math.max(props.fastPeriod, props.slowPeriod);
                props.smoothingPeriod = wjCore.clamp(input.value, 2, Math.abs(len - max));
            },
            stochKPeriodChanged: function(input) {
                var data = this.data,
                    props = this.properties,
                    len, max;

                if (data.length <= 0) {
                    return;
                }
                len = data.length;
                max = Math.abs(len - props.stochDPeriod);
                if (props.stochSmoothingPeriod > 1) {
                    max -= props.stochSmoothingPeriod;
                }
                props.stochKPeriod = wjCore.clamp(input.value, 2, max);
            },
            stochDPeriodChanged: function(input) {
                var data = this.data,
                    props = this.properties,
                    len, max;

                if (data.length <= 0) {
                    return;
                }
                len = data.length;
                max = Math.abs(len - props.stochKPeriod);
                if (props.stochSmoothingPeriod > 1) {
                    max -= props.stochSmoothingPeriod;
                }
                props.stochDPeriod = wjCore.clamp(input.value, 2, max);
            },
            stochSmoothingPeriodChanged: function(input) {
                var data = this.data,
                    props = this.properties,
                    len, max;

                if (data.length <= 0 || input.value <= 1) {
                    return;
                }
                len = data.length;
                max = Math.abs(len - props.stochKPeriod - props.stochDPeriod);
                max = max || 1;
                props.stochSmoothingPeriod = wjCore.clamp(input.value, 1, max);
            },
            atrPeriodChanged: function(input) {
                if (input.value < input.min || input.value > input.max) {
                    return;
                }
                this.properties.atrPeriod = input.value;
            },
            rsiPeriodChanged: function(input) {
                if (input.value < input.min || input.value > input.max) {
                    return;
                }
                this.properties.rsiPeriod = input.value;
            },
            cciPeriodChanged: function(input) {
                if (input.value < input.min || input.value > input.max) {
                    return;
                }
                this.properties.cciPeriod = input.value;
            },
            wrPeriodChanged: function(input) {
                if (input.value < input.min || input.value > input.max) {
                    return;
                }
                this.properties.williamsRPeriod = input.value;
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
