<template>
    <div class="container-fluid">
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
    import "@grapecity/wijmo.vue2.input";
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData(),
                countries: [
                    "US",
                    "Germany",
                    "UK",
                    "Japan",
                    "Sweden",
                    "Norway",
                    "Denmark"
                ],
                tt: new wijmo.Tooltip()
            };
        },
        methods: {
            flexInitialized: function(flexgrid) {
                flexgrid.resizingColumn.addHandler((s, e) => {
                    let tip = wijmo.format(
                        "Column <b>{col}</b>, width <b>{wid:n0}px</b>",
                        {
                            col: s.columns[e.col].header,
                            wid: s.columns[e.col].width
                        }
                    );
                    this.tt.show(flexgrid.hostElement, tip);
                });
                flexgrid.resizedColumn.addHandler(() => {
                    this.tt.hide();
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
