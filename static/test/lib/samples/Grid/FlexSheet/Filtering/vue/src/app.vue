<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet :name="'Country'" :itemsSource="data"></wj-sheet>
        </wj-flex-sheet>
        <button @click="showFilter" type="button" class="btn btn-default">Show Filter</button>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid.sheet";
import * as wjcGrid from '@grapecity/wijmo.grid';
import { getData, getCountries, getProducts } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getData(50),
            products: getProducts(),
            countries: getCountries(),
            flex: null
        };
    },
    methods: {
        initializeFlexSheet: function(flex) {
            flex.deferUpdate(() => {
                let column = flex.columns.getColumn("countryId");
                if (column && !column.dataMap) {
                    column.dataMap = this._buildDataMap(this.countries);
                }
                column = flex.columns.getColumn("productId");
                if (column && !column.dataMap) {
                    column.dataMap = this._buildDataMap(this.products);
                }
                column = flex.columns.getColumn("amount");
                if (column) {
                    column.format = "c2";
                }
            });
            this.flex = flex;
        },
        showFilter: function() {
            this.flex.showColumnFilter();
        },
        _buildDataMap: function(items) {
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
.container-fluid .wj-flexsheet {
    height: 400px;
    margin: 6px 0;
}
</style>
