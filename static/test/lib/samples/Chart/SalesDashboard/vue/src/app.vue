<template>
    <div class="container-fluid">
        <div class="form-group">
            <div class="row">
                <wj-flex-chart header="2018 Annual Sales" bindingX="month" selectionMode="Point" :initialized="initializeChart"
                        :itemsSource="chartData" :selectionChanged="chartSelectionChanged">
                    <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                    <wj-flex-chart-series binding="actual" name="Sales"></wj-flex-chart-series>
                </wj-flex-chart>
            </div>
            <div class="row">
                <div class="col">
                    <wj-flex-pie :header="pieHeader" bindingName="category" binding="actual" :itemsSource="pieData" 
                            :labelContent="pieLabel" :initialized="initializePie">
                        <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                    </wj-flex-pie>
                </div>
                <div class="col">
                    <ul class="bullets">
                        <li v-for="item in bulletsData">
                            <label>{{item.category}}</label>
                            <wj-bullet-graph showText="Value" :target="item.target" :max="item.max" :good="item.good" :bad="item.bad" :value="item.actual">
                            </wj-bullet-graph>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/*
    data: any;
    chartData: any[];
    pieData: any[];
    bulletsData: any[];
    pieHeader: string;
    */
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.gauge';
    import { getSales } from './data';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getSales(),
                chartData: null,
                pieData: null,
                bulletsData: null,
                pieHeader: '2018 Product Sales'
            }
        },
        methods: {
            initializeChart(flex) {
                this.theChart = flex;
                this.chartData = this.data.month;
                this.pieData = this.data.category;
                this.bulletsData = this.data.category;
            },
            initializePie(flex) {
                this.thePie = flex;
            },
            pieLabel(ht) {
                return `${wjCore.Globalize.format(ht.value / (ht.chart._sum || ht.chart._sums[0]), 'p2')}`;
            },
            chartSelectionChanged() {
                var selIndex = this.theChart._selectionIndex;
                let data = this.data;
                //
                if(selIndex == null || selIndex == -1) {
                    this.pieData = data.category;
                    this.pieHeader = '2018 Product Sales';
                    this.bulletsData = data.category;
                } else {
                    let d = data.month[selIndex];
                    this.pieData = d.items;
                    this.pieHeader = d.month + ' Product Sales';
                    this.bulletsData = d.items;
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

    .wj-flexchart {
        border: none;
    }

    .col {
        float:left;
        width: 50%;
    }

    li {
        list-style-type: none;
    }

    .wj-gauge {
        margin: 17px 1em;
    }
</style>
