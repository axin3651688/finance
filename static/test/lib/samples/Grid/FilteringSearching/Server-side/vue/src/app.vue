<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data">
            <wj-flex-grid-filter></wj-flex-grid-filter>
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
import * as wjcGridFilter from '@grapecity/wijmo.grid.filter';
import * as wjcOData from '@grapecity/wijmo.odata';

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: new wjcOData.ODataCollectionView(
                "https://services.odata.org/Northwind/Northwind.svc",
                "Customers",
                {
                    filterOnServer: true,
                    sortOnServer: true
                }
            )
        };
    },
    methods: {
        initialized: function(filter) {
            filter.defaultFilterType = wjcGridFilter.FilterType.Condition;
        }
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