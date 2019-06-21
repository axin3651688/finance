<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <p>
                    Drag and drop fields to build views:
                </p>
                <wj-pivot-panel :items-source="ngPanel"></wj-pivot-panel>
            </div>
            <div class="col-xs-7">
                <p>
                    Summary for the current view definition:
                </p>
                <wj-pivot-grid :items-source="ngPanel"></wj-pivot-grid>
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
            ngPanel: new wjcOlap.PivotEngine({
                itemsSource: getData(1000), // raw data
                valueFields: ['Amount'], // summarize amounts
                rowFields: ['Buyer', 'Type'] // summarize amounts
            })
        };
    },
    mounted: function() {
        this.ngPanel.fields.getField('Amount').format = 'c0';
        this.ngPanel.fields.getField('Date').format = 'yyyy';
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    .container-fluid .wj-pivotpanel {
        background: #eee;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    .container-fluid .wj-pivotpanel .wj-flexgrid {
        background: inherit;
    }

    .container-fluid .wj-pivotpanel [wj-part=d-filters] {
        background: gold;
    }

    body {
        margin-bottom: 24pt;
    }
</style>