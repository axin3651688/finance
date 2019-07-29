<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="lines">Lines: </label>
            <wj-combo-box :text="lines" :itemsSource="linesData" :textChanged="lineChanged"></wj-combo-box><br>
            <label for="interaction">Interaction: </label>
            <wj-combo-box :text="interaction" :itemsSource="interactionData" :textChanged="interactionChanged"></wj-combo-box>

            <wj-flex-chart chartType="Line" bindingX="date" tooltipContent="" :itemsSource="data" :initialized="initializeChart">
                <wj-flex-chart-legend position="None"></wj-flex-chart-legend>
                <wj-flex-chart-series binding="value" name="Value"></wj-flex-chart-series>
                <wj-flex-chart-axis wjProperty="axisY" :majorGrid="false"></wj-flex-chart-axis>
                <wj-flex-chart-line-marker :lines="lines" :interaction="interaction" :isVisible="lmVisible" :content="markerContent"></wj-flex-chart-line-marker>
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
    import { getData } from './data';
    import * as wjCore from '@grapecity/wijmo';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return { 
                data: getData(),
                linesData: 'None,Vertical,Horizontal,Both'.split(','),
                interactionData: 'None,Move,Drag'.split(','),
                lines: 'Both',
                interaction: 'Move',
                lmVisible: false
            }
        },
        methods: {
            initializeChart: function(flex) {
                this.theChart = flex;
                // show the marker when the mouse is over the chart
                flex.addEventListener(flex.hostElement, 'mouseenter', () => {
                    this.lmVisible = true;
                });
                flex.addEventListener(flex.hostElement, 'mouseleave', () => {
                    this.lmVisible = false;
                });
            },
            lineChanged: function(flex) {
                this.lines = flex.text;
            },
            interactionChanged: function(flex) {
                this.interaction = flex.text;
            },
            markerContent: function(ht) {
                return ht.item
                    ? wjCore.format('The value on <b>{date:MMM d, yyyy}</b><br/>is <b>{value:c}</b>', ht.item)
                    : 'No items here...';
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .wj-flexchart {
        height: 300px;
        margin: 10px 0;
    }

    .form-group .wj-flexchart .wj-chart-linemarker {
        background: transparent;
    }

    .wj-chart-linemarker-content {
        padding: 12px;
        margin: 6px;
        background: white;
        border-radius: 3px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-hline,
    .wj-flexchart .wj-chart-linemarker .wj-chart-linemarker-vline {
        height: 1px;
        width: 1px;
        opacity: .5;
        background: navy;
    }

    .wj-control {
        margin-bottom: 3px;
    }

    label {
        width: 120px;
        text-align: right;
    }

    body {
        margin-bottom: 24pt;
    }

</style>
