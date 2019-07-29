<template>
    <div class="container-fluid">
        <wj-flex-chart chartType="Scatter" :palette="palette">
            <wj-flex-chart-axis wjProperty="axisY" title="weight(kg)" :min=40 :max=120 :axisLine=true :majorGrid=false :majorUnit=10>
            </wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisX" title="height(cm)" :min=140 :max=200 :majorUnit=10 :axisLine=true>
            </wj-flex-chart-axis>
            <wj-flex-chart-series name="Male" :itemsSource="data[0]" bindingX="height" binding="weight">
            </wj-flex-chart-series>
            <wj-flex-chart-series name="Female" :itemsSource="data[1]" bindingX="height" binding="weight">
            </wj-flex-chart-series>
            <wj-flex-chart-annotation-layer>
                <wj-flex-chart-annotation-polygon attachment="DataCoordinate" :style="{ 'fill': 'red', 'opacity': 0.1 }" :initialized="initializedRedPolygon">
                    <!-- 
                    <wj-flex-chart-data-point wjProperty="points" :x=147 :y=105></wj-flex-chart-data-point>
                    <wj-flex-chart-data-point wjProperty="points" :x=183 :y=105></wj-flex-chart-data-point>
                    <wj-flex-chart-data-point wjProperty="points" :x=183 :y=42></wj-flex-chart-data-point>
                    <wj-flex-chart-data-point wjProperty="points" :x=147 :y=42></wj-flex-chart-data-point>
                     -->
                </wj-flex-chart-annotation-polygon>
                <wj-flex-chart-annotation-polygon attachment="DataCoordinate" :style="{ 'fill': 'green', 'opacity': 0.1 }" :initialized="initializedGreenPolygon">
                    <!--
                    <wj-flex-chart-data-point wjProperty="points" :x=157 :y=117></wj-flex-chart-data-point>
                    <wj-flex-chart-data-point wjProperty="points" :x=199 :y=117></wj-flex-chart-data-point>
                    <wj-flex-chart-data-point wjProperty="points" :x=199 :y=54></wj-flex-chart-data-point>
                    <wj-flex-chart-data-point wjProperty="points" :x=157 :y=54></wj-flex-chart-data-point>
                    -->
                </wj-flex-chart-annotation-polygon>
            </wj-flex-chart-annotation-layer>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.annotation';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            palette: chart.Palettes.light
        },
        methods: {
            initializedRedPolygon(sender) {
                sender.points.push(new chart.DataPoint(147, 105));
                sender.points.push(new chart.DataPoint(183, 105));
                sender.points.push(new chart.DataPoint(183, 42));
                sender.points.push(new chart.DataPoint(147, 42));
            },
            initializedGreenPolygon(sender) {
                sender.points.push(new chart.DataPoint(157, 117));
                sender.points.push(new chart.DataPoint(199, 117));
                sender.points.push(new chart.DataPoint(199, 54));
                sender.points.push(new chart.DataPoint(157, 54));
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 500px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>