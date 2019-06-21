<template>
	<div class="container-fluid">
		<wj-flex-grid
			:stickyHeaders=true
			:itemsSource="data">
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
  	data: function() {
			return {
				data : this._getData()
			};
	  	},
	  	methods:{
			_getData() {
				// generate some random data
				let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
					data = [];
				for (let i = 0; i < 100; i++) {
					data.push({
						id: i,
						country: countries[i % countries.length],
						downloads: Math.round(Math.random() * 20000),
						sales: Math.random() * 10000,
						expenses: Math.random() * 5000,
						num1: Math.random() * 5000,
						num2: Math.random() * 5000,
						num3: Math.random() * 5000,
						num4: Math.random() * 5000,
						num5: Math.random() * 5000,
					});
				}
				return data;
			}
	  	}
});
</script>

<style>
	.wj-flexgrid {
		margin: 10px 0;
	}
	body {
		margin-bottom: 20px;
	}
</style>

