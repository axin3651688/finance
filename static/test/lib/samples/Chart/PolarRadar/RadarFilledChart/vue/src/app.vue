<template>
    <div class="container-fluid">
        <wj-flex-radar :itemsSource="data" bindingX="country" chartType="Area" :palette="palette">
            <wj-flex-radar-axis wjProperty="axisY" :min="0" :max="100"></wj-flex-radar-axis>
            <wj-flex-radar-series binding="sales" name="Sales"></wj-flex-radar-series>
            <wj-flex-radar-series binding="downloads" name="Downloads"></wj-flex-radar-series>
            <wj-flex-chart-animation easing="Linear" animationMode="Series" :duration="1000"></wj-flex-chart-animation>
        </wj-flex-radar>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.radar';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData } from './data';
    import * as wjChart from '@grapecity/wijmo.chart';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: wjChart.Palettes.cocoa
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
</style>
