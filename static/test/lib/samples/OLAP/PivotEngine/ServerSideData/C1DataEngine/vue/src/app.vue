<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-6">
            <p>
                Drag and drop fields to build views:
            </p>
            <wj-pivot-panel :items-source="ngCube"></wj-pivot-panel>
            </div>
            <div class="col-xs-6">
            <p>
                Summary for the current view definition:
            </p>
            <wj-pivot-grid :items-source="ngCube"></wj-pivot-grid>
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

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            ngCube: new wjcOlap.PivotEngine({
                // connect to ComponentOne Data Service
                itemsSource: 'https://demos.componentone.com/ASPNET/c1webapi/4.0.20173.114/api/dataengine/complex10',
                // build default view
                valueFields: ['Sales', 'Downloads'],
                rowFields: ['Country', 'Product']
            })
        };
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
  max-height: 400px;
}

body {
  margin-bottom: 24pt;
}
</style>