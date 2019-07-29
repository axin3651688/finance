<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
            </div>
            <div class="col-md-6 yearpicker">
                <wj-linear-gauge :value="year" :min="yrMin" :max="yrMax" :isReadOnly="false"
                    :isAnimated="false" :thumbSize=30 :valueChanged="onGaugeValueChanged" :initialized="onGaugeInitialized">
                    <wj-range wjProperty="pointer" :thickness=0.08></wj-range>
                    <wj-range wjProperty="face" :thickness=0.08></wj-range>
                </wj-linear-gauge>
                <button class="btn btn-success" @click="toggleAnimation()">
                    <span v-bind:class="{ 'glyphicon-play': !animating, 'glyphicon-stop': animating }" class="glyphicon"></span>
                </button>
            </div>
        </div>

        <wj-flex-chart :itemsSource="data" chartType="Bubble" :itemFormatter="chartItemFormatter"
            :options="{ bubble: { minSize: 5, maxSize: 100 } }" bindingX="yearIncome"
            tooltipContent="<b>{item.name}</b><br/>{yearPopulation:g1,,} million people" selectionMode="Point"
            v-bind:class="[data.currentItem? 'tracking-country' : '', 'wj-control', 'wj-flexchart']" :initialized="onChartInitialized">
            <div class="watermark">
                {{ year }}
            </div>
            <wj-flex-chart-series binding="yearLifeExpectancy,yearPopulation">
            </wj-flex-chart-series>
            <wj-flex-chart-axis wjProperty="axisX" title="income per capita (inflation-adjusted US dollars)"
                :majorGrid=false :axisLine=true :min=300 :max=100000 :logBase=10>
            </wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisY" title="life expectancy (years)" :majorGrid=false
                :axisLine=true :min=20 :max=85 :majorUnit=10>
            </wj-flex-chart-axis>
            <wj-flex-chart-legend position="None">
            </wj-flex-chart-legend>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjcCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.gauge';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        animLength: 15000, // 15s for the full animation
        data: {
            // nation data
            year: 1800,
            yrMin: 1800,
            yrMax: 2009,
            animating: null,
            data: getData()
        },
        methods: {
            chartItemFormatter(engine, hitTestInfo, defaultFormat) {
                if (hitTestInfo.chartElement == wjChart.ChartElement.SeriesSymbol) {
                    let fill = 'black',
                        stroke = 'black';
                    //
                    switch (hitTestInfo.item.region) {
                        case 'Sub-Saharan Africa':
                            fill = '#1F77B4';
                            break;
                        case 'South Asia':
                            fill = '#FF7F0E';
                            break;
                        case 'Middle East & North Africa':
                            fill = '#2CA02C';
                            break;
                        case 'America':
                            fill = '#D62728';
                            break;
                        case 'Europe & Central Asia':
                            fill = '#9467BD';
                            break;
                        case 'East Asia & Pacific':
                            fill = '#8C564B';
                            break;
                    }
                    //
                    engine.fill = fill;
                    engine.stroke = stroke;
                    engine.strokeWidth = 1;
                    //
                    defaultFormat();
                }
            },
            toggleAnimation() {
                if (this.animating) {
                    clearInterval(this.animating);
                    this.animating = null;
                } else {
                    let min = (this.year < this.yrMax - 10) ? this.year : this.yrMin,
                        max = this.yrMax,
                        duration = this.$options.animLength * (max - min) / (this.yrMax - this.yrMin);
                    //
                    this.animating = wjcCore.animate(pct => {
                        this.$_setYear(Math.round(min + (max - min) * pct));
                        if (pct == 1) {
                            this.animating = null;
                        }
                    }, duration);
                }
            },
            stopAnimation() {
                if (this.animating) {
                    clearInterval(this.animating);
                    this.animating = null;
                }
            },
            onChartInitialized(sender) {
                sender.hostElement.addEventListener('mousedown', () => this.stopAnimation());
            },
            onGaugeInitialized(sender) {
                sender.hostElement.addEventListener('mousedown', () => this.stopAnimation());
            },
            onGaugeValueChanged(sender) {
                this.$_setYear(sender.value);
            },
            $_setYear(value) {
                this.year = value;
                this.$_updateData();
            },
            $_updateData() {
                let year = this.year,
                    items = this.data.items;
                //
                items.forEach(item => {
                    item.yearIncome = this.$_interpolate(item.income, year);
                    item.yearLifeExpectancy = this.$_interpolate(item.lifeExpectancy, year);
                    //
                    let pop = this.$_interpolate(item.population, year);
                    if (pop > 1000000) pop = Math.round(pop / 1000000) * 1000000;
                    item.yearPopulation = pop;
                });
                //
                this.data.refresh();
            },
            $_interpolate(arr, year) {
                // binary search
                let min = 0,
                    max = arr.length - 1,
                    cur,
                    item;
                //
                while (min <= max) {
                    cur = (min + max) >>> 1,
                        item = arr[cur];
                    if (item[0] > year) {
                        max = cur - 1;
                    } else if (item[0] < year) {
                        min = cur + 1;
                    } else {
                        return item[1]; // found year, no need to interpolate
                    }
                }
                //
                // before the first/after the last
                if (min == 0) return arr[min][1];
                if (min == arr.length) return arr[max][1];
                //
                // in range: interpolate
                let pct = (year - arr[max][0]) / (arr[min][0] - arr[max][0]);
                return arr[max][1] + pct * (arr[min][1] - arr[max][1]);
            }
        },
        mounted() {
            this.toggleAnimation();
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .yearpicker {
        font-size: 24pt;
        text-align: right;
        margin-bottom: 12pt;
        color: #00916f;
    }

    .container-fluid .wj-lineargauge {
        display: inline-block;
        vertical-align: bottom;
        max-width: 50%;
    }

    .container-fluid .wj-lineargauge .wj-pointer {
        fill: #00916f;
    }

    .container-fluid .wj-flexchart {
        height: 550px;
        border: none;
        position: relative;
    }

    .container-fluid .wj-flexchart .watermark {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 300px;
        color: #00916f;
        opacity: .1;
        pointer-events: none;
    }

    .container-fluid .wj-flexchart g.wj-series-group ellipse {
        opacity: 0.5;
        stroke: none;
    }

    .container-fluid .wj-flexchart.tracking-country g.wj-series-group ellipse {
        opacity: 0.2;
        stroke: none;
    }

    .container-fluid .wj-flexchart g.wj-series-group ellipse.wj-state-selected {
        opacity: 1;
        stroke: #b6ff00;
        stroke-width: 6px;
        stroke-dasharray: none;
    }
</style>