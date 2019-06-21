<template>
    <div class="container-fluid">
        <wj-flex-grid :itemsSource="view" :allowAddNew="true" :allowDelete="true"></wj-flex-grid>

        <h3>Edited Items:</h3>
        <wj-flex-grid class="changed edited" :itemsSource="view.itemsEdited" :isReadOnly="true"></wj-flex-grid>

        <h3>Added Items:</h3>
        <wj-flex-grid class="changed added" :itemsSource="view.itemsAdded" :isReadOnly="true"></wj-flex-grid>

        <h3>Removed Items:</h3>
        <wj-flex-grid class="changed removed" :itemsSource="view.itemsRemoved" :isReadOnly="true"></wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import * as wijmo from "@grapecity/wijmo";
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                view: new wijmo.CollectionView(getData(), {
                    sortDescriptions: ["country"],
                    trackChanges: true
                })
            };
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .container-fluid .changed {
        font-size: 90%;
        background-color: #f0f0f0
    }

    .container-fluid .edited {
        color: orange
    }

    .container-fluid .added {
        color: green
    }

    .container-fluid .removed {
        color: red
    }
</style>