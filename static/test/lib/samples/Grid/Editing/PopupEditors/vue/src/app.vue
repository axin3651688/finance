<template>
    <div class="container-fluid">
        <!-- the grid -->
        <wj-flex-grid
            :isReadOnly=true
            selectionMode="Row"
            :itemsSource="data"
            :initialized="initializeGrid">
            <wj-flex-grid-column binding="id" header="ID" :width=50 :isReadOnly=true></wj-flex-grid-column>
            <wj-flex-grid-column binding="country" header="Country" :isRequired=true :dataMap="countries"></wj-flex-grid-column>
            <wj-flex-grid-column binding="sales" header="Sales" format="n2"></wj-flex-grid-column>
            <wj-flex-grid-column binding="expenses" header="Expenses" format="n2"></wj-flex-grid-column>
        </wj-flex-grid>

        <!-- the popup editor -->
        <wj-popup class="modal-content" :initialized="initializePopup">
            <div class="modal-header">
                <button type="button" tabindex="-1" class="close wj-hide">
                    &times;
                </button>
                <h4 class="modal-title">Edit Item {{editingItem != null ? editingItem.id : ''}}</h4>
            </div>
            <div class="modal-body">
                <div class="wj-labeled-input" >
                    <wj-combo-box :initialized="initializeCountry"
                        id="country"
                        :itemsSource="countries">
                    </wj-combo-box>
                    <label for="country">Country</label>
                </div>
                <div class="wj-labeled-input" >
                    <wj-input-number :initialized="initializeSales"
                        id="sales"
                        format="n2"
                        :min=0
                        :step=100>
                    </wj-input-number>
                    <label for="sales">Sales</label>
                </div>
                <div class="wj-labeled-input" >
                    <wj-input-number :initialized="initializeExpense"
                        id="expenses"
                        format="'n2'"
                        :min=0
                        :step=100>
                    </wj-input-number>
                    <label for="expenses">Expenses</label>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary wj-hide-ok">OK</button>
                    <button type="button" class="btn btn-default wj-hide">Cancel</button>
                </div>
            </div>
        </wj-popup>
    </div>
</template>

<script>
import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap.css";
import Vue from "vue";
import { WjGridModule } from '@grapecity/wijmo.vue2.grid';
import { WjInputModule } from '@grapecity/wijmo.vue2.input';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcInput from '@grapecity/wijmo.input';


new Vue({
  	el: "#app",
  	data: {
        data: null,
        countries : ['US', 'Germany', 'UK' ,'Japan', 'Italy', 'Greece'],
        editingItem: null
    },
    methods:{
        initializePopup(ctl){
            this.popup = ctl;
        },
        initializeExpense(ctl){
            this.numberExpenses = ctl;
        },
        initializeSales(ctl){
            this.numberSales = ctl;
        },
        initializeCountry(ctl){
            this.cboCountry = ctl;
        },
        initializeGrid(flex){
            this.data = this._getData();
            var _this = this;
            // add 'edit button' to row header cells
            flex.formatItem.addHandler((s, e) => {
                if (e.panel == s.rowHeaders && e.col == 0) {
                    e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
                }
            });

            // handle button clicks
            flex.addEventListener(flex.hostElement, 'click', (e) => {
                let ht = flex.hitTest(e);
                if (ht.panel == flex.rowHeaders) {
                    // prepare form
                    _this.editingItem = flex.rows[ht.row].dataItem;
                    _this.cboCountry.selectedItem = _this.editingItem.country;
                    _this.numberSales.value = _this.editingItem.sales;
                    _this.numberExpenses.value = _this.editingItem.expenses;
                    // show the form
                    _this.popup.show(true, (s) => {
                        if (s.dialogResult == 'wj-hide-ok') {
                            // commit changes if the user pressed the OK button
                            (flex.collectionView).editItem(_this.editingItem);
                            _this.editingItem.country = _this.cboCountry.selectedValue;
                            _this.editingItem.sales = _this.numberSales.value;
                            _this.editingItem.expenses = _this.numberExpenses.value;
                            (flex.collectionView).commitEdit();
                        }
                        // return focus to the grid
                        flex.focus();
                    });
                }
            });
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
        }
    }
});
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .wj-flexgrid {
        max-height: 200px;
        margin-bottom: 12px;
    }

    .modal-content {
        width: 400px;
    }
    /* style our custom 'edit buttons' */
    .wj-rowheaders .wj-cell .wj-glyph-pencil {
        opacity: .5;
        transform: scale(.75);
    }
    .wj-rowheaders .wj-cell:hover .wj-glyph-pencil {
        opacity: 1;
        color: #cc0000;
        transform: scale(1.5) rotate(-90deg);
        transition: all 400ms;
    }

    /* wj-labeled-input: adapted from MDL styles */

    /* label input container */
    .wj-labeled-input {
        position: relative;
        font-size: 16px;
        display: inline-block;
        box-sizing: border-box;
        width: 300px;
        max-width: 100%;
        margin: 0 20px;
        padding: 20px 0;
    }

    /* Wijmo control in the container */
    .wj-labeled-input .wj-control.wj-content {
        margin: 0;
        width: 100%;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .wj-labeled-input .wj-control.wj-content button {
        opacity: 0.75;
        border-color: rgba(0,0,0,.1);
    }
    .wj-labeled-input .wj-input-group .wj-form-control {
        float: none;
    }

    /* label in the container (must come after the control) */
    .wj-labeled-input label {
        font-size: 16px;
        top: 24px;
        bottom: 0;
        margin: 0;
        pointer-events: none;
        position: absolute;
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-align: left;
        color: rgba(0, 0, 0, 0.258824);
        transition-duration: .2s;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
    }
    
    /* move label out of the way when control is focused or not empty */
    .wj-static-labels .wj-labeled-input :not(.wj-state-focused) + label,
    .wj-labeled-input .wj-state-focused + label,
    .wj-labeled-input :not(.wj-state-empty) + label {
        font-size: 12px;
        top: 4px;
        color: rgb(63,81,181);
        visibility: visible;
    }
    .wj-labeled-input .wj-state-invalid + label {
        color: #d50000;
    }

    /* underline label */
    .wj-labeled-input label:after {
        background-color: rgb(63,81,181);
        bottom: 20px;
        content: '';
        height: 2px;
        left: 45%;
        position: absolute;
        transition-duration: .2s;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
        visibility: hidden;
        width: 10px;
    }

    /* show underline when focused */
    .wj-labeled-input .wj-state-focused + label:after {
        left: 0;
        visibility: visible;
        width: 100%;
    }
    .wj-labeled-input .wj-state-invalid + label:after {
        background-color: #d50000;
    }

    /* validation message */
    .wj-labeled-input .wj-error {
        color: #d50000;
        position: absolute;
        font-size: 12px;
        margin-top: 3px;
        visibility: hidden;
        display: block;
    }
    .wj-labeled-input .wj-control.wj-state-invalid ~ .wj-error {
        visibility: visible;
    }
</style>

