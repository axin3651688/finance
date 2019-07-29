<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :alternatingRowStep="0"
            :itemsSource="grid.data"
            :initialized="initializeGrid">
        </wj-flex-grid>
        <button @click="listSelectedCells" class="btn btn-primary">
            List Selected Cells
        </button>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import * as wjGrid from '@grapecity/wijmo.grid';
    import * as wjCore from '@grapecity/wijmo';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import {ExtendedSelectionManager} from './extendedSelectionManager';


    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                grid: {
                    data: this.getData(),
                    _xsm: null,
                    flex: null
                }
            }
        },
        methods: {
            getData: function(s, e){
                // create some random data
                let data = [];
                let countries = 'Austria,Belgium,Chile,Denmark,Finland,Japan,UK'.split(',');
                for (let i = 0; i < 300; i++) {
                    data.push({
                        id: i,
                        from: countries[i % countries.length],
                        to: countries[(i+1) % countries.length],
                        sales: Math.random() * 10000,
                        expenses: Math.random() * 5000,
                        amount: Math.random() * 10000,
                        extra: Math.random() * 10000,
                    });
                }

                return data;
            },
            initializeGrid: function(flex){
                this.flex=flex;
                // add an extended selection manager to the grid
                this._xsm = new ExtendedSelectionManager(flex);
                this._xsm.selectedRanges.collectionChanged.addHandler((s, e) => {
                    let arr = this._xsm.selectedRanges;
                    console.log('selectedRanges: ' + arr.length);
                    for (let i = 0; i < arr.length; i++) {
                        console.log('  ' + i + wjcCore.format(': ({row},{col})-({row2}-{col2})', arr[i]));
                    }
                });
            },
            listSelectedCells: function() {
                // get selected ranges or regular selection
                let ranges = this._xsm.selectedRanges.length ? this._xsm.selectedRanges : [ this.flex.selection ];
                // build message
                let msg = ranges.length > 1 ? ranges.length + ' ranges selected:' : 'Single range selected:';
                ranges.forEach((rng, index) => {
                    msg += '\n' + index + wjCore.format(': ({row},{col})-({row2}-{col2})', rng);
                });
                // show the message
                alert(msg);
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-flexgrid {
  max-height: 300px;
}
.extended-selection.wj-cell:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {
  color: white;
  background: #a47aff;
}
body {
 margin-bottom: 20px;
}
</style>
