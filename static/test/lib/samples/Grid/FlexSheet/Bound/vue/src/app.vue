<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet id="sample-sheet" :initialized="initializeFlexSheet">
            <wj-sheet :name="'Country'" :itemsSource="data"></wj-sheet>
        </wj-flex-sheet>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcSheet from "@grapecity/wijmo.grid.sheet";
import * as wjcGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid.sheet";

import { getData, countries, products } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getData(50),
            countries: countries,
            products: products
        };
    },
    methods: {
        initializeFlexSheet: function(flex) {
            flex.deferUpdate(() => {
                let column = flex.columns.getColumn("countryId");
                if (column && !column.dataMap) {
                    column.dataMap = this.buildDataMap(this.countries);
                }
                column = flex.columns.getColumn("productId");
                if (column && !column.dataMap) {
                    column.dataMap = this.buildDataMap(this.products);
                }
                column = flex.columns.getColumn("amount");
                if (column) {
                    column.format = "c2";
                }
            });
        },

        // build a data map from a string array using the indices as keys
        buildDataMap: function(items) {
            let map = [];
            for (let i = 0; i < items.length; i++) {
                map.push({ key: i, value: items[i] });
            }
            return new wjcGrid.DataMap(map, "key", "value");
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
#sample-sheet {
    height: 400px;
    margin: 6px 0;
}
</style>