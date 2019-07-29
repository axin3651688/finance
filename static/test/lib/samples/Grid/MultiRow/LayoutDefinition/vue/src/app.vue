<template>
    <div class="container-fluid">
        <label><wj-combo-box
            :itemsSource="this.layoutDefs"
            :displayMemberPath="'name'"
            :selectedIndexChanged="selectedIndexChanged"
        ></wj-combo-box></label>
        <p v-html="layoutDescription"></p>
        <wj-multi-row
            :itemsSource="orders"
            :layoutDefinition="this.layoutDefs.currentItem.def"
            :initialized="initialized"
        ></wj-multi-row>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjMultirow from "@grapecity/wijmo.grid.multirow";
import "@grapecity/wijmo.vue2.grid.multirow";
import "@grapecity/wijmo.vue2.input";
import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            orders: null,
            layoutDefs: null,
            layoutDescription: null,
        };
    },
    methods: {
        selectedIndexChanged: function() {
            let layoutDef = this.layoutDefs.currentItem;
            if (layoutDef) {
                this.multirow.layoutDefinition = layoutDef.def;
                this.layoutDescription = layoutDef.description;
            }
        },
        initialized: function(multirow) {
            this.multirow = multirow;
        }
    },
    created: function() {
        let appData = getData();
        this.orders = appData.orders;
        this.layoutDefs = appData.layoutDefs;
        this.layoutDescription = this.layoutDefs.currentItem.description;
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