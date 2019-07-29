<template>
    <div class="container-fluid">
        <!-- the flexsheet -->
        <wj-flex-sheet :initialized="initializeFlexSheet">
            <wj-sheet :name="'unbound'" :rowCount="20" :columnCount="10"></wj-sheet>
        </wj-flex-sheet>
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
    methods: {
        initializeFlexSheet: function(flex) {
            flex.deferUpdate(() => {
                for (let row = 0; row < flex.rows.length; row++) {
                    for (let col = 0; col < flex.columns.length; col++) {
                        flex.setCellData(row, col, row + col);
                    }
                }
            });
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
