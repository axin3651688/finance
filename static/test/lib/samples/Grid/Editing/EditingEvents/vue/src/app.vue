<template>
    <div class="container-fluid">
        <div class="log">{{eventLog}}</div>
        <!-- the grid -->
        <wj-flex-grid
            :itemsSource="data"
            :initialized="initializeGrid">
            <wj-flex-grid-column binding="id" header="ID" :width=50 :isReadOnly=true></wj-flex-grid-column>
            <wj-flex-grid-column binding="country" header="Country" :isRequired=true :dataMap="countries"></wj-flex-grid-column>
            <wj-flex-grid-column binding="sales" header="Sales" format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column binding="expenses" header="Expenses" format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column binding="overdue" header="Overdue"></wj-flex-grid-column>
        </wj-flex-grid>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcInput from '@grapecity/wijmo.input';

new Vue({
  	el: "#app",
  	data: {
        eventLog: '',
        data: [],
        countries: ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece']
  	},
	methods:{
		initializeGrid(flex){
            this.data = this._getData();
            flex.beginningEdit.addHandler((s, e) => {
                this.eventLog = '';
                let col = s.columns[e.col];
                if (col.binding != 'overdue') {
                    let item = s.rows[e.row].dataItem;
                    if (item.overdue) { // prevent editing overdue items
                        e.cancel = true;
                        this.eventLog = 'Overdue items cannot be edited';
                    }
                }
            });
            flex.cellEditEnding.addHandler((s, e) => {
                this.eventLog = '';
                let col = s.columns[e.col];
                if (col.binding == 'sales' || col.binding == 'expenses') {
                    let value = wjcCore.changeType(s.activeEditor.value, wjcCore.DataType.Number, col.format);
                    if (!wjcCore.isNumber(value) || value < 0) { // prevent negative sales/expenses
                        e.cancel = true;
                        this.eventLog = 'Please enter a positive amount';
                    }
                }
            });
		},
		_getData() {
            // create some random data
            let data = [];
            for (let i = 0; i < this.countries.length; i++) {
                data.push({
                    id: i,
                    country: this.countries[i],
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
    .log {
        font-style: italic;
        text-align: center;
        margin-bottom: 10px;
        opacity: .5;
    }
    body {
        margin-bottom: 24px;
    }
</style>

