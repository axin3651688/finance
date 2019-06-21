<template>
    <div class="container-fluid">
        <p>
            For example, the ComboBox below is used as a master
            control. Select a country from the combo and the
            grid below will show the items in that country:
        </p>

        <label>Select a country:
            <wj-combo-box
                :initialized="initCountriesCombo"
                :itemsSource="countries"
                :selectedIndexChanged="onCountriesSelectedIndexChanged"
            ></wj-combo-box>
        </label>
        <wj-flex-grid :itemsSource="detailView"></wj-flex-grid>
        <p>
            In the next example, The FlexGrid is used as the master
            control. Select an item on the grid and see the details
            in the controls below:
        </p>

        <h3>Master</h3>
        <wj-flex-grid
            :initialized="initGridMaster"
            :itemsSource="gridData"
            :selectionMode="'Row'"
            :isReadOnly="true"
            :selectionChanged="onSelectionChanged"
        ></wj-flex-grid>
        <h3>Detail</h3>
        <table class="tbl-spaced">
            <tr>
                <td>Country:</td>
                <td>
                    <wj-combo-box
                        :itemsSource="countries"
                        class="bnd-ctl"
                        id="theCountry"
                        :textChanged="this.setProperty.bind(this,'country')"
                    ></wj-combo-box>
                </td>
            </tr>
            <tr>
                <td>Product:</td>
                <wj-combo-box
                    :itemsSource="products"
                    class="bnd-ctl"
                    id="theProduct"
                    :textChanged="this.setProperty.bind(this,'product')"
                ></wj-combo-box>
            </tr>
            <tr>
                <td>Date:</td>
                <wj-input-date
                    class="bnd-ctl"
                    id="theDate"
                    :valueChanged="this.setProperty.bind(this,'date')"
                ></wj-input-date>
            </tr>
            <tr>
                <td>Sales:</td>
                <wj-input-number
                    class="bnd-ctl"
                    id="theSales"
                    :format="'n2'"
                    :step="10"
                    :valueChanged="this.setProperty.bind(this,'sales')"
                ></wj-input-number>
            </tr>
            <tr>
                <td>Expenses:</td>
                <wj-input-number
                    class="bnd-ctl"
                    id="theExpenses"
                    :format="'n2'"
                    :step="10"
                    :valueChanged="this.setProperty.bind(this,'expenses')"
                ></wj-input-number>
            </tr>
        </table>

        <p></p>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";

import * as wjCore from "@grapecity/wijmo";
import * as wjcGrid from "@grapecity/wijmo.grid";
import * as wjInput from "@grapecity/wijmo.input";
import "@grapecity/wijmo.vue2.input";
import "@grapecity/wijmo.vue2.grid";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            countries: "US,Germany,UK,Japan,Italy,Greece".split(","),
            products: "Phones,Cars,Stereos,Watches,Computers".split(","),
            gridData: null,
            detailView: null
        };
    },
    methods: {
        onCountriesSelectedIndexChanged: function() {
            this.detailView.refresh();
        },

        onSelectionChanged: function() {
            var item = this.theGridMaster.collectionView.currentItem;
            var bndCtls = document.querySelectorAll(".bnd-ctl");
            for (var i = 0; i < bndCtls.length; i++) {
                var host = bndCtls[i];
                var prop = host.id.substr(3).toLowerCase();
                var ctl = wjCore.Control.getControl(host);
                if (wjCore.isString(item[prop])) {
                    ctl["text"] = item[prop];
                } else {
                    ctl["value"] = item[prop];
                }
            }
        },

        setProperty: function(prop, sender) {
            var val =
                prop === "country" || prop === "product"
                    ? sender.text
                    : sender.value;
            var v = this.theGridMaster.collectionView;
            v.editItem(v.currentItem);
            v.currentItem[prop] = val;
            v.commitEdit();
        },

        getData: function() {
            var data = [];
            for (var i = 0; i < 50; i++) {
                data.push({
                    id: i,
                    country: this.countries[i % this.countries.length],
                    product: this.products[i % this.products.length],
                    date: wjCore.DateTime.addDays(new Date(), i),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
        },

        initGridMaster: function(theGridMaster) {
            this.theGridMaster = theGridMaster;
        },

        initCountriesCombo: function(countriesCombo) {
            this.countriesCombo = countriesCombo;
        }
    },
    mounted: function() {
        this.gridData = this.getData();
        var self = this;
        this.detailView = new wjCore.CollectionView(this.gridData, {
            filter: function(item) {
                return item.country === self.countriesCombo.text;
            }
        });
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 220px;
    margin: 10px;
}
.tbl-spaced td {
    vertical-align: middle;
    margin: 3px;
}
body {
    margin-bottom: 24pt;
}
</style>