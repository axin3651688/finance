<template>
  <div class="container-fluid">
    <wj-flex-grid :itemsSource="data" :initialized="initializedGrid"></wj-flex-grid>
    <div style="display:none">
      	<wj-list-box class="column-picker" :initialized="initializedPicker"></wj-list-box>
    </div>

    <p>
		You can use the grid's
		<b>columnLayout</b> property to allow users
		to save and restore column layouts. Click the buttons below
		to see how this works:
    </p>
    <button v-on:click="saveLayout" class="btn btn-default">Save Layout</button>
    <button v-on:click="loadLayout" class="btn btn-default">Restore Layout</button>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import "@grapecity/wijmo.vue2.input";
import * as wjcCore from "@grapecity/wijmo";
import * as wjcInput from "@grapecity/wijmo.input";
import * as wjcGrid from "@grapecity/wijmo.grid";
import { getData } from "./data";

new Vue({
  	el: "#app",
  	data: function() {
		return {
			data: getData()
		};
  	},
  	methods: {
		saveLayout() {
			localStorage.setItem("myLayout", this.flex.columnLayout);
		},
		loadLayout() {
			let layout = localStorage.getItem("myLayout");
			if (layout) {
				this.flex.columnLayout = layout;
			}
		},
		initializedPicker(picker){
			this.columnPicker = picker;
		},
		initializedGrid(ctl) {
			this.flex = ctl;
			this.flex.formatItem.addHandler((s, e) => {
				if (e.panel == s.topLeftCells) {
				e.cell.innerHTML =
					'<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
				}
			});

			// show the column picker when the user clicks the top-left cell
			let ref = this.flex.hostElement.querySelector(".wj-topleft");
			ref.addEventListener("mousedown", e => {
				if (wjcCore.hasClass(e.target, "column-picker-icon")) {
					wjcCore.showPopup(this.columnPicker.hostElement, ref, false, true, false);
					this.columnPicker.focus();
					e.preventDefault();
				}
			});
		}
	},
	mounted: function(){
		if (this.flex) {
            this.columnPicker.itemsSource = this.flex.columns;
            this.columnPicker.checkedMemberPath = 'visible';
            this.columnPicker.displayMemberPath = 'header';
            this.columnPicker.lostFocus.addHandler(() => {
                wjcCore.hidePopup(this.columnPicker.hostElement);
            });
        }
	}  
});
</script>

<style>
	.wj-flexgrid {
		max-height: 300px;
		margin: 10px 0;
	}
	.column-picker {
		columns: 3;
		padding: 12px;
		margin-left: 12px;
		margin-top: 26px;
		box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
	}
	.column-picker-icon {
		cursor: pointer;
		color: #FF8754;
		margin: 3px;
	}
	body {
		margin-bottom: 20px;
	}
</style>

