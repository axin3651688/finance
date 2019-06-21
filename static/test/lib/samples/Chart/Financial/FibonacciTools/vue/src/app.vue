<template>
    <div class="container-fluid">
        <!-- Settings -->
        <div class="panel-group" id="settings">
            <div class="panel panel-default">
                <div id="settingsBody" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <!-- General-->
                        <ul class="list-inline">
                            <li>
                                <wj-menu :header="'Type:<b>' + selectedFibText + '</b>'" :value="selectedFib" displayMemberPath="text" :itemsSource="typeData"
                                        commandParameterPath="parm" :command="typeCommand" :itemClicked="typeClick">
                                </wj-menu>
                            </li>
                        </ul>

                        <!-- Retracements -->
                        <ul class="list-inline" v-show="selectedFib === 'retracements'">
                            <li>
                                <wj-menu :header="'Uptrend:<b>' + uptrend + '</b>'" :value="properties.retracements.uptrend" displayMemberPath="text" 
                                    :itemsSource="uptrendData" commandParameterPath="parm" :itemClicked="uptrendChanged">
                                </wj-menu>
                            </li>

                            <li>
                                <wj-menu :header="'Label Position:<b>' + properties.retracements.labelPosition + '</b>'" 
                                    :value="properties.retracements.labelPosition" :itemClicked="rlpChanged" :itemsSource="rlpData">
                                </wj-menu>
                            </li>
                        </ul>

                        <!-- Arcs -->
                        <ul class="list-inline" v-show="selectedFib === 'arcs'">
                            <wj-menu :header="'Label Position:<b>' + properties.arcs.labelPosition + '</b>'" 
                                :value="properties.arcs.labelPosition" :itemClicked="alpChanged" :itemsSource="alpData">
                            </wj-menu>
                        </ul>
                        <ul class="list-inline" v-show="selectedFib === 'arcs'">
                            <li>
                                <label>Start X</label>
                                <wj-input-number :value="properties.arcs.start.x" :step="1" :valueChanged="asxChanged"></wj-input-number>
                            </li>
                            <li>
                                <label>Start Y</label>
                                <wj-input-number :value="properties.arcs.start.y" :step="1" :valueChanged="asyChanged"></wj-input-number>
                            </li>
                        </ul>
                        <ul class="list-inline" v-show="selectedFib === 'arcs'">
                            <li>
                                <label>End X</label>
                                <wj-input-number :value="properties.arcs.end.x" :step="1" :valueChanged="aexChanged"></wj-input-number>
                            </li>
                            <li>
                                <label>End Y</label>
                                <wj-input-number :value="properties.arcs.end.y" :step="1" :valueChanged="aeyChanged"></wj-input-number>
                            </li>
                        </ul>

                        <!-- Fans -->
                        <ul class="list-inline" v-show="selectedFib === 'fans'">
                            <wj-menu :header="'Label Position:<b>' + properties.fans.labelPosition + '</b>'" :value="properties.fans.labelPosition" 
                                :itemClicked="flpChanged" :itemsSource="flpData">
                            </wj-menu>
                        </ul>
                        <ul class="list-inline" v-show="selectedFib === 'fans'">
                            <li>
                                <label>Start X</label>
                                <wj-input-number :value="properties.fans.start.x" :step="1" :valueChanged="fsxChanged"></wj-input-number>
                            </li>
                            <li>
                                <label>Start Y</label>
                                <wj-input-number :value="properties.fans.start.y" :step="1" :valueChanged="fsyChanged"></wj-input-number>
                            </li>
                        </ul>
                        <ul class="list-inline" v-show="selectedFib === 'fans'">
                            <li>
                                <label>End X</label>
                                <wj-input-number :value="properties.fans.end.x" :step="1" :valueChanged="fexChanged"></wj-input-number>
                            </li>
                            <li>
                                <label>End Y</label>
                                <wj-input-number :value="properties.fans.end.y" :step="1" :valueChanged="feyChanged"></wj-input-number>
                            </li>
                        </ul>

                        <!-- Time Zones -->
                        <ul class="list-inline" v-show="selectedFib === 'timeZones'">
                            <wj-menu :header="'Label Position:<b>' + properties.timeZones.labelPosition + '</b>'" 
                                :value="properties.timeZones.labelPosition" :itemClicked="tlpChanged" :itemsSource="tlpData">
                            </wj-menu>
                        </ul>
                        <ul class="list-inline" v-show="selectedFib === 'timeZones'">
                            <li>
                                <label>Start X</label>
                                <wj-input-number :value="properties.timeZones.start" :step="1" :valueChanged="tsxChanged"></wj-input-number>
                            </li>
                            <li>
                                <label>End X</label>
                                <wj-input-number :value="properties.timeZones.end" :step="1" :valueChanged="texChanged"></wj-input-number>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <wj-financial-chart :itemsSource="data" bindingX="date" :symbolSize="6" :tooltipContent="tooltip" chartType="Candlestick" 
                :palette="palette" :initialized="initializeChart">
            <wj-financial-chart-series binding="high,low,open,close" name="Box Inc">
            </wj-financial-chart-series>
            <wj-flex-chart-fibonacci binding="close" :symbolSize="1" name="Retracements"
                        :style="{ fill: 'red', stroke: 'red', strokeWidth:0.5, fontSize:10 }"
                        :labelPosition="properties.retracements.labelPosition"
                        :uptrend="properties.retracements.uptrend"
                        :visibility="selectedFib === 'retracements' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-fibonacci>
            <wj-flex-chart-fibonacci-arcs binding="close" name="Arcs"
                            :start="properties.arcs.start"
                            :end="properties.arcs.end"
                            :labelPosition="properties.arcs.labelPosition"
                            :visibility="selectedFib === 'arcs' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-fibonacci-arcs>
            <wj-flex-chart-fibonacci-fans binding="close" name="Fans"
                            :start="properties.fans.start"
                            :end="properties.fans.end"
                            :labelPosition="properties.fans.labelPosition"
                            :visibility="selectedFib === 'fans' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-fibonacci-fans>
            <wj-flex-chart-fibonacci-time-zones binding="close" name="TimeZones"
                                    :startX="properties.timeZones.start"
                                    :endX="properties.timeZones.end"
                                    :labelPosition="properties.timeZones.labelPosition"
                                    :visibility="selectedFib === 'timeZones' ? 'Visible' : 'Hidden'">
            </wj-flex-chart-fibonacci-time-zones>
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
    import { getData, getTypeData } from './data';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                typeData: getTypeData(),
                uptrendData: [{ text: 'True', parm: true }, { text: 'False', parm: false }],
                rlpData: 'Left,Center,Right'.split(','),
                alpData: 'None,Top,Center,Bottom'.split(','),
                flpData: 'None,Top,Center,Bottom'.split(','),
                tlpData: 'None,Left,Center,Right'.split(','),
                palette: this.getRandomPalette(),
                tooltip: '<b>Date:{date:MMM dd}</b><br/>' +
                    '<table>' +
                    '<tr><td>high</td><td>{high:c}</td><tr/>' +
                    '<tr><td>low</td><td>{low:c}</td><tr/>' +
                    '<tr><td>open</td><td>{open:c}</td><tr/>' +
                    '<tr><td>close</td><td>{close:c}</td><tr/>' +
                    '</table>',
                selectedFib: 'retracements',
                selectedFibText: 'Retracements',
                uptrend: 'True',
                properties: {
                    retracements: {
                        labelPosition: 'Left',
                        uptrend: true,
                    },
                    arcs: {
                        labelPosition: 'Top',
                        start: new wjChart.DataPoint(46, 19.75),
                        end: new wjChart.DataPoint(54, 17.1)

                    },
                    fans: {
                        labelPosition: 'Top',
                        start: new wjChart.DataPoint(10, 18.12),
                        end: new wjChart.DataPoint(32, 20.53)
                    },
                    timeZones: {
                        labelPosition: 'Right',
                        start: 0,
                        end: 3
                    }
                }
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
            },
            typeCommand: function(command) {
                this.selectedFib = command;
            },
            typeClick: function(menu) {
                if(menu.selectedItem != null) {
                    this.selectedFibText = menu.selectedItem.text;
                }
            },
            uptrendChanged: function(menu) {
                if(menu.selectedItem != null) {
                    this.properties.retracements.uptrend = menu.selectedItem.parm;
                    this.uptrend = menu.selectedItem.text;
                }
            },
            rlpChanged: function(menu) {
                if(menu.selectedValue != null) {
                    this.properties.retracements.labelPosition = menu.selectedValue;
                }
            },
            alpChanged: function(menu) {
                if(menu.selectedValue != null) {
                    this.properties.arcs.labelPosition = menu.selectedValue;
                }
            },
            asxChanged: function(input) {
                this.properties.arcs.start.x = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            asyChanged: function(input) {
                this.properties.arcs.start.y = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            aexChanged: function(input) {
                this.properties.arcs.end.x = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            aeyChanged: function(input) {
                this.properties.arcs.end.y = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            flpChanged: function(menu) {
                if(menu.selectedValue != null) {
                    this.properties.fans.labelPosition = menu.selectedValue;
                }
            },
            fsxChanged: function(input) {
                this.properties.fans.start.x = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            fsyChanged: function(input) {
                this.properties.fans.start.y = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            fexChanged: function(input) {
                this.properties.fans.end.x = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            feyChanged: function(input) {
                this.properties.fans.end.y = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            tlpChanged: function(menu) {
                if(menu.selectedValue != null) {
                    this.properties.timeZones.labelPosition = menu.selectedValue;
                }
            },
            tsxChanged: function(input) {
                this.properties.timeZones.start = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            texChanged: function(input) {
                this.properties.timeZones.end = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
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

    #iChart {
        height: 200px;
    }
</style>
