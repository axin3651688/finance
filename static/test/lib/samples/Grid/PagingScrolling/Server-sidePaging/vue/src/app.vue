<template>
	<div class="container-fluid">
		<wj-flex-grid
				:isReadOnly=true
				:alternatingRowStep=0
				headersVisibility="Column"
				:itemsSource="data"
				:initialized="initializeGrid">
		</wj-flex-grid>
		<div id="pagerOd" class="wj-control wj-content wj-pager">
			<div class="wj-input-group">
				<span class="wj-input-group-btn">
					<button id="btnFirstOd" class="wj-btn wj-btn-default" type="button">
						<span class="wj-glyph-left" style="margin-right: -4px;"></span>
						<span class="wj-glyph-left"></span>
					</button>
				</span>
				<span class="wj-input-group-btn">
					<button id="btnPrevOd" class="wj-btn wj-btn-default" type="button">
						<span class="wj-glyph-left"></span>
					</button>
				</span>
				<input id="spanCurrentOd" class="wj-form-control" disabled type="text">
				<span class="wj-input-group-btn">
					<button id="btnNextOd" class="wj-btn wj-btn-default" type="button">
						<span class="wj-glyph-right"></span>
					</button>
				</span>
				<span class="wj-input-group-btn">
					<button id="btnLastOd" class="wj-btn wj-btn-default" type="button">
						<span class="wj-glyph-right"></span>
						<span class="wj-glyph-right" style="margin-left: -4px;"></span>
					</button>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjOdata from '@grapecity/wijmo.odata';
import * as wjCore from '@grapecity/wijmo';
import '@grapecity/wijmo.vue2.grid';
import '@grapecity/wijmo.vue2.input';

new Vue({
  	el: "#app",
  	data: {
		data: null
  	},
	methods:{
		initializeGrid(flex){
				var url = 'https://services.odata.org/Northwind/Northwind.svc';
				var viewOd = new wjOdata.ODataCollectionView(url, 'Customers', {
				pageSize: 6,
					pageOnServer: true,
					sortOnServer: true,
				pageChanged: updateCurrentPageOd,
				loaded: updateCurrentPageOd
			});
			this.data = viewOd;
			// update pager status
			viewOd.onPageChanged();
			function updateCurrentPageOd() {
				var curr = wjCore.format('Page {index:n0} of {cnt:n0}', {
					index: viewOd.pageIndex + 1,
					cnt: viewOd.pageCount
				});
				document.getElementById('spanCurrentOd').value = curr;
			}
			//
			// implement pager
			document.getElementById('pagerOd').addEventListener('click', function(e) {
				var btn = wjCore.closest(e.target, 'button');
				var id = btn ? btn.id : '';
				switch (id) {
					case 'btnFirstOd':
						viewOd.moveToFirstPage();
						break;
					case 'btnPrevOd':
						viewOd.moveToPreviousPage();
						break;
					case 'btnNextOd':
						viewOd.moveToNextPage();
						break;
					case 'btnLastOd':
						viewOd.moveToLastPage();
						break;
				}
			});
		}
	}
});
</script>

