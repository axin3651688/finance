<template>
    <div class="container-fluid">
        <p>{{itemCount}}</p>
        <!-- the grid -->
        <wj-flex-grid :itemsSource="customers" :initialized="flexInitialized">
            <wj-flex-grid-filter></wj-flex-grid-filter>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcCore from "@grapecity/wijmo";
import "@grapecity/wijmo.vue2.grid.filter";
import { ODataCollectionView } from "@grapecity/wijmo.odata";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            itemCount: "",
            customers: new ODataCollectionView("https://services.odata.org/Northwind/Northwind.svc", "Customers", {
                sortOnServer: true,
                filterOnServer: true
            })
        };
    },
    methods: {
        flexInitialized(flexgrid) {
            flexgrid.loadedRows.addHandler(() => {
                this.itemCount = flexgrid.rows.length + " items";
            });
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