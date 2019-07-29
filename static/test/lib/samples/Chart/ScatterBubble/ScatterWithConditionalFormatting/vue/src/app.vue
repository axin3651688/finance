<template>
    <div class="container-fluid">
        <wj-flex-chart chartType="Scatter" :itemFormatter="customFormatter">
            <wj-flex-chart-axis wjProperty="axisY" :axisLine=true>
            </wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisX" :axisLine=true>
            </wj-flex-chart-axis>
            <wj-flex-chart-series name="Series" :itemsSource="data" bindingX="x" binding="y">
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
            data: getData(120, -100, 24)
        },
        methods: {
            customFormatter(engine, ht, defaultRenderer) {
                if (ht.x < 0) {
                    engine.stroke = 'red';
                    engine.fill = 'rgba(255,0,0,0.7)';
                }
                defaultRenderer();
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