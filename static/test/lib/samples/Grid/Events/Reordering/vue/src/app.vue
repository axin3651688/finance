<template>
    <div class="container-fluid">
        <p>
            For example, the grid below does not allow dragging
            the 'country' column to the last or first positions:
        </p>
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data" :initialized="flexInitialized"></wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData(),
                _theColumn: ''
            };
        },
        methods: {
            flexInitialized: function(flexgrid) {
                // prevent 'country' column from being dragged to index 0
                flexgrid.draggingColumn.addHandler((s, e) => {
                    this._theColumn = s.columns[e.col].binding;
                });
                flexgrid.draggingColumnOver.addHandler((s, e) => {
                    if (this._theColumn == "country") {
                        if (e.col == 0 || e.col == s.columns.length - 1) {
                            e.cancel = true;
                        }
                    }
                });
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
