<template>
    <div class="container-fluid">
        <!-- Settings -->
        <div class="panel-group" id="settings">
            <div class="panel panel-default">
                <div id="settingsBody" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <ul class="list-inline">
                            <li>
                                <label>Reversal Amount</label>
                                <wj-input-number :value="options.kagi.reversalAmount" :min="0" :step="1" format="'n0'"
                                    :valueChanged="reversalAmountChanged" :initialized="initlizeInput">
                                </wj-input-number>
                            </li>
                            <li>
                                <wj-menu :header="'Range Mode:<b>' + rangeModeText + '</b>'" :value="options.kagi.rangeMode" displayMemberPath="text" 
                                    :itemsSource="rmData" commandParameterPath="parm" :itemClicked="rmClick">
                                </wj-menu>
                            </li>
                            <li>
                                <wj-menu :header="'Data Fields:<b>' + fieldsText + '</b>'" :value="options.kagi.fields" displayMemberPath="text" 
                                    :itemsSource="fieldsData" commandParameterPath="parm" :itemClicked="fieldsClick">
                                </wj-menu>
                            </li>
                        </ul>
                        <ul class="list-inline">
                            <li>
                                <label>Stroke</label>
                                <wj-input-color :value="style.stroke" :valueChanged="strokeOptionChanged">
                                </wj-input-color>
                            </li>
                            <li>
                                <label>Alt. Stroke</label>
                                <wj-input-color :value="altStyle.stroke" :valueChanged="altStrokeOptionChanged">
                                </wj-input-color>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- FinancialChart -->
        <wj-financial-chart :initialized="initializeChart" :itemsSource="data" bindingX="date" chartType="Kagi" :tooltipContent="tooltip" :options="options">
            <wj-financial-chart-series binding="high,low,open,close" name="Facebook" :style="style" :altStyle="altStyle">
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
    import { getData } from './data';
    import * as core from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                rmData:[{ text: 'Fixed', parm: 'Fixed' }, { text: 'Average True Range', parm: 'ATR' }, { text: 'Percentage', parm: 'Percentage' }],
                fieldsData: [{ text: 'High', parm: 'High' }, { text: 'Low', parm: 'Low' }, { text: 'Open', parm: 'Open' }, { text: 'Close', parm: 'Close' },
                    { text: 'High/Low', parm: 'HighLow' }, { text: 'HL AVG.', parm: 'HL2' }, { text: 'HLC Avg.', parm: 'HLC3' }, { text: 'HLOC Avg.', parm: 'HLOC4' }],
                options: {
                    kagi: {
                        reversalAmount: 1,
                        rangeMode: 'Fixed',
                        fields: 'Close'
                    }
                },
                rangeModeText: 'Fixed',
                fieldsText: 'Close',
                style: {
                    stroke: 'rgb(136, 189, 230)'
                },
                altStyle: {
                    stroke: 'rgb(136, 189, 230)'
                }
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                this.ser = flex.series[0];
            },
            initlizeInput: function(flex) {
                this.inputNumber = flex;
            },
            rmClick: function(menu) {
                if(menu.selectedItem) {
                    let selectedValue = menu.selectedItem.parm;
                    this.rangeModeText = menu.selectedItem.text;
                    this.options.kagi.rangeMode = selectedValue;

                    var reversalInput = this.inputNumber;
                    if (selectedValue === 'Percentage') {
                        reversalInput.format = 'p0';
                        reversalInput.min = 0;
                        reversalInput.max = 1;
                        reversalInput.value = core.clamp(reversalInput.value, 0, .05);
                        reversalInput.step = 0.05;
                    } else if (selectedValue === 'ATR') {
                        reversalInput.format = 'n0';
                        reversalInput.min = 2;
                        reversalInput.max = this.data.length - 2;
                        reversalInput.value = core.clamp(reversalInput.value, 14, this.data.length - 2);
                        reversalInput.step = 1;
                    } else {
                        reversalInput.format = 'n0';
                        reversalInput.min = 1;
                        reversalInput.max = null;
                        reversalInput.value = 1;
                        reversalInput.step = 1;
                    }
                }
                this.optionChanged();
            },
            fieldsClick: function(menu) {
                if(menu.selectedItem) {
                    this.fieldsText = menu.selectedItem.text;
                    this.options.kagi.fields = menu.selectedItem.parm;
                }
                this.optionChanged();
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
            strokeOptionChanged: function(input) {
                this.style.stroke = input.value;
                this.ser.style.stroke = input.value;
                this.optionChanged();
            },
            altStrokeOptionChanged: function(input) {
                this.altStyle.stroke = input.value;
                this.optionChanged();
            },
            optionChanged: function() {
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            reversalAmountChanged: function(input) {
                if (input.value < input.min || (input.max && input.value > input.max)) {
                    return;
                }
                this.options.kagi.reversalAmount = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
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
