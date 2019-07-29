<template>
	<div class="container-fluid">
		<wj-flex-grid
			:itemsSource="data">
			<wj-flex-grid-column header="ID" binding="id" :allowDragging=false></wj-flex-grid-column>
			<wj-flex-grid-column header="Country" binding="country"></wj-flex-grid-column>
			<wj-flex-grid-column header="Downloads" binding="downloads"></wj-flex-grid-column>
			<wj-flex-grid-column header="Sales" binding="sales"></wj-flex-grid-column>
			<wj-flex-grid-column header="Expenses" binding="expenses"></wj-flex-grid-column>
		</wj-flex-grid>
		<div class="panel panel-warning">
			<div class="panel-heading">
				Wijmo uses the HTML5 drag/drop API for column reordering.
				Unfortunately, most mobile devices do not support this API.
				If you want to support column reordering on mobile devices,
				we suggest you use the 
				<a href="https://github.com/Bernardo-Castilho/dragdroptouch" target="_blank">
					DragDropTouch polyfill
				</a>.
			</div>
		</div>
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
				data : this._getData()
			};
	  	},
	  	methods:{
			_getData() {
				// generate some random data
				let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
					data = [];
				for (let i = 0; i < countries.length; i++) {
					data.push({
						id: i,
						country: countries[i],
						downloads: Math.round(Math.random() * 20000),
						sales: Math.random() * 10000,
						expenses: Math.random() * 5000
					});
				}
				return data;
			}
	  	}
});
</script>

<style>
	.wj-flexgrid {
		height: 150px; 
		margin:10px 0;
	}
</style>

