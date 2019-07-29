<template>
    <div class="container-fluid">
        <wj-multi-row
            :itemsSource="orders"
            :layoutDefinition="threeLines"
            :initialized="initialized"
        ></wj-multi-row>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjMultirow from "@grapecity/wijmo.grid.multirow";
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import '@grapecity/wijmo.vue2.grid.multirow';
import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            orders: null,
            threeLines: null
        };
    },
    methods: {
        initialized: function(filterMultirow) {
            this.filterMultirow = filterMultirow;
        }
    },
    mounted: function() {
        let appData = getData();
        this.orders = appData.orders;
        this.threeLines = appData.ldThreeLines;
        new wjGridFilter.FlexGridFilter(this.filterMultirow);
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-multirow {
    height: 400px;
    margin: 6px 0;
}
</style>