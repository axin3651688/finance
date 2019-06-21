<template>
  <div class="container-fluid">
    <p>
      This grid shows the effect of these properties:</p>
    <wj-flex-grid :items-source="data" :show-alternatingrows="false" :auto-generate-columns="false"
      :initialized="initialGrid">
      <wj-flex-grid-column binding="id" header="ID" align="center" :width="50"></wj-flex-grid-column>
      <wj-flex-grid-column binding="country" header="Country" cssClass="cell-country"></wj-flex-grid-column>
      <wj-flex-grid-column binding="product" header="Product" cssClass="cell-product"></wj-flex-grid-column>
      <wj-flex-grid-column binding="comment" header="Comment" wordWrap="true" :width="200"></wj-flex-grid-column>
      <wj-flex-grid-column binding="sales" header="Sales" align="center" format="c0"></wj-flex-grid-column>
      <wj-flex-grid-column binding="expenses" header="Expenses" align="center" format="c0"></wj-flex-grid-column>
    </wj-flex-grid>
    <p>
      The grid below uses <b>formatItem</b> to add class
      names to numeric cells so their style depends on
      their values:</p>
    <wj-flex-grid :items-source="data" :show-alternatingrows="false" :auto-generate-columns="false"
      :formatItem="onFormatItem">
      <wj-flex-grid-column binding="country" header="Country"></wj-flex-grid-column>
      <wj-flex-grid-column binding="product" header="Product"></wj-flex-grid-column>
      <wj-flex-grid-column binding="sales" header="Sales" align="center" format="c0"></wj-flex-grid-column>
      <wj-flex-grid-column binding="expenses" header="Expenses" align="center" format="c0"></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { getData } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
        data: getData()
    };
  },
  mounted: function() {
    this.grid.autoSizeRows();
  },
  methods:{
    initialGrid(grid) {
      this.grid = grid;
    },
    onFormatItem(flexGird, e) {
      if (e.panel == flexGird.cells) {
        let value = e.panel.getCellData(e.row, e.col, false);
        wjcCore.toggleClass(e.cell, 'high-value', wjcCore.isNumber(value) && value > 6000);
        wjcCore.toggleClass(e.cell, 'low-value', wjcCore.isNumber(value) && value < 2000);
      }
    }
  }
});
</script>

<style>
  .wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
  }
  .cell-country {
    font-weight: bold
  }
  .cell-country:not(.wj-state-selected):not(.wj-state-multi-selected) {
    background-color: #bbff00 !important;
  }
  .cell-product {
    font-weight: bold;
  }
  .cell-product:not(.wj-state-selected):not(.wj-state-multi-selected) {
    background-color: #ffbb00 !important;
  }
  .high-value {
    font-weight: bold;
    color: green;
  }
  .low-value {
    font-style: italic;
    color: red;
  }
  body {
    margin-bottom: 20px;
  }
</style>

