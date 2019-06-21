<template>
  <div class="container-fluid">
    <wj-tree-view
      :itemsSource="lazyItems"
      :displayMemberPath="'header'"
      :childItemsPath="'items'"
      :lazyLoadFunction="lazyLoadFunction"
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

let App = Vue.extend({
  name: "app",
  data: function() {
    return {
      lazyItems: getData(),
    };
  },
  methods: {
    lazyLoadFunction:function(node, callback) {
      setTimeout(function() {
        // simulate http delay
        var result = [
          // simulate result
          { header: "Another lazy node...", items: [] },
          { header: "A non-lazy node without children" },
          {
            header: "A non-lazy node with child nodes",
            items: [{ header: "hello" }, { header: "world" }]
          }
        ];
        callback(result); // return result to control
      }, 2500); // 2.5sec http delay
    }
  }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
/* default trees on this sample */
.container-fluid .wj-treeview {
  display: block;
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
