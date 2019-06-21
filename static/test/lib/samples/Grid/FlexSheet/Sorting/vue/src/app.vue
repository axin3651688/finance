<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet :name="'Country'" :itemsSource="data"></wj-sheet>
        </wj-flex-sheet>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th class="text-center" style="width: 50%;">Column</th>
                    <th class="text-center" style="width: 50%;">Order</th>
                </tr>
            </thead>
            <tbody v-if="sortManager">
                <tr
                    v-for="(sortItem,index) of sortManager.sortDescriptions.items"
                    :key="index"
                    @click="sortManager.sortDescriptions.moveCurrentTo(sortItem)"
                    :class="{success: sortItem === sortManager.sortDescriptions.currentItem}"
                >
                    <td>
                        <select
                            class="form-control"
                            @change="applySortColumnIndex($event, sortItem)"
                        >
                            <option value="-1"></option>
                            <option
                                v-for="(column,i) of columns"
                                :key="i"
                                :selected="i === sortItem.columnIndex"
                                :value="i"
                            >{{column}}</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-control" @change="applySortAscending($event, sortItem)">
                            <option :value="true" :selected="sortItem.ascending">Ascending</option>
                            <option :value="false" :selected="!sortItem.ascending">Descending</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="btn-group">
            <button type="button" class="btn btn-default" @click="addSortLevel">Add Level</button>
            <button type="button" class="btn btn-default" @click="deleteSortLevel">Delete Level</button>
            <button type="button" class="btn btn-default" @click="copySortLevel">Copy Level</button>
        </div>
        <div class="btn-group">
            <button
                id="moveup"
                type="button"
                class="btn btn-default"
                :disabled="sortManager && sortManager.sortDescriptions.currentPosition <= 0"
                @click="moveSortLevel(-1)"
            >
                <span class="glyphicon glyphicon-arrow-up"></span>
            </button>
            <button
                id="movedown"
                type="button"
                class="btn btn-default"
                :disabled="sortManager && sortManager.sortDescriptions.currentPosition >= sortManager.sortDescriptions.itemCount - 1"
                @click="moveSortLevel(1)"
            >
                <span class="glyphicon glyphicon-arrow-down"></span>
            </button>
        </div>
        <div class="btn-group">
            <button type="button" class="btn btn-default" @click="commitSort">OK</button>
            <button type="button" class="btn btn-default" @click="cancelSort">Cancel</button>
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
            sortManager: null,
            columns: [],
            countries: getCountries(),
            products: getProducts()
        };
    },
    methods: {
        initializeFlexSheet: function(flex) {
            flex.deferUpdate(() => {
                let column = flex.columns.getColumn("countryId");
                if (column && !column.dataMap) {
                    column.dataMap = this._buildDataMap(this.countries);
                }
                column = flex.columns.getColumn("productId");
                if (column && !column.dataMap) {
                    column.width = 100;
                    column.dataMap = this._buildDataMap(this.products);
                }
                column = flex.columns.getColumn("amount");
                if (column) {
                    column.format = "c2";
                }
                this.sortManager = flex.sortManager;
                this.columns = this._getColumns(flex);
            });

            flex.selectedSheetChanged.addHandler(() => {
                this.columns = this._getColumns(flex);
                if (!this.sortManager) {
                    this.sortManager = flex.sortManager;
                }
            });

            flex.columnChanged.addHandler(() => {
                this.columns = this._getColumns(flex);
            });
        },

        // commit the sorts
        commitSort: function() {
            this.sortManager.commitSort();
        },

        // cancel the sorts
        cancelSort: function() {
            this.sortManager.cancelSort();
        },

        // add new sort level
        addSortLevel: function() {
            this.sortManager.addSortLevel();
        },

        // delete current sort level
        deleteSortLevel: function() {
            this.sortManager.deleteSortLevel();
        },

        // copy a new sort level by current sort level setting.
        copySortLevel: function() {
            this.sortManager.copySortLevel();
        },

        // move the sort level
        moveSortLevel: function(offset) {
            this.sortManager.moveSortLevel(offset);
        },

        // apply column index property for sort item
        applySortColumnIndex: function(e, sortItem) {
            sortItem.columnIndex = e.target.value;
        },

        // apply asceding property for sort item
        applySortAscending: function(e, sortItem) {
            if (e.target.value === "true") {
                sortItem.ascending = true;
            } else {
                sortItem.ascending = false;
            }
        },

        // build a data map from a string array using the indices as keys
        _buildDataMap: function(items) {
            let map = [];
            for (let i = 0; i < items.length; i++) {
                map.push({ key: i, value: items[i] });
            }
            return new wjcGrid.DataMap(map, "key", "value");
        },

        _getColumns: function(flexSheet) {
            let columns = [],
                i = 0;
            if (flexSheet) {
                for (; i < flexSheet.columns.length; i++) {
                    columns.push(
                        "Column " + wjcSheet.FlexSheet.convertNumberToAlpha(i)
                    );
                }
            }
            return columns;
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
