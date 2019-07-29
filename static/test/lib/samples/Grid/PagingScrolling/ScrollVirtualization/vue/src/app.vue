<template>
	<div class="container-fluid">
		<wj-flex-grid
			:initialized="initializeGrid"
			:itemsSource="data">
		</wj-flex-grid>
		<p>
			The grid now has <span id='rowCount'>{{rowCount}}</span> rows and
        	<span id='cellCount'>{{cellCount}}</span> cell elements.
		</p>
	</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcGrid from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.input';
import { getData } from './data';

new Vue({
  	el: "#app",
  	data: {
		data: getData(100),
		rowCount: 0,
		cellCount: 0
  	},
	methods:{
		initializeGrid(flex){
			this.rowCount = flex.rows.length;	
			this.cellCount = flex.hostElement.querySelectorAll('.wj-cell').length;    
			flex.updatedView.addHandler((s) => {
				this.rowCount = s.rows.length;	
				this.cellCount = s.hostElement.querySelectorAll('.wj-cell').length;    
			});
			flex.scrollPositionChanged.addHandler((s) => {
				// if we're close to the bottom, add 20 items
				if (s.viewRange.bottomRow >= s.rows.length - 1) {
					this._addData(this.data, 20);
					s.collectionView.refresh();
				}
			});
		},
		_addData(data, cnt) {
			let more = getData(cnt, data.length);
			for (let i = 0; i < more.length; i++) {
				data.push(more[i])
			}
		}
	}
});
</script>
<style>
	 .wj-flexgrid {
		height: 250px; 
	}
	#rowCount, #cellCount {
		font-weight: bold;
	}
	body {
		margin-bottom: 24pt;
	}
</style>

