<template>
  <div class="container-fluid">
    <wj-flex-grid :items-source="data" headers-visibility="Column" child-items-path="children" 
      :group-collapsed-changed="onGroupCollapsedChanged" :initialized="initialGrid">
      <wj-flex-grid-column binding="name" header="Customer Name" width="*"></wj-flex-grid-column>
      <wj-flex-grid-column binding="id" header="ID" align="center" css-class="id-column"></wj-flex-grid-column>
    </wj-flex-grid>
    <p>
      The grid currently has <b id="rowCount" v-html="rowCountText"></b> rows.
    </p>
  </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import * as wjcCore from '@grapecity/wijmo';
import "@grapecity/wijmo.vue2.grid";
import { getData, createNode } from "./data";

new Vue({
  el: "#app",
  data: function() {
    return {
      data: getData(),
      rowCountText: ''
    }
  },
  mounted: function() {
    this.grid.collapseGroupsToLevel(0);
    this._updateRowCount(this.grid);
  },
  methods: {
    initialGrid(grid) {
      this.grid = grid;
    },

    onGroupCollapsedChanged(s, e) {
      let row = s.rows[e.row],
          item = row.dataItem;
      // did we just expand a node with a dummy child?
      if (!row.isCollapsed && item.children.length == 1 && item.children[0].name == '') {
        // can't lazy load while updating rows
        if (s.rows.isUpdating) {
          row.isCollapsed = true;
          return;
        }
        // replace the dummy child with actual nodes
        item.children.length = 0;
        let cnt = Math.round(Math.random() * 5) + 1;
        for (let i = 0; i < cnt; i++) {
          let node = createNode();
          item.children.push(node);
        }
        // refresh the view
        s.collectionView.refresh();
        // collapse the new item's child items
        for (let i = row.index + 1; i < s.rows.length; i++) {
          let childRow = s.rows[i];
          if (childRow.level <= row.level) {
            break;
          }
          childRow.isCollapsed = true;
        }
        // update row count
        this._updateRowCount(s);
      }
    },

    _updateRowCount(grid) {
        this.rowCountText = wjcCore.Globalize.format(grid.rows.length, 'n0');
    }
  }
});
</script>

<style>
.wj-flexgrid {
  max-height: 300px;
  margin: 12px;
}
  .wj-flexgrid .wj-cell {
    padding: 8px;
  }
  .wj-flexgrid .wj-group:not(.wj-state-selected):not(.wj-state-multi-selected) {
    background-color: white;
  }
.id-column {
  font-style: italic;
}
document {
  margin-bottom: 48pt;
}
</style>