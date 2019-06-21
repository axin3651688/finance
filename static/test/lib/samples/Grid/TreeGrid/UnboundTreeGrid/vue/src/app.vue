<template>
  <div class="container-fluid">
    <wj-flex-grid headers-visibility="Column" selection-mode="Row" :beginningEdit="onBeginningEdit" :initialized="initialGrid">
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcGrid from '@grapecity/wijmo.grid';
import "@grapecity/wijmo.vue2.grid";
import { getWorkers } from "./data";

new Vue({
  el: "#app",
  mounted: function() {
    let workers = getWorkers();
    // add columns
    this.workersGrid.columns.push(new wjcGrid.Column({ header: 'Name' }));
    this.workersGrid.columns.push(new wjcGrid.Column({ header: 'Hours', dataType: 'Number', format: 'n2' }));
    this.workersGrid.columns.push(new wjcGrid.Column({ header: 'Rate', dataType: 'Number', format: 'n2' }));
    // add rows
    for (let w = 0; w < workers.length; w++) {
      // add worker
      let worker = workers[w];
      let row = new wjcGrid.GroupRow();
      row.dataItem = worker;
      row.isReadOnly = false;
      row.level = 0;
      this.workersGrid.rows.push(row);
      this.workersGrid.setCellData(row.index, 0, worker.name);
      for (let c = 0; c < worker.checks.length; c++) {
        // add check
        let check = worker.checks[c];
        row = new wjcGrid.GroupRow();
        row.dataItem = check;
        row.isReadOnly = false;
        row.level = 1;
        this.workersGrid.rows.push(row);
        this.workersGrid.setCellData(row.index, 0, check.name);
        for (let e = 0; e < check.earnings.length; e++) {
          // add earning
          let earning = check.earnings[e];
          row = new wjcGrid.GroupRow();
          row.dataItem = earning;
          row.isReadOnly = false;
          row.level = 2;
          this.workersGrid.rows.push(row);
          this.workersGrid.setCellData(row.index, 0, earning.name);
          this.workersGrid.setCellData(row.index, 1, earning.hours);
          this.workersGrid.setCellData(row.index, 2, earning.rate);
        }
      }
    }
  },
  methods: {
    initialGrid(grid) {
      this.workersGrid = grid;
    },

    onBeginningEdit(flexGird, e) {
      let value = e.panel.getCellData(e.row, e.col, true);
      if (value == null) {
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