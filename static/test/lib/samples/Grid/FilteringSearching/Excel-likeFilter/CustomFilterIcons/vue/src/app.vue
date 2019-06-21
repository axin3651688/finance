<template>
    <div class="container-fluid">
        <!-- the Custom Icons grid -->
        <h3>Custom Icons</h3>
        <wj-flex-grid class="custom-icons" :itemsSource="data">
            <wj-flex-grid-filter></wj-flex-grid-filter>
        </wj-flex-grid>
        <!-- the Custom Colors grid -->
        <h3>Custom Colors</h3>
        <wj-flex-grid class="custom-colors" :itemsSource="data">
            <wj-flex-grid-filter></wj-flex-grid-filter>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";
import '@grapecity/wijmo.vue2.grid.filter';
import * as wjcCore from "@grapecity/wijmo";

let App = Vue.extend({
    name: "app",
    data: function() {
        return {
            data: this.getData()
        };
    },
    methods: {
        getData: function() {
            // create some random data
            let countries = "US,Germany,UK,Japan,Italy,Greece".split(","),
                data = [];
            for (let i = 0; i < 200; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    downloads: Math.round(Math.random() * 20000),
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000
                });
            }
            return data;
        }
    }
});

new Vue({ render: h => h(App) }).$mount("#app");
</script>

<style>
.wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
}
body {
    margin-bottom: 20px;
}

/* show images on filtered columns */
.custom-icons .wj-glyph-filter {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABKUlEQVQ4ja2QP0vDQBiHf/cndzQhJKGGK6HQHFnsII4h4GfQqas4+zGcXDs5dNRPYj+EoFt316CDPZcrhNY0Mb0HnuV43+e4AxxhjKF1XU+bZ3MANwOdH9wghHgAYIZod/8OKqWWRVHc9VEptWwNJklyBeCbUrrRWs8Wi4U4ptZ6RindAPiyu4cEQXALYMsYM57nHZUxZgBs7U47vu/3/ks72wlhjL10xRhjz31iAICqqkac83VbjHO+rqpq1DsIAGEYjoUQH1JK01QI8R6G4fhfsR15nk+SJLlomuf5ZFAMANI0fcTec+3ZacEoilZRFK2cBQGcW90EpZT3ToJKqWtCyCcA43ne28lBAMiy7ExK+UQI+XES3BHH8aWU8tVZ0ELKspx2jznkF5WQhrjMdSwdAAAAAElFTkSuQmCC");
    background-repeat: no-repeat;
    background-position: bottom right;
    margin-top: 2px;
    width: 20px;
    height: 20px;
    border: none;
}
.custom-icons .wj-glyph-filter:after {
    display: none;
}
/* make active filter images 25% larger */
.custom-icons .wj-filter-on .wj-glyph-filter {
    transform: scale(1.25);
}

/* change the color of the filter glyphs */
.custom-colors .wj-glyph-filter {
    color: red;
    font-size: 125%;
}
</style>