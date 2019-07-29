<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            showSelectedHeaders="All"
            :showMarquee=true
            :deferResizing=true
            :initialized="initializeGrid"
            :itemsSource="data">
        </wj-flex-grid>
    </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import * as wijmo from '@grapecity/wijmo';
import { WjGridModule } from '@grapecity/wijmo.vue2.grid';

new Vue({
    el: '#app',
    data: {
        data: null
    },
    methods: {
        initializeGrid(ctl) {
            this.data = this._getData()
        }, 
        _getData() {
            // create some random data
            let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                data = [];
            for (let i = 0; i < 200; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    active: i % 5 != 0,
                    downloads: Math.round(Math.random() * 200000),
                    sales: Math.random() * 100000,
                    expenses: Math.random() * 50000
                });
            }
            return data;
        }
    },
});
</script>

<style>
    .wj-flexgrid .wj-marquee,
    .wj-flexgrid .wj-header,
    .wj-flexgrid .wj-cell {
    transition: all .4s;
    
    /* want to play? -> http://cubic-bezier.com */
        transition-timing-function: cubic-bezier(.5,0,.5,1)
    }
    .wj-flexgrid {
        max-height: 250px;
        margin-bottom: 24px;
    }
</style>