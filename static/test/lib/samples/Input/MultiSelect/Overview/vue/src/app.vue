<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <div class="form-group">
                    <wj-multi-select :placeholder="'Countries'" :headerFormat="'{count:n0} countries'"
                        :displayMemberPath="'country'" :itemsSource="data" :initialized='initMultiSelect' :checkedItemsChanged='onCheckedItemsChanged'></wj-multi-select>
                </div>
                <div class="form-group">
                    <label>
                        Show "Select All" box
                        <input id="selectAll" type="checkbox" v-model="theMultiSelect.showSelectAllCheckbox">
                    </label>
                </div>
            </div>
            <div class="col-xs-7">
                <p>
                    <b>Checked Items:</b>
                </p>
                <ul>
                    <li v-for="item of checkedItems" :key="item">
                        {{ item.country }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';
    import { getData } from './data';

    let App = Vue.extend({
        name: 'app',
        data: function(){
            return {
                theMultiSelect: {},
                data: getData(),
                checkedItems: []
            }
        },
        methods: {
            initMultiSelect: function(multiSelect){
                this.theMultiSelect = multiSelect;
            },
            onCheckedItemsChanged: function(s){
                this.checkedItems = s.checkedItems;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24pt;
    }
</style>
