<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet :name="'Country'" :itemsSource="data"></wj-sheet>
            <wj-sheet :name="'Unbound'" :rowCount="20" :columnCount="8"></wj-sheet>
        </wj-flex-sheet>
        <div class="form-inline well well-lg">
            <input
                type="file"
                class="form-control"
                id="importFile"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            >
            <button class="btn btn-default" @click="load">Load</button>
        </div>
        <div class="form-inline well well-lg">
            File Name:
            <input type="text" class="form-control" v-model="fileName">
            <button class="btn btn-default" @click="save">Save</button>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import '@grapecity/wijmo.vue2.grid.sheet';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcSheet from '@grapecity/wijmo.grid.sheet';
import { getData, getCountries, getProducts } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getData(50),
            countries: getCountries(),
            products: getProducts(),
            fileName: "",
            flex: null
        };
    },
    methods: {
        initializeFlexSheet: function(flex) {
            flex.deferUpdate(() => {
                let sheetIdx, sheetName, colIdx, rowIdx;

                // initialize the dataMap for the bound sheet.
                if (flex) {
                    for (
                        sheetIdx = 0;
                        sheetIdx < flex.sheets.length;
                        sheetIdx++
                    ) {
                        flex.selectedSheetIndex = sheetIdx;
                        sheetName = flex.selectedSheet.name;
                        if (sheetName === "Country") {
                            let column = flex.columns.getColumn("countryId");
                            if (column && !column.dataMap) {
                                column.dataMap = this._buildDataMap(
                                    this.countries
                                );
                            }
                            column = flex.columns.getColumn("productId");
                            if (column && !column.dataMap) {
                                column.dataMap = this._buildDataMap(
                                    this.products
                                );
                            }
                            column = flex.columns.getColumn("amount");
                            if (column) {
                                column.format = "c2";
                            }
                        } else {
                            for (
                                colIdx = 0;
                                colIdx < flex.columns.length;
                                colIdx++
                            ) {
                                for (
                                    rowIdx = 0;
                                    rowIdx < flex.rows.length;
                                    rowIdx++
                                ) {
                                    flex.setCellData(
                                        rowIdx,
                                        colIdx,
                                        colIdx + rowIdx
                                    );
                                }
                            }
                        }
                    }
                    flex.selectedSheetIndex = 0;
                }
            });
            this.flex=flex;
        },

        // Load xlsx file to FlexSheet.
        load: function() {
            let fileInput = document.getElementById("importFile");
            if (this.flex && fileInput.files[0]) {
                this.flex.loadAsync(fileInput.files[0]);
            }
        },

        // Save FlexSheet to xlsx file.
        save: function() {
            let fileName;
            if (!!this.fileName) {
                fileName = this.fileName;
            } else {
                fileName = "FlexSheet.xlsx";
            }
            this.flex.saveAsync(fileName);
        },

        // build a data map from a string array using the indices as keys
        _buildDataMap: function(items) {
            let map = [];
            for (let i = 0; i < items.length; i++) {
                map.push({ key: i, value: items[i] });
            }
            return new wjcGrid.DataMap(map, "key", "value");
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.container-fluid .wj-flexsheet {
    height: 400px;
    margin: 6px 0;
}
</style>
