<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data">
            <wj-flex-grid-filter :initialized="initialized"></wj-flex-grid-filter>
        </wj-flex-grid>
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

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: this.getData()
        };
    },
    methods: {
        getData: function() {
            // create some random data
            let countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                data = [];
            for (let i = 0; i < 200; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    rating: Math.round(Math.random() * 5),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
        },
        initialized: function(filter) {
            this.filter = filter;
        }
    },
    mounted: function() {
        let filterRating = this.filter.getColumnFilter("rating");
        filterRating.valueFilter.uniqueValues = [0, 1, 2, 3, 4, 5];
        // limit number of values shown in sales filter
        let filterSales = this.filter.getColumnFilter("sales");
        filterSales.valueFilter.maxValues = 20;
        // filter expenses only by condition
        let filterExpenses = this.filter.getColumnFilter("expenses");
        filterExpenses.filterType = wjcGridFilter.FilterType.Condition;
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