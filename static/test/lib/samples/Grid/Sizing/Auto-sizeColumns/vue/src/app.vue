<template>
    <div class="container-fluid">
        <wj-flex-grid
            :itemsSource="data"
            :autoGenerateColumns="false"
            :allowResizing="'None'"
            :loadedRows="onLoadedRows"
            :cellEditEnded="onCellEditEnded"
            :rowEditEnded="onRowEditEnded"
        >
            <wj-flex-grid-column
                :binding="'id'"
                :header="'ID'"
                :minWidth="60"
                :isReadOnly="true"
            ></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'countries'" :header="'Countries'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'" :minWidth="80"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'" :minWidth="80"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
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
            grid.autoSizeColumns();
        },
        onCellEditEnded: function(grid, e) {
            grid.autoSizeColumn(e.col);
        },
        onRowEditEnded: function(grid) {
            grid.autoSizeColumns();
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
  max-height: 300px;
}

</style>
