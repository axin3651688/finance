<template>
    <div class="container-fluid">
        <wj-group-panel
            style="display: block;"
            :grid="flex"
            :placeholder="'Drag columns here to create groups'"
        ></wj-group-panel>
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data" :initialized="initialized"></wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid.filter";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGridFilter from "@grapecity/wijmo.grid.filter";
import "@grapecity/wijmo.vue2.grid.grouppanel";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: this.getData(),
            flex: null
        };
    },
    methods: {
        initialized: function(flex) {
            this.flex = flex;
        },
        getData: function() {
            // create some random data
            let countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                products = "Phones,Computers,Cameras,Stereos".split(","),
                data = [];
            for (let i = 0; i < 200; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    product: products[i % products.length],
                    downloads: Math.round(100 + Math.random() * 10000),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }

            return data;
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
  max-height: 200px;
  margin-bottom: 12px;
}

body {
  margin-bottom: 24px;
}
</style>