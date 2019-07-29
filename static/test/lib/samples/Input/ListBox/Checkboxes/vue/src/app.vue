<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-5">
                <wj-list-box :displayMemberPath="'country'" :checkedMemberPath="'selected'" :checkedItemsChanged="onCheckedItemChanged"
                    :itemsSource="data"></wj-list-box>
            </div>
            <div class="col-xs-7">
                <p>
                    <b>Checked Items:</b>
                </p>
                <ul>
                    <li v-for="item of checkedItems" :key="item.id">
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
        data: function () {
            return {
                checkedItems: [],
                data: getData()
            }
        },
        methods: {
            onCheckedItemChanged: function(listBox){
                this.checkedItems = listBox.checkedItems;
            }
        }
    })

    let vm = new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    .container-fluid .wj-listbox {
        max-height: 200px;
    }

    body {
        margin-bottom: 24pt;
    }
</style>
