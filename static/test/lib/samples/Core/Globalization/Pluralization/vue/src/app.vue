<template>
  <div class="container-fluid">
    <wj-input-number :step="1" :value="1" :value-changed="valueChanged"></wj-input-number>
    <p>{{ formatValue }}</p>
  </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.input";
import * as wjCore from "@grapecity/wijmo";

let App = Vue.extend({
  name: "app",
  data: function() {
    return {
      data: JSON.stringify({
        count: "count",
        when: {
          0: "No items selected.",
          1: "A single item is selected.",
          2: "A pair is selected.",
          3: "A trio is selected.",
          4: "A quartet is selected.",
          other: "{count:n0} items are selected."
        }
      }),
      value:0
    };
  },
  methods: {
    valueChanged: function(e) {
      this.value = e.value;
    }
  },
  computed: {
    formatValue: function() {
      return wijmo.format(this.data, {
        count: this.value
      });
    }
  }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

