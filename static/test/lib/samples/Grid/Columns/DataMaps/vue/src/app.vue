<template>
	<div class="container-fluid">
		<wj-flex-grid :itemsSource="data" :initialized="mainGridInitialized">
			<wj-flex-grid-column header="Customer" binding="customer" width="1.5*" :dataMap="customerMap"></wj-flex-grid-column>
			<wj-flex-grid-column header="Country" binding="country" width="*" :dataMap="countries"></wj-flex-grid-column>
			<wj-flex-grid-column header="Downloads" binding="downloads" width="*" format="n0"></wj-flex-grid-column>
			<wj-flex-grid-column header="Sales" binding="sales" width="*" format="n0"></wj-flex-grid-column>
			<wj-flex-grid-column header="Expenses" binding="expenses" width="*" format="n0"></wj-flex-grid-column>
		</wj-flex-grid>
		<p>
			And here is another grid showing all the customers.
			If you edit their names, you will see the change in the
			top grid:</p>
		<wj-flex-grid :itemsSource="customers" :initialized="dataMapGridInitialized"></wj-flex-grid>      
	</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";

new Vue({
  	el: "#app",
  	data: function() {
			return {
				countries: 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','),
				customers:  [
					{ id: 0, name: 'Paul Perkins', address: '123 Main St' }, 
					{ id: 1, name: 'Susan Smith', address: '456 Grand Ave' }, 
					{ id: 2, name: 'Joan Jett', address: '789 Broad St' }, 
					{ id: 3, name: 'Don Davis', address: '321 Shattuck Ave' }, 
				],
				data: null,
				customerMap: null
			};
	  	},
	  	methods:{
			mainGridInitialized(mainGrid){
				this.mainGrid = mainGrid;
			},
			dataMapGridInitialized(flexgrid) {
				this.data = this._getData();
				this.customerMap = new wjcGrid.DataMap(this.customers, 'id', 'name');
				var _this = this;
				flexgrid.rowEditEnded.addHandler(() => {
					let column = this.mainGrid.getColumn('customer');
					if (column) {
						column.dataMap = new wjcGrid.DataMap(_this.customers, 'id', 'name');
					}
					this.mainGrid.refresh(); // update customer names on the main grid
				});
    		},
		  	_getData() {
				let data = [];
				for (let i = 0; i < this.countries.length; i++) {
					data.push({
						id: i,
						country: this.countries[i],
						customer: this.customers[i % this.customers.length].id,
						active: i % 5 != 0,
						downloads: Math.round(Math.random() * 200000),
						sales: Math.random() * 100000,
						expenses: Math.random() * 50000
					});
				}
				return data;
    		}
	  	}
});
</script>

<style>
	.wj-flexgrid {
    height: 400px;
    margin: 6px 0;
}
</style>

