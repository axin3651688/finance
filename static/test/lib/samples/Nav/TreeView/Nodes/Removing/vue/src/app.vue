<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-4">
        <wj-tree-view
          :itemsSource="data"
          :displayMemberPath="'header'"
          :childItemsPath="'items'"
          :selected-item-changed="onSelectedItemChanged"
          :initialized="initialized"
        ></wj-tree-view>
      </div>
      <div class="col-xs-8">
        <button
          id="btnRemove"
          class="btn btn-default"
          @click="onRemoveClick()"
        >Remove Selected Node</button>
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
import { getData } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
      data: getData(),
      msg: "Ready"
    };
  },
  methods: {
    initialized: function(control) {
      this.control = control;
      this.control.selectedItem = this.control.itemsSource[0];
    },
    onSelectedItemChanged: function() {
      var btn = document.getElementById("btnRemove");
      wjCore.setAttribute(
        btn,
        "disabled",
        this.control.selectedItem ? null : "disabled"
      );
    },
    //
    onRemoveClick: function() {
      var control = this.control;
      if (control.selectedItem) {
        //
        // find the array that contains the item to be removed
        var parent = control.selectedNode.parentNode;
        var arr = parent
          ? parent.dataItem[control.childItemsPath]
          : control.itemsSource;
        //
        // remove the item from the parent collection
        var index = arr.indexOf(control.selectedItem);
        arr.splice(index, 1);
        //
        // refresh the tree
        control.loadTree();
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
