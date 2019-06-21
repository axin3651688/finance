<template>
    <div class="container-fluid">
        <wj-multi-row
            :itemsSource="groupedOrders"
            :layoutDefinition="threeLines"
            :showGroups="true"
            :groupHeaderFormat="'{name}: <b>{value} </b>({count:n0} items)'"
            :initialized="initialized"
        ></wj-multi-row>
        <button class="btn" @click="onCollapseClick()">Collapse All</button> 
        <button class="btn" @click="onExpandClick()">Expand All</button> 
        <label>
            <input type="checkbox" checked @click="onShowGroupClick($event)"> 
            Show Groups
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
            groupedOrders: null,
            threeLines: null
        };
    },
    methods: {
        onShowGroupClick: function(e) {
            this.groupMultirow.showGroups = e.target.checked;
        },

        onCollapseClick: function() {
            this.groupMultirow.collapseGroupsToLevel(0);
        },

        onExpandClick: function() {
            this.groupMultirow.collapseGroupsToLevel(10);
        },

        initialized: function(groupMultirow) {
            this.groupMultirow = groupMultirow;
        }
    },
    mounted: function() {
        let appData = getData();
        this.groupedOrders = appData.groupedOrders;
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