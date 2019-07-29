<template>
    <div class="container-fluid">
        <wj-pivot-grid :items-source="ng"></wj-pivot-grid>
        <p>
            Customize the "Period" field by changing its format:
        </p>
        <wj-combo-box :items-source="formats" display-member-path="name" selected-value-path="value" :textChanged="onTextChanged"></wj-combo-box>
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
                    { binding: 'date', header: 'Period', format: '"Q"q' },
                    { binding: 'buyer', header: 'Person' },
                    { binding: 'type', header: 'Category' },
                    { binding: 'amount', header: 'Total', format: 'c0', aggregate: 'Sum' },
                    { binding: 'amount', header: 'Average', format: 'c0', aggregate: 'Avg' },
                ],
                itemsSource: getData(1000), // raw data
                showRowTotals: 'Subtotals',
                valueFields: ['Total', 'Average'], // show amount spent
                rowFields: ['Year', 'Period'] // by Year and Quarter
            }),
            formats: [
                { name: 'Quarter ("Q"q)', value: '"Q"q' },
                { name: 'Fiscal Quarter ("FQ"u)', value: '"FQ"u' },
                { name: 'Long Month (MMMM)', value: 'MMMM' },
                { name: 'Short Month (MMM)', value: 'MMM' },
                { name: 'Month Number (M )', value: 'M ' },
            ]
        };
    },
    mounted: function() {
        this.fld = this.ng.fields.getField('Period');
    },
    methods: {
        onTextChanged(combox) {
            this.fld.format = combox.selectedValue;
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