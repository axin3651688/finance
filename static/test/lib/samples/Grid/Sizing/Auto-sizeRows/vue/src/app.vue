<template>
    <div class="container-fluid">
        <wj-flex-grid
            :itemsSource="data"
            :autoGenerateColumns="false"
            :loadedRows="onLoadedRows"
            :cellEditEnded="onCellEditEnded"
            :rowEditEnded="onRowEditEnded"
            :resizedColumn="onResizedColumn"
            :initialized="onInitialGrid"
        >
            <wj-flex-grid-column :binding="'id'" :header="'ID'" :minWidth="60" :isReadOnly="true"></wj-flex-grid-column>
            <wj-flex-grid-column
                :binding="'countries'"
                :header="'Countries'"
                :width="'*'"
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
import * as wjGrid from '@grapecity/wijmo.grid';
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
    mounted: function() {
        this.grid.autoSizeRows();
    },
    methods: {
        onInitialGrid: function(grid) {
            this.grid = grid;
        },
        onLoadedRows: function(grid) {
            setTimeout(function() {
                grid.autoSizeRows();
            }, 50);
        },

        onCellEditEnded: function(grid, e) {
            if (grid.columns[e.col].wordWrap) {
                grid.autoSizeRow(e.row);
            }
        },

        onRowEditEnded: function(grid, e) {
            grid.autoSizeRow(e.row);
        },

        onResizedColumn: function(grid, e) {
            if (grid.columns[e.col].wordWrap) {
                grid.autoSizeRows();
            }
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.container-fluid .wj-flexgrid {
  max-height: 300px;
  width: 720px;
}
</style>
