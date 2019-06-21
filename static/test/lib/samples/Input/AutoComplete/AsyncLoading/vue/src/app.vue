<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theAutoComplete">AutoComplete:</label>
            <wj-auto-complete id="theAutoComplete" :placeholder="'Product Name'" :displayMemberPath="'ProductName'"
                :itemsSourceFunction="getItemBySearch" :selectedIndexChanged="onSelectedIndexChanged">
            </wj-auto-complete>
        </div>

        <p>Selected product:
            <b v-if="selectedItem">
                {{ selectedItem.ProductName }} (ID: {{ selectedItem.ProductID }})
            </b>
            <b v-else>
                none
            </b>
        </p>

    </div>
</template>

<script>
    import 'bootstrap.css';
    import '@grapecity/wijmo.styles/wijmo.css';
    import Vue from 'vue';
    import '@grapecity/wijmo.vue2.core';
    import '@grapecity/wijmo.vue2.input';

    let App = Vue.extend({
        name: 'app',
        data: function () {
            return {
                selectedItem: null
            }
        },
        methods: {
            getItemBySearch: function(query, max, callback){
                if (!query) {
                    callback(null);
                    return;
                }
                wijmo.httpRequest('https://services.odata.org/Northwind/Northwind.svc/Products', {
                    data: {
                        $format: 'json',
                        $select: 'ProductID,ProductName',
                        $filter: 'indexof(ProductName, \'' + query + '\') gt -1'
                    },
                    success: (xhr) => {
                        let response = JSON.parse(xhr.response);
                        callback(response.d ? response.d.results : response.value);
                    }
                });
            },
            onSelectedIndexChanged: function (sender) {
                this.selectedItem = sender.selectedItem;
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
