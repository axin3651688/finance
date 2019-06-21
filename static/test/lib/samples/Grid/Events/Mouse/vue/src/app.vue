<template>
    <div class="container-fluid">
        <div id="log">please move the mouse over the grid</div>
        <!-- the grid -->
        <wj-flex-grid
            :itemsSource="data"
            :formatItem="formatFlexGrid"
            :initialized="flexInitialized"
        ></wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import * as wjcGrid from '@grapecity/wijmo.grid';
    import { getData } from './data';

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: new wijmo.CollectionView(getData(), {
                    groupDescriptions: [ 'country' ] // group data by country
                })
            };
        },
        methods: {
            formatFlexGrid: function(s, e) {
                // add 'button' to country cells
                if (e.panel == s.cells) {
                    if (s.columns[e.col].binding == "country") {
                        let html =
                            '<span class="my-button">&#x2b24;</span> ' +
                            e.cell.innerHTML;
                        e.cell.innerHTML = html;
                    }
                }
            },
            flexInitialized: function(flexgrid) {
                flexgrid.addEventListener(flexgrid.hostElement, "mousemove", e => {
                    let ht = flexgrid.hitTest(e);
                    let logText = wijmo.format(
                        "panel <b>{cellType}</b> row <b>{row}</b> col <b>{col}</b>",
                        {
                            cellType: wjcGrid.CellType[ht.cellType],
                            row: ht.row,
                            col: ht.col
                        }
                    );
                    if (e.target.classList.contains("my-button")) {
                        logText += " (fake button!)";
                    } else if (
                        e.target.tagName == "INPUT" &&
                        e.target.type == "checkbox"
                    ) {
                        logText += " (checkbox!)";
                    } else if (ht.panel == flexgrid.cells) {
                        if (flexgrid.rows[ht.row] instanceof wjcGrid.GroupRow) {
                            logText += " (group row)";
                        } else {
                            logText +=
                                " (value: <b>" +
                                flexgrid.cells.getCellData(ht.row, ht.col, true) +
                                "</b>)";
                        }
                    }
                    document.querySelector("#log").innerHTML = logText;
                });
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 220px;
    }
    #log {
        font-style: italic;
        text-align: center;
        margin-bottom: 10px;
        opacity: 0.5;
    }
    .my-button {
        opacity: 0.5;
        margin: 0 6px;
    }
    .my-button:hover {
        color: orange;
    }
    body {
        margin-bottom: 24px;
    }
</style>
