<template>
    <div class="container-fluid">
        <wj-flex-chart chartType="Bubble" bindingX="sales" :itemsSource="data" :tooltipContent="customTooltip">
            <wj-flex-chart-axis wjProperty="axisY" title="Expenses" :min=0></wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisX" title="Sales" :min=0 :axisLine=true></wj-flex-chart-axis>
            <wj-flex-chart-legend position="None">
            </wj-flex-chart-legend>
            <wj-flex-chart-series binding="expenses,downloads">
            </wj-flex-chart-series>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData()
        },
        methods: {
            customTooltip(ht) {
                let item = ht.item;
                //
                return `<b>${item.country}</b>:<table class="chart-tip">` +
                        `<tr><td>Sales</td><td>${wijmo.Globalize.format(item.sales, 'c0')}</td></tr>` +
                        `<tr><td>Expenses</td><td>${wijmo.Globalize.format(item.expenses, 'c0')}</td></tr>` +
                        `<tr><td>Downloads</td><td>${wijmo.Globalize.format(item.downloads, 'n0')}</td></tr>` +
                        `</table>`;
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 300px;
    }

    .container-fluid .chart-tip td {
        text-align: right;
    }

    .container-fluid .chart-tip td:first-child {
        font-weight: bold;
        padding-right: 12px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>