<template>
  <div class="container-fluid">
    <button
      id="btnDisableNode"
      class="btn btn-default"
      @click="onDisableNodeClick()"
    >Disable Selected Node</button>
    <button
      id="btnEnableAllNodes"
      class="btn btn-default"
      @click="onEnableAllNodes()"
    >Enable All Nodes</button>
    <wj-tree-view :itemsSource="data" :displayMemberPath="'header'" :childItemsPath="'items'" :initialized="initialized"></wj-tree-view>
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
      data: getData()
    };
  },
  methods: {
    onDisableNodeClick: function() {
      var nd = this.control.selectedNode;
      if (nd) {
        nd.isDisabled = true;
      }
    },

    onEnableAllNodes: function() {
      for (var nd = this.control.getFirstNode(); nd; nd = nd.next()) {
        nd.isDisabled = false;
      }
    },

    initialized: function(control) {
      this.control = control;
    }
  }
});
</script>

<style>
.container-fluid .wj-treeview {
  display: block;
  height: 350px;
  font-size: 120%;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 6px;
  background: #f0f0f0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
body {
  margin-bottom: 24pt;
}
</style>
