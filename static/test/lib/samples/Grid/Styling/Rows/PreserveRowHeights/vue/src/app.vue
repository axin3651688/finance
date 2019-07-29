<template>
  <div class="container-fluid">
    <button class="btn btn-default" v-on:click="onReload">
      Reload
    </button>
    <wj-flex-grid :items-source="data" allow-resizing="Both" :initialized="initialGrid"></wj-flex-grid>
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
  mounted: function() {
    var heightMap = null;
    this.grid.loadingRows.addHandler(() => { // save
      heightMap = new Map();
      this.grid.rows.forEach((row) => {
        heightMap.set(row.dataItem, row.height);
      });
      console.log('saved');
    });
    this.grid.loadedRows.addHandler(() => { // restore
      this.grid.rows.forEach((row) => {
        let height = heightMap.get(row.dataItem);
        if (height != null) {
          row.height = height;
        }
      });
      console.log('restored');
    });
  },
  methods: {
    initialGrid(grid) {
      this.grid = grid;
    },

    onReload() {
      this.grid.collectionView.refresh();
    }
  }
});
</script>

<style>
  .wj-flexgrid {
    max-height: 250px;
    margin: 6px 0;
  }
</style>

