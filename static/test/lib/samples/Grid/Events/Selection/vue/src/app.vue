<template>
    <div class="container-fluid">
        <div v-html="logText" class="log"></div>
        <!-- the grid -->
        <wj-flex-grid :itemsSource="data" :initialized="flexInitialized"></wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: new wijmo.CollectionView(getData(), {
                    groupDescriptions: ["country"] // group data by country
                }),
                logText: 'please select a range on the grid'
            };
        },
        methods: {
            flexInitialized: function(flexgrid) {
                flexgrid.selectionChanged.addHandler(() => {
                    if (!flexgrid.selection.isSingleCell) {
                        let stats = this._getSelectionStats(flexgrid);
                        let fmt =
                            stats.sum != null
                                ? "Avg: <b>{avg:n2}</b>, Count: <b>{cnt:n0}</b>, Sum: <b>{sum:n2}</b>"
                                : "Count: {cnt:n2}";
                        this.logText = wijmo.format(fmt, stats);
                    } else {
                        this.logText = "please select a range on the grid";
                    }
                });
            },
            _getSelectionStats: function(grid) {
                let sel = grid.selection,
                    cnt = 0,
                    ncnt = 0,
                    sum = 0;
                for (let r = sel.topRow; r <= sel.bottomRow; r++) {
                    for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                        let val = grid.cells.getCellData(r, c, false);
                        if (val != null) {
                            cnt++;
                            if (wijmo.isNumber(val)) {
                                ncnt++;
                                sum += val;
                            }
                        }
                    }
                }
                return {
                    cnt: cnt,
                    sum: ncnt > 0 ? sum : null,
                    avg: ncnt > 0 ? sum / ncnt : null
                };
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .wj-flexgrid {
        max-height: 220px;
        margin: 10px;
    }
    .container-fluid .log {
        font-style: italic;
        text-align: center;
        margin-bottom: 10px;
        opacity: 0.5;
    }
    body {
        margin-bottom: 24px;
    }
</style>
