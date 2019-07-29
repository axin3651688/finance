<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="logScale">Log Scale</label>
            <input id="logScale" type="checkbox" checked="checked" v-on:change="changeLogBase">
            <wj-flex-chart :itemsSource="data" chartType="Bubble" bindingX="pop" tooltipContent="&lt;b&gt;{country}&lt;/b&gt;:&lt;br/&gt;{pci:n0} US$/year/capita">
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                <wj-flex-chart-series name="GDP" binding="gdp,pci"></wj-flex-chart-series>
                <wj-flex-chart-axis wjProperty="axisX" title="Population (millions)" :axisLine="true" format="g4,," :logBase="logBase"></wj-flex-chart-axis>
                <wj-flex-chart-axis wjProperty="axisY" title="GDP (US$ billions)" format="g4," :logBase="logBase"></wj-flex-chart-axis>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                logBase: 10
            }
        },
        methods: {
            changeLogBase: function(chk) {
                this.logBase = chk.target.checked ? 10 : null
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

    .wj-flexchart g.wj-series-group ellipse {
        fill: gold;
        stroke: orange;
        opacity: .5
    }

    .wj-flexchart g.wj-series-group ellipse:hover {
        fill: orange;
        opacity: 1;
    }
</style>
