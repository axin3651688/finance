<template>
    <div class="container-fluid">
        <wj-pivot-chart control="pivotChart" :items-source="ngChart" :show-title="true" show-legend="Auto" :initialized="initializePivotChart"></wj-pivot-chart>
        <label>
            Chart Type <wj-combo-box :items-source="chartTypes" :text-changed="onChartTypeChanged"></wj-combo-box>
        </label>
        <br />
        <label>
            Show Legend<wj-combo-box :items-source="showLegendOptions" :text-changed="onShowLegendOptionChanged"></wj-combo-box>
        </label>
        <br />
        <label>
            Show Chart Title <input id="chartTitle" type="checkbox" checked="checked" v-on:click="onChartTitleClick">
        </label>
        <div id="export" v-on:click="onExportClick">
            Export to
            <button class="btn btn-default">PNG</button>
            <button class="btn btn-default">JPEG</button>
            <button class="btn btn-default">SVG</button>
        </div>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import '@grapecity/wijmo.vue2.input';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'
import '@grapecity/wijmo.chart.render';

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ngChart: new wjcOlap.PivotEngine({
                itemsSource: getData(), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'], // by buyer and type
            }),
            chartTypes: 'Column,Bar,Line,Area,Pie'.split(','),
            showLegendOptions: 'Auto,Always,Never'.split(',')
        };
    },
    methods: {
        initializePivotChart: (pivotChart) => {
            this.pivotChart = pivotChart;
            this.pivotChart.engine.fields.getField('Amount').format = 'c0';
        },

        onChartTypeChanged: (combo) => {
            this.pivotChart.chartType = wjcOlap.PivotChartType[combo.text];
        },

        onShowLegendOptionChanged(combo) {
            this.pivotChart.showLegend = wjcOlap.LegendVisibility[combo.text];
        },

        onChartTitleClick(e) {
            this.pivotChart.showTitle = e.target.checked;
        },

        onExportClick(e) {
            if (e.target instanceof HTMLButtonElement) {
                this.pivotChart.saveImageToFile('FlexChart.' + e.target.textContent.trim());
            }
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-pivotchart {
  margin: auto;
}
.wj-pivotchart .wj-flexchart {
  border: none;
  height: 300px;
}

body {
  margin-bottom: 48pt;
}
</style>