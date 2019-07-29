<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet :name="'unbound'" :rowCount="20" :columnCount="10"></wj-sheet>
        </wj-flex-sheet>
        <div class="row well well-lg">
            <div class="btn-group">
                <button type="button" class="btn btn-default" @click="addRowHeader">Add Row Header</button>
                <button
                    type="button"
                    class="btn btn-default"
                    @click="removeRowHeader"
                >Remove Row Header</button>
                <button
                    type="button"
                    class="btn btn-default"
                    @click="addColumnHeader"
                >Add Column Header</button>
                <button
                    type="button"
                    class="btn btn-default"
                    @click="removeColumnHeader"
                >Remove Column Header</button>
            </div>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.grid.sheet";
import * as wjcGrid from "@grapecity/wijmo.grid";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            flex: null
        };
    },
    methods: {
        initializeFlexSheet: function(flex) {
            flex.deferUpdate(() => {
                for (let row = 0; row < flex.rows.length; row++) {
                    for (let col = 0; col < flex.columns.length; col++) {
                        flex.setCellData(row, col, row + col);
                    }
                }
            });
            this.flex = flex;
        },

        addRowHeader() {
            this.flex.rowHeaders.columns.push(new wjcGrid.Column());
        },

        removeRowHeader() {
            let colCnt = this.flex.rowHeaders.columns.length;
            if (colCnt > 0) {
                this.flex.rowHeaders.columns.removeAt(colCnt - 1);
            }
        },

        addColumnHeader() {
            this.flex.columnHeaders.rows.push(new wjcGrid.Row());
        },

        removeColumnHeader() {
            let rowCnt = this.flex.columnHeaders.rows.length;
            if (rowCnt > 0) {
                this.flex.columnHeaders.rows.removeAt(rowCnt - 1);
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
