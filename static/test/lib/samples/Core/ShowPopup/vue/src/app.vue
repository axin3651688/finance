<template>
    <div class="container-fluid">
        <wj-flex-grid ref="theGrid" :itemsSource="data" :initialized="initializedFlexGrid" :formatItem='formatItem'>
        </wj-flex-grid>
        <div style="display:none">
            <wj-list-box
                ref="picker"
                class="column-picker"
                :itemsSource="columns"
                :checkedMemberPath="'visible'"
                :displayMemberPath="'header'"
                :lostFocus="hidePicker"
                :initialized="initializedListBox"
            ></wj-list-box>
        </div>
        <button class="btn btn-default" @click="saveLayout">Save Layout</button>
        <button class="btn btn-default" @click="restoreLayout">Restore Layout</button>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import * as wijmo from "@grapecity/wijmo";
    import * as grid from "@grapecity/wijmo.grid";
    import "@grapecity/wijmo.vue2.input";
    import "@grapecity/wijmo.vue2.grid";
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData(),
                columns: []
            };
        },
        methods: {
            showPicker: function(e) {
                wijmo.showPopup(
                    this.listbox.hostElement,
                    e.target,
                    false,
                    true,
                    false
                );
                this.listbox.focus();
                e.preventDefault();
            },

            hidePicker: function() {
                wijmo.hidePopup(this.listbox.hostElement);
            },

            saveLayout: function() {
                localStorage.setItem("myLayout", this.grid.columnLayout);
            },

            restoreLayout: function() {
                let layout = localStorage.getItem("myLayout");
                if (layout) {
                    this.grid.columnLayout = layout;
                }
            },

            initializedFlexGrid: function(grid) {
                this.grid = grid;
                this.columns = this.grid.columns;
            },

            initializedListBox: function(listbox) {
                this.listbox = listbox;
            },

            formatItem: function(sender, e) {
                var self = this;
                if (e.panel == sender.topLeftCells) {
                    var span = document.createElement("span");
                    span.className = "column-picker-icon glyphicon glyphicon-cog";
                    span.addEventListener('mousedown',function(e){
                        self.showPicker(e);
                    });
                    e.cell.appendChild(span);
                }
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 300px;
        margin: 10px 0;
    }

    .column-picker {
        columns: 3;
        padding: 12px;
        margin-left: 12px;
        margin-top: 26px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }

    .column-picker-icon {
        cursor: pointer;
        color: #ff8754;
        margin: 3px;
    }

    /* #372131 (Chrome) */
    .column-picker .wj-listbox-item {
        break-inside: avoid;
    }

    body {
        margin-bottom: 20px;
    }
</style>