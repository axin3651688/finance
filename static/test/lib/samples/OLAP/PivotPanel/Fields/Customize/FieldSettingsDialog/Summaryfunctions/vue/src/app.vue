<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <p>
                    Drag and drop fields to build views:
                </p>
                <wj-pivot-panel id="sample-panel" :items-source="ngPanel"></wj-pivot-panel>
            </div>
            <div class="col-xs-7">
                <p>
                    Summary for the current view definition:
                </p>
                <wj-pivot-grid :items-source="ngPanel"></wj-pivot-grid>
            </div>
        </div>
    	<p>
    		You can also invoke the field editor programatically
    		using the <b>PivotEngine's</b> <b>editField</b>
    		method:
    	</p>
    	<button id="edit" class="btn btn-primary" v-on:click="onEditClick">
    		Edit Amount Field
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
        onEditClick() {
            this.ngPanel.editField(this.ngPanel.fields.getField('Amount'));
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
#sample-panel {
	background: #eee;
	box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
#sample-panel .wj-flexgrid {
	background: inherit;
}

body {
  margin-bottom: 24pt;
}
</style>