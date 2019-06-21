<template>
    <div class="container-fluid">
        <p v-html="selectedItem"></p>
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data" :initialized="flexInitialized">
            <wj-flex-grid-column :header="'Country'" :binding="'country'" width="2*"></wj-flex-grid-column>
            <wj-flex-grid-column :header="'Sales'" :binding="'sales'" width="*" format="n2"></wj-flex-grid-column>
            <wj-flex-grid-column :header="'Expenses'" :binding="'expenses'" width="*" format="n2"></wj-flex-grid-column>
        </wj-flex-grid>
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
            data: this._getData(),
            selectedItem: ""
        };
    },
    methods: {
        flexInitialized: function(flexgrid) {
            this.flex = flexgrid;
            // sort the data by country
            let sd = new wjcCore.SortDescription("country", true);
            flexgrid.collectionView.sortDescriptions.push(sd);
            flexgrid.collectionView.currentChanged.addHandler(
                this._updateCurrentInfo.bind(this)
            );
            this._updateCurrentInfo();
        },

        _getData: function() {
            // create some random data
            let countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                data = [];
            for (let i = 0; i < countries.length; i++) {
                data.push({
                    id: i,
                    country: countries[i],
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }

            return data;
        },

        _updateCurrentInfo: function() {
            this.selectedItem = wjcCore.format(
                "Country: <b>{country}</b>, Sales: <b>{sales:c0}</b> Expenses: <b>{expenses:c0}</b>",
                this.flex.collectionView.currentItem
            );
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