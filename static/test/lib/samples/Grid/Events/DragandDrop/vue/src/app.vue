<template>
    <div class="container-fluid">
        <p>Drag rows from the grid by the row header:</p>
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data" :initialized="initGrid"></wj-flex-grid>
        <p>And drop them here:</p>
        <div id="theTarget" style="height:100px;background-color:#e0e0e0;padding:6px;border-radius:2px;">Drop rows here...</div>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import * as wjcGrid from '@grapecity/wijmo.grid';
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData(),
                flex: null
            };
        },
        methods: {
            initGrid: function(grid) {
                this.flex = grid;
            },
            // make grid rows draggable
            _makeDragSource: function(s) {
                // make rows draggable
                s.itemFormatter = (panel, r, c, cell) => {
                    if (panel.cellType == wjcGrid.CellType.RowHeader) {
                        cell.textContent = (r + 1).toString();
                        cell.draggable = true;
                    }
                };
                // disable built-in row drag/drop
                s.addEventListener(
                    s.hostElement,
                    "mousedown",
                    e => {
                        if (s.hitTest(e).cellType == wjcGrid.CellType.RowHeader) {
                            e.stopPropagation();
                        }
                    },
                    true
                );
                // handle drag start
                s.addEventListener(
                    s.hostElement,
                    "dragstart",
                    e => {
                        let ht = s.hitTest(e);
                        if (ht.cellType == wjcGrid.CellType.RowHeader) {
                            s.select(
                                new wjcGrid.CellRange(
                                    ht.row,
                                    0,
                                    ht.row,
                                    s.columns.length - 1
                                )
                            );
                            e.dataTransfer.effectAllowed = "copy";
                            e.dataTransfer.setData("text", ht.row.toString());
                        }
                    },
                    true
                );
            },
            // enable drop operations on an element
            _makeDropTarget: function(s) {
                s.addEventListener("dragover", e => {
                    let dragRow = e.dataTransfer.getData("text");
                    if (dragRow != null) {
                        e.dataTransfer.dropEffect = "copy";
                        e.preventDefault();
                    }
                });
                s.addEventListener("drop", e => {
                    let dragRow = e.dataTransfer.getData("text");
                    if (dragRow != null) {
                        let item = this.flex.rows[parseInt(dragRow)].dataItem;
                        alert(
                            "thanks for dropping row " +
                                JSON.stringify(item) +
                                " here."
                        );
                        e.preventDefault();
                    }
                });
            }
        },
        mounted: function() {
            this._makeDragSource(this.flex);
            this._makeDropTarget(document.querySelector("#theTarget"));
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 250px;
        margin-bottom: 12px;
    }
    body {
        margin-bottom: 24pt;
    }
</style>
