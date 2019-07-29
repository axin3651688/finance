<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
                <p>Slicer:</p>
                <wj-slicer id="sample-slicer" :field="fldDate" :initialized="initialSlicer"></wj-slicer>
            </div>
            <div class="col-xs-6">
                <p>
                    Amount spent by each buyer.
                </p>
                <wj-pivot-grid :items-source="ng"></wj-pivot-grid>
            </div>
        </div>
        <p>
            You can customize the <b>Slicer</b> control to hide or show
            a header, and to hide or show checkboxes next to each item:
        </p>
        <label>
            Show Header
            <input id="showHeader" type="checkbox" checked v-on:click="onShowHeaderClick">
        </label>
        <br />
        <label>
            Show Checkboxes
            <input id="showCheckboxes" type="checkbox" v-on:click="onShowCheckboxesClick">
        </label>
        <p>
            If you change the <b>format</b> property of the field
            being filtered by the <b>Slicer</b>, the value list
            is updated automatically:
        </p>
        <button class="btn btn-primary" id="editfield" v-on:click="onEditFieldClick">
            Edit Date Field...
        </button>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(1000), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer'], // by buyer
                filterFields: ['Date'] // filter
            }),
            fldAmount: {},
            fldDate: {}
        };
    },
    created: function() {
        this.fldAmount = this.ng.fields.getField('Amount'),
        this.fldDate = this.ng.fields.getField('Date');
        this.fldAmount.format = 'c0';
        this.fldDate.format = 'MMMM yyyy';
    },
    methods: {
        initialSlicer(slicer) {
            this.slicer = slicer;    
        },

        onShowHeaderClick(e) {
            this.slicer.showHeader = e.target.checked;
        },

        onShowCheckboxesClick(e) {
            this.slicer.showCheckboxes = e.target.checked;
        },

        onEditFieldClick(e) {
            this.ng.editField(this.slicer.field);
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-pivotgrid {
	max-height: 300px;
}
#sample-slicer {
	display: block;
    max-height: 200px;
    margin: 12px;
}
body {
	margin-bottom: 48px;
}
</style>