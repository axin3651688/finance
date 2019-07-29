<template>
    <div class="container-fluid">
        <wj-flex-grid :itemsSource="data"></wj-flex-grid>
        <wj-flex-grid
            :itemsSource="data"
            :headersVisibility="'None'"
            :allowResizing="'ColumnsAllCells'"
        ></wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData()
            };
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    height: 200px;
    margin-bottom: 24pt;
}
</style>
