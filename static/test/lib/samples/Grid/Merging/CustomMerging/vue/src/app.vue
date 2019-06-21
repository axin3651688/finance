<template>
    <div class="container-fluid">
        <wj-flex-grid :initialized="onInitialized"></wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import * as wjCore from "@grapecity/wijmo";
import * as wjGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid";

var __extends =
    (this && this.__extends) ||
    (function() {
        var extendStatics = function(d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                        d.__proto__ = b;
                    }) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function(d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();

var CustomMergeManager = (function(_super) {
    __extends(CustomMergeManager, _super);
    function CustomMergeManager(flexGrid) {
        return _super.call(this, flexGrid) || this;
    }
    CustomMergeManager.prototype.getMergedRange = function(panel, r, c, clip) {
        if (clip === void 0) {
            clip = true;
        }
        var rg = new wjGrid.CellRange(r, c);
        for (var i = rg.col; i < panel.columns.length - 1; i++) {
            if (
                panel.getCellData(rg.row, i, true) !=
                panel.getCellData(rg.row, i + 1, true)
            )
                break;
            rg.col2 = i + 1;
        }
        for (var i = rg.col; i > 0; i--) {
            if (
                panel.getCellData(rg.row, i, true) !=
                panel.getCellData(rg.row, i - 1, true)
            )
                break;
            rg.col = i - 1;
        }
        for (var i = rg.row; i < panel.rows.length - 1; i++) {
            if (
                panel.getCellData(i, rg.col, true) !=
                panel.getCellData(i + 1, rg.col, true)
            )
                break;
            rg.row2 = i + 1;
        }
        for (var i = rg.row; i > 0; i--) {
            if (
                panel.getCellData(i, rg.col, true) !=
                panel.getCellData(i - 1, rg.col, true)
            )
                break;
            rg.row = i - 1;
        }
        return rg;
    };
    return CustomMergeManager;
})(wjGrid.MergeManager);
let App = Vue.extend({
    name: "app",
    methods: {
        onInitialized: function(flexGrid) {
            while (flexGrid.columns.length < 7) {
                flexGrid.columns.push(new wjGrid.Column());
            }
            while (flexGrid.rows.length < 5) {
                flexGrid.rows.push(new wjGrid.Row());
            }

            // configure the grid
            flexGrid.mergeManager = new CustomMergeManager(flexGrid);
            flexGrid.formatItem.addHandler(centerCell);
            flexGrid.rowHeaders.columns[0].width = 80;
            flexGrid.rows.defaultSize = 40;
            flexGrid.alternatingRowStep = 0;
            flexGrid.isReadOnly = true;

            // populate the grid
            setData(
                flexGrid.columnHeaders,
                0,
                ",Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday".split(
                    ","
                )
            );
            setData(
                flexGrid.cells,
                0,
                "12:00,Walker,Morning Show,Morning Show,Sport,Weather,N/A,N/A".split(
                    ","
                )
            );
            setData(
                flexGrid.cells,
                1,
                "13:00,Today Show,Today Show,Sesame Street,Football,Market Watch,N/A,N/A".split(
                    ","
                )
            );
            setData(
                flexGrid.cells,
                2,
                "14:00,Today Show,Today Show,Kid Zone,Football,Soap Opera,N/A,N/A".split(
                    ","
                )
            );
            setData(
                flexGrid.cells,
                3,
                "15:00,News,News,News,News,News,N/A,N/A".split(",")
            );
            setData(
                flexGrid.cells,
                4,
                "16:00,News,News,News,News,News,N/A,N/A".split(",")
            );
        }
    }
});

function setData(p, r, cells) {
    if (p.cellType == wjGrid.CellType.Cell) {
        p.grid.rowHeaders.setCellData(r, 0, cells[0]);
    }
    for (var i = 1; i < cells.length; i++) {
        p.setCellData(r, i - 1, cells[i]);
    }
}

function centerCell(s, e) {
    if (e.cell.children.length == 0) {
        e.cell.innerHTML = "<div>" + e.cell.innerHTML + "</div>";
        wjCore.setCss(e.cell, {
            display: "table",
            tableLayout: "fixed"
        });
        wjCore.setCss(e.cell.children[0], {
            display: "table-cell",
            textAlign: "center",
            verticalAlign: "middle"
        });
    }
}

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    margin-bottom: 12px;
}

body {
    margin-bottom: 24px;
}
</style>