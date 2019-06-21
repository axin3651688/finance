<template>
  <div class="container-fluid">
    <label>
      alternatingRowStep
      <input type="checkbox" v-on:click="onAlternatingRowStepClick">
    </label>
    <wj-flex-grid :items-source="data" :alternating-row-step="0" :loaded-rows="onloadedRows" :initialized="initialGrid">
      <wj-flex-grid-column binding="id" header="ID" :width="50"></wj-flex-grid-column>
      <wj-flex-grid-column binding="country" header="Country"></wj-flex-grid-column>
      <wj-flex-grid-column binding="product" header="Product"></wj-flex-grid-column>
      <wj-flex-grid-column binding="sales" header="Sales" format="c0"></wj-flex-grid-column>
      <wj-flex-grid-column binding="expenses" header="Expenses" format="c0"></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import { getData } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
        data: getData()
    };
  },
  methods: {
    initialGrid(grid) {
      this.grid = grid;
    },

    onloadedRows(grid) {
      for (let i = 0; i < grid.rows.length; i++) {
        let row = grid.rows[i];
        let item = row.dataItem;
        if (item.sales > 6000) {
          row.cssClass = 'high-value';
        } else if (item.sales < 1000) {
          row.cssClass = 'low-value';
        }
      }
    },

    onAlternatingRowStepClick(e) {
      this.grid.alternatingRowStep = e.target.checked ? 1 : 0;
    }
  }
});
</script>

<style>
  .wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
  }
  .wj-cell.high-value {
    font-weight: bold;
    color: green;
  }
  .wj-cell.low-value {
    font-style: italic;
    color: red;
  }
  body {
    margin-bottom: 20px;
  }
</style>

