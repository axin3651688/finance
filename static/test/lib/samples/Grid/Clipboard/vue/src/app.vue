<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :alternatingRowStep="0"
            :itemsSource="data"
        ></wj-flex-grid>
        <h2>Custom Behaviors</h2>
        <wj-flex-grid
            :alternatingRowStep="0"
            :itemsSource="data"
            :initialized="initializeCustomGrid"
        ></wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.core";
import "@grapecity/wijmo.vue2.grid";
import { getData } from "./data";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: getData()
        };
    },
    methods: {
        initializeCustomGrid: function(flex) {
            flex.copying.addHandler((s, e) => {
                // // add headers to clip string
                let text = s.getClipString(),
                    sel = s.selection,
                    hdr = "";
                for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                    if (hdr) {
                        hdr += "\t";
                    }
                    hdr += s.columns[c].header;
                }
                text = hdr + "\r\n" + text;
                // put text with headers on the clipboard
                wijmo.Clipboard.copy(text);
                // prevent the grid from overwriting our clipboard content
                e.cancel = true;
            });
            flex.pasting.addHandler((s, e) => {
                e.cancel = true; // prevent pasting data with headers
            });
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 200px;
    margin-bottom: 12px;
}

body {
    margin-bottom: 24px;
}
</style>
