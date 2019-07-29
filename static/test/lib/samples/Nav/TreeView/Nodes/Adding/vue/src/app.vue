<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-5">
        <wj-tree-view
          :itemsSource="data"
          :displayMemberPath="'header'"
          :childItemsPath="'items'"
          :initialized="initialized"
        ></wj-tree-view>
      </div>
      <div class="col-xs-7">
        <p>
          New Node Content:
          <input class="form-control" id="theInput" value="My New Node">
        </p>
        <p>
          Add Node:
          <button id="btnFirst" class="btn btn-default" @click="onFirstClick()">First Child</button>
          <button id="btnLast" class="btn btn-default" @click="onLastClick()">Last Child</button>
        </p>
        <p>
          <button id="btnNoSel" class="btn btn-default" @click="onNoSelClick()">Remove Selection</button>
        </p>
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
    };
  },
  methods: {
    onFirstClick: function() {
      var control = this.control;
      var newItem = { header: document.getElementById("theInput").value },
        node = control.selectedNode;
      if (node) {
        control.selectedNode = node.addChildNode(0, newItem);
      } else {
        control.selectedNode = control.addChildNode(0, newItem);
      }
    },

    onLastClick: function() {
      var control = this.control;
      var newItem = { header: document.getElementById("theInput").value },
        node = control.selectedNode;
      if (node) {
        var index = node.nodes ? node.nodes.length : 0;
        control.selectedNode = node.addChildNode(index, newItem);
      } else {
        var index = control.nodes ? control.nodes.length : 0;
        control.selectedNode = control.addChildNode(index, newItem);
      }
    },

    onNoSelClick: function() {
      this.control.selectedNode = null;
    },

    initialized: function(control) {
      this.control = control;
      this.control.selectedItem = this.control.itemsSource[0];
    }
  }
});
</script>

<style>
.container-fluid .wj-treeview {
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

#theInput {
  font-weight: normal;
  display: inline-block;
  width: 12em;
}
</style>
