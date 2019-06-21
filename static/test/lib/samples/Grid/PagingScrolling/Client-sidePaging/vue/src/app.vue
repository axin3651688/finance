<template>
	<div class="container-fluid">
			<wj-flex-grid
					:alternatingRowStep="0"
					headersVisibility="Column"
					:itemsSource="data"
					:initialized="initializeGrid">
			</wj-flex-grid>
      <div id="pager" class="wj-control wj-content wj-pager">
        <div class="wj-input-group">
          <span class="wj-input-group-btn">
            <button id="btnFirst" class="wj-btn wj-btn-default" type="button">
              <span class="wj-glyph-left" style="margin-right: -4px;"></span>
              <span class="wj-glyph-left"></span>
            </button>
          </span>
          <span class="wj-input-group-btn">
            <button id="btnPrev" class="wj-btn wj-btn-default" type="button">
              <span class="wj-glyph-left"></span>
            </button>
          </span>
          <input id="spanCurrent" class="wj-form-control" disabled type="text">
          <span class="wj-input-group-btn">
            <button id="btnNext" class="wj-btn wj-btn-default" type="button">
              <span class="wj-glyph-right"></span>
            </button>
          </span>
          <span class="wj-input-group-btn">
            <button id="btnLast" class="wj-btn wj-btn-default" type="button">
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
			this.data = this._getData();
		},
		_getData() {
			let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
			let products = 'Piano,Violin,Flute,Guitar,Cello'.split(',');
			let data = [];
			for (let i = 0; i < 10000; i++) {
				data.push({
					id: i,
					country: countries[i % countries.length],
					product: products[i % products.length],
					sales: Math.random() * 10000,
					expenses: Math.random() * 5000
				});
			}

			// create a CollectionView with 20 items per page
			let view = new wjCore.CollectionView(data, {
				pageSize: 6,
				pageChanged: updateCurrentPage
			});
			//
			// update pager status
			view.onPageChanged();
			function updateCurrentPage() {
				var curr = wjCore.format('Page {index:n0} of {cnt:n0}', {
					index: view.pageIndex + 1,
				cnt: view.pageCount
				});
				document.getElementById('spanCurrent').value = curr;
			}
			document.getElementById('pager').addEventListener('click', function(e) {
				var btn = wjCore.closest(e.target, 'button');
				var id = btn ? btn.id : '';
				switch (id) {
					case 'btnFirst':
							view.moveToFirstPage();
					break;
					case 'btnPrev':
							view.moveToPreviousPage();
					break;
					case 'btnNext':
							view.moveToNextPage();
					break;
					case 'btnLast':
							view.moveToLastPage();
					break;
				}
			});
			// done
			return view;
		}
	}
});
</script>

