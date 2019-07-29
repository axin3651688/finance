<template>
    <div class="container-fluid">
        <wj-flex-grid :initialized="flexInitialized"></wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcGrid from "@grapecity/wijmo.grid";
import "@grapecity/wijmo.vue2.grid";
import * as wjcCore from "@grapecity/wijmo";

let App = Vue.extend({
    name: "app",
    methods: {
        flexInitialized: function(flex) {
            this.flex = flex;
        },
        update: function() {
            if (this.flex) {
                this.flex.allowResizing = wjcGrid.AllowResizing.Both;
                this.flex.allowDragging = wjcGrid.AllowDragging.Both;

                let r, c, i;
                // add 50 rows, 10 columns
                for (r = 0; r < 50; r++) {
                    this.flex.rows.push(new wjcGrid.Row());
                }
                for (c = 0; c < 10; c++) {
                    this.flex.columns.push(new wjcGrid.Column());
                }

                // populate the scrollable area
                for (r = 0; r < this.flex.rows.length; r++) {
                    for (c = 0; c < this.flex.columns.length; c++) {
                        this.flex.setCellData(r, c, "r" + r + ",c" + c);
                    }
                }

                // add 3 rows to the column header and 3 columns to the row header panels
                for (i = 0; i < 3; i++) {
                    this.flex.columnHeaders.rows.insert(0, new wjcGrid.Row());
                    this.flex.rowHeaders.columns.insert(
                        0,
                        new wjcGrid.Column()
                    );
                }

                // populate the fixed area
                let p = this.flex.columnHeaders;
                for (r = 0; r < p.rows.length; r++) {
                    for (c = 0; c < p.columns.length; c++) {
                        p.setCellData(r, c, "cHdr r" + r + ",c" + c);
                    }
                }
                p = this.flex.rowHeaders;
                for (r = 0; r < p.rows.length; r++) {
                    for (c = 0; c < p.columns.length; c++) {
                        p.setCellData(r, c, "rHdr r" + r + ",c" + c);
                    }
                }
                p = this.flex.topLeftCells;
                for (r = 0; r < p.rows.length; r++) {
                    for (c = 0; c < p.columns.length; c++) {
                        p.setCellData(r, c, "tl r" + r + ",c" + c);
                    }
                }
            }
        }
    },
    mounted: function() {
        this.update();
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    height: 400px;
    margin: 6px 0;
}
</style>