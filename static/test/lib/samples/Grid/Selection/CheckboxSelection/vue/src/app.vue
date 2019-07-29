<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :deferResizing="true"
            :alternatingRowStep="0"
            :headersVisibility="'Column'"
            :selectionMode="'Cell'"
            :itemsSource="data"
            :initialized="initializeGrid">
        </wj-flex-grid>
    </div>
</template>

<script>
    import "@grapecity/wijmo.styles/wijmo.css";
    import 'bootstrap.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.grid';
    import * as wjCore from '@grapecity/wijmo';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                data: getData(100)
            }
        },
        methods: {
            initializeGrid: function(flex){
                flex.formatItem.addHandler((s, e) => {
                    if (e.panel == s.columnHeaders) {
                        if (s.columns[e.col].binding == 'sel') {
                            e.cell.innerHTML = '<input class="select-all" tabindex="-1" type="checkbox">';
                            this._updateSelectAllBox(s);
                        }
                    } else if (e.panel == s.cells) {
                        wjCore.setAttribute(
                            e.cell.parentElement,
                            'aria-selected',
                            s.rows[e.row].dataItem.sel
                        );
                    }
                });
                // initialize column widths
                flex.autoSizeColumns(null, null, null, 18);

                // select/de-select all items when user clicks the check box on the header
                flex.hostElement.addEventListener('click', (e) => {
                    if (wjCore.hasClass(e.target, 'select-all') &&
                        e.target instanceof HTMLInputElement) {
                        flex.deferUpdate(() => {
                            flex.collectionView.items.forEach((item) => {
                                item.sel = (e.target).checked;
                            });
                        });
                    }
                });
            },
            _updateSelectAllBox: function(grid) {
                let cb = grid.hostElement.querySelector('.select-all');
                if (cb instanceof HTMLInputElement) {
                    let items = grid.collectionView.items,
                    last = null,
                    indeterminate = false;
                    for (let i = 0; i < items.length; i++) {
                        if (last != null && items[i].sel != last) {
                            indeterminate = true;
                            break;
                        }
                        last = items[i].sel;
                    }
                    cb.checked = last;
                    if (indeterminate) {
                        cb.indeterminate = true;
                    }
                }
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
/* fixed grid height */
.wj-flexgrid {
  height: 350px;
}

/* some extra cell padding */
.wj-flexgrid .wj-cell {
  padding: 12px;
}

/* replace selection highlight with a dotted border */
.wj-flexgrid .wj-cells .wj-cell.wj-state-selected {
  background: inherit;
  color: inherit;
}
.wj-flexgrid.wj-state-focused .wj-cells .wj-cell.wj-state-selected {
  border: 2px solid #7099de;
  padding: 10px;
}

/* selected rows */
.wj-flexgrid:not(.wj-state-focused) .wj-cells .wj-row[aria-selected=true] .wj-cell,
.wj-flexgrid .wj-cells .wj-row[aria-selected=true] .wj-cell:not(.wj-state-selected) {
  background: rgba(0, 0, 200, .5);
  color: white;
}

</style>
