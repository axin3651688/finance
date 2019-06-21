<template>
    <div class="container-fluid">
        <div id="options">
            <wj-menu :itemsSource="menuItems" :header="'Aggregate: <b>' + groupAggregate + '</b>'" displayMemberPath="header"
                selectedValuePath="value" :selectedValue="groupAggregate" :itemClicked="onMenuItemClick">
            </wj-menu>
        </div>

        <wj-flex-chart :itemsSource="data" bindingX="date" chartType="LineSymbols"
            plotMargin="NaN 60 NaN 60" :tooltipContent="getTooltipContent" 
            :palette="palette" :initialized="onChartInitialized">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
        </wj-flex-chart>

        <wj-flex-chart class="chart-selector" :itemsSource="data" bindingX="date" chartType="Area"
            tooltipContent="" :palette="palette">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisX" position="None"></wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisY" position="None"></wj-flex-chart-axis>
            <wj-flex-chart-series binding="close"></wj-flex-chart-series>
            <wj-flex-chart-range-selector :seamless=true :rangeChanged="rangeChanged">
            </wj-flex-chart-range-selector>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import * as chart from '@grapecity/wijmo.chart';
    import * as interaction from '@grapecity/wijmo.chart.interaction';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.interaction';
    import { AggregateSeries } from './aggregate-series';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            palette: ['rgba(55,90,127,1)', 'rgba(0,188,140,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(231,76,60,1)', 'rgba(143,97,179,1)', 'rgba(176,135,37,1)', 'rgba(74,73,73,1)', 'rgba(0,0,0,1)'],
            groupAggregate: 'Sum',
            tooltipContent: '',
            menuItems: [
                { value: 'None', header: 'None' },
                { value: 'Sum', header: 'Sum' },
                { value: 'Cnt', header: 'Count' },
                { value: 'Avg', header: 'Average' },
                { value: 'Max', header: 'Max' },
                { value: 'Min', header: 'Min' },
                { value: 'Rng', header: 'Range' },
                { value: 'Std', header: 'Std' },
                { value: 'StdPop', header: 'StdPop' },
                { value: 'Var', header: 'Var' },
                { value: 'VarPop', header: 'VarPop' }
            ]
        },
        methods: {
            onMenuItemClick(sender) {
                this.groupAggregate = sender.selectedValue;
                this.series.groupAggregate = this.groupAggregate;
            },
            onChartInitialized(sender) {
                this.chart = sender;
            },
            getTooltipContent(ht) {
                return (ht && ht.x && ht.y)
                    ? `<b>Date:</b> ${wijmo.Globalize.formatDate(ht.x, 'MM-dd-yyyy')}<br><b>Value:</b> ${ht.y.toFixed(2)}`
                    : '';
            },
            rangeChanged(sender) {
                this.chart.axisX.min = sender.min;
                this.chart.axisX.max = sender.max;
            }
        },
        mounted() {
            this.series = new AggregateSeries();
            this.chart.beginUpdate();
            this.series.itemsSource = this.data;
            this.series.chartType = chart.ChartType.LineSymbols;
            this.series.binding = 'close';
            this.series.bindingX = 'date';
            this.series.groupAggregate = this.groupAggregate;
            this.series.autoGroupIntervals = ['DD', 'WW', 'MM', 'YYYY'];
            this.series.autoInterval = true;
            this.chart.series.push(this.series);
            this.chart.endUpdate();
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 300px;
    }

    .container-fluid .wj-flexchart {
        margin: 10px 0;
    }

    .container-fluid .wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-minhandle,
    .container-fluid .wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-maxhandle {
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

    .container-fluid .wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-minhandle:after,
    .container-fluid .wj-flexchart .wj-chart-rangeselector-container .wj-chart-hrangeslider .wj-rangeslider-maxhandle:after {
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

    .container-fluid .chart-selector {
        height: 60px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>