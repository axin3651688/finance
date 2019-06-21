<template>
    <div class="container-fluid">
        <!-- Symbol -->
        <label>Symbol</label>
        <wj-combo-box :itemsSource="symbols" displayMemberPath="name" selectedValuePath="symbol"
            :selectedValue="selectedSymbol" :selectedIndexChanged="selectedSymbolChanged">
        </wj-combo-box>
        <!-- FinancialChart -->
        <wj-financial-chart :itemsSource="data" bindingX="date" chartType="HeikinAshi" :tooltipContent="tooltip" :palette="palette" :initialized="initializeChart">
            <wj-financial-chart-series binding="high,low,open,close" :name="selectedSymbol">
            </wj-financial-chart-series>
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
        </wj-financial-chart>

        <!-- Range Selector -->
        <wj-financial-chart :itemsSource="data" bindingX="date" chartType="HeikinAshi" style="height: 200px"
                    tooltipContent="" :rendered="selectorChartRendered" :initialized="initializeSChart">
            <wj-flex-chart-axis wjProperty="axisY" :labels="false"></wj-flex-chart-axis>
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-financial-chart-series binding="high,low,open,close"></wj-financial-chart-series>
            <wj-flex-chart-range-selector :seamless="true" :rangeChanged="rangeChanged">
            </wj-flex-chart-range-selector>
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
    import '@grapecity/wijmo.vue2.chart.interaction';
    import '@grapecity/wijmo.vue2.chart.finance';
    import { getData, getSymbols } from './data';
    import * as core from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData('box'),
                symbols: getSymbols(),
                selectedSymbol: 'box',
                palette: this.getRandomPalette()
            }
        },
        mounted: function() {
            this.setDataSource();
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
            },
            initializeSChart: function(flex) {
                this.selectorChart = flex;
            },
            selectedSymbolChanged: function(combo) {
                this.selectedSymbol = combo.selectedValue;
                this.setDataSource();
            },
            selectorChartRendered: function() {
                let rs = this.selector,
                    rsChart = this.selectorChart;
                // set range
                if (rs) {
                    var range = this.findRange(rsChart.axisX.actualMin, rsChart.axisX.actualMax);
                    rs.min = range.min;
                    rs.max = range.max;
                }
            },
            tooltip: function(ht) {
                var date = ht.item && ht.item.date ? ht.item.date : null,
                    content = '';

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
            rangeChanged: function(selector) {
                if(!this.selector) {
                    this.selector = selector;
                }
                // find visible y-range
                let rs = selector,
                    theChart = this.theChart;
                let yRange = this.findYRange(this.data, rs.min, rs.max);
                // update main chart's x & y range
                theChart.axisX.min = rs.min;
                theChart.axisX.max = rs.max;
                theChart.axisY.min = yRange.min;
                theChart.axisY.max = yRange.max;

                theChart.invalidate();
            },
            setDataSource: function() {
                var symbol = this.selectedSymbol;
                this.data = getData(symbol);
            },
            getRandomPalette: function() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            },
            //
            // helper method to calculate (upper) percentage of total range
            // the default will show the top 20% of the available range
            findRange: function(min, max, percent) {
                var pctToShow = core.isNumber(percent) && 0 < percent && percent < 1 ? percent : 0.2,
                    range = {
                        min: NaN,
                        max: NaN
                    };
            
                if (core.isDate(min) && core.isDate(max)) {
                    range.max = max.valueOf();
                    range.min = (max.valueOf() - min.valueOf()) * (1 - pctToShow) + min.valueOf();
                } else if (core.isNumber(min) && core.isNumber(max)) {
                    range.max = max;
                    range.min = (max - min) * (1 - pctToShow) + min;
                }
            
                return range;
            },
            // assumes High, Low, Open, Close, and Volume data
            // also assumes category axis
            findYRange: function(data, xmin, xmax) {
                var item, i, ymin = null, ymax = null;
            
                for (i = 0; i < data.length; i++) {
                    item = data[i];
            
                    if (xmin > i || i > xmax) {
                        continue;
                    }
            
                    if (ymax === null || item.high > ymax) {
                        ymax = item.high;
                    }
                    if (ymin === null || item.low < ymin) {
                        ymin = item.low;
                    }
                }
            
                return {
                    min: ymin,
                    max: ymax
                };
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

    #rsChart {
        height: 150px;
    }
</style>
