<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :isReadOnly=true
            selectionMode="None"
            headersVisibility="Column"
            :itemsSource="data"
            :initialized="initializeGrid">
            <wj-flex-grid-column binding="id" header="ID" :width=50 :isReadOnly=true></wj-flex-grid-column>
            <wj-flex-grid-column binding="country" header="Country" :isRequired=true :dataMap="countries"></wj-flex-grid-column>
            <wj-flex-grid-column binding="sales" header="Sales" format="n2"></wj-flex-grid-column>
            <wj-flex-grid-column binding="expenses" header="Expenses" format="n2"></wj-flex-grid-column>
            <wj-flex-grid-column binding="buttons" header="Edit" :width=160>
            </wj-flex-grid-column>
        </wj-flex-grid>

        <!-- template for buttons on items in view mode -->
        <div id="tplBtnViewMode" style="display:none">
            <button id="btnEdit" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-pencil"></span> Edit
            </button>
            <button id="btnDelete" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-remove"></span> Delete
            </button>
        <div>
        
        <!-- template for buttons on items in edit mode -->
        <div id="tplBtnEditMode" style="display:none">
            <button id="btnOK" class="btn btn-primary btn-sm">
                <span class="glyphicon glyphicon-ok"></span> OK
            </button>
            <button id="btnCancel" class="btn btn-warning btn-sm">
                <span class="glyphicon glyphicon-ban-circle"></span> Cancel
            </button>
        </div>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import "@grapecity/wijmo.vue2.grid";
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import '@grapecity/wijmo.input';


new Vue({
  	el: "#app",
  	data: {
        data: [],
        countries : ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece']
    },
    methods:{
        initializeGrid(flex) {
            this.flex = flex;
            this.data = this._getData();
            flex.rows.defaultSize = 40;
            // custom formatter to paint buttons and editors
            flex.formatItem.addHandler((s, e) => {
                if (e.panel == s.cells) {
                    let col = s.columns[e.col],
                        item = s.rows[e.row].dataItem;
                    if (item == this._currentEditItem) {
                        // create editors and buttons for the item being edited
                        switch (col.binding) {
                        case 'buttons':
                            e.cell.innerHTML = document.getElementById('tplBtnEditMode').innerHTML;
                            e.cell['dataItem'] = item;
                            break;
                        case 'country':
                        case 'sales':
                        case 'expenses':
                            e.cell.innerHTML = '<input class="form-control" ' +
                            'id="' + col.binding + '" ' +
                            'value="' + s.getCellData(e.row, e.col, true) + '"/>';
                            break;
                        }
                    } else {
                        // create buttons for items not being edited
                        switch (col.binding) {
                        case 'buttons':
                            e.cell.innerHTML = document.getElementById('tplBtnViewMode').innerHTML;
                            e.cell['dataItem'] = item;
                            break;
                        }
                    }
                }
            });

            // handle button clicks
            flex.addEventListener(flex.hostElement, 'click', (e) => {
                let targetBtn;
                if (e.target instanceof HTMLButtonElement) {
                    targetBtn = e.target;
                } else if (e.target instanceof HTMLSpanElement && e.target.classList.contains('glyphicon')) {
                    targetBtn = e.target.parentElement;
                }
                if (targetBtn) {
                    // get button's data item
                    let item = wjcCore.closest(targetBtn, '.wj-cell')['dataItem'];
                    // handle buttons
                    switch (targetBtn.id) {
                        // start editing this item
                        case 'btnEdit':
                            this._editItem(item);
                            break;
                        // remove this item from the collection
                        case 'btnDelete':
                            (flex.collectionView).remove(item);
                            break;
                        // commit edits
                        case 'btnOK':
                            this._commitEdit();
                            break;
                        // cancel edits
                        case 'btnCancel':
                            this._cancelEdit();
                            break;
                    }
                }
            });

            // exit edit mode when scrolling the grid or losing focus
            flex.scrollPositionChanged.addHandler(this._cancelEdit.bind(this));
            flex.lostFocus.addHandler(this._cancelEdit.bind(this));
        },
        _getData() {
            // create some random data
            let data = [];
            for (let i = 0; i < this.countries.length; i++) {
                data.push({
                    id: i,
                    country: this.countries[i],
                    sales: Math.random() * 10000,
                    expenses: Math.random() * 5000,
                    overdue: i % 4 == 0
                });
            }
            return data;
        },
        _editItem(item) {
            this._cancelEdit();
            this._currentEditItem = item;
            this.flex.invalidate();
        },
        _commitEdit() {
            if (this._currentEditItem) {
                this.flex.columns.forEach((col) => {
                    let input = this.flex.hostElement.querySelector('#' + col.binding);
                    if (input) {
                        let value = wjcCore.changeType(input.value, col.dataType, col.format);
                        if (wjcCore.getType(value) == col.dataType) {
                            this._currentEditItem[col.binding] = value;
                        }
                    }
                });
            }
            this._currentEditItem = null;
            this.flex.invalidate();
        },
        _cancelEdit() {
            if (this._currentEditItem) {
                this._currentEditItem = null;
                this.flex.invalidate();
            }
        }
    }
});
</script>

<style>
    .wj-flexgrid {
        max-height: 200px;
        margin-bottom: 12px;
    }

    body {
        margin-bottom: 48px;
    }
</style>

