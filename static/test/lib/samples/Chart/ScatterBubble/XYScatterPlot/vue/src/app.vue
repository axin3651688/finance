<template>
    <div class="container-fluid">
        <div class="form-check">
            <label for="axisOrigin">Set Axis Origin to Zero</label>
            <input id="axisOrigin" @click="changeAxisOrigin" type="checkbox">
        </div>

        <wj-flex-chart chartType="Scatter" bindingX="x" :initialized="chartInitialized">
            <wj-flex-chart-axis wjProperty="axisY" :axisLine=true>
            </wj-flex-chart-axis>
            <wj-flex-chart-series name="Experiment 1" :itemsSource="series1" bindingX="x" binding="y">
            </wj-flex-chart-series>
            <wj-flex-chart-series name="Experiment 2" :itemsSource="series2" bindingX="x" binding="y">
            </wj-flex-chart-series>
            <wj-flex-chart-series name="Experiment 3" :itemsSource="series3" bindingX="x" binding="y">
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
            series1: getData(50, 0, 3),
            series2: getData(40, 100, 12),
            series3: getData(30, -100, 24)
        },
        methods: {
            chartInitialized(sender) {
                this.chart = sender;
            },
            changeAxisOrigin(e) {
                let origin = e.target.checked ? 0 : null;
                this.chart.axisX.origin = origin;
                this.chart.axisY.origin = origin;
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 300px;
        margin: 10px 0;
    }

    body {
        margin-bottom: 24pt;
    }
</style>