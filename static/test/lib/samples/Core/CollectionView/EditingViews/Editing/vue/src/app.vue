<template>
    <div class="container-fluid">
        <wj-flex-grid :itemsSource="view"></wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import * as wijmo from "@grapecity/wijmo";
    import { getData } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                view: new wijmo.CollectionView(getData(), {
                    sortDescriptions: ["country"]
                })
            };
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>
