<template>
    <div class="container-fluid">
        <div class="form-check">
            <label for="includeHeaders" class="form-check-label">Include Headers</label>
            <input
                id="includeHeaders"
                type="checkbox"
                class="form-check-input"
                v-model="includeHeaders"
            >
        </div>

        <wj-flex-grid ref="flexGrid" :itemsSource="data" :copying="copying" :pasting="pasting"></wj-flex-grid>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.grid';
    import * as wijmo from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function() {
            return {
                data: getData(),
                includeHeaders: true,
                _hasHeaders: false
            };
        },
        methods: {
            copying: function(sender, args) {
                this._hasHeaders = false;
                if (this.includeHeaders) {
                    let text = sender.getClipString(),
                        sel = sender.selection,
                        hdr = '';
                    //
                    for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                        if (hdr) hdr += '\t';
                        hdr += sender.columns[c].header;
                    }
                    text = hdr + '\r\n' + text;
                    //
                    // put text with headers on the clipboard
                    wijmo.Clipboard.copy(text);
                    this._hasHeaders = true;
                    //
                    // prevent the grid from overwriting our clipboard content
                    args.cancel = true;
                }
            },
            //
            pasting: function(sender, args) {
                if (this._hasHeaders) {
                    args.cancel = true;
                }
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-flexgrid {
        max-height: 350px;
    }

    label {
        margin-right: 3px;
    }
</style>