<template>
  <div class="container-fluid">
      <wj-flex-grid
          :initialized="firstGridInitial"
          :itemsSource="data">
      </wj-flex-grid>
      <p>
          And this grid has no fixed columns and a custom set of 
          scrollable columns:</p> 
      <wj-flex-grid
          :initialized="secondGridInitial"
          :itemsSource="data">
          <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
          <wj-flex-grid-column header="Sales" binding="sales"></wj-flex-grid-column>
          <wj-flex-grid-column header="Expenses" binding="expenses"></wj-flex-grid-column>
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
  methods:{
    firstGridInitial(grid) {
        grid.rowHeaders.columns.push(new wjcGrid.Column()); // extra fixed column
    },
    secondGridInitial(grid) {
        grid.rowHeaders.columns.splice(0, 1); // no extra columns
    }
  }
});
</script>

<style>
  .wj-flexgrid {
      height: 150px; 
      margin: 10px 0;
  }
  .extra-col {
      background: rgb(255,255,125);
  }
</style>

