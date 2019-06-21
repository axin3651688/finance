<template>
    <div class="container-fluid">
        <wj-pivot-grid :items-source="ng"></wj-pivot-grid>
        <p>
            Change the value of the field's <b>showAs</b> property:
        </p>
        <wj-combo-box :items-source="showAsOptions" :textChanged="onTextChanged"></wj-combo-box>
        <p>
            <label>
                Show Period in columns
                <input id="periodInColumns" type="checkbox" v-on:click="onPeriodInColumns">
            </label>
        </p>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.input';
import '@grapecity/wijmo.vue2.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false, // turn off auto-generation
                fields: [ // specify the fields we want (no date)
                    { binding: 'date', header: 'Year', format: 'yyyy' },
                    { binding: 'date', header: 'Period', format: 'MMM' },
                    { binding: 'buyer', header: 'Person' },
                    { binding: 'type', header: 'Category' },
                    { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' },
                    { binding: 'amount', header: 'Show As', format: 'c0', aggregate: 'Sum' },
                ],
                itemsSource: getData(1000), // raw data
                showRowTotals: 'Subtotals',
                valueFields: ['Amount', 'Show As'], // show amount spent
                rowFields: ['Year', 'Period'] // by Year and Quarter
            }),
            showAsOptions: 'NoCalculation,DiffRow,DiffRowPct,DiffCol,DiffColPct,PctGrand,PctRow,PctCol,RunTot,RunTotPct'.split(',')
        };
    },
    mounted: function(){
        this.fld = this.ng.fields.getField('Show As');
    },
    methods: {
        onTextChanged(combox) {
            this.fld.showAs = wjcOlap.ShowAs[combox.text];
            this.fld.format = combox.text.indexOf('Pct') > -1 ? 'p0' : 'c0';
        },

        onPeriodInColumns(e) {
            let list = e.target.checked ? this.ng.columnFields : this.ng.rowFields;
            list.push('Period');
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.container > label {
  width: 120px;
  text-align: right;
}
.container > .wj-control {
  margin-bottom: 6px;  
}
.wj-flexgrid {
  height: 200px;
}

body {
  margin-bottom: 24pt;
}
</style>