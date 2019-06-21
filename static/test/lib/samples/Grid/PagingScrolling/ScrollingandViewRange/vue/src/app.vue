<template>
	<div class="container-fluid">
		<button @click="scrollIntoView" class="btn btn-default">
			Scroll Row 100 Into View 
		</button>
		<button @click="scrollToTop" class="btn btn-default">
			Set Top Cell to Row 100
		</button>
		<wj-flex-grid
			:itemsSource="data" :initialized="initializeGrid">
		</wj-flex-grid>
	</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.vue2.grid';

new Vue({
  	el: "#app",
  	data: {
		data: null
  	},
	methods:{
		initializeGrid(flex){
			this.data = this._getData();
			this.flex = flex;
		},
		scrollIntoView() {
			this.flex.scrollIntoView(100, -1);
		},
		scrollToTop() {
			// get cell rect, adjust scrollPosition.y to bring it to the top
			let rc = this.flex.cells.getCellBoundingRect(100, 0, true);
			this.flex.scrollPosition = new wjcCore.Point(this.flex.scrollPosition.x, -rc.top);
		},
		_getData() {
			let countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','),
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
	}
});
</script>
<style>
	.wj-flexgrid {
		max-height: 200px;
		margin: 12px 0;
	}
	body {
		margin-bottom: 20px;
	}
</style>

