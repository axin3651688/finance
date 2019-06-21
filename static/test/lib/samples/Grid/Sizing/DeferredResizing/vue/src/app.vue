<template>
    <div class="container-fluid">
        <label for="deferResizing">Defer Resizing 
        <input id="deferResizing" type="checkbox" checked="checked" v-model="deferResizing"></label>
        <wj-flex-grid :itemsSource="data" :deferResizing="deferResizing"></wj-flex-grid>
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
                data: getData(),
                deferResizing: true
            };
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 500px;
    margin: 6px 0;
}
</style>
