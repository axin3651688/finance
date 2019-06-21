<template>
    <div class="container-fluid">
        <button class="btn btn-default" @click="printDoc()">Print with PrintDocument</button>
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data" :initialized="initialized"></wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import { getData } from "./data";
import { WjGridModule } from "@grapecity/wijmo.vue2.grid";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";

new Vue({
    el: "#app",
    data: {
        data: getData()
    },
    methods: {
        initialized: function(flex) {
            this.flex = flex;
        },
        printDoc: function() {
            // create PrintDocument
            let doc = new wjcCore.PrintDocument({
                title: "PrintDocument Test",
                copyCss: false // prevent cross-origin issues in jsfiddle
            });
            // add CSS explicitly (since we can't use copyCss in jsfiddle)
            doc.append(
                '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
            );
            doc.append(
                '<link href="http://cdn.wijmo.com/5.latest/styles/wijmo.min.css" rel="stylesheet">'
            );
            // add some simple text
            doc.append("<h1>Printing Example</h1>");
            doc.append(
                "<p>This document was created using the <b>PrintDocument</b> class.</p>"
            );
            // add a printer-friendly version of a FlexGrid to the document
            doc.append("<p>Here's a FlexGrid rendered as a table:</p>");
            let tbl = this.renderTable(this.flex);
            doc.append(tbl);
            // print the document
            doc.print();
        },

        // renders grid as a table
        renderTable: function() {
            // start table
            let tbl = "<table>";
            // headers
            if (this.flex.headersVisibility & wjcGrid.HeadersVisibility.Column) {
                tbl += "<thead>";
                for (let r = 0; r < this.flex.columnHeaders.rows.length; r++) {
                    tbl += this.renderRow(this.flex.columnHeaders, r);
                }
                tbl += "</thead>";
            }
            // body
            tbl += "<tbody>";
            for (let r = 0; r < this.flex.rows.length; r++) {
                tbl += this.renderRow(this.flex.cells, r);
            }
            tbl += "</tbody>";
            // done
            tbl += "</table>";
            return tbl;
        },

        renderRow: function(panel, r) {
            let tr = "",
                row = panel.rows[r];
            if (row.renderSize > 0) {
                tr += "<tr>";
                for (let c = 0; c < panel.columns.length; c++) {
                    let col = panel.columns[c];
                    if (col.renderSize > 0) {
                        // get cell style, content
                        let style =
                            "width:" +
                            col.renderSize +
                            "px;" +
                            "text-align:" +
                            col.getAlignment() +
                            ";" +
                            "padding-right: 6px";
                        let content = panel.getCellData(r, c, true);
                        if (!row.isContentHtml && !col.isContentHtml) {
                            content = wjcCore.escapeHtml(content);
                        }
                        // add cell to row
                        if (panel.cellType == wjcGrid.CellType.ColumnHeader) {
                            tr +=
                                '<th style="' +
                                style +
                                '">' +
                                content +
                                "</th>";
                        } else {
                            // show boolean values as checkboxes
                            let raw = panel.getCellData(r, c, false);
                            if (raw === true) {
                                content = "&#9745;";
                            } else if (raw === false) {
                                content = "&#9744;";
                            }
                            tr +=
                                '<td style="' +
                                style +
                                '">' +
                                content +
                                "</td>";
                        }
                    }
                }
                tr += "</tr>";
            }
            return tr;
        }
    }
});
</script>

<style>
.wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
}
body {
    margin-bottom: 20pt;
}
</style>