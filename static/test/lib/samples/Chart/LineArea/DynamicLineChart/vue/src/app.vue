<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" header="CPU Utilization" bindingX="x" chartType="Line" :initialized="onChartInitialized">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisX" position="None"></wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisY" title="Utilization(%)" :min=0 :max=100>
            </wj-flex-chart-axis>
            <wj-flex-chart-series binding="y"></wj-flex-chart-series>
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
            data: getData(200)
        },
        methods: {
            onChartInitialized(sender) {
                this.chart = sender;
            },
            $_addPoints() {
                // append new points, remove old points
                let arr = this.chart.collectionView.sourceCollection,
                    pt = arr[arr.length - 1],
                    y = Math.random() * 100;
                //
                arr.push({ x: pt.x + 1, y: y });
                arr.splice(0, 1);
                //
                // update chart
                this.chart.collectionView.refresh();
                //
                // and keep updating
                setTimeout(() => this.$_addPoints(), 1000)
            }
        },
        mounted() {
            this.$_addPoints();
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 250px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>