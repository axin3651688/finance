<template>
    <div class="container-fluid">
        <div>
            <wj-input-color
                ref="clrStart"
                :value="'purple'"
                :value-changed="this.interpolate.bind(this)"
            ></wj-input-color>
            <wj-input-color
                ref="clrEnd"
                :value="'red'"
                :value-changed="this.interpolate.bind(this)"
            ></wj-input-color>
        </div>
        <table>
            <tr>
                <td
                    v-for="(color,index) in gradient"
                    v-bind:style="{backgroundColor:color}"
                    v-bind:key="index"
                >&nbsp;</td>
            </tr>
        </table>
        <div id="theColor"></div>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.input";
    import * as wijmo from "@grapecity/wijmo";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                _interval: null,
                gradient: []
            };
        },
        methods: {
            interpolate: function() {
                var start = this.$refs.clrStart.value;
                var end = this.$refs.clrEnd.value;
                let c1 = new wijmo.Color(start),
                    c2 = new wijmo.Color(end);
                //
                // calculate new gradient
                this.gradient = [];
                for (let i = 0, cnt = 80; i < cnt; i++) {
                    this.gradient.push(wijmo.Color.interpolate(c1, c2, i / cnt));
                }
                //
                // animate the color
                let theColor = document.querySelector("#theColor");
                clearInterval(this._interval);
                this._interval = wijmo.animate(pct => {
                    theColor.style.background = wijmo.Color.interpolate(
                        c1,
                        c2,
                        pct
                    ).toString();
                }, 2000);
            }
        },
        mounted: function() {
            this.interpolate();
        }
    });

    var vm = new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .container-fluid .wj-control {
        margin-bottom: 12px;
    }

    table {
        width: 100%;
    }

    #theColor {
        width: 150px;
        height: 150px;
        margin: 12px auto;
        border: 2px solid black;
        background-color: grey;
    }
</style>
