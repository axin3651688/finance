<template>
    <div class="container-fluid">
        <!-- Settings -->
        <div class="panel-group" id="settings">
            <div class="panel panel-default">
                <div id="settingsBody" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <ul class="list-inline">
                            <li>
                                <!-- Symbol -->
                                <label>Symbol</label>
                                <wj-combo-box :itemsSource="comboData" displayMemberPath="name" selectedValuePath="symbol" :selectedValue="selectedSymbol"
                                    :selectedIndexChanged="selectedSymbolChanged">
                                </wj-combo-box>
                            </li>
                        </ul>
                        <ul class="list-inline">
                            <li>
                                <label># of Lines in Break</label>
                                <wj-input-number :value="options.lineBreak.newLineBreaks" :step="1" :min="1" :valueChanged="linesChanged">
                                </wj-input-number>
                            </li>
                        </ul>
                        <ul class="list-inline">
                            <li>
                                <label>Stroke</label>
                                <wj-input-color :value="style.stroke" :valueChanged="strokeChanged">
                                </wj-input-color>
                            </li>
                            <li>
                                <label>Alt. Stroke</label>
                                <wj-input-color :value="altStyle.stroke" :valueChanged="altStrokeChanged">
                                </wj-input-color>
                            </li>
                        </ul>
                        <ul class="list-inline">
                            <li>
                                <label>Fill</label>
                                <wj-input-color :value="style.fill" :valueChanged="fillChanged">
                                </wj-input-color>
                            </li>
                            <li>
                                <label>Alt. Fill</label>
                                <wj-input-color :value="altStyle.fill" :valueChanged="altFillChanged">
                                </wj-input-color>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- FinancialChart -->
        <wj-financial-chart :initialized="initializeChart" :itemsSource="data" :options="options" bindingX="date" chartType="LineBreak" :tooltipContent="tooltip">
            <wj-financial-chart-series binding="high,low,open,close" :name="selectedSymbol | uppercase" :style="style" :altStyle="altStyle">
            </wj-financial-chart-series>
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
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
    import { getData, getSymbols } from './data';
    import * as core from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                comboData: getSymbols(),
                selectedSymbol: 'box',
                options: {
                    lineBreak: {
                        newLineBreaks: 3
                    }
                },
                style: {
                    stroke: 'rgb(136, 189, 230)',
                    fill: 'rgba(136, 189, 230, 0.701961)'
                },
                altStyle: {
                    stroke: 'rgb(136, 189, 230)',
                    fill: 'transparent'
                }
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                this.ser = flex.series[0];
            },
            tooltip: function(ht) {
                var date = ht.item && ht.item.date ? ht.item.date : null,
                    content = '';
                //
                if (core.isDate(date)) {
                    date = core.Globalize.formatDate(date, 'MM/dd/yy');
                }
                if (ht && ht.item) {
                    content =
                    '<b>' + ht.name + '</b><br/>' +
                    'Date: ' + date + '<br/>' +
                    'Open: ' + core.Globalize.format(ht.item.open, 'n2') + '<br/>' +
                    'High: ' + core.Globalize.format(ht.item.high, 'n2') + '<br/>' +
                    'Low: ' + core.Globalize.format(ht.item.low, 'n2') + '<br/>' +
                    'Close: ' + core.Globalize.format(ht.item.close, 'n2') + '<br/>' +
                    'Volume: ' + core.Globalize.format(ht.item.volume, 'n0');
                }
                return content;
            },
            selectedSymbolChanged: function(combo) {
                this.selectedSymbol = combo.selectedValue;
                this.setDataSource();
            },
            strokeChanged: function(input) {
                this.style.stroke = input.value;
                this.ser.style.stroke = input.value;
                this.optionChanged();
            },
            altStrokeChanged: function(input) {
                this.altStyle.stroke = input.value;
                this.ser.altStyle.stroke = input.value;
                this.optionChanged();
            },
            fillChanged: function(input) {
                this.style.fill = input.value;
                this.ser.style.fill = input.value;
                this.optionChanged();
            },
            altFillChanged: function(input) {
                this.altStyle.fill = input.value;
                this.ser.altStyle.fill = input.value;
                this.optionChanged();
            },
            optionChanged: function() {
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            linesChanged: function(input) {
                if (input.value < input.min || (input.max && input.value > input.max)) {
                    return;
                }
                this.options.lineBreak.newLineBreaks = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            setDataSource: function() {
                var symbol = this.selectedSymbol;
                this.data = getData(symbol);
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
