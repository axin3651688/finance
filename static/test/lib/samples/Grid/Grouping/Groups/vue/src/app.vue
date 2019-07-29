<template>
    <div class="container-fluid">
        <p>This example groups the data by country and by product:</p>
        <wj-flex-grid :itemsSource="gridData" :initialized="initializeGrid"></wj-flex-grid>
        <p>
            This example groups the data by country and product, and
            hides those columns to achieve a cleaner appearance:
        </p>
        <wj-flex-grid :itemsSource="hideColsGridData" :initialized="initializeHideColsGrid">
            <wj-flex-grid-column :binding="'country'" :header="'Country'" :visible="false"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'product'" :header="'Product'" :visible="false"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'downloads'" :header="'Downloads'" :width="'*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'" :width="'*'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'" :width="'*'"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid.filter";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGridFilter from "@grapecity/wijmo.grid.filter";
import "@grapecity/wijmo.vue2.grid.grouppanel";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            products: ["Phones", "Computers", "Cameras", "Stereos"],
            countries: ["US", "Germany", "UK", "Japan", "Italy", "Greece"],
            gridData: null,
            hideColsGridData: null,
        };
    },
    methods: {
        initializeGrid: function(grid) {
            grid.select(new wjcGrid.CellRange(0, 0), true);
        },
        initializeHideColsGrid: function(hideColsGrid) {
            setTimeout(() => {
                hideColsGrid.select(new wjcGrid.CellRange(0, 2), true);
            });
        },
        getData: function() {
            // generate some random data
            let data = [];
            for (let i = 0; i < 200; i++) {
                data.push({
                    id: i,
                    country: this.countries[i % this.countries.length],
                    product: this.products[i % this.products.length],
                    downloads: Math.round(100 + Math.random() * 10000),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }

            return data;
        }
    },
    created: function() {
        var dataSource = this.getData();
        this.gridData = new wjcCore.CollectionView(dataSource, {
            sortDescriptions: ["country", "product"],
            groupDescriptions: ["country", "product"]
        });
        this.hideColsGridData = new wjcCore.CollectionView(dataSource, {
            sortDescriptions: ["country", "product"],
            groupDescriptions: ["country", "product"]
        });
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
}
body {
    margin-bottom: 20px;
}
</style>