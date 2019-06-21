<template>
  <div class="container-fluid">
      <wj-flex-grid
          :itemsSource="data" :initialized="initializedGrid">
          <wj-flex-grid-column binding="id" header="ID" :width=60 :isReadOnly=true></wj-flex-grid-column>
          <wj-flex-grid-column binding="country" header="Country"></wj-flex-grid-column>
          <wj-flex-grid-column binding="product" header="Product"></wj-flex-grid-column>
          <wj-flex-grid-column binding="sales" header="Sales" aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column binding="expenses" header="Expenses" aggregate="Sum"></wj-flex-grid-column>
          <wj-flex-grid-column binding="profit" header="Profit" :dataType=2 :isReadOnly=true></wj-flex-grid-column>
      </wj-flex-grid>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcCore from '@grapecity/wijmo';
import { getData } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
        data: new wjcCore.CollectionView(getData(), {
            groupDescriptions: [
                new wjcCore.PropertyGroupDescription('Grand Total', 
                    () => {
                        return '';
                    }),
                'country'
            ]
        })
    };
  },
  methods:{
    initializedGrid(flex){
        // start collapsed
        flex.collapseGroupsToLevel(1);
        // custom cell calculation
        flex.formatItem.addHandler((s, e) => {
            // cells and column footer panels only
            if (e.panel == s.cells) {
                // get row, column, and data item (or group description)
                let r = s.rows[e.row],
                    c = s.columns[e.col],
                    item = s.rows[e.row].dataItem,
                    group = r instanceof wjcGrid.GroupRow ? item : null,
                    negative = false; // assume value is not negative
                // calculate profit
                if (c.binding == 'profit') {
                    let profit = group
                        ? group.getAggregate('Sum', 'sales') - group.getAggregate('Sum', 'expenses')
                        : item.sales - item.expenses;
                    e.cell.textContent = wjcCore.Globalize.format(profit, c.format);
                    negative = profit < 0;
                }
                // update 'negative' class on cell
                wjcCore.toggleClass(e.cell, 'negative', negative);
            }
        });
    }
  }
});
</script>

<style>
  .wj-flexgrid {
    max-height: 250px;
    margin: 10px 0;
  }
  .wj-cell.wj-frozen-row {
      border-bottom: none;
  }
  .negative {
    color: red;
  }
  body {
    margin-bottom: 20px;
  }
</style>

