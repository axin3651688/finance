<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <wj-multi-select :placeholder="'Devices'" :displayMemberPath="'item.name'" :checkedItemsChanged='onCheckedItemsChanged'
                    :checkedMemberPath="'checked'" :itemsSource="data"></wj-multi-select>
            </div>
            <div class="col-xs-7">
                <p>
                    <b>Checked Items:</b>
                </p>
                <p v-if="checkedItems.length > 0">
                    {{ getCheckedItems(checkedItems) }}
                </p>
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
                data: getData().map(item => ({ item: item, checked: false })),
                checkedItems: []
            }
        },
        methods: {
            onCheckedItemsChanged: function(s){
                this.checkedItems = s.checkedItems;
            },
            getCheckedItems: function(ctrl) {
                let items = ctrl.map(checkableItem => checkableItem.item);
                return JSON.stringify(items);
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
