<template>
    <div class="container-fluid">
        <div class="input-group">
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-search"></span>
            </div>
            <input @input="filter($event)" class="form-control" placeholder="Country Filter">
        </div>
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

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: this.getData()
        };
    },
    methods: {
        filter: function(e) {
            let filter = e.target.value.toLowerCase();
            this.flex.collectionView.filter = item => {
                return (
                    filter.length == 0 ||
                    item.country.toLowerCase().indexOf(filter) > -1
                );
            };
        },
        getData: function() {
            // create some random data
            let countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                data = [];
            for (let i = 0; i < 200; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    downloads: Math.round(Math.random() * 20000),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
        },
        initialized: function(flex) {
            this.flex = flex;
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
}
body {
    margin-bottom: 20px;
}
</style>