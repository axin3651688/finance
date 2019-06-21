<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <wj-pivot-panel :items-source="ng"></wj-pivot-panel>
            </div>
            <div class="col-xs-7">
                <wj-pivot-grid :items-source="ng" :initialized="initializePivotGrid"></wj-pivot-grid>
            </div>
        </div>
        <p>
            You can configure the <b>PivotEngine</b> to show the subtotals
            before or after the data using the <b>totalsBeforeData</b>
            property:
        </p>
        <label>
            totalsBeforeData:
            <input id="totalsBeforeData" type="checkbox" v-on:click="onTotalsBeforeDataClick">
        </label>
        <p>
            You can configure the <b>PivotGrid</b> to make row and column
            groups collapsible using the <b>collapsibleSubtotals</b>
            property:
        </p>
        <label>
            collapsibleSubtotals:
            <input id="collapsibleSubtotals" type="checkbox" checked v-on:click="onCollapsibleSubtotalsClick">
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
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(1000), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'], // by buyer and Type
                showRowTotals: 'Subtotals',
                showColumnTotals: 'Subtotals',
            })
        };
    },
    mounted: function() {
        this.ng.fields.getField('Amount').format = 'c0';
        this.ng.fields.getField('Date').format = 'yyyy';
    },
    methods: {
        initializePivotGrid(pivotGrid) {
            this.pivotGrid = pivotGrid;
        },

        onTotalsBeforeDataClick(e) {
            this.pivotGrid.engine.totalsBeforeData = e.target.checked;
        },

        onCollapsibleSubtotalsClick(e) {
            this.pivotGrid.collapsibleSubtotals = e.target.checked;
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-pivotgrid {
	max-height: 400px;
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.container > label {
	margin: 0 0 2em 2em;
}
body {
  margin-bottom: 24pt;
}
</style>