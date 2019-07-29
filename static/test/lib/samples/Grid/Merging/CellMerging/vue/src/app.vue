<template>
    <div class="container-fluid">
        <wj-flex-grid
            :itemsSource="data"
            :allowMerging="'Cells'"
            :isReadOnly="true"
            :alternatingRowStep="0"
            :autoGenerateColumns="true"
        >
            <wj-flex-grid-column :binding="'country'" :header="'Country'" :allowMerging="true"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'" :format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'" :format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'active'" :header="'Active'" :allowMerging="true"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import * as wjCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: new wjCore.CollectionView(this.getData(), {
                sortDescriptions: ["country", "active"]
            })
        };
    },
    methods: {
        getData: function() {
            var countries = "US,Germany,UK,Japan".split(",");
            var data = [];
            for (var i = 0; i < 20; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    active: i % 5 != 0,
                    downloads: Math.round(Math.random() * 200000),
                    sales: Math.random() * 100000,
                    expenses: Math.random() * 50000
                });
            }
            return data;
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
  max-height: 200px;
  margin-bottom: 12px;
}

body {
  margin-bottom: 24px;
}
</style>