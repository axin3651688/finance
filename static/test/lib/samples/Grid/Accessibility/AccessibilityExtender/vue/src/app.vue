<template>
    <div class="container-fluid">
        <div class="input-group">
            <div class="input-group-addon">
                <span class="glyphicon glyphicon-search"></span>
            </div>
            <input type="text" class="form-control" id="filter" placeholder="filter">
        </div>
        <!-- the grid -->
        <wj-flex-grid
            id="sample-grid"
            :alternatingRowStep="0"
            selectionMode="ListBox"
            :itemsSource="data"
            :initialized="initializeGrid">
        </wj-flex-grid>
    </div>
</template>

<script>
import '@grapecity/wijmo.styles/wijmo.css';
import 'bootstrap.css';
import Vue from 'vue';
import * as wijmo from '@grapecity/wijmo';
import * as gridPdf from '@grapecity/wijmo.grid.pdf';
import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { AccessibilityExtender } from './accessibility-extender';

new Vue({
    el: '#app',
    data: {
        data: null,
        _acX: null
    },
    methods: {
        initializeGrid(ctl) {
            this.flex = ctl;
            this.data = this._getData(100);
            this.flex.sortedColumn.addHandler((s, e) => {
                let col = s.columns[e.col];
                this._acX.alert('column ' + col.header +
                    ' sorted in ' + (col.currentSort == '+' ? 'ascending' : 'descending') + ' order');
            });
        }, 
        _getData(count) {
            // create some random data
            let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
                products = 'Tents,Boots,Knives,Bows,Arrows,Sleeping Bags,Lamps'.split(','),
                data = [];
            for (let i = 0; i < count; i++) {
                data.push({
                    id: i,
                    country: countries[i % countries.length],
                    product: products[i % products.length],
                    active: i % 5 != 0,
                    downloads: Math.round(Math.random() * 200000),
                    sales: Math.random() * 100000,
                    expenses: Math.random() * 50000
                });
            }
            return data;
        }
    },
    mounted: function(){
        this._acX = new AccessibilityExtender(this.flex);
        document.querySelector('#filter').addEventListener('input', (e) => {
            clearTimeout(this._toSearch);
            this._toSearch = setTimeout(() => {
                let search = e.target.value,
                    rx = new RegExp(search, 'i');
                this.flex.collectionView.filter = (item) => {
                    return !search || JSON.stringify(item).match(rx) != null;
                }
        
                // notify users that a filter was applied
                setTimeout(() => {
                    let msg = search
                        ? 'grid filtered on ' + search
                        : 'filter removed';
                    msg += ': ' + this.flex.rows.length + ' items displayed';
                    this._acX.alert(msg);
                }, 200);
            }, 900);
        });
    }
});
</script>

<style>
    .wj-flexgrid {
        height: 300px;
        margin: 6px 0;
    }
    #sample-grid .wj-cell {
        border-right: none;
        padding: 8px 3px;
    }
</style>