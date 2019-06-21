<template>
    <div class="container-fluid">
        <wj-flex-grid
            :isReadOnly="true"
            :allowResizing="'None'"
            :allowDragging="'None'"
            :allowSorting="false"
            :selectionMode="'RowRange'"
            :alternatingRowStep="0"
            :initialized="initializeGrid"
            :itemsSource="data"
        >
            <wj-flex-grid-column :binding="'id'" :header="'ID'" :width="50"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'country'" :header="'Country'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'" :width="80" :format="'n0'"></wj-flex-grid-column>
            <wj-flex-grid-column
                :binding="'salesDiff'"
                :header="'Diff'"
                :dataType="'Number'"
                :width="80"
                :format="'p0'"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
                :binding="'expenses'"
                :header="'Expenses'"
                :width="80"
                :format="'n0'"
            ></wj-flex-grid-column>
            <wj-flex-grid-column
                :binding="'expensesDiff'"
                :header="'Diff'"
                :dataType="'Number'"
                :width="80"
                :format="'p0'"
            ></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: this._getData()
        };
    },
    methods: {
        initializeGrid(flex) {
            // insert extra column header row
            let ch = flex.columnHeaders,
                hr = new wjcGrid.Row();
            ch.rows.insert(0, hr);

            // fill out headings in extra header row
            for (let i = 0; i < flex.columns.length; i++) {
                let hdr = ch.getCellData(1, i, false);
                if (hdr == "Diff") {
                    hdr = ch.getCellData(1, i - 1, false);
                }
                ch.setCellData(0, i, hdr);
            }

            // allow merging across and down extra header row
            flex.allowMerging = wjcGrid.AllowMerging.ColumnHeaders;
            hr.allowMerging = true;
            flex.columns[0].allowMerging = true;
            flex.columns[1].allowMerging = true;

            // custom rendering for headers and "Diff" columns
            flex.formatItem.addHandler((s, e) => {
                // center-align column headers
                if (e.panel == s.columnHeaders) {
                    e.cell.innerHTML =
                        '<div class="v-center">' + e.cell.innerHTML + "</div>";
                }

                // custom rendering for "Diff" columns
                if (e.panel == s.cells) {
                    let col = s.columns[e.col];
                    if (
                        e.row > 0 &&
                        (col.binding == "salesDiff" ||
                            col.binding == "expensesDiff")
                    ) {
                        let vnow = s.getCellData(e.row, e.col - 1),
                            vprev = s.getCellData(e.row - 1, e.col - 1),
                            diff = vnow / vprev - 1;

                        // format the cell
                        let html =
                            '<div class="diff-{cls}">' +
                            '<span style="font-size:75%">{val}</span> ' +
                            '<span style="font-size:120%" class="wj-glyph-{glyph}"></span>';
                        html = html.replace(
                            "{val}",
                            wjcCore.Globalize.format(diff, col.format)
                        );
                        if (diff < 0.01) {
                            html = html
                                .replace("{cls}", "down")
                                .replace("{glyph}", "down");
                        } else if (diff > 0.01) {
                            html = html
                                .replace("{cls}", "up")
                                .replace("{glyph}", "up");
                        } else {
                            html = html
                                .replace("{cls}", "none")
                                .replace("{glyph}", "circle");
                        }
                        e.cell.innerHTML = html;
                    }
                }
            });
        },

        _getData: function() {
            // generate some random data
            let countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                data = [];
            for (let i = 0; i < 200; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
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
    .wj-cell .v-center {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        white-space: pre-wrap;
    }
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) .diff-none {
        color: #d8b400;
    }
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) .diff-up {
        color: #4c8f00;
    }
    .wj-cell:not(.wj-state-selected):not(.wj-state-multi-selected) .diff-down {
        color: #9f0000;
    }
    body {
        margin-bottom: 20px;
    }
</style>