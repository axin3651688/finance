<template>
    <div class="container-fluid">
        <wj-multi-row
            :itemsSource="newOrders"
            :layoutDefinition="threeLines"
            :showGroups="false"
            :allowAddNew="true"
            :allowDelete="true"
            :initialized="initialized"
        ></wj-multi-row>
        <label>
            <input id="ckbAllNew" type="checkbox" checked @click="onAllNewClick($event)">
            Allow Add New
        </label>
        <br>
        <label>
            <input id="ckbAllDelete" type="checkbox" checked @click="onAllDeleteClick($event)">
            Allow Delete
        </label>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjMultirow from "@grapecity/wijmo.grid.multirow";
import "@grapecity/wijmo.vue2.grid.multirow";

import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            newOrders: null,
            threeLines: null
        };
    },
    methods: {
        onAllNewClick: function(e) {
            this.adMultirow.allowAddNew = e.target.checked;
        },

        onAllDeleteClick: function(e) {
            this.adMultirow.allowDelete = e.target.checked;
        },
        initialized: function(adMultirow) {
            this.adMultirow = adMultirow;
        }
    },
    mounted: function() {
        let appData = getData();
        this.newOrders = appData.addNewOrders;
        this.threeLines = appData.ldThreeLines;
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