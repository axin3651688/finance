<template>
    <div class="container-fluid">
        <div class="form-group">
            <!-- chart1 -->
            <wj-flex-chart style="height:150px;" plotMargin="NaN 30 2 110" :itemsSource="data" :palette="palette"
                    chartType="Line" tooltipContent="" :initialized="initChart1">
                <wj-flex-chart-axis wjProperty="axisX"  position="Top" format="MMM-dd" :labelAngle="90">
                </wj-flex-chart-axis>
                <wj-flex-chart-series bindingX="Date" binding="MeanTemp" name="MeanTemp">
                </wj-flex-chart-series>
                <wj-flex-chart-series bindingX="Date" binding="MinTemp" name="MinTemp">
                </wj-flex-chart-series>
                <wj-flex-chart-series bindingX="Date" binding="MaxTemp" name="MaxTemp">
                </wj-flex-chart-series>
                <wj-flex-chart-legend position="Left"></wj-flex-chart-legend>
            </wj-flex-chart>
            <!-- chart2 -->
            <wj-flex-chart id="chart2" style="height:120px;" plotMargin="0 30 0 110" :itemsSource="data" 
                    chartType="Area" tooltipContent="" :initialized="initChart2">
                <wj-flex-chart-axis wjProperty="axisX" :labels="false" :axisLine="false" format="MMM-dd" :labelAngle="90">
                </wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" title="MeanPressure">
                </wj-flex-chart-axis>
                <wj-flex-chart-series bindingX="Date" binding="MeanPressure" name="MeanPressure">
                </wj-flex-chart-series>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            </wj-flex-chart>
            <!-- chart3 -->
            <wj-flex-chart id="chart3" style="height:120px;" plotMargin="0 30 NaN 110" :itemsSource="data"
                    chartType="Column" tooltipContent="" :initialized="initChart3">
                <wj-flex-chart-axis wjProperty="axisX" :labels="false" :axisLine="false" format="MMM-dd" :labelAngle="90">
                </wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" title="Precipitation">
                </wj-flex-chart-axis>
                <wj-flex-chart-series bindingX="Date" binding="Precipitation" name="Precipitation">
                </wj-flex-chart-series>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            </wj-flex-chart>
            <!-- range selector chart -->
            <wj-flex-chart style="height:100px;" plotMargin="0 30 NaN 110" :itemsSource="data"
                    tooltipContent="" chartType="Line">
                <wj-flex-chart-axis wjProperty="axisX" format="MMM-dd" :labelAngle="45">
                </wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" :labels="false" :majorGrid="false">
                </wj-flex-chart-axis>
                <wj-flex-chart-series bindingX="Date" binding="MeanTemp" name="MeanTemp">
                </wj-flex-chart-series>
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
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
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                isViewInitialized: false,
                pt: new wjCore.Point(),
                palette: [ '#88bde6', 'blue', 'red' ],
                props: ['MeanPressure', 'Precipitation']
            }
        },
        mounted: function() {
            this.isViewInitialized = true;
                
            [this.chart1, this.chart2, this.chart3].forEach(chart => {
                if (chart) {
                    chart.rendered.addHandler(() => {
                        var ele = chart.hostElement.querySelector('.wj-chart-linemarker');
                        if (ele) {
                            ele.style.display = 'none';
                        }
                    });
                }
            });
        },
        methods: {
            initChart1: function(flex) {
                this.chart1 = flex;
                this.createMarker(flex);
                
            },
            initChart2: function(flex) {
                this.chart2 = flex;
                this.createMarker(flex);
            },
            initChart3: function(flex) {
                this.chart3 = flex;
                this.createMarker(flex);
            },
            createMarker: function(chart) {
                let marker = new wjChart.LineMarker(chart, {
                    lines: 'Both',
                    interaction: 'Move',
                    content: () => {
                        return this.getMarkercontent(new wjCore.Point(this.pt.x, NaN));
                    }
                });
                marker.positionChanged.addHandler((marker, point) => {
                    this.pt = point;
                    this.changeMarker(chart, marker);
                });
            },
            rangeChanged: function(flex) {
                this.update(flex.min, flex.max);
            },
            update(min, max) {
                [this.chart1, this.chart2, this.chart3].forEach(function (chart) {
                    chart.axisX.min = min;
                    chart.axisX.max = max;
                    chart.invalidate();
                });
            },
            changeMarker(curChart, marker) {
                if (!this.isViewInitialized) {
                    return;
                }
                let curHost = curChart.hostElement,
                    vline = curHost.querySelector('.wj-chart-linemarker-vline');
                    
                [this.chart1, this.chart2, this.chart3].forEach(chart => {
                    if (chart) {
                        var ele = chart.hostElement.querySelector('.wj-chart-linemarker');
                        if (chart === curChart) {
                            ele.style.display = 'block';
                        } else {
                            ele.style.display = 'none';
                        }
                    }
                });

                vline.style.height = 326 + 'px';
            },
            getMarkercontent(pt) {
                if (!this.chart1 || !this.chart1.itemsSource) {
                    return;
                }
                var chart = this.chart1,
                    ht = chart.series[0].hitTest(pt),
                    item = chart.itemsSource[ht.pointIndex],
                    content = '',
                    len = this.props.length;

                if (!item) {
                    return;
                }
                for (var i = 0; i < chart.series.length; i++) {
                    var series = chart.series[i];
                    // find series lines to get its color
                    var polyline = series.hostElement.querySelector('polyline');

                    // add series info to the marker content
                    if (ht.x && ht.y !== null) {
                        if (i == 0) {
                            content += wjCore.Globalize.formatDate(ht.x, 'dd-MMM');
                        }
                        content += '<div style="color:' + polyline.getAttribute('stroke') + '">' + series.name + ' = ' + item[series.name].toFixed() + '</div>';
                    }

                }
                for (var i = 0; i < len; i++) {
                    content += '<div>' + this.props[i] + ' = ' + item[this.props[i]].toFixed() + '</div>';
                }
                return content;
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }
    .pane-content {
        background-color: #fff;
        border: 1px solid #ddd;
        border-top: none;
        font-family: Monaco, Menlo, Consolas, 'Courier New', monospace;
        font-size: 13px;
        overflow: auto;
        padding: 0 8px;
        white-space: pre;
        max-height: 350px;
    }

    .pane-content code {
        background-color: #fff;
        color: #000;
        padding: 0;
    }

    /* set default chart style */
    .form-group .wj-flexchart {
        height: 400px;
        background-color: white;
        padding: 8px;
        margin-bottom: 12px;
        display:block;
        overflow:visible;
    }
    .form-group .wj-flexchart .wj-title {
        font-weight: bold;
    }
    .form-group .wj-flexchart .wj-header .wj-title {
        font-size: 18pt;
        fill: #80044d;
    }
    .form-group .wj-flexchart .wj-footer .wj-title {
        fill: #80044d;
    }
    .form-group .wj-flexchart .wj-axis-x .wj-title,
    .form-group .wj-flexchart .wj-axis-y .wj-title {
        font-style: italic;
    }

    /* custom chart theme */
    .form-group .custom-flex-chart {
        height: 400px;
        background-color: white;
        box-shadow: 4px 4px 10px 0px rgba(50, 50, 50, 0.75);
        padding: 8px;
        margin-bottom: 12px;
        display:block;
    }

    .form-group .custom-flex-chart .wj-axis-x .wj-label {
        font-family: Courier New, Courier, monospace;
        font-weight: bold;
    }
    .form-group .custom-flex-chart .wj-legend .wj-label {
        font-family: Courier New, Courier, monospace;
        font-weight: bold;
    }
    .form-group .custom-flex-chart .wj-legend > rect {
        fill: #f8f8f8;
        stroke: #c0c0c0;
    }
    .form-group .custom-flex-chart .wj-plot-area > rect {
        fill: #f8f8f8;
        stroke: #c0c0c0;
    }

    /* some extra spacing between the items */
    .row {
        margin-top: 40px;
        margin-bottom: 25px;
    }

    .form-group .wj-flexchart {
        border: none;
        font-size: 12px;
        font-family: Monaco, Menlo, Consolas, 'Courier New', monospace;
        padding: 0px;
        margin: 0px;
        touch-action:none;
        -ms-touch-action: none;
    }

    .form-group .wj-flexchart .wj-plot-area {
        stroke: lightgray;
        stroke-width: 1px;
            touch-action:none;
    }

    .form-group .wj-flexchart .wj-axis-y .wj-title {
        font-style: normal;
    }

    #chart2 .wj-chart-linemarker-vline {
        margin-top: -99px;
    }

    #chart3 .wj-chart-linemarker-vline {
        margin-top: -220px;
    }
</style>
