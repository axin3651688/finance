<template>
    <div class="container-fluid">
        <!-- Settings -->
        <div class="panel-group" id="settings">
            <div class="panel panel-default">
                <div id="settingsBody" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <ul class="list-inline">
                            <li>
                                <label>Box Size</label>
                                <wj-input-number :initialized="initializeInput" :value="options.renko.boxSize" :min="0" :step="1" format="n0"
                                    :valueChanged="boxSizeChanged">
                                </wj-input-number>
                            </li>
                            <li>
                                <wj-menu :header="'Range Mode:<b>' + rangeModeText + '</b>'" :value="options.renko.rangeMode" displayMemberPath="text" 
                                    :itemsSource="rmData" commandParameterPath="parm" :itemClicked="rangeModeChanged">
                                </wj-menu>
                            </li>
                            <li>
                                <wj-menu :header="'Data Fields:<b>' + fieldsText + '</b>'" :value="options.renko.fields" displayMemberPath="text" 
                                    :itemsSource="fieldsData" commandParameterPath="parm" :itemClicked="fieldsChanged">
                                </wj-menu>
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
        <wj-financial-chart :initialized="initializeChart" :itemsSource="data" bindingX="date" chartType="Renko" :options="options" :tooltipContent="tooltip">
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
                rmData: [{text: 'Fixed', parm: 'Fixed'}, {text: 'Average True Range', parm: 'ATR'}],
                fieldsData: [{ text: 'High', parm: 'High' }, { text: 'Low', parm: 'Low' }, { text: 'Open', parm: 'Open' }, { text: 'Close', parm: 'Close' },
                    { text: 'HL AVG.', parm: 'HL2' }, { text: 'HLC Avg.', parm: 'HLC3' }, { text: 'HLOC Avg.', parm: 'HLOC4' }],
                rangeModeText: 'Fixed',
                fieldsText: 'Close',
                options: {
                    renko: {
                        boxSize: 2,
                        rangeMode: 'Fixed',
                        fields: 'Close'
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
            initializeInput: function(input) {
                this.inputNumber = input;
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
            boxSizeChanged: function(input) {
                if (input.value < input.min || (input.max && input.value > input.max)) {
                    return;
                }
                this.options.renko.boxSize = input.value;
                if (this.theChart) {
                    this.theChart.invalidate();
                }
            },
            rangeModeChanged: function(menu) {
                var input = this.inputNumber;
                let rangeModeText = menu.selectedItem.text;
                let selectedValue = menu.selectedItem.parm;
                this.rangeModeText = rangeModeText;
                this.options.renko.rangeMode = selectedValue;
                if (selectedValue === 'ATR') {
                    input.format = 'n0';
                    input.min = 2;
                    input.max = this.data.length - 2;
                    input.value = core.clamp(input.value, 14, this.data.length - 2);
                    input.step = 1;
                } else {
                    input.format = 'n0';
                    input.min = 1;
                    input.max = null;
                    input.step = 1;
                }
                this.optionChanged();
            },
            fieldsChanged: function(menu) {
                let fieldsText = menu.selectedItem.text;
                let selectedValue = menu.selectedItem.parm;
                this.fieldsText = fieldsText;
                this.options.renko.fields = selectedValue;
                this.optionChanged();
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
