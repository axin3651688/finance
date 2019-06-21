<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <wj-pivot-panel :items-source="ng"></wj-pivot-panel>
            </div>
            <div class="col-xs-7">
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
import * as wjcOlap from '@grapecity/wijmo.olap';
import { getData } from './data'

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ng: new wjcOlap.PivotEngine({
                itemsSource: getData(), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'] // summarize amounts
            })
        };
    },
    mounted: function() {
        this.ng.fields.getField('Amount').format = 'c0';
        this.ng.fields.getField('Buyer').isContentHtml = true;
        this.ng.fields.getField('Type').isContentHtml = true;
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.initial {
	color: white;
	background: #707070;
	font-weight: 900;
	border-radius: 4px;
	padding: 2px;
	transform: scale(1.5, 1);
	margin-right: 5px;
}
</style>