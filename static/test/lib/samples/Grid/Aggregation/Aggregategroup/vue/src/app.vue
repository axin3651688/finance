<template>
  <div class="container-fluid">
      <wj-group-panel style="display: block;"
        :grid="flex"
        placeholder="Drag columns here to create groups">
      </wj-group-panel>
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
import { WjGridGrouppanelModule } from '@grapecity/wijmo.vue2.grid.grouppanel';
import { getData } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
        data: getData(),
        flex: null
    };
  },
  methods:{
    initializedGrid(ctl){
      this.flex = ctl;
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

