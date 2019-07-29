<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart :itemsSource="data" bindingX="date" chartType="Line" :legendToggle="true" :tooltipContent="tooltip"
                    plotMargin="NaN 60 NaN 60" :itemFormatter="chartItemFormatter" :palette="palette" :initialized="initializeChart">
                <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
                <wj-flex-chart-series binding="high" name="High"></wj-flex-chart-series>
                <wj-flex-chart-series binding="low" name="Low"></wj-flex-chart-series>
            </wj-flex-chart>
            <wj-flex-chart class="chart-selector" :itemsSource="data" bindingX="date" chartType="Area" tooltipContent="" :palette="palette">
                <wj-flex-chart-series binding="close"></wj-flex-chart-series>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                <wj-flex-chart-axis wjProperty="axisX" position="None"></wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" position="None"></wj-flex-chart-axis>
                <wj-flex-chart-range-selector :seamless="true" :rangeChanged="rangeChanged">
                </wj-flex-chart-range-selector>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.interaction';
    import { getData } from './data';
    import { AggregateSeries } from './AggregateSeries';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                aggSeries: null,
                palette: ['rgba(3,62,118,1)', 'rgba(135,192,72,1)', 'rgba(89,130,44,1)', 'rgba(83,179,235,1)', 'rgba(252,101,6,1)', 'rgba(212,35,35,1)', 
                    'rgba(227,187,0,1)', 'rgba(204,204,204,1)', 'rgba(34,34,34,1)']
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                let series = new AggregateSeries();
                let theChart = this.theChart;
                theChart.beginUpdate();
                series.itemsSource = this.data;
                series.chartType = wjChart.ChartType.Column;
                series.binding = 'close';
                series.bindingX = 'date';
                series.name = 'Aggregate Avg';
                series.groupAggregate = wjCore.Aggregate.Avg;
                //series.groupAggregate = core.Aggregate.Avg;
                series.autoGroupIntervals = ["YYYY"];
                series.autoInterval = true;
                theChart.series.push(series);
                this.aggSeries = series;
                theChart.endUpdate();
            },
            tooltip: function(ht) {
                if (!ht) {
                    return '';
                } else if (ht.x && ht.y) {
                    return '<b>Date:</b> ' + wjCore.Globalize.formatDate(ht.x, 'MM-dd-yyyy') + '<br>' +
                        '<b>Value:</b> ' + ht.y.toFixed(2);
                }
            },
            rangeChanged: function(sender) {
                let theChart = this.theChart;
                theChart.beginUpdate();
                theChart.axisX.min = sender.min;
                theChart.axisX.max = sender.max;
                if(this.aggSeries.autoGroupIntervals.length === 1) {
                    this.aggSeries.autoGroupIntervals = ['WW', 'MM', 'YYYY'];
                }
                theChart.endUpdate();
            },
            chartItemFormatter: function(engine, hitTestInfo, defaultFormat) {
                let ht = hitTestInfo;
        
                if(ht.series instanceof AggregateSeries && ht.chartElement == wjChart.ChartElement.SeriesSymbol) {
                    let s = ht.series,
                        len = s.getValues(0).length,
                        vLen = s._values.length,
                        c = ht.chart,
                        ax = c.axisX,
                        dx = c._dataInfo.dx * vLen / len,
                        pt = ht.point,
                        y = c.axisY.convert(c.axisY.actualMin),
                        x = Math.abs(ax.convert(dx) - ax.convert(0));
                
                    engine.drawRect(pt.x - x / 2, pt.y, x, y - pt.y, null, s.symbolStyle/* ,'plotRect'*/);
                } else {
                    // render element as usual
                    defaultFormat();
                }
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
  .wj-flexchart {
    height: 300px;
    margin: 10px 0;
  }
  
  .wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-minhandle,
  .wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-maxhandle {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid hsla(0, 0%, 50.2%, 0.75);
    top: 0;
    bottom: 0;
    margin: auto;
    color: hsl(0, 0%, 50.2%);
    background: #d3d3d3;
    opacity: 1;
  }
  
  .wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-minhandle:after,
  .wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-maxhandle:after {
    content: "‖";
    text-align: center;
    width: 100%;
    display: inline-block;
    position: absolute;
    margin: 0;
    top: 50%;
    transform: translateY(-55%);
    opacity: 0.75;
  }
  .chart-selector.wj-flexchart {
    height: 60px;
  }
  
  body {
    margin-bottom: 24pt;
  }
  
</style>
