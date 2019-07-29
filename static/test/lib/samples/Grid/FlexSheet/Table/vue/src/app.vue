<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet :name="'Table'" :rowCount="20" :columnCount="7"></wj-sheet>
        </wj-flex-sheet>
        <div class="well well-lg" v-if="selectedTable != null">
            <h4>Table Style Options</h4>
            <div>
                <label>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="selectedTable.showHeaderRow"
                    >
                    Header Row
                </label>
                <label>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="selectedTable.showTotalRow"
                    >
                    Total Row
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="selectedTable.showBandedRows"
                    >
                    Banded Rows
                </label>
                <label>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="selectedTable.showBandedColumns"
                    >
                    Banded Columns
                </label>
            </div>
            <div>
                <label>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="selectedTable.alterFirstColumn"
                    >
                    First Column
                </label>
                <label>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="selectedTable.alterLastColumn"
                    >
                    Last Column
                </label>
            </div>
            <div>
                <label style="width:auto">Built-in Styles:</label>
                <wj-combo-box
                    :itemsSource="tableStyleNames"
                    :isEditable="false"
                    :initialized="cboTableStylesInit"
                ></wj-combo-box>
            </div>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.grid.sheet";
import { getTableData } from './data';

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            flex: null,
            cboTableStyles: null,
            tableStyleNames: [],
            selectedTable: null
        };
    },
    methods: {
        initializeFlexSheet: function(flex) {
            let tableStyle, table, i;

            this.tableStyleNames = [];
            for (i = 1; i <= 21; i++) {
                this.tableStyleNames.push("TableStyleLight" + i);
            }
            for (i = 1; i <= 28; i++) {
                this.tableStyleNames.push("TableStyleMedium" + i);
            }
            for (i = 1; i <= 11; i++) {
                this.tableStyleNames.push("TableStyleDark" + i);
            }

            tableStyle = flex.getBuiltInTableStyle("TableStyleDark9");
            table = flex.selectedSheet.addTableFromArray(
                2,
                1,
                getTableData(10),
                null,
                "Table1",
                tableStyle,
                { showTotalRow: true }
            );

            flex.selectionChanged.addHandler((sender, args) => {
                let selection = args.range;
                if (selection.isValid) {
                    this._getSelectedTable(selection, flex);
                } else {
                    this.selectedTable = null;
                }
            });

            flex.updatedLayout.addHandler(() => {
                if (flex.selection && flex.selection.isValid) {
                    this._getSelectedTable(flex.selection, flex);
                } else {
                    this.selectedTable = null;
                }
            });
            this.flex = flex;
        },

        cboTableStylesInit: function(cboTableStyles) {
            cboTableStyles.selectedIndexChanged.addHandler(() => {
                // apply the table style for the selected table
                if (this.selectedTable) {
                    var tableStyle = this.flex.getBuiltInTableStyle(
                        cboTableStyles.selectedValue
                    );
                    this.selectedTable.style = tableStyle;
                }
            });
            if (this.selectedTable) {
                cboTableStyles.selectedValue = this.selectedTable.style.name;
            }

            this.cboTableStyles = cboTableStyles
        },

        // Get selected table in FlexSheet.
        _getSelectedTable: function(selection, flexSheet) {
            this.selectedTable = flexSheet.selectedSheet.findTable(
                selection.row,
                selection.col
            );
            if (this.selectedTable && this.cboTableStyles) {
                var tableStyle = flexSheet.getBuiltInTableStyle(
                    this.selectedTable.style.name
                );
                if (tableStyle) {
                    this.cboTableStyles.selectedValue = tableStyle.name;
                }
            }
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
