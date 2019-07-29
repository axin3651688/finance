<template>
    <div class="container-fluid">
        <label>selectionMode
            <div id="selectionMode"></div>
            <wj-combo-box
                :initialized="initCombo"
                :itemsSource="comboBoxData"
                :text="'CellRange'"
                :textChanged="onTextChanged"
            ></wj-combo-box>
        </label>
        <button @click="onRefreshClick">Refresh</button>

        <wj-flex-grid
            :alternatingRowStep="0"
            :itemsSource="data"
            :initialized="initializeGrid"
            :selectionChanged="onSelectionChanged"></wj-flex-grid>
        
        <p>
            Current selection: <span >{{currentSelection}}</span>.
        </p>
        <div>
            <button class="btn btn-default" @click="onSelectClick">Select the first four cells</button> 
            <button class="btn btn-default" @click="onListSelectClick">Select rows 0, 2, and 4</button>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.input";
import * as wjGrid from "@grapecity/wijmo.grid";
import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getData(),
            comboBoxData: "None,Cell,CellRange,Row,RowRange,ListBox".split(","),
            currentSelection: null,
            flexGrid: null,
            selectionMode: null
        };
    },
    methods: {
        initCombo: function(combo) {
            this.selectionMode = combo;
        },
        initializeGrid: function(flexGrid) {
            this.flexGrid = flexGrid;
            this.flexGrid.onSelectionChanged(null);
        },
        onTextChanged: function() {
            this.flexGrid.selectionMode = wijmo.asEnum(
                this.selectionMode.selectedIndex,
                wjGrid.SelectionMode
            );
        },
        onSelectionChanged: function() {
            this.currentSelection = wijmo.format(
                "({row},{col})-({row2},{col2})",
                this.flexGrid.selection
            );
        },
        onRefreshClick: function() {
            this.flexGrid.collectionView.refresh();
        },
        onSelectClick: function() {
            this.selectionMode.text = "CellRange";
            this.flexGrid.selection = new wjGrid.CellRange(0, 0, 1, 1);
        },
        onListSelectClick: function() {
            this.selectionMode.text = "ListBox";
            this.flexGrid.select(0, 0);
            [0, 2, 4].forEach((index) => {
                this.flexGrid.rows[index].isSelected = true;
            });
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 250px;
    margin: 10px;
}
#currSel {
    font-weight: bold;
}
body {
    margin-bottom: 12px;
}
</style>
