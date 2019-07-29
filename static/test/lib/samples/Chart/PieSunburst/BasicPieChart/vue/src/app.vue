<template>
    <div class="container-fluid">
        <wj-flex-pie header="Best-selling Mobile Phones Brands of 2017" bindingName="brand" binding="sales"
            :itemsSource="data"
            :palette="['rgba(42,159,214,1)', 'rgba(119,179,0,1)', 'rgba(153,51,204,1)', 'rgba(255,136,0,1)', 'rgba(204,0,0,1)', 'rgba(0,204,163,1)', 'rgba(61,109,204,1)', 'rgba(82,82,82,1)', 'rgba(0,0,0,1)']">
            <wj-flex-pie-data-label :content="getLabelContent"></wj-flex-pie-data-label>
        </wj-flex-pie>
    </div>
</template>

<script>
    import '@grapecity/wijmo.styles/wijmo.css';
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.chart';
    import { getData } from './data';
    //
    new Vue({
        el: '#app',
        data: {
            data: getData(),
            sum: null
        },
        methods: {
            getLabelContent(ht) {
                return wijmo.format('{name} {val:p2}', { name: ht.name, val: ht.value / this.sum });
            }
        },
        created() {
            this.sum = this.data.map(c => c.sales).reduce((sum, cur) => sum + cur);
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .container-fluid .wj-flexchart .wj-data-labels .wj-data-label {
        fill: white;
    }
</style>
