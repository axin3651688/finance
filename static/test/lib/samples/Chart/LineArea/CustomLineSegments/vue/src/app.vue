<template>
    <div class="container-fluid">
        <wj-flex-chart :itemsSource="data" bindingX="country" :itemFormatter="itemFormatter">
            <wj-flex-chart-series binding="sales" name="Sales"></wj-flex-chart-series>
            <wj-flex-chart-series binding="expenses" name="Expenses"></wj-flex-chart-series>
            <wj-flex-chart-series binding="downloads" name="Downloads" chartType="Line"></wj-flex-chart-series>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjChart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData()
        },
        methods: {
            itemFormatter(engine, ht, defaultFormat) {
                let binding = 'downloads';
                //
                // check that this is the right series/element
                if (ht.series.binding == binding && ht.pointIndex > 0 &&
                    ht.chartElement == wjChart.ChartElement.SeriesSymbol) {
                    //
                    // get current and previous values
                    let chart = ht.series.chart,
                        items = chart.collectionView.items,
                        valNow = items[ht.pointIndex][binding],
                        valPrev = items[ht.pointIndex - 1][binding];
                    //
                    // add line if value is increasing
                    if (valNow > valPrev) {
                        let pt1 = chart.dataToPoint(ht.pointIndex, valNow),
                            pt2 = chart.dataToPoint(ht.pointIndex - 1, valPrev);
                        //
                        engine.drawLine(pt1.x, pt1.y, pt2.x, pt2.y, null, {
                            stroke: 'gold',
                            strokeWidth: 6
                        });
                    }
                }
                //
                // render element as usual
                defaultFormat();
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
        height: 300px;
    }
</style>