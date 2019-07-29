<template>
  <div class="container-fluid">
    <h3>
      Default Cell Padding: 3px</h3>
    <div id="theGrid">
      <wj-flex-grid :items-source="data"></wj-flex-grid>
    </div>

    <h3>
      Custom Cell Padding: 8px</h3>
    <div id="theGridTallRows">
      <wj-flex-grid :items-source="data"></wj-flex-grid>
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
    max-height: 250px;
    margin: 10px 0;
  }
  #theGridTallRows .wj-flexgrid .wj-cell {
    padding: 8px;
  }
  body {
    margin-bottom: 20px;
  }
</style>

