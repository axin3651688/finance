<template>
    <div class="container-fluid">
        <wj-flex-chart header="Average Temperature of Tokyo" bindingX="month" :itemsSource="data" :palette="palette">
            <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
            <wj-flex-chart-error-bar binding="temperature" :value="1" errorAmount="StandardError"
                :errorBarStyle="{ stroke: 'darkred', strokeWidth: 3 }">
            </wj-flex-chart-error-bar>
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
    import '@grapecity/wijmo.vue2.chart.analytics';
    import '@grapecity/wijmo.vue2.chart.animation';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                palette: wijmo.chart.Palettes.zen
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
