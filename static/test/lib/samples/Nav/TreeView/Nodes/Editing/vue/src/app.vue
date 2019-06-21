<template>
  <div class="container-fluid">
    <wj-tree-view
      :itemsSource="data"
      :displayMemberPath="'header'"
      :childItemsPath="'items'"
      :isReadOnly="false"
      :node-edit-starting="onNodeEditStarting"
    ></wj-tree-view>
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
    onNodeEditStarting: function(s, e) {
      if (e.node.hasChildren) {
        e.cancel = true;
      }
    }
  }
});
</script>

<style>
/* icon shown next to new items */
.new-icon {
  margin-left: 12px;
  transform: rotate(-30deg);
}

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
