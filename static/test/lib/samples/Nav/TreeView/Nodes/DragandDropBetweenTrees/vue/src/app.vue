<template>
  <div class="container-fluid">
    <label>
      <input id="dragWithin" type="checkbox" checked="checked">
      allow dragging within trees
    </label>
    <br>
    <label>
      <input id="dragBetween" type="checkbox" checked="checked">
      allow dragging between trees
    </label>

    <div class="row">
      <div class="col-xs-6">
        <wj-tree-view
          class="short-tree"
          :itemsSource="data"
          :displayMemberPath="'header'"
          :childItemsPath="'items'"
          :allow-dragging="true"
          :drag-over="onDragOverBetweenTrees"
        ></wj-tree-view>
      </div>
      <div class="col-xs-6">
        <wj-tree-view
          class="short-tree"
          :itemsSource="anotherData"
          :displayMemberPath="'header'"
          :childItemsPath="'items'"
          :allowDragging="true"
          :drag-over="onDragOverBetweenTrees"
        ></wj-tree-view>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.nav";
import * as wjCore from "@grapecity/wijmo";
import { getData, getAnotherData } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
      data: getData(),
      anotherData: getAnotherData()
    };
  },
  methods: {
    onDragOverBetweenTrees: function(s, e) {
      var t1 = e.dragSource.treeView;
      var t2 = e.dropTarget.treeView;
      //
      // prevent dragging within trees
      if (t1 == t2 && !document.getElementById("dragWithin").checked) {
        e.cancel = true;
      }
      //
      // allow dragging between trees
      if (t1 != t2 && document.getElementById("dragBetween").checked) {
        e.cancel = false;
      }
    }
  }
});
</script>

<style>
.container-fluid .wj-treeview {
  display: block;
  height: 350px;
  font-size: 120%;
  margin-bottom: 8px;
  padding: 6px;
  background: #f0f0f0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
body {
  margin-bottom: 24pt;
}
</style>
