<template>
    <div class="container-fluid">
        <wj-flex-grid :itemsSource="data" :initialized="initGrid"></wj-flex-grid>

        <button class="btn btn-default" @click="onSaveStateClick">Save State</button>
        <button class="btn btn-default" @click="onRestoreClick">Restore State</button>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjGridFilter from '@grapecity/wijmo.grid.filter';
import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getData(),
            gridFilter: null,
            flexGrid: null
        };
    },
    methods: {
        initGrid: function(grid){
            this.flexGrid = grid;
        },
        onSaveStateClick: function() {
            var state = {
                columns: this.flexGrid.columnLayout,
                filterDefinition: this.gridFilter.filterDefinition,
                sortDescriptions: this.flexGrid.collectionView.sortDescriptions.map(function (sortDesc) {
                    return { property: sortDesc.property, ascending: sortDesc.ascending };
                })
            }
            localStorage['gridState'] = JSON.stringify(state);
        },
        onRestoreClick: function() {
            var json = localStorage['gridState'];
            if (json) {
                var state = JSON.parse(json);
                // restore column layout (order/width)
                this.flexGrid.columnLayout = state.columns;
                // restore filter definitions
                this.gridFilter.filterDefinition = state.filterDefinition;
                // restore sort state
                var view = this.flexGrid.collectionView;
                view.deferUpdate(function () {
                    view.sortDescriptions.clear();
                    for (var i = 0; i < state.sortDescriptions.length; i++) {
                        var sortDesc = state.sortDescriptions[i];
                        view.sortDescriptions.push(
                            new wijmo.SortDescription(sortDesc.property, sortDesc.ascending)
                        );
                    }
                });
            }
        }
    },
    mounted: function() {
        this.gridFilter = new wjGridFilter.FlexGridFilter(this.flexGrid);
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
}
body {
    margin-bottom: 20px;
}
</style>
