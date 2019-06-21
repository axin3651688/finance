<template>
    <div class="container-fluid">
        <wj-flex-chart header="Country GDP" chartType="Bar" bindingX="year" stacking="Stacked" :itemsSource="data"
            :palette="['rgba(70,107,176,1)', 'rgba(200,180,34,1)', 'rgba(20,136,110,1)', 'rgba(181,72,54,1)', 'rgba(110,89,68,1)', 'rgba(139,56,114,1)', 'rgba(115,178,43,1)', 'rgba(184,115,32,1)', 'rgba(20,20,20,1)']">
            <wj-flex-chart-legend position="Bottom"></wj-flex-chart-legend>
            <wj-flex-chart-series name="US" binding="US"></wj-flex-chart-series>
            <wj-flex-chart-series name="China" binding="China"></wj-flex-chart-series>
            <wj-flex-chart-series name="Japan" binding="Japan"></wj-flex-chart-series>
            <wj-flex-chart-series name="Germany" binding="Germany"></wj-flex-chart-series>
            <wj-flex-chart-series name="UK" binding="UK"></wj-flex-chart-series>
            <wj-flex-chart-series name="France" binding="France"></wj-flex-chart-series>
            <wj-flex-chart-series name="India" binding="India"></wj-flex-chart-series>
            <wj-flex-chart-series name="Italy" binding="Italy"></wj-flex-chart-series>
            <wj-flex-chart-axis wjProperty="axisY" :reversed="true"></wj-flex-chart-axis>
            <wj-flex-chart-animation></wj-flex-chart-animation>
        </wj-flex-chart>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData() 
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
