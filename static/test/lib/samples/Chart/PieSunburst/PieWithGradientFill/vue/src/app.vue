<template>
    <div class="container-fluid">
        <wj-flex-pie header="Best-selling Mobile Phones Brands of 2017" bindingName="brand" binding="sales"
            :itemsSource="data"
            :palette="['l(0,0,1,0)#89f7fe-#66a6ff', 'l(0,0,0,1)#13547a-#80d0c7', 'l(0,0,1,1)#ff0844-#ffb199', 'l(0,0,1,0)#b224ef-#7579ff-#b224ef', 'l(0,0,0,1)#e27f00-#ae1a73', 'r(0.5,0.5,0.7)#cc208e-#6713d2']">
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
            data: getData()
        }
    });
</script>

<style>
    body {
        margin-bottom: 24px;
    }
</style>
