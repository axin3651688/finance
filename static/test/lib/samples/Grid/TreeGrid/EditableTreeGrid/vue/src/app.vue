<template>
  <div class="container-fluid">
    <wj-flex-grid :items-source="workers" headers-visibility="Column" :child-items-path="['checks','earnings']"
      selection-mode="Row" :beginning-edit="onBeginningEdit" :initialized="initialWorkerGrid">
      <wj-flex-grid-column binding="name" :is-read-only="true"></wj-flex-grid-column>
      <wj-flex-grid-column binding="hours" data-type="Number" format="n2"></wj-flex-grid-column>
      <wj-flex-grid-column binding="rate" data-type="Number" format="n2"></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import { getWorkers} from "./data";

new Vue({
    el: "#app",
    data: function() {
        return {
          workers: getWorkers()
        }
    },
    mounted: function() {
      this.workerGrid.rows.forEach((row) => {
        row.isReadOnly = false;
      });
    },
    methods: {
      initialWorkerGrid(grid) {
        this.workerGrid = grid;
      },

      /*onLoadedRows(flexGird, e) {
        flexGird.rows.forEach((row) => {
            row.isReadOnly = false;
        });
      },*/

      onBeginningEdit(flexGird, e) {
        let item = flexGird.rows[e.row].dataItem,
            binding = flexGird.columns[e.col].binding;
        if (!(binding in item)) { // property not on this item?
            e.cancel = true; // can't edit!
        }
      }
    }
});
</script>

<style>
.wj-flexgrid {
  max-height: 220px; 
  margin: 10px;
}
.wj-cell.wj-group {
  border: none;
}
.wj-cell.wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {
  background-color: white;
}
body {
   margin-bottom: 24px;
}
</style>