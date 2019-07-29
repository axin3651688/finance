<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-financial-chart :itemsSource="data" bindingX="date" chartType="Candlestick" :tooltipContent="tooltip" 
                    :rendered="render" :initialized="initializeChart">
                <wj-financial-chart-series binding="high,low,open,close" name="HLOC"></wj-financial-chart-series>
                <wj-financial-chart-series binding="volume" name="Volume" chartType="Column"></wj-financial-chart-series>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                <wj-flex-chart-axis wjProperty="axisX" :axisLine="false" format="MM/dd/yy"></wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" position="Right"></wj-flex-chart-axis>
            </wj-financial-chart>
            <wj-financial-chart id="rsChart" tooltipContent="" :itemsSource="data" bindingX="date" chartType="Area" 
                    :rendered="rsRender" :initialized="initializeRSChart">
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                <wj-flex-chart-axis wjProperty="axisX" :labels="false"></wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" :labels="false" :majorGrid="false"></wj-flex-chart-axis>
                <wj-financial-chart-series binding="close" name="Box Inc"></wj-financial-chart-series>
                <wj-flex-chart-range-selector :seamless="true" :rangeChanged="rangeChanged">
                </wj-flex-chart-range-selector>
            </wj-financial-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.finance';
    import '@grapecity/wijmo.vue2.chart.interaction';
    import { getData, getAnnotations } from './data';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';
    import * as wjAnnotation from '@grapecity/wijmo.chart.annotation';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                tooltip: '<b>{date:MMM dd}</b><br/>' +
                    '<table>' +
                    '<tr><td>high</td><td>{high:c}</td><tr/>' +
                    '<tr><td>low</td><td>{low:c}</td><tr/>' +
                    '<tr><td>open</td><td>{open:c}</td><tr/>' +
                    '<tr><td>close</td><td>{close:c}</td><tr/>' +
                    '<tr><td>volume</td><td>{volume:c}</td><tr/>' +
                    '</table>'
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                this.al = new wjAnnotation.AnnotationLayer(flex, getAnnotations());
            },
            initializeRSChart: function(flex) {
                this.rsChart = flex;
            },
            render: function() {
                let volYAxis = this.volYAxis;
                if (!volYAxis) {
                    var volSeries = this.theChart.series[1];
                    volYAxis = new wjChart.Axis(0);
                    volSeries.axisY = volYAxis;
                    if (volSeries.getValues(0)) {
                        volYAxis.max = Math.max.apply(null, volSeries.getValues(0)) * 8;
                    }
                }
            },
            rsRender: function() {
                let chart = this.rsChart;
                let rs = this.selector;
                // set range
                if (rs) {
                    var range = this.findRange(chart.axisX.actualMin, chart.axisX.actualMax);
                    rs.min = range.min;
                    rs.max = range.max;
                }
            },
            rangeChanged: function(rs) {
                if(!this.selector) {
                    this.selector = rs;
                }
                let chart = this.theChart;
                // update main chart's x & y range
                chart.axisX.min = rs.min;
                chart.axisX.max = rs.max;
                let yRange = this.findYRange(this.data, rs.min, rs.max);
                chart.axisY.min = yRange.min;
                chart.axisY.max = yRange.max;
                chart.invalidate();
            },
            // helper method to calculate (upper) percentage of total range
            // the default will show the top 20% of the available range
            findRange: function(min, max, percent) {
                var pctToShow = wjCore.isNumber(percent) && 0 < percent && percent < 1 ? percent : 0.2,
                    range = {
                        min: NaN,
                        max: NaN
                    };

                if (wjCore.isDate(min) && wjCore.isDate(max)) {
                    range.max = max.valueOf();
                    range.min = (max.valueOf() - min.valueOf()) * (1 - pctToShow) + min.valueOf();
                } else if (wjCore.isNumber(min) && wjCore.isNumber(max)) {
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

                    let v = item.date.valueOf();
                    if (xmin > v || v > xmax) {
                        continue;
                    }

                    if (ymax === null || item.close > ymax) {
                        ymax = item.close;
                    }
                    if (ymin === null || item.close < ymin) {
                        ymin = item.close;
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
