<template>
    <div class="container-fluid">
        <wj-financial-chart :initialized="initChart" :itemsSource="data" bindingX="date" chartType="ColumnVolume" :tooltipContent="tooltip">
            <wj-financial-chart-series binding="close,volume" name="Column Volume" chartType="ColumnVolume"></wj-financial-chart-series>
            <wj-financial-chart-series binding="high,low,open,close,volume" name="Equi Volume" chartType="EquiVolume">
                <wj-flex-chart-axis wjProperty="axisY" position="Left"></wj-flex-chart-axis>
            </wj-financial-chart-series>
            <wj-financial-chart-series binding="high,low,open,close,volume" name="Candle Volume" chartType="CandleVolume">
                <wj-flex-chart-axis wjProperty="axisY" position="Left"></wj-flex-chart-axis>
            </wj-financial-chart-series>
            <wj-financial-chart-series binding="high,low,open,close,volume" name="Arms CandleVolume" chartType="ArmsCandleVolume">
                <wj-flex-chart-axis wjProperty="axisY" position="Left"></wj-flex-chart-axis>
            </wj-financial-chart-series>
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-plot-area :row="0" :height="100"></wj-flex-chart-plot-area>
            <wj-flex-chart-plot-area :row="1" :height="100"></wj-flex-chart-plot-area>
            <wj-flex-chart-plot-area :row="2" :height="100"></wj-flex-chart-plot-area>
            <wj-flex-chart-plot-area :row="3" :height="100"></wj-flex-chart-plot-area>
        </wj-financial-chart>
        <wj-financial-chart :initialized="initRSChart" id="rsChart" :itemsSource="data" bindingX="date" 
                chartType="ColumnVolume" tooltipContent="" :rendered="rsRendered">
            <wj-financial-chart-series binding="close,volume" name="Box Inc" chartType="ColumnVolume"></wj-financial-chart-series>
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisX" :labels="false"></wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisY" :labels="false" :majorGrid="false"></wj-flex-chart-axis>
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
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.interaction';
    import '@grapecity/wijmo.vue2.chart.finance';
    import { getData } from './data';
    import * as core from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData() 
            }
        },
        methods: {
            initChart: function(flex) {
                this.theChart = flex;
                let ser = flex.series[1];
                this.axisY1 = ser.axisY;
                this.axisY1.plotArea = flex.plotAreas[1];
                ser = flex.series[2];
                this.axisY2 = ser.axisY;
                this.axisY2.plotArea = flex.plotAreas[2];
                ser = flex.series[3];
                this.axisY3 = ser.axisY;
                this.axisY3.plotArea = flex.plotAreas[3];
            },
            initRSChart: function(flex) {
                this.rsChart = flex;
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
            rsRendered: function() {
                let rsChart = this.rsChart;
                let rs = this.selector;
                // set range
                if (rs) {
                    var range = this.findRange(rsChart.axisX.actualMin, rsChart.axisX.actualMax);
                    rs.min = range.min;
                    rs.max = range.max;
                }
            },
            rangeChanged: function(rs) {
                if(this.selector) {
                    this.selector = rs;
                }
                let theChart = this.theChart;
                // find visible y-range
                var yRange = this.findYRange(this.data, rs.min, rs.max);
                // update main chart's x & y range
                theChart.axisX.min = rs.min;
                theChart.axisX.max = rs.max;
                [theChart.axisY, this.axisY1, this.axisY2, this.axisY3].forEach(axis => {
                    axis.min = yRange.min;
                    axis.max = yRange.max;
                });

                theChart.invalidate();
            },
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
                //
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
        height: 100px;
    }
</style>
