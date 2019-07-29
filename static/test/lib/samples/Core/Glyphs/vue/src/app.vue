<template>
    <div class="container-fluid">
        <table class="table table-condensed">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Glyph</th>
                    <th>Markup</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(glyph,index) in glyphs" v-bind:key="index">
                    <td>{{glyph}}</td>
                    <td style="font-size:125%;">
                        <span v-bind:class="'wj-glyph-'+glyph"></span>
                    </td>
                    <td>
                        <code>&lt;span class="wj-glyph-{{glyph}}"&gt;&lt;/span&gt;</code>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import "bootstrap.css";
import "@grapecity/wijmo.styles/wijmo.css";
import Vue from "vue";
import * as wijmo from "@grapecity/wijmo";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            glyphs: [
                "asterisk",
                "calendar",
                "check",
                "circle",
                "clock",
                "diamond",
                "down",
                "down-left",
                "down-right",
                "file",
                "filter",
                "left",
                "minus",
                "pencil",
                "plus",
                "right",
                "square",
                "step-backward",
                "step-forward",
                "up",
                "up-left",
                "up-right"
            ]
        };
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>
