<template>
    <div class="container-fluid">
        <wj-flex-grid :items-source="view"></wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import * as wijmo from "@grapecity/wijmo";
    import { getData } from "./data";
    import { WjGridModule } from "@grapecity/wijmo.vue2.grid";

    new Vue({
        el: "#app",
        computed: {
            view: function() {
                let data = getData().sort((a, b) => {
                    return a.country < b.country
                        ? -1
                        : a.country > b.country
                        ? +1
                        : a.id - b.id;
                });
                return new wijmo.CollectionView(data, { useStableSort: true });
            }
        }
    });
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 250px;
        margin-bottom: 12px;
    }

    .header {
        display: inline-block;
        width: 150px;
        text-align: right;
        font-weight: normal;
    }
</style>
