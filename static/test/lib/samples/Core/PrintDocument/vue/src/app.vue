<template>
    <div class="container-fluid">
        <p>
            <button class="btn btn-default" @click="printDoc">Print with PrintDocument</button>
            <button class="btn btn-default" @click="printDirect">Print directly</button>
        </p>

        <p>Radial gauges:</p>
        <table id="tblGauge">
            <tr>
            <td>
                <wj-radial-gauge :value=20 :isReadOnly=false></wj-radial-gauge>
            </td>
            <td>
                <wj-radial-gauge :value=80 :isReadOnly=false></wj-radial-gauge>
            </td>
            </tr>
        </table>

        <p>FlexGrid:</p>
        <wj-flex-grid :itemsSource="data" :initialized="initialized"></wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import * as wijmo from '@grapecity/wijmo';
    import * as grid from '@grapecity/wijmo.grid';
    import '@grapecity/wijmo.vue2.gauge';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from './data';

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData()
            };
        },
        methods: {
            printDoc: function() {
                // create PrintDocument
                let doc = new wijmo.PrintDocument({
                    title: 'PrintDocument Test'
                });
                //
                // add CSS explicitly (since we can't use copyCss in jsfiddle)
                doc.append(
                    '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
                );
                doc.append(
                    '<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">'
                );
                //
                // add some simple text
                doc.append("<h1>Printing Example</h1>");
                doc.append(
                    "<p>This document was created using the <b>PrintDocument</b> class.</p>"
                );
                //
                // add existing elements
                doc.append("<h2>Render Existing Elements</h2>");
                doc.append("<p>Check out these gauges:</p>");
                doc.append(document.querySelector("#tblGauge"));
                //
                // add a printer-friendly version of a FlexGrid to the document
                doc.append("<h2>Printer-Friendly FlexGrid</h2>");
                doc.append("<p>And here's a FlexGrid rendered as a table:</p>");
                let tbl = this._renderTable(this.control);
                doc.append(tbl);
                //
                // print the document
                doc.print();
            },
            //
            // render using window.print()
            printDirect: function() {
                window.print();
            },
            // custom grid rendering function: renders grid as a table
            _renderTable: function(flex) {
                // start table
                let tbl = "<table>";
                //
                // headers
                if (flex.headersVisibility & grid.HeadersVisibility.Column) {
                    tbl += "<thead>";
                    for (let r = 0; r < flex.columnHeaders.rows.length; r++) {
                        tbl += this._renderRow(flex.columnHeaders, r);
                    }
                    tbl += "</thead>";
                }
                //
                // body
                tbl += "<tbody>";
                for (let r = 0; r < flex.rows.length; r++) {
                    tbl += this._renderRow(flex.cells, r);
                }
                tbl += "</tbody>";
                //
                // done
                tbl += "</table>";
                return tbl;
            },
            _renderRow: function(panel, r) {
                let tr = "",
                    row = panel.rows[r];
                //
                if (row.renderSize > 0) {
                    tr += "<tr>";
                    //
                    panel.columns.forEach((col, c) => {
                        if (col.renderSize > 0) {
                            // get cell style, content
                            let style = `width:${col.renderSize}px; text-align:${col.getAlignment()}; padding-right: 6px`;
                            let content = panel.getCellData(r, c, true);
                            //
                            if (!row.isContentHtml && !col.isContentHtml) {
                                content = wijmo.escapeHtml(content);
                            }
                            //
                            // add cell to row
                            if (panel.cellType == grid.CellType.ColumnHeader) {
                                tr += `<th style="${style}">${content}</th>`;
                            } else {
                                // show boolean values as checkboxes
                                let raw = panel.getCellData(r, c, false);
                                if (raw === true) {
                                    content = "&#9745;";
                                } else if (raw === false) {
                                    content = "&#9744;";
                                }
                                //
                                tr += `<td style="${style}">${content}</td>`;
                            }
                        }
                    });
                    //
                    tr += "</tr>";
                }
                //
                return tr;
            },
            initialized: function(control) {
                this.control = control;
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .container-fluid .wj-flexgrid {
        height: 250px;
    }

    .container-fluid .wj-gauge {
        max-width: 250px;
    }

    body {
        margin-bottom: 20pt;
    }
</style>