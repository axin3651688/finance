<template>
  <div class="container-fluid">
      <!-- the grid -->
      <wj-flex-grid
          :itemsSource="data"
          :initialized="initializeGrid">
          <wj-flex-grid-column binding="id" header="ID" :width=50></wj-flex-grid-column>
          <wj-flex-grid-column binding="country" header="Country" :isRequired=true :dataMap="countries"></wj-flex-grid-column>
          <wj-flex-grid-column binding="sales" header="Sales"></wj-flex-grid-column>
          <wj-flex-grid-column binding="expenses" header="Expenses"></wj-flex-grid-column>
          <wj-flex-grid-column binding="overdue" header="Overdue"></wj-flex-grid-column>
      </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import '@grapecity/wijmo.input';

new Vue({
  	el: "#app",
  	data: {
      	data: null,
      	countries:  ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece']
  	},
	methods:{
		initializeGrid(flex){
			this.data = this._getData();
			flex.gotFocus.addHandler(() => {
            	flex.startEditing(false); // quick mode
        	});
        	flex.selectionChanged.addHandler(() => {
				setTimeout(() => {
					flex.startEditing(false); // quick mode
				}, 50); // let the grid update first
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

	body {
		margin-bottom: 24px;
	}
</style>

