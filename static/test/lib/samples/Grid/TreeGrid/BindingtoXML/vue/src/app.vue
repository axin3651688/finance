<template>
  <div class="container-fluid">
    <wj-flex-grid :items-source="data" headers-visibility="Column" child-items-path="products" :tree-indent="25">
      <wj-flex-grid-column binding="name" header="Name" width="3*"></wj-flex-grid-column>
      <wj-flex-grid-column binding="id" header="ID" data-type="String" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column binding="price" header="Unit Price" format="n2" data-type="Number" width="*"></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import { getProductsByCategory } from "./data";

new Vue({
    el: "#app",
    data: function() {
        return {
          data: getProductsByCategory()
        }
    }
});
</script>

<style>
.wj-flexgrid {
  height: 300px;
}
.wj-flexgrid .wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {
  background: white;
  color: #444;
  border-bottom: none;
}
</style>