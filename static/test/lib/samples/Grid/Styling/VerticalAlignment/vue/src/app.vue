<template>
  <div class="container-fluid">
    <p>
      This example shows how you can use a <b>flex</b>
      layout within the cells to center the content vertically:
    </p>
    <wj-flex-grid :items-source="data" :initialized="initialGrid" :formatItem="onFormatItem">
      <wj-flex-grid-column binding="id" header="ID" :width="50"></wj-flex-grid-column>
      <wj-flex-grid-column binding="country" header="Country"></wj-flex-grid-column>
      <wj-flex-grid-column binding="product" header="Product"></wj-flex-grid-column>
      <wj-flex-grid-column binding="sales" header="Sales" format="c0"></wj-flex-grid-column>
      <wj-flex-grid-column binding="expenses" header="Expenses" format="c0"></wj-flex-grid-column>
      <wj-flex-grid-column binding="active" header="Active"></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
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
    this.grid.rows.defaultSize = 45;
    this.grid.columnHeaders.rows.defaultSize = 65;
    this.grid.allowResizing = wjcGrid.AllowResizing.Both;
    this.grid.deferResizing = true;
  },
  methods: {
    initialGrid(grid) {
      this.grid = grid;
    },

    onFormatItem(flexGird, e) {
      let style = e.cell.style;
      style.display = 'flex';
      style.alignItems = 'center'; // vertical alignment
      switch (style.textAlign) { // horizontal alighment
        case 'right':
          style.justifyContent = 'flex-end';
          break;
        case 'center':
          style.justifyContent = 'center';
          break;
        default:
          style.justifyContent = '';
          break;
      }
    }
  }
});
</script>

<style>
  .wj-flexgrid {
    max-height: 250px;
    margin:10px 0;
  }
  body {
    margin-bottom: 20px;
  }
</style>

