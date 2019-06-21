<template>
    <div class="container-fluid">
        <wj-multi-row
            id="chMultirow"
            :itemsSource="orders"
            :layoutDefinition="threeLines"
            :collapsedHeaders="true"
            :showHeaderCollapseButton="true"
            :collapsedHeadersChanged="collapsedHeadersChanged"
            :initialized="initializeMultirow"
        ></wj-multi-row>
        <div>
            <label for="cbCollapsedHeaders">Collapsed Headers 
                <wj-combo-box
                    :displayMemberPath="'name'"
                    :selectedValuePath="'value'"
                    :itemsSource="cbCollapsedHeadersSource"
                    :selectedValue="collapsedHeaders"
                    :selectedIndexChanged="selectedIndexChanged"
                    :initialized="initializeCollapsedHeaders"></wj-combo-box>
            </label> 
            <label for="cbshowHeaderCollapseButton">Show Header Collapse Button 
                <input type="checkbox" checked @click="onShowHeaderCollapseButton($event)">
            </label>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjMultirow from "@grapecity/wijmo.grid.multirow";
import "@grapecity/wijmo.vue2.grid.multirow";
import { getData } from "./data";
import * as wjInput from '@grapecity/wijmo.input';
import '@grapecity/wijmo.vue2.input';

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            orders: null,
            threeLines: null,
            cbCollapsedHeadersSource: null,
            collapsedHeaders: null
        };
    },
    methods: {
        collapsedHeadersChanged: function() {
            this.cbCollapsedHeaders.selectedValue = this.chMultirow.collapsedHeaders;
        },

        selectedIndexChanged: function() {
            this.chMultirow.collapsedHeaders = this.cbCollapsedHeaders.selectedValue;
        },

        onShowHeaderCollapseButton: function(e) {
            this.chMultirow.showHeaderCollapseButton = e.target.checked;
        },

        initializeMultirow: function(chMultirow) {
            this.chMultirow = chMultirow;
            this.collapsedHeaders = chMultirow.collapsedHeaders;
        },

        initializeCollapsedHeaders: function(cbCollapsedHeaders) {
            this.cbCollapsedHeaders = cbCollapsedHeaders;
        }
    },
    mounted: function() {
        let appData = getData();
        this.orders = appData.orders;
        this.threeLines = appData.ldThreeLines;
        this.cbCollapsedHeadersSource = [
            { name: "true", value: true },
            { name: "false", value: false },
            { name: "null", value: null }
        ];
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
#chMultirow {
    height: 400px;
    width: 600px;
    margin: 6px 0;
}

.wj-combobox {
  width: 120px;
}
</style>