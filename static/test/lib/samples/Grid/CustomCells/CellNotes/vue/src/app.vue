<template>
    <div class="container-fluid">
        <wj-flex-grid
            :alternatingRowStep="0"
            :initialized="initializeGrid"
            :itemsSource="data"
        >
            <wj-flex-grid-column :binding="'country'" header="'Country'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'downloads'" header="'Downloads'" format="'n0'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'active'" header="'Active'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" header="'Sales'" format="'n0'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" header="'Expenses'" format="'n0'"></wj-flex-grid-column>
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
            data: this._getData(200)
        };
    },
    methods: {
        initializeGrid: function(flex) {
            let tooltip = new wjcCore.Tooltip();
            flex.formatItem.addHandler((s, e) => {
                if (e.panel == s.cells) {
                    let item = s.rows[e.row].dataItem,
                        binding = s.columns[e.col].binding,
                        note = item.notes ? item.notes[binding] : null;
                    wjcCore.toggleClass(e.cell, "wj-has-notes", note != null);
                    if (note != null) {
                        tooltip.setTooltip(e.cell, "<b>Note:</b><br/>" + note);
                    }
                }
            });

            // clear all tooltips when updating the view
            flex.updatingView.addHandler(() => {
                tooltip.dispose();
            });
        },

        _getData: function(cnt) {
            let countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                data = [];

            // create the data
            for (let i = 0; i < cnt; i++) {
                data.push({
                    country: countries[i % countries.length],
                    active: i % 5 != 0,
                    downloads: Math.round(Math.random() * 200000),
                    sales: Math.random() * 100000,
                    expenses: Math.random() * 50000
                });
            }

            // add some notes
            for (let i = 0; i < data.length; i++) {
                let item = data[i],
                    notes = {};
                if (item.sales < 5000) {
                    notes.sales =
                        "What's going on in <b>" + item.country + "</b>?";
                }
                if (item.downloads < 20000) {
                    notes.downloads = "Too few downloads, check adwords...";
                }
                if (item.expenses > 40000) {
                    notes.expenses = "We're spending too much here!";
                }
                if (item.country == countries[0] && !item.active) {
                    notes.country = "Why isn't this active?";
                }
                if (Object.keys(notes).length) {
                    item.notes = notes;
                }
            }

            // done
            return data;
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        height: 350px;
    }

    .wj-cell {
        border-color: #e0e0e0;
    }

    .wj-cell.wj-has-notes:after {
        position: absolute;
        content: "";
        width: 0;
        right: 0;
        top: -10px;
        border: 10px solid transparent;
        border-right: 10px solid red;
        opacity: 0.5;
    }

    .wj-cell.wj-has-notes:hover:after {
        opacity: 1;
    }

    body {
        margin-bottom: 24pt;
    }
</style>