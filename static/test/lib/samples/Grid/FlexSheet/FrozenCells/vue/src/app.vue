<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet :name="'unbound'" :rowCount="30" :columnCount="12"></wj-sheet>
        </wj-flex-sheet>
        <button
            type="button"
            class="btn btn-default"
            @click="freezeCells"
        >{{isFrozen ? 'UnFreeze' : 'Freeze'}}</button>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.grid.sheet";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            isFrozen: false,
            flex: null
        };
    },
    methods: {
        initializeFlexSheet: function(flex) {
            flex.deferUpdate(() => {
                let colIdx, rowIdx;

                for (colIdx = 0; colIdx < flex.columns.length; colIdx++) {
                    for (rowIdx = 0; rowIdx < flex.rows.length; rowIdx++) {
                        flex.setCellData(rowIdx, colIdx, colIdx + rowIdx);
                    }
                }
            });

            flex.selectedSheetChanged.addHandler(() => {
                if (flex.frozenColumns > 0 || flex.frozenRows > 0) {
                    this.isFrozen = true;
                } else {
                    this.isFrozen = false;
                }
            });
            this.flex = flex;
        },

        freezeCells: function() {
            this.flex.freezeAtCursor();
            if (this.flex.frozenColumns > 0 || this.flex.frozenRows > 0) {
                this.isFrozen = true;
            } else {
                this.isFrozen = false;
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
