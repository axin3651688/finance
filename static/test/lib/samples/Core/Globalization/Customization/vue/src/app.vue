<template>
    <div class="container-fluid">
        <wj-flex-grid :itemsSource="data">
        <wj-flex-grid-filter></wj-flex-grid-filter>
        </wj-flex-grid>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import '@grapecity/wijmo.vue2.grid';
    import '@grapecity/wijmo.vue2.grid.filter';
    import * as wjCore from "@grapecity/wijmo";
    import { getData } from "./data";
    import * as gridFilter from '@grapecity/wijmo.grid.filter';

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                data: getData()
            };
        },
        created: function() {
            // customize grid filter conditions
            let filter = wijmo.culture.FlexGridFilter,
                Operator = gridFilter.Operator;
            //
            filter.stringOperators = [
                { name: "(not set)", op: null },
                { name: "Same", op: Operator.EQ },
                { name: "Different", op: Operator.NE },
                { name: "Bigger", op: Operator.GT },
                { name: "Smaller", op: Operator.LT }
            ];
            //
            filter.numberOperators = [
                { name: "(not set)", Operator: null },
                { name: "Same", op: Operator.EQ },
                { name: "Different", op: Operator.NE },
                { name: "Bigger", op: Operator.GT },
                { name: "Smaller", op: Operator.LT }
            ];
            //
            filter.dateOperators = [
                { name: "(not set)", op: null },
                { name: "Same", op: Operator.EQ },
                { name: "Earlier", op: Operator.LT },
                { name: "Later", op: Operator.GT }
            ];
            //
            filter.booleanOperators = [
                { name: "(not set)", op: null },
                { name: "Is", op: Operator.EQ },
                { name: "Isn't", op: Operator.NE }
            ];
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .container-fluid .wj-flexgrid {
        max-height: 300px;
    }
</style>
