<template>
  <div class="container-fluid">
    <label for="asTree">Show as Tree: </label>
    <input id="asTree" type="checkbox" checked v-on:click="onAsTreeClick">
    <wj-flex-grid :items-source="family" headers-visibility="None" child-items-path="children" :initialized="initialFamilayGrid">
    </wj-flex-grid>
    <p>
      There are also 'heterogeneous' hierarchies, where
      items at different levels have different types and
      different child item properties.</p>
    <p>
      For example, the grid below is bound to a collection
      of 'worker' objects which receive 'checks' which list
      'earnings':</p>
    <wj-flex-grid :items-source="workers" headers-visibility="Column" :child-items-path="['checks','earnings']">
      <wj-flex-grid-column binding="name"></wj-flex-grid-column>
      <wj-flex-grid-column binding="hours" data-type="Number"></wj-flex-grid-column>
      <wj-flex-grid-column binding="rate" data-type="Number"></wj-flex-grid-column>
    </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import { getFamilies,  getWorkers} from "./data";

new Vue({
    el: "#app",
    data: function() {
        return {
          family: getFamilies(),
          workers: getWorkers()
        }
    },
    mounted: function() {
      this.familyGrid.columns[0].with = "*";
    },
    methods: {
      initialFamilayGrid(grid) {
        this.familyGrid = grid;
      },

      onAsTreeClick(e) {
        this.familyGrid.childItemsPath = e.target.checked ? 'children' : '';
      }
    }
});
</script>

<style>
.wj-flexgrid {
  max-height: 220px; 
  margin: 6px 0;
}
.wj-cell.wj-group {
  border: none;
}
.wj-cell.wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {
  background-color: white;
}
body {
   margin-bottom: 24px;
}
</style>