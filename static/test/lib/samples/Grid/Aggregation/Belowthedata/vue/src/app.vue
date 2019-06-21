<template>
  <div class="container-fluid">
      <wj-flex-grid
          :itemsSource="data" :initialized="initializedGrid">
          <wj-flex-grid-column binding="id" header="ID" :width=60 :isReadOnly=true></wj-flex-grid-column>
          <wj-flex-grid-column binding="country" header="Country"></wj-flex-grid-column>
          <wj-flex-grid-column binding="product" header="Product"></wj-flex-grid-column>
          <wj-flex-grid-column binding="sales" header="Sales" aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column binding="expenses" header="Expenses" aggregate="Sum"></wj-flex-grid-column>
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
    initializedGrid(flex){
        flex.columnFooters.rows.push(new wjcGrid.GroupRow());
        flex.bottomLeftCells.setCellData(0, 0, 'Σ');
    }
  }
});
</script>

<style>
  .wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
  }
  body {
    margin-bottom: 20px;
  }
</style>

