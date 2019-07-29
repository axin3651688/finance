<template>
    <div class="container-fluid">
        <div id="buttons" v-on:click="onButtonClick">
            <button id="10k" class="btn btn-primary">
                10k items
            </button>
            <button id="100k" class="btn btn-primary" :disabled="enable100K">
                100k items
            </button>
            <button id="500k" class="btn btn-primary" :disabled="enable500K">
                500k items
            </button>
            <button id="1M" class="btn btn-primary" :disabled="enable1M">
                One Million items
            </button>
        </div>

        <p id="result" v-html="result">
        </p>
        <div class="output">
            <wj-pivot-grid id="pivotGrid" :items-source="ng"></wj-pivot-grid>
        </div>

        <p>
            If you deal with massive data sets, with millions of records,
            you should consider using server-side OLAP providers like
            SSAS cubes or ComponentOne Data Services.
            The <b>PivotEngine</b> can connect to either.
        </p>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { addData } from './data';

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ds10: addData([], 10e3),
            ds100: null,
            ds500: null,
            ds1M: null,
            start: 0,
            enable100K: true,
            enable500K: true,
            enable1M: true,
            result: '',
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false,
                fields: [ // specify the fields we want
                    { binding: 'date', header: 'Date', format: 'yyyy' },
                    { binding: 'buyer', header: 'Person' },
                    { binding: 'type', header: 'Category' },
                    { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' }
                ],
                itemsSource: addData([], 10e3),
                showRowTotals: 'Subtotals',
                valueFields: ['Amount'],
                rowFields: ['Person', 'Category'],
                updatingView: () => {
                    if (this.start == 0) {
                        this.start = Date.now();
                    }
                },
                updatedView: (s) => {
                    let fmt = 'Summarized <b>{cnt:n0}</b> items in <b>{tm:n0}</b>ms';
                    this.result = wjcCore.format(fmt, {
                        cnt: s.itemsSource.length,
                        tm: Date.now() - this.start
                    });
                    this.start = 0;
                }
            })
        };
    },
    mounted: function() {
        this._createDataAsync(100e3, (result) => {
            this.ds100 = result;
            this.enable100K = false;
        });
        this._createDataAsync(500e3, (result) => {
            this.ds500 = result;
            this.enable500K = false;
        });
        /*this._createDataAsync(1e6, (result) => {
            this.ds1M = result;
            this.enable1M = false;
        });*/
    },
    methods: {
        onButtonClick(e) {
            switch (e.target.id) {
                case '10k':
                    this.ng.itemsSource = this.ds10;
                    break;
                case '100k':
                    this.ng.itemsSource = this.ds100;
                    break;
                case '500k':
                    this.ng.itemsSource = this.ds500;
                    break;
                case '1M':
                    this.ng.itemsSource = this.ds1M;
                    break;
            }
        },

        _createDataAsync(cnt, callback) {
            let data = [];
            this._addDataAsync(data, cnt, () => {
                callback(data);
            });
        },

        _addDataAsync (data, cnt, callback) {
            setTimeout(() => {
                addData(data, Math.min(cnt - data.length, 1000));
                if (data.length == cnt) {
                    callback(data);
                } else {
                    this._addDataAsync(data, cnt, callback);
                }
            });
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
#buttons {
  display: flex;
  margin-bottom: 6px;
}

#buttons .btn {
  margin: 6px;
  white-space: normal;
}

.output {
  display: flex;
  justify-content: center;
  margin: 6px;
}

#pivotGrid {
  width: auto;
  max-height: 300px;
}

body {
  margin-bottom: 36pt;
}
</style>