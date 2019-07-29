<template>
	<div class="container-fluid">
		<wj-flex-grid class="no-scrollbars"
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
			this.flex.hostElement.addEventListener('wheel', (e) => {
				let root = this.flex.hostElement.querySelector('[wj-part="root"]');
				if (root) {
					root.scrollTop += 32 * (e.deltaY < 0 ? -1 : +1);
					e.preventDefault();
				}
			});
		},
		_getData() {
			let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
			let data = [];
			for (let i = 0; i < 50; i++) {
				data.push({
					id: i,
					country: countries[i % countries.length],
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
		max-height: 250px;
	}
	.no-scrollbars.wj-flexgrid [wj-part=root] {
		overflow: hidden !important;
	}
</style>

