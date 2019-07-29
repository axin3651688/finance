<template>
  <div class="container-fluid">
      <!-- the grid -->
      <wj-flex-grid
          :frozenRows=1
          :itemsSource="data">
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
import * as wjcCore from "@grapecity/wijmo";
import { getData } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
        data: new wjcCore.CollectionView(getData(), {
            groupDescriptions: [new wjcCore.PropertyGroupDescription('Grand Totals', 
                () => {
                    return '';
                })]
        })
    };
  }
});
</script>

<style>
  .wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
  }
  .wj-cell.wj-frozen-row {
      border-bottom: none;
  }
  body {
    margin-bottom: 20px;
  }
</style>

