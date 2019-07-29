<template>
    <div class="container-fluid">
        <div class="form-group">
            <label for="theAutoComplete">AutoComplete:</label>
            <wj-auto-complete id="theAutoComplete" :displayMemberPath="'country'"
                :searchMemberPath="'country,continent'" :itemsSource="data">
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
