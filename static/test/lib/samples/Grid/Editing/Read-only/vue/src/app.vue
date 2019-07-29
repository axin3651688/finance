<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :itemsSource="data"
            :initialized="initializeGrid">
            <wj-flex-grid-column binding="id" header="ID" :width=50 :isReadOnly=true></wj-flex-grid-column>
            <wj-flex-grid-column binding="country" header="Country" :isRequired=true></wj-flex-grid-column>
            <wj-flex-grid-column binding="sales" header="Sales" :isRequired=false></wj-flex-grid-column>
            <wj-flex-grid-column binding="expenses" header="Expenses" :isRequired=false></wj-flex-grid-column>
            <wj-flex-grid-column binding="overdue" header="Overdue"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';


new Vue({
  	el: "#app",
  	data: {
        data: null
    },
    methods:{
        initializeGrid(flex){
            this.data = this._getData();
            flex.beginningEdit.addHandler((s, e) => {
                let item = s.rows[e.row].dataItem;
                if (item.overdue) { // prevent editing overdue items
                    e.cancel = true;      
                }
            });
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
        max-height: 200px;
        margin-bottom: 12px;
    }

    body {
        margin-bottom: 24px;
    }
</style>

