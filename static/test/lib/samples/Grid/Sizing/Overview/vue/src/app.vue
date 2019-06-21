<template>
    <div class="container-fluid">
        <p>This grid has a max-height set to 150 pixels:</p>
        <wj-flex-grid :itemsSource="data" style="max-height: 150px;"></wj-flex-grid>

        <p>
            And this grid is as tall as necessary to show all its
            content without vertical scrollbars:
        </p>
        <wj-flex-grid :itemsSource="data"></wj-flex-grid>
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
#theGridFixed.wj-flexgrid {
    max-height: 150px;
}
</style>
