<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" header="Device Temperature Monitor" chartType="Line" bindingX="x" :rendering="chartRendering">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-series binding="y" name="Temperature"></wj-flex-chart-series>
            <wj-flex-chart-axis wjProperty="axisY" :min="0" :max="100" :majorGrid="false" title="Temperature(°C)"></wj-flex-chart-axis>
        </wj-flex-chart>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData() 
            }
        },
        mounted: function () {
            setInterval(()=>{
                this.data = getData();
            }, 1000);
        },
        methods: {
            chartRendering: function(s, e) {
                var xMin = s.axisX.actualMin.valueOf(),
                    xMax = s.axisX.actualMax.valueOf(),
                    yMin = s.axisY.actualMin,
                    yMax = s.axisY.actualMax;
                if(isNaN(xMin) && isNaN(xMax)) {
                    return;
                }
                this.drawAlarmZone(s, e.engine, xMin, 80, xMax, yMax, 'alarm-zone');
                this.drawAlarmZone(s, e.engine, xMin, 50, xMax, 80, 'warning-zone');
                this.drawAlarmZone(s, e.engine, xMin, yMin, xMax, 50, 'safe-zone');
            },
            drawAlarmZone: function(chart, engine, xMin, yMin, xMax, yMax, className) {
                var pt1 = chart.dataToPoint(xMin, yMin);
                var pt2 = chart.dataToPoint(xMax, yMax);
                engine.drawRect(
                    Math.min(pt1.x, pt2.x), Math.min(pt1.y, pt2.y), 
                    Math.abs(pt2.x - pt1.x), Math.abs(pt2.y - pt1.y),
                    className);
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
    
    .alarm-zone {
        fill: red;
        opacity: .15;
        stroke-width: 0;
    }

    .warning-zone {
        fill: orange;
        opacity: .15;
        stroke-width: 0;
    }

    .safe-zone {
        fill: green;
        opacity: .15;
        stroke-width: 0;
    }
</style>
