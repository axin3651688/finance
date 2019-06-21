<template>
    <div class="container-fluid">
        <wj-flex-grid
            :itemsSource="data"
            :allowMerging="'ColumnHeaders'"
            :alternatingRowStep="0"
            :autoGenerateColumns="false"
            :initialized="onInitialized"
        >
            <wj-flex-grid-column :binding="'country'" :header="'Country'" :allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'" :format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'" :format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'active'" :header="'Active'" :allowMerging="true"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import * as wjCore from "@grapecity/wijmo";
import * as wjGrid from '@grapecity/wijmo.grid';
import "@grapecity/wijmo.vue2.grid";
import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getData()
        };
    },
    methods: {
        onInitialized: function(grid) {
            // create extra header row
            var extraRow = new wjGrid.Row();
            extraRow.allowMerging = true;
            //
            // add extra header row to the grid
            var panel = grid.columnHeaders;
            panel.rows.splice(0, 0, extraRow);
            //
            // populate the extra header row
            for (let colIndex = 1; colIndex <= 2; colIndex++) {
                panel.setCellData(0, colIndex, "Amounts");
            }
            //
            // merge "Country" and "Active" headers vertically
            ["country", "active"].forEach(function(binding) {
                let col = grid.getColumn(binding);
                col.allowMerging = true;
                panel.setCellData(0, col.index, col.header);
            });
            //
            // center-align merged header cells
            grid.formatItem.addHandler(function(s, e) {
                if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
                    var html = e.cell.innerHTML;
                    e.cell.innerHTML =
                        '<div class="v-center">' + html + "</div>";
                }
            });
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 200px;
    margin-bottom: 12px;
}
.wj-cell .v-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    white-space: pre-wrap;
}

body {
    margin-bottom: 24px;
}
</style>