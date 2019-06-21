<template>
    <div class="container-fluid">
        <wj-flex-grid :isReadOnly="true" :selectionMode="'Row'" :itemsSource="data"
            :formatItem="formatItem" :initialized="initGrid">
            <wj-flex-grid-column :binding="'id'" :header="'ID'" :width="50"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'country'" :header="'Country'" :isRequired="true" :dataMap="countries">
            </wj-flex-grid-column>
            <wj-flex-grid-column :binding="'sales'" :header="'Sales'" :format="'n2'"></wj-flex-grid-column>
            <wj-flex-grid-column :binding="'expenses'" :header="'Expenses'" :format="'n2'"></wj-flex-grid-column>
        </wj-flex-grid>

        <!-- the popup editor -->
        <wj-popup :class="'modal-content'" :initialized="initPopup">
            <div class="modal-header">
                <button type="button" tabindex="-1" class="close wj-hide">&times;</button>
                <h4 class="modal-title">Edit Item {{ current.id }}</h4>
            </div>
            <div class="modal-body">
                <div class="wj-labeled-input">
                    <wj-combo-box id="country" :itemsSource="countries" :selectedValue="current.country" :selectedIndexChanged="valueChanged"></wj-combo-box>
                    <label for="country">Country</label>
                </div>
                <div class="wj-labeled-input">
                    <wj-input-number id="sales" :format="'n2'" :min="0" :step="100" :value="current.sales" :valueChanged="valueChanged">
                    </wj-input-number>
                    <label for="sales">Sales</label>
                </div>
                <div class="wj-labeled-input">
                    <wj-input-number id="expenses" :format="'n2'" :min="0" :step="100" :value="current.expenses" :valueChanged="valueChanged">
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
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import '@grapecity/wijmo.vue2.grid';
    import { getData, getCountries } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                thePopup: {},
                data: getData(),
                current: {
                    country: '',
                    sales: 0,
                    expenses: 0
                },
                countries: getCountries()
            }
        },
        methods: {
            initPopup: function(popup){
                this.thePopup = popup;
            },
            initGrid: function(grid) {
                grid.hostElement.addEventListener('click', e => {
                    let ht = grid.hitTest(e);

                    if (ht.panel == grid.rowHeaders) {
                        // prepare form
                        let item = grid.rows[ht.row].dataItem;
                        // clone the current data item
                        this.current = {
                            country: item.country,
                            expenses: item.expenses,
                            id: item.id,
                            overdue: item.overdue,
                            sales: item.sales
                        };
                        // show the form
                        this.thePopup.show(true, (sender) => {
                            if (sender.dialogResult == 'wj-hide-ok') {
                                // commit changes if the user pressed the OK button
                                grid.collectionView.editItem(item);
                                item.country = this.current.country;
                                item.sales = this.current.sales;
                                item.expenses = this.current.expenses;
                                grid.collectionView.commitEdit();
                            }
                            // return focus to the grid
                            grid.focus();
                        });
                    }
                });
            },
            // add 'edit button' to row header cells
            formatItem: function(sender, e) {
                if (e.panel == sender.rowHeaders && e.col == 0) {
                    e.cell.innerHTML = '<span class="wj-glyph-pencil"></span>';
                }
            },
            valueChanged: function(s){
                this.current[s.hostElement.id] = s.value || s.selectedValue;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    .container-fluid .wj-flexgrid {
        max-height: 200px;
        margin-bottom: 12px;
    }

    .modal-content {
        width: 400px;
    }
    /* style our custom 'edit buttons' */
    .container-fluid .wj-rowheaders .wj-cell .wj-glyph-pencil {
        opacity: .5;
        transform: scale(.75);
    }
    .container-fluid .wj-rowheaders .wj-cell:hover .wj-glyph-pencil {
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
