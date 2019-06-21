<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-6">
        <label for="cmbLevels">Levels:</label>
        <wj-combo-box
          ref="cmbLevels"
          :items-source="levels"
          :selected-value="2"
          :initialized="initLevelsCmb"
        ></wj-combo-box>
        <br>
        <label for="cmbLevels">Nodes/Level:</label>
        <wj-combo-box
          ref="cmbNodesPerLevel"
          :items-source="nodesPerLevel"
          :selected-value="5"
          :initialized="initPreLevelsCmb"
        ></wj-combo-box>
        <br>
        <label></label>
        <button class="btn btn-primary" id="bind" v-on:click="refresh">Bind Tree</button>
        <div id="bindingMsg" v-html="bindingMsg"></div>
      </div>
      <div class="col-xs-6">
        <wj-tree-view
          ref="theTree"
          :items-source="treeData"
          display-member-path="header"
          child-items-path="items"
          :initialized="initTreeView"
        ></wj-tree-view>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.nav";
import * as wjCore from "@grapecity/wijmo";

let App = Vue.extend({
  name: "app",
  data: function() {
    return {
      levels: [1, 2, 3],
      nodesPerLevel: [5, 10, 20, 40],
      treeData: getTreeData(5, 2),
      bindingMsg: null
    };
  },
  methods: {
    initLevelsCmb: function(s) { this.levelCmb = s; },
    initPreLevelsCmb: function(s) { this.preLevelCmb = s; },
    initTreeView: function(s) { this.treeView = s; },
    refresh: function() {
      var start = Date.now();
      this.treeData = getTreeData(
        this.preLevelCmb.selectedValue,
        this.levelCmb.selectedValue
      );
      this.bindingMsg = wjCore.format(
        "Bound to <b>{cnt:no}</b> nodes in <b>{ms:n0}</b> ms.",
        {
          cnt: this.treeView.totalItemCount,
          ms: Date.now() - start
        }
      );
    }
  }
});

function getTreeData(cnt, levels) {
  var nodes = [];
  for (var i = 0; i < cnt; i++) {
    nodes.push(getNode_(0, i, cnt, levels));
  }
  return nodes;
}

function getNode_(level, id, cnt, levels) {
  // create node
  var node = {
    header: "Node " + (level + 1) + "." + (id + 1)
  };

  // create child nodes
  if (level < levels - 1) {
    node.items = [];
    for (var i = 0; i < cnt; i++) {
      node.items.push(getNode_(level + 1, i, cnt, levels));
    }
  }
  return node;
}

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.container-fluid .wj-treeview {
  height: 350px;
  font-size: 120%;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 6px;
  background: #f0f0f0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.container-fluid .wj-combobox {
  width: 120px;
  margin: 5px;
}
label {
  width: 120px;
  text-align: right;
  margin-bottom: 12px;
}
body {
  margin-bottom: 24pt;
}
</style>
