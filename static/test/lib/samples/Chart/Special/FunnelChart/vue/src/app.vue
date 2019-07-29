<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="neckWidth">Neck Width: </label>
            <wj-input-number :min=0 :max=1 :step=0.1 format="p0" :value=0.2 :valueChanged="widthChanged"></wj-input-number>
        </div>

        <div class="form-group">
            <label for="neckHeight">Neck Height: </label>
            <wj-input-number :min=0 :max=1 :step=0.1 format="p0" :value=0.4 :valueChanged="heightChanged"></wj-input-number>
        </div>

        <div class="form-group">
            <label for="neckStyle">Neck Style: </label>
            <wj-combo-box :textChanged="textChanged" :itemsSource="['Default', 'Rectangle']"></wj-combo-box>
        </div>

        <wj-flex-chart :itemsSource="data" bindingX="stage" chartType="Funnel" labelContent="{item.count}"
            :palette="palette" :initialized="chartInitialized">
            <wj-flex-chart-series binding="count" name="Sales Pipeline"></wj-flex-chart-series>
        </wj-flex-chart>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as chart from '@grapecity/wijmo.chart';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            palette: (() => {
                // Get random palette
                let palettes = Object.getOwnPropertyNames(chart.Palettes)
                    .filter(prop => typeof chart.Palettes[prop] === "object" && prop !== 'prototype');
                let rand = Math.floor(Math.random() * palettes.length);
                //
                return chart.Palettes[palettes[rand]];
            })()
        },
        methods: {
            chartInitialized(sender) {
                this.theChart = sender;
                //
                this.theChart.options = {
                    funnel: {
                        neckWidth: 0.2,
                        neckHeight: 0.4,
                        type: 'default'
                    }
                };
            },
            widthChanged(sender) {
                this.theChart.options.funnel.neckWidth = sender.value;
                this.theChart.refresh();
            },
            heightChanged(sender) {
                this.theChart.options.funnel.neckHeight = sender.value;
                this.theChart.refresh();
            },
            textChanged(sender) {
                this.theChart.options.funnel.type = sender.text.toLowerCase();
                this.theChart.refresh();
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexchart {
       height: 300px;
    }

    label {
        width: 100px;
        text-align: right;
    }

    body {
        margin-bottom: 24pt;
    }
</style>