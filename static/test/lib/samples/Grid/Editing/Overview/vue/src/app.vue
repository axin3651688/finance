<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :itemsSource="data" :initialized="initializeGrid">
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";


new Vue({
  	el: "#app",
  	data: {
        data: null
    },
    methods:{
        initializeGrid(){
            this.data = this._getData();
        },
        _getData() {
            // create some random data
            let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                data = [];
            for (let i = 0; i < countries.length; i++) {
                data.push({
                    id: i,
                    country: countries[i],
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000,
                    overdue: i % 4 == 0
                });
            }

            return data;
        }
    }
});
</script>

<style>
    .wj-flexgrid {
        max-height: 220px; 
        margin:10px;
    }
    .wj-cell.wj-group {
        border: none;
    }
    .wj-cell.wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {
        background-color: white;
    }
    body {
        margin-bottom: 24px;
    }
</style>

