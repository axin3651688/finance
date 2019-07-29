<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <p>
                    Drag and drop fields to build views:
                </p>
                <wj-pivot-panel id="sample-panel" :items-source="ngPanel"></wj-pivot-panel>
                <p>
                    For example, drag the "Buyer" field from the "Rows" list
                    to the "Columns" list.
                </p>
            </div>
            <div class="col-xs-7">
                <p>
                    Summary for the current view definition:
                </p>
                <wj-pivot-grid :items-source="ngPanel"></wj-pivot-grid>
                <wj-pivot-chart :items-source="ngPanel" :show-title="false" show-legend="Auto"></wj-pivot-chart>
            </div>
        </div>
        <p>
            View definitions can be saved and restored using the
            PivotEngine's <b>viewDefinition</b> property:
        </p>
        <button id="saveView" class="btn btn-default" v-on:click="onSaveViewClick">
            Save View
        </button>
        <button id="restoreView" class="btn btn-default" v-on:click="onRestoreViewClick">
            Restore View
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
            ngPanel: new wjcOlap.PivotEngine({
                itemsSource: getData(), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'] // summarize amounts
            })
        };
    },
    mounted: function() {
        this.ngPanel.fields.getField('Amount').format = 'c0';
    },
    methods: {
        onSaveViewClick() {
            if (this.ngPanel.isViewDefined) {
                localStorage.viewDefinition = this.ngPanel.viewDefinition;
            }
        },

        onRestoreViewClick() {
            if (localStorage.viewDefinition) {
                this.ngPanel.viewDefinition = localStorage.viewDefinition;
            }
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-pivotchart .wj-flexchart {
  border: none;
  height: 300px;
}
#sample-panel {
	background: #eee;
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.wj-pivotpanel .wj-flexgrid {
	background: inherit;
}

body {
  margin-bottom: 24pt;
}
</style>