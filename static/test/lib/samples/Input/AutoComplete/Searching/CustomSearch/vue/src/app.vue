<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theAutoComplete">Default:</label>
            <wj-auto-complete id="theAutoComplete" :displayMemberPath="'country'" :itemsSource="data">
            </wj-auto-complete>
        </div>
        <div class="form-group">
            <label for="theAutoCompleteCustom">Custom:</label>
            <wj-auto-complete id="theAutoCompleteCustom" :displayMemberPath="'country'"
                :itemsSourceFunction="itemsSourceFunction">
            </wj-auto-complete>
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
                data: getData()
            }
        },
        methods: {
            itemsSourceFunction: function(query, max, callback){
                // empty query? no results
                if (!query) {
                    callback(null);
                    return;
                }
                // find items that start with the user input
                let allItems = getData(),
                    queryItems = [],
                    rx = new RegExp('^' + query, 'i');

                for (let i = 0; i < allItems.length && queryItems.length < max; i++) {
                    if (rx.test(allItems[i].country)) {
                        queryItems.push(allItems[i]);
                    }
                }
                callback(queryItems);
            }
        }
    })

    new Vue({ render: h => h(App) }).$mount('#app');
</script>

<style>
    body {
        margin-bottom: 24px;
    }

    label {
        margin-right: 3px;
    }
</style>
