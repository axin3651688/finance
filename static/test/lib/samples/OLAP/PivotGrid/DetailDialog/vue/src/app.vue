<template>
    <div class="container-fluid">
        <p>
            <button id="showDetail" class="btn btn-primary" v-on:click="onShowDetailClick">
                Show Detail Dialog
            </button>
        </p>
        <p>
            The grid exposes the detail dialog through its
            <b>detailDialog</b> property, which can be used to customize
            the dialog as shown in this example.
        </p>
        <p>
            <label>
                Custom Detail Dialog
                <input id="customDetails" type="checkbox" checked="checked">
            </label>
        </p>
        <wj-pivot-grid :items-source="ngFmt" :isReadOnly="true" :initialized="initializePivotGrid" :formatItem="formatItem"></wj-pivot-grid>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ngFmt: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                itemsSource: getData(10000),
                showColumnTotals: 'GrandTotals',
                showRowTotals: 'None',
                fields: [
                    { binding: 'product', header: 'Product' },
                    { binding: 'date', header: 'Date', format: 'yyyy \"Q\"q' },
                    { binding: 'sales', header: 'Sales', format: 'n0' },
                    { binding: 'sales', header: 'Diff', format: 'p0', showAs: 'DiffRowPct' }
                ],
                rowFields: ['Date'],
                columnFields: ['Product'],
                valueFields: ['Sales', 'Diff']
            })
        };
    },

    mounted: function() {
        let detailDialog = this.pivotGrid.detailDialog,
            detailGridHost = detailDialog.hostElement.querySelector('.wj-flexgrid');
        let detailGrid = wjcCore.Control.getControl(detailGridHost);
        let customDetails = document.getElementById('customDetails');

        // format cells in the detail grid
        detailGrid.formatItem.addHandler((s, e) => {
            if (e.panel == s.cells && customDetails.checked) {
                let large = false,
                    small = false,
                    val = s.getCellData(e.row, e.col, false);
                switch (s.columns[e.col].binding) {
                    case 'sales':
                        large = val > 18;
                        small = val < 16;
                    break;
                    case 'downloads':
                        large = val > 80;
                        small = val < 60;
                    break;
                }
                wjcCore.toggleClass(e.cell, 'large-value', large);
                wjcCore.toggleClass(e.cell, 'small-value', small);
            }
        });
        // customize dialog content when showing it
        detailDialog.showing.addHandler((s) => {
            if (customDetails.checked) {
                // customize summary info above the grid
                // the default format is this:
                // Row: <b>{rowHeader}</b></br>
                // Column: <b>{columnHeader}</b><br>
                // {cellHeader}: <b>{cellValue}</b>
                let summary = s.hostElement.querySelector('.wj-summary'),
                    fmt = 'Details for <b>{columnHeader}</b> on ' +
                        '<b>{rowHeader}</b>: <b>{cellHeader}</b> is ' +
                        '<b>{cellValue}</b>';
                summary.innerHTML = wjcCore.format(fmt, s);
                // sort detail grid by date
                let sds = detailGrid.collectionView.sortDescriptions;
                sds.push(new wjcCore.SortDescription('date', false));
            }
        });
    },

    methods: {
        initializePivotGrid(pivotGrid) {
            this.pivotGrid = pivotGrid;
        },

        formatItem(s, e) {
            // we are interested in the cells panel
            if (e.panel == this.pivotGrid.cells) {
                // remove color by default
                let color = '';
                // format diff columns if custom formatting is on
                if (e.col % 2 == 1) {
                    let value = this.pivotGrid.getCellData(e.row, e.col, false),
                        glyph = 'circle',
                        span = ' <span style="font-size:120%" class="wj-glyph-{glyph}"></span>';
                        color = '#d8b400';
                    if (value != null) {
                        if (value < 0) { // negative variation
                            color = '#9f0000';
                            glyph = 'down';
                        } else if (value > 0.05) { // positive variation
                            color = '#4c8f00';
                            glyph = 'up';
                        }
                        e.cell.innerHTML += span.replace('{glyph}', glyph);
                    }
                }
                // apply cell color
                e.cell.style.color = color;
            }
        },

        onShowDetailClick() {
            let sel = this.pivotGrid.selection;
            if (sel.isValid) {
                this.pivotGrid.showDetail(sel.row, sel.col);
            } else {
                alert('Please select a cell in the PivotGrid first.');
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
.wj-flexgrid .large-value {
  color: green;
}
.wj-flexgrid .small-value {
  color: red;
}

body {
  margin-bottom: 24pt;
}

</style>