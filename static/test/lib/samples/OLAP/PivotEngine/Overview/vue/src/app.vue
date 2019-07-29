<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <p>Raw data:</p>
                <wj-flex-grid :items-source="ng.collectionView"></wj-flex-grid>
            </div>
            <div class="col-xs-7">
                <p>
                    Amount spent by each buyer on each expense type.
                </p>
                <wj-pivot-grid :items-source="ng" :initialized="initializePivotGrid"></wj-pivot-grid>
            </div>
        </div>
        <p>
            The view is live. If you edit the raw data, the summary
            view is automatically updated.
        </p>
        <p>
            The pivot grid shows how much each person spent on each
            type of expense. If you double-click any cell, you will
            see a detail dialog showing the items that make up the
            total.
        </p>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import '@grapecity/wijmo.vue2.grid';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(10000), // raw data
                showRowTotals: 'Subtotals',
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'] // by buyer and by type)
            })
        };
    },
    methods: {
        initializePivotGrid: (pivotGrid) => {
            pivotGrid.engine.fields.getField('Amount').format = 'c0';
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
  height: 300px;
}
body {
  margin-bottom: 24pt;
}
</style>