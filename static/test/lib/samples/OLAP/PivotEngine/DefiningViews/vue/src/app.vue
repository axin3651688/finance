<template>
    <div class="container-fluid">
        <div id="buttons" class="buttons" v-on:click="onButtonClick">
            <button id="who" class="btn">
                How much was spent by each person?
            </button>
            <button id="what" class="btn">
                How much was spent on each expense type?
            </button>
            <button id="who-what" class="btn">
                What did each person spend money on?
            </button>
            <button id="when" class="btn">
                When were these expenses made?
            </button>
        </div>

        <p>
            Use these buttons to save and load views:
        </p>
        <div class="buttons">
            <button id="save" class="btn btn-primary" v-on:click="onSaveClick">
                Save View
            </button>
            <button id="load" class="btn btn-primary" v-on:click="onLoadClick">
                Load View
            </button>
        </div>

        <div class="row">
            <div class="col-xs-6">
                <p>
                    Use the <b>PivotPanel</b> control to edit the view:
                </p>
                <wj-pivot-panel :items-source="ng"></wj-pivot-panel>
            </div>
            <div class="col-xs-6">
                <p>
                    Use the <b>PivotGrid</b> control to see the results:
                </p>
                <wj-pivot-grid :items-source="ng"></wj-pivot-grid>
            </div>
        </div>
    </div>
</template>
<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import '@grapecity/wijmo.vue2.olap';
import '@grapecity/wijmo.vue2.grid';
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new wjcOlap.PivotEngine({
                autoGenerateFields: false, // turn off auto-generation
                fields: [ // specify the fields we want
                    { binding: 'date', header: 'Date', format: 'yyyy' },
                    { binding: 'date', header: 'Quarter', format: '"Q"q' },
                    { binding: 'buyer', header: 'Person' },
                    { binding: 'type', header: 'Category' },
                    { binding: 'amount', header: 'Amount', format: 'c0', aggregate: 'Sum' }
                ],
                itemsSource: getData(10000),
                showRowTotals: 'Subtotals',
                valueFields: ['Amount'],
                rowFields: ['Person']
            })
        };
    },
    methods: {
        onSaveClick() {
            localStorage.viewDefinition = this.ng.viewDefinition;
        },

        onLoadClick() {
            if (localStorage.viewDefinition) {
                this.ng.viewDefinition = localStorage.viewDefinition;
            }
        },

        onButtonClick(e) {
            var ng = this.ng;
            switch (e.target.id) {
                case 'who':
                    ng.rowFields.clear();
                    ng.rowFields.push('Person');
                    break;
                case 'what':
                    ng.rowFields.clear();
                    ng.rowFields.push('Category');
                    break;
                case 'who-what':
                    ng.rowFields.clear();
                    ng.rowFields.push('Person', 'Category');
                    break;
                case 'when':
                    ng.rowFields.clear();
                    ng.rowFields.push('Date');
                    ng.rowFields.push('Quarter');
                    break;
            }
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.buttons {
	display: flex;
	margin-bottom: 12px;
}
.buttons .btn {
	margin: 6px;
	white-space: normal;
}

body {
  margin-bottom: 36pt;
}
</style>