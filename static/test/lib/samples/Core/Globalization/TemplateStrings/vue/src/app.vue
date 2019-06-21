<template>
  <div class="container-fluid">
    <button class="btn btn-default" @click="format1">Show First Result</button>
    <button class="btn btn-default" @click="format2">Show Second Result</button>
  </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.nav";
import * as wijmo from "@grapecity/wijmo";

let App = Vue.extend({
  name: "app",
  methods: {
    format1:function() {
        let msg = wijmo.format('Welcome {name}! You have {miles:n0} miles in your account.', {
            name: 'Joe',
            miles: 2332123
        });
        alert(msg);
    },

    format2:function() {
        let msg = wijmo.format('{name}, thanks for being a customer since {date:D}.', {
            name: 'Joe',
            date: new Date()
        });
        alert(msg);
    }
  }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>
