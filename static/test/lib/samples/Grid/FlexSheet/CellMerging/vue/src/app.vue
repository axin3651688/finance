<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet id="sample-sheet" :initialized="initializeFlexSheet">
            <wj-sheet :name="'unbound'" :rowCount="20" :columnCount="10"></wj-sheet>
        </wj-flex-sheet>
        <button
            @click="mergeCells()"
            type="button"
            class="btn btn-default"
        >{{mergeState.isMergedCell ? 'UnMerge' : 'Merge'}}</button>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcSheet from "@grapecity/wijmo.grid.sheet";
import "@grapecity/wijmo.vue2.grid.sheet";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            mergeState: {}
        };
    },
    methods: {
        initializeFlexSheet(flex) {
            this.flex = flex;
            flex.deferUpdate(() => {
                for (let row = 0; row < flex.rows.length; row++) {
                    for (let col = 0; col < flex.columns.length; col++) {
                        flex.setCellData(row, col, row + col);
                    }
                }
            });
            flex.selectionChanged.addHandler(() => {
                this.mergeState = flex.getSelectionFormatState();
            });
        },

        mergeCells: function() {
            this.flex.mergeRange();
            this.mergeState = this.flex.getSelectionFormatState();
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
#sample-sheet {
    height: 400px;
    margin: 6px 0;
}
</style>