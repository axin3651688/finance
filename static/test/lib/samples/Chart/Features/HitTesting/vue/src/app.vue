<template>
    <div class="container-fluid">
        <div class="form-group">
            <wj-flex-chart tooltipContent="" :itemsSource="data" bindingX="country" chartType="LineSymbols"
                    header="Header" footer="Footer" :palette="palette" :initialized="chartInitialized">
                <wj-flex-chart-data-label content="{value:n0}" position="Top" :offset="5"></wj-flex-chart-data-label>
                <wj-flex-chart-series binding="sales" name="Sales"></wj-flex-chart-series>
                <wj-flex-chart-series binding="expenses" name="Expenses"></wj-flex-chart-series>
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
    import { getData } from './data';
    import * as wjCore from '@grapecity/wijmo';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: this.getRandomPalette()
            }
        },
        methods: {
            chartInitialized: function(flex) {
                this.theChart = flex;
                // use tooltip to show hit-test information
                let tt = new wjCore.Tooltip(),
                tip = '';
                //
                this.theChart.hostElement.addEventListener('mousemove', e => {
                    // build tooltip text
                    let ht = this.theChart.hitTest(e),
                        elem = ht.chartElement,
                        series = (ht.series && [1, 2, 3].indexOf(elem) < 0) ? ht.series : null,
                        index = (ht.pointIndex != null && series) ? ht.pointIndex : null,
                        newTip = wjCore.format('chartElement: <b>{elem}</b><br/>series: <b>{series}</b><br/>pointIndex: <b>{index}</b>', {
                            elem: wjChart.ChartElement[elem],
                            series: series ? series.name : 'none',
                            index: index != null ? index : 'none'
                        });
                    //
                    // update tooltip
                    if (newTip != tip) {
                        tip = newTip;
                        tt.show(e.target, tip, new wjCore.Rect(e.clientX, e.clientY, 0, 0));
                    }
                });
                //
                this.theChart.hostElement.addEventListener('mouseleave', e => {
                    tt.hide();
                    tip = '';
                });
            },
            getRandomPalette() {
                let palettes = Object.getOwnPropertyNames(wjChart.Palettes)
                    .filter(prop => typeof wjChart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return wjChart.Palettes[palettes[rand]];
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container .wj-flexchart {
        height: 300px;
    }

    .container .wj-data-label {
        font-size: 75%;
        opacity: .9;
    }

    .container label {
        width: 150px;
        text-align: right;
    }

    .container .wj-control {
        margin-bottom: 3px;
    }

    body {
        margin-bottom: 24pt;
    }

</style>
