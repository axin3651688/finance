<template>
    <div class="container-fluid">
        <wj-flex-grid
            :itemsSource="data"
            :autoGenerateColumns="false"
            :alternatingRowStep="0"
            :initialized="onInitialized"
        >
            <wj-flex-grid-column :binding="'country'" :header="'Country'" :allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'customer'" :header="'Customer'" :allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'downloads'" :header="'Downloads'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import * as wjCore from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid";

var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();

var RestrictedMergeManager = (function(_super) {
    __extends(RestrictedMergeManager, _super);
    function RestrictedMergeManager(flexGrid) {
        return _super.call(this, flexGrid) || this;
    }
    RestrictedMergeManager.prototype.getMergedRange = function(p, r, c, clip) {
        if (clip === void 0) {
            clip = true;
        }
        var rng = null;
        rng = new wjGrid.CellRange(r, c);
        var pcol = c > 0 ? c - 1 : c;
        var val = p.getCellData(r, c, false);
        var pval = p.getCellData(r, pcol, false);
        while (
            rng.row > 0 &&
            p.getCellData(rng.row - 1, c, false) == val &&
            p.getCellData(rng.row - 1, pcol, false) == pval
        ) {
            rng.row--;
        }
        while (
            rng.row2 < p.rows.length - 1 &&
            p.getCellData(rng.row2 + 1, c, false) == val &&
            p.getCellData(rng.row2 + 1, pcol, false) == pval
        ) {
            rng.row2++;
        }
        if (rng.isSingleCell) {
            rng = null;
        }
        return rng;
    };
    return RestrictedMergeManager;
})(wjGrid.MergeManager);

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: new wjCore.CollectionView(this.getData(), {
                sortDescriptions: ["customer", "country"]
            })
        };
    },
    methods: {
        getData: function() {
            // create some random data
            var countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                customers = "Paul Smith,Susan Johnson".split(",");
            let data = [];
            for (var i = 0; i < 12; i++) {
                data.push({
                    customer: customers[i % customers.length],
                    country: countries[i % countries.length],
                    downloads: Math.round(Math.random() * 20000),
                    sales: Math.random() * 5000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
        },
        onInitialized: function(flexGrid) {
            flexGrid.mergeManager = new RestrictedMergeManager(flexGrid);
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
  max-height: 300px;
}
body {
  margin-bottom: 24px;
}
</style>