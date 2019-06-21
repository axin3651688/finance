<template>
    <div class="container-fluid">
        <div class="form-group">
            <label>MovingAverage Type: </label>
            <wj-combo-box :text="type" :itemsSource="typeData" :textChanged="typeChanged"></wj-combo-box>
            <label>Period: </label>
            <wj-input-number :value="period" :step="1" :min="2" :max="20" :valueChanged="periodChanged"></wj-input-number>
            <wj-flex-chart :itemsSource="data" bindingX="date" chartType="Line">
                <wj-flex-chart-axis wjProperty="axisY" :min="0"></wj-flex-chart-axis>
                <wj-flex-chart-series name="Sales" binding="sales"></wj-flex-chart-series>
                <wj-flex-chart-moving-average name="Moving Average" :itemsSource="data" binding="sales" :period="period"
                    :style="{stroke:'darkred', strokeWidth: 3}" :type="type"></wj-flex-chart-moving-average>
            </wj-flex-chart>
        </div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import '@grapecity/wijmo.vue2.chart.analytics';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                typeData: 'Simple,Weighted,Exponential,Triangular'.split(','),
                type: 'Simple',
                period: 6
            }
        },
        methods: {
            typeChanged: function(combo) {
                this.type = combo.text
            },
            periodChanged: function(input) {
                if(input.value < input.min || input.value > input.max) {
                    return;
                }
                this.period = input.value;
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
