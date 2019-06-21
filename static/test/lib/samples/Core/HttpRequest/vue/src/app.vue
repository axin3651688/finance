<template>
    <div class="container-fluid">
        <wj-flex-grid v-if="data" :isReadOnly="true" :itemsSource="data">
            <wj-flex-grid-column :binding="'CategoryID'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'CategoryName'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'Description'" :width="'*'"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wijmo from "@grapecity/wijmo";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: []
        };
    },
    created: function() {
        wijmo.httpRequest(
            "https://services.odata.org/Northwind/Northwind.svc/Categories",
            {
                data: {
                    $format: "json",
                    $select: "CategoryID,CategoryName,Description"
                },
                success: xhr => {
                    this.data = JSON.parse(xhr.responseText).value;
                }
            }
        );
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 200px;
    }
</style>
