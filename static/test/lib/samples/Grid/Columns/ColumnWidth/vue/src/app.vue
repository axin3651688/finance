<template>
	<div class="container-fluid">
			<h4>
					Example 1:
			</h4>
			<p>
					This grid has four columns. The first is 80 pixels wide and can be resized between
					40 and 160 pixels. The other three have widths of 2*, *, and *, and cannot be
					resized using the mouse.
			</p>
			<p>
					Notice that the second column is twice as wide as the third and fourth columns, and that
					they keep these proportions even as you resize the first column or the whole grid.
			</p>

			<wj-flex-grid class="grid" :itemsSource="data">
					<wj-flex-grid-column header="Date" binding="start" :width=80 :minWidth=40 :maxWidth=160></wj-flex-grid-column>
					<wj-flex-grid-column header="Product" binding="product" width="2*" :allowResizing=false></wj-flex-grid-column>
					<wj-flex-grid-column header="Revenue" binding="amount" width="*" :allowResizing=false></wj-flex-grid-column>
					<wj-flex-grid-column header="Expense" binding="amount2" format="n0" width="*" :allowResizing=false></wj-flex-grid-column>
			</wj-flex-grid>
			<br />
			<br />
			<h4>
					Example 2:
			</h4>
			<p>
					This grid shows how you can make any column stretch to fill the available space. In this case,
					we set the width of the second column to * to achieve that effect.
			</p>
			<p>
					We also set the minimum width of the second column to 100 pixels in order to prevent it from
					getting too narrow when the other columns in the grid are resized, and we prevent users from
					resizing this column with the mouse.
			</p>

			<wj-flex-grid class="grid" :itemsSource="data">
					<wj-flex-grid-column header="Date" binding="start" :width=80></wj-flex-grid-column>
					<wj-flex-grid-column header="Product" binding="product" width="*" :minWidth=100 :allowResizing=false></wj-flex-grid-column>
					<wj-flex-grid-column header="Revenue" binding="amount" format="n0" :width=120></wj-flex-grid-column>
			</wj-flex-grid>
			<br />
			<br />
			<h4>
					Example 3:
			</h4>
			<p>
					This example sets all widths to *, which means the space available is divided equally among them.
					Resize the browser and notice how the grid resizes and the columns fill it up equally.
			</p>
			<p>
					Also, unlike the other examples, this one sets the allowResizing property of the entire grid rather
					than an individual column. We set this one to None, but you may also choose Columns, Rows, or Both.
			</p>
			<wj-flex-grid class="grid" allowResizing="None" :itemsSource="data">
					<wj-flex-grid-column header="Date" binding="start" width="*"></wj-flex-grid-column>
					<wj-flex-grid-column header="Product" binding="product" width="*" :minWidth=100></wj-flex-grid-column>
					<wj-flex-grid-column header="Revenue" binding="amount" format="n0" width="*"></wj-flex-grid-column>
					<wj-flex-grid-column header="Expense" binding="amount2" format="n0" width="*"></wj-flex-grid-column>
			</wj-flex-grid>
	</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from "@grapecity/wijmo.grid";
import { getData } from "./data";

new Vue({
  	el: "#app",
  	data: function() {
			return {
				data: getData(500)
			};
  	}
});
</script>

<style>
	.wj-flexgrid {
    height: 400px;
    margin: 6px 0;
}
</style>

