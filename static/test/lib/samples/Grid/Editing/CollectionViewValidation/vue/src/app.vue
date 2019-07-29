<template>
  <div class="container-fluid">
      <!-- the grid -->
      <wj-flex-grid :initialized="initializeGrid" :itemsSource="data">
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
import * as wjcCore from '@grapecity/wijmo';

new Vue({
  	el: "#app",
  	data: {
      	data: null,
      	countries:  ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark']
  	},
	methods:{
		initializeGrid(flex){
			this.data = this._getData();
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

        let view = new wjcCore.CollectionView(data, {
            getError: (item, prop) => {
                if (prop == 'sales' && item.sales < 0) {
                    return 'Sales cannot be negative!';
                }
                if (prop == 'expenses' && item.expenses < 0) {
                    return 'Expenses cannot be negative!';
                }
            }
        });
        return view;
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

