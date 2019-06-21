<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data" :initialized="flexInitialized"></wj-flex-grid>
        <p>
            The grid now has {{rowCount}} rows and
            {{cellCount}} cell elements.
        </p>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcCore from "@grapecity/wijmo";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: this._getData(100),
            rowCount: "",
            cellCount: ""
        };
    },
    methods: {
        flexInitialized: function(flexgrid) {
            this.rowCount = flexgrid.rows.length.toString();
            this.cellCount = flexgrid.hostElement
                .querySelectorAll(".wj-cell")
                .length.toString();
            flexgrid.updatedView.addHandler((s, e) => {
                this.rowCount = s.rows.length.toString();
                this.cellCount = s.hostElement
                    .querySelectorAll(".wj-cell")
                    .length.toString();
            });
            flexgrid.scrollPositionChanged.addHandler((s, e) => {
                // if we're close to the bottom, add 20 items
                if (s.viewRange.bottomRow >= s.rows.length - 1) {
                    this._addData(this.data, 20);
                    s.collectionView.refresh();
                }
            });
        },

        _getData: function(cnt, start) {
            let data = [];
            let countries = "USA,Germany,UK,Japan,Italy,Greece".split(",");
            if (start == null) {
                start = 0;
            }
            for (let i = 0; i < cnt; i++) {
                data.push({
                    id: i + start,
                    country: countries[i % countries.length],
                    date: new Date(2014, i % 12, i % 28),
                    amount: Math.random() * 10000,
                    active: i % 4 === 0
                });
            }
            return data;
        },

        // add random data to an array
        _addData: function(data, cnt) {
            let more = this._getData(cnt, data.length);
            for (let i = 0; i < more.length; i++) {
                data.push(more[i]);
            }
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    height: 400px;
    margin: 6px 0;
}
</style>