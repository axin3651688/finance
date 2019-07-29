<template>
    <div class="container-fluid">
        <h2>FlexGrid Validation</h2>
        <p>
            The <b>FlexGrid</b> uses the
            <b>CollectionView.getError</b> property by default. Try entering an invalid
            country or a negative number to see how the grid identifies the error and prevents the invalid entry from being
            committed:
        </p>
        <wj-flex-grid :itemsSource="view"></wj-flex-grid>

        <h2>Forms Validation</h2>
        <p>
            You can use the the
            <b>CollectionView.getError</b> property to validate forms as well. Simply call the function
            and apply the result to the appropriate input element using the
            <b>setCustomValidity</b> method that is part of
            the HTML5 validation API:
        </p>
        <form id="theForm" class="form-inline" @input="validateForm($event.target)" @submit="$event.preventDefault()">
            <div class="form-group">
                <label for="country">Country</label>
                <input id="country" type="text" class="form-control" required value="US">
            </div>

            <div class="form-group">
                <label for="downloads">Downloads</label>
                <input id="downloads" type="number" class="form-control" required value="123">
            </div>

            <div class="form-group">
                <label for="sales">Sales</label>
                <input id="sales" type="number" class="form-control" required value="123">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from "vue";
    import "@grapecity/wijmo.vue2.grid";
    import * as wijmo from "@grapecity/wijmo";
    import { getData, countries } from "./data";

    let App = Vue.extend({
        name: "app",
        data: function() {
            return {
                theItem: {},
                view: new wijmo.CollectionView(getData(), {
                    sortDescriptions: ["country"],
                    getError: (item, propName) => {
                        switch (propName) {
                            case "country":
                            return countries.indexOf(item.country) < 0
                                ? "Invalid Country"
                                : "";
                            case "downloads":
                            case "sales":
                            case "expenses":
                            return item[propName] < 0 ? "Negative values not allowed!" : "";
                            case "active":
                            return item.active && item.country.match(/^(US|UK)$/)
                                ? "Active items not allowed in the US or UK!"
                                : "";
                        }
                        return null;
                    }
                })
            };
        },
        methods: {
            validateForm: function(input) {
                let propName = input.id;
                //
                this.theItem[propName] = input.value;
                input.setCustomValidity(this.view.getError(this.theItem, propName));
            }
        }
    });

    new Vue({ render: h => h(App) }).$mount("#app");
</script>