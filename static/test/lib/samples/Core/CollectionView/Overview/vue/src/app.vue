<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <h4>Current Item</h4>
                <dl class="dl-horizontal">
                    <dt>ID</dt>
                    <dd>
                        <input type="text" class="form-control" v-model="cv.currentItem.id"
                            :disabled="!isEditing()" />
                    </dd>
                    <dt>Country</dt>
                    <dd>
                        <input type="text" class="form-control" v-model="cv.currentItem.country"
                            :disabled="!isEditing()" />
                    </dd>
                    <dt>Color</dt>
                    <dd>
                        <input type="text" class="form-control" v-model="cv.currentItem.color"
                            :disabled="!isEditing()" />
                    </dd>
                    <dt>Amount</dt>
                    <dd>
                        <input type="number" class="form-control" v-model="cv.currentItem.amount"
                            :disabled="!isEditing()" />
                    </dd>
                    <dt></dt>
                    <dd>
                        <div class="btn-group data-btn-group">
                            <button @click="edit()" v-bind:style="{display: !isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Edit</button>
                            <button @click="add()" v-bind:style="{display: !isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Add</button>
                            <button @click="deleteItem()" v-bind:style="{display: !isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Delete</button>
                            <button @click="commit()" v-bind:style="{display: isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Commit</button>
                            <button @click="cancel()" v-bind:style="{display: isEditing() ? '' : 'none'}"
                                class="btn btn-default btn-sm">Cancel</button>
                        </div>
                    </dd>
                </dl>
            </div>
            <div class="col-md-6">
                <h4>Navigation</h4>
                <dl>
                    <dt>items</dt>
                    <dd>
                        <div id="navigator"></div>
                    </dd>
                    <dt>pages</dt>
                    <dd>
                        <div id="pager"></div>
                    </dd>
                </dl>
                <wj-menu :header="pageHeader" displayMemberPath="header" 
                selectedValuePath="value" :itemsSource="pageSource" :itemClicked="selectionPageChanged"></wj-menu>
            </div>
        </div>

        <table class="table table-condensed table-bordered">
            <thead>
                <tr class="active">
                    <th class="text-center">
                        <div class="btn-group">
                            <wj-menu :header="filterHeader" displayMemberPath="header"
                                selectedValuePath="value" :itemClicked="selectionIDChanged" style="display:block" :itemsSource="filterSource"></wj-menu>
                            <button class="btn btn-default" @click="toggleSort('id')">{{getSort('id')}}</button>
                        </div>
                    </th>
                    <th class="text-center">
                        <div class="btn-group">
                            <wj-menu :header="countryHeader" :itemClicked="selectionCountryChanged"  displayMemberPath="header"
                                selectedValuePath="value" style="display:block" :itemsSource="countrySource"></wj-menu>
                            <button class="btn btn-default" @click="toggleSort('country')">{{getSort('country')}}</button>
                            <button class="btn btn-default"
                                @click="toggleGroup('country')">{{getGroup('country')}}</button>
                        </div>
                    </th>
                    <th class="text-center">
                        <div class="btn-group">
                            <wj-menu :header="colorHeader" :itemClicked="selectionColorChanged" displayMemberPath="header"
                                selectedValuePath="value" style="display:block" :itemsSource="colorSource"></wj-menu>
                            <button class="btn btn-default" @click="toggleSort('color')">{{getSort('color')}}</button>
                            <button class="btn btn-default" @click="toggleGroup('color')">{{getGroup('color')}}</button>
                        </div>
                    </th>
                    <th class="text-center">
                        <div class="btn-group">
                            <wj-menu :header="amountHeader" :itemClicked="selectionAmountChanged"  displayMemberPath="header"
                                selectedValuePath="value" style="display:block" :itemsSource="amountSource"></wj-menu>
                            <button class="btn btn-default" @click="toggleSort('amount')">{{getSort('amount')}}</button>
                            <button class="btn btn-default" @click="toggleGroup('amount')">{{getGroup('amount')}}</button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in groupedList" v-bind:key="item" v-bind:class="{success: item == cv.currentItem}" @click="moveCurrentTo(item)">
                    <!-- group row -->
                    <td v-bind:style="{display:isGroup(item)?'':'none'}" colspan="4" class="active">
                        <span v-bind:style="{display:'inline-block', width: (item.level * 25) + 'px'}"></span>
                        <b>{{item.name}}</b> ( items)
                    </td>

                    <!-- data row -->
                    <td v-bind:style="{display:isGroup(item)?'none':''}" class="text-center">{{item.id}}</td>
                    <td v-bind:style="{display:isGroup(item)?'none':''}" class="text-center">{{item.country}}</td>
                    <td v-bind:style="{display:isGroup(item)?'none':''}" class="text-center">{{item.color}}</td>
                    <td v-bind:style="{display:isGroup(item)?'none':''}" class="text-center">{{item.amount | number:'1.2-2'}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import "bootstrap.css";
    import "@grapecity/wijmo.styles/wijmo.css";
    import Vue from 'vue';
    import { WjInputModule } from '@grapecity/wijmo.vue2.input';
    import { getData } from './data';
    import * as wijmo from '@grapecity/wijmo';
    import { CollectionViewPager } from './collection-view-pager';
    import { CollectionViewNavigator } from './collection-view-navigator';
    
    new Vue({
        el: '#app',
        data: function () {
            return { 
                cv: new wijmo.CollectionView(getData(500), {
                    pageSize: 10,
                    filter: this._filterFun.bind(this),
                    newItemCreator: () => {
                        var newItem = getData(1)[0];
                        newItem.id = -1;
                        return newItem;
                    }
                }),
                groupedList: [],
                filter: {},
                pageHeader: '',
                pageSource: [{header: "No Paging", value: 0},{header: "10", value: 10},{header: "15", value: 15},{header: "30", value: 30}, {header: "50", value: 50}],
                filterHeader: '',
                filterSource:[{header: "(All)", value: ""},{header: "Odd", value: "odd"}, {header: "Even", value: "even"}],
                countryHeader: '',
                countrySource:[{header: "(All)", value:""}, {header: "US", value: "US"}, {header: "Germany", value: "Germany"}, {header: "UK", value: "UK"}, {header: "Japan", value: "Japan"}, {header: "Italy", value: "Italy"}, {header: "Greece", value: "Greece"}, {header: "France", value: "France"}],
                colorHeader: '',
                colorSource:[{header: "(All)", value: ""}, {header: "Black", value: 'Black'}, {header: "White", value: 'White'}, {header: "Red", value: 'Red'}, {header: "Green", value: 'Green'}, {header: "Blue", value: 'Blue'}, {header: "Yellow", value: 'Yellow'}, {header: "Brown", value: 'Brown'}, {header: "Orange", value: 'Orange'}],
                amountHeader: '',
                amountSource:[{header: "(All)", value: ""}, {header: "&gt; 0", value: "0"}, {header: "&gt; 500", value: "500"}, {header: "&gt; 1,000", value: "1000"}]
            }
        }, 
        mounted: function(){
            this.filter = { id: '', country: '', color: '', minAmount: '' };

            this.pageHeader = "Page Size: <b>" + this.cv.pageSize + "</b>";
            this.filterHeader = 'ID: <b>' + this.getFilteredItem(this.filterSource, this.filter.id) + '</b>';
            this.countryHeader = 'Country: <b>' + this.getFilteredItem(this.countrySource, this.filter.country) + '</b>';
            this.colorHeader = 'Color: <b>' + this.getFilteredItem(this.colorSource, this.filter.color) + '</b>';
            this.amountHeader = 'Amount: <b>' + this.getFilteredItem(this.amountSource, this.filter.minAmount) + '</b>';
            
            new CollectionViewNavigator("#navigator", this.cv);
            new CollectionViewPager("#pager", this.cv);
            this.groupedList = this.cv.items;
            //
            this.cv.collectionChanged.addHandler(() => {
                this.groupedList = this.cv.items;
                if (this.cv.groups && this.cv.groups.length > 0) {
                    this.groupedList = [];
                    this.cv.groups.forEach(group => this._addGroup(group));
                }
            });
        },
        methods:{
            doFilter() {
                if (this._timeOut) {
                    clearTimeout(this._timeOut);
                }
                //
                this._timeOut = setTimeout(() => {
                    this._timeOut = null;
                    this.cv.refresh();
                }, 250);
            },
            getFilteredItem(source, value){
                let item = source.find((item)=>{ return item.value == value });
                if(item !== undefined){
                    return item.header;
                }
            },
            selectionPageChanged(menu){
                this.cv.pageSize = menu.selectedValue;
                this.pageHeader = 'Page Size: <b>' + menu.selectedItem.header + '</b>';
            },
            selectionIDChanged(menu){
                this.filter.id = menu.selectedValue;
                this.filterHeader = 'ID: <b>' + this.getFilteredItem(this.filterSource, this.filter.id) + '</b>';
                this.doFilter();
            },
            selectionCountryChanged(menu){
                this.filter.country = menu.selectedValue;
                this.countryHeader = 'ID: <b>' + this.getFilteredItem(this.countrySource, this.filter.country) + '</b>';
                this.doFilter();
            },
            selectionColorChanged(menu){
                this.filter.color = menu.selectedValue;
                this.colorHeader = 'ID: <b>' + this.getFilteredItem(this.colorSource, this.filter.color) + '</b>';
                this.doFilter();
            },
            selectionAmountChanged(menu){
                this.filter.minAmount = menu.selectedValue;
                this.amountHeader = 'ID: <b>' + this.getFilteredItem(this.amountSource, this.filter.minAmount) + '</b>';
                this.doFilter();
            },
            //
            // IEditableCollectionView commands
            isEditing() {
                return this.cv.isEditingItem || this.cv.isAddingNew;
            },
            //
            edit() {
                this.cv.editItem(this.cv.currentItem);
            },
            //
            add() {
                this.cv.addNew();
            },
            //
            deleteItem() {
                this.cv.remove(this.cv.currentItem);
            },
            //
            commit() {
                this.cv.commitEdit();
                this.cv.commitNew();
            },
            //
            cancel() {
                this.cv.cancelEdit();
                this.cv.cancelNew();
            },
            //
            moveCurrentTo(item) {
                if (!this.isEditing() && !this.isGroup(item)) {
                    this.cv.moveCurrentTo(item);
                }
            },
            //
            // sorting
            getSort(propName) {
                let sd = this.cv.sortDescriptions;
                if (sd.length > 0 && sd[0].property == propName) {
                    return sd[0].ascending ? '▲' : '▼';
                }
                return '◇';
            },
            //
            toggleSort(propName) {
                let sd = this.cv.sortDescriptions,
                    ascending = true;
                //
                if (sd.length > 0 && sd[0].property == propName) {
                    ascending = !sd[0].ascending;
                }
                //
                // remove any old sort descriptors and add the new one
                sd.splice(0, sd.length, new wijmo.SortDescription(propName, ascending));
            },
            //
            // grouping
            getGroup(propName) {
                let index = this._findGroup(propName);
                return index < 0
                    ? /*'▯' +*/ Array(this.cv.groupDescriptions.length + 2).join('▷')
                    : /*'▮' +*/ Array(index + 2).join('▶');
            },
            //
            toggleGroup(propName) {
                let gd = this.cv.groupDescriptions,
                    index = this._findGroup(propName);
                //
                if (index >= 0) {
                    gd.removeAt(index);
                } else {
                    if (propName == 'amount') {
                        // when grouping by amount, use ranges instead of specific values
                        gd.push(new wijmo.PropertyGroupDescription(propName, (item) => {
                            if (item.amount > 1000) return 'Large Amounts';
                            if (item.amount > 100) return 'Medium Amounts';
                            if (item.amount > 0) return 'Small Amounts';
                            //
                            return 'Negative Amounts';
                        }));
                    } else {
                        // group by specific property values
                        gd.push(new wijmo.PropertyGroupDescription(propName));
                    }
                }
            },
            //
            isGroup(item) {
                return item instanceof wijmo.CollectionViewGroup;
            },
            _addGroup(g) {
                this.groupedList.push(g);
                //
                if (g.isBottomLevel) {
                    g.items.forEach(item => this.groupedList.push(item));
                } else {
                    g.groups.forEach(group => this._addGroup(group));
                }
            },
            //
            _findGroup(propName) {
                let gd = this.cv.groupDescriptions;
                //
                for (let i = 0; i < gd.length; i++) {
                    if (gd[i].propertyName == propName) {
                        return i;
                    }
                }
                //
                return -1;
            },
            //
            // filtering
            _filterFun(item) {
                // check each filter parameter
                let f = this.filter;
                //
                if (f) {
                    if ((f.id == 'odd' && item.id % 2 == 0) || (f.id == 'even' && item.id % 2 != 0)) {
                        return false;
                    }
                    //
                    if (f.country && item.country.indexOf(f.country) < 0) {
                        return false;
                    }
                    //
                    if (f.color && item.color.indexOf(f.color) < 0) {
                        return false;
                    }
                    //
                    if ((f.minAmount || f.minAmount === 0) && item.amount < f.minAmount) {
                        return false;
                    }
                }
                //
                // all passed, return true to include the item
                return true;
            }
            
        }
    })
</script>

<style>
    .table {
        margin-bottom: 0px !important;
    }
</style>
