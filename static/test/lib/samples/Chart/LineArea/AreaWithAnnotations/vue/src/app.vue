<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" bindingX="date" chartType="SplineArea"
            :palette="['rgba(0,95,173,1)', 'rgba(240,100,0,1)', 'rgba(0,147,48,1)', 'rgba(228,0,177,1)', 'rgba(182,88,0,1)', 'rgba(106,39,156,1)', 'rgba(213,162,17,1)', 'rgba(220,1,39,1)', 'rgba(0,0,0,1)']">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-axis wjProperty="axisY" :min=797></wj-flex-chart-axis>
            <wj-flex-chart-series binding="close" name="Alphabet Inc"></wj-flex-chart-series>

            <wj-flex-chart-annotation-layer>
                <wj-flex-chart-annotation-rectangle attachment="DataIndex" :pointIndex=33 position="Top"
                    tooltip="Something <b>negative</b><br/>happened today..." content="N" :width=20 :height=20
                    :style="{ fill: '#01DFD7', stroke: '#000000' }">
                </wj-flex-chart-annotation-rectangle>

                <wj-flex-chart-annotation-rectangle attachment="DataIndex" :pointIndex=27 position="Top"
                    tooltip="Something <b>positive</b><br/>happened today..." content="P" :width=20 :height=20
                    :style="{ fill: '#01DFD7', stroke: '#000000' }">
                </wj-flex-chart-annotation-rectangle>

                <wj-flex-chart-annotation-image href="https://maps.google.com/mapfiles/marker_green.png" :width=15
                    :point="{ x: new Date(2017, 1, 7), y: 800 }" :height=30 attachment="DataCoordinate" tooltip="Time to buy!">
                </wj-flex-chart-annotation-image>

                <wj-flex-chart-annotation-image href="https://maps.google.com/mapfiles/marker_yellow.png" :width=15
                    :point="{ x: new Date(2017, 1, 24), y: 800 }" :height=30 attachment="DataCoordinate" tooltip="Turbulence ahead...">
                </wj-flex-chart-annotation-image>

                <wj-flex-chart-annotation-image href="https://maps.google.com/mapfiles/marker_green.png" :width=15
                    :point="{ x: new Date(2017, 2, 5), y: 800 }" :height=30 attachment="DataCoordinate" tooltip="All is fine again...">
                </wj-flex-chart-annotation-image>
            </wj-flex-chart-annotation-layer>

            <wj-flex-chart-animation></wj-flex-chart-animation>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.annotation';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData()
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>