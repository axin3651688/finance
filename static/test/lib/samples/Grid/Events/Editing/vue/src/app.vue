<template>
    <div class="container-fluid">
        <div v-html="logText" class="log"></div>
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data" :initialized="flexInitialized">
            <wj-flex-grid-column :binding="'id'" :header="'ID'" :width="50" :isReadOnly="true"></wj-flex-grid-column>
            <wj-flex-grid-column
                :binding="'country'"
                :header="'Country'"
                :isRequired="true"
                :dataMap="countries"
            ></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'" :format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'" :format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'overdue'" :header="'Overdue'"></wj-flex-grid-column>
        </wj-flex-grid>
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
                logText: "please select a range on the grid",
                countries: [
                    "US",
                    "Germany",
                    "UK",
                    "Japan",
                    "Sweden",
                    "Norway",
                    "Denmark"
                ]
            };
        },
        methods: {
            flexInitialized: function(flexgrid) {
                this.logText = "";
                flexgrid.beginningEdit.addHandler((s, e) => {
                    let col = s.columns[e.col];
                    if (col.binding != "overdue") {
                        let item = s.rows[e.row].dataItem;
                        if (item.overdue) {
                            // prevent editing overdue items
                            e.cancel = true;
                            this.logText = "Overdue items cannot be edited";
                        }
                    }
                });
                flexgrid.cellEditEnding.addHandler((s, e) => {
                    this.logText = "";
                    let col = s.columns[e.col];
                    if (col.binding == "sales" || col.binding == "expenses") {
                        let value = wijmo.changeType(
                            s.activeEditor.value,
                            wijmo.DataType.Number,
                            col.format
                        );
                        if (!wijmo.isNumber(value) || value < 0) {
                            // prevent negative sales/expenses
                            e.cancel = true;
                            this.logText = "Please enter a positive amount";
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
    .container-fluid .log {
        font-style: italic;
        text-align: center;
        margin-bottom: 10px;
        opacity: 0.5;
    }
    body {
        margin-bottom: 24px;
    }
</style>
