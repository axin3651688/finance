<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :imeEnabled=true
            :itemsSource="data">
            <wj-flex-grid-column binding="id" header="#" :width="50" :isReadOnly=true></wj-flex-grid-column>
            <wj-flex-grid-column binding="en" header="English"></wj-flex-grid-column>
            <wj-flex-grid-column binding="ja" header="Japanese"></wj-flex-grid-column>
            <wj-flex-grid-column binding="pop" header="Pop (tho)" format="n0"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import { getData } from "./data.js"


new Vue({
  	el: "#app",
  	data: {
        data: getData()
  	}
});
</script>

<style>
    .wj-flexgrid {
        max-height: 200px;
        margin-bottom: 12px;
    }

    body {
        margin-bottom: 48px;
    }
</style>

