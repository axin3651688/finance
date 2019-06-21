<template>
  <div class="container-fluid">
    <h2>Hover on Cells</h2>
    <div id="hoverCell">
      <wj-flex-grid :items-source="data"></wj-flex-grid>
    </div>
    <h2>Hover on Rows</h2>
    <div id="hoverRow">
      <wj-flex-grid :items-source="data"></wj-flex-grid>
    </div>
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
  }
});
</script>

<style>
  .wj-flexgrid {
    height: 150px; 
    margin: 10px 0;
  }

  /* css for hovering on non-header cells */
  #hoverCell .wj-cells .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected):hover {
    background-color:rgb(200,255,200);
    transition: all 0.5s;
  }

  /* css for hovering on non-header rows */
  #hoverRow .wj-cells .wj-row:hover .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) {
    transition: all 0.5s;
    background: rgb(200,255,200);
  }
</style>

