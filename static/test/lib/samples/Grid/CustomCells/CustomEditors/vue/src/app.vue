<template>
    <div class="container-fluid">
        <wj-flex-grid :keyActionTab="'CycleOut'" :initialized="initializeGrid" :itemsSource="itemSourceData">
            <wj-flex-grid-column :binding="'id'" :header="'ID'" :width="40" :isReadOnly="true"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'date'" :header="'Date'" :format="'d'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'time'" :header="'Time'" :format="'t'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'country'" :header="'Country'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'product'" :header="'Product'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'amount'" :header="'Amount'" :format="'n2'"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcInput from "@grapecity/wijmo.input";
import * as wjcGrid from "@grapecity/wijmo.grid";
import { WjInputModule } from "@grapecity/wijmo.vue2.input";
import { WjGridModule } from "@grapecity/wijmo.vue2.grid";
import { CustomGridEditor } from "./custom-grid-editor";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            countries: "US,Germany,UK,Japan,Italy,Greece".split(","),
            products: [
                { id: 0, name: "Widget", unitPrice: 23.43 },
                { id: 1, name: "Gadget", unitPrice: 12.33 },
                { id: 2, name: "Doohickey", unitPrice: 53.07 }
            ],
            itemSourceData: null,
        };
    },
    methods: {
        initializeGrid: function(flex) {
            // add custom editors to the grid
            new CustomGridEditor(flex, "date", wjcInput.InputDate, {
                format: "d"
            });
            new CustomGridEditor(flex, "time", wjcInput.InputTime, {
                format: "t",
                min: new Date(2000, 1, 1, 7, 0),
                max: new Date(2000, 1, 1, 22, 0),
                step: 30
            });
            new CustomGridEditor(flex, "country", wjcInput.ComboBox, {
                itemsSource: this.countries
            });
            new CustomGridEditor(flex, "amount", wjcInput.InputNumber, {
                format: "n2",
                step: 10
            });
            //
            // create an editor based on a ComboBox
            let multiColumnEditor = new CustomGridEditor(
                flex,
                "product",
                wjcInput.ComboBox,
                {
                    headerPath: "name",
                    displayMemberPath: "name",
                    itemsSource: this.products
                }
            );
            //
            // customize the ComboBox to show multiple columns
            let combo = multiColumnEditor.control;
            combo.listBox.formatItem.addHandler((s, e) => {
                e.item.innerHTML =
                    "<table><tr>" +
                    '<td style="width:30px;text-align:right;padding-right:6px">' +
                    e.data.id +
                    "</td>" +
                    '<td style="width:100px;padding-right:6px"><b>' +
                    e.data.name +
                    "</b></td>" +
                    '<td style="width:80px;text-align:right;padding-right:6px">' +
                    wjcCore.Globalize.format(e.data.unitPrice, "c") +
                    "</td>" +
                    "</tr></table>";
            });
        },

        getData: function() {
            let data = [];
            let dt = new Date();
            for (let i = 0; i < 100; i++) {
                data.push({
                    id: i,
                    date: new Date(
                        dt.getFullYear(),
                        i % 12,
                        25,
                        i % 24,
                        i % 60,
                        i % 60
                    ),
                    time: new Date(
                        dt.getFullYear(),
                        i % 12,
                        25,
                        i % 24,
                        i % 60,
                        i % 60
                    ),
                    country: this.countries[
                        Math.floor(Math.random() * this.countries.length)
                    ],
                    product: this.products[
                        Math.floor(Math.random() * this.products.length)
                    ].name,
                    amount: Math.random() * 10000 - 5000,
                    discount: Math.random() / 4
                });
            }
            return data;
        }
    },
    mounted:function(){
        this.itemSourceData = this.getData();
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    height: 300px;
    margin-bottom: 12px;
}

.wj-flexgrid .wj-cell {
    padding: 6px 3px;
}

body {
    margin-bottom: 24px;
}
</style>