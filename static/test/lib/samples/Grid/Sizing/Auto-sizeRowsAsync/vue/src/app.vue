<template>
    <div class="container-fluid">
        <button @click="onAsSyncClick()" class="btn btn-default">AutoSizeRows (synchronously)</button>
        <wj-flex-grid
            :initialized="initialized"
            :itemsSource="data"
            :autoGenerateColumns="false"
            :loadedRows="onLoadedRows"
            :cellEditEnded="onCellEditEnded"
            :scrollPositionChanged="onScrollPositionChanged"
            :resizedColumn="onResizedColumn"
        >
            <wj-flex-grid-column :binding="'id'" :header="'ID'" :minWidth="60" :isReadOnly="true"></wj-flex-grid-column>
            <wj-flex-grid-column
                :binding="'countries'"
                :header="'Countries'"
                :width="150"
                :wordWrap="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.core";
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
        onLoadedRows: function(grid) {
            this.autoSizeRowsAsync(grid);
        },

        onCellEditEnded: function(grid, e) {
            if (grid.columns[e.col].wordWrap) {
                this.autoSizeRowsAsync(grid, e.row);
            }
        },

        onScrollPositionChanged: function(grid, e) {
            var vr = grid.viewRange;
            for (var r = vr.topRow; r <= vr.bottomRow; r++) {
                if (grid.rows[r].height == null) {
                    grid.autoSizeRows(r, r);
                }
            }
        },

        onResizedColumn: function(grid, e) {
            if (grid.columns[e.col].wordWrap) {
                this.autoSizeRowsAsync(grid);
            }
        },

        onAsSyncClick: function() {
            var start = Date.now();
            this.theGrid.autoSizeRows();
            alert("AutoSized all rows in " + (Date.now() - start) + "ms");
        },

        autoSizeRowsAsync: function(grid, rowIndex) {
            if (rowIndex != null) {
                grid.rows[rowIndex].height = null;
            } else {
                grid.rows.forEach(function(row) {
                    row.height = null;
                });
            }
            setTimeout(function() {
                grid.onScrollPositionChanged();
            });
        },

        initialized: function(theGrid) {
            this.theGrid = theGrid;
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.container-fluid .wj-flexgrid {
    max-height: 300px;
    margin: 6px 0;
}
</style>
