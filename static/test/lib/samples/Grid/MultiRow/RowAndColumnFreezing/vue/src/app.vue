<template>
    <div class="container-fluid">
        <wj-multi-row :initialized="initSlip" :itemsSource="orders" :layoutDefinition="layoutDefinition"></wj-multi-row>
        <br />
        <button class="btn btn-default" @click="onFreezeClick" v-html="textContent">
        </button>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid.multirow';

    import { generateAppData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            let data = generateAppData();
            return {
                orders: data.orders,
                layoutDefinition: data.ldTwoLines,
                textContent: 'Freeze',
                freezeMultirow: null
            }
        },
        methods: {
            initSlip: function(freezeMultirow){
                this.freezeMultirow = freezeMultirow;
            },
            onFreezeClick: function() {
                this.freezeMultirow.frozenColumns = this.freezeMultirow.frozenColumns ? 0 : 2;
                this.freezeMultirow.frozenRows = this.freezeMultirow.frozenRows ? 0 : 2;
                this.textContent = this.freezeMultirow.frozenRows == 0 ? 'Freeze' : 'Unfreeze';
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
.wj-multirow {
  height: 400px;
  width: 600px;
  margin: 6px 0;
}

/* custom styling for frozen cells */
.wj-flexgrid .wj-cell.wj-frozen:not(.wj-header):not(.wj-group):not(.wj-state-selected):not(.wj-state-multi-selected) {
  background-color: #f3fbcc;
}
</style>
