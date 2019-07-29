<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-4 panel">
            <h4 class="sample-h4">
                Sort Dimension fields
            </h4>
            <label>
                Country: <wj-combo-box :items-source="sortOptions" :selectedIndexChanged="onCountrySelectedIndexChanged"></wj-combo-box>
            </label>
            <label>
                Product: <wj-combo-box :items-source="sortOptions" :selectedIndexChanged="onProductSelectedIndexChanged"></wj-combo-box>
            </label>
            <h4 class="sample-h4">
                Sort Measure fields
            </h4>
            <label>
                Sales: <wj-combo-box :items-source="sortOptions2" :initialized="initializeSortSales" :selectedIndexChanged="updateMeasureSort"></wj-combo-box>
            </label>
            <label>
                Expenses: <wj-combo-box :items-source="sortOptions2" :initialized="initializeSortExpenses" :selectedIndexChanged="updateMeasureSort"></wj-combo-box>
            </label>
            <label>
                Subtotals: <input id="subtotals" type="checkbox" v-on:click="onSubtotalsClick">
            </label>
            </div>
            <div class="col-xs-8">
                <wj-pivot-grid :items-source="ng" :initialized="initializePivotGrid"></wj-pivot-grid>
            </div>
        </div>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.input';
import '@grapecity/wijmo.vue2.olap';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(100),
                rowFields: ['Country', 'Product'],
                valueFields: ['Sales', 'Expenses']
            }),
            sortOptions: 'Ascending,Descending'.split(','),
            sortOptions2: 'None,Ascending,Descending'.split(',')
        };
    },
    methods: {
        initializePivotGrid(pivotGrid) {
            this.pivotGrid = pivotGrid;
        },

        initializeSortSales(combo){
            this.sortSales = combo;
        },
            
        initializeSortExpenses(combo){
            this.sortExpenses = combo;
        },

        onCountrySelectedIndexChanged(combo) {
            this.ng.fields.getField('Country').descending = combo.selectedIndex == 1;
        },

        onProductSelectedIndexChanged(combo) {
            this.ng.fields.getField('Product').descending = combo.selectedIndex == 1;
        },

        onSubtotalsClick(e) {
            this.ng.showRowTotals = e.target.checked ? wjcOlap.ShowTotals.Subtotals : wjcOlap.ShowTotals.GrandTotals;
        },

        updateMeasureSort() {
            let sd = this.ng.pivotView.sortDescriptions;
            sd.clear();
            this._addMeasureSort('Sales', this.sortSales.text);
            this._addMeasureSort('Expenses', this.sortExpenses.text);
        },

        _addMeasureSort(fieldName, sortDirection) {
            if (sortDirection != 'None') {
                let sd = this.ng.pivotView.sortDescriptions,
                    cols = this.pivotGrid.columns;
                for (let c = 0; c < cols.length; c++) {
                    let binding = cols[c].binding;
                    if (binding.indexOf(fieldName) == 0) {
                        sd.push(new wjcCore.SortDescription(binding, sortDirection == 'Ascending'));
                    }
                }
            }
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-pivotgrid {
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.panel label {
    display: block;
}
.panel label .wj-combobox {
    font-weight: normal;
}
h4.sample-h4 {
    margin-top: 20pt;
}
body {
    margin-bottom: 24pt;
}
</style>