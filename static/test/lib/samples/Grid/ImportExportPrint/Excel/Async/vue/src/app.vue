<template>
    <div class="container-fluid">
        <div class="row">
            <!-- the grid -->
            <wj-flex-grid :itemsSource="data" :initialized="initializeFlexSheet">
                <wj-flex-grid-column header="ID" binding="id"></wj-flex-grid-column>
                <wj-flex-grid-column header="Start Date" binding="start" format="d"></wj-flex-grid-column>
                <wj-flex-grid-column header="End Date" binding="end" format="d"></wj-flex-grid-column>
                <wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
                <wj-flex-grid-column header="Product" binding="product"></wj-flex-grid-column>
                <wj-flex-grid-column header="Color" binding="color" :width="70"></wj-flex-grid-column>
                <wj-flex-grid-column header="Amount" binding="amount" format="c" aggregate="Sum"></wj-flex-grid-column>
                <wj-flex-grid-column header="Pending" binding="amount2" format="c2" aggregate="Sum"></wj-flex-grid-column>
                <wj-flex-grid-column
                    header="Discount"
                    binding="discount"
                    format="p1"
                    aggregate="Avg"
                ></wj-flex-grid-column>
                <wj-flex-grid-column header="Active" binding="active" :width="170"></wj-flex-grid-column>
            </wj-flex-grid>
        </div>
        <div class="row">
            <div class="col-md-6 col-xs-12">
                <div class="form-inline well well-lg">
                    <input
                        type="file"
                        class="form-control"
                        style="width: 250px;"
                        id="importFile"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12"
                    >
                    <button @click="load()" class="btn btn-default">Import</button>
                    <div class="checkbox">
                        <label>
                            <input v-model="includeColumnHeader" type="checkbox"> Include Column Header
                        </label>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xs-12">
                <div class="form-inline well well-lg">
                    <button @click="save()" class="btn btn-default">Export</button>
                    <div class="checkbox">
                        <label>
                            <input v-model="includeColumnHeader" type="checkbox"> Include Column Header
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input v-model="customContent" type="checkbox"> Custom Cell Content
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import { getProductOrders } from "./data";
import { WjGridModule } from "@grapecity/wijmo.vue2.grid";
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcXlsx from '@grapecity/wijmo.xlsx';
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx';
import * as gridPdf from "@grapecity/wijmo.grid.pdf";

new Vue({
    el: "#app",
    data: {
        data: getProductOrders(500),
        fileName: "",
        includeColumnHeader: true,
        customContent: false
    },
    methods: {
        initializeFlexSheet: function(flex) {
            this.flex = flex;
            let groupNames = ["Product", "Country", "Amount"],
                cv,
                propName,
                groupDesc;

            // get the collection view, start update
            cv = flex.collectionView;
            cv.beginUpdate();

            // clear existing groups
            cv.groupDescriptions.clear();

            // add new groups
            for (let i = 0; i < groupNames.length; i++) {
                propName = groupNames[i].toLowerCase();
                if (propName == "amount") {
                    // group amounts in ranges
                    // (could use the mapping function to group countries into continents,
                    // names into initials, etc)
                    groupDesc = new wjcCore.PropertyGroupDescription(
                        propName,
                        (item, prop) => {
                            let value = item[prop];
                            if (value > 1000) return "Large Amounts";
                            if (value > 100) return "Medium Amounts";
                            if (value > 0) return "Small Amounts";
                            return "Negative";
                        }
                    );
                    cv.groupDescriptions.push(groupDesc);
                } else if (propName) {
                    // group other properties by their specific values
                    groupDesc = new wjcCore.PropertyGroupDescription(propName);
                    cv.groupDescriptions.push(groupDesc);
                }
            }

            // done updating
            cv.endUpdate();
        },

        save() {
            wjcGridXlsx.FlexGridXlsxConverter.saveAsync(
                this.flex,
                {
                    includeColumnHeaders: this.includeColumnHeader,
                    includeCellStyles: false,
                    formatItem: this.customContent
                        ? this._exportFormatItem
                        : null
                },
                "FlexGrid.xlsx"
            );
        },

        load: function() {
            let fileInput = document.getElementById("importFile");
            if (fileInput.files[0]) {
                this.customContent = false;
                wjcGridXlsx.FlexGridXlsxConverter.loadAsync(
                    this.flex,
                    fileInput.files[0],
                    { includeColumnHeaders: this.includeColumnHeader }
                );
            }
        },

        exportFormatItem: function(args) {
            var p = args.panel,
                row = args.row,
                col = args.col,
                xlsxCell = args.xlsxCell,
                cell,
                color;

            if (p.cellType === wjcGrid.CellType.Cell) {
                if (p.columns[col].binding === "color") {
                    //color = p.rows[row].dataItem['color'];
                    if (xlsxCell.value) {
                        if (!xlsxCell.style.font) {
                            xlsxCell.style.font = {};
                        }
                        xlsxCell.style.font.color = xlsxCell.value.toLowerCase();
                    }
                } else if (
                    p.columns[col].binding === "active" &&
                    p.rows[row] instanceof wjcGrid.GroupRow
                ) {
                    cell = args.getFormattedCell();
                    xlsxCell.value = cell.textContent.trim();
                    xlsxCell.style.hAlign = wjcXlsx.HAlign.Left;
                }
            }
        }
    }
});
</script>

<style>
.wj-flexgrid {
    height: 400px;
    margin: 6px 0;
}
</style>