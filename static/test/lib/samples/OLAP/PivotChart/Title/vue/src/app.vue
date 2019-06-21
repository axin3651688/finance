<template>
    <div class="container-fluid">
        <wj-pivot-chart control="pivotChart" :items-source="ngChart" :show-title="true" show-legend="Auto" :initialized="initializePivotChart"></wj-pivot-chart>
        <label>
            Show Chart Title <input id="chartTitle" type="checkbox" checked="checked" v-on:click="onChartTitleClick">
        </label>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ngChart: new wjcOlap.PivotEngine({
                itemsSource: getData(), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'], // by buyer and type
            })
        };
    },
    methods: {
        initializePivotChart: (pivotChart) => {
            this.pivotChart = pivotChart;
            this.pivotChart.engine.fields.getField('Amount').format = 'c0';
        },

        onChartTitleClick(e) {
            this.pivotChart.showTitle = e.target.checked;
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