<template>
    <div class="container-fluid">
        <wj-flex-chart chartType="Scatter" :tooltipContent="customTooltip">
            <wj-flex-chart-axis wjProperty="axisY" :labels="false" :min=6 :max=9 :axisLine=true
                :majorGrid=false :origin=400000 :majorUnit=1.5>
            </wj-flex-chart-axis>
            <wj-flex-chart-axis wjProperty="axisX" :labels=false :min=0 :max=800000 :axisLine=true
                :majorUnit=200000 :origin=7.5>
            </wj-flex-chart-axis>
            <wj-flex-chart-legend position="None">
            </wj-flex-chart-legend>
            <wj-flex-chart-data-label :connectingLine=true :offset=10 :content="customDataLabel">
            </wj-flex-chart-data-label>
            <wj-flex-chart-series name="data" :itemsSource="data" bindingX="gross" binding="rating">
            </wj-flex-chart-series>
            <wj-flex-chart-annotation-layer>
                <wj-flex-chart-annotation-text attachment="DataCoordinate" text="Lower Grossing, Higher Rating"
                    :position=2 :point=" {x: 200000, y: 9 }"></wj-flex-chart-annotation-text>
                <wj-flex-chart-annotation-text attachment="DataCoordinate" text="Higher Grossing, Higher Rating"
                    :position=2 :point="{ x: 600000, y: 9 }"></wj-flex-chart-annotation-text>
                <wj-flex-chart-annotation-text attachment="DataCoordinate" text="Lower Grossing, Lower Rating"
                    :point="{ x: 200000, y: 6 }"></wj-flex-chart-annotation-text>
                <wj-flex-chart-annotation-text attachment="DataCoordinate" text="Higher Grossing, Lower Rating"
                    :point="{ x: 600000, y: 6 }"></wj-flex-chart-annotation-text>
            </wj-flex-chart-annotation-layer>
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
        },
        methods: {
            customTooltip(ht) {
                let item = ht.item;
                return `<b>Movie:</b> ${item.movie} </br><b>Grossing:</b> ${item.gross}</br><b>rating:</b> ${item.rating}`;
            },
            customDataLabel(ht) {
                return ht.item.movie;
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 600px;
        width: 600px;
        margin: 10px 0;
    }

    body {
        margin-bottom: 24pt;
    }
</style>