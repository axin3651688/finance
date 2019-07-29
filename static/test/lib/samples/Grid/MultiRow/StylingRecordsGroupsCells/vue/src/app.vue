<template>
    <div class="container-fluid">
        <wj-multi-row class="multirow-css" :itemsSource="orders" :layoutDefinition="layoutDefinition"></wj-multi-row>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid.multirow';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            let data = getData();
            return {
                orders: data.orders,
                layoutDefinition: data.ldThreeLines
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-multirow {
    height: 400px;
    margin: 6px 0;
}

/* custom styling for a MultiRow */
.multirow-css .wj-row .wj-cell.wj-record-end:not(.wj-header) {
  border-bottom: 1px solid #000; /* thin black lines between records */
}
.multirow-css .wj-row .wj-cell.wj-group-end {
  border-right: 2px solid #00b68c; /* thick green lines between groups */
}
.multirow-css .wj-cell.id {
  color: #c0c0c0;
}
.multirow-css .wj-cell.amount {
  color: #014701;
  font-weight: bold;
}
.multirow-css .wj-cell.email {
  color: #0010c0;
  text-decoration: underline;
}
</style>
