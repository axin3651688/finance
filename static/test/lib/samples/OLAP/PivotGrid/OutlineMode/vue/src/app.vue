<template>
    <div class="container-fluid">
        <label>
            outlineMode
            <input id="outline" type="checkbox" v-model="outlineMode" v-on:change="outlineModeChanged">
        </label><br/>
        <label>
            custom style
            <input id="style" type="checkbox" v-model="customStyle">
        </label><br/>
        <label>
            totalsBeforeData
            <input id="before" type="checkbox" v-model="ng.totalsBeforeData">
        </label><br/>
        <label>
            showRowFieldHeaders
            <input id="headers" type="checkbox" v-model="showRowFieldHeaders">
        </label><br/>
        <div class="row">
            <div class="col-xs-5">
                <wj-pivot-panel :items-source="ng"></wj-pivot-panel>
            </div>
            <div class="col-xs-7" :class="customStyle ? 'outline' : ''">
                <wj-pivot-grid
                    control="grid"
                    :items-source="ng"
                    :outline-mode="outlineMode"
                    :show-row-field-headers="showRowFieldHeaders">
                </wj-pivot-grid>
                <button class="btn btn-primary" v-on:click="exportToCsv()">
                    Export to CSV
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';

    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.olap';
    import { PivotEngine } from '@grapecity/wijmo.olap';
    import { CellRange } from '@grapecity/wijmo.grid';
    import { getData } from './data';

    let App = Vue.extend({
        name: "app",
        data: function () {
            return {
                ng: new PivotEngine({
                    itemsSource: getData(1000),
                    showRowTotals: 'Subtotals',
                    showColumnTotals: 'None',
                    totalsBeforeData: true,
                    rowFields: ['Country', 'Product', 'Color'],
                    valueFields: ['Sales', 'Expenses', 'Downloads']
                }),
                outlineMode: true,
                customStyle: true,
                totalsBeforeData: true,
                showRowFieldHeaders: true
            }            
        },
        methods: {
            outlineModeChanged: function() {
                if (this.outlineMode) {
                    this.totalsBeforeData = true;
                } else {
                    this.customStyle = false;
                }
            },
            exportToCsv: function() {
                var grid = this.grid, // exposed with "control" attribute
                    rng = new CellRange(0, 0, grid.rows.length - 1, grid.columns.length - 1),
                    csv = grid.getClipString(rng, true, true, true);
                exportFile(csv, 'FlexGrid.csv');
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");

    function exportFile(csv, fileName) {
        var fileType = 'txt/csv;charset=utf-8';
        if (navigator.msSaveBlob) { // IE 
            navigator.msSaveBlob(new Blob([csv], {
                type: fileType
            }), fileName);
        } else {
            var e = document.createElement('a');
            e.setAttribute('href', 'data:' + fileType + ',' + encodeURIComponent(csv));
            e.setAttribute('download', fileName);
            e.style.display = 'none';
            document.body.appendChild(e);
            e.click();
            document.body.removeChild(e);
        }
    }
</script>

<style>
.wj-pivotgrid {
	max-height: 400px;
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.outline .wj-pivotgrid .wj-cell {
    border-right: none;
    border-bottom: none;
    background: #fff;
}

body {
  margin-bottom: 24pt;
}
</style>